import React from 'react';

import CountrySimple from './CountrySimple';
import CountryExpanded from './CountryExpanded';

const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (countries.length === 1) {
    return <CountryExpanded country={countries[0]} />
  }

  return (
    <div>
      {
        countries.map(c => <CountrySimple 
                            key={c.alpha2Code} 
                            country={c} 
                            />)
      }
    </div>
  )
}

export default CountryList;