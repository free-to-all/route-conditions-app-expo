import {combineReducers} from "redux";
import {isAuthenticateUserDoneAction} from "../../actions/routeActions";

export const authTokenReducer = ( authToken = '', action ) => {
    if (isAuthenticateUserDoneAction(action)) {
        return action.payload.authToken;
    } else {
        return authToken;
    }
}

export const userReducer = combineReducers( {
    authToken: authTokenReducer,
} );
