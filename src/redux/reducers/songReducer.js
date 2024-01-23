import * as actionTypes from '../actions/actionTypes';

const initialState = {
    songs: {},
    loading: false,
    error: null,
    current : {
     song : 0,
     playlist : [],
    }
}

const songReducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.FETCH_SONGS_REQUEST:
            return {...state, loading: true, error: null};
        case actionTypes.FETCH_SONGS_SUCCESS:
            return {...state, loading: false, songs : action.payload};
        case actionTypes.FETCH_SONGS_FAILURE:
            return {...state, loading: false, songs : action.payload.error};
        case actionTypes.SET_CURRENT_SONG:
            return {...state, current : {song: action.payload.song, playlist: action.payload.playlist} };
        default:
            return state;
    }
};

export default songReducer;