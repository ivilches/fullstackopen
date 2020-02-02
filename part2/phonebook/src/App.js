import React, { useState } from 'react'
const shortid = require('shortid');

const Entry = ({ person }) => {
  return (
    <li>
      {person.name}
    </li>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', id: shortid.generate() }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if(newName.trim() === '') {
      return;
    }

    setPersons(persons.concat({
      name: newName,
      id: shortid.generate()
    }));

    setNewName('');
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmitForm}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map(p => 
          <Entry key={p.id} person={p} />)
        }
      </ul>
    </div>
  )
}

export default App