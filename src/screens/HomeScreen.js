import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeMain from '../components/Home/HomeMain';

const HomeStack = createStackNavigator();

const Home = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeMain"
        component={HomeMain}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

export default Home;
