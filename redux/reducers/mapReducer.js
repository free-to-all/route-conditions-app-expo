import {isFetchData, isFetchDataFulfilled, isFetchDataRejected} from '../../actions/routeActions';
import {combineReducers} from "redux";

export const reportsReducer = ( reports = [], action ) => {
    if ( isFetchDataFulfilled( action ) ) {
        return action.payload;
    } else {
        return reports;
    }
}

export const loadingReducer = ( loading = true, action ) => {
    if ( isFetchData( action ) ) {
        return action.payload;
    } else if ( isFetchDataFulfilled( action ) ) {
        return action.loading;
    } else if ( isFetchDataRejected( action ) ) {
        return action.loading;
    } else {
        return loading;
    }
}

export const errorReducer = ( errorMessage = '', action ) => {
    if ( isFetchDataRejected( action ) ) {
        return action.payload;
    } else {
        return errorMessage;
    }
}

export const mapReducer = combineReducers( {
    reports: reportsReducer,
    loading: loadingReducer,
    errorMessage: errorReducer,
} );
