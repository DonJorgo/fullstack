import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { removeBlog, updateBlog, selectBlog } from '../reducers/blogReducer'
import { selectUser } from '../reducers/loginReducer'


const Blog = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector(selectUser)
  const blog = useSelector(selectBlog(useParams().id))

  const isOwnBlog = blog.user.username === user.username
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

    </div>
  )
}

export default Blog