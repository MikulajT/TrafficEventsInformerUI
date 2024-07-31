import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TrafficRoutesNavigator from "./TrafficRoutesNavigator";
import AppInfo from "../screens/AppInfo";
import SignIn from "../screens/SignIn";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import UserAccount from "../screens/UserAccount";
import UserAccountNavigator from "./UserAccountNavigator";

function TabNavigator() {
  const Tab = createBottomTabNavigator();
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);

  function renderComponent() {
    if (isSignedIn) {
      return (
        <NavigationContainer>
          <Tab.Navigator initialRouteName="HomeTabNavigator">
            <Tab.Screen 
              name="Trasy" 
              component={TrafficRoutesNavigator} 
              options={{
                tabBarLabel: "Trasy",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="routes" color={color} size={size} />
                ),
                headerShown: false
              }}
            />
            <Tab.Screen 
              name="Informace o aplikaci" 
              component={AppInfo}
              options={{
                tabBarLabel: "Info",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="information" color={color} size={size} />
                )
              }} 
            />
            <Tab.Screen
              name="Uživatelský účet"
              component={UserAccountNavigator}
              options={{
                tabBarLabel: "Účet",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
                headerShown: false
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <SignIn/>
        </NavigationContainer>  
    );
    }
  }

  return renderComponent();
}

export default TabNavigator;