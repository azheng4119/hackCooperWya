import React from 'react'
import { StyleSheet,View, ScrollView,Text} from 'react-native';
import io from 'socket.io-client';

export default class Home extends React.Component {
    componentDidMount() { 
        const socket = io('199.98.16.5:3000');
        socket.on('connect', ()=>{
            console.log("you have been connected");
        })
      }
      
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text>Login</Text>
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