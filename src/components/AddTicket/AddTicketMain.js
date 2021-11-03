import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {COLORS} from '../../styles/Colors';
import axios from 'axios';
import {preURL} from '../../constants/preURL';

const AddTicketMain = ({navigation}) => {
  const cameraRef = React.useRef(null); // useRef로 camera를 위한 ref를 하나 만들어주고
  const [photoData, setPhotoData] = useState('');
  const [textData, setTextData] = useState('');

  const takePhoto = async () => {
    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      console.log('data', data);
      setPhotoData(data);
    }
    const fd = new FormData();
    fd.append('image', {
      name: 'picture.jpg',
      type: 'image/jpeg',
      uri: photoData.uri,
    });
    const response = await fetch(preURL.preURL + '/image/name', {
      method: 'POST',
      body: fd,
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
      .post(preURL.preURL + '/ticket/post', photoData)
      .then(response => {
        console.log(response);
        setTextData(response);
        Alert.alert('티켓 정보를 확인해주세요', textData, [
          {text: '확인', onPress: () => navigation.navigate('AddStars')},
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
    <View style={{flex: 1, display: 'flex', alignItems: 'center'}}>
      <Text>AddTicketMain</Text>
      <RNCamera
        ref={cameraRef}
        style={{
          margin: '3%',
          width: '100%',
          height: '90%',
        }}
        captureAudio={false}
      />
      <View>
        <TouchableOpacity onPress={takePhoto}>
          <Text>찰칵</Text>
        </TouchableOpacity>
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
