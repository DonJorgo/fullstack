import loginService from '../services/login'
import loginUtils from '../utils/loginUtils'

import { setError } from '../reducers/notificationReducer'

const actionType = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

export const selectUser = state => state.login

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      loginUtils.login(user)
      dispatch({ type: actionType.LOGIN, payload: user })
    } catch (error) {
      dispatch(setError(error.response.data.error))
    }
  }
}

export const loggedIn = (user) => {
  loginUtils.login(user)
  return { type: actionType.LOGIN, payload: user  }
}

export const logout = () => {
  loginUtils.logout()
  return { type: actionType.LOGOUT }
}


const loginReducer = (state = null , action) => {
  switch(action.type) {

    case actionType.LOGIN:
      return state === null
        ? action.payload
        : state

    case actionType.LOGOUT:
      return null

    default:
      return state
  }
}

export default loginReducer