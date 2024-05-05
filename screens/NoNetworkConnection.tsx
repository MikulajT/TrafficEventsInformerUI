import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";

function NoNetworkConnection() {
  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        No network connection
      </Text>
      <Icon source="emoticon-sad" color="white" size={120}></Icon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D3D3D3",
  },
  statusText: {
    fontSize: 18,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
  }
});

export default NoNetworkConnection