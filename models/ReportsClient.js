// @flow
import {format} from "date-fns";

const superagent = require( 'superagent' );

export function indexReports ( authToken:string, errorCallback, successCallback ) {

    superagent.get( 'http://192.168.1.20:3000/reports' )
        .set( {
            "Authorization": authToken,
            "Accept": "application/json"
        } ).end( ( err, res ) => {
        //TODO: handle bad response code. For example, should not trigger createRefreshReportsDoneAction, also
        // reduce must not allow null payload to ruin everything
        if ( err ) {
            errorCallback( err );
        } else if ( res ) {
            const reports = res.body.map( transformReport );
            successCallback( reports );
        }
    } );
}

//TODO: use command pattern here? instead of passing callbacks
export function authenticateUser ( email: string, password: string, errorCallback, successCallback ) {
    superagent.post( 'http://192.168.1.20:3000/authenticate' )
        .send( {email: email, password: password} )
        .set( {
            "Accept": "application/json",
            "Content-Type": "application/json",
        } ).end( ( err, res ) => {
        if ( err ) {
            errorCallback( err );
        } else if ( res ) {
            successCallback( res.body.auth_token );
        }
    } )
}

function transformReport ( report ) {
    const myReport = {...report}
    const date = new Date( report.created_at );
    myReport.created_at = format( date, "MMM do, yyyy H:mma" );
    return myReport;
}