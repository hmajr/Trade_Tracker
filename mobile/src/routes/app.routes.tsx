import { createNativeStackNavigator } from '@react-navigation/native-stack'
const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from '../screens/Home';
import { New } from '../screens/New';
import { Trade } from '../screens/Trade';


export function AppRoutes() {
  return (
    <Navigator screenOptions={{headerShown : false}}>
      <Screen 
        name="home"
        component={Home}
      />
      <Screen 
        name="new"
        component={New}
      />
      <Screen 
        name="trade"
        component={Trade}
      />
      
    </Navigator>
  )
}