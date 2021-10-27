import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SeatMain from '../components/Seat/SeatMain';

const SeatStack = createStackNavigator();

const Seat = () => {
  return (
    <SeatStack.Navigator>
      <SeatStack.Screen
        name="SeatMain"
        component={SeatMain}
        options={{headerShown: false}}
      />
    </SeatStack.Navigator>
  );
};

export default Seat;
