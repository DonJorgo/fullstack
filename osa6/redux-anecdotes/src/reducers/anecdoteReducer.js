import anecdoteService from '../services/anecdotes'

export const voteAnecdote = ({ id, content, votes }) => {
  return async dispatch => {
    const updatedAnectode = await anecdoteService.update(id, {
      content,
      votes: votes + 1
    })
    dispatch({
      type: 'VOTE',
      data: updatedAnectode
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
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
            : action.data)
        .sort(byVotes)

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data.sort(byVotes)

    default:
      return state
  }
}

const byVotes = (a,b) => a.votes < b.votes
  ? 1
  : a.votes > b.votes
    ? -1
    : 0

export default reducer