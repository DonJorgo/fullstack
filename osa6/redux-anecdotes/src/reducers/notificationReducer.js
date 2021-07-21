const notificationReducer = (state = 'initial notification...', action) => {
  switch (action.type) {
    case 'VOTE':
      return state  
    case 'NEW_ANECDOTE':
      return state
    default:
      return state
  }
}

export default notificationReducer