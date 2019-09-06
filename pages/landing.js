import React from 'react'
import Login from '../components/login'
import { StyleSheet, View, ScrollView, Text } from 'react-native';

export default class Home extends React.Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Login></Login>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
})