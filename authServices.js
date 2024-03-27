// authServices.js
import Config from 'react-native-config';
import {cognito} from './awsConfig'; // Assuming cognito is appropriately configured elsewhere

export const signIn = async (username, password) => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: Config.CLIENT_ID, // Use CLIENT_ID from .env
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const session = await cognito.initiateAuth(params).promise();
    return session;
  } catch (error) {
    console.error('Sign in failed: ', error);
    throw error;
  }
};

// doesnt use env below
// // authServices.js
// import {cognito, poolData} from './awsConfig';

// export const signIn = async (username, password) => {
//   const params = {
//     AuthFlow: 'USER_PASSWORD_AUTH',
//     ClientId: poolData.ClientId,
//     AuthParameters: {
//       USERNAME: username,
//       PASSWORD: password,
//     },
//   };

//   try {
//     const session = await cognito.initiateAuth(params).promise();
//     return session; // Ensure to return the session for use in SignInScreen
//   } catch (error) {
//     console.error('Sign in failed: ', error);
//     throw error; // Ensure to throw the error to be caught in SignInScreen
//   }
// };
