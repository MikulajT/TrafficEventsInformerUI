import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Appearance } from 'react-native';
import GlobalStyles from "./GlobalStyles";
import FilePicker from "./FilePicker";
import { useState } from "react";

function RouteImport({ navigation } : any) {
  const colorScheme = Appearance.getColorScheme();
  const [routeName, setRouteName] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  function updateRouteName(routeName : string) {
    setRouteName(routeName);
    setIsFormValid(true);
  }

  function uploadDocument(selectedFile: any) {
    if (routeName.trim() !== "") {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', {
          uri: selectedFile.uri,
          type: selectedFile.type,
          name: selectedFile.name,
        });
  
        // TODO: use axios to send the file to the server
        try {
          ToastAndroid.show("Trasa byla úspěšně importována",ToastAndroid.SHORT);
          navigation.navigate("Routes");
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
        <Text style={[styles.label, {color: (colorScheme == "dark" ? "white" : "black")}]}>Název trasy
          <Text style={{color: "red"}}> *</Text>
        </Text>
        <TextInput value={routeName} onChangeText={updateRouteName} style={[styles.textInput, GlobalStyles.formField, {borderColor: (colorScheme == "dark" ? "white" : "black")}]}></TextInput>
        <Text style={{color: "red", marginBottom: isFormValid ? 0 : 16}}>{isFormValid ? "" : "Název trasy je povinný"}</Text>
        <FilePicker uploadDocument={uploadDocument}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  iconButton: {
    height: 40,
    borderWidth: 1,
    flexDirection: "row", 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 100
  }
});

export default RouteImport;