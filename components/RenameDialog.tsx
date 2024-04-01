import { Button, Dialog, Portal } from "react-native-paper";
import RouteName from "./RouteName";
import { View } from "react-native";
import { useState } from "react";
import { RenameDialogProps } from "../types";

function RenameDialog(props: RenameDialogProps) {
  const [name, setName] = useState<string>("");
  const [showValidationMessage, setShowValidationMessage] = useState<boolean>(false);

  function cancelPress() {
    setName("");
    setShowValidationMessage(false);
    props.onCancel();
  }

  function renamePress(entryId: number | string, name: string) {
    if (name.length === 0) {
      setShowValidationMessage(true);
    } else {
      setShowValidationMessage(false);
      props.onRename(entryId, name);
    }
  }

  return (
    <Portal>
      <Dialog visible={props.isVisible} onDismiss={cancelPress}>
        <Dialog.Content>
        <RouteName routeName={name} showValidationMessage={showValidationMessage} onNameChange={setName}/>
        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
          <Button mode="text" textColor="#EF5350" onPress={cancelPress}>Zrušit</Button>
          <Button mode="text" textColor="#66BB6A" onPress={() => renamePress(props.entryId, name)}>Přejmenovat</Button>
        </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

export default RenameDialog;