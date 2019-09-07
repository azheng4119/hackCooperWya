import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from "react-redux";
import { loginThunk, getUserThunk } from '../store/utilities/currentuser';
import { Container, Content, Header, Icon } from 'native-base';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';


class roomCard extends React.Component {
    render() {
        return (
            <Container style={{width: 100}}>
            <Header />
            <Content>
                <View style={{width: 300}}>
                    <Text>Create A Group</Text>
              <TouchableOpacity>
              <Icon name='ios-add-circle-outline' style={{fontSize: 50}}/>
              </TouchableOpacity>
              </View>
              {/* <Icon type="FontAwesome" name="home" /> */}
            </Content>
          </Container>
        )
        // return <View style={{  flexDirection: "row"}}>
        //     <Text style={{ fontWeight: "bold"}}>Add A New Group </Text><View style={{ margin: 10, alignItems: 'center', textAlign: 'center' }}><Button style={{ color: "white", fontWeight: "bold", height: 15, width: 15, padding: 5}}><Text style={{ color: 'white'}}>+</Text></Button></View>
        //     <View style={{  flexDirection: "column"}}>
        //     <Text>All Current Groups</Text>
        //     {this.props.user.groups ?
        //                 this.props.user.groups.map((eachRoom) => (
        //                  <View style={styles.container}>
        //                      <Button><Text>View</Text></Button><Text>{eachRoom.eventname}</Text><Button><Text>Leave</Text></Button>
        //                  </View>
        //                 )
        //                 )
        //                 :
        //                 <View><Text>No Groups Current</Text></View>
        //               }
        //               </View>
        // </View>
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