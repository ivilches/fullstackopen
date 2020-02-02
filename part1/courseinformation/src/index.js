import React from 'react';
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h1>{title}</h1>

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content content={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Content = ({ content }) => {
  return (
    <>
      {
        content.map((c) => <Part key={c.id} title={c.name} exercises={c.exercises} />)
      }
    </>
  );
}

const Part = ({ title, exercises }) => <p>{title} {exercises}</p>

const Total = ({ parts }) => {
  return (
    <p><b>Number of exercises {parts.reduce((a, b) => a + b.exercises, 0)}</b></p>
  )
}

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {
        courses.map(c => <Course key={c.id} course={c} />)
      }
      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
