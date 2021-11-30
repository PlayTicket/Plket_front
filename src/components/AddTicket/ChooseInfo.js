import React, {useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ChooseInfo = ({navigation, route}) => {
  //   const textData = route.params;
  const [info, setInfo] = useState('제목');
  const [pageNum, setPageNum] = useState(1);
  const [tSelection, setTSelection] = useState('');
  const [dSelection, setDSelection] = useState('');
  const [pSelection, setPSelection] = useState('');
  const [sSelection, setSSelection] = useState('');

  // 임시 data
  const textData = [
    '다윈영의 악의기원',
    'Prime School',
    '2021-10-12 (화) 19:00',
    '예술의전당 CJ 토월극장',
    '1층 A블록 10열 11번',
    '제작 : (재)서울예술단',
    '후원 : 문화체육관광부',
    '문의 : 클립서비스 1577-3363',
  ];

  console.log(textData);

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

  const DListItem = arr => {
    console.log('arr: ', arr);
    return arr.map(li => (
      <TouchableOpacity onPress={() => setDSelection(li)}>
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

  const PListItem = arr => {
    console.log('arr: ', arr);
    return arr.map(li => (
      <TouchableOpacity onPress={() => setPSelection(li)}>
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
  const SListItem = arr => {
    console.log('arr: ', arr);
    return arr.map(li => (
      <TouchableOpacity onPress={() => setSSelection(li)}>
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

  return (
    <SafeAreaView style={{padding: 20}}>
      <View>
        {pageNum == 1 ? (
          <Text style={styles.ques}>제목을 선택해주세요</Text>
        ) : pageNum == 2 ? (
          <Text style={styles.ques}>일시를 선택해주세요</Text>
        ) : pageNum == 3 ? (
          <Text style={styles.ques}>장소를 선택해주세요</Text>
        ) : pageNum == 4 ? (
          <Text style={styles.ques}>좌석을 선택해주세요</Text>
        ) : (
          <Text></Text>
        )}
        <Text>{pageNum}/4</Text>
      </View>
      {pageNum == 1 ? (
        <View>
          <TouchableOpacity onPress={setPageNum(pageNum + 1)}>
            <Text>다음</Text>
          </TouchableOpacity>
          <Text>{tSelection}</Text>
          <View>{TListItem(textData)}</View>
        </View>
      ) : pageNum == 2 ? (
        <View>
          <TouchableOpacity onPress={() => setPageNum(1)}>
            <Text>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPageNum(pageNum + 1)}>
            <Text>다음</Text>
          </TouchableOpacity>
          <Text>{tSelection}</Text>
          <Text>{dSelection}</Text>

          <View>{DListItem(textData)}</View>
        </View>
      ) : pageNum == 3 ? (
        <View>
          <TouchableOpacity onPress={() => setPageNum(pageNum - 1)}>
            <Text>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPageNum(pageNum + 1)}>
            <Text>다음</Text>
          </TouchableOpacity>
          <Text>{tSelection}</Text>
          <Text>{dSelection}</Text>
          <Text>{pSelection}</Text>
          <View>{PListItem(textData)}</View>
        </View>
      ) : pageNum == 4 ? (
        <View>
          <TouchableOpacity onPress={() => setPageNum(pageNum - 1)}>
            <Text>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddStars', {
                title: tSelection,
                date: dSelection,
                place: pSelection,
                seat: sSelection,
              })
            }>
            <Text>다음</Text>
          </TouchableOpacity>
          <Text>{tSelection}</Text>
          <Text>{dSelection}</Text>
          <Text>{pSelection}</Text>
          <Text>{sSelection}</Text>
          <View>{SListItem(textData)}</View>
        </View>
      ) : (
        <View></View>
      )}
      <View></View>
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
