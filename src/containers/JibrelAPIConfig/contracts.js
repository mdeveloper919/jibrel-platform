/**
 * Smart contracts used by the Jibrel API
 */

import ERC20ABI from './abi/ERC20ABI.json';
import JibrelAPIABI from './abi/JibrelAPIInterfaceABI.json';
import CryDRRepoABI from './abi/CryDRRepositoryInterfaceABI.json';
import InvestorRepoABI from './abi/InvestorRepositoryInterfaceABI.json';
import LicensedTokenABI from './abi/LicensedTokenABI.json';


const jibrelAPIContracts = [
  {
    networkId:        3,
    apiABI:           JibrelAPIABI,
    apiAddress:       '0xd5f52cb1b8dbbe8705814f4d1fe128e433f610de',
    ERC20ABI:         ERC20ABI,
    crydrRepoABI:     CryDRRepoABI,
    investorRepoABI:  InvestorRepoABI,
    licensedTokenABI: LicensedTokenABI,
  },
  {
    // private test network
    networkId:        100,
    apiABI:           JibrelAPIABI,
    apiAddress:       '0x4f13454563688cdbb5653864d94744b26377cb7a',
    ERC20ABI:         ERC20ABI,
    crydrRepoABI:     CryDRRepoABI,
    investorRepoABI:  InvestorRepoABI,
    licensedTokenABI: LicensedTokenABI,
  }
];

export default jibrelAPIContracts;
