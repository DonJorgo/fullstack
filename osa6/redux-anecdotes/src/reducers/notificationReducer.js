export const setNotification = (message, timeout, seq) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, seq }
    })
    setTimeout(() =>
      dispatch(clearNotification(message, seq)), timeout * 1000)
  }
}


export const clearNotification = (message, seq) => {
  return {
    type: 'CLEAR_NOTIFICATION',
    data: { message, seq }
  }
}


const initialState = {
  message: 'initial notification...',
  visble: false,
  seq: 0
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.data.message, visible: true, seq: action.data.seq }
    case 'CLEAR_NOTIFICATION':
      return action.data.message === state.message && action.data.seq === state.seq
        ? { ...state, visible: false }
        : state
    default:
      return state
  }
}

export default notificationReducer