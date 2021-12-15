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
  const [id, setID] = React.useState(-1);

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
    setLogin();
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
    AsyncStorage.getItem('naverToken');
    AsyncStorage.getItem('userID', (err, result) => {
      console.log('userID: ', result);
      setID(result);
    });
  }, []);

  useEffect(() => {
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
      navigation.navigate('NavTabs');
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
    console.log('회원가입 성공');
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
    <SafeAreaView
      style={{
        flex: 1,
        display: 'flex',
      }}>
      <View
        style={{
          width: '100%',
          height: '40%',
          marginTop: '25%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20%',
        }}>
        <Image
          source={require('../../assets/MainLogo.png')}
          style={{height: '80%', aspectRatio: 1}}
        />
        <Text style={{fontSize: 15, marginTop: '5%'}}>나만의 공연 티켓북</Text>
        <Text style={{fontSize: 30, marginTop: '2%'}}>플켓</Text>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {!naverToken && (
          <TouchableOpacity onPress={() => Login(initials)}>
            <Text>네이버 아이디로 로그인하기</Text>
          </TouchableOpacity>
        )}
        {!!naverToken && (
          <TouchableOpacity onPress={naverLogout} style={styles.btn1}>
            <Text style={{fontSize: 15}}>로그아웃하기</Text>
          </TouchableOpacity>
        )}
        {!!naverToken && (
          <TouchableOpacity
            onPress={() => hanldeContinue()}
            style={styles.btn2}>
            <Text style={{color: 'white', fontSize: 15}}>이어하기</Text>
          </TouchableOpacity>
        )}
        <Text style={{fontSize: 12, marginTop: '2%', color: '#565656'}}>
          계속 진행하면 Play Ticket의 서비스 약관 및 개인정보 보호정책에
        </Text>
        <Text style={{fontSize: 12, color: '#565656'}}>
          동의한 것으로 간주합니다.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default StartMain;

const styles = StyleSheet.create({
  btn1: {
    width: '80%',
    height: 50,
    borderRadius: 20,
    padding: 5,
    margin: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#1E1B4B',
    borderWidth: 1,
  },
  btn2: {
    width: '80%',
    height: 50,
    backgroundColor: '#1E1B4B',
    borderRadius: 20,
    padding: 5,
    margin: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
