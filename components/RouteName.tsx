import { useState } from "react";
import { Appearance, StyleSheet, Text, TextInput } from "react-native";
import GlobalStyles from "../assets/GlobalStyles";
import { RouteNameProps } from "../types";


function RouteName(props: RouteNameProps) {
  const [showValidationMessage, setShowValidationMessage] = useState<boolean>(props.showValidationMessage ?? false);
  const colorScheme = Appearance.getColorScheme();

  function updateRouteName(text : string) {
    props.onNameChange(text);
    if (text.length > 0) {
      setShowValidationMessage(false);
    } else {
      setShowValidationMessage(true);
    }
  }

  return (
    <>
    <Text style={[styles.label, { color: (colorScheme == "dark" ? "white" : "black") }]}>Název trasy
      <Text style={{ color: "red" }}> *</Text>
    </Text>
    <TextInput value={props.routeName} onChangeText={updateRouteName} style={[styles.textInput, GlobalStyles.formField, { borderColor: (colorScheme == "dark" ? "white" : "black") }]}/>
    <Text style={{ color: "red", marginBottom: showValidationMessage ? 16 : 0 }}>{showValidationMessage ? "Název trasy je povinný" : ""}</Text>
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