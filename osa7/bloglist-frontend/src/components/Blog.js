import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Comments from './Comments'

import { initializeBlogs, removeBlog, updateBlog, selectBlog, selectBlogs } from '../reducers/blogReducer'
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

  const removeButtonStyle = {
    backgroundColor: 'lightblue',
    borderRadius: '5px'
  }

  const handleLike = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const handleRemove = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
      history.push('/')
    }
  }

  if (!blog) {
    return null
  }

  return(
    <div>
      <h2>{blog.title} {blog.author}</h2>

      <a href={blog.url} className="url">{blog.url}</a>

      <div className="likes">
        {blog.likes} likes
        <button onClick={handleLike}>
          like
        </button>
      </div>

      <div>added by {blog.user.name}</div>

      <div style={showForOwnBlog}>
        <button style={removeButtonStyle} onClick={handleRemove}>
            Remove
        </button>
      </div>

      <Comments blog={blog} />

    </div>
  )
}

export default Blog