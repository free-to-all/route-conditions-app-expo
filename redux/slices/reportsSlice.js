import {Dispatch} from "redux";
import {indexReports} from "../../models/ReportsClient";

const {createSlice} = require( "@reduxjs/toolkit" );

const reportsSlice = createSlice( {
    name: 'reports',
    initialState: {reports: [], loading: true, errorMessage: ''},
    reducers: {
        reportsLoading ( state, action ) {
            console.log("REFRESHING REPORTS");
            state.loading = action.payload.loading;
        },
        reportsLoaded ( state, action ) {
            console.log("REFRESHING REPORTS DONE");
            state.reports = action.payload.reports;
            state.loading = false;
        },
        reportsLoadingFailed ( state, action ) {
            state.loading = false;
        }

    }
} );

export const {reportsLoading, reportsLoaded, reportsLoadingFailed} = reportsSlice.actions;
export default reportsSlice.reducer;

export function refreshReports ( authToken: string, loading = true ) {
    return ( dispatch: Dispatch ) => {
        dispatch( reportsLoading( {loading} ) );
        indexReports( authToken,
            ( err, reports ) => {
                if ( err ) {
                    dispatch( reportsLoadingFailed( err ) )
                } else if ( reports ) {
                    dispatch( reportsLoaded( {reports} ) );
                }
            } );
    }
}
