import { View } from "react-native";
import GlobalStyles from "../assets/GlobalStyles";
import { Text } from "react-native-paper";

function AppInfo() {
  return (
    <View style={[GlobalStyles.viewContainer, {display: "flex", flexDirection: "row"}]}>
      <Text style={{fontSize: 16}}>Verze aplikace: </Text>
      <Text style={{fontSize: 16}}>0.0.1</Text>
    </View>
  );
}

export default AppInfo;