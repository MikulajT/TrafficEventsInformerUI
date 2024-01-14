import { ToastAndroid, View } from "react-native";
import GlobalStyles from "../assets/GlobalStyles";
import FilePicker from "../components/FilePicker";
import { useState } from "react";
import RouteName from "../components/RouteName";
import RouteRequests from "../api/RouteRequests";

function RouteImport({ navigation } : any) {
  const [routeName, setRouteName] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const routeRequests = new RouteRequests("http://192.168.88.7:7246/api/trafficRoutes");

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
          ToastAndroid.show("Trasa byla úspěšně importována",ToastAndroid.LONG);
          navigation.navigate("Routes");
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