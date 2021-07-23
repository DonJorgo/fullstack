import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

  const seq = props.seq


  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''
    props.createAnecdote(content)

    const message = `created anecdote: '${content}'`
    props.setNotification(message, 5, seq)
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

const mapStateToProps = state => {
  return {
    seq: state.notification.seq + 1
  }
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)