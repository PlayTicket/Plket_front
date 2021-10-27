import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './HomeScreen';
import MyTicket from './MyTicketScreen';
import AddTicket from './AddTicketScreen';
import Seat from './SeatScreen';
import MyPage from './MyPageScreen';

const Tab = createBottomTabNavigator();

const NavTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: '8%',
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFEFD',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Text>홈</Text>
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="MyTicketScreen"
        component={MyTicket}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Text>나의 티켓</Text>
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="AddTicketScreen"
        component={AddTicket}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Text>티켓 추가</Text>
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="SeatScreen"
        component={Seat}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Text>좌석</Text>
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="MyPageScreen"
        component={MyPage}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Text>마이 페이지</Text>
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default NavTabs;
