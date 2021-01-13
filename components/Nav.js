import React from 'react';

import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {LoginScreenContainer} from "../containers/LoginScreenContainer";
import {MapScreen} from "./MapScreen";
import {SplashScreenContainer} from "../containers/SplashScreenContainer";

const Stack = createStackNavigator();

export function Nav ( props ) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{
                headerShown: false
            }}>
                {props.userToken === '' ? (
                    <>
                        <Stack.Screen name="SplashScreen" component={SplashScreenContainer}/>
                        <Stack.Screen name="LoginScreen" component={LoginScreenContainer}/>
                    </>
                ) : (
                    <Stack.Screen name="MapScreen" component={MapScreen}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
