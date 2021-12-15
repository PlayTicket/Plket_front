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

const MyPageMain2 = ({navigation}) => {
  const [data, setData] = useState({});
  const [nickName, setNickName] = useState({});
  const [email, setEmail] = useState({});

  // play data
  let [mData, setMData] = useState([]);
  let [sData, setSData] = useState([]);
  let [cData, setCData] = useState([]);

  // play data 유뮤
  const [isM, setIsM] = useState(false);
  const [isS, setIsS] = useState(false);
  const [isC, setIsC] = useState(false);

  useEffect(() => {
    console.log('==================[MyPageMain]=====================');
    let Loading = false;

    axios
      .get(preURL.preURL + `/v1/user/${id}`) // 유저 아이디
      .then(res => {
        console.log('res.data: ', res.data);
        setData(res.data);
        console.log('data: ', data);
        setNickName(res.data.nickname);
        setEmail(res.data.email);
        if (res.data.musical.length != 0) {
          setMData(res.data.musical);
          console.log('mData: ', mData);
          setIsM(!isM);
        }
        if (res.data.stage.length != 0) {
          setSData(res.data.stage);
          console.log('sData: ', sData);
          setIsS(!isS);
        }
        if (res.data.concert.length != 0) {
          setCData(res.data.concert);
          console.log('cData: ', cData);
          setIsC(!isC);
        }
      })
      .catch(err => {
        console.log('에러 발생❗️ ', err);
      });

    return () => {
      let loading = true;
    };
  }, []);

  const ListItem = arr => {
    return arr.map(play => (
      <View style={{margin: 10}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail', {playid: play.playid})}>
          <Image
            source={{uri: `${play.uri}`}}
            style={{width: 100, height: 134}}
          />
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text>{play.title}</Text>
            <Text>{play.star}</Text>
          </View>
        </TouchableOpacity>
      </View>
    ));
  };

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
      <View></View>
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
          <Icon size={35} color="#000000" name="staro" />
          <Text style={{fontSize: 18, marginLeft: 10}}>내가 찜한 공연</Text>
        </View>
        {isM == true ? (
          <View style={styles.categoryBlock}>
            <Text style={styles.category}>뮤지컬</Text>
            <View style={styles.listBlock}>{ListItem(mData)}</View>
          </View>
        ) : (
          <View></View>
        )}
        {isS == true ? (
          <View style={styles.categoryBlock}>
            <Text style={styles.category}>연극</Text>
            <View style={styles.listBlock}>{ListItem(sData)}</View>
          </View>
        ) : (
          <View></View>
        )}
        {isC == true ? (
          <View style={styles.categoryBlock}>
            <Text style={styles.category}>콘서트</Text>
            <View style={styles.listBlock}>{ListItem(cData)}</View>
          </View>
        ) : (
          <View></View>
        )}
      </View>
      <View
        style={{position: 'absolute', bottom: '0%', right: '0%', margin: 15}}>
        <Icon
          size={35}
          color="#ffffff"
          name="like2"
          onPress={() => navigation.navigate('MyPageMain')}
          style={{
            backgroundColor: '#001A72',
            borderColor: '#001A72',
            borderWidth: 1,
            padding: 10,
            margin: 5,
            borderRadius: 50,
          }}
        />

        <Icon
          size={35}
          color="#001A72"
          name="staro"
          style={{
            borderColor: '#001A72',
            borderWidth: 1,
            padding: 10,
            marginRight: 5,
            marginLeft: 5,
            borderRadius: 50,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyPageMain2;

const styles = StyleSheet.create({
  categoryBlock: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingTop: 15,
    paddingBottom: 15,
  },
  category: {fontSize: 15},
  listBlock: {
    display: 'flex',
    flexDirection: 'row',
  },
});
