import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  View,
  FlatList,
  Text,
  SafeAreaView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {preURL} from '../../constants/preURL';
import Header from '../etc/Header';

const SeatMain = ({navigation}) => {
  const [data, setData] = useState({});
  // open
  const [placeOpen, setPlaceOpen] = useState(false);
  const [floorOpen, setFloorOpen] = useState(false);
  const [partOpen, setPartOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  // value
  const [plValue, setPlValue] = useState(null);
  const [paValue, setPaValue] = useState(null);
  const [flValue, setFlValue] = useState(null);
  // items
  const [plItems, setPlItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  const [paItems, setPaItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  const [flItems, setFlItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  const [id, setID] = useState(0);
  const [result, setResult] = useState({});

  const getID = async () => {
    try {
      const value = await AsyncStorage.getItem('userID');
      if (value !== null) {
        console.log('ID: ', value);
        setID(value);
      }
    } catch (error) {}
  };

  const onPlaceOpen =
    (() => {
      setPartOpen(false);
      setSeatOpen(false);
    },
    []);
  const onPartOpen =
    (() => {
      setPlaceOpen(false);
      setSeatOpen(false);
    },
    []);
  const onFloorOpen =
    (() => {
      setPlaceOpen(false);
      setPartOpen(false);
    },
    []);

  useEffect(() => {
    getID();
    axios
      .get(preURL.preURL + `/v1/seat/lists`)
      .then(res => {
        console.log('응답: ', res.data);
        setData(res.data);
        console.log('data: ', data);
      })
      .catch(err => {
        console.log('에러 발생❗️ - 검색 기준 ', err);
      });
  }, []);

  let body = {
    place: plValue,
    floor: flValue,
    block: paValue,
  };

  useEffect(() => {
    if (plValue != null && (paValue != null) & (flValue != null)) {
      axios
        .post(preURL.preURL + '/v1/seat/search', body)
        .then(res => {
          console.log('검색 결과 받았다: ', res.data);
          setResult(res.data);
        })
        .catch(err => console.log('에러 발생❗️ - 검색 결과 ', err));
    }
  }, [body]);

  const imageList = arr => {
    console.log('arr: ', arr);
    return arr.map(li => (
      <Image source={{uri: arr}} style={{width: 200, height: 200}} />
    ));
  };

  const listItems = ({item}) => {
    console.log('item(게시글): ', item);
    return (
      <View style={{borderColor: 'gray', borderWidth: 1}}>
        <Text>{item.nickName} 님</Text>
        <View>
          <Text>{item.row}열</Text>
          <Text>{item.num}번</Text>
        </View>
        <Text>{item.article}</Text>
        {item.uri.length != 0 ? (
          <View
            style={{
              padding: 10,
              width: '90%',
              backgroundColor: 'gray',
              borderRadius: 15,
            }}>
            {imageList(item.uri)}
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header />
      <View
        style={{
          margin: '3%',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <DropDownPicker
          placeholder={'장소'}
          open={placeOpen}
          onOpen={onPlaceOpen}
          value={plValue}
          items={plItems}
          setOpen={setPlaceOpen}
          setValue={setPlValue}
          setItems={setPlItems}
          containerStyle={{height: 50, width: '30%'}}
        />
        <DropDownPicker
          placeholder={'층'}
          open={floorOpen}
          onOpen={onFloorOpen}
          value={flValue}
          items={flItems}
          setOpen={setFloorOpen}
          setValue={setFlValue}
          setItems={setFlItems}
          containerStyle={{height: 50, width: '20%'}}
        />
        <DropDownPicker
          placeholder={'구역'}
          open={partOpen}
          onOpen={onPartOpen}
          value={paValue}
          items={paItems}
          setOpen={setPartOpen}
          setValue={setPaValue}
          setItems={setPaItems}
          containerStyle={{height: 50, width: '21%'}}
        />
      </View>
      <FlatList data={result} renderItem={listItems} />
    </SafeAreaView>
  );
};

export default SeatMain;
