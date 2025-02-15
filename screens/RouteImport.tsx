import { ToastAndroid, View } from "react-native";
import GlobalStyles from "../assets/GlobalStyles";
import FilePicker from "../components/FilePicker";
import { useState } from "react";
import RouteName from "../components/RouteName";
import RouteRequests from "../api/RouteRequests";
import ActivityIndicatorOverlay from "../components/ActivityIndicatorOverlay";

function RouteImport({ route, navigation } : any) {
  const [routeName, setRouteName] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const routeRequests = new RouteRequests();

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
  
        setIsLoading(true);
        try {
          const response = await routeRequests.addRoute(formData);
  
          if (response.success) {
            ToastAndroid.show("Trasa byla úspěšně importována", ToastAndroid.SHORT);
            if (response.data) {
              //syncRouteEvents();
              route.params.syncAllRouteEvents();
            }
            navigation.navigate("Routes", { refreshRoutes: true });
          } else {
            ToastAndroid.show("Nastala chyba během importování trasy", ToastAndroid.LONG);
          }
        } catch (error) {
          console.error("Error during route upload:", error);
          ToastAndroid.show("Nastala neočekávaná chyba", ToastAndroid.LONG);
        } finally {
          setIsLoading(false);
        }
      } else {
        ToastAndroid.show("Vyberte prosím soubor s příponou .gpx", ToastAndroid.SHORT);
      }
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <View style={[GlobalStyles.viewContainer, {flex: 1}]}>
      <View style={{flex: 1}}>
        <RouteName routeName={routeName} showValidationMessage={!isFormValid} onNameChange={setRouteName}/>
        <FilePicker uploadDocument={uploadDocument}/>
      </View>
      {isLoading && <ActivityIndicatorOverlay/>}
    </View>
  );
}

export default RouteImport;