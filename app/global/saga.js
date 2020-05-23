import { call, put, takeLatest } from 'redux-saga/effects';

import request from '@app/utils/request';
import { RELOAD_API } from './constants';

import { globalError } from './actions';

// Reload App API
export function* loadReloadApi() {
  try {
    const result = yield call(request, {
      method: 'GET',
      url: `/api/reload_app`,
    });
    if (result && result.status === 'error') {
      yield put(globalError(result.message));
    } else {
      yield put(globalError('app.global.error'));
    }
  } catch (error) {
    yield put(globalError(error.toString()));
  }
}

// Individual exports for testing
export default function* settingsSaga() {
  yield takeLatest(RELOAD_API, loadReloadApi);
}
