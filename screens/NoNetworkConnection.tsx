import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-paper";

function NoNetworkConnection() {
  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        No network connection
      </Text>
      <Icon source="emoticon-sad-outline" color="rgba(220, 220, 220, 0.5)" size={120}></Icon>
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
    fontSize: 24,
    textAlign: "center",
    margin: 10,
    color: "rgba(220, 220, 220, 0.5)"
  }
});

export default NoNetworkConnection