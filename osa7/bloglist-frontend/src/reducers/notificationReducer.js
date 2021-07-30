const actionType = {
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION'
}

export const setNotification = (message, timeout = 5, isError = false) => {
  return async dispatch => {
    dispatch({
      type: actionType.SET_NOTIFICATION,
      payload: {
        message,
        isError,
        timeoutId: setTimeout(() =>
          dispatch(clearNotification()), timeout * 1000)
      }
    })
  }
}

export const setError = (message, timeout = 5) =>
  setNotification(message, timeout, true)


const clearNotification = () => {
  return {
    type: actionType.CLEAR_NOTIFICATION
  }
}


const notificationReducer  = (state = { message: null }, action) => {
  switch(action.type) {
  case actionType.SET_NOTIFICATION:
    clearTimeout(state.timeoutId)
    return {
      ...action.payload,
    }
  case actionType.CLEAR_NOTIFICATION:
    return { message: null }
  default:
    return state
  }
}

export default notificationReducer