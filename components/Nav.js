import React from 'react';

import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {LoginScreenContainer} from "../containers/LoginScreenContainer";
import {MapScreen} from "./MapScreen";

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
                    <Stack.Screen name="MapScreen" component={MapScreen}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
