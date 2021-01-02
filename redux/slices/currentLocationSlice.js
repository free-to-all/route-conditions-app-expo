import {Dispatch} from "redux";
import * as Location from "expo-location";

const {createSlice} = require( "@reduxjs/toolkit" );

const currentLocationSlice = createSlice( {
    name: 'currentLocation',
    initialState: {location: null},
    reducers: {
        currentLocationLoading ( state, action ) {
            console.log( "CURRENT LOCATION LOADING" );
            //TODO: Hide the button to submit report until current location loads
        },
        currentLocationLoaded ( state, action ) {
            console.log("CURRENT LOCATION LOADED");
            console.log(action);
            console.log("STATE");
            console.log(state);
            state.location = action.payload;
        },
        currentLocationLoadingFailed ( state, action ) {
            //TODO: Show error on the screen
        }

    }
} );

export const {
    currentLocationLoading,
    currentLocationLoaded,
    currentLocationLoadingFailed
} = currentLocationSlice.actions;

export default currentLocationSlice.reducer;

export function refreshCurrentPosition () {
    return async ( dispatch: Dispatch ) => {
        dispatch( currentLocationLoading( true ) );

        let {status} = await Location.requestPermissionsAsync();
        if ( status !== 'granted' ) {
            return;
        }
        //TODO: handle failure

        const location = await Location.getCurrentPositionAsync( {} );
        dispatch( currentLocationLoaded( location ) )
        return setTimeout( () => refreshCurrentPosition()( dispatch ), 10000 );
    }
}

