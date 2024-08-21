import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, ToastAndroid, View } from "react-native";
import GlobalStyles from "../assets/GlobalStyles";
import { useEffect, useState } from "react";
import { RouteEvent } from "../Types";
import RouteEventsRequest from "../api/RouteEventsRequests";
import RenameDialog from "../components/RenameDialog";
import TrafficEventEntry from "../components/TrafficEventEntry";

function Incidents({ route, navigation } : any) {
  const [routeEvents, setRouteEvents] = useState<RouteEvent[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [isRenameDialogVisible, setIsRenameDialogVisible] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<RouteEvent>({
    id:"", 
    name:"", 
    startDate: new Date(), 
    endDate: new Date(), 
    totalDays: 0, 
    daysRemaining: 0
  });
  const routeEventsRequests = new RouteEventsRequest();

  useEffect(() => {
    fetchRouteEvents(route.params.routeId);
    navigation.setOptions({ title: `Trasa ${route.params.routeName}` });
  }, [navigation]);

  function renderRouteEvents(routeEvents: RouteEvent[], navigation: any) {
    let result = [];
    for (let i = 0; i < routeEvents.length; i++) { 
      result.push(
        <TrafficEventEntry 
          key={routeEvents[i].id} 
          eventId={routeEvents[i].id}
          eventName={routeEvents[i].name}
          startDate={routeEvents[i].startDate}
          endDate={routeEvents[i].endDate}
          totalDays={routeEvents[i].totalDays}
          daysRemaining={routeEvents[i].daysRemaining}
          onPress={() => navigation.navigate("IncidentDetail", { routeId: route.params.routeId, eventId: routeEvents[i].id })}
          onRenamePress={showRenameDialog}/>
      );
    }

    return result;
  }

  async function fetchRouteEvents(routeId: number) {
    setRefreshing(true);
    const response = await routeEventsRequests.getRouteEvents(routeId);
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
      console.log(response.data);
      setRouteEvents(response.data);
    } else {
      ToastAndroid.show("Nastala chyba během synchronizace dopravních událostí", ToastAndroid.LONG);
    }
    setRefreshing(false);
  }

  function showRenameDialog(eventId: string) {
    const trafficEvent = routeEvents.find(x => x.id === eventId);
    if (trafficEvent != undefined) {
      setSelectedEvent(trafficEvent);
    }
    setIsRenameDialogVisible(true);
  }

  function closeRenameDialog() {
    setIsRenameDialogVisible(false);
  }

  async function renameEvent(eventId: string, routeName: string) {
    const result = await routeEventsRequests.renameRouteEvent(route.params.routeId, eventId, routeName);
    if (result.success) {
      await fetchRouteEvents(route.params.routeId);
      ToastAndroid.show("Dopravní událost byla přejmenována", ToastAndroid.LONG);
    }
    else {
      console.log(`route.params.routeId: ${route.params.routeId}, eventId: ${eventId}, routeName: ${routeName}`);
      ToastAndroid.show("Nastala chyba během změny názvu dopravní události", ToastAndroid.LONG);
    }
    closeRenameDialog();
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
        <ScrollView refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={() => syncRouteEvents(route.params.routeId)}/>
        }>
          {renderRouteEvents(routeEvents, navigation)}
        </ScrollView>
        <RenameDialog entryId={selectedEvent.id} name={selectedEvent.name} isVisible={isRenameDialogVisible} onCancel={closeRenameDialog} onRename={renameEvent}/>
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