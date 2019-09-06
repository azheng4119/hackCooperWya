import React from 'react'
import { TouchableOpacity, Text, Dimensions, StyleSheet, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import axios from 'axios';

export default class maps extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion = {{
                        latitude: 40.7549,
                        longitude: -73.9840,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={false}
                    loadingEnabled={true}>

                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});