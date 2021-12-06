import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import {preURL} from '../../constants/preURL';
import axios from 'axios';

const MyTicketMain = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(preURL.preURL + `/v1/ticket/list/1`) // userID
      .then(res => {
        console.log('나의 티켓 리스트 받았다! ', res.data);
        setData(res.data);
      })
      .catch(err => {
        console.log('에러 발생❗️ ', err);
      });
  }, []);

  const listItems = ({item}) => {
    console.log('item(게시글): ', item);
    return (
      <View
        style={{
          backgroundColor: '#F3F3F3',
          padding: 10,
          display: 'flex',
          justifyContent: 'center',
          width: '45%',
          margin: 10,
          borderRadius: 10,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TicketDetail', {ticketID: item.ticketID})
          }>
          <Image
            source={{uri: item.imageuri}}
            style={{width: '90%', aspectRatio: 1, alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
          <Text>{item.title}</Text>
          <Text>
            {item.playdate}
            {item.playtime}
          </Text>
          <Text>평점 {item.star}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{height: '100%', backgroundColor: '#ffffff'}}>
      <FlatList data={data} renderItem={listItems} numColumns={2} />
    </SafeAreaView>
  );
};

export default MyTicketMain;
