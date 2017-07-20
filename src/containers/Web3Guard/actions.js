/*
 * Web3Guard actions
 */

import {
  WEB3__INIT_CONNECTION,
  WEB3__CONNECTION_INITIALIZED,
  WEB3__CONNECTION_FAILED,
  WEB3__LAUNCH_NETWORK_POLLING,
  WEB3__NETWORK_SUCCESS,
  WEB3__NETWORK_FAILURE,
  WEB3__LAUNCH_ACCOUNTS_POLLING,
  WEB3__ACCOUNTS_SUCCESS,
  WEB3__ACCOUNTS_FAILURE,
} from './constants';


export function web3InitConnection() {
  return {
    type: WEB3__INIT_CONNECTION
  };
}

export function web3ConnectionInitialized(web3ProviderType, web3Provider) {
  return {
    type: WEB3__CONNECTION_INITIALIZED,
    web3ProviderType,
    web3Provider
  };
}

export function web3ConnectionFailed(error) {
  return {
    type: WEB3__CONNECTION_FAILED,
    error
  };
}


export function web3LaunchNetworkPolling() {
  return {
    type: WEB3__LAUNCH_NETWORK_POLLING
  };
}

export function web3GetNetworkSuccess(networkId) {
  return {
    type: WEB3__NETWORK_SUCCESS,
    networkId
  };
}

export function web3GetNetworkFailure(error) {
  return {
    type: WEB3__NETWORK_FAILURE,
    error
  };
}


export function web3LaunchAccountsPolling() {
  return {
    type: WEB3__LAUNCH_ACCOUNTS_POLLING
  };
}

export function web3GetAccountsSuccess(web3Accounts) {
  return {
    type: WEB3__ACCOUNTS_SUCCESS,
    web3Accounts
  };
}

export function web3GetAccountsFailure(error) {
  return {
    type: WEB3__ACCOUNTS_FAILURE,
    error
  };
}
