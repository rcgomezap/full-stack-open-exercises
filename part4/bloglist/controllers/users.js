const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', (request, response, next) => {

    const { username, name, password} = request.body
    const saltRounds = 10

    if (!(username && name && password))
        return response.status(400).send({error: 'missing fields in request'})

    if (username.length < 3 || password.length < 3)
        return response.status(400).send({error: 'username and password must be length > 3'})

    bcrypt.hash(password, saltRounds).then(hash => {
        const newUser =  {
            username,
            name,
            passwordHash: hash 
        }
        const user = new User(newUser)
        user
            .save()
            .then(result => {
            response.status(201).json(result)
            })
            .catch((er) => next(er))
    })

})

userRouter.get('/', (request, response, next) => {

    User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1}).then(users => {
        return response.json(users)
    })
})

module.exports = userRouter