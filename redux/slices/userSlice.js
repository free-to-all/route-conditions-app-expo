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

export function authenticateUser ( email: string, password: string ) {
    return ( dispatch: Dispatch ) => {
        dispatch( (userSlice.actions.userAuthenticating( email )) );
        doAuth( email, password,
            ( error ) => {

            },
            ( authToken ) => {
                dispatch( userSlice.actions.userAuthenticated( authToken ) );
            }
        )
    }
}

export const {userAuthenticated, userAuthenticating} = userSlice.actions;
export default userSlice.reducer;
