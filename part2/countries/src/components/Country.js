import React, { useState } from 'react';

import Button from './Button';
import CountryExpanded from './CountryExpanded';

const Country = ({ country, expanded }) => {
  const [showExpanded, setShowExpanded] = useState(expanded);

  if (showExpanded) {
    return (
      <div>
        <Button
          onClick={() => setShowExpanded(!showExpanded)}
          text={showExpanded ? 'show less' : 'show'}
        />
        <CountryExpanded country={country} />
      </div>
    )
  }

  return (
    <div>
      <div>{country.name}</div>
      <Button
        onClick={() => setShowExpanded(!showExpanded)}
        text={showExpanded ? 'show less' : 'show'}
      />
    </div>
  )
}

export default Country;