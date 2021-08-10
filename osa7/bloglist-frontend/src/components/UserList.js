import React, { useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeUsers, selectUsers } from '../reducers/userReducer'

const UserList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(selectUsers)

  if (!users) {
    return null
  }

  return (
    <div>
      <h2>Users</h2>
      <table id="users">
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList