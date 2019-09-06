import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { ScrollView } from 'react-native'
import Landing from '../pages/landing'
import Map from '../pages/map'

const Routes = (props) => (
   <Router cardStyle={{ backgroundColor: 'white' }}>
      <ScrollView>
         <Scene type="reset" key="landing" component={Landing} title="Login" initial={true} /> 
         <Scene type="reset" key="" component={Map} title="Map"  /> 

      </ScrollView>
   </Router>
)
export default Routes