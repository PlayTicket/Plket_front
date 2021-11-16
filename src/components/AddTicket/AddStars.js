import React, {useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {Rating} from 'react-native-ratings';

const AddStars = ({navigation, route}) => {
  const textData = route.params;
  const [stars, setStars] = useState(0);
  const ratingCompleted = rating => {
    setStars(rating);
    console.log('Rating is: ' + stars);
  };
  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', height: '100%'}}>
      <View
        style={{width: '100%', height: 300, backgroundColor: 'gray'}}></View>
      <View
        style={{
          padding: 15,
          marginTop: 10,
          marginBottom: 10,
          borderColor: '#CCCCCC',
          borderWidth: 0.5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{fontSize: 20}}>제목</Text>
          <Text style={{fontSize: 17}}>일시: </Text>
          <Text style={{fontSize: 17}}>장소: </Text>
          <Text style={{fontSize: 17}}>좌석: </Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text>👎🏻</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Rating
          defaultRating={0}
          ratingCount={5}
          imageSize={50}
          onFinishRating={ratingCompleted}
          style={{paddingVertical: 10}}
        />
        <TouchableOpacity>
          <Text>✍🏻</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddStars;
