import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';


export default class Login extends React.Component {
    constructor(props) {
        super(props)
    }
    handleChange = e => {

    }
    render() {
        return (
            <View style = {styles.container}>
                <Text>Wya</Text>
                <FormLabel><Text>Username</Text></FormLabel>
                <FormInput inputStyle={{width : 200}}/>

                <FormLabel><Text>Password</Text></FormLabel>
                <FormInput inputStyle={{width : 200}} />

                <View style={{margin : 10, alignItems : 'center',textAlign : 'center'}}>
                    <Button style = {{width : '50%'}}
                        onPress={() => Actions.home()}
                    ><Text style = {{padding : 10, color:'white'}}>Login</Text></Button>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display : 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
