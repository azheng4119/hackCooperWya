import React from 'react'
import { TouchableOpacity, Text, Dimensions, StyleSheet, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import { FormLabel, FormInput, FormValidationMessage, Card, Icon } from 'react-native-elements'
import axios from 'axios';
import Chat from '../components/chat';

export default class maps extends React.Component {
    _isMounted = false;
    constructor(props) {
        super()
        this.state = {
            destination: "Hunter college",
            members: ["Napat", "Steven", "Andy"],
            currentLocations: ["Baruch College", "89 Murray St", "Coney Island", "City College", "NYU Tandon", "Flushing main street"],
            color: ['blue', 'green', 'orange'],
            polys: [],
            startPins: [],
            endPin: [],
            arrival: 0
        }
    }

    componentDidMount() {
        this._isMounted = true;
        //this.getGroup()
        this.getPolys();
        console.log(this.props.location);
    }
    shuffle = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    getGroup = async () => {
        let members = []
        let locations = []
        let destination = ""
        try {
            let { data } = await axios.get(`http://wya-api.herokuapp.com/group`)
            members = data[0]['friends'].split(',');
            locations = data[0]['place'].split(',');
            destination = data[0]['location'];
        } catch (err) {

        }
        if (this._isMounted) {
            this.setState({
                members: members,
                locations: locations,
                destination: destination
            })
        }
    }

    getPolys = async () => {
        let polys = [];
        let startPins = []
        let endPin;
        let time = 0;
        let locations = this.shuffle(this.state.currentLocations);
        console.log(locations)
        for (let i = 0; i < 3; i++) {
            try {
                let { data } = await axios.get(`http://mta-real-time.herokuapp.com/direction/${locations[i]}/${this.props.location}`)
               
                let numbers = data[0].tripDuration.split(' ');
                if (numbers.length <= 2 && time.length <= data[0].tripDuration.length) {
                    if (parseInt(time) < parseInt(data[0].tripDuration)) {
                        time = data[0].tripDuration;
                    }
                } else {
                    time = data[0].tripDuration;
                }
                console.log("ok");
                polys.push(
                    <Polyline key={i}
                        coordinates={data[0].polyLine}
                        strokeColor={this.state.color[i]} // fallback for when `strokeColors` is not supported by the map-provider
                        strokeWidth={1}
                        lineDashPattern={[5, 5]}
                        lineCap="round"
                    />)
                    console.log("2")
                startPins.push(<MapView.Marker
                    key={i}
                    coordinate={data[0].steps[0].startLocation}
                    pinColor={this.state.color[i]}
                    title={this.state.members[i]}
                >
                </MapView.Marker>

                )
                console.log("3")
                endPin = (<MapView.Marker
                    coordinate={data[0].steps[data[0].steps.length - 1].endLocation}
                    title={this.props.location}
                >
                </MapView.Marker>);
            } catch (err) {
                console.log(err);
            }
        }
        if (this._isMounted) {
            this.setState({
                polys: polys,
                startPins: startPins,
                endPin: endPin,
                arrival: time
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ zIndex: 1, marginTop : 100 }}>
                    <Card>
                        <Text> Estimated Meet-Up In: {this.state.arrival}</Text>
                    </Card>
                </View>
                <Chat style={{ zIndex: 1 }}></Chat>
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
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'space-between',
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