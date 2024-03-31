import { Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { RouteMenuButtonProps } from "../types";
import { Button, Dialog, Icon, Menu, Portal } from "react-native-paper";
import { useState } from "react";
import RouteName from "./RouteName";
import RouteRequests from "../api/RouteRequests";
import ConfirmDialog from "./ConfirmDialog";
import Config from "react-native-config";

function RouteMenuButton(props: RouteMenuButtonProps) {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isRenameDialogVisible, setIsRenameDialogVisible] = useState<boolean>(false);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState<boolean>(false);
  const [routeName, setRouteName] = useState<string>("");
  const [showRenameValidationMessage, setShowRenameValidationMessage] = useState<boolean>(false);
  const routeRequests = new RouteRequests(`${Config.TEI_API_KEY}/trafficRoutes`);

  async function renameRoute(routeId: number, routeName: string) {
    if (routeName.length === 0) {
      setShowRenameValidationMessage(true);
    } else {
      setShowRenameValidationMessage(false);
      const result = await routeRequests.renameRoute(routeId, routeName);
      if (result.success) {
        props.onRefreshRoutes?.();
        ToastAndroid.show("Trasa byla přejmenována", ToastAndroid.LONG);
      }
      else {
        ToastAndroid.show("Nastala chyba během změny názvu trasy", ToastAndroid.LONG);
      }
      closeRenameDialog();
    }
  }

  async function deleteRoute(routeId: number) {
    const result = await routeRequests.deleteRoute(routeId);
    if (result.success) {
      props.onRefreshRoutes?.();
      ToastAndroid.show("Trasa byla odstraněna", ToastAndroid.LONG);
    }
    else {
      ToastAndroid.show("Nastala chyba během odstraňování trasy", ToastAndroid.LONG);
    }
    closeDeleteDialog();
  }

  function showRenameDialog() {
    setIsRenameDialogVisible(true);
    setIsMenuVisible(false);
  }

  function closeRenameDialog() {
    setIsRenameDialogVisible(false);
    setRouteName("");
    setShowRenameValidationMessage(false);
  }

  function showDeleteDialog() {
    setIsDeleteDialogVisible(true);
    setIsMenuVisible(false);
  }

  function closeDeleteDialog() {
    setIsDeleteDialogVisible(false);
  }

  return (
    <View style={styles.menuButtonContainer}>
      <Pressable style={styles.button} onPress={props.onButtonPress}>
        <Text style={styles.buttonText}>{props.routeName}</Text>
      </Pressable>
      {/* <View style={styles.verticleLine}></View> */}
      <Menu
          visible={isMenuVisible}
          onDismiss={() => setIsMenuVisible(false)}
          statusBarHeight={50}
          anchor={<Pressable style={styles.menuButton} onPress={() => setIsMenuVisible(true)}>
                    <Icon source="menu" color="white" size={30}></Icon>
                  </Pressable>}>
          <Menu.Item leadingIcon="pencil" onPress={showRenameDialog} title="Změnit název trasy" />
          <Menu.Item leadingIcon="delete" onPress={showDeleteDialog} title="Odstranit trasu" />
        </Menu>
      <ConfirmDialog 
        isVisible={isDeleteDialogVisible}
        title="Upozornění" 
        textContent="Opravdu chcete odstranit trasu?" 
        onCancelPress={closeDeleteDialog} 
        onConfirmPress={() => deleteRoute(props.routeId)}/>
      <Portal>
        <Dialog visible={isRenameDialogVisible} onDismiss={() => closeRenameDialog()}>
          <Dialog.Content>
          <RouteName routeName={routeName} showValidationMessage={showRenameValidationMessage} onNameChange={setRouteName}/>
          <View style={{flexDirection: "row", justifyContent: "space-around"}}>
            <Button mode="text" textColor="#EF5350" onPress={() => closeRenameDialog()}>Zrušit</Button>
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
    borderRadius: 15,
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
    marginLeft: 10,
    borderRadius: 15,
    backgroundColor: "#007AFF"
  }
});

export default RouteMenuButton;