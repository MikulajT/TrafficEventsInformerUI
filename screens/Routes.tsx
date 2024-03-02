import { Pressable, RefreshControl, ScrollView, ToastAndroid, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import GlobalStyles from "../assets/GlobalStyles";
import { useEffect, useState } from "react";
import { TrafficRoute } from "../types";
import RouteMenuButton from "../components/RouteMenuButton";
import RouteRequests from "../api/RouteRequests";
import Config from "react-native-config";

function Routes({ navigation } : any) {
  const [routes, setRoutes] = useState<TrafficRoute[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const routeRequests = new RouteRequests(`${Config.TEI_API_KEY}/trafficRoutes`);

  useEffect(() => {
    fetchTrafficRoutes();
  }, []);

  function renderRoutes(routes: TrafficRoute[], navigation: any) {
    let result = [];
    for (let i = 0; i < routes.length; i++) {
      result.push(
      <RouteMenuButton 
        key={routes[i].id} 
        routeId={routes[i].id} 
        routeName={routes[i].name} 
        onButtonPress={() => navigation.navigate("Incidents", { routeId: routes[i].id })}
        onRefreshRoutes={fetchTrafficRoutes}/>
      );   
    }
    return result;
  }

  // Keep this in case RouteMenuButton will be made into multi-usage component
  // function modifyRoute(routeId: number, operation: Operation) {
  //   if (operation == Operation.Update) {
  //     updateRoute(routeId);
  //   } else if (operation == Operation.Delete) {
  //     deleteRoute(routeId)
  //   }
  // }

  async function fetchTrafficRoutes() {
    setRefreshing(true);
    const response = await routeRequests.getTrafficRoutes();
    if (response.success && response.data) {
      setRoutes(response.data);
    }
    else {
      ToastAndroid.show("Nastala chyba během načítání tras", ToastAndroid.LONG);
    }
    setRefreshing(false);
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