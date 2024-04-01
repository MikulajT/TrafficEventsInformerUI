import { ActivityIndicator, Pressable, ScrollView, StyleSheet, ToastAndroid, View } from "react-native";
import GlobalStyles from "../assets/GlobalStyles";
import { useEffect, useState } from "react";
import { RouteEvent } from "../types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RouteEventsRequest from "../api/RouteEventsRequests";
import Config from "react-native-config";
import MenuButton from "../components/MenuButton";
import RenameDialog from "../components/RenameDialog";

function Incidents({ route, navigation } : any) {
  const [routeEvents, setRouteEvents] = useState<RouteEvent[]>([]);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [isRenameDialogVisible, setIsRenameDialogVisible] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const routeEventsRequests = new RouteEventsRequest(`${Config.TEI_API_KEY}/trafficRoutes`);

  useEffect(() => {
    fetchRouteEvents(route.params.routeId);
  }, []);

  function renderRouteEvents(routeEvents: RouteEvent[], navigation: any) {
    let result = [];
    for (let i = 0; i < routeEvents.length; i++) { 
      result.push(
        <MenuButton 
          key={routeEvents[i].id} 
          id={routeEvents[i].id}
          text={routeEvents[i].name}
          menuItems={[
            {icon: "pencil", text: "Změnit název události", onPress: showRenameDialog}
          ]}
          onPress={() => navigation.navigate("IncidentDetail", { routeId: route.params.routeId, eventId: routeEvents[i].id })}/>
      );
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

  function showRenameDialog(eventId: string) {
    setIsRenameDialogVisible(true);
    setSelectedEventId(eventId);
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
        <ScrollView>
          {renderRouteEvents(routeEvents, navigation)}
        </ScrollView>
        <Pressable style={GlobalStyles.stickyButton} onPress={() => syncRouteEvents(route.params.routeId)}>
          <Icon name="refresh" size={50} color="#007AFF" />
        </Pressable>
        <RenameDialog entryId={selectedEventId} isVisible={isRenameDialogVisible} onCancel={closeRenameDialog} onRename={renameEvent}/>
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