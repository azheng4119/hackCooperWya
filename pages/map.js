import React from 'react'
import { TouchableOpacity, Text, Dimensions, StyleSheet, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import axios from 'axios';
import Chat from '../components/chat';

export default class maps extends React.Component {

    constructor(props) {
        super()
        this.state = {
            destination: "Cooper Union",
            members: ["Napat", "Steven", "Andy"],
            currentLocations: ["Baruch College", "89 Murray St", "NYU Tandon"],
            color : ['blue','green','orange'],
            polys: [],
            startPins: [],
            endPin: []
        }
    }

    componentDidMount() {
        this.getGroup()
        this.getPolys();
    }

    getGroup = async () => {
        let members = []
        let locations = []
        let destination = ""
        try {
            let {data} = await axios.get(`http://wya-api.herokuapp.com/group`)  
            members = data[0]['friends'].split(',');
            locations = data[0]['place'].split(',');
            destination = data[0]['location'];
        } catch (err){

        }
        this.setState({
            members : members,
            locations : locations,
            destination : destination
        })
    }

    getPolys = async () => {
        let polys = [];
        let startPins = []
        let endPin;
        for (let i = 0; i < this.state.members.length; i++) {
            try {
                let { data } = await axios.get(`http://mta-real-time.herokuapp.com/direction/${this.state.currentLocations[i]}/${this.state.destination}`)
                polys.push(
                    <Polyline key={i}
                        coordinates={data[0].polyLine}
                        strokeColor={this.state.color[i]} // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={1}
                        lineDashPattern={[5, 5]}
                        lineCap="round"
                    />)
                startPins.push(<MapView.Marker
                    key={i}
                    coordinate={data[0].steps[0].startLocation}
                    pinColor ={this.state.color[i]}
                    title={this.state.members[i]}
                >

                </MapView.Marker>

                )
                endPin = (<MapView.Marker
                coordinate = {data[0].steps[data[0].steps.length-1].endLocation}
                title = {this.state.destination}
                >
                </MapView.Marker>);
            } catch (err) {
                console.log(err)
            }
        }
        this.setState({
            polys: polys,
            startPins: startPins,
            endPin : endPin
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <Chat style={{ zIndex: 1, position: 'absolute' }}></Chat>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 40.7549,
                        longitude: -73.9840,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    showsUserLocation={false}
                    showsMyLocationButton={true}
                    showsCompass={false}
                    loadingEnabled={true}>
                    {this.state.polys}
                    {this.state.startPins}
                    {this.state.endPin}
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
        zIndex: -1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});