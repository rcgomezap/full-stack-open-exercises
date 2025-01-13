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

  useEffect(() => {
    setBlogObject(blog)
  }, [])

  const style = {
    borderStyle: 'solid',
    margin: '10px',
    padding: '5px'
  }

  return (
  <div style={style}>
    {blog.title} 
    {view ? ( 
      <>
        <button onClick={toggleView}>hide</button>
        <p>{blog.url} {blog.author}</p>
        <p>likes {blogObject.likes} <button onClick={likeBlog}>like</button> </p> 
        {blog.user && <p>{blog.user.name}</p> }
      </>

    ) : (
      <button onClick={toggleView}>view</button>
    )}
  </div>
  )  
}

export default Blog