import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logout, selectUser } from '../reducers/loginReducer'

const Logout = () => {
  const dispatch = useDispatch()

  const user = useSelector(selectUser)

  return (
    <p>
      {user.name} logged in
      <button onClick={() => dispatch(logout())}>
      logout
      </button>
    </p>
  )
}

export default Logout