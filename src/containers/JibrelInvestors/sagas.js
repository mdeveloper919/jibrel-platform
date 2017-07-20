/**
 * JibrelInvestors sagas
 */

import {put, call, takeLatest, takeEvery} from 'redux-saga/effects';

import {fetchInvestorAdmittance, fetchInvestorWasGranted, fetchInvestorBalance} from '../JibrelAPI/sagas';

import {
  INVESTOR_ADMITTED__MAKE_REQUEST,
  INVESTOR_GRANTED__MAKE_REQUEST,
  INVESTOR_BALANCE__MAKE_REQUEST,
} from './constants';
import {
  investorAdmittedSuccess,
  investorAdmittedFailure,
  investorGrantedSuccess,
  investorGrantedFailure,
  investorBalanceSuccess,
  investorBalanceFailure,
} from './actions';


/* Admittances */

export function* investorAdmittedSaga(action) {
  try {
    let isAdmitted = yield call(fetchInvestorAdmittance, window.web3, action.investorAddress);
    yield put(investorAdmittedSuccess(action.investorAddress, isAdmitted));
  } catch (err) {
    console.error(err);
    yield put(investorAdmittedFailure(err));
  }
}

export function* investorAdmittedFlow() {
  // todo generally we should filter by action.investorAddress
  yield takeLatest(INVESTOR_ADMITTED__MAKE_REQUEST, investorAdmittedSaga);
}


/* Licenses */

export function* investorWasGrantedSaga(action) {
  try {
    let isGranted = yield call(fetchInvestorWasGranted, window.web3, action.investorAddress, action.licenseName);
    yield put(investorGrantedSuccess(action.investorAddress, action.licenseName, isGranted));
  } catch (err) {
    console.error(err);
    yield put(investorGrantedFailure(err));
  }
}

export function* investorWasGrantedFlow() {
  // todo generally we should filter by action.investorAddress and action.licenseName
  yield takeEvery(INVESTOR_GRANTED__MAKE_REQUEST, investorWasGrantedSaga);
}


/* Balances */

export function* investorBalanceSaga(action) {
  try {
    let balance = yield call(fetchInvestorBalance, window.web3, action.investorAddress, action.crydrSymbol);
    yield put(investorBalanceSuccess(action.investorAddress, action.crydrSymbol, balance));
  } catch (err) {
    console.error(err);
    yield put(investorBalanceFailure(err));
  }
}

export function* investorBalanceFlow() {
  // todo generally we should filter by action.investorAddress and action.crydrSymbol
  yield takeEvery(INVESTOR_BALANCE__MAKE_REQUEST, investorBalanceSaga);
}


/* Exported sagas */

export default [
  investorAdmittedFlow,
  investorWasGrantedFlow,
  investorBalanceFlow,
];

