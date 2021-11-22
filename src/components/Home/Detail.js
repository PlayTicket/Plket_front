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

const Detail = ({navigation, route}) => {
  const params = route.params;
  const playid = params.playid;
  let [info, setInfo] = useState({});
  const [reviews, setReivews] = useState([]);
  const [scrap, setScrap] = useState(false);

  useEffect(() => {
    console.log('===================[Detail]=================');
    let isMount = true;

    axios
      .get(preURL.preURL + `/v1/play/${playid}/1`) // 유저 고유번호로 변경
      .then(res => {
        console.log('공연 세부 정보 받았다! ');
        setInfo(res.data);
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
          <TouchableOpacity>
            <Text>👍</Text>
          </TouchableOpacity>
        </View>
        <Text>{item.review}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        paddingLeft: '5%',
        paddingRight: '5%',
        height: '100%',
        backgroundColor: '#ffffff',
      }}>
      <TouchableOpacity>
        <Text></Text>
        <Text>뒤로가기</Text>
      </TouchableOpacity>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: 10,
          marginBottom: 15,
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
              name="cart"
              onPress={() => {
                setScrap(!scrap);
                postScrap(1);
              }}
            />
          ) : (
            <Icon
              size={35}
              color="#001A72"
              name="cart-outline"
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
        style={{borderColor: '#CCCCCCC', borderTopWidth: 0.5, paddingTop: 10}}>
        <Text>공연평</Text>
      </View>
      <View>
        <Text>{reviews.map(item => renderItem({item}))}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
