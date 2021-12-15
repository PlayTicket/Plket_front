import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text, TextInput} from 'react-native';
import {preURL} from '../../constants/preURL';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {COLORS} from '../../styles/Colors';

const NickName = ({navigation, route}) => {
  const params = route.params;
  const token = params.accessToken;
  const [nickName, setNickName] = useState('');

  useEffect(() => {
    console.log(
      '===========================[NickName]============================',
    );
  });

  const postNickname = () => {
    AsyncStorage.setItem('NickName', nickName, () => {
      console.log('유저 닉네임 저장 완료');
    });
    console.log('token: ', token);

    const data = {
      token: token,
      user_nickname: nickName,
    };
    axios
      .post(preURL.preURL + '/v1/user/save', data)
      .then(res => {
        console.log('닉네임 보냈다! ', res.data.userID);
        AsyncStorage.setItem('userID', `${res.data.userID}`, () => {
          console.log('userID 저장 완료');
        });
      })
      .catch(err => {
        console.log('닉네임 전송에 실패: ', err);
      });
    navigation.navigate('Taste');
  };

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
          console.log('닉네임: ', nickName);
        }}
      />
      <TouchableOpacity
        onPress={() => postNickname()}
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
