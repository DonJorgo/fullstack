import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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

  const hadleLogin = async (event) => {
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
     
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }


  const handleBlogSubmit = async (event) => {
    event.preventDefault()

    try {
      const returnedBlog = await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newUrl
      })
      setBlogs(blogs.concat(returnedBlog))
    } catch (error) {

    }
  }

  if (user === null) {
    return (
      <LoginForm
        username={username}
        value={password}
        onSubmit={hadleLogin}
        onUsernameChange={({target}) => setUsername(target.value)}
        onPasswordChange={({target}) => setPassword(target.value)}
      />
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </p>
      <BlogForm
        title={newTitle}
        author={newAuthor}
        url={newUrl}
        onSubmit={handleBlogSubmit}
        onTitleChange={({target}) => setNewTitle(target.value)}
        onAuthorChange={({target}) => setNewAuthor(target.value)}
        onUrlChange={({target}) => setNewUrl(target.value)}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App