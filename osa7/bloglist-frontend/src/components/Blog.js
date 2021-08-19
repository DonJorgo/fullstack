import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button, Row, Col } from 'react-bootstrap'


import Comments from './Comments'

import {
  initializeBlogs, removeBlog, updateBlog, addComment,
  selectBlog, selectBlogs } from '../reducers/blogReducer'

import { selectUser } from '../reducers/loginReducer'


const Blog = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const blogId = useParams().id
  const blog = useSelector(selectBlog(blogId))
  const user = useSelector(selectUser)
  const blogs = useSelector(selectBlogs)

  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      dispatch(initializeBlogs())
    }
  })

  const isOwnBlog = blog && user && blog.user.username === user.username
  const showForOwnBlog = { display: isOwnBlog ? '' : 'none' }


  const handleLike = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const handleRemove = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
      history.push('/')
    }
  }

  const handleComment = (comment) => {
    dispatch(addComment(blog, comment))
  }

  if (!blog) {
    return null
  }

  return(
    <>
      <Card bg="light">
        <Card.Header as="h2">
          <Row>
            <Col>
              {blog.title}
            </Col>
            <Col md="auto">
              <Button variant="outline-danger" style={showForOwnBlog} onClick={handleRemove}>
            Remove
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title>{blog.author}</Card.Title>

          <Card.Link href={blog.url} className="url">{blog.url}</Card.Link>

          <Card.Text className="likes">
            {blog.likes} likes
            <Button onClick={handleLike} variant="outline-success" size="sm">
              like
            </Button>
          </Card.Text>

          <Card.Footer className="text-muted">added by {blog.user.name}</Card.Footer>
        </Card.Body>
      </Card>
      <Comments blog={blog} onSubmitComment={handleComment}/>
    </>
  )
}

export default Blog