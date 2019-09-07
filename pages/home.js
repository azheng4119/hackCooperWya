import React from 'react'
import { Text, View,TouchableOpacity, StyleSheet} from 'react-native'
import { Actions } from 'react-native-router-flux'
import RoomCard from '../components/roomCard';
import { connect } from "react-redux";
import {getUserThunk} from '../store/utilities/currentuser';

class Home extends React.Component {
    async componentDidMount(){
        try{
            await this.props.getUser();
            console.log(this.props.user)
        }catch(err){
            console.log(err)
        }
    }
    render() {
        return <View style = {styles.container}>
            <RoomCard code = "123"></RoomCard>
        </View>

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
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