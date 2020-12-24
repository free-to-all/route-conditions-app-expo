// @flow
//import React and PureComponent to have the ability to have a shallow comparison of props and state
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {Report} from '../redux/store';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {LocationObject} from 'expo-location';

export type ReportsListProps = {
    reports: Report[];
    currentLocation: LocationObject;
    loading: boolean;
    authToken: string;
    errorMessage: string;
    onRefreshReports: () => void;
    onRefreshCurrentPosition: () => void;
}

export const ReportsList: ( props: ReportsListProps ) => React$Node = ( props: ReportsListProps ) => {

    useEffect( () => {
            props.onRefreshReports( props.authToken );
        }, [props.onRefreshReports]
    );

    useEffect( () => {
        const timeoutId = props.onRefreshCurrentPosition();
        return () => clearTimeout( timeoutId );

    }, [props.onRefreshCurrentPosition] );

    //TODO: user errorMesage
    const {reports, loading, currentLocation} = props;

    const currentLocationMarker = ( loc ) => {
        return (
            <Marker
                key={0}
                coordinate={{latitude: loc.coords.latitude, longitude: loc.coords.longitude}}
                title={"Your current Location"}
                description={"Report Conditions here"}
            >
            </Marker>
        );
    };

    const mapMarkers = () => {

        if ( reports.length === 0 ) {
            return [];
        }

        return reports.map( ( report ) => <Marker
            key={report.id}
            coordinate={{latitude: parseFloat( report.lat ), longitude: parseFloat( report.lon )}}
            title={report.message}
            description={report.message}
        >
        </Marker> )
    }


    let markers = [];

    let region = {latitude: 47.6062, longitude: -122.3321, latitudeDelta: 9.5, longitudeDelta: 9.5};

    if ( reports.length > 0 ) {
        const lastItem = reports.length - 1;
        region.latitude = parseFloat( reports[ lastItem ].lat );
        region.longitude = parseFloat( reports[ lastItem ].lon );
        markers = mapMarkers();
    }

    if ( currentLocation ) {
        markers.push( currentLocationMarker( currentLocation ) );
        region.latitude = currentLocation.coords.latitude;
        region.longitude = currentLocation.coords.longitude;
        region.latitudeDelta = 0.06;
        region.longitudeDelta = 0.06;
    }

    if ( !loading ) {
        return (
            <>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={region}
                    mapType={"terrain"}
                >
                    {markers}
                </MapView>
            </>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Loading...........</Text>
            </View>
        )
    }
}

//Define your styles by using StyleSheet from react-native to create a css abstraction
const styles = StyleSheet.create( {
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 700,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
} );
