import { ToastAndroid, View } from "react-native";
import GlobalStyles from "../assets/GlobalStyles";
import FilePicker from "../components/FilePicker";
import { useState } from "react";
import RouteName from "../components/RouteName";
import RouteRequests from "../api/RouteRequests";
import RouteEventsRequest from "../api/RouteEventsRequests";

function RouteImport({ navigation } : any) {
  const [routeName, setRouteName] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const routeRequests = new RouteRequests();
  const routeEventsRequests = new RouteEventsRequest();

  async function uploadDocument(selectedFile: any) {
    if (routeName.trim() !== "") {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("RouteName", routeName);
        formData.append("RouteFile", {
          uri: selectedFile.uri,
          type: selectedFile.type,
          name: selectedFile.name,
        });
        const response = await routeRequests.addRoute(formData);
        if (response.success) {
          ToastAndroid.show("Trasa byla úspěšně importována",ToastAndroid.SHORT);
          if (response.data) {
            syncRouteEvents();
          }
          navigation.navigate("Routes", { refreshRoutes: true });
        }
        else {
          ToastAndroid.show("Nastala chyba během importování trasy",ToastAndroid.LONG);
        }
      } else {
        ToastAndroid.show("Vyberte prosím soubor s příponou .gpx",ToastAndroid.SHORT);
      }
    }
    else {
      setIsFormValid(false);
    }
  };

  async function syncRouteEvents() {
    ToastAndroid.show("Začala synchronizace dopravních událostí importované trasy", ToastAndroid.LONG);
    const response = await routeEventsRequests.syncAllRouteEvents();
    if (response.success) {
      ToastAndroid.show("Synchronizace dopravních událostí importované trasy byla dokončena", ToastAndroid.LONG);
    } else {
      ToastAndroid.show("Nastala chyba během synchronizace dopravních událostí", ToastAndroid.LONG);
    }
  }

  return (
    <View style={[GlobalStyles.viewContainer, {flex: 1}]}>
      <View style={{flex: 1}}>
        <RouteName routeName={routeName} showValidationMessage={!isFormValid} onNameChange={setRouteName}/>
        <FilePicker uploadDocument={uploadDocument}/>
      </View>
    </View>
  );
}

export default RouteImport;