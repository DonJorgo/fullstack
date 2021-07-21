export const showNotification = (message, seq) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: { message, seq }
  }
}

export const hideNotification = (message, seq) => {
  return {
    type: 'HIDE_NOTIFICATION',
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
    case 'SHOW_NOTIFICATION':
      return { message: action.data.message, visible: true, seq: action.data.seq }
    case 'HIDE_NOTIFICATION':
      return action.data.message === state.message && action.data.seq === state.seq
        ? { ...state, visible: false }
        : state
    default:
      return state
  }
}

export default notificationReducer