import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { removeBlog, updateBlog } from '../reducers/blogReducer'


const Blog = ({ blog, user }) => {
  const [details, setDetails] = useState(false)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    backgroundColor: 'lightblue',
    borderRadius: '5px'
  }

  const isOwnBlog = blog.user.username === user.username

  const showForOwnBlog = { display: isOwnBlog ? '' : 'none' }

  const showWithDetails = { display: details ? '' : 'none' }

  const buttonLabel = details ? 'hide' : 'view'

  const toggleDetails = () => setDetails(!details)

  const handleLike = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const handleRemove = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
    }
  }


  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleDetails}>{buttonLabel}</button>

      <div style={showWithDetails} className="details">
        <div className="url">{blog.url}</div>

        <div className="likes">
          {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>

        <div>{blog.user.name}</div>

        <div style={showForOwnBlog}>
          <button style={removeButtonStyle} onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    user: PropTypes.object.isRequired,
    likes: PropTypes.number.isRequired
  })
}

export default Blog