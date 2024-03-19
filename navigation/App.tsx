import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTabNavigator from './HomeTabNavigator';
import AppSettings from '../screens/AppSettings';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppInfo from '../screens/AppInfo';
import { PaperProvider } from 'react-native-paper';
import BackgroundFetch from 'react-native-background-fetch';

function App() {
  // Configure the background fetch
  BackgroundFetch.configure({
    minimumFetchInterval: 1,//28800, // Minimum interval in seconds (8 hours)
    stopOnTerminate: false, // Continue background fetch even if the app is terminated
    startOnBoot: true, // Start background fetch on device boot
  }, async (taskId) => {
    // Your background fetch task logic here (e.g., make API requests)
    console.log('Background fetch task executed with taskId:', taskId);
    BackgroundFetch.finish(taskId);
  }, async (taskId) => {  
    // Task timeout callback
    // This task has exceeded its allowed running-time.
    // You must stop what you're doing and immediately .finish(taskId)
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
