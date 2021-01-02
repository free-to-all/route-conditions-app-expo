// @flow

import {Dispatch} from 'redux';
import * as Location from "expo-location";
import {LocationObject} from "expo-location";
import {submitReport as postReport} from "../../models/ReportsClient";
import type {Report} from "../store";
import {refreshReports} from "../slices/reportsSlice";


const CURRENT_LOCATION_REQUEST_ACTION = 'CURRENT_LOCATION_REQUEST_ACTION';
const CURRENT_LOCATION_DONE_ACTION = 'CURRENT_LOCATION_DONE_ACTION';
const CURRENT_LOCATION_FAIL_ACTION = 'CURRENT_LOCATION_FAIL_ACTION';

const SUBMIT_REPORT_REQUEST_ACTION = 'SUBMIT_REPORT_REQUEST_ACTION';
const SUBMIT_REPORT_DONE_ACTION = 'SUBMIT_REPORT_DONE_ACTION';
const SUBMIT_REPORT_FAIL_ACTION = 'SUBMIT_REPORT_FAIL_ACTION';

export function isCurrentLocationRequestAction ( action ) {
    return action.type === CURRENT_LOCATION_REQUEST_ACTION;
}

export function createCurrentLocationRequestAction () {
    return {
        type: CURRENT_LOCATION_REQUEST_ACTION,
    };
}

export function isCurrentLocationDoneAction ( action: { type: CURRENT_LOCATION_DONE_ACTION } ) {
    return action.type === CURRENT_LOCATION_DONE_ACTION;
}

export function createCurrentLocationDoneAction ( location: LocationObject ) {
    return {
        type: CURRENT_LOCATION_DONE_ACTION,
        location: location,
    };
}

export function isCurrentLocationFailedAction ( action ) {
    return action.type === CURRENT_LOCATION_FAIL_ACTION;
}

export function createCurrentLocationFailedAction ( error ) {
    return {
        type: CURRENT_LOCATION_FAIL_ACTION,
        payload: error,
    };
}

export function refreshCurrentPosition () {
    return async ( dispatch: Dispatch ) => {
        dispatch( createCurrentLocationRequestAction() );

        let {status} = await Location.requestPermissionsAsync();
        if ( status !== 'granted' ) {
            return;
        }
        //TODO: handle failure

        const location = await Location.getCurrentPositionAsync( {} );
        dispatch( createCurrentLocationDoneAction( location ) )
        return setTimeout( () => refreshCurrentPosition()( dispatch ), 10000 );
    }
}

export function isSubmitReportRequestAction ( action ) {
    return action.type === SUBMIT_REPORT_REQUEST_ACTION;
}

export function createSubmitReportRequestAction () {
    return {
        type: SUBMIT_REPORT_REQUEST_ACTION,
    };
}

export function isSubmitReportDoneAction ( action: { type: SUBMIT_REPORT_DONE_ACTION } ) {
    return action.type === SUBMIT_REPORT_DONE_ACTION;
}

export function createSubmitReportDoneAction ( report: Report ) {
    return {
        type: SUBMIT_REPORT_DONE_ACTION,
        report: report,
    };
}

export function isSubmitReportFailedAction ( action ) {
    return action.type === SUBMIT_REPORT_FAIL_ACTION;
}

export function createSubmitReportFailedAction ( error ) {
    return {
        type: SUBMIT_REPORT_FAIL_ACTION,
        payload: error,
    };
}

export function submitReport ( authToken, report ) {
    return async ( dispatch: Dispatch ) => {
        dispatch( createSubmitReportRequestAction() );

        //TODO: handle failure
        //TODO: on Success display message to user

        postReport( authToken, report,
            ( error, report ) => {
                if ( error ) {
                    dispatch( createSubmitReportFailedAction( err ) );
                } else if ( report ) {
                    dispatch( createSubmitReportDoneAction( report ) );
                    //TODO: This will produce additional refresh reports recursive stack, meaning refresh reports will be called 2 times instead of one on a timer
                    refreshReports( authToken, false )( dispatch );
                }
            } );
    }
}
