/*
 * JibrelInvestors actions
 */

import {
  INVESTOR_ADMITTED__MAKE_REQUEST,
  INVESTOR_ADMITTED__SUCCESS,
  INVESTOR_ADMITTED__FAILURE,
  INVESTOR_GRANTED__MAKE_REQUEST,
  INVESTOR_GRANTED__SUCCESS,
  INVESTOR_GRANTED__FAILURE,
  INVESTOR_BALANCE__MAKE_REQUEST,
  INVESTOR_BALANCE__SUCCESS,
  INVESTOR_BALANCE__FAILURE,
} from './constants';


/* Admittances */

export function investorAdmittedMakeRequest(investorAddress) {
  return {
    type: INVESTOR_ADMITTED__MAKE_REQUEST,
    investorAddress,
  };
}

export function investorAdmittedSuccess(investorAddress, isAdmitted) {
  return {
    type: INVESTOR_ADMITTED__SUCCESS,
    investorAddress,
    isAdmitted,
  };
}

export function investorAdmittedFailure(investorAddress, error) {
  return {
    type: INVESTOR_ADMITTED__FAILURE,
    investorAddress,
    error,
  };
}


/* Licenses */

export function investorGrantedMakeRequest(investorAddress, licenseName) {
  return {
    type: INVESTOR_GRANTED__MAKE_REQUEST,
    investorAddress,
    licenseName,
  };
}

export function investorGrantedSuccess(investorAddress, licenseName, isGranted) {
  return {
    type: INVESTOR_GRANTED__SUCCESS,
    investorAddress,
    licenseName,
    isGranted,
  };
}

export function investorGrantedFailure(investorAddress, licenseName, error) {
  return {
    type: INVESTOR_GRANTED__FAILURE,
    investorAddress,
    licenseName,
    error,
  };
}


/* Balances */

export function investorBalanceMakeRequest(investorAddress, crydrSymbol) {
  return {
    type: INVESTOR_BALANCE__MAKE_REQUEST,
    investorAddress,
    crydrSymbol,
  };
}

export function investorBalanceSuccess(investorAddress, crydrSymbol, balance) {
  return {
    type: INVESTOR_BALANCE__SUCCESS,
    investorAddress,
    crydrSymbol,
    balance,
  };
}

export function investorBalanceFailure(investorAddress, crydrSymbol, error) {
  return {
    type: INVESTOR_BALANCE__FAILURE,
    investorAddress,
    crydrSymbol,
    error,
  };
}
