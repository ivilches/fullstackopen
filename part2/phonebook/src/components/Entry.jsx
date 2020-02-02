import React from 'react'

const Entry = ({ person }) => {
  return (
    <li>
      {person.name} - {person.number}
    </li>
  )
}

export default Entry;