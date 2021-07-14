import React, {useState} from 'react'
const Blog = ({blog}) => {
  const [details, setDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWithDetails = { display: details ? '' : 'none' }

  const buttonLabel = details ? 'hide' : 'view'

 
  const toggleDetails = () => setDetails(!details)

  console.log(blog)

  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleDetails}>{buttonLabel}</button>
      <div style={showWithDetails}>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>

    </div>
  )  
}

export default Blog