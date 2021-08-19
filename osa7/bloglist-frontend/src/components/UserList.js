import React, { useEffect }  from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

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
    <Table striped id="users">
      <thead>
        <tr>
          <th>User name</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default UserList