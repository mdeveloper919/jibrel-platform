import {take, fork} from 'redux-saga/effects';

const takeFirst = (pattern, saga, ...args) => fork(function*() {
  while (true) {
    const action = yield take(pattern);
    yield fork(saga, ...args.concat(action));
  }
});

export default takeFirst;
