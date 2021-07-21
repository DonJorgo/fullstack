import React from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {

  const anecdotes = useSelector(state =>
    state.anecdotes
      .filter(({ content }) => content.includes(state.filter))
  )

  const seq = useSelector(state => state.notification.seq)

  const dispatch = useDispatch()


  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))

    const message = `you voted ${anecdote.content}`
    dispatch(showNotification(message, seq+1))
    setTimeout(() =>
      dispatch(hideNotification(message, seq+1)), 5000)
  }


  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList