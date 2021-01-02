import reportsReducer from '../slices/reportsSlice';
import currentLocationReducer from '../slices/currentLocationSlice';
import {combineReducers} from "redux";


export const mapReducer = combineReducers( {
    reports: reportsReducer,
    currentLocation: currentLocationReducer,
} );
