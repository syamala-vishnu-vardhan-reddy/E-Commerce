import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeatherRequest } from '../slices/slices'
import { RootState } from '../../store'

const Weather: React.FC = () => {
  const dispatch = useDispatch()
  const { forecast, loading, error } = useSelector(
    (state: RootState) => state.weather
  )
  console.log(forecast,loading,error)
  useEffect(() => {
    dispatch(fetchWeatherRequest())
  }, [dispatch])
  

  return (
    <div>
      <h1>Weather Forecast for Vijayawada</h1>
      <h1>{forecast?.location?.name}</h1>
    </div>
  )

}
export default Weather
