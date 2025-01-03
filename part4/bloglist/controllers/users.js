const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', (request, response, next) => {

    const { username, name, password} = request.body
    const saltRounds = 10

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

    User.find({}).then(users => {
        return response.json(users)
    })
})

module.exports = userRouter