import React from 'react';
import {View, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <>
      <Icon
        size={35}
        color="#001A72"
        name="notifications-outline"
        onPress={() => {
          navigation.navigate('Search');
        }}
        style={{position: 'absolute', top: '2%', left: '2%'}}
      />
      <Icon
        size={35}
        color="#001A72"
        name="search-outline"
        onPress={() => {
          navigation.navigate('Search');
        }}
        style={{position: 'absolute', top: '2%', right: '2%'}}
      />
      <View
        style={{
          height: '8%',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '9%',
        }}>
        <View style={{flex: 1, height: 4, backgroundColor: '#1E1B4B'}} />
        <ImageBackground
          style={{aspectRatio: 1, height: '100%'}}
          source={require('../../assets/MainLogo.png')}></ImageBackground>
        <View style={{flex: 1, height: 4, backgroundColor: '#1E1B4B'}} />
      </View>
    </>
  );
};

export default Header;
