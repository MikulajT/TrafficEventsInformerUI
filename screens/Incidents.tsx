import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from "react-native";
import SimpleTextButton from "../components/SimpleTextButton";
import GlobalStyles from "../assets/GlobalStyles";
import { useEffect, useState } from "react";
import { RouteEvent } from "../types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function Incidents({ route, navigation } : any) {
  const [routeEvents, setRouteEvents] = useState<RouteEvent[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchRouteEvents();
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

  async function fetchRouteEvents() {
    try {
      const response = await fetch(`http://192.168.88.7:7246/api/trafficRoutes/${route.params.routeId}/events`);
      if (response.ok) {
        const data: RouteEvent[] = await response.json();
        setRouteEvents(data);
      } 
      else {
        console.error('Failed to fetch traffic route events.');
      }
    } catch (error) {
      console.error('Error fetching traffic route events.', error);
    }
  };

  async function syncRouteEvents() {
    try {
      setRefreshing(true);
      const response = await fetch(`http://192.168.88.7:7246/api/trafficRoutes/${route.params.routeId}/events/sync`, {
        method: "POST"
      });
      if (response.ok) {
        const data: RouteEvent[] = await response.json();
        setRouteEvents(data);
      } else {
        console.error('Failed to sync traffic route events.');
      }
    } catch (error) {
      console.error('Failed to sync traffic route events.');
    } finally {
      setRefreshing(false);
    }
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
        <Pressable style={GlobalStyles.stickyButton} onPress={syncRouteEvents}>
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