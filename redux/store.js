// @flow
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension/index";
//import thunk for doing asynchronous operations in redux
import thunk from 'redux-thunk';
import {routeConditionsReducer} from "./reducers/routeConditionsReducer";
//import mapReducer from our mapReducer file


export type Report = {
    id: number,
    lat: number,
    lon: number,
    message: string,
}

export const reportsStore = createStore(
    routeConditionsReducer,
    composeWithDevTools(applyMiddleware(thunk))
);