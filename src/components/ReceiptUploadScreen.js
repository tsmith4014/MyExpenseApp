// ReceiptUploadScreen.js
import React, {useState} from 'react';
import {View, Button, StyleSheet, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Config from 'react-native-config';

const ReceiptUploadScreen = ({route}) => {
  const {token} = route.params;

  const handleTakePhoto = () => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        uploadImage(response);
      }
    });
  };

  const uploadImage = response => {
    const formData = new FormData();
    formData.append('file', {
      name: response.fileName,
      type: response.type,
      uri: response.uri,
    });
    formData.append(
      'metadata',
      JSON.stringify({
        date: new Date().toISOString(), // example metadata
        userId: 'your-user-id', // obtain from cognito context or pass along
      }),
    );

    axios
      .post(`${Config.API_ENDPOINT}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        Alert.alert('Upload Successful', 'Your receipt has been uploaded.');
        console.log(res.data);
      })
      .catch(err => {
        Alert.alert('Upload Failed', 'Failed to upload your receipt.');
        console.error(err);
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={handleTakePhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default ReceiptUploadScreen;
