import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StartMain from '../components/Start/StartMain';
import NickName from '../components/Start/NickName';
import Taste from '../components/Start/Taste';

const StartStack = createStackNavigator();

const Start = () => {
  return (
    <StartStack.Navigator>
      <StartStack.Screen
        name="StartMain"
        component={StartMain}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="Nickname"
        component={NickName}
        options={{headerShown: false}}
      />
      <StartStack.Screen
        name="Taste"
        component={Taste}
        options={{headerShown: false}}
      />
    </StartStack.Navigator>
  );
};

export default Start;
