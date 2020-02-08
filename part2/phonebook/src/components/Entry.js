import React from 'react'

const Entry = ({ person, deleteAction }) => {
  return (
    <li>
      <span>{person.name} - {person.number}</span>
      <button onClick={deleteAction}>delete</button>
    </li>
  )
}

export default Entry;