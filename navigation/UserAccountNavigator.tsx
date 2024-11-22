import { createStackNavigator } from "@react-navigation/stack";
import UserAccount from "../screens/UserAccount";
import AppSettings from "../screens/AppSettings";


function UserAccountNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="UserAccount">
      <Stack.Screen name="UserAccount" component={UserAccount} options={{title: "Uživatelský účet"}} />
      <Stack.Screen name="Settings" component={AppSettings} options={{title: "Nastavení"}} />
    </Stack.Navigator>
  );
}

export default UserAccountNavigator;