/**
 * Sagas to work with Jibrel API
 */

import {select, call} from 'redux-saga/effects';
import Promise from "bluebird";

import {selectJibrelAPICurrentConfig} from '../JibrelAPIConfig/selectors';


export function* fetchCrydrList(web3) {
  const apiConfig = yield select(selectJibrelAPICurrentConfig);
  if (apiConfig === null) {
    throw Error("Unable to load CryDR list in unknown network");
  }

  let apiContract         = web3.eth.contract(apiConfig.get("apiABI").toJS());
  let apiContractInstance = apiContract.at(apiConfig.get("apiAddress"));

  let getCryDRRepositoryPromise = Promise.promisify(apiContractInstance.getCryDRRepository.call);
  let crydrRepoAddress          = yield call(getCryDRRepositoryPromise);

  let crydrRepoContract         = web3.eth.contract(apiConfig.get("crydrRepoABI").toJS());
  let crydrRepoContractInstance = crydrRepoContract.at(crydrRepoAddress);

  let getCryDRDataPromise = Promise.promisify(crydrRepoContractInstance.getCryDRData.call);
  let crydrData           = yield call(getCryDRDataPromise);

  return JSON.parse(crydrData);
}

export function* fetchCrydrLicenses(web3, crydrSymbol) {
  const apiConfig = yield select(selectJibrelAPICurrentConfig);
  if (apiConfig === null) {
    throw Error("Unable to load CryDR licenses in unknown network");
  }

  let apiContract         = web3.eth.contract(apiConfig.get("apiABI").toJS());
  let apiContractInstance = apiContract.at(apiConfig.get("apiAddress"));

  let getCryDRRepositoryPromise = Promise.promisify(apiContractInstance.getCryDRRepository.call);
  let crydrRepoAddress          = yield call(getCryDRRepositoryPromise);

  let crydrRepoContract         = web3.eth.contract(apiConfig.get("crydrRepoABI").toJS());
  let crydrRepoContractInstance = crydrRepoContract.at(crydrRepoAddress);

  let lookupCryDRPromise = Promise.promisify(crydrRepoContractInstance.lookupCryDR.call);
  let crydrAddress       = yield call(lookupCryDRPromise, crydrSymbol);

  let licensedTokenContract         = web3.eth.contract(apiConfig.get("licensedTokenABI").toJS());
  let licensedTokenContractInstance = licensedTokenContract.at(crydrAddress);

  let getLicenseInfoPromise = Promise.promisify(licensedTokenContractInstance.getLicenseInfo.call);
  //noinspection UnnecessaryLocalVariableJS
  let licenseInfo           = yield call(getLicenseInfoPromise);

  return JSON.parse(licenseInfo);
}


export function* fetchInvestorAdmittance(web3, investorAddress) {
  const apiConfig = yield select(selectJibrelAPICurrentConfig);
  if (apiConfig === null) {
    throw Error("Unable to load investor admittance in unknown network");
  }

  let apiContract         = web3.eth.contract(apiConfig.get("apiABI").toJS());
  let apiContractInstance = apiContract.at(apiConfig.get("apiAddress"));

  let getInvestorRepositoryPromise = Promise.promisify(apiContractInstance.getInvestorRepository.call);
  let investorRepoAddress          = yield call(getInvestorRepositoryPromise);

  let investorRepoContract         = web3.eth.contract(apiConfig.get("investorRepoABI").toJS());
  let investorRepoContractInstance = investorRepoContract.at(investorRepoAddress);

  let isInvestorAdmittedPromise = Promise.promisify(investorRepoContractInstance.isInvestorAdmitted.call);
  //noinspection UnnecessaryLocalVariableJS
  let isAdmitted                = yield call(isInvestorAdmittedPromise, investorAddress);

  return isAdmitted;
}

export function* fetchInvestorWasGranted(web3, investorAddress, licenseName) {
  const apiConfig = yield select(selectJibrelAPICurrentConfig);
  if (apiConfig === null) {
    throw Error("Unable to load whether investor granted license or not in unknown network");
  }

  let apiContract         = web3.eth.contract(apiConfig.get("apiABI").toJS());
  let apiContractInstance = apiContract.at(apiConfig.get("apiAddress"));

  let getInvestorRepositoryPromise = Promise.promisify(apiContractInstance.getInvestorRepository.call);
  let investorRepoAddress          = yield call(getInvestorRepositoryPromise);

  let investorRepoContract         = web3.eth.contract(apiConfig.get("investorRepoABI").toJS());
  let investorRepoContractInstance = investorRepoContract.at(investorRepoAddress);

  let isInvestorWasGrantedPromise = Promise.promisify(investorRepoContractInstance.isInvestorWasGranted.call);
  //noinspection UnnecessaryLocalVariableJS
  let isGranted                   = yield call(isInvestorWasGrantedPromise, investorAddress, licenseName);

  return isGranted;
}


export function* fetchInvestorBalance(web3, investorAddress, crydrSymbol) {
  const apiConfig = yield select(selectJibrelAPICurrentConfig);
  if (apiConfig === null) {
    throw Error("Unable to load investor balance in unknown network");
  }

  let apiContract         = web3.eth.contract(apiConfig.get("apiABI").toJS());
  let apiContractInstance = apiContract.at(apiConfig.get("apiAddress"));

  let getCryDRRepositoryPromise = Promise.promisify(apiContractInstance.getCryDRRepository.call);
  let crydrRepoAddress          = yield call(getCryDRRepositoryPromise);

  let crydrRepoContract         = web3.eth.contract(apiConfig.get("crydrRepoABI").toJS());
  let crydrRepoContractInstance = crydrRepoContract.at(crydrRepoAddress);

  let lookupCryDRPromise = Promise.promisify(crydrRepoContractInstance.lookupCryDR.call);
  let crydrAddress       = yield call(lookupCryDRPromise, crydrSymbol);

  let erc20Contract         = web3.eth.contract(apiConfig.get("ERC20ABI").toJS());
  let erc20ContractInstance = erc20Contract.at(crydrAddress);

  let balanceOfPromise = Promise.promisify(erc20ContractInstance.balanceOf.call);
  //noinspection UnnecessaryLocalVariableJS
  let investorBalance  = yield call(balanceOfPromise, investorAddress);

  return investorBalance;
}

