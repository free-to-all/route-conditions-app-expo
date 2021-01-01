// @flow
//import thunk for doing asynchronous operations in redux
import {routeConditionsReducer} from "./reducers/routeConditionsReducer";
import {configureStore} from "@reduxjs/toolkit";
//import mapReducer from our mapReducer file

export type User = {
    name: string,
}

export type Report = {
    id: number,
    lat: number,
    lon: number,
    message: string,
    user: User,
    created_at: string

}

export const reportsStore = configureStore( {
        reducer: routeConditionsReducer
    }
);