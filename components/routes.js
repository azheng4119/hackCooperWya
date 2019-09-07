import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { ScrollView } from 'react-native'
import Landing from '../pages/landing'
import Map from '../pages/map'
import Home from '../pages/home'

const Routes = (props) => (
   <Router cardStyle={{ backgroundColor: 'white' }}>
      <ScrollView>
         <Scene type="reset" key="landing" component={Landing} title="Login" initial={true} /> 
         <Scene key="map" component={Map} title="Map"  />
         <Scene key="home" component={Home} title ="Home"></Scene> 
      </ScrollView>
   </Router>
)
export default Routes