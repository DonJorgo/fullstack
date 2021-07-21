import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {

  const dispatch = useDispatch()
  const seq = useSelector(state => state.notification.seq)


  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))

    const message = `created anecdote: '${content}'`
    dispatch(setNotification(message, 5, seq+1))
  }


  return(
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="content"/></div>
        <button type="submit">create</button>
      </form>
    </>
  )

}

export default AnecdoteForm