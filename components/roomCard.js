import React from 'react';
import { StyleSheet, RefreshControl,Text, View, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from "react-redux";
import { loginThunk, getUserThunk } from '../store/utilities/currentuser';
import { Container, Content, Header, Icon, Card, CardItem, Right } from 'native-base';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Axios from 'axios';
import Modal from 'react-native-modal'


class roomCard extends React.Component {
    _isMounted = false;

    constructor(props) {
        super()
        this.state = {
            groups: [],
            user: {},
            newGroup: false,
            location: "",
            eventname: "",
            place: "",
            friends: "",
            members: ["Napat", "Steven", "Andy"],
            currentLocations: ["Baruch College", "89 Murray St", "NYU tandon"],
            refreshing:false
        }
    }
    async componentDidMount() {
        this._isMounted = true;
        this.getGroups();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }



    addGroup = () => {
        this.setState({
            newGroup: !this.state.newGroup
        })
    }
    getGroups = async () => {
        try {
            let { data } = await Axios.get(`http://wya-api.herokuapp.com/group`)
            if (this._isMounted) {
                this.setState({
                    groups: data
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    addNewGroup = async () => {
        try {
            let { data } = await Axios.post(`http://wya-api.herokuapp.com/group`, { 'eventname': this.state.eventname, 'location': this.state.location })
            this.setState({
                newGroup: !this.state.newGroup
            })
            this.getGroups();
        } catch (err) {
            console.log(err)
        }
    }
    delete = async (id) => {
        try {
            await Axios.delete(`http://wya-api.herokuapp.com/group/${id}`)
            this.getGroups();
        }
        catch(err){
            console.log(err)
        }
    }
    render() {
        console.log(this.state.groups);
        let events = this.state.groups.map((element, i) => {
            return (
                <CardItem button onPress={() => Actions.map({ "location": `${element.location}` })} key={i}>
                    <Text>{element.eventname}</Text>
                    <Right>
                        <TouchableOpacity onPress={() => this.delete(element.id)} style={{ textAlign: "right" }}><Text>Delete</Text></TouchableOpacity>
                    </Right>
                </CardItem>
            )
        })
        return (
            <View 
                style={{ width: '100%' }}>
                <Card>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <CardItem>
                            <Text>Create A Group</Text>
                        </CardItem>
                        <Right>
                            <TouchableOpacity>
                                <Icon name='ios-add-circle-outline' onPress={() => this.addGroup()} style={{ fontSize: 50 }} />
                            </TouchableOpacity>
                        </Right>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Modal isVisible={this.state.newGroup}
                            backdropColor="white"
                            backdropOpacity={1}
                        >
                            <View style={{ flex: 1 }}>
                                <Text>New Group</Text>
                                <FormLabel><Text>Event Name</Text></FormLabel>
                                <FormInput onChangeText={(text) => this.setState({
                                    eventname: text
                                })} inputStyle={{ width: 200 }} />
                                <FormLabel><Text>Meet Up Location</Text></FormLabel>
                                <FormInput onChangeText={(text) => this.setState({
                                    location: text
                                })} inputStyle={{ width: 200 }} />

                            </View>
                            <View style={styles.button}>
                                <Button title="Submit" onPress={() => this.addNewGroup()}><Text>Submit</Text></Button>
                                <Button title="Cancel" onPress={() => this.addGroup()} ><Text>Cancel</Text></Button>
                            </View>
                        </Modal>
                    </View>
                </Card>
                <Card>
                    {events}
                </Card>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        flexDirection: "row"
    }
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