import { Pressable, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconButtonProps } from "../types";

function IconButton(props: IconButtonProps) {
  return (
    <Pressable style={[styles.iconButton, props.style]} onPress={props.onPress}>
      <Icon name={props.icon} size={25} style={{ color: "white" }}/>
      <Text style={{ fontSize: 20, color: "white", marginLeft: 5 }}>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    height: 35,
    flexDirection: "row", 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF"
  }
});


export default IconButton;