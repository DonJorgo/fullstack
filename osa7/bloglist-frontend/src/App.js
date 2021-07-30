import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import loginService from './services/login'
import blogService from './services/blogs'

import { setNotification, setError } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(compareByLikes) )
    )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])


  const notify = (message, isError = false) => {
    dispatch(isError
      ? setError(message)
      : setNotification(message)
    )
  }


  const compareByLikes = (blog1, blog2) => {
    if (blog1.likes < blog2.likes) return 1
    if (blog1.likes > blog2.likes) return -1
    return 0
  }


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
      notify(error.response.data.error, true)
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }


  const handleBlogSubmit = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      notify(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    } catch (error) {
      notify(error.response.data.error, true)
    }
  }


  const handleLike = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject)
      const sortedBlogs = blogs
        .filter(b => b.id !== id)
        .concat(returnedBlog)
        .sort(compareByLikes)
      setBlogs(sortedBlogs)
    } catch(error) {
      notify(error.response.data.error, true)
    }
  }


  const handleRemove = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
    } catch(error) {
      notify(error.response.data.error, true)
    }
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
        <BlogForm onSubmit={handleBlogSubmit} />
      </Togglable>

      <div id="blogs">
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            onLike={handleLike}
            onRemove={handleRemove}
            ownBlog={blog.user.username === user.username}
          />
        )}
      </div>
    </div>
  )
}

export default App