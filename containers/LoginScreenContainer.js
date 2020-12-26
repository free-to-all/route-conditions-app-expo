// @flow
//import React and PureComponent to have the ability to have a shallow comparison of props and state
import React, {useMemo} from 'react';
import {LoginScreen} from "../components/LoginScreen";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {authenticateUser} from "../actions/routeActions";


export function LoginScreenContainer () {
    const stateProps = useSelector(state => {
        return {
            userToken: state.userToken,
        };
    });

    const dispatch = useDispatch();

    const boundActionProps = useMemo(() => bindActionCreators(
        {
            onLogin: (email, password) => authenticateUser(email, password)
        },
        dispatch
    ), [dispatch]);

    return (<LoginScreen {...stateProps} {...boundActionProps} />);
}
