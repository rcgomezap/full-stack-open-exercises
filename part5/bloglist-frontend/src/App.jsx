import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import LogOut from './components/Logout'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [toggle, setToggle] = useState(0)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [toggle])

  if (user){
    return (
    <div>
        <LogOut user={user} setUser={setUser}/>
        <CreateBlog toggle={toggle} setToggle={setToggle}/>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
    )
  }
  else {
    return <Login setUser={setUser}/>
  }
}
export default App