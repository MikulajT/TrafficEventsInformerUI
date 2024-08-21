import { Button, Checkbox, Dialog, Portal, Text } from "react-native-paper";
import { ConfirmDialogProps } from "../Types";
import { useState } from "react";
import { View } from "react-native";

function ConfirmDialog(props: ConfirmDialogProps) {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <Portal>
      <Dialog visible={props.isVisible} onDismiss={props.onCancelPress}>
        <Dialog.Title>{props.title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{props.textContent}</Text>
          {
            props.showCheckbox &&
              <Checkbox.Item
              label="Upozornění již nezobrazovat"
              position="leading"
                status={checked ? "checked" : "unchecked"} 
                onPress={() => setChecked(!checked)}
              />
          }
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={props.onCancelPress}>Ne</Button>
          <Button onPress={() => props.onConfirmPress(checked)}>Ano</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default ConfirmDialog;