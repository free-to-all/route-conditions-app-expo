// @flow

import {Dispatch} from 'redux';

const superagent = require( 'superagent' );

const AUTHENTICATE_USER_REQUEST_ACTION = 'AUTHENTICATE_USER_REQUEST_ACTION';
const AUTHENTICATE_USER_DONE_ACTION = 'AUTHENTICATE_USER_DONE_ACTION';
const AUTHENTICATE_USER_FAIL_ACTION = 'AUTHENTICATE_USER_FAIL_ACTION';

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