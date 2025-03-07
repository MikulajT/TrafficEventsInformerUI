import { StyleSheet, Text, View } from "react-native";
import { MenuBottonItem, MenuButtonProps as MenuButtonProps } from "../Types";
import { Button, Menu } from "react-native-paper";
import { useState } from "react";


function MenuButton(props: MenuButtonProps) {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  function renderMenuItems(entryId: number | string, menuItems: MenuBottonItem[]) {
    let result = [];
    for (let i = 0; i < menuItems.length; i++) {
      result.push(
        <Menu.Item
          key={i} 
          leadingIcon={menuItems[i].icon} 
          onPress={() => {
            setIsMenuVisible(false); 
            menuItems[i].onPress(entryId)}} 
          title={menuItems[i].text}/>
      );   
    }
    return result;
  }

  return (
    <View style={styles.menuButtonContainer}>
      <Menu
          visible={isMenuVisible}
          onDismiss={() => setIsMenuVisible(false)}
          statusBarHeight={50}
          anchor={
            <Button 
              mode="contained"
              rippleColor="#007AFF"
              style={styles.button} 
              onPress={props.onPress} 
              onLongPress={() => setIsMenuVisible(true)}
              disabled={props.disabled}>
              <Text style={styles.buttonText}>{props.text}</Text>
            </Button>
          }>
          {renderMenuItems(props.id, props.menuItems)}
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButtonContainer: {
    flex: 1, 
    marginBottom: 10
  },
  button: {
    flex: 1,
    justifyContent: "center",
    height: 40,
    borderRadius: 15
  },
  buttonText: {
    fontSize: 20,
    color: "white", 
    textAlign: "center"
  },
  menuButton: {
    marginLeft: 10,
    borderRadius: 15
  }
});

export default MenuButton;