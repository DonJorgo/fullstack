const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const byVotes = (a,b) => a.votes < b.votes
  ? 1
  : a.votes > b.votes
    ? -1
    : 0


export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: asObject(content)
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {

  const changedAnecdote = () => {
    const anecdote = state.find(a => a.id === action.data.id)
    return {
      ...anecdote,
      votes: anecdote.votes + 1
    }
  }

  switch(action.type) {
    case 'VOTE':
      return state
        .map(anecdote =>
          anecdote.id !== action.data.id
            ? anecdote
            : changedAnecdote())
        .sort(byVotes)

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data.sort(byVotes)

    default:
      return state
  }
}

export default reducer