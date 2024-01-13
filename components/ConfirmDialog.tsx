import { Button, Dialog, Portal, Text } from "react-native-paper";
import { ConfirmDialogProps } from "../types";

function ConfirmDialog(props: ConfirmDialogProps) {
  return (
    <Portal>
      <Dialog visible={props.isVisible} onDismiss={props.onCancelPress}>
        <Dialog.Title>{props.title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{props.textContent}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={props.onCancelPress}>Zrušit</Button>
          <Button onPress={props.onConfirmPress}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default ConfirmDialog;