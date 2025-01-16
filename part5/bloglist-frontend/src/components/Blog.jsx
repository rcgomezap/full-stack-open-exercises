import { useState, useEffect } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog }) => {

  const [view, setView] = useState(false)
  const [blogObject, setBlogObject] = useState({})

  const toggleView = () => {
    setView(!view)
  }

  const likeBlog = async () => {
    await blogService.likeBlog(blogObject)
    setBlogObject({
      ...blogObject,
      likes: blogObject.likes + 1
    })
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      await blogService.deleteBlog(blogObject)
      setBlogObject(null)
    }
  }

  useEffect(() => {
    setBlogObject(blog)
  }, [])

  const style = {
    borderStyle: 'solid',
    margin: '10px',
    padding: '5px'
  }

  if (!blogObject)
    return null

  return (
  <div style={style}>
    {blog.title} {blog.author}
    {view ? ( 
      <>
        <button onClick={toggleView}>hide</button>
        <p>{blog.url}</p>
        <p>likes {blogObject.likes} <button onClick={likeBlog}>like</button> </p> 
        {blog.user && <p>{blog.user.name}</p> }
        <button onClick={deleteBlog} >delete</button>
      </>

    ) : (
      <button onClick={toggleView}>view</button>
    )}
  </div>
  )  
}

export default Blog