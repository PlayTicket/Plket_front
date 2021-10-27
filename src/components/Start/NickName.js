import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const NickName = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Taste')}>
        <Text>카카오톡으로 시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NickName;
