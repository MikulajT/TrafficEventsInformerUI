import { StyleSheet, Text } from "react-native";
import { ScrollButtonProps } from "../types";
import { Button } from "react-native-paper";

function SimpleTextButton(props: ScrollButtonProps) {
  return (
    <Button mode="contained" style={styles.pressable} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  pressable: {
    paddingVertical: 5,
    marginVertical: 10, 
    marginHorizontal: 10, 
    borderRadius: 15
  },
  text: {
    fontSize: 20,
    color: "white", 
    textAlign: "center"
  }
});

export default SimpleTextButton;