import {getApiUrl, getApiKey} from '../config';
export const getCurrentWeather = ({city}) => {
    const response = ''
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': getApiKey,
            'X-RapidAPI-Host': getApiUrl
        }
    };

    return fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`, options)
      .then(response => response.json())
}