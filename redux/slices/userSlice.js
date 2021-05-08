import {Dispatch} from "redux";
import {authenticateUser as doAuth} from "../../models/ReportsClient";
import * as SecureStore from 'expo-secure-store';
import jwt_decode from "jwt-decode";

const {createSlice} = require( "@reduxjs/toolkit" );

const AUTH_TOKEN_KEY = 'authToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const userSlice = createSlice( {
    name: 'user',
    initialState: {authToken: '', needsAuth: false},
    reducers: {
        userAuthenticatingLocal ( state, action ) {
            console.log( "RESTORING USER AUTH FROM LOCAL STORAGE" );
        },
        userAuthenticatedLocal ( state, action ) {
            console.log( "RESTORED USER AUTH FROM LOCAL STORAGE" );
            state.authToken = action.payload;
        },
        userAuthenticatingLocalFailed ( state, action ) {
            //TODO: Call refresh token API

            console.log( "RESTORE USER AUTH FROM LOCAL STORAGE FAILED" );
            state.authToken = '';
            state.needsAuth = action.payload;
        },
        userAuthenticating ( state, action ) {
            console.log( "AUTHENTICATING USER" );
            //TODO: display "Authenticating..."
        },
        userAuthenticated ( state, action ) {
            console.log( "AUTHENTICATED USER" );
            state.authToken = action.payload;
        },
        refreshingTokens ( state, action ) {
            console.log( "REFRESHING TOKENS" );
        }
    }
} );


export const {
    userAuthenticatingLocal,
    userAuthenticatedLocal,
    userAuthenticatingLocalFailed,
    userAuthenticated,
    userAuthenticating
} = userSlice.actions;

function storeAuthToken ( authToken: string ) {
    SecureStore.setItemAsync( AUTH_TOKEN_KEY, authToken )
        .then( function () {
            return true;
        } )
        .catch( function ( e ) {
            //TODO: handle error better. At least log?
            return false;
        } )
}

function storeRefreshToken ( refreshToken: string ) {
    SecureStore.setItemAsync( REFRESH_TOKEN_KEY, refreshToken )
        .then( function () {
            return true;
        } )
        .catch( function ( e ) {
            //TODO: handle error better. At least log?
            return false;
        } )
}

export function authenticateUser ( email: string, password: string ) {
    return ( dispatch: Dispatch ) => {
        dispatch( (userAuthenticating( email )) );
        doAuth( email, password,
            ( error, authToken, refreshToken ) => {
                if ( authToken ) {
                    storeAuthToken( authToken );
                    storeRefreshToken( refreshToken );
                    dispatch( userAuthenticated( authToken ) );
                } else if ( error ) {
                    //TODO: What if auth fails? show error to user.
                    console.log( "USER AUTH FAILED!" )
                    console.log( error );
                }
            }
        )
    }
}

function isStillValid ( authToken: string ) {
    if ( authToken === null ) {
        return false;
    }

    const decodedAuthToken = jwt_decode( authToken );
    return (Date.now() >= decodedAuthToken.exp * 1000);
}

export function refreshTokens () {
    return ( dispatch: Dispatch ) => {
        dispatch()
    }
}

export function authenticateUsingLocalStorage () {
    return ( dispatch: Dispatch ) => {
        // SecureStore.deleteItemAsync(AUTH_TOKEN_KEY).then(() => {})
        dispatch( (userAuthenticatingLocal()) );
        SecureStore.getItemAsync( AUTH_TOKEN_KEY )
            .then( ( authToken ) => {
                if ( isStillValid( authToken ) ) {
                    dispatch( userAuthenticatedLocal( authToken ) );
                } else {
                    console.log( "AUTH TOKEN EXPIRED!" )
                    //TODO: else try to refresh token
                    dispatch( (userAuthenticatingLocalFailed( true )) )
                }
            } )
            .catch( ( e ) => {
                console.log( "FETCHING AUTH TOKEN FROM LOCAL STORAGE FAILED" );
                console.log( e.message );
                dispatch( (userAuthenticatingLocalFailed( true )) )
            } );
    }
}

export default userSlice.reducer;
