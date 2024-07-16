import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import { signIn } from '../redux/Store';

function SignIn({ navigation } : any) {
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
      webClientId: "995041589777-0idch4g4e5g2d436l0fj5fo6j698e5mv.apps.googleusercontent.com", // From Firebase Console
      offlineAccess: true,
    });
  }, []);

  const signUserIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      dispatch(signIn({
        userId: userInfo.user.id,
        profilePictureUrl: userInfo.user.photo ?? '',
        firstName: userInfo.user.givenName ?? '',
        lastName: userInfo.user.familyName ?? '',
        email: userInfo.user.email ?? ""
      }));
      console.log('User Info:', userInfo);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the sign-in process
        console.log('User cancelled the sign-in process');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Sign-in is in progress
        console.log('Sign-in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available or outdated
        console.log('Play services not available or outdated');
      } else {
        // Some other error
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button icon="google" mode="contained" labelStyle={styles.signInButton} onPress={signUserIn}>
        Sign in with Google
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  signInButton: {
    fontSize: 16
  }
});


export default SignIn;