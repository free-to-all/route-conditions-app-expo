import {Dispatch} from "redux";
import {submitReport as postReport} from "../../models/ReportsClient";
import {refreshReports} from "./reportsSlice";

const {createSlice} = require( "@reduxjs/toolkit" );

const submitReportSlice = createSlice( {
    name: 'submitReport',
    initialState: {status: '', errorMessage: ''},
    reducers: {
        submittingReport ( state, action ) {
            console.log( "SUBMITTING NEW REPORT" );
            state.status = "submitting";
        },
        reportSubmitted ( state, action ) {
            console.log( "REPORT SUBMITTED" );
            state.status = "success";
        },
        submittingReportFailed ( state, action ) {
            //TODO: Show error on the screen
            state.status = "fail";
        }

    }
} );

export const {
    submittingReport,
    reportSubmitted,
    submittingReportFailed
} = submitReportSlice.actions;

export default submitReportSlice.reducer;

export function submitReport ( authToken, report ) {
    return async ( dispatch: Dispatch ) => {
        dispatch( submittingReport(true) );

        //TODO: handle failure
        //TODO: on Success display message to user

        postReport( authToken, report,
            ( error, report ) => {
                if ( error ) {
                    dispatch( submittingReportFailed( err ) );
                } else if ( report ) {
                    dispatch( reportSubmitted( report ) );
                    refreshReports( authToken, false )( dispatch );
                }
            } );
    }
}

