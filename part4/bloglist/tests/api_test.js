const supertest = require('supertest')
const { test, only, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const { initialBlogs, initializeDb, zeroDb } = require('./test_helpers')
const app = require('../app')
const api = supertest(app)

beforeEach( async () => {
    await zeroDb()
    await initializeDb()
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
        await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, initialBlogs.length + 1)

    })

    test('if the likes property is missing from the request, it will default to the value 0', async () => {
        const newBlog = {
            title: 'Test',
            author: 'Test',
            url: 'Test',
        }

        response = await api.post('/api/blogs').send(newBlog)

        assert(Object.hasOwn(response.body,'likes'))

    })

    test('if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async() =>{
        const newFaultyBlog = {
            title: 'Test',
            author: 'Test',
        }

        await api.post('/api/blogs').send(newFaultyBlog).expect(400)
    })
})