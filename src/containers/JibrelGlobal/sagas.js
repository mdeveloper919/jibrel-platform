/**
 * JibrelGlobal sagas
 */


import {takeLatest, takeEvery, put, call} from 'redux-saga/effects';

import {fetchCrydrList, fetchCrydrLicenses} from '../JibrelAPI/sagas';

import {
  FETCH_CRYDR_LIST__START_ROUTINE,
  FETCH_CRYDR_LICENSES__START_ROUTINE,
} from './constants';
import {
  fetchCrydrListSuccess,
  fetchCrydrListFailure,
  fetchCrydrLicensesSuccess,
  fetchCrydrLicensesFailure,
} from './actions';


/* List of CryDRs */

export function* fetchCrydrListSaga() {
  try {
    let crydrList = yield call(fetchCrydrList, window.web3);
    yield put(fetchCrydrListSuccess(crydrList));
  } catch (err) {
    console.error(err);
    yield put(fetchCrydrListFailure(err));
  }
}

export function* fetchCrydrListFlow() {
  yield takeLatest(FETCH_CRYDR_LIST__START_ROUTINE, fetchCrydrListSaga);
}


/* Licenses of a CryDR */

export function* fetchCrydrLicensesSaga(action) {
  try {
    let licenses = yield call(fetchCrydrLicenses, window.web3, action.crydrSymbol);
    yield put(fetchCrydrLicensesSuccess(action.crydrSymbol, licenses));
  } catch (err) {
    console.error(err);
    yield put(fetchCrydrLicensesFailure(action.crydrSymbol, err));
  }
}

export function* fetchCrydrLicensesFlow() {
  yield takeEvery(FETCH_CRYDR_LICENSES__START_ROUTINE, fetchCrydrLicensesSaga);
}


/* Exported sagas */

export default [
  fetchCrydrListFlow,
  fetchCrydrLicensesFlow,
];
