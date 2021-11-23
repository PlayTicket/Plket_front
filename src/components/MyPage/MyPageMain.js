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

const MyPageMain = ({navigation}) => {
  const [data, setData] = useState({});

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
      .get(preURL.preURL + `/v1/user/1`) // 유저 아이디
      .then(res => {
        console.log('res.data: ', res.data);
        setData(res.data);
        console.log('data: ', data);
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
    console.log('arr: ', arr);
    arr.map(play => (
      <View>
        <Text>되냐</Text>
      </View>
    ));
  };

  return (
    <SafeAreaView>
      <Text style={{fontSize: 24, padding: 20, fontWeight: 'bold'}}>
        마이페이지
      </Text>
      <View
        style={{
          width: '100%',
          height: 150,
          backgroundColor: 'gray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{fontSize: 18}}></Text>
          <Text style={{fontSize: 18}}> 님</Text>
        </View>
        <Text style={{fontSize: 14}}></Text>
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
          <Icon size={35} color="#000000" name="staro" />
          <Text style={{fontSize: 18, marginLeft: 10}}>내가 찜한 공연</Text>
        </View>
        {isM == true ? (
          <View style={styles.categoryBlock}>
            <Text style={styles.category}>뮤지컬</Text>
            <View>{ListItem(mData)}</View>
          </View>
        ) : (
          <View></View>
        )}
        {isS == true ? (
          <View style={styles.categoryBlock}>
            <Text style={styles.category}>연극</Text>
            <View>{ListItem(sData)}</View>
          </View>
        ) : (
          <View></View>
        )}
        {isC == true ? (
          <View style={styles.categoryBlock}>
            <Text style={styles.category}>콘서트</Text>
            <View>{ListItem(cData)}</View>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyPageMain;

const styles = StyleSheet.create({
  categoryBlock: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingTop: 15,
    paddingBottom: 15,
  },
  category: {fontSize: 15},
});
