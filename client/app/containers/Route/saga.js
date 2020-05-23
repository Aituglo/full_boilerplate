import { call, put, takeLatest } from 'redux-saga/effects';
import request from '@app/utils/request';

import { VERIFY_TOKEN, LOGOUT_USER, REFRESH_TOKEN } from './constants';
import {
  verifyToken,
  verifyTokenError,
  verifyTokenSuccess,
  logoutUserSuccess,
  logoutUserError,
  refreshTokenSuccess,
  refreshTokenError,
} from './actions';

import { changeLocale } from '../LanguageProvider/actions';

// Verify Token
export function* loadVerifyToken() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/users/token_valid`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(changeLocale(result.user.language.substring(0, 2)));
      yield put(verifyTokenSuccess(result.user));
    } else if (result && result.status === 'error') {
      yield put(verifyTokenError(result.message));
    } else {
      yield put(verifyTokenError('app.global.error'));
    }
  } catch (error) {
    yield put(verifyTokenError(error.toString()));
  }
}

// Refresh User
export function* loadRefreshUser() {
  const token = localStorage.getItem('refresh_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/users/refresh_token`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(refreshTokenSuccess(result.access_token));
      yield put(verifyToken());
    } else if (result && result.status === 'error') {
      yield put(refreshTokenError(result.message));
    } else {
      yield put(refreshTokenError('app.global.error'));
    }
  } catch (error) {
    yield put(refreshTokenError(error.toString()));
  }
}

// Logout User
export function* loadLogoutUser() {
  const token = localStorage.getItem('access_token');

  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/users/logout_access`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result && result.status === 'success') {
      yield put(logoutUserSuccess());
    } else if (result && result.status === 'error') {
      yield put(logoutUserError(result.message));
    } else {
      yield put(logoutUserError('app.global.error'));
    }
  } catch (error) {
    yield put(logoutUserError(error.toString()));
  }
}

// Individual exports for testing
export default function* authSaga() {
  yield takeLatest(VERIFY_TOKEN, loadVerifyToken);
  yield takeLatest(LOGOUT_USER, loadLogoutUser);
  yield takeLatest(REFRESH_TOKEN, loadRefreshUser);
}
