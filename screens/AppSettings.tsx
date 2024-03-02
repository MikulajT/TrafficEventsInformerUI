import { ToastAndroid, View } from "react-native";
import GlobalStyles from "../assets/GlobalStyles";
import IconButton from "../components/IconButton";
import RouteEventsRequest from "../api/RouteEventsRequests";
import Config from "react-native-config";

function AppSettings() {
  const routeEventsRequests = new RouteEventsRequest(`${Config.TEI_API_KEY}/trafficRoutes`);

  async function syncAllRouteEvents() {
    const response = await routeEventsRequests.syncAllRouteEvents();
    ToastAndroid.show("Začala synchronizace dopravních událostí", ToastAndroid.LONG);
    if (response.success) {
      ToastAndroid.show("Synchronizace dopravních událostí byla dokončena", ToastAndroid.LONG);
    }
    else {
      ToastAndroid.show("Nastala chyba během synchronizace dopravních událostí", ToastAndroid.LONG);
    }
  }

  return (
    <View style={GlobalStyles.viewContainer}>
      <IconButton icon="refresh" text="Aktualizovat dopravní události" onPress={syncAllRouteEvents}></IconButton>
    </View>
  );
}

export default AppSettings;