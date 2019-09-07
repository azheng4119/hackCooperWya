import React from 'react'
import { TouchableOpacity, Text, Dimensions, StyleSheet, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import axios from 'axios';
import Chat from '../components/chat';

export default class maps extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Chat style = {{zIndex : 1,position : 'absolute'}}></Chat>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 40.7549,
                        longitude: -73.9840,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={false}
                    loadingEnabled={true}>

                    <Polyline
                        coordinates={[
                            { latitude: 37.8025259, longitude: -122.4351431 },
                            { latitude: 37.7896386, longitude: -122.421646 },
                            { latitude: 37.7665248, longitude: -122.4161628 },
                            { latitude: 37.7734153, longitude: -122.4577787 },
                            { latitude: 37.7948605, longitude: -122.4596065 },
                            { latitude: 37.8025259, longitude: -122.4351431 }
                        ]}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}
                    />
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
        zIndex : -1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});