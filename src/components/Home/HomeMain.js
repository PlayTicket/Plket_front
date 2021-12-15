import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {preURL} from '../../constants/preURL';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../etc/Header';

const HomeMain = ({navigation}) => {
  const [mList, setMList] = useState('');
  const [pList, setPList] = useState('');
  const [cList, setCList] = useState('');

  useEffect(() => {
    axios
      .get(preURL.preURL + '/v1/home/musical/1')
      .then(res => {
        console.log('뮤지컬 정보 받았다!');
        console.log('응답:', res);
        const mSection = [
          {title: 'Made for you', horizontal: true, data: res.data},
        ];
        setMList(mSection);
      })
      .catch(err => {
        console.log('에러 발생: ', err);
      });
    axios
      .get(preURL.preURL + '/v1/home/stage/1')
      .then(res => {
        console.log('연극 정보 받았다!');
        console.log('응답:', res);
        const pSection = [
          {title: 'Made for you', horizontal: true, data: res.data},
        ];
        setPList(pSection);
      })
      .catch(err => {
        console.log('에러 발생: ', err);
      });
    axios
      .get(preURL.preURL + '/v1/home/concert/1')
      .then(res => {
        console.log('콘서트 정보 받았다!');
        console.log('응답:', res);
        const cSection = [
          {title: 'Made for you', horizontal: true, data: res.data},
        ];
        setCList(cSection);
      })
      .catch(err => {
        console.log('에러 발생: ', err);
      });
  }, []);

  const ListItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {playid: item.playid})}>
        <View style={styles.item}>
          <Image
            source={{
              uri: `${item.uri}`,
            }}
            style={styles.poster}
            resizeMode="cover"
            key={item.playid}
          />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.star}>예상 ★{item.star}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={styles.block}>
        <View style={styles.bar}>
          <Text style={styles.category}>뮤지컬</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('More', {category: 'musical'})}>
            <Icon size={27} name="chevron-forward-sharp" />
          </TouchableOpacity>
        </View>
        <SafeAreaView>
          <SectionList
            contentContainerStyle={{paddingHorizontal: 5}}
            stickySectionHeadersEnabled={false}
            sections={mList}
            renderSectionHeader={({section}) => (
              <>
                {section.horizontal ? (
                  <FlatList
                    horizontal
                    data={section.data}
                    renderItem={({item}) => <ListItem item={item} />}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : null}
              </>
            )}
            renderItem={({item, section}) => {
              if (section.horizontal) {
                return null;
              }
              return <ListItem item={item} />;
            }}
          />
        </SafeAreaView>
      </View>
      <View style={styles.block}>
        <View style={styles.bar}>
          <Text style={styles.category}>연극</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('More', {category: 'stage'})}>
            <Icon size={27} name="chevron-forward-sharp" />
          </TouchableOpacity>
        </View>
        <SafeAreaView>
          <SectionList
            contentContainerStyle={{paddingHorizontal: 5}}
            stickySectionHeadersEnabled={false}
            sections={pList}
            renderSectionHeader={({section}) => (
              <>
                {section.horizontal ? (
                  <FlatList
                    horizontal
                    data={section.data}
                    renderItem={({item}) => <ListItem item={item} />}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : null}
              </>
            )}
            renderItem={({item, section}) => {
              if (section.horizontal) {
                return null;
              }
              return <ListItem item={item} />;
            }}
          />
        </SafeAreaView>
      </View>
      <View style={styles.block}>
        <View style={styles.bar}>
          <Text style={styles.category}>콘서트</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('More', {category: 'concert'})}>
            <Icon size={27} name="chevron-forward-sharp" />
          </TouchableOpacity>
        </View>
        <SafeAreaView>
          <SectionList
            contentContainerStyle={{paddingHorizontal: 5}}
            stickySectionHeadersEnabled={false}
            sections={cList}
            renderSectionHeader={({section}) => (
              <>
                {section.horizontal ? (
                  <FlatList
                    horizontal
                    data={section.data}
                    renderItem={({item}) => <ListItem item={item} />}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : null}
              </>
            )}
            renderItem={({item, section}) => {
              if (section.horizontal) {
                return null;
              }
              return <ListItem item={item} />;
            }}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

export default HomeMain;

const styles = StyleSheet.create({
  block: {
    height: '29%',
    borderColor: '#CBCBD4',
    borderBottomWidth: 1,
    display: 'flex',
    justifyContent: 'space-around',
  },
  bar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 3,
    paddingLeft: 5,
    paddingRight: 5,
    color: 'black',
  },
  category: {color: 'black', fontSize: 16, fontWeight: 'bold'},
  item: {
    width: '100%',
    display: 'flex',
    borderRadius: 30,
    margin: 5,
  },

  poster: {
    width: 97,
    height: 130,
    marginBottom: 5,
  },
  title: {
    color: 'black',
    fontSize: 12,
  },
  star: {
    color: 'black',
    fontSize: 12,
  },
});
