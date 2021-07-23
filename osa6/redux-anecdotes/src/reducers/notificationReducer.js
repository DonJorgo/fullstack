export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        timeoutId: setTimeout(() =>
          dispatch(clearNotification()), timeout * 1000)
      }
    })
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
    data: { }
  }
}

const updateTimeout = (state, action) => {
  clearTimeout(state.timeoutId)
  return action.data.timeoutId
}


const initialState = {
  message: 'initial notification...',
  visble: false,
  timeoutId: 0
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.data.message,
        visible: true,
        timeoutId: updateTimeout(state, action)
      }
    case 'CLEAR_NOTIFICATION':
      return { ...state, visible: false }
    default:
      return state
  }
}

export default notificationReducer