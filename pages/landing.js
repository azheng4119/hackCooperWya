import React from 'react'
import Login from '../components/login'
import io from 'socket.io-client'
import { YellowBox } from 'react-native';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Chat from '../components/chat';

export default class Home extends React.Component {


    render() {

        return (
            <View style={styles.container}>
                <Login></Login>
                <Chat></Chat>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 100
    },
})