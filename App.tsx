import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTabNavigator from './HomeTabNavigator';
import AppSettings from './AppSettings';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppInfo from './AppInfo';

const Tab  = createBottomTabNavigator();

function App() {
  return (
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
  );
}

export default App;
