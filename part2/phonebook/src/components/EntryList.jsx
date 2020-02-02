import React from 'react';

import Entry from './Entry';

const EntryList = ({ persons }) => {
  return (
    <ul>
      {
        persons.map(p =>
          <Entry key={p.id} person={p} />)
      }
    </ul>
  )
}

export default EntryList;