import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeMain from '../components/Home/HomeMain';
import Detail from '../components/Home/Detail';
import More from '../components/Home/More';

const HomeStack = createStackNavigator();

const Home = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeMain"
        component={HomeMain}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="More"
        component={More}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

export default Home;
