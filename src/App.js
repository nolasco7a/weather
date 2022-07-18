import React,{useEffect, useState} from 'react';
import {getCurrentWeather} from './services/getCurrentWeather';
import './App.css';

const App = () => {
  const [city, setCity] = useState('chicago');
  const [weather, setWeather] = useState('');
  const [loading, setLoading] = useState(false);
  const [celcius, setCelcius] = useState(true);

  useEffect(() =>{
    Promise.all([
      getCurrentWeather({city})
    ]).then(response =>{
      setWeather(response[0])
    }).catch(error =>{
      new Error(error)
    }).finally(()=>{
      setLoading(false)
    })
  }, [city])

  const selectCity = (e) => {
    if(e.key === 'Enter'){
      setCity(e.target.value);
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="app">
      <div className="weather-container">
        <div className="search">
          <input type="text" placeholder='City' onKeyPress={selectCity}/>
        </div>
        <div className='toggle'>
          <button onClick={()=>setCelcius(!celcius)}>{celcius?'f':'c'}°</button>
        </div>
        {weather.error &&
          <div className='error'>
            <h1>{weather.error.message}</h1>
          </div>
        }
        {weather.location &&
          <div className='weather-content'>
            <div className="city">
              <small>{weather.location.region ? weather.location.region : null}</small>
              <h1>{weather.location.name}</h1>
            </div>
            <div className='weather-icon'>
              <img src={`https:${weather.current.condition.icon}`} alt="weather-icon"/>
            </div>
            <div className='temp'>
              <h1>{celcius?weather.current.temp_c:weather.current.temp_f}°</h1>
            </div>
            <div className="feelslike">
              <p>So, it's {weather.current.condition.text}</p>
              <small>Feels like {celcius?weather.current.feelslike_c:weather.current.feelslike_f}°</small> <br />
              <small>UV {weather.current.uv}</small>
              <small>, Humidity {weather.current.humidity}</small>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
