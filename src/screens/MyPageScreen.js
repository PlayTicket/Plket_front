import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPageMain from '../components/MyPage/MyPageMain';
import MyPageMain2 from '../components/MyPage/MyPageMain2';

const MyPageStack = createStackNavigator();

const MyPage = () => {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen
        name="MyPageMain"
        component={MyPageMain}
        options={{headerShown: false}}
      />
      <MyPageStack.Screen
        name="MyPageMain2"
        component={MyPageMain2}
        options={{headerShown: false}}
      />
    </MyPageStack.Navigator>
  );
};

export default MyPage;
