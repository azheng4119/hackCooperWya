import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from "react-redux";
import { loginThunk, getUserThunk } from '../store/utilities/currentuser';
import { Container, Content, Header, Icon, Card, CardItem, Right } from 'native-base';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Axios from 'axios';


class roomCard extends React.Component {
    _isMounted = false;

    constructor(props) {
        super()
        this.state = {
            groups: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.getGroups();
    }
    componentWillUnmount() {
        this._isMounted = false;
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

    render() {
        console.log(this.state.groups);
        let events = this.state.groups.map((element,i) => {
            return (<CardItem button onPress = {()=>Actions.map()}key = {i}>
                <Text>{element.eventname}</Text>
            </CardItem>)
        })
        return (
            <View style={{ width: '100%' }}>
                <Card>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <CardItem>
                            <Text>Create A Group</Text>
                        </CardItem>
                        <Right>
                            <TouchableOpacity>
                                <Icon name='ios-add-circle-outline' style={{ fontSize: 50 }} />
                            </TouchableOpacity>
                        </Right>
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