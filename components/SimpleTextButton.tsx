import { Pressable, StyleSheet, Text } from "react-native";
import { ScrollButtonProps } from "../types";

function SimpleTextButton(props: ScrollButtonProps) {
  return (
    <Pressable style={styles.pressable} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    paddingVertical: 5,
    marginVertical: 10, 
    marginHorizontal: 10, 
    borderRadius: 15,
    backgroundColor: "#007AFF"
  },
  text: {
    fontSize: 20,
    color: "white", 
    textAlign: "center"
  }
});

export default SimpleTextButton;