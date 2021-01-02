import {Dispatch} from "redux";
import {authenticateUser as doAuth} from "../../models/ReportsClient";

const superagent = require( 'superagent' );

const {createSlice} = require( "@reduxjs/toolkit" );

const userSlice = createSlice( {
    name: 'user',
    initialState: {authToken: ''},
    reducers: {
        userAuthenticating ( state, action ) {
            //TODO: display "Authenticating..."
        },
        userAuthenticated ( state, action ) {
            state.authToken = action.payload;
        }
    }
} );


export const {userAuthenticated, userAuthenticating} = userSlice.actions;

export function authenticateUser ( email: string, password: string ) {
    return ( dispatch: Dispatch ) => {
        dispatch( (userAuthenticating( email )) );
        doAuth( email, password,
            ( error, authToken ) => {
                if ( authToken ) {
                    dispatch( userAuthenticated( authToken ) );
                } else if ( error ) {
                    //TODO: What if auth fails? show error to user.
                    console.log( "USER AUTH FAILED!" )
                }
            }
        )
    }
}

export default userSlice.reducer;
