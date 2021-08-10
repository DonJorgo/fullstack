import userService from '../services/users'
import { setError } from './notificationReducer'

const actionType = {
  INIT_USERS: 'INIT_USERS'
}

export const selectUsers = state => state.users

export const initializeUsers = () => {
  return async dispatch => {
    try {
      const users = await userService.getAll()
      dispatch({
        type: actionType.INIT_USERS,
        payload: users
      })
    } catch(error) {
      dispatch(setError(error.response.data.error))
    }
  }
}

const userReducer = (state = [], action) => {
  switch(action.type) {

    case actionType.INIT_USERS:
      return [...action.payload]

    default:
      return state
  }
}

export default userReducer