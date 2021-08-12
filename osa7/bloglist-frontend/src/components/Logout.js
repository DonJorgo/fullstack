import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logout, selectUser } from '../reducers/loginReducer'

const Logout = () => {
  const dispatch = useDispatch()

  const user = useSelector(selectUser)

  if (!user) {
    return null
  }

  const logoutStyle = { padding: 5 }

  const buttonStyle = { margin: 5 }

  return (
    <span id="logout" style={logoutStyle}>
      {user.name} logged in
      <button style={buttonStyle} onClick={() => dispatch(logout())}>
      logout
      </button>
    </span>
  )
}

export default Logout