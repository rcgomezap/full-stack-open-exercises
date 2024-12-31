const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response, next) => {

  const newBlog =  {
    ...request.body,
    likes: request.body.likes || 0
  }

  const blog = new Blog(newBlog)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch((er) => next(er))
})

module.exports = blogsRouter