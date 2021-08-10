import React, { useEffect, useRef } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'


import { loggedIn, selectUser } from './reducers/loginReducer'
import loginUtils from './utils/loginUtils'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUser = loginUtils.getLoggedUser()
    if (loggedUser) {
      dispatch(loggedIn(loggedUser))
    }
  }, [])

  const loggedInUser = useSelector(selectUser)

  const blogFormRef = useRef()


  if (loggedInUser === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Logout />

      <Switch>

        <Route path="/users/:id">
          <User/>
        </Route>

        <Route path="/users">
          <UserList/>
        </Route>

        <Route path="/blogs/:id">
          <Blog/>
        </Route>

        <Route path="/">
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm onSubmit={() => {blogFormRef.current.toggleVisibility()}} />
          </Togglable>

          <BlogList />
        </Route>
      </Switch>
    </div>
  )
}

export default App