import React from 'react'
import Login from '../components/login'
import io from 'socket.io-client'
import { YellowBox } from 'react-native';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Card, Icon } from 'react-native-elements'
import { CardItem } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from "react-redux";
import { getUserThunk } from '../store/utilities/currentuser';


class chat extends React.Component {
    _isMounted = false;
    constructor(props) {
        super();
        this.state = {
            chats: [],
            message: "",
            hide: true

        }
    }

    componentDidMount() {
        this._isMounted = true;
        console.ignoredYellowBox = ['Remote debugger'];
        YellowBox.ignoreWarnings([
            'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
        ]);
        this.socket = io('http://wya-api.herokuapp.com/');
        this.socket.on("chat message", msg => {
            if (this._isMounted) {
                this.setState({
                    chats: [...this.state.chats, msg]
                })
            }
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    sendMessage = (msg) => {
        if (msg === "") return;
        let mess = this.props.user.user.firstname + ": " + msg
        this.socket.emit("chat message", mess);
        if (this._isMounted) {
            this.setState({
             chats: [...this.state.chats, mess],
                message: ""
            })
        }
    }
    render() {
        let messages = this.state.chats.map((message, i) => {
            return (
                <View key={i}>
                    <Text>{message}</Text>
                </View>
            )
        })
        return (
            <KeyboardAvoidingView behavior="padding" enabled style={{ width: '100%' }}>
                <View style={{ display: 'flex', flexDirection: 'column', width: '100%', paddingBottom: 20 }}>
                    {this.state.hide ? <View /> : <View style={{ width: '100%', height: 200 }}><ScrollView style={{ padding: 20, alignSelf: 'center', width: '70%', backgroundColor: 'white', borderRadius: 15 }}>{messages}</ScrollView></View>}
                    <Card>
                        <CardItem>
                            <TouchableOpacity onPress={() => this.setState({ hide: !this.state.hide })}>
                                <Icon name="chat"></Icon>
                            </TouchableOpacity>
                            {this.state.hide ? <View></View> :
                                <View style = {{display :'flex',flexDirection :'row'}}>
                                    <FormInput
                                        onChangeText={(text) => this.setState({ message: text })}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onSubmitEditing={() => this.sendMessage(this.state.message)}
                                        inputStyle={{ width: 200 }}
                                        value={this.state.message}></FormInput>
                                    <TouchableOpacity title="SUBMIT" onPress={() => this.sendMessage(this.state.message)}><Text style={{ color: 'blue' }}>Send</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </CardItem>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        )

    }
}

const mapState = (state) => {
    return {
        user: state.user
    }
}

const mapDispatch = (dispatch) => {
    return {
        getUser: () => dispatch(getUserThunk())
    }
}

export default connect(mapState, mapDispatch)(chat);