import React from 'react';
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h1>{ title }</h1>

const Content = ({ content}) => {
    return(
        <>
        {
            content.map( (c, index) => <Part key={index} title={c.part} exercises={c.exercises} />)
        }
        </>
    );
}

const Part = ({ title, exercises }) => <p>{title} {exercises}</p>

const Total = ( { total }) => <p>Number of exercises { total }</p>

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header title={course} />
      <Content content={ [
        { part: part1, exercises: exercises1 },
        { part: part2, exercises: exercises2 },
        { part: part3, exercises: exercises3 }
      ] } />
      <Total total={exercises1 + exercises2 + exercises3}/>      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
