import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const Taste = ({navigation}) => {
  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Nickname')}>
          <Text>뒤로가기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('NavTabs')}>
          <Text>건너뛰기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Taste;
