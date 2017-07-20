/**
 * CrydrPage sagas
 */

import {put, select, all} from 'redux-saga/effects';

import takeFirst from '../../utils/saga/takeFirst';

import {
  UPDATE_REQUIRED_PAGE_DATA__LAUNCH,
} from './constants';
import {
  getActionsToUpdatePageData,
} from './selectors';


export function* updateRequiredPageDataSaga() {
  let actionsToUpdate = yield select(getActionsToUpdatePageData);
  if (actionsToUpdate.size === 0) {
    return;
  }

  let effects = [];
  for (let i = 0; i < actionsToUpdate.size; i++) {
    effects.push(put(actionsToUpdate.get(i).toJS()))
  }
  yield all(effects);
}

export function* updateRequiredPageDataFlow() {
  yield takeFirst(UPDATE_REQUIRED_PAGE_DATA__LAUNCH, updateRequiredPageDataSaga);
}


/* Exported sagas */

export default [
  updateRequiredPageDataFlow,
];
