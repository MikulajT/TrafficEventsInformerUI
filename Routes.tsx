import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import SimpleTextButton from "./SimpleTextButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import GlobalStyles from "./GlobalStyles";
import { useEffect, useState } from "react";
import { TrafficRoute } from "./types";

function renderRoutes(routes: TrafficRoute[], navigation: any) {
  let result = [];
  for (let i = 0; i < routes.length; i++) {
    result.push(<SimpleTextButton key={routes[i].id} id={routes[i].id} text={routes[i].name} onPress={() => navigation.navigate("Incidents")}></SimpleTextButton>);   
  }
  return result;
}

function Routes({ navigation } : any) {
  const [routes, setRoutes] = useState<TrafficRoute[]>([]);

  useEffect(() => {
    fetchTrafficRoutes();
  }, []);

  async function fetchTrafficRoutes() {
    try {
      const response = await fetch('http://192.168.88.7:7246/api/trafficRoutes');
      if (response.ok) {
        const data: TrafficRoute[] = await response.json();
        setRoutes(data);
      } else {
        console.error('Failed to fetch traffic routes');
      }
    } catch (error) {
      console.error('Error fetching traffic routes', error);
    }
  };

  return (
      <View style={[GlobalStyles.viewContainer, {flex: 1}]}>
        <ScrollView>
          {renderRoutes(routes, navigation)}
        </ScrollView>
        <Pressable style={styles.addRouteButton} onPress={() => navigation.navigate("RouteImporter")}>
            <Icon name="plus" size={50} color="#32CD32" />
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  addRouteButton: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 100
  }
});

export default Routes;