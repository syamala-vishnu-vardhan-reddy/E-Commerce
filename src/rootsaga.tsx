import { all } from 'redux-saga/effects';
import fetchDataWatcher from '../src/features/sagas/sagas';

export default function* rootSaga() {
  yield all([
    fetchDataWatcher(),
  ]);
}
