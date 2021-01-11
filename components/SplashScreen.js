// @flow
import React, {useEffect} from 'react';

import {Button, KeyboardAvoidingView, StyleSheet, Text, View,} from 'react-native';




export function SplashScreen ( props ) {

    useEffect( () => {
        setTimeout(()=> { props.navigation.navigate('LoginScreen')}, 1000)
    }, [props.navigation]);

    const splashText = "RouteConditions App is loading...";

    return (
        <View style={styles.container}>
            <Text style={styles.splashText}>{splashText}</Text>
        </View>
    );
}

const styles = StyleSheet.flatten( {
    splashText: {
        fontSize: 20
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
} );