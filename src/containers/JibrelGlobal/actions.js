/*
 * JibrelGlobal actions
 */

import {
  FETCH_CRYDR_LIST__START_ROUTINE,
  FETCH_CRYDR_LIST__SUCCESS,
  FETCH_CRYDR_LIST__FAILURE,
  FETCH_CRYDR_LICENSES__START_ROUTINE,
  FETCH_CRYDR_LICENSES__SUCCESS,
  FETCH_CRYDR_LICENSES__FAILURE,
} from './constants';


/* List of CryDRs */

export function fetchCrydrListStartRoutine() {
  return {
    type: FETCH_CRYDR_LIST__START_ROUTINE,
  };
}

export function fetchCrydrListSuccess(crydrListData) {
  return {
    type: FETCH_CRYDR_LIST__SUCCESS,
    crydrListData,
  };
}

export function fetchCrydrListFailure(error) {
  return {
    type: FETCH_CRYDR_LIST__FAILURE,
    error,
  };
}


/* Licenses of a CryDR */

export function fetchCrydrLicensesStartRoutine(crydrSymbol) {
  return {
    type: FETCH_CRYDR_LICENSES__START_ROUTINE,
    crydrSymbol,
  };
}

export function fetchCrydrLicensesSuccess(crydrSymbol, licenseInfo) {
  return {
    type: FETCH_CRYDR_LICENSES__SUCCESS,
    crydrSymbol,
    licenseInfo,
  };
}

export function fetchCrydrLicensesFailure(crydrSymbol, error) {
  return {
    type: FETCH_CRYDR_LICENSES__FAILURE,
    crydrSymbol,
    error,
  };
}
