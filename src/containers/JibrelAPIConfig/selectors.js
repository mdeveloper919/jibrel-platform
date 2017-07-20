/**
 * Selectors for the Jibrel API config
 */

import {createSelector} from 'reselect';

import {selectAppData} from '../AppWrapper/selectors';
import {selectWeb3Network} from '../Web3Guard/selectors';


/* Simple selectors */

export const selectJibrelAPIConfig = createSelector(
  selectAppData,
  (appData) => appData.get('JibrelAPIConfig')
);

export const selectJibrelAPIContracts = createSelector(
  selectJibrelAPIConfig,
  (config) => config.get('contracts')
);


/* Complex selectors */

export const selectJibrelAPICurrentConfig = createSelector(
  selectJibrelAPIContracts,
  selectWeb3Network,
  (contractsConfig, web3Network) => {
    for (let i = 0; i < contractsConfig.size; i++) {
      if (contractsConfig.get(i).get("networkId") === web3Network.get('networkId')) {
        return contractsConfig.get(i);
      }
    }
    return null;
  }
);

export const selectJibrelSupportedNetworkIds = createSelector(
  selectJibrelAPIContracts,
  (contractsConfig) => contractsConfig.map(obj => obj.get("networkId"))
);

export const selectJibrelAPIAvailable = createSelector(
  selectJibrelAPICurrentConfig,
  (currentConfig) => (currentConfig !== null)
);
