/**
 * JibrelGlobal selectors
 */

import {createSelector} from 'reselect';

import {
  API_REQUEST_STATUS__ROUTINE_LAUNCHED,
  API_REQUEST_STATUS__ROUTINE_SUCCESS,
} from '../../utils/apirequest/constants';

import {selectAppData} from '../AppWrapper/selectors';


/* Simple selectors */

export const selectJibrelGlobalData = createSelector(
  selectAppData,
  (appData) => appData.get('JibrelGlobal')
);

export const selectJibrelCrydrList = createSelector(
  selectJibrelGlobalData,
  (jibrelGlobal) => jibrelGlobal.get('crydrList')
);

export const selectJibrelCrydrAllLicenses = createSelector(
  selectJibrelGlobalData,
  (jibrelGlobal) => jibrelGlobal.get('licenses')
);


/* Complex selectors */

export const selectJibrelCrydrListUpdateNeeded = createSelector(
  selectJibrelCrydrList,
  (crydrList) => (
    crydrList.get("routineStatus") !== API_REQUEST_STATUS__ROUTINE_LAUNCHED &&
    crydrList.get("routineStatus") !== API_REQUEST_STATUS__ROUTINE_SUCCESS
  )
);

export const selectJibrelCrydrLicensesToUpdate = createSelector(
  selectJibrelCrydrList,
  selectJibrelCrydrAllLicenses,
  (crydrList, allCrydrLicenses) => {
    let symbolsWithLicenses = allCrydrLicenses.filter(obj =>
                                                      obj.get("routineStatus") === API_REQUEST_STATUS__ROUTINE_LAUNCHED ||
                                                      obj.get("routineStatus") === API_REQUEST_STATUS__ROUTINE_SUCCESS)
                                              .map(obj => obj.get("crydrSymbol"))
                                              .toSet();
    return crydrList.get("data").filter(obj => symbolsWithLicenses.has(obj.get("symbol")) === false);
  }
);
