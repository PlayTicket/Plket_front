import axios from 'axios';
import React, {useState} from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {preURL} from '../../constants/preURL';

const SeatMain = ({navigation}) => {
  // const [data, setData] = useState({});
  // open
  const [placeOpen, setPlaceOpen] = useState(false);
  const [floorOpen, setFloorOpen] = useState(false);
  const [partOpen, setPartOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  // value
  const [plValue, setPlValue] = useState(null);
  const [paValue, setPaValue] = useState(null);
  const [flValue, setFlValue] = useState(null);
  const [fValue, setFValue] = useState(null);
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
  const [fItems, setFItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

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
  const onFilterOpen =
    (() => {
      setPlaceOpen(false);
      setPartOpen(false);
      setSeatOpen(false);
    },
    []);

  // 임시
  const data = {
    nickName: '양파네모',
    row: '3',
    num: '6',
    like: false,
    article: '시야 방해 없음',
    uri: ['', ''],
  };

  axios
    .get(preURL.preURL + '/v1/')
    .then(res => {
      console.log('응답: ', res.data);
      setData(res.data);
      console.log('data: ', data);
    })
    .catch(err => {
      console.log('에러 발생❗️ ', err);
    });

  return (
    <SafeAreaView>
      <ImageBackground
        style={{height: 75, width: '100%'}}
        source={require('../../assets/Header.png')}
      />
      <View
        style={{
          margin: '3%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
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

        <DropDownPicker
          placeholder={'필터'}
          open={filterOpen}
          onOpen={onFilterOpen}
          value={fValue}
          items={fItems}
          setOpen={setFilterOpen}
          setValue={setFValue}
          setItems={setFItems}
          containerStyle={{height: 50, width: '22%', marginLeft: '7%'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default SeatMain;
