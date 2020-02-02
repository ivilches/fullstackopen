import React, { useState } from 'react'
const shortid = require('shortid');

const Entry = ({ person }) => {
  return (
    <li>
      {person.name} - {person.number}
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { id: shortid.generate(), name: 'Arto Hellas', number: '040-123456' },
    { id: shortid.generate(), name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: shortid.generate(), name: 'Dan Abramov', number: '12-43-234345' },
    { id: shortid.generate(), name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const personsToShow = persons.filter(
    p => p.name.toLowerCase()
                .includes(searchTerm.toLowerCase()));

  const existsNameInPhoneBook = (name) => persons.some(p => p.name === name.trim());

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (newName.trim() === '') {
      return;
    }

    if (existsNameInPhoneBook(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({
      id: shortid.generate(),
      name: newName,
      number: newNumber,
    }));

    setNewName('');
    setNewNumber('');
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchTermChange = (event) => {
    console.log('evet', event.target.value);
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchTerm} onChange={handleSearchTermChange} />
      </div>
      <form onSubmit={handleSubmitForm}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          personsToShow.map(p =>
            <Entry key={p.id} person={p} />)
        }
      </ul>
    </div>
  )
}

export default App