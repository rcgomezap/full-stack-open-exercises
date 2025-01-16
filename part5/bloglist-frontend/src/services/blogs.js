import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const newBlog = (blog) => {
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const likeBlog = (blog) => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1
  }

  const request = axios.put(baseUrl + '/' + blog.id, updatedBlog, config)
  return request.then(response => response.data)
}

const deleteBlog = (blog) => {
  const request = axios.delete(baseUrl + '/' + blog.id, config)
  return request.then(response => response.data)
}

export default { setToken, getAll, newBlog, likeBlog, deleteBlog }