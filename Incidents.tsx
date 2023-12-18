import { ScrollView, View } from "react-native";
import SimpleTextButton from "./SimpleTextButton";
import GlobalStyles from "./GlobalStyles";
import { useEffect, useState } from "react";
import { RouteEvent } from "./types";

function Incidents({ route, navigation } : any) {
  const [routeEvents, setRouteEvents] = useState<RouteEvent[]>([]);

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
      } else {
        console.error('Failed to fetch traffic route events.');
      }
    } catch (error) {
      console.error('Error fetching traffic route events.', error);
    }
  };


  return (
    <View style={GlobalStyles.viewContainer}>
      <ScrollView>
        {renderRouteEvents(routeEvents, navigation)}
      </ScrollView>
    </View>
  );
}

export default Incidents