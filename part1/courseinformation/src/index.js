import React from 'react';
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h1>{title}</h1>

const Content = ({ content }) => {
    return (
        <>
            {
                content.map((c, index) => <Part key={index} title={c.name} exercises={c.exercises} />)
            }
        </>
    );
}

const Part = ({ title, exercises }) => <p>{title} {exercises}</p>

const Total = ({ parts }) => {
    return(
        <p>Number of exercises {parts.reduce((a, b) => a + b.exercises, 0)}</p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }

    return (
        <div>
            <Header title={course.name} />
            <Content content={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
