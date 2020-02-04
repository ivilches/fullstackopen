import React from 'react';

const CountryFilter = ({ filter, onChange }) => {
  return (
    <div>
      <input value={filter} onChange={onChange} />
    </div>
  )
}

export default CountryFilter;