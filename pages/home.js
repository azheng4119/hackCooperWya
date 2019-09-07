import React from 'react'
import { Text, View,TouchableOpacity, StyleSheet} from 'react-native'
import { Actions } from 'react-native-router-flux'
import RoomCard from '../components/roomCard';
import axios from 'axios';


export default class Home extends React.Component {
    componentDidMount = async () =>{
        
    }
    render() {
        return <View style = {styles.container}>
            <RoomCard code = "123"></RoomCard>
        </View>

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
});