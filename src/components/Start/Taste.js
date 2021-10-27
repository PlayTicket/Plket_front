import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const Taste = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('NavTabs')}>
        <Text>취향분석</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Taste;
