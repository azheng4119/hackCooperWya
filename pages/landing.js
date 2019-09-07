import React from 'react'
import Login from '../components/login'
import { StyleSheet, View, ScrollView, Text } from 'react-native';

export default class Home extends React.Component {
    render() {
        return (
            <View style = {styles.container}>
                <Login></Login>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop : 100
    },
})