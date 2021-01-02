import {isCurrentLocationDoneAction} from '../actions/reportsActions';
import reportsReducer from '../slices/reportsSlice';
import {combineReducers} from "redux";

export const currentLocationReducer = ( currentLocation = null, action ) => {
    if ( isCurrentLocationDoneAction( action) ) {
        return action.location;
    } else {
        return currentLocation;
    }
}

export const mapReducer = combineReducers( {
    reports: reportsReducer,
    currentLocation: currentLocationReducer,
} );
