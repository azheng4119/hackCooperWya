import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from "react-redux";
import { loginThunk, getUserThunk } from '../store/utilities/currentuser';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';


class roomCard extends React.Component {
    render() {
        return <View>
            <Text>Add A New Group </Text><Button><Text>+</Text></Button>
            <Text>All Current Groups</Text>
            <TouchableOpacity onPress={() => Actions.map()}><Text>{this.props.code}</Text></TouchableOpacity>
            {this.props.user.groups ?
                        this.props.user.groups.map((eachRoom) => (
                         <View style={styles.container}>
                             <Button><Text>View</Text></Button><Text>{eachRoom.eventname}</Text><Button><Text>Leave</Text></Button>
                         </View>
                        )
                        )
                        :
                        <View><Text>No Groups Current</Text></View>
                      }
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
});
const mapState = (state) => {
    return {
        user: state.user
    }
}
const mapDispatch = (dispatch) => {
    return {
    }
}
export default connect(mapState, mapDispatch)(roomCard);