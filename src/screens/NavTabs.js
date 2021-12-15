import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './HomeScreen';
import MyTicket from './MyTicketScreen';
import AddTicket from './AddTicketScreen';
import Seat from './SeatScreen';
import MyPage from './MyPageScreen';
import Icon from 'react-native-vector-icons/Fontisto';

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
            <View style={styles.container}>
              <Icon
                size={27}
                color={focused ? '#2B266B' : '#9593B5'}
                name="home"
              />
              <Text
                style={{
                  fontSize: 13,
                  color: focused ? '#2B266B' : '#9593B5',
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                홈
              </Text>
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
            <View style={styles.container}>
              <Icon
                size={27}
                color={focused ? '#2B266B' : '#9593B5'}
                name="ticket"
              />
              <Text
                style={{
                  fontSize: 13,
                  color: focused ? '#2B266B' : '#9593B5',
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                나의 티켓
              </Text>
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
            <View style={styles.container}>
              <Icon
                size={27}
                color={focused ? '#2B266B' : '#9593B5'}
                name="plus-a"
              />
              <Text
                style={{
                  fontSize: 13,
                  color: focused ? '#2B266B' : '#9593B5',
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                타켓 추가
              </Text>
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
            <View style={styles.container}>
              <Icon
                size={27}
                color={focused ? '#2B266B' : '#9593B5'}
                name="persons"
              />
              <Text
                style={{
                  fontSize: 13,
                  color: focused ? '#2B266B' : '#9593B5',
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                좌석
              </Text>
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
            <View style={styles.container}>
              <Icon
                size={27}
                color={focused ? '#2B266B' : '#9593B5'}
                name="person"
              />
              <Text
                style={{
                  fontSize: 13,
                  color: focused ? '#2B266B' : '#9593B5',
                  fontWeight: focused ? 'bold' : 'normal',
                }}>
                마이페이지
              </Text>
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default NavTabs;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    width: 50,
    height: 50,
  },
});
