import * as actionTypes from './actionTypes';

export const fetchSongsRequest = ()=>({
    type : actionTypes.FETCH_SONGS_REQUEST,
})

export const fetchSongsSuccess = (songs)=>({
    type : actionTypes.FETCH_SONGS_SUCCESS,
    payload : songs
})

export const fetchSongsFailure = (error)=>({
    type: actionTypes.FETCH_SONGS_FAILURE,
    payload: {error}
})

export const setCurrentSong = (obj)=>({
    type: actionTypes.SET_CURRENT_SONG,
    payload : obj
})