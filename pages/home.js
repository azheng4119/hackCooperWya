import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Card, CardItem, Thumbnail, Left, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import RoomCard from '../components/roomCard';
import { connect } from "react-redux";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { getUserThunk } from '../store/utilities/currentuser';
import { Button } from 'react-native-elements';
import Modal from "react-native-modal";


class Home extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            newGroup: false,
            meetUpLocation: ""
        }
    }
    async componentDidMount() {
        this._isMounted = true;
        try {
            await this.props.getUser();
            if (this._isMounted) {
                this.setState({
                    user: this.props.user
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.setState({
            newGroup: false
        })
    }

    addGroup = () => {
        this.setState({
            newGroup: !this.state.newGroup
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.avatarCard}>
                    <Image style={styles.avatar} source={require('../assets/pikachu.png')} />
                    <Text>{this._isMounted ? this.state.user.user.firstname + " " + this.state.user.user.lastname : ""} </Text>
                </View>
                <View>
                    <Button style={{ width: '50%' }} onPress={() => this.addGroup()}>
                        <Text>Add Group</Text>
                    </Button>
                    <View style={{ flex: 1 }}>
                        <Modal isVisible={this.state.newGroup}
                            backdropColor="white"
                            backdropOpacity={1}
                        >
                            <View style={{ flex: 1 }}>
                                <Text>New Group</Text>
                                <FormLabel><Text>Meet Up Location</Text></FormLabel>
                                <FormInput onChangeText={(text) => this.setState({
                                    meetUpLocation: text
                                })} inputStyle={{ width: 200 }} />
                            </View>
                            <Button title="Cancel" onPress={() => this.addGroup()} />
                        </Modal>
                    </View>
                    <RoomCard code="123"></RoomCard>
                </View>
            </View>
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
    avatarCard: {
        marginTop: 5,
        width: '60%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    avatar: {
        width: 70,
        height: 70,
        overflow: "hidden",
        borderRadius: 35,
    },
    form: {
        flex: 1,
        zIndex: 1
    }
});

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

export default connect(mapState, mapDispatch)(Home);