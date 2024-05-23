// sagas.ts (Redux sagas)
import { call, put, select, takeEvery } from 'redux-saga/effects';
import AuthService from '../services/services';
import {
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
  loginRequest,
  signupRequest,
  authState
} from '../slices/slices';

function* handleLogin() {
  try {
    const { loginRequest: requestData } = yield select(authState);
    const response = yield call(AuthService.login, requestData);

    if (response.success) {
      yield put(loginSuccess(response.data));
    } else {
      yield put(loginFailure(response.message));
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* handleSignup() {
  try { 
    const { signupRequest: requestData } = yield select(authState);
    const response = yield call(AuthService.signup, requestData);

    if (response.success) {
      yield put(signupSuccess(response.data));
    } else {
      yield put(signupFailure(response.message));
    }
  } catch (error) {
    yield put(signupFailure(error.message));
  }
}

export function* watchLogin() {
  yield takeEvery(loginRequest, handleLogin);
}

export function* watchSignup() {
  yield takeEvery(signupRequest, handleSignup);
}