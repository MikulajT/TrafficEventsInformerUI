import { Pressable, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { MenuBottonItem, MenuButtonProps as MenuButtonProps } from "../types";
import { Icon, Menu } from "react-native-paper";
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
          //style={{flex: 1}}
          visible={isMenuVisible}
          onDismiss={() => setIsMenuVisible(false)}
          statusBarHeight={50}
          anchor={
            <TouchableHighlight 
              underlayColor="rgba(0, 122, 255, 0.7)" 
              style={styles.button} 
              onPress={props.onPress} 
              onLongPress={() => setIsMenuVisible(true)}>
              <Text style={styles.buttonText}>{props.text}</Text>
            </TouchableHighlight>
          }>
          {renderMenuItems(props.id, props.menuItems)}
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButtonContainer: {
    flex: 1, 
    marginBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    height: 40,
    borderRadius: 15,
    backgroundColor: "#007AFF",
  },
  buttonText: {
    fontSize: 20,
    color: "white", 
    textAlign: "center"
  },
  menuButton: {
    marginLeft: 10,
    borderRadius: 15,
    backgroundColor: "#007AFF",
  }
});

export default MenuButton;