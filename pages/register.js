import React from 'react'
import axios from 'axios'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Button } from 'native-base';

export default class app extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            password: '',
            username: '',
        }
    }
    // handleChangefirstname = (event) => {
    //     this.setState({ firstname: event.target.value })
    // }
    // handleChangelastname = (event) => {
    //     this.setState({ lastname: event.target.value })
    // }
    // handleChangepassword = (event) => {
    //     this.setState({ password: event.target.value })
    // }
    // handleChangeusername = (event) => {
    //     this.setState({ username: event.target.value })
    // }
    signUp = async (user) => {
        try {
            console.log(user)
            let {res} = await axios.post(`https://wya-api.herokuapp.com/user/signup`, user)
            console.log(res);
            Actions.landing();
        }
        catch (authError) {
            console.log(authError, "AN ERROR OCCURED")
        }
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <FormLabel><Text>First Name</Text></FormLabel>
                    <FormInput onChangeText={(text) => this.setState({
                        firstname: text
                    })} />
                    <FormLabel><Text>Last Name</Text></FormLabel>
                    <FormInput onChangeText={(text) => this.setState({
                        lastname: text
                    })} />
                    <FormLabel><Text>Username</Text></FormLabel>
                    <FormInput onChangeText={(text) => this.setState({
                        username: text
                    })} />
                    <FormLabel><Text>Password</Text></FormLabel>
                    <FormInput onChangeText={(text) => this.setState({
                        password: text
                    })} />
                    <Button onPress={() => this.signUp(this.state)} style={{ padding: 10, color: 'blue' }}><Text style={{ color:'white'}}>Sign Up</Text></Button>
                    <Button onPress={() => Actions.landing()} style={{ marginTop: 10, padding: 10, backgroundColor: 'red' }}><Text style={{ color:'white'}}>Cancel</Text></Button>
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