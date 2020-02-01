import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const Feedback = ({ handleGoodClick, handleNeutralClick, handleBadClick }) => {
    return (
        <div>
            <Title text="Give feedback" />
            <Button text="good" onClick={handleGoodClick} />
            <Button text="neutral" onClick={handleNeutralClick} />
            <Button text="bad" onClick={handleBadClick} />
        </div>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    return (
        <div>
            <Title text="Statistics" />
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad  {bad}</p>
        </div>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1);
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1);
    }

    const handleBadClick = () => {
        setBad(bad + 1);
    }

    return (
        <div>
            <Feedback 
                handleGoodClick={handleGoodClick} 
                handleNeutralClick={handleNeutralClick} 
                handleBadClick={handleBadClick} />
            <Statistics 
                good={good} 
                neutral={neutral} 
                bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)