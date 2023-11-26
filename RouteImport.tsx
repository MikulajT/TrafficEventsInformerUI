import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Appearance } from 'react-native';
import GlobalStyles from "./GlobalStyles";
import FilePicker from "./FilePicker";

function RouteImport({ navigation } : any) {
  const colorScheme = Appearance.getColorScheme();

  function uploadDocument(selectedFile: any) {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: selectedFile.name,
      });

      // TODO: use axios to send the file to the server
      try {
        ToastAndroid.show("Route imported",ToastAndroid.SHORT);
        navigation.navigate("Routes");
      } catch (error) {
        ToastAndroid.show("Error occured when uploading route",ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show("Please pick a .gpx file first",ToastAndroid.SHORT);
    }
  };

  return (
    <View style={[GlobalStyles.viewContainer, {flex: 1}]}>
      <View style={{flex: 1}}>
        <Text style={[styles.label, {color: (colorScheme == "dark" ? "white" : "black")}]}>Route name</Text>
        <TextInput style={[styles.textInput, GlobalStyles.formField, {borderColor: (colorScheme == "dark" ? "white" : "black")}]}></TextInput>
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