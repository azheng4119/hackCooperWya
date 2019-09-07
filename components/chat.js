import React from 'react'
import Login from '../components/login'
import io from 'socket.io-client'
import { YellowBox } from 'react-native';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Card, Icon } from 'react-native-elements'
import { CardItem } from 'native-base';


export default class chat extends React.Component {
    constructor(props) {
        super();
        this.state = {
            chats: []
        }
    }

    componentDidMount() {
        console.ignoredYellowBox = ['Remote debugger'];
        YellowBox.ignoreWarnings([
            'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
        ]);
        this.socket = io('http://wya-api.herokuapp.com/');
        this.socket.on("chat message", msg => {
            this.setState({
                chats: [...this.state.chats, msg]
            })
        })
    }

    sendMessage = (msg) => {
        this.socket.emit("chat message", msg);
        this.setState({
            chats: [...this.state.chats, msg]
        })
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
            <View style={{ display: 'flex', flexDirection: 'column', width :'100%', paddingBottom : 20 }}>
                <ScrollView style={{ padding : 10,alignSelf: 'center', maxHeight: 200, width: '70%',backgroundColor: 'white', borderRadius: 15 }}>{messages}</ScrollView>
                <Card>
                    <CardItem>
                            <Icon name= "chat"></Icon>
                            <FormInput inputStyle={{ width: 200 }}></FormInput>
                            <TouchableOpacity onPress={() => this.sendMessage('yoooo')}><Text style = {{color:'blue'}}>Send</Text></TouchableOpacity>
                    </CardItem>
                </Card>
            </View>
        )

    }
}