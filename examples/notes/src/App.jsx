import React, { useState, useEffect } from 'react';
import shortid from 'shortid';

import notesService from './services/notes';
import Note from './components/Note';
import Notification from './components/Notification';

import './index.css';

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await notesService.getAll();
      setNotes(data);
    };
    fetchData();
  }, []);

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('add a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const notesToShow = showAll
    ? notes
    : notes.filter(n => n.important)


  const rows = () => {
    return notesToShow.map(note =>
      <Note        
        key={note.id}
        note={note} 
        toggleImportance={toggleImportanceOf(note.id)}
      />
    )
  }

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 2000);
  }

  const toggleImportanceOf = (id) => async () => {
    const note = notes.find(n => n.id === id);
    const changedNote = {...note, important: !note.important};
    try {
      const response = await notesService.update(changedNote);
      setNotes(notes.map(n => (n.id !== id) ? n : response));
    } catch (e) {
      console.error('e', e);      
      showError(`the note '${note.content}' was already deleted from the server`);
      setNotes(notes.filter(n => n.id !== id));
    }
  };

  const addNote = async (event) => {
    event.preventDefault();

    if (newNote.trim() === '') {
      return;
    }

    const noteToAdd = {
      id: shortid.generate(),
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    };

    await notesService.create(noteToAdd);
    setNotes(notes.concat(noteToAdd));
    setNewNote('');
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  const onClickShowAll = () => {
    setShowAll(!showAll);
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={onClickShowAll}>{showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {
          rows()
        }
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App;