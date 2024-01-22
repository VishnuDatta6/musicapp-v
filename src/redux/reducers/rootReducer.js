import { combineReducers } from "redux";
import songReducer from "./songReducer";


const rootReducer = combineReducers({
    song: songReducer,
});


export default rootReducer;