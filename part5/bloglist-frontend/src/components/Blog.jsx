import { useState, useEffect } from 'react'

const Blog = ({ blog, user, likeBlogService, deleteBlogService }) => {

  const [view, setView] = useState(false)
  const [blogObject, setBlogObject] = useState({})

  const toggleView = () => {
    setView(!view)
  }

  const likeBlog = async () => {
    await likeBlogService(blogObject)
    setBlogObject({
      ...blogObject,
      likes: blogObject.likes + 1
    })
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      await deleteBlogService(blogObject)
      setBlogObject(null)
    }
  }

  useEffect(() => {
    setBlogObject(blog)
  }, [blog])

  const style = {
    borderStyle: 'solid',
    margin: '10px',
    padding: '5px'
  }

  if (!blogObject)
    return null

  return (
    <div className='blog' style={style}>
      {blog.title} {blog.author}
      {view ? (
        <>
          <button className='hide' onClick={toggleView}>hide</button>
          <p className='url' >{blog.url}</p>
          <p className='likes'>likes {blogObject.likes} <button className='likebtn' onClick={likeBlog}>like</button> </p>
          {blog.user && <p className='username'>{blog.user.name}</p> }
          {blog.user.username === user.username && (
            <button className='delete' onClick={deleteBlog} >delete</button>
          )}
        </>

      ) : (
        <button className='view' onClick={toggleView}>view</button>
      )}
    </div>
  )
}

export default Blog