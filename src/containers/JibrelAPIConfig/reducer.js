/**
 * Reducers of Jibrel API config
 */

import {fromJS} from 'immutable';

import jibrelAPIContracts from './contracts';


const jibrelAPIConfigInitialState = fromJS({
                                             contracts: fromJS(jibrelAPIContracts),
                                           });


function JibrelAPIConfigReducer(state = jibrelAPIConfigInitialState) {
  return state;
}


export default JibrelAPIConfigReducer;
