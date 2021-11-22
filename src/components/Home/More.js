import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import {preURL} from '../../constants/preURL';

const More = ({navigation, route}) => {
  const category = route.params.category;
  const [pageNum, setPageNum] = useState(1);
  const [playList, setPlayList] = useState(playList);

  useEffect(() => {
    console.log('===================[More]==================');
    let isMount = true;

    axios
      .get(preURL.preURL + `/v1/home/${category}/${pageNum}`)
      .then(res => {
        console.log('공연 더보기 정보 받았다!');
        console.log('응답:', res.data);
        setPlayList(res.data);
        console.log(playList);
      })
      .catch(err => {
        console.log('에러 발생: ', err);
      });
    return () => {
      isMount = false;
    };
  }, []);

  return (
    <View>
      <TouchableOpacity>
        <Text>뒤로가기</Text>
      </TouchableOpacity>
      <FlatList
        data={playList}
        renderItem={({item}) => (
          <View>
            <View>
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
                  source={{
                    uri: `${item.uri}`,
                  }}
                  style={styles.poster}
                  resizeMode="cover"
                  key={item.playid}
                />
              </ImageBackground>
            </View>
            <Text>{item.title}</Text>
            <Text>평점{item.star}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  poster: {
    width: 97,
    height: 130,
    marginBottom: 5,
  },
});
