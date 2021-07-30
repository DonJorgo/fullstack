import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { updateBlog } from '../reducers/blogReducer'


const Blog = ({ blog, onRemove, ownBlog }) => {
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

  const showForOwnBlog = { display: ownBlog ? '' : 'none' }

  const showWithDetails = { display: details ? '' : 'none' }

  const buttonLabel = details ? 'hide' : 'view'

  const toggleDetails = () => setDetails(!details)

  /*
  const notify = (message, isError = false) => {
    dispatch(isError
      ? setError(message)
      : setNotification(message)
    )
  }


  const handleRemove = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
    } catch(error) {
      notify(error.response.data.error, true)
    }
  }
*/

  const handleLike = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  const handleRemove = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      onRemove(blog.id)
  }


  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleDetails}>{buttonLabel}</button>

      <div style={showWithDetails} className="details">
        <div>{blog.url}</div>

        <div>
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

export default Blog