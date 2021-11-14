import React, {setState} from 'react';
import {TouchableOpacity, View, Text, SafeAreaView} from 'react-native';

const Detail = ({navigation, route}) => {
  const params = route.params;
  const [info, setInfo] = setState({});
  const [reviews, setReivews] = setState([]);

  useEffect(() => {
    axios
      .get('http://192.168.35.40' + `/v1/play/${params}/1`) // 유저 고유번호로 변경
      .then(res => {
        console.log('공연 세부 정보 받았다! ');
        console.log('응답:', res);
        setInfo(res.data);
      })
      .catch(err => {
        console.log('에러 발생: ', err);
      });
  });

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
    <SafeAreaView>
      <TouchableOpacity onPress={navigation.navigate('HomeMain')}>
        <Text></Text>
        <Text>뒤로가기</Text>
      </TouchableOpacity>
      <View>
        <View>
          <Image source={info.uri} />
        </View>
      </View>
      <View>
        <View>
          <Text>{info.title}</Text>
          <Text>{info.genre}</Text>
          {mystar ? (
            <Text>별점 ★{info.mystar}</Text>
          ) : (
            <Text>예상별점 ★{info.star}</Text>
          )}
        </View>
        <TouchableOpacity>
          <Text>장바구니 아이콘</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>평균별점</Text>
        <Text>{info.star}</Text>
      </View>
      <View>
        <Text>공연평</Text>
      </View>
      <View> {reviews.map(item => renderItem({item}))}</View>
    </SafeAreaView>
  );
};

export default Detail;
