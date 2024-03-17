import { createStackNavigator } from "@react-navigation/stack";
import RouteImport from "../screens/RouteImport";
import Routes from "../screens/Routes";
import Incidents from "../screens/Incidents";
import IncidentDetail from "../screens/IncidentDetail";
import { useNavigation } from "@react-navigation/native";
import usePushNotification from "../hooks/UsePushNotification";
import { useEffect } from "react";

function HomeTabNavigator() {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification(navigation);

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        getFCMToken();
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
  }, []);

  return (
    <Stack.Navigator initialRouteName="Routes">
      <Stack.Screen name="Routes"  component={Routes} options={{title: "Seznam tras"}} />
      <Stack.Screen name="RouteImporter" component={RouteImport} options={{title: "Import trasy"}} />
      <Stack.Screen name="Incidents" component={Incidents} options={{title: "Dopravní události na trase"}} />
      <Stack.Screen name="IncidentDetail" component={IncidentDetail} options={{title: "Detail dopravní události"}} />
    </Stack.Navigator>
  );
}

export default HomeTabNavigator;