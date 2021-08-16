import blogService from '../services/blogs'
import { setNotification, setError } from './notificationReducer'

const actionType = {
  INIT_BLOGS: 'INIT_BLOGS',
  NEW_BLOG: 'NEW_BLOG',
  UPDATE_BLOG: 'UPDATE_BLOG',
  REMOVE_BLOG: 'REMOVE_BLOG',
  ADD_COMMENT: 'ADD_COMMENT'
}

export const selectBlogs = state => state.blogs

export const selectBlog = id =>
  state =>
    state.blogs.find(blog => blog.id === id)


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

export const updateBlog = (blog) => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.update(blog.id, blog)
      dispatch({
        type: actionType.UPDATE_BLOG,
        payload: returnedBlog
      })
    } catch(error) {
      dispatch(setError(error.response.data.error))
    }
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch({
        type: actionType.REMOVE_BLOG,
        payload: { ...blog }
      })
      dispatch(setNotification(
        `removed blog ${blog.title} by ${blog.author}`
      ))
    } catch(error) {
      dispatch(setError(error.response.data.error))
    }
  }
}


export const addComment = (blog, comment) => {
  return async dispatch => {
    try {
      const returnedComment = await blogService.addComment(blog.id, comment)
      dispatch({
        type: actionType.ADD_COMMENT,
        payload: {
          blogId: blog.id,
          comment: returnedComment
        }
      })
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

    case actionType.UPDATE_BLOG:
      return state
        .filter(blog => blog.id !== action.payload.id)
        .concat(action.payload)
        .sort(compareByLikes)

    case actionType.REMOVE_BLOG:
      return state
        .filter(blog => blog.id !== action.payload.id)

    case actionType.ADD_COMMENT:
      return state
        .map(blog =>
          blog.id === action.payload.blogId
            ? {
              ...blog,
              comments: [...blog.comments, action.payload.comment]
            }
            : blog
        )

    default:
      return state
  }
}

export default blogReducer