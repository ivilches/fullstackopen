import React from 'react';


const SearchFilter = ({ searchTerm, onChange }) => {
  return (
    <div>
      filter shown with <input value={searchTerm} onChange={onChange} />
    </div>
  )
}


export default SearchFilter;