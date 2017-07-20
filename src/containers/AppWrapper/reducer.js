/*
 * AppReducer
 * A place to add reducers used by all pages
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

import globalWeb3Reducer from '../Web3Guard/reducer';
import JibrelAPIConfigReducer from '../JibrelAPIConfig/reducer';
import JibrelGlobalReducer from '../JibrelGlobal/reducer';
import JibrelInvestorsReducer from '../JibrelInvestors/reducer';


// The initial state of the App
const initialState = fromJS({});

function commonReducer(state = initialState) {
  return state;
}

export default combineReducers({
    common: commonReducer,
    web3global: globalWeb3Reducer,
    JibrelAPIConfig: JibrelAPIConfigReducer,
    JibrelGlobal: JibrelGlobalReducer,
    JibrelInvestors: JibrelInvestorsReducer,
  });

