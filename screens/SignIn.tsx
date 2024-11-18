import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import { signIn } from '../redux/Store';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';

function SignIn({ navigation } : any) {
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
      webClientId: "995041589777-0idch4g4e5g2d436l0fj5fo6j698e5mv.apps.googleusercontent.com", // From Firebase Console
      offlineAccess: true,
    });
  }, []);

  async function onGoogleLogin() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      dispatch(signIn({
        userId: userInfo.user.id,
        profilePictureUrl: userInfo.user.photo ?? '',
        firstName: userInfo.user.givenName ?? '',
        lastName: userInfo.user.familyName ?? '',
        email: userInfo.user.email ?? "",
        provider: "google"
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

  async function onFacebookLogin() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    // Sign-in the user with the credential
    var userInfo = await auth().signInWithCredential(facebookCredential);

    const splittedName = userInfo.user.displayName?.split(' ');
    let fbFirstName = '';
    let fbLastName = '';

    if (splittedName && splittedName.length >= 2) {
      fbFirstName = splittedName[0];
      fbLastName = splittedName[1];
    }

    dispatch(signIn({
      userId: userInfo.user.uid,
      profilePictureUrl: userInfo.user.photoURL ?? "",
      firstName: fbFirstName,
      lastName: fbLastName,
      email: userInfo.user.email ?? "",
      provider: "facebook"
    }));
  }

  return (
    <View style={styles.container}>
      <Button icon="google" mode="contained" style={[styles.signInButton, {marginBottom: 10}]} labelStyle={styles.signInButtonText} onPress={onGoogleLogin}>
        Sign in with Google
      </Button>
      <Button icon="facebook" mode="contained" style={styles.signInButton} labelStyle={styles.signInButtonText} onPress={onFacebookLogin}>
        Sign in with Facebook
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
  signInButtonText: {
    fontSize: 16
  },
  signInButton: {
    width: "75%"
  }
});


export default SignIn;