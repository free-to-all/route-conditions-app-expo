// @flow
//import React and PureComponent to have the ability to have a shallow comparison of props and state
import React from 'react';

import {Nav} from "../components/Nav";
import {useSelector} from "react-redux";


export function NavContainer () {
    const stateProps = useSelector( state => {
        return {
            userToken: state.user.authToken,
        };
    } );
    return (

        <Nav {...stateProps} />
    );
}
