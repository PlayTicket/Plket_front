import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import {Rating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/Ionicons';
import {preURL} from '../../constants/preURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddStars = ({navigation, route}) => {
  const info = route.params.info;
  const uri = info.imguri;
  const ticketID = route.params.ticketID.ticketID;

  const [id, setID] = useState(-1);
  const [stars, setStars] = useState(0);
  const [seat, setSeat] = useState('');
  const [show, setShow] = useState(false);
  const [review, setReview] = useState('');

  useEffect(() => {
    console.log('=======================[AddStars]======================');
    console.log('info: ', info);
    console.log('ticketID: ', ticketID);
    AsyncStorage.getItem('userID', (err, result) => {
      console.log('userID: ', result);
      setID(result);
    });
  }, []);

  const ratingCompleted = rating => {
    setStars(rating);
    console.log('Rating is: ' + rating);
    postChanges();
  };

  const postChanges = () => {
    const body = {
      userID: id,
      ticketID: ticketID,
      star: stars,
      seatreview: seat,
      show: show,
      playReview: review,
    };

    axios
      .post(preURL.preURL + '/v1/ticket/save', body)
      .then(res => {
        console.log('후기 보냈다! ', res.data);
      })
      .catch(err => {
        console.log('에러 발생❗️ - 후기 전송 ', err);
      });
  };

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', height: '100%'}}>
      <Image source={{uri: uri}} style={{width: '100%', aspectRatio: 1}} />
      <View
        style={{
          padding: 15,
          marginTop: 10,
          borderColor: '#CCCCCC',
          borderWidth: 0.5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{fontSize: 20}}>{info.title}</Text>
          <Text style={{fontSize: 17}}>일시: {info.date}</Text>
          <Text style={{fontSize: 17}}>장소: {info.place}</Text>
          <Text style={{fontSize: 17}}>좌석: {info.seat}</Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          borderColor: '#CCCCCC',
          borderWidth: 0.5,
        }}>
        <Rating
          defaultRating={0}
          ratingCount={5}
          imageSize={50}
          onFinishRating={ratingCompleted}
          style={{paddingVertical: 10}}
        />
        <Icon size={35} color="#001A72" name="pencil-outline" />
      </View>
      <TouchableOpacity>
        <Text style={{alignSelf: 'flex-end', padding: 10}}>
          좌석후기 작성하기 >
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddStars;
