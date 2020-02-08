import React, { useState, useEffect } from 'react'
import shortid from 'shortid';

import SearchFilter from './components/SearchFilter';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import Notification from './components/Notification';
import entriesService from './services/entries';

const App = () => {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await entriesService.getAll();
      setEntries(result);
    };
    fetchData();
  }, []);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);

  const entriesToShow = entries.filter(
    p => p.name.toLowerCase()
      .includes(searchTerm.toLowerCase()));

  const existsNameInPhoneBook = (name) => entries.some(p => p.name === name.trim());

  const updateEntry = async (entry) => {
    try {
      await entriesService.update(entry);
      const entriesWithoutUpdatedOne = entries.filter(e => e.id !== entry.id);
      setEntries(entriesWithoutUpdatedOne.concat(entry));
    } catch (error) {
      const errorMessage = (error?.response?.status === 404)
        ? `Information of ${entry.name} has already been removed from the server`
        : 'An error has occured';

      showMessage({
        text: errorMessage,
        isError: true,
      });
      console.error(error);
    }
  }

  const showMessage = (mesageToShow) => {
    setMessage(mesageToShow);
    setTimeout(() => {
      setMessage(null);
    }, 5000)
  }

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    if (newName.trim() === '') {
      return;
    }

    if (existsNameInPhoneBook(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const entry = entries.find(e => e.name === newName);
        updateEntry({ ...entry, number: newNumber });
        return;
      }
    }

    const newEntry = {
      id: shortid.generate(),
      name: newName,
      number: newNumber,
    };

    try {
      await entriesService.create(newEntry);
      setEntries(entries.concat(newEntry));
      showMessage({
        text: `Added ${newEntry.name}`,
        isError: false,
      });
    } catch (error) {
      showMessage({
        text: 'An error has occured',
        isError: true,
      });
      console.error(error);
    }


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

  const deleteEntry = (entry) => async () => {
    if (!window.confirm(`Delete`)) {
      return;
    }

    try {
      await entriesService.remove(entry.id);
      setEntries(entries.filter(e => e.id !== entry.id));
      showMessage({
        text: `Deleted ${entry.name}`,
        isError: false,
      });
    } catch (error) {
      if (error?.response?.status === 404) {
        setEntries(entries.filter(e => e.id !== entry.id));
      }
      else {
        showMessage({
          text: 'An error has occured',
          isError: true,
        });
      }

      console.error(error);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <SearchFilter searchTerm={searchTerm} onChange={handleSearchTermChange} />
      <EntryForm
        onSubmit={handleSubmitForm}
        newName={newName}
        onChangeNewName={handleNewNameChange}
        newNumber={newNumber}
        onChangeNewNumber={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <EntryList
        persons={entriesToShow}
        deleteAction={deleteEntry}
      />
    </div>
  )
}

export default App;