import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, ListGroup } from 'react-bootstrap'

import { selectUser } from '../reducers/userReducer'

const User = () => {

  const id = useParams().id
  const user = useSelector(selectUser(id))

  if (!user) {
    return null
  }

  return (
    <Card bg="light">
      <Card.Header as="h2">{user.name}</Card.Header>

      <Card.Body>
        <Card.Title>added blogs</Card.Title>
        <Card.Text>
          <ListGroup>
            {user.blogs.map(blog => (
              <ListGroup.Item key={blog.id}>
                {blog.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default User