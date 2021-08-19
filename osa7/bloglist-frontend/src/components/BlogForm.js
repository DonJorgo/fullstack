import React, { useState, useRef } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import Togglable from './Togglable'

import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    dispatch(createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }))

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <h2>create new</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="newTitle">
          <Form.Label column sm={2}>title:</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={newTitle}
              name="Title"
              onChange={({ target }) => setNewTitle(target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="newAuthor">
          <Form.Label column>author:</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={newAuthor}
              name="Author"
              onChange={({ target }) => setNewAuthor(target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="newUrl">
          <Form.Label column>url:</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={newUrl}
              name="Url"
              onChange={({ target }) => setNewUrl(target.value)}
            />
          </Col>
        </Form.Group>
        <Button variant="success" id="submitNewBlog" type="submit">create</Button>
      </Form>
    </Togglable>
  )
}
export default BlogForm