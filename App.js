import React from 'react';
//import provider to connect component to redux store.
import {Provider} from 'react-redux';
//import your store to connect your component.
import {reportsStore} from './redux/store';
import {registerRootComponent} from 'expo';
import {NavContainer} from "./containers/NavContainer";

export default function App() {
    return (
        <Provider store={reportsStore}>
            <NavContainer />
        </Provider>
    );
}

