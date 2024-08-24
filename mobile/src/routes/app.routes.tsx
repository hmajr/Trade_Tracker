import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from '../screens/Home';
import { New } from '../screens/New';
import { Trade } from '../screens/Trade';
import { EditTrade } from '../screens/EditTrade';

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
      <Screen 
        name="editTrade"
        component={EditTrade}
      />
      
    </Navigator>
  )
}