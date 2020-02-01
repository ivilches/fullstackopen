import React from 'react';
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h1>{title}</h1>

const Content = ({ content }) => {
    return (
        <>
            {
                content.map((c, index) => <Part key={index} title={c.part} exercises={c.exercises} />)
            }
        </>
    );
}

const Part = ({ title, exercises }) => <p>{title} {exercises}</p>

const Total = ({ total }) => <p>Number of exercises {total}</p>

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header title={course} />
            <Content content={[
                { part: part1.name, exercises: part1.exercises },
                { part: part2.name, exercises: part2.exercises },
                { part: part3.name, exercises: part3.exercises },
            ]} />
            <Total total={part1.exercises + part2.exercises + part3.exercises} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
