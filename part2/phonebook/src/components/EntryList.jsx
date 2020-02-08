import React from 'react';

import Entry from './Entry';

const EntryList = ({ persons, deleteAction }) => {
  return (
    <ul>
      {
        persons.map(p =>
          <Entry 
            key={p.id} 
            person={p}
            deleteAction={deleteAction(p)}
          />)
      }
    </ul>
  )
}

export default EntryList;