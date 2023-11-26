import { Alert, Linking, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import GlobalStyles from "./GlobalStyles";
import IconButton from "./IconButton";

async function ShowIncidentOnMap() {
  const url = "https://dopravniinfo.cz/CR?action=link&e_X1=-493529.548884175&e_X2=-493549.682964361&e_Y1=-1168878.29721581&e_Y2=-1168926.73511294"
  // Checking if the link is supported for links with custom URL scheme.
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL(url);
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
}

function IncidentDetail() {
  return (
    <ScrollView style={GlobalStyles.viewContainer}>
      <Text style={{fontSize: 20, marginBottom: 6}}>Incident type</Text>
      <Text style={{fontSize: 16, marginBottom: 16}}>Lorem ipsum</Text>
      <Text style={{fontSize: 20, marginBottom: 6}}>Incident description</Text>
      <Text style={{fontSize: 16, marginBottom: 16}}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Vivamus ac leo pretium faucibus. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo</Text>
      <Text style={{fontSize: 20, marginBottom: 6}}>Start date</Text>
      <Text style={{fontSize: 16, marginBottom: 16}}>07-11-2023</Text>
      <Text style={{fontSize: 20, marginBottom: 6}}>End date</Text>
      <Text style={{fontSize: 16, marginBottom: 16}}>07-11-2023</Text>
      <Text style={{fontSize: 20, marginBottom: 6}}>Remaining days</Text>
      <Text style={{fontSize: 16, marginBottom: 16}}>0</Text>
      <IconButton style={{marginBottom: 16}} icon="map" text="Show on a map" onPress={ShowIncidentOnMap}></IconButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    height: 40,
    borderWidth: 1,
    flexDirection: "row", 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 100
  }
});

export default IncidentDetail;