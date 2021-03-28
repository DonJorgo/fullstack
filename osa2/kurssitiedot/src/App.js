import React from 'react'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = ({part}) => (
  <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </div>
)

// const Total = (props) => {
//   const exercises = props.parts.map(part => part.exercises)
//   const total = exercises[0] + exercises[1] + exercises[2]
//   return (
//     <p>Number of exercises {total}</p>
//   )
// }

const Course = ({ course }) =>
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    {/* <Total parts={course.parts} /> */}
  </div>


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;