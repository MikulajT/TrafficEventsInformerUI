import { createStackNavigator } from "@react-navigation/stack";
import RouteImport from "./RouteImport";
import Routes from "./Routes";
import Incidents from "./Incidents";
import IncidentDetail from "./IncidentDetail";

const Stack = createStackNavigator();

function HomeTabNavigator() {
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