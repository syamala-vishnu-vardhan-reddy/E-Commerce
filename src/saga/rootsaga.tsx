import { all } from 'redux-saga/effects';
import { watchLogin, watchSignup } from '../features/home/sagas/sagas';

export default function* rootSaga() {
  yield all([watchLogin(), watchSignup()]);
}
