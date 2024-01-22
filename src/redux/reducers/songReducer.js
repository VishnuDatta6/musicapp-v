import * as actionTypes from '../actions/actionTypes';

const initialState = {
    songs: {},
    loading: false,
    error: null,
    currentSong : {
    id : 0,
    title : '',
    artist : '',
    url: '',
    cover: ''
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
            return {...state, currentSong : action.payload};
        default:
            return state;
    }
};

export default songReducer;