import { ToastAndroid, View } from "react-native";
import GlobalStyles from "../assets/GlobalStyles";
import IconButton from "../components/IconButton";

function AppSettings() {

  async function syncAllRouteEvents() {
    try {
      ToastAndroid.show("Začala synchronizace dopravních událostí", ToastAndroid.LONG);
      const response = await fetch(`http://192.168.88.7:7246/api/trafficRoutes/events/sync`, {
        method: "POST"
      });
      if (response.ok) {
        ToastAndroid.show("Synchronizace dopravních událostí byla dokončena", ToastAndroid.LONG);
      } else {
        ToastAndroid.show("Nastala chyba během synchronizace dopravních událostí", ToastAndroid.LONG);
      }
    } catch (error) {
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