import { useState } from "react"

const Blog = ({ blog }) => {

  const [view, toggleView] = useState(false)

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
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button>like</button> </p> 
        <p>{blog.author}</p>
      </>

    ) : (
      <button onClick={toggleView}>view</button>
    )}
  </div>
  )  
}

export default Blog