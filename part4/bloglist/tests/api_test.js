const supertest = require('supertest')
const { test, only, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const { initialBlogs, initialUsers, initializeDb, zeroDb } = require('./test_helpers')
const app = require('../app')
const api = supertest(app)

const nonExistentId = '67746802e4c83c192d649a51'
let validTokenHeader = ''

beforeEach( async () => {
    await zeroDb()
    await initializeDb()
    const loginResponse = await api.post('/api/login')
    .send({ ...initialUsers[0], password: '1234' })
    validTokenHeader = `Bearer ${loginResponse.body.token}`
})

after( async () => {
    await mongoose.connection.close()
    console.log("Connection closed")
})

describe('API endpoints function well',() => {
    test('the blog list application returns the correct amount of blog posts', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        assert(Object.hasOwn(response.body[0],'id'))
    })

    test('making an HTTP POST request to the /api/blogs URL successfully creates a new blog post', async () => {

        const newBlog = {
            title: 'Test',
            author: 'Test',
            url: 'Test',
            likes: 1
        }
        await api.post('/api/blogs').send(newBlog).set('Authorization', validTokenHeader).expect(201).expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, initialBlogs.length + 1)

    })

    test('if the likes property is missing from the request, it will default to the value 0', async () => {
        const newBlog = {
            title: 'Test',
            author: 'Test',
            url: 'Test',
        }

        const response = await api.post('/api/blogs').send(newBlog).set('Authorization', validTokenHeader)

        assert(Object.hasOwn(response.body,'likes'))

    })

    test('if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async() =>{
        const newFaultyBlog = {
            title: 'Test',
            author: 'Test',
        }

        await api.post('/api/blogs').send(newFaultyBlog).set('Authorization', validTokenHeader).expect(400)
    })

    test('functionality for deleting a single blog post resource', async () => {
        const idToDelete = initialBlogs[0]._id
        await api.delete(`/api/blogs/${idToDelete}`).expect(204)
        const response = await api.get('/api/blogs')
        foundId = response.body.find((blog) => blog.id === idToDelete)
        assert(!foundId)
    })

    test('deleting a non existent id returns 404', async () => {
        await api.delete(`/api/blogs/${nonExistentId}`).expect(404)
    })

    test('functionality for updating an existent blog', async () => {
        const idToPut = initialBlogs[0]._id
        const newLikes = 999
        await api.put(`/api/blogs/${idToPut}`).send({
            title: initialBlogs[0].title,
            url: initialBlogs[0].url,
            likes: newLikes
        })
        const response = await api.get('/api/blogs')
        foundBlog = response.body.find((blog) => blog.id === idToPut)
        assert.strictEqual(foundBlog.likes, newLikes)
    })

    test('trying to update a non existent blog returns 404', async () => {
        await api.put(`/api/blogs/${nonExistentId}`).send({
            ...initialBlogs[0]
        }).expect(404)
    })
})

describe('User API Endpoints', () => {
    test('GET users return 201', async () => {
        await api.get('/api/users').expect(200)
    })

    test('User is successfully created', async () => {
        const newUser = {
            username: 'test',
            name: 'Test',
            password: 'password'
        }

        await api.post('/api/users').send(newUser).expect(201)
        const response = await api.get('/api/users')
        assert.strictEqual(response.body.length, initialUsers.length + 1)
    })

    test('Users are not created when sent without required fields', async () => {
        const invalidUsers = [
            {
                name: 'Test',
                password: '1234'
            },
            {
                username: 'test1',
                password: '1234'
            },
            {
                name: 'Test',
                username: 'test2'
            }
        ]

        for (let user of invalidUsers) {
            await api.post('/api/users').send(user).expect(400)
        }
        const response = await api.get('/api/users')
        assert.strictEqual(response.body.length, initialUsers.length)
    })

    test('Users are not created when name or password doesnt match required length of 3', async () => {
        const invalidUsers = [
            {
                username: 'te',
                password: '1234'
            },
            {
                username: 'test',
                password: '12'
            },
            {
                username: 'te',
                password: '12'
            }
        ]
        for (let user of invalidUsers) {
            await api.post('/api/users').send(user).expect(400)
        }
        const response = await api.get('/api/users')
        assert.strictEqual(response.body.length, initialUsers.length)
    })
})