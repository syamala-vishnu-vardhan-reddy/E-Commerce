import { createSlice } from '@reduxjs/toolkit';

interface WeatherState {
  forecast: [];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  forecast: [],
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess: (state, action) => {
      state.loading = false;
      state.forecast = action.payload;
    },
    fetchWeatherFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} = weatherSlice.actions;

export default weatherSlice.reducer;
