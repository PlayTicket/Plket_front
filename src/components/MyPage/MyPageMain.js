import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const MyPageMain = ({navigation}) => {
  return (
    <View>
      <Text style={{fontSize: 24}}>마이페이지</Text>
      <View
        style={{width: '100%', height: '40%', backgroundColor: 'gray'}}></View>
      <View>
        <Text style={{fontSize: 18, marginTop: '5%'}}>나의 취향 분석</Text>
      </View>
    </View>
  );
};

export default MyPageMain;
