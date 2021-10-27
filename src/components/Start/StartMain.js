import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';

const StartMain = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'space-around',
      }}>
      <View
        style={{
          flex: 0.5,
          marginTop: '25%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/MainLogo.png')}
          style={{width: '45%', height: '66.5%'}}
        />
        <Text style={{fontSize: 15, marginTop: '5%'}}>나만의 공연 티켓북</Text>
        <Text style={{fontSize: 30, marginTop: '2%'}}>플켓</Text>
      </View>
      <View
        style={{
          flex: 0.5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Nickname')}>
          <Text>카카오톡으로 시작하기</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 12, marginTop: '2%', color: '#565656'}}>
          계속 진행하면 Play Ticket의 서비스 약관 및 개인정보 보호정책에
        </Text>
        <Text style={{fontSize: 12, color: '#565656'}}>
          동의한 것으로 간주합니다.
        </Text>
      </View>
    </View>
  );
};

export default StartMain;
