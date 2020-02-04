import React from 'react';

const CountryExpanded = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
      </div>
      <h2>languages</h2>
      <ul>
        {
          country.languages.map(l => <li key={l.iso639_1}>{l.name}</li>)
        }
      </ul>
      <div>
        <img src={country.flag} alt={`${country.demonym} flag`}/>
      </div>
    </div>
  )
}

export default CountryExpanded;