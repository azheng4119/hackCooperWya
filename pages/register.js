import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native';

export default class app extends React.Component {
    render() {
        return (
            <ScrollView>
            <View style={styles.container}>
                    <FormLabel><Text>First Name</Text></FormLabel>
                    <FormInput />
                    <FormValidationMessage>Error message</FormValidationMessage>
                    <FormLabel><Text>Last Name</Text></FormLabel>
                    <FormInput />
                    <FormValidationMessage>Error message</FormValidationMessage>
                    <FormLabel><Text>Username</Text></FormLabel>
                    <FormInput />
                    <FormValidationMessage>Error message</FormValidationMessage>
                    <FormLabel><Text>Password</Text></FormLabel>
                    <FormInput/>
                    <FormValidationMessage>Error message</FormValidationMessage>
                    <TouchableOpacity onPress = {()=>Actions.home()}><Text>Submit</Text></TouchableOpacity>
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