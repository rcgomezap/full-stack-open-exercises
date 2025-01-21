import { useState } from 'react'
import blogService from '../services/blogs'
import { localStorageUserItem } from './Login'

const CreateBlog = ({ toggle, setToggle, notifHandler, toggleComponentVisibility, createBlogService }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title,
        url,
        ...(author && { author })
      }
      try {
        blogService.setToken(JSON.parse(window.localStorage.getItem(localStorageUserItem)).token)
      }
      catch(er){}
      
      const response = await createBlogService(newBlog)
      setToggle(toggle + 1)
      toggleComponentVisibility()
      notifHandler({ message: 'Created new blog' })
      console.log('created new blog', response)
    }
    catch (er) {console.log('error creating blog', er)}
  }

  return <>
    <h2>create new</h2>
    <form onSubmit={handleCreate}>
      <div>
            title:
        <input className='inputTitle' type="text" value={title} onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>
            author:
        <input className='inputAuthor' type="text" value={author} onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
            url:
        <input className='inputUrl' type="text" value={url} onChange={({ target }) => setUrl(target.value)}/>
      </div>
      <button className='btnSubmit' type="submit">create</button>
    </form>
  </>
}

export default CreateBlog