/**
 * App`s sagas
 * A place to inject sagas required by all pages
 */

import web3Sagas from '../Web3Guard/sagas'
import JibrelGlobalSagas from '../JibrelGlobal/sagas'
import JibrelInvestorsSagas from '../JibrelInvestors/sagas'
import crydrPageSagas from '../CrydrPage/sagas'

export default [
  ...web3Sagas,
  ...JibrelGlobalSagas,
  ...JibrelInvestorsSagas,
  ...crydrPageSagas,
];

