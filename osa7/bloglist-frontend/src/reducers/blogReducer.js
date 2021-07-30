import blogService from '../services/blogs'
import { setNotification, setError } from './notificationReducer'

const actionType = {
  INIT_BLOGS: 'INIT_BLOGS',
  NEW_BLOG: 'NEW_BLOG'
}


const compareByLikes = (blog1, blog2) => {
  if (blog1.likes < blog2.likes) return 1
  if (blog1.likes > blog2.likes) return -1
  return 0
}

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: actionType.INIT_BLOGS,
        payload: blogs.sort(compareByLikes)
      })
    } catch (error){
      dispatch(setError(error.response.data.error))
    }
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      dispatch({
        type: actionType.NEW_BLOG,
        payload: returnedBlog
      })
      dispatch(setNotification(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      ))
    } catch(error) {
      dispatch(setError(error.response.data.error))
    }
  }
}


const blogReducer = (state = [], action) => {
  switch(action.type) {
    case actionType.INIT_BLOGS:
      return  [...action.payload]
    case actionType.NEW_BLOG:
      return [...state, action.payload]
    default:
      return state
  }
}

export default blogReducer