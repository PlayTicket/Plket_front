import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StartMain from '../components/Start/StartMain';
import NickName from '../components/Start/NickName';
import Taste from '../components/Start/Taste';
import NavTabs from './NavTabs';

const StartStack = createStackNavigator();

const Start = () => {
  return (
    <StartStack.Navigator initialRouteName={'StartMain'}>
      <StartStack.Screen
        name="StartMain"
        component={StartMain}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="NickName"
        component={NickName}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="Taste"
        component={Taste}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="NavTabs"
        component={NavTabs}
        options={{headerShown: false}}
      />
    </StartStack.Navigator>
  );
};

export default Start;
