import anecdoteService from '../services/anecdotes'

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


const reducer = (state = [], action) => {

  switch(action.type) {
    case 'VOTE':
      return state
        .map(anecdote =>
          anecdote.id !== action.data.id
            ? anecdote
            : votedAnecdote(state, action.data.id))
        .sort(byVotes)

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data.sort(byVotes)

    default:
      return state
  }
}

const votedAnecdote = (state, id) => {
  const anecdote = state.find(a => a.id === id)
  return {
    ...anecdote,
    votes: anecdote.votes + 1
  }
}

const byVotes = (a,b) => a.votes < b.votes
  ? 1
  : a.votes > b.votes
    ? -1
    : 0

export default reducer