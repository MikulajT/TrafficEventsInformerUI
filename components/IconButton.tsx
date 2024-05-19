import { StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconButtonProps } from "../types";
import { Button } from "react-native-paper";

function IconButton(props: IconButtonProps) {
  return (
    <Button mode="contained" style={props.style} onPress={props.onPress}>
      <Icon name={props.icon} size={20} style={{ color: "white" }}/>
      <Text style={{ fontSize: 20, color: "white"}}>{props.text}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
});

export default IconButton;