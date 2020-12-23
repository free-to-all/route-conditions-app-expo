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
        props.onRefreshCurrentPosition();

    }, [props.onRefreshCurrentPosition] );

    const {reports, loading, errorMessage} = props;

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

        if ( props.reports.length === 0 ) {
            return;
        }

        return props.reports.map( ( report ) => <Marker
            key={report.id}
            coordinate={{latitude: parseFloat( report.lat ), longitude: parseFloat( report.lon )}}
            title={report.message}
            description={report.message}
        >
        </Marker> )
    }


    let lat = 47.6062;
    let lon = -122.3321;
    let markers = [];

    if ( props.reports.length > 0 ) {
        const lastItem = props.reports.length - 1;
        lat = props.reports[ lastItem ].lat;
        lon = props.reports[ lastItem ].lon;
        markers = mapMarkers();
    }

    if ( props.currentLocation ) {
        markers.push( currentLocationMarker( props.currentLocation ) );
    }

    if ( !loading ) {
        return (
            <>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: parseFloat( lat ),
                        longitude: parseFloat( lon ),
                        latitudeDelta: 9.5,
                        longitudeDelta: 9.5,
                    }}
                >
                    {markers}
                </MapView>
                {/* <View style={styles.container}>
          {reports.length ? reports.map((report, i) => <Text key={i}>{report.message}</Text>) : <Text>No Reports</Text>}
        </View> */}
            </>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Loading...........</Text>
            </View>
        )
    }
    // return (
    //   <View style={styles.container}>
    //     <Text>{reports.map((report, i) => ) ? "hey" : "yo"}</Text>
    //   </View>
    // );
}

//Define your styles by using StyleSHeet from react-native to cerate a css abstraction
const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }, mapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
} );
