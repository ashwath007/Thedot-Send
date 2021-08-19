import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Settings from '../support/Settings';
import Home from '../Home';


const HomeNavigation = () => {
    return(
        <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    )
}

export default HomeNavigation;