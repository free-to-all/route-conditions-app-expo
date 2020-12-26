// @flow
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
