import { Pressable, StyleSheet, Text, View } from "react-native";
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
      <Pressable style={styles.button} onPress={props.onPress}>
        <Text style={styles.buttonText}>{props.text}</Text>
      </Pressable>
      <Menu
          visible={isMenuVisible}
          onDismiss={() => setIsMenuVisible(false)}
          statusBarHeight={50}
          anchor={<Pressable style={styles.menuButton} onPress={() => setIsMenuVisible(true)}>
                    <Icon source="menu" color="white" size={30}></Icon>
                  </Pressable>}>
          {renderMenuItems(props.id, props.menuItems)}
        </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButtonContainer: {
    flex: 1, 
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
    height: "100%",
    alignItems: "center"
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
  menuButton: {
    marginLeft: 10,
    borderRadius: 15,
    backgroundColor: "#007AFF",
  }
});

export default MenuButton;