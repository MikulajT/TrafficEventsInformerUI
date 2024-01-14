import { ActivityIndicator, Pressable, ScrollView, StyleSheet, ToastAndroid, View } from "react-native";
import SimpleTextButton from "../components/SimpleTextButton";
import GlobalStyles from "../assets/GlobalStyles";
import { useEffect, useState } from "react";
import { RouteEvent } from "../types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RouteEventsRequest from "../api/RouteEventsRequests";

function Incidents({ route, navigation } : any) {
  const [routeEvents, setRouteEvents] = useState<RouteEvent[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const routeEventsRequests = new RouteEventsRequest("http://192.168.88.7:7246/api/trafficRoutes");

  useEffect(() => {
    fetchRouteEvents(route.params.routeId);
  }, []);

  function renderRouteEvents(routeEvents: RouteEvent[], navigation: any) {
    let result = [];
    for (let i = 0; i < routeEvents.length; i++) {
      result.push(
      <SimpleTextButton 
        key={routeEvents[i].id} 
        id={routeEvents[i].id} 
        text={routeEvents[i].name} 
        onPress={() => navigation.navigate("IncidentDetail", { routeId: route.params.routeId, eventId: routeEvents[i].id })}>
      </SimpleTextButton>);   
    }
    return result;
  }

  async function fetchRouteEvents(routeId: number) {
    setRefreshing(true);
    const response = await routeEventsRequests.getRouteEventNames(routeId);
    if (response.success && response.data) {
      setRouteEvents(response.data);
    }
    else {
      ToastAndroid.show("Nastala chyba během načítání dopravních událostí", ToastAndroid.LONG);
    }
    setRefreshing(false);
  };

  async function syncRouteEvents(routeId: number) {
    setRefreshing(true);
    const response = await routeEventsRequests.syncRouteEvents(routeId);
    if (response.success && response.data) {
      setRouteEvents(response.data);
    } else {
      ToastAndroid.show("Nastala chyba během synchronizace dopravních událostí", ToastAndroid.LONG);
    }
    setRefreshing(false);
  }

  if (isRefreshing) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" style={{opacity:1}} color="#999999" />
      </View>
    );
  } else {
    return (
      <View style={[GlobalStyles.viewContainer, {flex: 1}]}>
        <ScrollView>
          {renderRouteEvents(routeEvents, navigation)}
        </ScrollView>
        <Pressable style={GlobalStyles.stickyButton} onPress={() => syncRouteEvents(route.params.routeId)}>
          <Icon name="refresh" size={50} color="#007AFF" />
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Incidents