import { useState } from "react"

const Blog = ({ blog }) => {

  const [view, setView] = useState(false)

  const toggleView = () => {
    setView(!view)
  }

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