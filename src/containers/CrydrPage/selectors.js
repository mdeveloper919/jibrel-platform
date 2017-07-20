/**
 * JibrelInvestors selectors
 */

import {fromJS, List} from 'immutable';
import {createSelector} from 'reselect';

import {
  API_REQUEST_STATUS__ROUTINE_LAUNCHED,
  API_REQUEST_STATUS__ROUTINE_SUCCESS,
} from '../../utils/apirequest/constants';
import {selectWeb3DefaultAccount} from '../Web3Guard/selectors';
import {selectJibrelAPIAvailable} from '../JibrelAPIConfig/selectors';
import {
  fetchCrydrListStartRoutine,
  fetchCrydrLicensesStartRoutine
} from '../JibrelGlobal/actions'
import {
  selectJibrelCrydrListUpdateNeeded,
  selectJibrelCrydrLicensesToUpdate,
} from '../JibrelGlobal/selectors'
import {
  investorAdmittedMakeRequest,
  investorGrantedMakeRequest,
  investorBalanceMakeRequest,
} from '../JibrelInvestors/actions'
import {
  selectDefaultInvestorAdmittance,
  selectDefaultInvestorLicensesToUpdate,
  selectDefaultInvestorBalancesToUpdate,
} from '../JibrelInvestors/selectors'


/* Complex selectors */

export const getActionsToUpdatePageData = createSelector(
  selectJibrelAPIAvailable,
  selectJibrelCrydrListUpdateNeeded,
  selectWeb3DefaultAccount,
  selectJibrelCrydrLicensesToUpdate,
  selectDefaultInvestorAdmittance,
  selectDefaultInvestorLicensesToUpdate,
  selectDefaultInvestorBalancesToUpdate,
  (isJibrelAPIAvailable,
   crydrListUpdateNeeded,
   web3DefaultAccount,
   crydrLicensesToUpdate,
   investorAdmittance,
   investorLicensesToUpdate,
   investorBalancesToUpdate) => {
    if (isJibrelAPIAvailable === false) {
      return List();
    }

    let actions = List();

    if (crydrListUpdateNeeded) {
      actions = actions.push(fromJS(fetchCrydrListStartRoutine()));
    }
    if (crydrLicensesToUpdate.size > 0) {
      let newActions = crydrLicensesToUpdate.map(obj => fromJS(fetchCrydrLicensesStartRoutine(obj.get("symbol"))));
      actions        = actions.concat(newActions);
    }
    if (actions.size === 0 && (typeof web3DefaultAccount === 'undefined' || web3DefaultAccount === null)) {
      return List();
    }

    if (typeof investorAdmittance === 'undefined' || investorAdmittance === null ||
      (investorAdmittance.get("routineStatus") !== API_REQUEST_STATUS__ROUTINE_LAUNCHED &&
      investorAdmittance.get("routineStatus") !== API_REQUEST_STATUS__ROUTINE_SUCCESS)
    ) {
      actions = actions.push(fromJS(investorAdmittedMakeRequest(web3DefaultAccount)));
    }
    if (typeof investorLicensesToUpdate !== 'undefined' && investorLicensesToUpdate.size > 0) {
      let newActions = investorLicensesToUpdate.map(obj => fromJS(investorGrantedMakeRequest(web3DefaultAccount, obj)));
      actions        = actions.concat(newActions);
    }
    if (typeof investorBalancesToUpdate !== 'undefined' && investorBalancesToUpdate.size > 0) {
      let newActions = investorBalancesToUpdate.map(obj => fromJS(investorBalanceMakeRequest(web3DefaultAccount, obj)));
      actions        = actions.concat(newActions);
    }

    return actions;
  }
);

export const selectUpdateNeeded = createSelector(
  getActionsToUpdatePageData,
  (actionsToUpdate) => actionsToUpdate.size > 0
);
