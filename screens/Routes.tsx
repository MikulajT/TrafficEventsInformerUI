import { Pressable, RefreshControl, ScrollView, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import GlobalStyles from "../assets/GlobalStyles";
import { useEffect, useState } from "react";
import { TrafficRoute } from "../types";
import MenuButton from "../components/MenuButton";

function Routes({ navigation } : any) {
  const [routes, setRoutes] = useState<TrafficRoute[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchTrafficRoutes();
  }, []);

  function renderRoutes(routes: TrafficRoute[], navigation: any) {
    let result = [];
    for (let i = 0; i < routes.length; i++) {
      result.push(
      <MenuButton 
        key={routes[i].id} 
        id={routes[i].id} 
        text={routes[i].name} 
        onPress={() => navigation.navigate("Incidents", { routeId: routes[i].id })}>
      </MenuButton>);   
    }
    return result;
  }

  async function fetchTrafficRoutes() {
    try {
      setRefreshing(true);
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
      finally {
        setRefreshing(false);
      }
  };

  return (
      <View style={[GlobalStyles.viewContainer, {flex: 1}]}>
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchTrafficRoutes} />
        }>
          {renderRoutes(routes, navigation)}
        </ScrollView>
        <Pressable style={GlobalStyles.stickyButton} onPress={() => navigation.navigate("RouteImporter")}>
            <Icon name="plus" size={50} color="#32CD32" />
        </Pressable>
      </View>
  );
}

export default Routes;