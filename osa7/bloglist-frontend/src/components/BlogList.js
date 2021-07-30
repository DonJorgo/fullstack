import React, {
  useEffect
}  from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'

import Blog from './Blog'

import { initializeBlogs } from '../reducers/blogReducer'


const BlogList = ({ user }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)


  /*
  const notify = (message, isError = false) => {
    dispatch(isError
      ? setError(message)
      : setNotification(message)
    )
  }

  const compareByLikes = (blog1, blog2) => {
    if (blog1.likes < blog2.likes) return 1
    if (blog1.likes > blog2.likes) return -1
    return 0
  }

  const handleLike = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject)
      const sortedBlogs = blogs
        .filter(b => b.id !== id)
        .concat(returnedBlog)
        .sort(compareByLikes)
      setBlogs(sortedBlogs)
    } catch(error) {
      notify(error.response.data.error, true)
    }
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

  return (
    <div id="blogs">
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          onLike={() => {}}
          onRemove={() => {}}
          ownBlog={blog.user.username === user.username}
        />
      )}
    </div>
  )
}

export default BlogList