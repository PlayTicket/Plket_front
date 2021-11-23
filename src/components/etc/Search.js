import axios from 'axios';
import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {preURL} from '../../constants/preURL';

const Search = ({navigation}) => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');

  const postKeyword = keyword => {
    axios
      .get(preURL.preURL + `/v1/search/${keyword}`)
      .then(res => {
        console.log('응답 받았다! ', res.data.list);
        setData(res.data.list);
        console.log('data: ', data);
      })
      .catch(err => {
        console.log('에러: ', err);
      });
  };

  const listItems = data.map(result => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Detail', {playid: result.playnum});
      }}>
      <Text style={{borderBottomColor: 'gray', borderBottomWidth: 0.5}}>
        {result.title}
      </Text>
    </TouchableOpacity>
  ));

  return (
    <SafeAreaView>
      <View style={{padding: 20, display: 'flex', flexDirection: 'row'}}>
        <TextInput
          style={styles.input}
          value={keyword}
          onChange={event => {
            const {eventCount, target, text} = event.nativeEvent;
            setKeyword(text);
          }}
        />
        <Icon
          size={35}
          color="#001A72"
          name="search"
          onPress={() => {
            postKeyword(keyword);
          }}
        />
      </View>
      <View style={{padding: 20}}>{listItems}</View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {width: '90%', borderBottomColor: '#000', borderBottomWidth: 1},
});
