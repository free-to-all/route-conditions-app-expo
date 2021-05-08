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

    //TODO: This should live in the same place where the other piece of logic for determining behavior after splash
    //screen lives. That is in Nav component
    if (stateProps.needsAuth) {
        props.navigation.navigate('LoginScreen')
    }

    return (<SplashScreen />);

}