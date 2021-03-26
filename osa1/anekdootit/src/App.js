import React, { useState } from 'react'


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const maxVotes = (bestSoFar, currentVotes, idx) =>
    currentVotes > bestSoFar.votes ?
      { votes: currentVotes, idx: idx } :
      bestSoFar


  const mostVotedIdx = votes.reduce(maxVotes, { votes: 0, idx: 0 }).idx


  const handleNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>

      <div>
        <h1>Anecdote of the day</h1>
        <div>{anecdotes[selected]}</div>
        <div>has {votes[selected]} votes</div>
      </div>

      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNext}>next anecdote</button>
      </div>

      <div>
        <h1>Anecdote with most votes</h1>
        <div>{anecdotes[mostVotedIdx]}</div>
        <div>has {votes[mostVotedIdx]} votes</div>
      </div>

    </div>
  )
}

export default App;
