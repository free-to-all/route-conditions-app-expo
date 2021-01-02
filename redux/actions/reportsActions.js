// @flow

import {Dispatch} from 'redux';
import {submitReport as postReport} from "../../models/ReportsClient";
import type {Report} from "../store";
import {refreshReports} from "../slices/reportsSlice";


const SUBMIT_REPORT_REQUEST_ACTION = 'SUBMIT_REPORT_REQUEST_ACTION';
const SUBMIT_REPORT_DONE_ACTION = 'SUBMIT_REPORT_DONE_ACTION';
const SUBMIT_REPORT_FAIL_ACTION = 'SUBMIT_REPORT_FAIL_ACTION';


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
