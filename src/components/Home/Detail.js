import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import {preURL} from '../../constants/preURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../etc/Header';

const Detail = ({navigation, route}) => {
  const params = route.params;
  const playid = params.playid;
  let [info, setInfo] = useState({});
  const [reviews, setReivews] = useState([]);
  const [scrap, setScrap] = useState(false);
  const [like, setLike] = useState(false);
  const [id, setID] = useState(0);

  const getID = async () => {
    try {
      const value = await AsyncStorage.getItem('userID');
      if (value !== null) {
        console.log('ID: ', value);
        setID(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    console.log('===================[Detail]=================');
    getID();
    let isMount = true;

    axios
      .get(preURL.preURL + `/v1/play/${playid}/${id}`)
      .then(res => {
        console.log('공연 세부 정보 받았다! ', res.data);
        setInfo(res.data);
        setScrap(scrap);
      })
      .catch(err => {
        console.log('에러 발생: ', err);
      });
    return () => {
      isMount = false;
    };
  }, []);

  const postScrap = num => {
    axios
      .post(preURL.preURL + `/v1/play/${playid}/1/${num}`) // 유저 고유번호로 변경
      .then(() => {
        console.log('장바구니 정보 보냈다! ');
      })
      .catch(err => {
        console.log('에러 발생: ', err);
      });
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <Text>{item.nickname}</Text>
        <View>
          <Text>{item.star}</Text>
          {like ? (
            <Icon
              size={35}
              color="#001A72"
              name="ios-thumbs-up"
              onPress={() => {
                setLike(!like);
              }}
            />
          ) : (
            <Icon
              size={35}
              color="#001A72"
              name="ios-thumbs-up-outline"
              onPress={() => {
                setLike(!like);
              }}
            />
          )}
        </View>
        <Text>{item.review}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: '#ffffff',
      }}>
      <Header />
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: 10,
          marginBottom: 10,
        }}>
        <ImageBackground
          source={require('../../assets/PosterBack.png')}
          style={{
            width: 246,
            height: 313,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: info.uri}}
            style={{
              width: 193,
              height: 258,
              borderColor: '#CCCCCC',
              borderWidth: 0.5,
            }}
          />
        </ImageBackground>
      </View>
      <View style={{padding: '5%'}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <View>
            <Text style={{fontSize: 24}}>{info.title}</Text>
            <Text style={{fontSize: 18, color: '#6B6B6B'}}>{info.genre}</Text>
            <View>
              {info.mystar == 0 ? (
                <Text style={{fontSize: 18}}>별점 ★{info.mystar}</Text>
              ) : (
                <Text style={{fontSize: 18}}>예상별점 ★{info.star}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity>
            {scrap ? (
              <Icon
                size={35}
                color="#001A72"
                name="ios-basket"
                onPress={() => {
                  setScrap(!scrap);
                  postScrap(1);
                }}
              />
            ) : (
              <Icon
                size={35}
                color="#001A72"
                name="ios-basket-outline"
                onPress={() => {
                  setScrap(!scrap);
                  postScrap(0);
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 10,
            borderColor: '#CCCCCCC',
            borderWidth: 1,
            borderRadius: 15,
            padding: 10,
          }}>
          <Text>평균별점</Text>
          <Text>{info.star}</Text>
        </View>
        <View
          style={{
            borderColor: '#CCCCCCC',
            borderTopWidth: 0.5,
            paddingTop: 10,
          }}>
          <Text>공연평</Text>
        </View>
        <View>
          <Text>{reviews.map(item => renderItem({item}))}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
