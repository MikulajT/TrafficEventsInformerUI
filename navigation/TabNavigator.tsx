import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TrafficRoutesNavigator from "./TrafficRoutesNavigator";
import AppInfo from "../screens/AppInfo";
import SignIn from "../screens/SignIn";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import UserAccountNavigator from "./UserAccountNavigator";
import { useEffect } from "react";
import RouteEventsRequest from '../api/RouteEventsRequests';
import RouteRequests from "../api/RouteRequests";

function TabNavigator() {
  const Tab = createBottomTabNavigator();
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  const routeRequests = new RouteRequests();
  const routeEventsRequests = new RouteEventsRequest();

  useEffect(() => {
    async function syncAllRouteEvents() {
      const userHasRoutes = (await routeRequests.getTrafficRoutes())?.data ?? false;

      if (isSignedIn && userHasRoutes) {
        console.log("Tab navigator mounted, user signed in and has routes -> sync all route events");
        const response = await routeEventsRequests.syncAllRouteEvents();
        if (response.success) {
          console.log("All routes events synced");
        }
        else {
          console.log("Error occured during sync of all route events");
        }
      }
    }

    syncAllRouteEvents();
  }, []);

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