import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Logout from './components/Logout'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({message: null})

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])


  const notify = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message: null })
    }, 5000)
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


  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
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
      setBlogs(blogs.filter(b => b.id !== id).concat(returnedBlog))
    } catch(error) {
      notify(error.response.data.error, true)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification 
          message={notification.message}
          isError={notification.isError}
        />

        <LoginForm
          username={username}
          value={password}
          onSubmit={handleLogin}
          onUsernameChange={({target}) => setUsername(target.value)}
          onPasswordChange={({target}) => setPassword(target.value)}
        />
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>

      <Notification 
        message={notification.message}
        isError={notification.isError}
      />

      <Logout
        name={user.name}
        onLogout={handleLogout}
      />

      <Togglable buttonLabel="create new blog" ref={blogFormRef}> 
        <BlogForm onSubmit={handleBlogSubmit} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}  onLike={handleLike}/>
      )}
    </div>
  )
}

export default App