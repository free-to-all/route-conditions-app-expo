import {combineReducers} from "redux";
import {mapReducer} from "./mapReducer";
import {userReducer} from "./userReducer";

export const routeConditionsReducer = combineReducers({
    map: mapReducer,
    user: userReducer,
});