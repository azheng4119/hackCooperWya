import React from 'react'
import { Text, View,TouchableOpacity, StyleSheet} from 'react-native'
import { Actions } from 'react-native-router-flux'


export default class Home extends React.Component {
    render() {
        return <View style = {styles.container}>
            <TouchableOpacity onPress={()=>Actions.map()}><Text>This is home</Text></TouchableOpacity>
        </View>

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection : 'column'
    },
});