import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import LogOut from './components/Logout'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [toggle, setToggle] = useState(0)
  const [notif, setNotif] = useState({message: null, error: false})
  const [notifTrigger, setNotifTrigger] = useState(0)

  const notifHandler = (notififcation) => {
    setNotif(notififcation)
    setNotifTrigger(notifTrigger + 1)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [toggle])

    return (
    <div>
        <Notification message={notif.message} error={notif.error} notifTrigger={notifTrigger}/>
        {user ? ( <>
          <LogOut user={user} setUser={setUser}/>
          <CreateBlog toggle={toggle} setToggle={setToggle} notifHandler={notifHandler}/>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </> ) : ( <>
          <Login setUser={setUser} notifHandler={notifHandler}/>
        </>
        )}
    </div>
    )
}
export default App