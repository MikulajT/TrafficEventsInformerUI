import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import ConfirmDialog from "../components/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/Store";

function UserAccount({ navigation } : any) {
  const [isSignOutDialogVisible, setIsSignOutDialogVisible] = useState<boolean>(false); 
  const { profilePictureUrl, firstName, lastName, email } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  async function signUserOut() {
    try {
      setIsSignOutDialogVisible(false);
      GoogleSignin.configure({});
      await GoogleSignin.signOut();
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <View style={styles.profileInfoContainer}>
        <Image source={{ uri: profilePictureUrl || 'https://via.placeholder.com/100' }} style={styles.profilePicture} />
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{firstName} {lastName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      {/* <Button icon='cog' mode='contained' style={{marginBottom: 10}} onPress={() => {navigation.navigate('Settings')}}>
        Nastavení
      </Button> */}
      <Button icon='logout' mode='contained' onPress={() => {setIsSignOutDialogVisible(true)}}>
        Odhlásit se
      </Button>
      <ConfirmDialog 
            isVisible={isSignOutDialogVisible}
            title="Upozornění" 
            textContent="Opravdu se chcete odhlásit?" 
            showCheckbox={false}
            onCancelPress={() => {setIsSignOutDialogVisible(false)}} 
            onConfirmPress={signUserOut}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  userInfoContainer: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
  }
});

export default UserAccount;