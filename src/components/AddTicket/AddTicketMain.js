import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  StyleSheet,
  Alert,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import axios from 'axios';
import {preURL} from '../../constants/preURL';
import {COLORS} from '../../styles/Colors';
import Header from '../etc/Header';

const AddTicketMain = ({navigation}) => {
  const cameraRef = React.useRef(null); // useRef로 camera를 위한 ref를 하나 만들어주고
  const [photoData, setPhotoData] = useState('');
  const [textData, setTextData] = useState('');
  const [uri, setURI] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);

  const {height, width} = useWindowDimensions();

  console.log('======================[AddTicketMain]===================');
  const takePhoto = async () => {
    let data = '';
    if (cameraRef) {
      data = await cameraRef.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      console.log('data: ', data);
      setPhotoData(data);
      setPhotoTaken(true);
      setURI(data.uri);
    }

    const fd = new FormData();
    fd.append('image', {
      name: 'picture.jpg',
      type: 'image/jpeg',
      uri: data.uri,
    });
    await fetch(preURL.preURL + '/v1/ticket/image', {
      method: 'POST',
      body: fd,
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log('티켓 정보 받았다! ', json);
        setTextData(json);
        Alert.alert('티켓 정보를 확인해주세요', '', [
          {
            text: '확인',
            onPress: () =>
              navigation.navigate('ChooseInfo', {
                textData: json,
                uri: json.imguri,
              }),
          },
          {
            text: '다시 시도',
            onPress: () => {
              console.log('다시 촬영');
            },
          },
        ]);
      })
      .catch(err => {
        console.log('티켓 사진 전송에 실패: ', err);
      });
  };

  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}>
      <Header />
      {photoTaken ? (
        <Text style={{fontSize: 16, marginTop: '20%'}}>
          잠시만 기다려주세요
        </Text>
      ) : (
        <Text style={{fontSize: 16, marginTop: '20%'}}>
          작은 절취용 티켓을 제외하고 찍어주세요
        </Text>
      )}
      <View style={{height: '50%', overflow: 'hidden', marginTop: '3%'}}>
        <RNCamera
          ref={cameraRef}
          style={{
            width: width,
            height: '30%',
          }}
          captureAudio={false}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={takePhoto}
          style={{
            width: '20%',
            aspectRatio: 1,
            backgroundColor: COLORS.navy,
            borderRadius: 100,
            opacity: 0.5,
          }}
        />
      </View>
    </View>
  );
};

export default AddTicketMain;
const styles = StyleSheet.create({
  modal: {
    height: '20%',
    width: '70%',
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 120,
    borderWidth: 7,
    borderColor: '#C5A1F3',
  },
});
