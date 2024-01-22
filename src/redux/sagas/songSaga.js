import * as actionTypes from '../actions/actionTypes';
import {put,take,takeLatest, call} from 'redux-saga/effects';
import { fetchSongsFailure, fetchSongsSuccess } from '../actions/songActions';
import firebase, {database} from '../../firebase';
import { getDatabase, ref, onValue } from 'firebase/database';

const onValuePromise = (ref) => new Promise((resolve, reject) => {
    onValue(ref, (snapshot) => resolve(snapshot));
  });

function* fetchSongs(){
    try {
        const dbRef = ref(database);
        const snapshot = yield call(onValuePromise, dbRef);
        const data = snapshot.val()
        yield put(fetchSongsSuccess(data));
    } catch (error) {
        yield put(fetchSongsFailure(error.message));
    }
}

function* watchFetchSongs(){
    yield takeLatest(actionTypes.FETCH_SONGS_REQUEST, fetchSongs);
}

export default watchFetchSongs;