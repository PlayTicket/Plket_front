import React, {useState} from 'react';
import {TouchableOpacity, View, Text, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {COLORS} from '../../styles/Colors';

const NickName = ({navigation}) => {
  const [nickName, setNickName] = useState('');

  AsyncStorage.setItem('NickName', nickName, () => {
    console.log('유저 닉네임 저장 완료');
  });

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        padding: '10%',
        paddingBottom: '40%',
      }}>
      <Text style={{fontSize: 14, color: '#B6B6CC'}}>
        저장하고 싶은 감동의 순간
      </Text>
      <Text style={{fontSize: 20, marginBottom: '1%'}}>
        감상평을 기록해볼까요?
      </Text>
      <Text style={{fontSize: 18}}>닉네임 입력</Text>
      <TextInput
        style={{
          borderBottomColor: '#000',
          borderBottomWidth: 1,
          marginTop: '20%',
        }}
        value={nickName}
        onChange={event => {
          const {eventCount, target, text} = event.nativeEvent;
          setNickName(text);
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Taste')}
        style={{
          marginTop: '15%',
          backgroundColor: COLORS.navy,
          height: '12%',
          width: '100%',
          borderRadius: 15,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, color: 'white'}}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NickName;
