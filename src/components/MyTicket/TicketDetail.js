import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {preURL} from '../../constants/preURL';
import axios from 'axios';
import {Rating} from 'react-native-ratings';

const TicketDetail = ({navigation, route}) => {
  const {ticketID} = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(preURL.preURL + `/v1/ticket/${ticketID}`)
      .then(res => {
        console.log('나의 티켓 상세 받았다! ', res.data);
        setData(res.data);
      })
      .catch(err => {
        console.log('에러 발생❗️ ', err);
      });
  }, []);

  return (
    <SafeAreaView style={{height: '100%', backgroundColor: '#ffffff'}}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}>
        <Image
          source={{uri: data.imageuri}}
          style={{width: '70%', aspectRatio: 1, margin: 10}}
        />
        <Rating
          defaultRating={0}
          imageSize={50}
          style={{paddingVertical: 10}}
        />
        {/* 수정필요 */}
      </View>
      <View style={{margin: 10, marginLeft: 30, marginRight: 30}}>
        <View
          style={{borderTopColor: 'gray', borderTopWidth: 0.5, padding: 10}}>
          <Text style={styles.text}>제목: {data.title}</Text>
          <Text style={styles.text}>일시: {data.time}</Text>
          <Text style={styles.text}>장소: {data.place}</Text>
          <Text style={styles.text}>
            좌석: {data.seatfloor}층 {data.seatrow}열 {data.seatnum}번
          </Text>
        </View>
        {data.playreview == '' ? (
          <View></View>
        ) : (
          <View
            style={{borderTopColor: 'gray', borderTopWidth: 0.5, padding: 10}}>
            <Text style={{marginBottom: 5, fontSize: 20, fontWeight: 'bold'}}>
              공연 후기
            </Text>
            <Text style={styles.text}>{data.playreview}</Text>
          </View>
        )}
        {data.seatreview == '' ? (
          <View></View>
        ) : (
          <View
            style={{borderTopColor: 'gray', borderTopWidth: 0.5, padding: 10}}>
            <Text style={{marginBottom: 5, fontSize: 20, fontWeight: 'bold'}}>
              좌석 후기
            </Text>
            <Text style={styles.text}>{data.seatreview}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TicketDetail;

const styles = StyleSheet.create({text: {fontSize: 16}});
