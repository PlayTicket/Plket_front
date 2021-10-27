import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyTicketMain from '../components/MyTicket/MyTicketMain';

const MyTicketStack = createStackNavigator();

const MyTicket = () => {
  return (
    <MyTicketStack.Navigator>
      <MyTicketStack.Screen
        name="MyTicketMain"
        component={MyTicketMain}
        options={{headerShown: false}}
      />
    </MyTicketStack.Navigator>
  );
};

export default MyTicket;
