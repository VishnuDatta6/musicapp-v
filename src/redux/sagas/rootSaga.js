import { all } from 'redux-saga/effects';
import watchFetchSongs from './songSaga';

function* rootSaga(){
    yield all([
        watchFetchSongs(),
    ]);
}

export default rootSaga;