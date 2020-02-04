import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CountryFilter from './components/CountryFilter';
import CountryList from './components/CountryList';

const backendCountriesUrl = "https://restcountries.eu/rest/v2/all";

function App() {
  /* Effects */
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(backendCountriesUrl);
      setCountries(result.data);
    }
    fetchData();
  }, []);

  const [filter, setFilter] = useState('');
  /* End of effects */

  const getFilteredCountries = () => {
    return countries.filter(
      c => c.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  const countriesToShow = (filter.trim() === '')
    ? []
    : getFilteredCountries();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  return (
    <div className="App">
      <CountryFilter
        value={filter}
        onChange={handleFilterChange}
      />
      <CountryList countries={countriesToShow} />
    </div>
  );
}

export default App;
