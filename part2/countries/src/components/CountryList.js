import React from 'react';

import Country from './Country';

const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (countries.length === 1) {
    return <Country
            country={countries[0]}
            expanded={true}
            />
  }

  return (
    <div>
      {
        countries.map(c => <Country
                            key={c.alpha2Code} 
                            country={c}
                            expanded={false}
                            />)
      }
    </div>
  )
}

export default CountryList;