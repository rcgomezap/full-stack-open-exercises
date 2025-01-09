import { useState, useEffect } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"

const localStorageUserItem = 'loggedUser'

const Login = ({ setUser, notifHandler }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect (() => {
        const loggedUser = window.localStorage.getItem(localStorageUserItem)
        if (loggedUser) {
            const parsedUser = JSON.parse(loggedUser)
            setUser(parsedUser)
            blogService.setToken(parsedUser.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.logIn({ username, password })
            window.localStorage.setItem(localStorageUserItem, JSON.stringify(user))
            setUser(user)
            blogService.setToken(user.token)
            console.log('logged in with user', user)
        }
        catch (er) {
            console.log('error in log in', er)
            notifHandler({message: 'wrong username or password', error: true})
        }
    }

    const handleLogOut = () => {
        window.localStorage.removeItem(localStorageUserItem)
        setUser(null)
    }

    return <>
    <h2>log in to application</h2>
    <form onSubmit={handleLogin}>
        <div>
            username
            <input type="text" value={username} onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
            password
            <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <div>
            <button type="submit">Submit</button>
        </div>
    </form>
    </>
}

export default Login
export { localStorageUserItem }