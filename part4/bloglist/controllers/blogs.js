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

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    data = await Blog.findByIdAndDelete(id)
    if (data)
      return response.status(204).send()
    else
      return response.status(404).send()
  } catch(er) { next(er) }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id

  const blog = {
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes,
    ...(request.body.author && {author: request.body.author})
  }

  try {
    updated = await Blog.findByIdAndUpdate(id, blog, { new: true, runValidators: true, context: 'query' })
    if (updated)
      response.json(updated)
    else
      response.status(404).send()
  } catch(er) { next(er) }
})

module.exports = blogsRouter