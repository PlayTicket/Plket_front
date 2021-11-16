import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import Start from './src/screens/StartScreen';
import NavTabs from './src/screens/NavTabs';
import Home from './src/screens/HomeScreen';
import AddTicket from './src/screens/AddTicketScreen';
import Seat from './src/screens/SeatScreen';
import MyPage from './src/screens/MyPageScreen';

const MainStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={'Home'}
        headerMode="none"
        screenOptions={{
          headerShown: false,
        }}>
        {/* <MainStack.Screen
          name="StartScreen"
          component={Start}
          options={{headerShown: false}}
        /> */}
        <MainStack.Screen
          name="NavTabs"
          component={NavTabs}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="HomeScreen"
          component={Home}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="AddTicketScreen"
          component={AddTicket}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="SeatScreen"
          component={Seat}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="MyPage"
          component={MyPage}
          options={{headerShown: false}}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
