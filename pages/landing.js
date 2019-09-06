import React from 'react'
import { StyleSheet,View, ScrollView,Text} from 'react-native';

export default class Home extends React.Component {
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