import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';


export default class Register extends React.Component {
    constructor(props) {
        super(props)
    }
    handleChange = e => {

    }
    render() {
        return (
            <View style={styles.container}>
                <FormLabel><Text>First Name</Text></FormLabel>
                <FormInput />
                <FormLabel><Text>Last Name</Text></FormLabel>
                <FormInput />
                <FormLabel><Text>Username</Text></FormLabel>
                <FormInput />
                <FormLabel><Text>Password</Text></FormLabel>
                <FormInput/>
                <TouchableOpacity onPress = {() =>Actions.home()}><Text>Submit</Text></TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignItems : 'center',
        flexDirection : 'column'
    },
});
