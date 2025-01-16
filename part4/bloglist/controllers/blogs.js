const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .populate('user', {username: 1, name: 1, id: 1})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response, next) => {

  try {
    const user = request.user
    const userBlog = await User.findById(user.id)
    const newBlog =  {
      ...request.body,
      user: userBlog.id,
      likes: request.body.likes || 0
    }
    const blog = new Blog(newBlog)

    const result = await blog.save()
    userBlog.blogs = userBlog.blogs.concat(result._id)

    response.status(201).json(result)

  } catch (er) { next(er) }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const user = request.user
  
  try {
    data = await Blog.findById(id).populate('user', {id: 1})
    if (data) {
      // if (data.user.id !== user.id)
        // return response.status(401).json({error: 'blog does not belong to user'})
      await data.deleteOne()
      return response.status(204).send()
    }
    else
      return response.status(404).send()
  } catch(er) { next(er) }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const user = request.user

  const blog = {
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes,
    ...(request.body.author && {author: request.body.author})
  }

  try {
    toUpdate = await Blog.findById(id).populate('user', {id: 1})
    if (toUpdate) {
      // if (toUpdate.user.id !== user.id)
      //   return response.status(401).json({error: 'blog does not belong to user'})
      updated = await toUpdate.updateOne(blog, { new: true, runValidators: true, context: 'query' })
      response.json(updated)
    }
    else
      response.status(404).send()
  } catch(er) { next(er) }
})

module.exports = blogsRouter