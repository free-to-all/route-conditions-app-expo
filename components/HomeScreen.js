import {SafeAreaView, StatusBar, StyleSheet, View} from "react-native";
import {ReportsListContainer} from "../containers/ReportsListContainer";
import React from "react";
import {Colors} from "react-native/Libraries/NewAppScreen";

export function HomeScreen () {
    return (
        <SafeAreaView style={styles.body}>
            <ReportsListContainer/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create( {
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,

    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },

} );