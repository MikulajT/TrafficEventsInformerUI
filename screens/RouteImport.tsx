import { ToastAndroid, View } from "react-native";
import GlobalStyles from "../assets/GlobalStyles";
import FilePicker from "../components/FilePicker";
import { useState } from "react";
import RouteName from "../components/RouteName";

function RouteImport({ navigation } : any) {
  const [routeName, setRouteName] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

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
        try {
          const response = await fetch("http://192.168.88.7:7246/api/trafficRoutes", {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: formData,
          });
          if (response.ok) {
            ToastAndroid.show("Trasa byla úspěšně importována",ToastAndroid.SHORT);
            navigation.navigate("Routes");
          } else {
            ToastAndroid.show("Nastala chyba během importování trasy",ToastAndroid.SHORT);
          }
        } catch (error) {
          ToastAndroid.show("Nastala chyba během importování trasy",ToastAndroid.SHORT);
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