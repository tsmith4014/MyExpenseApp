// SignInScreen.js
import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {signIn} from '../services/authServices'; // Ensure signIn is correctly returning the session

const SignInScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const session = await signIn(username, password);
      const token = session.AuthenticationResult.IdToken; // Obtain the token
      console.log('This is the Cognito Token:', token);
      navigation.navigate('FormScreen', {token}); // Pass the token as a parameter
    } catch (error) {
      Alert.alert('Sign In Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
});

export default SignInScreen;