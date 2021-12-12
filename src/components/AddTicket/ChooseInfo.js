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

const ChooseInfo = ({navigation, route}) => {
  const textData = route.params.textData;
  const titles = textData.title;
  const uri = route.params.uri;
  const [tSelection, setTSelection] = useState('');
  const [answer, setAnswer] = useState({});

  // // 임시 data
  // const textData = [
  //   '다윈영의 악의기원',
  //   'Prime School',
  //   '2021-10-12 (화) 19:00',
  //   '예술의전당 CJ 토월극장',
  //   '1층 A블록 10열 11번',
  //   '제작 : (재)서울예술단',
  //   '후원 : 문화체육관광부',
  //   '문의 : 클립서비스 1577-3363',
  // ];
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
            borderColor: 'gray',
            borderWidth: 1,
            padding: 10,
            marginTop: 5,
            marginBottom: 5,
          }}>
          <Text style={{fontSize: 15}}>{li}</Text>
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
    axios
      .post(preURL.preURL + '/v1/ticket/answer', body)
      .then(res => {
        console.log('선택 보냈다! ', res);
        setAnswer(res);
      })
      .catch(err => {
        console.log('에러 발생❗️ ', err);
      });
  };

  return (
    <SafeAreaView style={{padding: 20}}>
      <View>
        <Text style={styles.ques}>제목을 선택해주세요</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => postSelection()}>
          <Text>다음</Text>
        </TouchableOpacity>
        <Text>{tSelection}</Text>
        <View>{TListItem(titles)}</View>
      </View>
    </SafeAreaView>
  );
};

export default ChooseInfo;

const styles = StyleSheet.create({
  ques: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
