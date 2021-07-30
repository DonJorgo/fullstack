import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import loginService from './services/login'
import blogService from './services/blogs'

import { setError } from './reducers/notificationReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setError(error.response.data.error))
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification />

        <LoginForm
          username={username}
          password={password}
          onSubmit={handleLogin}
          onUsernameChange={({ target }) => setUsername(target.value)}
          onPasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }



  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <Logout
        name={user.name}
        onLogout={handleLogout}
      />

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm onSubmit={() => {blogFormRef.current.toggleVisibility()}} />
      </Togglable>

      <BlogList user={user} />

    </div>
  )
}

export default App