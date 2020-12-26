import {
    isCurrentLocationDoneAction,
    isRefreshReportsRequestAction,
    isRefreshReportsDoneAction,
    isRefreshReportsFailedAction
} from '../../actions/routeActions';
import {combineReducers} from "redux";

export const reportsReducer = ( reports = [], action ) => {
    if ( isRefreshReportsDoneAction( action ) ) {
        return action.payload;
    } else {
        return reports;
    }
}

export const loadingReducer = ( loading = true, action ) => {
    if ( isRefreshReportsRequestAction( action ) ) {
        return action.payload;
    } else if ( isRefreshReportsDoneAction( action ) ) {
        return action.loading;
    } else if ( isRefreshReportsFailedAction( action ) ) {
        return action.loading;
    } else {
        return loading;
    }
}

export const errorReducer = ( errorMessage = '', action ) => {
    if ( isRefreshReportsFailedAction( action ) ) {
        return action.payload;
    } else {
        return errorMessage;
    }
}

export const currentLocationReducer = ( currentLocation = null, action ) => {
    if ( isCurrentLocationDoneAction( action) ) {
        return action.location;
    } else {
        return currentLocation;
    }
}

export const mapReducer = combineReducers( {
    reports: reportsReducer,
    loading: loadingReducer,
    currentLocation: currentLocationReducer,
    errorMessage: errorReducer,
} );
