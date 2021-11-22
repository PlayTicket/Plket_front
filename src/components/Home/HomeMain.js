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
      <View style={{height: 75}}>
        <ImageBackground
          style={{height: 75, width: '100%'}}
          source={require('../../assets/Header.png')}
        />
      </View>
      <View
        style={{
          height: 210,
          borderColor: '#CBCBD4',
          borderBottomWidth: 1,
        }}>
        <View style={styles.bar}>
          <Text style={styles.category}>뮤지컬</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('More', {category: 'musical'})}>
            <Text>></Text>
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
      <View style={{height: 210, borderColor: '#CBCBD4', borderBottomWidth: 1}}>
        <View style={styles.bar}>
          <Text style={styles.category}>연극</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('More', {category: 'stage'})}>
            <Text>></Text>
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
      <View style={{height: 210}}>
        <View style={styles.bar}>
          <Text style={styles.category}>콘서트</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('More', {category: 'concert'})}>
            <Text>></Text>
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

const SECTIONS1 = [
  {
    title: 'Made for you',
    horizontal: true,
    data: [
      {
        title: '앗, 도와줘!',
        uri: 'https://picsum.photos/id/1/200',
        route: 'StoryLoading',
        star: '3',
      },
      {
        title: '마리모 친구들',
        uri: 'https://picsum.photos/id/10/200',
        route: 'StoryLoading',
        star: '3',
      },

      {
        title: 'Item text 3',
        uri: 'https://picsum.photos/id/1002/200',
        route: 'StoryLoading',
        star: '3',
      },
    ],
  },
];

const styles = StyleSheet.create({
  bar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 3,
    paddingLeft: 5,
    paddingRight: 5,
    color: 'black',
  },
  category: {color: 'black', fontSize: 15},
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
