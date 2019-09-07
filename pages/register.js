import React from 'react'
import axios from 'axios'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'


export default class app extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            firstlast: '',
            password: '',
            username: '',
        }
    }
    handleChangefirstname = (event) => {
        this.setState({ firstname: event.target.value })
    }
    handleChangelastname = (event) => {
        this.setState({ lastname: event.target.value })
    }
    handleChangepassword = (event) => {
        this.setState({ password: event.target.value })
    }
    handleChangeusername = (event) => {
        this.setState({ username: event.target.value })
    }
    signUp = async () => {
        try {
            console.log(this.state)
            await axios.post(`https://wya-api.herokuapp.com/user/signup`, {
                "firstname": this.state.firstname,
                "lastname": this.state.lastname,
                "username": this.state.username,
                "password": this.state.password
            })
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
                    <FormValidationMessage>Error message</FormValidationMessage>
                    <FormLabel><Text>Last Name</Text></FormLabel>
                    <FormInput onChangeText={(text) => this.setState({
                        firstlast: text
                    })} />
                    <FormValidationMessage>Error message</FormValidationMessage>
                    <FormLabel><Text>Username</Text></FormLabel>
                    <FormInput onChangeText={(text) => this.setState({
                        username: text
                    })} />
                    <FormValidationMessage>Error message</FormValidationMessage>
                    <FormLabel><Text>Password</Text></FormLabel>
                    <FormInput onChangeText={(text) => this.setState({
                        password: text
                    })} />
                    <FormValidationMessage>Error message</FormValidationMessage>
                    <TouchableOpacity onPress={(() => Actions.landing())}><Text>Sign Up</Text></TouchableOpacity>
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