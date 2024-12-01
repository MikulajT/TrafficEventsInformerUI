import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TrafficRoutesNavigator from "./TrafficRoutesNavigator";
import AppInfo from "../screens/AppInfo";
import UserAccountNavigator from "./UserAccountNavigator";
import { useEffect } from "react";
import RouteEventsRequest from '../api/RouteEventsRequests';
import RouteRequests from "../api/RouteRequests";

function TabNavigator() {
  const Tab = createBottomTabNavigator();
  const routeRequests = new RouteRequests();
  const routeEventsRequests = new RouteEventsRequest();

  useEffect(() => {
    async function syncAllRouteEvents() {
      const userHasRoutes = (await routeRequests.getUsersRoutes())?.data ?? false;

      if (userHasRoutes) {
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
  }

  return renderComponent();
}

export default TabNavigator;