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
  const [showRenameValidationMessage, setShowRenameValidationMessage] = useState<boolean>(false);
  const routeRequests = new RouteRequests("http://192.168.88.7:7246/api/trafficRoutes");

  async function renameRoute(routeId: number, routeName: string) {
    if (routeName.length === 0) {
      setShowRenameValidationMessage(true);
    } else {
      setShowRenameValidationMessage(false);
      const success = await routeRequests.renameRoute(routeId, routeName);
      if (success) {
        props.onRefreshRoutes?.();
        ToastAndroid.show("Trasa byla přejmenována", ToastAndroid.LONG);
      }
      else {
        ToastAndroid.show("Nastala chyba během změny názvu trasy", ToastAndroid.LONG);
      }
      closeDialog();
    }
  }

  async function deleteRoute(routeId: number) {
    const success = await routeRequests.deleteRoute(routeId);
    if (success) {
      props.onRefreshRoutes?.();
      ToastAndroid.show("Trasa byla odstraněna", ToastAndroid.LONG);
    }
    else {
      ToastAndroid.show("Nastala chyba během odstraňování trasy", ToastAndroid.LONG);
    }
    closeDialog();
  }

  function closeDialog() {
    setIsDialogVisible(false);
    setRouteName("");
    setShowRenameValidationMessage(false);
  }

  function showRenameDialog() {
    setIsDialogVisible(true)
    setIsMenuVisible(false);
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
          <Menu.Item leadingIcon="pencil" onPress={showRenameDialog} title="Změnit název trasy" />
          <Menu.Item leadingIcon="delete" onPress={() => deleteRoute(props.routeId)} title="Odstranit trasu" />
        </Menu>
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={() => closeDialog()}>
          <Dialog.Content>
          <RouteName routeName={routeName} showValidationMessage={showRenameValidationMessage} onNameChange={setRouteName}/>
          <View style={{flexDirection: "row", justifyContent: "space-around"}}>
            <Button mode="text" textColor="#EF5350" onPress={() => closeDialog()}>Zrušit</Button>
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