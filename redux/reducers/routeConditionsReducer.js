import {combineReducers} from "redux";
import {mapReducer} from "./mapReducer";
import userReducer from "../slices/userSlice";


export const routeConditionsReducer = combineReducers({
    map: mapReducer,
    user: userReducer,
});