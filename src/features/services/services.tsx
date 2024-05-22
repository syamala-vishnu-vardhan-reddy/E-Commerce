import axios from 'axios'

const API_KEY = 'a47e1c756b6e44d1b0d104134231410'
const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json'

export const fetchWeather = () => {
  return axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: 'vijayawada',
      days: 1
    }
  })
}
