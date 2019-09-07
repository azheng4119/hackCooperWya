import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'



export default class roomCard extends React.Component {
    render() {
        return <View>
            <TouchableOpacity onPress={() => Actions.map()}><Text>{this.props.code}</Text></TouchableOpacity>
        </View>
    }
}