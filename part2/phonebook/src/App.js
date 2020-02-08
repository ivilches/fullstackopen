import React, { useState, useEffect } from 'react'
import axios from 'axios';

import SearchFilter from './components/SearchFilter';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
const shortid = require('shortid');

const backendPersonsUrl = 'http://localhost:3001/persons'

const App = () => {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(backendPersonsUrl);
      setEntries(result.data);
    };
    fetchData();
  }, []);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const entriesToShow = entries.filter(
    p => p.name.toLowerCase()
      .includes(searchTerm.toLowerCase()));

  const existsNameInPhoneBook = (name) => entries.some(p => p.name === name.trim());

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    if (newName.trim() === '') {
      return;
    }

    if (existsNameInPhoneBook(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newEntry = {
      id: shortid.generate(),
      name: newName,
      number: newNumber,
    };

    await axios.post(backendPersonsUrl, newEntry);    
    setEntries(entries.concat(newEntry));

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
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter searchTerm={searchTerm} onChange={handleSearchTermChange} />
      <EntryForm 
        onSubmit={handleSubmitForm}
        newName={newName}
        onChangeNewName={handleNewNameChange}
        newNumber={newNumber}
        onChangeNewNumber={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <EntryList persons={entriesToShow} />
    </div>
  )
}

export default App;