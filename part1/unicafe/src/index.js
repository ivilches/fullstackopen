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
    const getTotal = () => good + neutral + bad;
    const getAverage = () => good - bad;
    const getPositivePercentage = () => `${(good / (getTotal() || 1)) * 100}%`;

    const title = <Title text="Statistics" />;

    if (getTotal() === 0) {
        return (
            <div>
                {title}
                No feedback given
            </div>
        )
    }

    return (
        <div>
            {title}
            <table>
                <tbody>
                    <Statistic text="good" value={good} />
                    <Statistic text="neutral" value={neutral} />
                    <Statistic text="bad" value={bad} />
                    <Statistic text="all" value={getTotal()} />
                    <Statistic text="average" value={getAverage()} />
                    <Statistic text="positive" value={getPositivePercentage()} />
                </tbody>
            </table>
        </div>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text} {value}</td>
        </tr>
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