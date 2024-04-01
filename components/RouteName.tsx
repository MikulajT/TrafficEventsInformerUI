import { Appearance, StyleSheet, Text, TextInput } from "react-native";
import GlobalStyles from "../assets/GlobalStyles";
import { RouteNameProps } from "../types";


function RouteName(props: RouteNameProps) {
  const colorScheme = Appearance.getColorScheme();

  return (
    <>
      <Text style={[styles.label, { color: (colorScheme == "dark" ? "white" : "black") }]}>Název
        <Text style={{ color: "red" }}> *</Text>
      </Text>
      <TextInput value={props.routeName} onChangeText={props.onNameChange} style={[styles.textInput, GlobalStyles.formField, { borderColor: (colorScheme == "dark" ? "white" : "black") }]}/>
      <Text style={{ color: "red", marginBottom: props.showValidationMessage ? 16 : 0 }}>{props.showValidationMessage ? "Název je povinný" : ""}</Text>
    </>
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

export default RouteName;