import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

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


  if (loggedInUser === null) {
    return (
      <div className="container">
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="container">
      <Menu />
      <h1>Blog App</h1>
      <Notification />

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
          <BlogForm />
          <BlogList />
        </Route>

      </Switch>
    </div>
  )
}

export default App