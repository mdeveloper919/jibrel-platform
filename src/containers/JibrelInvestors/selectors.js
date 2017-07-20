/**
 * JibrelInvestors selectors
 */

import {createSelector} from 'reselect';

import {
  API_REQUEST_STATUS__ROUTINE_LAUNCHED,
  API_REQUEST_STATUS__ROUTINE_SUCCESS,
} from '../../utils/apirequest/constants';

import {selectAppData} from '../AppWrapper/selectors';
import {selectWeb3DefaultAccount} from '../Web3Guard/selectors';
import {selectJibrelCrydrList} from '../JibrelGlobal/selectors';


/* Simple selectors */

export const selectJibrelInvestorsData = createSelector(
  selectAppData,
  (appData) => appData.get('JibrelInvestors')
);

export const selectJibrelInvestorsAdmittances = createSelector(
  selectJibrelInvestorsData,
  (investorsData) => investorsData.get('admittances')
);

export const selectJibrelInvestorsLicenses = createSelector(
  selectJibrelInvestorsData,
  (investorsData) => investorsData.get('licenses')
);

export const selectJibrelInvestorsBalances = createSelector(
  selectJibrelInvestorsData,
  (investorsData) => investorsData.get('balances')
);


/* Complex selectors */

export const selectDefaultInvestorAdmittance = createSelector(
  selectJibrelInvestorsAdmittances,
  selectWeb3DefaultAccount,
  (investorsAdmittances, web3DefaultAccount) => {
    if (typeof web3DefaultAccount === 'undefined' || web3DefaultAccount === null) {
      return undefined;
    }
    let investorAdmittance = investorsAdmittances.find((obj) => obj.get("investorAddress") === web3DefaultAccount);
    if (typeof investorAdmittance === "undefined" || investorAdmittance === null) {
      return null;
    }
    return investorAdmittance;
  }
);

export const selectDefaultInvestorLicenses = createSelector(
  selectJibrelInvestorsLicenses,
  selectWeb3DefaultAccount,
  (investorsLicenses, web3DefaultAccount) => {
    if (typeof web3DefaultAccount === 'undefined' || web3DefaultAccount === null) {
      return undefined;
    }
    return investorsLicenses.filter((obj) => obj.get("investorAddress") === web3DefaultAccount);
  }
);

export const selectDefaultInvestorLicensesToUpdate = createSelector(
  selectJibrelCrydrList,
  selectDefaultInvestorLicenses,
  (crydrList, investorLicenses) => {
    if (typeof investorLicenses === 'undefined') {
      return undefined;
    }
    let crydrLicenses   = crydrList.get("data")
                                   .filter(obj => obj.get("license_needed") === true)
                                   .map(obj => obj.get("single_license"))
                                   .toSet();
    let fetchedLicenses = investorLicenses.filter(obj =>
                                                  obj.get("routineStatus") === API_REQUEST_STATUS__ROUTINE_LAUNCHED ||
                                                  obj.get("routineStatus") === API_REQUEST_STATUS__ROUTINE_SUCCESS)
                                          .map(obj => obj.get("licenseName"))
                                          .toSet();
    return crydrLicenses.subtract(fetchedLicenses).toList();
  }
);

export const selectDefaultInvestorBalances = createSelector(
  selectWeb3DefaultAccount,
  selectJibrelInvestorsBalances,
  (web3DefaultAccount, investorsBalances) => {
    if (typeof web3DefaultAccount === 'undefined' || web3DefaultAccount === null) {
      return undefined;
    }
    return investorsBalances.filter((obj) => obj.get("investorAddress") === web3DefaultAccount);
  }
);

export const selectDefaultInvestorBalancesToUpdate = createSelector(
  selectJibrelCrydrList,
  selectDefaultInvestorBalances,
  (crydrList, investorBalances) => {
    if (typeof investorBalances === 'undefined') {
      return undefined;
    }
    let allSymbols      = crydrList.get("data")
                                   .map(obj => obj.get("symbol"))
                                   .toSet();
    let fetchedBalances = investorBalances.filter(obj =>
                                                  obj.get("routineStatus") === API_REQUEST_STATUS__ROUTINE_LAUNCHED ||
                                                  obj.get("routineStatus") === API_REQUEST_STATUS__ROUTINE_SUCCESS)
                                          .map(obj => obj.get("crydrSymbol"))
                                          .toSet();
    return allSymbols.subtract(fetchedBalances).toList();
  }
);
