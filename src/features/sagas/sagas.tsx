import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchWeather } from '../services/services';
import {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from '../slices/slices';

function* fetchWeatherSaga() {
  try {
    const response= yield call(fetchWeather);
    const { data } = response;
    yield put(fetchWeatherSuccess(data));
  } catch (error) {
    yield put(fetchWeatherFailure(error));
  }
}

function* weatherSaga() {
  yield takeLatest(fetchWeatherRequest.type, fetchWeatherSaga);
}

export default weatherSaga;
