import React, { useState } from 'react'

const Button = ({ name, handleClick }) =>
  <button onClick={handleClick}>
    {name}
  </button>


const StatisticLine = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {

  const all = good + neutral + bad

  if (all > 0) {
    const avg = (good - bad) / all
    const positiveRate = (good * 100 / all)
    return (
      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={avg} />
        <StatisticLine text="positive" value={positiveRate + ' %'} />
      </div >
    )
  } else {
    return <div>No feedback given</div>
  }
}


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
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )

}

export default App;
