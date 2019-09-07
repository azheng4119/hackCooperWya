import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { ScrollView } from 'react-native'
import Landing from '../pages/landing'
import Map from '../pages/map'
import Home from '../pages/home'
// import Registers from '../pages/register'


const Routes = (props) => (
   <Router cardStyle={{ backgroundColor: 'white' }}>
      <ScrollView>
         <Scene type="reset" key="landing" component={Landing} title="Login" initial={true} /> 
         <Scene type="reset" key="map" component={Map} title="Map"  />
         <Scene type="reset" key="home" component={Home} title ="Home"></Scene> 
         {/* <Scene type="reset" key="register" component={Registers} title="Sign Up"></Scene> */}
      </ScrollView>
   </Router>
)
export default Routes