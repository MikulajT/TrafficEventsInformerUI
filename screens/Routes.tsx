import { Pressable, RefreshControl, ScrollView, ToastAndroid, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import GlobalStyles from "../assets/GlobalStyles";
import { useEffect, useState } from "react";
import { TrafficRoute } from "../types";
import MenuButton from "../components/MenuButton";
import RouteRequests from "../api/RouteRequests";
import Config from "react-native-config";
import { useIsFocused } from '@react-navigation/native';
import ConfirmDialog from "../components/ConfirmDialog";
import RenameDialog from "../components/RenameDialog";

function Routes({ route, navigation } : any) {
  const routeRequests = new RouteRequests(`${Config.TEI_API_KEY}/trafficRoutes`);
  const [routes, setRoutes] = useState<TrafficRoute[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isRenameDialogVisible, setIsRenameDialogVisible] = useState<boolean>(false);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState<boolean>(false); 
  const [selectedRouteId, setSelectedRouteId] = useState<number>(0);
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
        menuItems={[
          {icon: "pencil", text: "Změnit název trasy", onPress: showRenameDialog},
          {icon: "delete", text: "Odstranit trasu", onPress: showDeleteDialog}
        ]}
        onPress={() => navigation.navigate("Incidents", { routeId: routes[i].id })}/>
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

  function showRenameDialog(routeId: number) {
    setIsRenameDialogVisible(true);
    setSelectedRouteId(routeId);
  }

  function showDeleteDialog(routeId: number) {
    setIsDeleteDialogVisible(true);
    setSelectedRouteId(routeId);
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

  function closeRenameDialog() {
    setIsRenameDialogVisible(false);
  }

  function closeDeleteDialog() {
    setIsDeleteDialogVisible(false);
  }


  return (
      <View style={[GlobalStyles.viewContainer, {flex: 1}]}>
        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchTrafficRoutes}/>
        }>
          {renderRoutes(routes, navigation)}
        </ScrollView>
        <Pressable style={GlobalStyles.stickyButton} onPress={() => navigation.navigate("RouteImporter")}>
            <Icon name="plus" size={50} color="#32CD32" />
        </Pressable>
        <ConfirmDialog 
          isVisible={isDeleteDialogVisible}
          title="Upozornění" 
          textContent="Opravdu chcete odstranit trasu?" 
          onCancelPress={closeDeleteDialog} 
          onConfirmPress={() => deleteRoute(selectedRouteId)}/>
        <RenameDialog entryId={selectedRouteId} isVisible={isRenameDialogVisible} onCancel={closeRenameDialog} onRename={renameRoute}/>
      </View>
  );
}

export default Routes;