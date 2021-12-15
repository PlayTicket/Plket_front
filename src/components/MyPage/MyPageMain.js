import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import {preURL} from '../../constants/preURL';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPageMain = ({navigation}) => {
  const [nickName, setNickName] = useState({});
  const [email, setEmail] = useState({});

  const [id, setID] = useState(0);

  const getID = async () => {
    try {
      const value = await AsyncStorage.getItem('userID');
      if (value !== null) {
        console.log('ID: ', value);
        setID(value);
      }
    } catch (error) {
      console.log('ID 못 가져옴❗️ ', error);
    }
  };

  useEffect(() => {
    console.log('==================[MyPageMain]=====================');
    getID();

    axios
      .get(preURL.preURL + `/v1/user/1`) // 유저 아이디
      .then(res => {
        console.log('res.data: ', res.data);
        setNickName(res.data.nickname);
        setEmail(res.data.email);
      })
      .catch(err => {
        console.log('에러 발생❗️ ', err);
      });
  }, []);

  return (
    <SafeAreaView style={{height: '100%'}}>
      <Text style={{fontSize: 24, padding: 20, fontWeight: 'bold'}}>
        마이페이지
      </Text>
      <View
        style={{
          width: '100%',
          height: 150,
          backgroundColor: 'rgba(30, 27, 75, 0.3)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontSize: 18}}>{nickName.toString()}</Text>
          <Text style={{fontSize: 18}}> 님</Text>
        </View>
        <Text style={{fontSize: 14}}>{email.toString()}</Text>
      </View>
      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <View
          style={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'gray',
            borderBottomWidth: 0.5,
            paddingBottom: 10,
          }}>
          <Icon size={35} color="#000000" name="like2" />
          <Text style={{fontSize: 18, marginLeft: 10}}>나의 취향 분석</Text>
        </View>
      </View>
      <View
        style={{position: 'absolute', bottom: '0%', right: '0%', margin: 15}}>
        <Icon
          size={35}
          color="#001A72"
          name="like2"
          style={{
            borderColor: '#001A72',
            borderWidth: 1,
            padding: 10,
            margin: 5,
            borderRadius: 50,
          }}
        />
        <Icon
          size={35}
          color="#ffffff"
          name="staro"
          onPress={() => navigation.navigate('MyPageMain2')}
          style={{
            backgroundColor: '#001A72',
            borderColor: '#001A72',
            borderWidth: 1,
            padding: 10,
            margin: 5,
            borderRadius: 50,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyPageMain;
