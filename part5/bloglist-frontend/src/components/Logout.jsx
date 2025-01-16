import { useState, useEffect } from 'react'
import { localStorageUserItem } from './Login'

const LogOut = ({ user, setUser }) => {

  const handleLogOut = () => {
    window.localStorage.removeItem(localStorageUserItem)
    setUser(null)
  }

  return <>
    {user.name} logged in
    <button onClick={handleLogOut}>logout</button>
  </>
}

export default LogOut