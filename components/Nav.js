import React from 'react';

import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {HomeScreen} from "./HomeScreen";
import {LoginScreenContainer} from "../containers/LoginScreenContainer";

const Stack = createStackNavigator();

export function Nav ( props ) {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                {props.userToken === '' ? (
                    <Stack.Screen name="LoginScreen" component={LoginScreenContainer}/>
                ) : (
                    <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
