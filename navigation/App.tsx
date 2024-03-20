import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTabNavigator from './HomeTabNavigator';
import AppSettings from '../screens/AppSettings';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppInfo from '../screens/AppInfo';
import { PaperProvider } from 'react-native-paper';
import BackgroundFetch from 'react-native-background-fetch';
import RouteEventsRequest from '../api/RouteEventsRequests';
import Config from 'react-native-config';

function App() {
  BackgroundFetch.configure({
    minimumFetchInterval: 1,//28800, // Minimum interval in seconds (8 hours)
    stopOnTerminate: false,
    startOnBoot: true,
  }, async (taskId) => {
    new RouteEventsRequest(`${Config.TEI_API_KEY}/trafficRoutes`).syncAllRouteEvents();
    console.log("Sync all route events.");
    BackgroundFetch.finish(taskId);
  }, async (taskId) => {  
    BackgroundFetch.finish(taskId);
  });

  const Tab  = createBottomTabNavigator();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="HomeTabNavigator">
          <Tab.Screen 
            name="Trasy" 
            component={HomeTabNavigator} 
            options={{
              tabBarLabel: "Trasy",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="routes" color={color} size={size} />
              ),
              headerShown: false
            }}
          />
          <Tab.Screen 
            name="Nastavení" 
            component={AppSettings}
            options={{
              tabBarLabel: "Nastavení",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="cog" color={color} size={size} />
              )
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
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
