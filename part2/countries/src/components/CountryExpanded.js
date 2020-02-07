import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WEATHER_API_URL = 'http://api.weatherstack.com/current';

const CountryExpanded = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState(
    {
      temperature: '',
      icon: '',
      wind: ''
    }
  );

  const getMappedWeatherInfo = (data) => ({
    temperature: `${data.current.temperature}º Celsius`,
    icon: data.current.weather_icons[0],
    wind: `${data.current.wind_speed} kph direction ${data.current.wind_dir}`
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${WEATHER_API_URL}?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${country.capital}`);
      console.log('result', result);
      setWeatherInfo(getMappedWeatherInfo(result.data));
    };
    fetchData();
  }, []);

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
        <img src={country.flag} alt={`${country.demonym} flag`} />
      </div>
      <h2>Weather in {country.capital}</h2>
      <div>
        <p>temperature: {weatherInfo.temperature}</p>
        <img src={weatherInfo.icon} />
        <p>wind: {weatherInfo.wind}</p>
      </div>
    </div>
  )
}

export default CountryExpanded;