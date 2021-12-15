import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  SafeAreaView,
  Alert,
  StyleSheet,
  Platform,
  Button,
} from 'react-native';
import {NaverLogin, getProfile} from '@react-native-seoul/naver-login';
import {preURL} from '../../constants/preURL';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const androidKeys = {
  // kConsumerKey: preURL.clientID,
  kConsumerKey: 'x1n75SXOXDzz77lJXkFM',
  // kConsumerSecret: preURL.secretID,
  kConsumerSecret: '85uLIT1qWt',
  kServiceAppName: '테스트앱(안드로이드)',
};

const initials = Platform.OS === 'ios' ? iosKeys : androidKeys;

const StartMain = ({navigation}) => {
  const [naverToken, setNaverToken] = React.useState(null);

  console.log('======================[StartMain]=====================');

  const naverLogin = props => {
    NaverLogin.login(props, (err, token) => {
      console.log(`Token is fetched  :: ${token} \n\n`);
      setNaverToken(token);
      if (err) {
        return err;
      }
      console.log('pass token');
      return token;
    });
  };

  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    setNaverToken(token);
  }, []);

  const naverLogout = () => {
    NaverLogin.logout();
    setNaverToken('');
  };

  useEffect(() => {
    AsyncStorage.getItem('naverToekn');
  }, []);

  useEffect(() => {
    console.log('naverToken', naverToken);
    if (naverToken !== null && AsyncStorage.getItem('isLogin') !== 'true') {
      getUserProfile();
    }
  }, [naverToken]);

  const Login = async props => {
    await naverLogin(props);
  };

  const setLogin = async userId => {
    console.log('setLogin');
    console.log('naverToken: ', naverToken);
    console.log('userId: ', userId);
    AsyncStorage.removeItem('userId');
    await AsyncStorage.setItem('isLogin', 'true');
    await AsyncStorage.setItem('token', JSON.stringify(naverToken));
    await AsyncStorage.setItem('userId', JSON.stringify(userId));
  };

  const hanldeContinue = async () => {
    const isLogin = await AsyncStorage.getItem('isLogin');

    if (isLogin === 'true') {
      Alert.alert('어서오세요', [
        {
          text: '확인',
          onPress: () => null,
        },
      ]);
      navigation.navigate('NavTab');
    } else {
      Alert.alert('사용자 정보가 없습니다.', [
        {
          text: '확인',
          onPress: () => null,
        },
      ]);
    }
  };

  const getUserProfile = async () => {
    const profileResult = await getProfile(naverToken.accessToken);
    console.log('porfile: ', profileResult);
    if (profileResult.resultcode === '024') {
      return;
    }
    console.log('로그인 성공');
    console.log('naverToken: ', naverToken);
    const accessToken = naverToken.accessToken;
    console.log('accessToken: ', accessToken);
    Alert.alert('플켓', '환영합니다', [
      {
        text: '확인',
        onPress: () => navigation.navigate('NickName', {accessToken}),
      },
    ]);
  };

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
        <TouchableOpacity onPress={() => naverLogin(initials)}>
          <Text>네이버 아이디로 로그인하기</Text>
        </TouchableOpacity>
        {!!naverToken && <Button title="로그아웃하기" onPress={naverLogout} />}
        {!!naverToken && (
          <Button title="회원정보 가져오기" onPress={getUserProfile} />
        )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
