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

  if (!loading) {
    return <div>Loading...{loading} Error fetching data: {error}</div>
  }
  if (!error) return <div>Error fetching data: {error}</div>

  return (
    <div>
      <h1>Weather Forecast for Vijayawada</h1>
    </div>
  )
}

export default Weather
