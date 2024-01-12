import { Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { RouteMenuButtonProps } from "../types";
import { Button, Dialog, Icon, Menu, Portal } from "react-native-paper";
import { useState } from "react";
import RouteName from "./RouteName";
import RouteRequests from "../api/RouteRequests";

function RouteMenuButton(props: RouteMenuButtonProps) {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [routeName, setRouteName] = useState<string>("");
  const routeRequests = new RouteRequests("http://192.168.88.7:7246/api/trafficRoutes");

  async function renameRoute(routeId: number, routeName: string) {
    const success = await routeRequests.renameRoute(routeId, routeName);
    if (success) {
      ToastAndroid.show("Trasa byla přejmenována", ToastAndroid.LONG);
    }
    else {
      ToastAndroid.show("Nastala chyba během změny názvu trasy", ToastAndroid.LONG);
    }
    setIsDialogVisible(false);
  }

  return (
    <View style={styles.menuButtonContainer}>
      <Pressable style={styles.button} onPress={props.onButtonPress}>
        <Text style={styles.buttonText}>{props.routeName}</Text>
      </Pressable>
      <View style={styles.verticleLine}></View>
      <Menu
          visible={isMenuVisible}
          onDismiss={() => setIsMenuVisible(false)}
          statusBarHeight={50}
          anchor={<Pressable style={styles.menuButton} onPress={() => setIsMenuVisible(true)}>
                    <Icon source="menu" color="white" size={40}></Icon>
                  </Pressable>}>
          <Menu.Item leadingIcon="pencil" onPress={() => setIsDialogVisible(true)} title="Změnit název trasy" />
          <Menu.Item leadingIcon="delete" /*onPress={() => props.onMenuButtonPress(props.id, Operation.Delete)}*/ title="Odstranit trasu" />
        </Menu>
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
          <Dialog.Content>
          <RouteName routeName={routeName} onNameChange={setRouteName}/>
          <View style={{flexDirection: "row", justifyContent: "space-around"}}>
            <Button mode="text" textColor="#EF5350" onPress={() => setIsDialogVisible(false)}>Zrušit</Button>
            <Button mode="text" textColor="#66BB6A" onPress={() => renameRoute(props.routeId, routeName)}>Přejmenovat</Button>
          </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButtonContainer: {
    flex: 1, 
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10
  },
  button: {
    flex: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: "#007AFF"
  },
  buttonText: {
    fontSize: 20,
    color: "white", 
    textAlign: "center"
  },
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#F2F3F5"
  },
  menuButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: "#007AFF"
  }
});

export default RouteMenuButton;