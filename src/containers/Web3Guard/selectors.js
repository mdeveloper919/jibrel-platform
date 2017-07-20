/**
 * Web3Guard Selectors
 */

import {createSelector} from 'reselect';

import {selectAppData} from '../AppWrapper/selectors';

import {WEB3__CONNECTION_STATUS__SUCCESS} from './constants';


/* Simple selectors */

export const selectWeb3Global = createSelector(
  selectAppData,
  (appData) => appData.get('web3global')
);

export const selectWeb3Connection = createSelector(
  selectWeb3Global,
  (web3Global) => web3Global.get('web3Connection')
);

export const selectWeb3Network = createSelector(
  selectWeb3Global,
  (web3Global) => web3Global.get('web3Network')
);

export const selectWeb3Accounts = createSelector(
  selectWeb3Global,
  (web3Global) => web3Global.get('web3Accounts')
);


/* Complex selectors */

export const selectWeb3ConnectionEstablished = createSelector(
  selectWeb3Connection,
  (web3Connection) => web3Connection.get('status') === WEB3__CONNECTION_STATUS__SUCCESS
);

export const selectWeb3AccountsKnown = createSelector(
  selectWeb3Accounts,
  (web3Accounts) => web3Accounts.get("accountsList").size > 0
);

export const selectWeb3DefaultAccount = createSelector(
  selectWeb3Accounts,
  (web3Accounts) => web3Accounts.get("accountsList").get(0)
);


