import { RefreshControl, ScrollView, ToastAndroid, TouchableHighlight, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import GlobalStyles from "../assets/GlobalStyles";
import { useEffect, useState } from "react";
import { TrafficRoute } from "../Types";
import MenuButton from "../components/MenuButton";
import RouteRequests from "../api/RouteRequests";
import { useIsFocused } from '@react-navigation/native';
import ConfirmDialog from "../components/ConfirmDialog";
import RenameDialog from "../components/RenameDialog";
import RouteEventsRequest from "../api/RouteEventsRequests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityIndicatorOverlay from "../components/ActivityIndicatorOverlay";

function Routes({ route, navigation } : any) {
  const routeRequests = new RouteRequests();
  const routeEventsRequests = new RouteEventsRequest();
  const [routes, setRoutes] = useState<TrafficRoute[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isRenameDialogVisible, setIsRenameDialogVisible] = useState<boolean>(false);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState<boolean>(false); 
  const [isRefreshDialogVisible, setIsRefreshDialogVisible] = useState<boolean>(false);
  const [selectedRoute, setSelectedRoute] = useState<TrafficRoute>({id:0, name:""});
  const [syncInProgress, setSyncInProgress] = useState<boolean>(false);
  const isFocused = useIsFocused();

  useEffect(() => {
      fetchTrafficRoutes();
  }, []);

  useEffect(() => {
    // Call fetchTrafficRoutes when new route is imported
    if (isFocused && route?.params?.refreshRoutes) {
      route.params.refreshRoutes = false;
      fetchTrafficRoutes();
    }
  }, [isFocused]);

  function renderRoutes(routes: TrafficRoute[], navigation: any) {
    let result = [];
    for (let i = 0; i < routes.length; i++) {
      result.push(
      <MenuButton 
        key={routes[i].id} 
        id={routes[i].id} 
        text={routes[i].name}
        disabled={syncInProgress}
        menuItems={[
          {icon: "pencil", text: "Změnit název trasy", onPress: showRenameDialog},
          {icon: "delete", text: "Odstranit trasu", onPress: showDeleteDialog}
        ]}
        onPress={() => navigation.navigate("Incidents", { routeId: routes[i].id, routeName: routes[i].name })}/>
      );   
    }
    return result;
  }

  async function fetchTrafficRoutes() {
    setIsRefreshing(true);
    const response = await routeRequests.getUsersRoutes();
    if (response.success && response.data) {
      setRoutes(response.data);
    }
    else {
      ToastAndroid.show("Nastala chyba během načítání tras", ToastAndroid.LONG);
    }
    setIsRefreshing(false);
  };

  function showRenameDialog(routeId: number) {
    const route = routes.find(x => x.id === routeId);
    if (route != undefined) {
      setSelectedRoute(route);
    }
    setIsRenameDialogVisible(true);
  }

  function showDeleteDialog(routeId: number) {
    const route = routes.find(x => x.id === routeId);
    if (route != undefined) {
      setSelectedRoute(route);
    }
    setIsDeleteDialogVisible(true);
  }

  async function showRefreshDialog() {
    const showRefreshDialog = await AsyncStorage.getItem("showRefreshDialog");

    if (showRefreshDialog === "true") {
      setIsRefreshDialogVisible(true);
    }
    else {
      syncAllRouteEvents();
    }
  }

  async function renameRoute(routeId: number, routeName: string) {
    const result = await routeRequests.renameRoute(routeId, routeName);
    if (result.success) {
      await fetchTrafficRoutes();
      ToastAndroid.show("Trasa byla přejmenována", ToastAndroid.LONG);
    }
    else {
      ToastAndroid.show("Nastala chyba během změny názvu trasy", ToastAndroid.LONG);
    }
    closeRenameDialog();
  }

  async function deleteRoute(routeId: number) {
    const result = await routeRequests.deleteRoute(routeId);
    if (result.success) {
      await fetchTrafficRoutes();
      ToastAndroid.show("Trasa byla odstraněna", ToastAndroid.LONG);
    }
    else {
      ToastAndroid.show("Nastala chyba během odstraňování trasy", ToastAndroid.LONG);
    }
    closeDeleteDialog();
  }

  async function handleRoutesSync(checkboxChecked: boolean) {
    const showRefreshDialog = await AsyncStorage.getItem("showRefreshDialog");
    if (showRefreshDialog === null || showRefreshDialog === "true") {
      if (checkboxChecked) {
        await AsyncStorage.setItem("showRefreshDialog", "false");
      }
      else {
        await AsyncStorage.setItem("showRefreshDialog", "true");
      }
    }
    syncAllRouteEvents();
    closeRefreshDialog();
  }

  function closeRenameDialog() {
    setIsRenameDialogVisible(false);
  }

  function closeDeleteDialog() {
    setIsDeleteDialogVisible(false);
  }

  function closeRefreshDialog() {
    setIsRefreshDialogVisible(false);
  }

  async function syncAllRouteEvents() {
    if (syncInProgress) {
      ToastAndroid.show("Synchronizace dopravních událostí již probíhá", ToastAndroid.LONG);
    }
    else {
      setSyncInProgress(true);
      const response = await routeEventsRequests.syncAllRouteEvents();
      if (response.success) {
        setSyncInProgress(false);
        ToastAndroid.show("Synchronizace dopravních událostí byla dokončena", ToastAndroid.LONG);
      }
      else {
        setSyncInProgress(false);
        ToastAndroid.show("Nastala chyba během synchronizace dopravních událostí", ToastAndroid.LONG);
      }
    }
  }

  return (
      <View style={[GlobalStyles.viewContainer, {flex: 1}]}>
        <ScrollView refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={fetchTrafficRoutes}/>
        }>
          {renderRoutes(routes, navigation)}
        </ScrollView>
        <TouchableHighlight style={[GlobalStyles.stickyButton, {bottom: 60}]} onPress={showRefreshDialog}>
            <Icon name="refresh" size={50} color="#FFD300" />
        </TouchableHighlight>
        <TouchableHighlight style={[GlobalStyles.stickyButton, {bottom: 5}]} onPress={() => navigation.navigate("RouteImporter", {syncAllRouteEvents: syncAllRouteEvents})}>
            <Icon name="plus" size={50} color="#32CD32" />
        </TouchableHighlight>
        <ConfirmDialog 
          isVisible={isDeleteDialogVisible}
          title="Upozornění" 
          textContent="Opravdu chcete odstranit trasu?" 
          showCheckbox={false}
          onCancelPress={closeDeleteDialog} 
          onConfirmPress={() => deleteRoute(selectedRoute.id)}/>
        <ConfirmDialog 
          isVisible={isRefreshDialogVisible}
          title="Upozornění" 
          textContent="Opravdu chcete aktualizovat všechny dopravní události?" 
          showCheckbox={true}
          onCancelPress={closeRefreshDialog} 
          onConfirmPress={(checkboxChecked) => handleRoutesSync(checkboxChecked)}/>
        <RenameDialog entryId={selectedRoute.id} name={selectedRoute.name} isVisible={isRenameDialogVisible} onCancel={closeRenameDialog} onRename={renameRoute}/>
        {syncInProgress && <ActivityIndicatorOverlay/> }
      </View>
  );
}

export default Routes;