import React, { useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'

import { initializeBlogs } from '../reducers/blogReducer'


const BlogList = (props) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)

  return (
    <div id="blogs">
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          {...props}
        />
      )}
    </div>
  )
}

export default BlogList