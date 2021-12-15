import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {preURL} from '../../constants/preURL';
import Header from '../etc/Header';

const ChooseInfo = ({navigation, route}) => {
  const textData = route.params.textData;
  const titles = textData.title;
  const uri = route.params.uri;
  const [tSelection, setTSelection] = useState('');
  const [answer, setAnswer] = useState({});

  useEffect(() => {
    console.log('========================[ChooseInfo]====================');
    console.log('textData: ', textData);
    console.log('titles: ', titles);
    console.log('uri: ', uri);
  }, []);

  const TListItem = arr => {
    console.log('arr: ', arr);
    return arr.map(li => (
      <TouchableOpacity onPress={() => setTSelection(li)}>
        <View
          style={{
            borderColor: '#001A72',
            borderWidth: 2,
            height: 100,
            marginTop: 5,
            marginBottom: 5,
            borderRadius: 15,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18}}>{li}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const postSelection = () => {
    console.log('tSelection: ', tSelection);
    const body = {
      title: `${tSelection}`,
      place: `${textData.place}`,
      seat: `${textData.seat}`,
      date: `${textData.date}`,
      imguri: `${uri}`,
    };
    console.log('body: ', body);
    axios
      .post(preURL.preURL + '/v1/ticket/answer', body)
      .then(res => {
        console.log('선택 보냈다! ', res.data);
        setAnswer(res.data);
      })
      .catch(err => {
        console.log('에러 발생❗️ - 선택 전송 ', err);
      });
    navigation.navigate('AddStars', {info: body, ticketID: answer});
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header />
      <View style={{padding: 20}}>
        <View>
          <Text style={styles.ques}>제목을 선택해주세요</Text>
        </View>
        <View>
          <Text style={{marginTop: '2%', marginBottom: '2%', fontSize: 17}}>
            {tSelection}
          </Text>
          <View>{TListItem(titles)}</View>
        </View>
        <TouchableOpacity
          onPress={() => postSelection()}
          style={{
            backgroundColor: '#001A72',
            width: '100%',
            height: '10%',
            alignSelf: 'center',
            marginTop: '5%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
          }}>
          <Text style={{color: 'white', fontSize: 17}}>다음</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChooseInfo;

const styles = StyleSheet.create({
  ques: {
    fontSize: 18,
    fontWeight: 'bold',
    marignBottom: 10,
  },
});
