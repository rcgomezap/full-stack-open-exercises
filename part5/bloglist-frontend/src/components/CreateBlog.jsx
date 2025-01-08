import { useState } from "react";
import blogService from "../services/blogs"
import { localStorageUserItem } from "./Login";

const CreateBlog = ({ toggle, setToggle }) => {

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
            blogService.setToken(JSON.parse(window.localStorage.getItem(localStorageUserItem)).token)
            const response = await blogService.newBlog(newBlog)
            setToggle(toggle + 1)
            console.log('created new blog', response)
        }
        catch (er) {console.log('error creating blog', er)}
    }

    return <>
    <h2>create new</h2>
    <form onSubmit={handleCreate}>
        <div>
            title:
            <input type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
        </div>
        <div>
            author:
            <input type="text" value={author} onChange={({target}) => setAuthor(target.value)}/>
        </div>
        <div>
            url:
            <input type="text" value={url} onChange={({target}) => setUrl(target.value)}/>
        </div>
        <button type="submit">create</button>
    </form>
    </>
}

export default CreateBlog