import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPageMain from '../components/MyPage/MyPageMain';

const MyPageStack = createStackNavigator();

const MyPage = () => {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen
        name="MyPageMain"
        component={MyPageMain}
        options={{headerShown: false}}
      />
    </MyPageStack.Navigator>
  );
};

export default MyPage;
