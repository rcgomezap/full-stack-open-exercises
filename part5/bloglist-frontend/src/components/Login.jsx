import { useState, useEffect } from "react"
import loginService from "../services/login"

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.logIn({ username, password })
            setUser(user)
            console.log('logged in with user', user)
        }
        catch (er) {
            console.log('error in log in', er)
        }
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