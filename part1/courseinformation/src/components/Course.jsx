import React from 'react';

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content content={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = ({ title }) => <h2>{title}</h2>

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
    <p><b>total of {parts.reduce((a, b) => a + b.exercises, 0)} exercises</b></p>
  )
}

export default Course;