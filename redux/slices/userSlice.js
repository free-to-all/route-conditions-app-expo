import {Dispatch} from "redux";
const superagent = require( 'superagent' );

const {createSlice} = require( "@reduxjs/toolkit" );

const userSlice = createSlice( {
    name: 'user',
    initialState: {authToken: ''},
    reducers: {
        userAuthenticating(state, action) {
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
        superagent.post( 'http://192.168.1.20:3000/authenticate' )
            .send( {email: email, password: password} )
            .set( {
                "Accept": "application/json",
                "Content-Type": "application/json",
            } ).end( ( err, res ) => {
            if ( res ) dispatch( userSlice.actions.userAuthenticated( res.body.auth_token ) );
        } )
    }
}

export const { userAuthenticated, userAuthenticating } = userSlice.actions;
export default userSlice.reducer;
