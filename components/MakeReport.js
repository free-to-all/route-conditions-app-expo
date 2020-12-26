import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {Report} from "../redux/store";
import {LocationObject} from "expo-location";

export type MakeReportProps = {
    currentLocation: LocationObject;
    submitReport: ( Report ) => void;
}

export function MakeReport ( props: MakeReportProps ) {

    //TODO: when current location is not available yet, need to shows something else that doens't actually allow pressing
    // on buttons
    let report = {};
    if ( props.currentLocation ) {
        report = {
            lat: props.currentLocation.coords.latitude,
            lon: props.currentLocation.coords.longitude,
            message: "There is snow here",
        }
    }

    return (
        <View style={styles.container}>
            <Pressable
                onPress={
                    () => {
                        props.submitReport( report );
                    }
                }
                style={styles.wrapperCustom}
            >
                <Text style={styles.text}>
                    Report snow
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create( {
    container: {
        alignSelf: 'flex-end',
        marginTop: '40%',
        backgroundColor: 'white'
    },
    text: {
        fontSize: 16
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6
    },
} );
