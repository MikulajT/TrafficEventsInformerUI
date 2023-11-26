import { createStackNavigator } from "@react-navigation/stack";
import RouteImport from "./RouteImport";
import Routes from "./Routes";
import Incidents from "./Incidents";
import IncidentDetail from "./IncidentDetail";

const Stack = createStackNavigator();

function HomeTabNavigator() {
  return (
    <Stack.Navigator initialRouteName="Routes">
      <Stack.Screen name="Routes" component={Routes} options={{ headerShown: false }} />
      <Stack.Screen name="RouteImporter" component={RouteImport} options={{ headerShown: false }} />
      <Stack.Screen name="Incidents" component={Incidents} options={{ headerShown: false }} />
      <Stack.Screen name="IncidentDetail" component={IncidentDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default HomeTabNavigator;