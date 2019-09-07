import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Card, CardItem, Thumbnail, Left, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import RoomCard from '../components/roomCard';
import { connect } from "react-redux";
import { getUserThunk } from '../store/utilities/currentuser';

class Home extends React.Component {
    _isMounted = false;
    constructor(props) {
		super(props)
		this.state = {
            user: {}
		}
	}
    async componentDidMount() {
        this._isMounted = true;
        try {
            await this.props.getUser();
            if(this._isMounted){
                this.setState({
                    user:this.props.user
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    componentWillUnmount() {
		this._isMounted = false;
	}
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                <View style={styles.avatarCard}>
                    <Image style={styles.avatar} source={require('../assets/pikachu.png')} />
                    <Text>{this._isMounted? this.state.user.user.firstname + " " + this.state.user.user.lastname: ""} </Text>
                </View>
                </View>
                <View>
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
        alignItems: 'center',
        backgroundColor: '#F2F0F0'
    },
    topBar: {
        marginTop: '5%',
        width: '100%',
        backgroundColor: 'white',
        
    },
    avatarCard: {
        marginTop: 5,
        width : '60%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    avatar: {
        marginLeft: 20,
        width: 70,
        height: 70,
        overflow: "hidden",
        borderRadius: 35,
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