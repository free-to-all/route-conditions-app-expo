// @flow

import {Dispatch} from 'redux';
import * as Location from "expo-location";
import {LocationObject} from "expo-location";

const superagent = require( 'superagent' );

const GET_REPORTS = 'GET_REPORTS';
const GET_REPORTS_FULFILLED = 'GET_REPORTS_FULFILLED';
const GET_REPORTS_REJECTED = 'GET_REPORTS_REJECTED';

const AUTHENTICATE_USER_REQUEST_ACTION = 'AUTHENTICATE_USER_REQUEST_ACTION';
const AUTHENTICATE_USER_DONE_ACTION = 'AUTHENTICATE_USER_DONE_ACTION';
const AUTHENTICATE_USER_FAIL_ACTION = 'AUTHENTICATE_USER_FAIL_ACTION';

const CURRENT_LOCATION_REQUEST_ACTION = 'CURRENT_LOCATION_REQUEST_ACTION';
const CURRENT_LOCATION_DONE_ACTION = 'CURRENT_LOCATION_DONE_ACTION';
const CURRENT_LOCATION_FAIL_ACTION = 'CURRENT_LOCATION_FAIL_ACTION';

export function isFetchData ( action ) {
    return action.type === GET_REPORTS;
}

//Define your action create that set your loading state.
export function fetchData ( bool ) {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: GET_REPORTS,
        payload: bool,
    };
}

export function isFetchDataFulfilled ( action ) {
    return action.type === GET_REPORTS_FULFILLED;
}

//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export function fetchDataFulfilled ( data ) {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_REPORTS_FULFILLED,
        payload: data,
        loading: false,
    };
}

export function isFetchDataRejected ( action ) {
    return action.type === GET_REPORTS_REJECTED;
}

//Define a action creator that catches a error and sets an errorMessage
export function fetchDataRejected ( error ) {
    //Return a action type and a payload with a error
    return {
        type: GET_REPORTS_REJECTED,
        payload: error,
        loading: false,
    };
}

//Define your action creators that will be responsible for async operations
export const getReports = (authToken) => {
    return ( dispatch: Dispatch ) => {
        //Dispatch the fetchData action creator before retrieving to set our loading state to true.
        dispatch( fetchData( true ) );
        //Then do a get request the get the err, and response callback, if there's an error dispatch the fetchDataRejected.
        superagent.get( 'http://192.168.1.20:3000/reports' )
            .set( {
                "Authorization": authToken,
                "Accept": "application/json"
            } ).end( ( err, res ) => {
            //if there is an error use our fetchDataReject
            if ( err ) dispatch( fetchDataRejected( err ) );
            //We will set our loading state when fetching data is successful.
            if ( res ) dispatch( fetchDataFulfilled( res.body ) );
        } )
    }
}

export function isGetCurrentLocationRequestAction ( action ) {
    return action.type === CURRENT_LOCATION_REQUEST_ACTION;
}

export function createCurrentLocationRequestAction () {
    return {
        type: CURRENT_LOCATION_REQUEST_ACTION,
    };
}

export function isCurrentLocationDoneAction ( action : {type: CURRENT_LOCATION_DONE_ACTION} ) {
    return action.type === CURRENT_LOCATION_DONE_ACTION;
}

export function createCurrentLocationDoneAction ( location : LocationObject ) {
    return {
        type: CURRENT_LOCATION_DONE_ACTION,
        location: location,
    };
}

export function isCurrentLocationFailedAction ( action ) {
    return action.type === GET_REPORTS_REJECTED;
}

export function createCurrentLocationFailedAction ( error ) {
    return {
        type: GET_REPORTS_REJECTED,
        payload: error,
    };
}

export function refreshCurrentPosition(){
    return async ( dispatch: Dispatch ) => {
        dispatch(createCurrentLocationRequestAction());

        let {status} = await Location.requestPermissionsAsync();
        if ( status !== 'granted' ) {
            return;
        }
        //TODO: handle failure

        const location = await Location.getCurrentPositionAsync( {} );
        //TODO: repeat this task forever
        dispatch(createCurrentLocationDoneAction(location))
    }
}

export function isAuthenticateUserRequestAction ( action ) {
    return action.type === AUTHENTICATE_USER_REQUEST_ACTION;
}

//Define your action create that set your loading state.
export function createAuthenticateUserRequestAction ( email ) {
    //return a action type and a loading state indicating it is getting data.
    return {
        type: AUTHENTICATE_USER_REQUEST_ACTION,
        payload: {
            email: email,
        },
    };
}

export function isAuthenticateUserDoneAction ( action ) {
    return action.type === AUTHENTICATE_USER_DONE_ACTION;
}

//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export function createAuthenticateUserDoneAction ( authToken ) {
    //Return a action type and a loading to false, and the data.
    return {
        type: AUTHENTICATE_USER_DONE_ACTION,
        payload: {
            authToken: authToken,
        },
    };
}


export function authenticateUser ( email: string, password: string ) {
    return ( dispatch: Dispatch ) => {
        dispatch( (createAuthenticateUserRequestAction( email )) );
        superagent.post( 'http://192.168.1.20:3000/authenticate' )
            .send( {email: email, password: password} )
            .set( {
                "Accept": "application/json",
                "Content-Type": "application/json",
            } ).end( ( err, res ) => {
            if ( res ) dispatch( createAuthenticateUserDoneAction( res.body.auth_token ) );
        } )
    }
}