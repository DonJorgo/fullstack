import React, { useState } from 'react'

const Button = ({ name, handleClick }) => 
  <button onClick={handleClick}>
    {name}
  </button>


const Statistics = ({good, neutral, bad}) => 
  <div>
    <h1>statistics</h1>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
  </div>



const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button name='good' handleClick={handleGood} />
      <Button name='neutral' handleClick={handleNeutral} />
      <Button name='bad' handleClick={handleBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )

}

export default App;
