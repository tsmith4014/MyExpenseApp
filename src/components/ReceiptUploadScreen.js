//ReceiptUploadScreen.js this doesnt work when i submit to the API gateway it says
import React, {useContext} from 'react';
import {View, Button, StyleSheet, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Config from 'react-native-config';
import AuthContext from '../services/AuthContext';

const ReceiptUploadScreen = () => {
  const {token} = useContext(AuthContext);

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
        console.log('ImagePicker Error:', response.errorCode);
      } else {
        uploadImage(response);
      }
    });
  };

  const handleSelectPhoto = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorCode);
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
        date: new Date().toISOString(),
        userId: 'chad', // Ensure this is what your backend expects
      }),
    );

    console.log('Bearer Token:', `Bearer ${token}`); // Double-checking the token format

    axios
      .post(Config.IMAGE_UPLOAD_ENDPOINT, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Ensuring no space or extra characters
        },
      })
      .then(res => {
        Alert.alert('Upload Successful', 'Your receipt has been uploaded.');
        console.log('Response Data:', res.data);
      })
      .catch(err => {
        Alert.alert('Upload Failed', 'Failed to upload your receipt.');
        console.error('Axios Error:', err.response ? err.response.data : err);
        console.error(
          'Error Headers:',
          err.response ? err.response.headers : 'No response headers',
        );
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={handleTakePhoto} />
      <Button title="Select Photo from Gallery" onPress={handleSelectPhoto} />
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
