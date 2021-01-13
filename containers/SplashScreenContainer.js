// @flow
import React, {useEffect} from "react";
import {SplashScreen} from "../components/SplashScreen";
import {useDispatch, useSelector} from "react-redux";
import {authenticateUsingLocalStorage} from "../redux/slices/userSlice";

export function SplashScreenContainer(props) {
    const dispatch = useDispatch();
    useEffect( () => {
        dispatch(authenticateUsingLocalStorage());
    }, [props.navigation]);

    const stateProps = useSelector(state => {
        return {
            needsAuth: state.user.needsAuth,
        };
    });

    if (stateProps.needsAuth) {
        props.navigation.navigate('LoginScreen')
    }

    return (<SplashScreen />);

}