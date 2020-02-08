import React, { useState } from 'react';

import Note from './components/Note';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('add a new note...');
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll
    ? notes
    : notes.filter(n => n.important)


  const rows = () => {
    return notesToShow.map(note =>
      <Note
        key={note.id}
        note={note} />
    )
  }

  const addNote = (event) => {
    event.preventDefault();

    if (newNote.trim() === '') {
      return;
    }

    setNotes(notes.concat({
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5
    }));
    setNewNote('');
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const onClickShowAll = () => {
    setShowAll(!showAll);
  }

  return (
    <div>
      <h1>Notes</h1>
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