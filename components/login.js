import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from "react-redux";
import { loginThunk, getUserThunk } from '../store/utilities/currentuser';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            username: '',
        }
    }
    async componentDidMount(){
    
    }
    submit = async () => {
        try {
            const user = {
                "username": this.state.username,
                "password": this.state.password
            }
            await this.props.login(user);
            if(this.props.user.token){
                Actions.home();
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Wya</Text>
                <FormLabel><Text>Username</Text></FormLabel>
                <FormInput autoCapitalize="none" onChangeText={(text) => this.setState({
                    username: text
                })} inputStyle={{ width: 200 }} />

                <FormLabel><Text>Password</Text></FormLabel>
                <FormInput 
                onSubmitEditing={() => this.submit()}
                autoCapitalize="none" 
                onChangeText={(text) => this.setState({
                    password: text
                })} inputStyle={{ width: 200 }} />
                {this.props.user.error ? (<View><Text>{this.props.user.error}</Text></View>) : (<View></View>) }
                <View style={{ margin: 10, alignItems: 'center', textAlign: 'center' }}>
                    <Button style={{ width: '50%' }}
                        onPress={() => this.submit()}
                    ><Text style={{ padding: 10, color: 'white' }}>Login</Text></Button>
                </View>
                <View style={{ margin: 10, alignItems: 'center', textAlign: 'center' }}>
                    <Text style={{ padding: 10, color: 'black', fontSize:10 }}>Don't have an account? <Text onPress={() => Actions.register()} style={{ padding: 10, color: 'blue' }}>Register!</Text></Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const mapState = (state) => { 
    return {
        user: state.user
    }
}

const mapDispatch = (dispatch) => {
    return {
        getUser: () => dispatch(getUserThunk()),
        login: (user) => dispatch(loginThunk(user))
    }
}

export default connect(mapState, mapDispatch)(Login);