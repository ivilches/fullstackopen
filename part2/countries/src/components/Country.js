import React, { useState } from 'react';

import Button from './Button';

const Country = ({ country, expanded }) => {
  const [showExpanded, setShowExpanded] = useState(expanded);

  if (showExpanded) {
    return (
      <div>
        <h1>{country.name}</h1>
        <Button
          onClick={() => setShowExpanded(!showExpanded)}
          text={showExpanded ? 'show less' : 'show'}
        />
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
          <img src={country.flag} alt={`${country.demonym} flag`} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div>{country.name}</div>
      <Button
        onClick={() => setShowExpanded(!showExpanded)}
        text={showExpanded ? 'show less' : 'show'} />
    </div>
  )
}

export default Country;