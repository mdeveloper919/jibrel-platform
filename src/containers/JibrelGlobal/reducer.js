/*
 * Reducer for fetching deal`s data
 */

import {fromJS} from 'immutable';

import {
  API_REQUEST_STATUS__ROUTINE_NOT_INITIALIZED,
  API_REQUEST_STATUS__ROUTINE_LAUNCHED,
  API_REQUEST_STATUS__ROUTINE_SUCCESS,
  API_REQUEST_STATUS__ROUTINE_FAILURE,
} from '../../utils/apirequest/constants';
import {
  WEB3__NETWORK_SUCCESS,
  WEB3__NETWORK_FAILURE,
} from '../Web3Guard/constants';

import {
  FETCH_CRYDR_LIST__START_ROUTINE,
  FETCH_CRYDR_LIST__SUCCESS,
  FETCH_CRYDR_LIST__FAILURE,
  FETCH_CRYDR_LICENSES__START_ROUTINE,
  FETCH_CRYDR_LICENSES__SUCCESS,
  FETCH_CRYDR_LICENSES__FAILURE,
} from './constants';


const initialState = fromJS({
                              crydrList: {
                                routineStatus: API_REQUEST_STATUS__ROUTINE_NOT_INITIALIZED,
                                data:          [],
                                error:         null,
                              },
                              // array of objects: {"crydrSymbol", "routineStatus", "licenseInfo", "error"}
                              licenses:  []
                            });


/* Helpers */

function setCrydrLiceses(state, crydrLicensesObj) {
  let index = state.get("licenses").findIndex(obj => obj.get("crydrSymbol") === crydrLicensesObj.get("crydrSymbol"));
  if (index === -1) {
    return state.set("licenses", state.get("licenses").push(crydrLicensesObj));
  }
  else {
    return state.set("licenses", state.get("licenses").set(index, crydrLicensesObj));
  }
}


/* Reducer */

function jibrelGlobalDataReducer(state = initialState, action) {
  switch (action.type) {
    case WEB3__NETWORK_SUCCESS:
    case WEB3__NETWORK_FAILURE: {
      // we reset the state if anything global changed
      return initialState;
    }


    /* List of CryDRs */

    case FETCH_CRYDR_LIST__START_ROUTINE: {
      let newCrydrListEntry = state.get("crydrList")
                                   .set("routineStatus", API_REQUEST_STATUS__ROUTINE_LAUNCHED)
                                   .set("error", null);
      return state.set("crydrList", newCrydrListEntry);
    }
    case FETCH_CRYDR_LIST__SUCCESS: {
      let newCrydrListEntry = state.get("crydrList")
                                   .set("routineStatus", API_REQUEST_STATUS__ROUTINE_SUCCESS)
                                   .set("data", fromJS(action.crydrListData));
      return state.set("crydrList", newCrydrListEntry);
    }
    case FETCH_CRYDR_LIST__FAILURE: {
      let newCrydrListEntry = state.get("crydrList")
                                   .set("routineStatus", API_REQUEST_STATUS__ROUTINE_FAILURE)
                                   .set("error", action.error);
      return state.set("crydrList", newCrydrListEntry);
    }


    /* Licenses of a CryDR */

    case FETCH_CRYDR_LICENSES__START_ROUTINE: {
      let licensesObj = fromJS({
                                 crydrSymbol:   action.crydrSymbol,
                                 routineStatus: API_REQUEST_STATUS__ROUTINE_LAUNCHED,
                                 licenseInfo:   [],
                                 error:         null,
                               });
      return setCrydrLiceses(state, licensesObj);
    }
    case FETCH_CRYDR_LICENSES__SUCCESS: {
      let licensesObj = fromJS({
                                 crydrSymbol:   action.crydrSymbol,
                                 routineStatus: API_REQUEST_STATUS__ROUTINE_SUCCESS,
                                 licenseInfo:   fromJS(action.licenseInfo),
                                 error:         null,
                               });
      return setCrydrLiceses(state, licensesObj);
    }
    case FETCH_CRYDR_LICENSES__FAILURE: {
      let licensesObj = fromJS({
                                 crydrSymbol:   action.crydrSymbol,
                                 routineStatus: API_REQUEST_STATUS__ROUTINE_FAILURE,
                                 licenseInfo:   [],
                                 error:         action.error,
                               });
      return setCrydrLiceses(state, licensesObj);
    }

    default:
      return state;
  }
}

export default jibrelGlobalDataReducer;
