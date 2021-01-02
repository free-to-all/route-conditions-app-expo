import reportsReducer from '../slices/reportsSlice';
import currentLocationReducer from '../slices/currentLocationSlice';
import submitReportReducer from '../slices/submitReportSlice';
import {combineReducers} from "redux";


export const mapReducer = combineReducers( {
    reports: reportsReducer,
    currentLocation: currentLocationReducer,
    submitReport: submitReportReducer,
} );
