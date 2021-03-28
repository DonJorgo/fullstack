import React from 'react'

const Header = ({course}) => 
    <h1>{course}</h1>


const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }) => (
    <div>
        {parts.map(part =>
            <Part key={part.id} part={part} />
        )}
    </div>
)

const Total = ({ parts }) => {
    const sumExercises = (sum, part) => sum + part.exercises
    const total = parts.reduce(sumExercises, 0)

    return (
        <b>Tolal number of exercises {total}</b>
    )
}

const Course = ({ course }) =>
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>

export default Course