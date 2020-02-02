import React from 'react';

const EntryForm = ({ onSubmit, newName, onChangeNewName, newNumber, onChangeNewNumber }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={onChangeNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onChangeNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default EntryForm;