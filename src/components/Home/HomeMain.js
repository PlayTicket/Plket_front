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
} from 'react-native';
import axios from 'axios';
import {preURL} from '../../constants/preURL';

const HomeMain = ({navigation}) => {
  const [mList, setMList] = useState('');
  const [pList, setPList] = useState('');
  const [cList, setCList] = useState('');

  useEffect(() => {
    axios
      .get(preURL.preURL + '/main/musical/1')
      .then(res => {
        console.log('뮤지컬 정보 받았다!');
        console.log('응답:', res);
        setMList(res);
      })
      .catch(err => {
        console.log('에러 발생: ', err);
      });
    axios
      .get(preURL.preURL + '/main/play/1')
      .then(res => {
        console.log('연극 정보 받았다!');
        console.log('응답:', res);
        setPList(res);
      })
      .catch(err => {
        console.log('에러 발생: ', err);
      });
    axios
      .get(preURL.preURL + '/main/concert/1')
      .then(res => {
        console.log('콘서트 정보 받았다!');
        console.log('응답:', res);
        setCList(res);
      })
      .catch(err => {
        console.log('에러 발생: ', err);
      });
  });

  const ListItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
        <View style={styles.item}>
          <Image
            source={{
              uri: item.uri,
            }}
            style={styles.poster}
            resizeMode="cover"
          />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.star}>예상 ★{item.star}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: '10%'}}>
        <Text>헤더</Text>
      </View>
      <View
        style={{
          height: 210,
          borderColor: '#CBCBD4',
          borderBottomWidth: 1,
        }}>
        <View style={styles.bar}>
          <Text style={styles.category}>뮤지컬</Text>
          <Text>></Text>
        </View>
        <SafeAreaView>
          <SectionList
            contentContainerStyle={{paddingHorizontal: 5}}
            stickySectionHeadersEnabled={false}
            sections={SECTIONS1}
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
          <Text>></Text>
        </View>
        <SafeAreaView>
          <SectionList
            contentContainerStyle={{paddingHorizontal: 5}}
            stickySectionHeadersEnabled={false}
            sections={SECTIONS1}
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
          <Text>></Text>
        </View>
        <SafeAreaView>
          <SectionList
            contentContainerStyle={{paddingHorizontal: 5}}
            stickySectionHeadersEnabled={false}
            sections={SECTIONS1}
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
