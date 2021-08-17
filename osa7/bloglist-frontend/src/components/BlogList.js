import React, { useEffect }  from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'

import { initializeBlogs, selectBlogs } from '../reducers/blogReducer'


const BlogList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(selectBlogs)

  return (
    <Table striped id="blogs">
      <tbody>
        {blogs.map(blog =>
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
              </Link>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default BlogList