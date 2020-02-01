import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const Anecdote = ({ text, votes }) => {
  return (
    <>
      <p>{text}</p>
      <p>has {votes || 0} votes</p>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0));

  const setRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * (props.anecdotes.length - 1));
    setSelected(randomIndex);
  }

  const voteSelectedAnecdote = () => {
    votes[selected] += 1;
    setVotes([...votes]);
  }

  return (
    <div>
      <Anecdote 
        text={props.anecdotes[selected]} 
        votes={votes[selected]}/>
      <div>
      <Button
          text="vote"
          onClick={voteSelectedAnecdote} />
        <Button
          text="next anecdote"
          onClick={setRandomAnecdote} />
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)