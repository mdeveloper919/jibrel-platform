/*
 * JibrelInvestors reducer
 */

import {fromJS} from 'immutable';

import {
  API_REQUEST_STATUS__ROUTINE_LAUNCHED,
  API_REQUEST_STATUS__ROUTINE_SUCCESS,
  API_REQUEST_STATUS__ROUTINE_FAILURE,
} from '../../utils/apirequest/constants'
import {
  WEB3__NETWORK_SUCCESS,
  WEB3__NETWORK_FAILURE,
} from '../Web3Guard/constants';

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


const initialState = fromJS({
                              // array of objects {"investorAddress", "routineStatus", "isAdmitted", "error"}
                              admittances: [],
                              // array of objects {"investorAddress", "licenseName", "routineStatus", "isGranted", "error"}
                              licenses:    [],
                              // array of objects {"investorAddress", "crydrSymbol", "routineStatus", "balance", "error"}
                              balances:    [],
                            });


/* Helpers */

function setAdmittance(state, admittanceObj) {
  let index = state.get("admittances").findIndex(obj => obj.get("investorAddress") === admittanceObj.get("investorAddress"));
  if (index === -1) {
    return state.set("admittances", state.get("admittances").push(admittanceObj));
  }
  else {
    return state.set("admittances", state.get("admittances").set(index, admittanceObj));
  }
}

function setLicense(state, licenseObj) {
  let index = state.get("licenses").findIndex(obj =>
                                              obj.get("investorAddress") === licenseObj.get("investorAddress") &&
                                              obj.get("licenseName") === licenseObj.get("licenseName"));
  if (index === -1) {
    return state.set("licenses", state.get("licenses").push(licenseObj));
  }
  else {
    return state.set("licenses", state.get("licenses").set(index, licenseObj));
  }
}

function setBalance(state, balanceObj) {
  let index = state.get("balances").findIndex(obj =>
                                              obj.get("investorAddress") === balanceObj.get("investorAddress") &&
                                              obj.get("crydrSymbol") === balanceObj.get("crydrSymbol"));
  if (index === -1) {
    return state.set("balances", state.get("balances").push(balanceObj));
  }
  else {
    return state.set("balances", state.get("balances").set(index, balanceObj));
  }
}


/* Reducer */

function crydrPageReducer(state = initialState, action) {
  switch (action.type) {
    case WEB3__NETWORK_SUCCESS:
    case WEB3__NETWORK_FAILURE: {
      // we reset the state if anything global changed
      return initialState;
    }


    /* Admittances */

    case INVESTOR_ADMITTED__MAKE_REQUEST: {
      let admittanceObj = fromJS({
                                   investorAddress: action.investorAddress,
                                   routineStatus:   API_REQUEST_STATUS__ROUTINE_LAUNCHED,
                                   isAdmitted:      null,
                                   error:           null,
                                 });
      return setAdmittance(state, admittanceObj);

    }
    case INVESTOR_ADMITTED__SUCCESS: {
      let admittanceObj = fromJS({
                                   investorAddress: action.investorAddress,
                                   routineStatus:   API_REQUEST_STATUS__ROUTINE_SUCCESS,
                                   isAdmitted:      action.isAdmitted,
                                   error:           null,
                                 });
      return setAdmittance(state, admittanceObj);
    }
    case INVESTOR_ADMITTED__FAILURE: {
      let admittanceObj = fromJS({
                                   investorAddress: action.investorAddress,
                                   routineStatus:   API_REQUEST_STATUS__ROUTINE_FAILURE,
                                   isAdmitted:      null,
                                   error:           action.error,
                                 });
      return setAdmittance(state, admittanceObj);
    }


    /* Licenses */

    case INVESTOR_GRANTED__MAKE_REQUEST: {
      let licenseObj = fromJS({
                                investorAddress: action.investorAddress,
                                licenseName:     action.licenseName,
                                routineStatus:   API_REQUEST_STATUS__ROUTINE_LAUNCHED,
                                isGranted:       null,
                                error:           null,
                              });
      return setLicense(state, licenseObj);

    }
    case INVESTOR_GRANTED__SUCCESS: {
      let licenseObj = fromJS({
                                investorAddress: action.investorAddress,
                                licenseName:     action.licenseName,
                                routineStatus:   API_REQUEST_STATUS__ROUTINE_SUCCESS,
                                isGranted:       action.isGranted,
                                error:           null,
                              });
      return setLicense(state, licenseObj);
    }
    case INVESTOR_GRANTED__FAILURE: {
      let licenseObj = fromJS({
                                investorAddress: action.investorAddress,
                                licenseName:     action.licenseName,
                                routineStatus:   API_REQUEST_STATUS__ROUTINE_FAILURE,
                                isGranted:       null,
                                error:           action.error,
                              });
      return setLicense(state, licenseObj);
    }

    /* Balances */

    case INVESTOR_BALANCE__MAKE_REQUEST: {
      let balanceObj = fromJS({
                                investorAddress: action.investorAddress,
                                crydrSymbol:     action.crydrSymbol,
                                routineStatus:   API_REQUEST_STATUS__ROUTINE_LAUNCHED,
                                balance:         null,
                                error:           null,
                              });
      return setBalance(state, balanceObj);

    }
    case INVESTOR_BALANCE__SUCCESS: {
      let balanceObj = fromJS({
                                investorAddress: action.investorAddress,
                                crydrSymbol:     action.crydrSymbol,
                                routineStatus:   API_REQUEST_STATUS__ROUTINE_SUCCESS,
                                balance:         action.balance,
                                error:           null,
                              });
      return setBalance(state, balanceObj);
    }
    case INVESTOR_BALANCE__FAILURE: {
      let balanceObj = fromJS({
                                investorAddress: action.investorAddress,
                                crydrSymbol:     action.crydrSymbol,
                                routineStatus:   API_REQUEST_STATUS__ROUTINE_FAILURE,
                                balance:         null,
                                error:           action.error,
                              });
      return setBalance(state, balanceObj);
    }


    default:
      return state;
  }
}

export default crydrPageReducer;
