import { Alert, Linking, StyleSheet, ToastAndroid, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import GlobalStyles from "../assets/GlobalStyles";
import IconButton from "../components/IconButton";
import { useEffect, useState } from "react";
import { RouteEventDetail } from "../Types";
import RouteEventsRequest from "../api/RouteEventsRequests";
import { Text } from "react-native-paper";
import { format } from "date-fns";
import ActivityIndicatorOverlay from "../components/ActivityIndicatorOverlay";

function IncidentDetail({ route, navigation } : any) {
  const [routeEventDetail, setRouteEventDetail] = useState<RouteEventDetail>({
    id: "",
    name: "",
    type: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    daysRemaining: 0,
    startPointX: 0,
    startPointY: 0,
    endPointX: 0,
    endPointY: 0
  });
  const routeEventsRequests = new RouteEventsRequest();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchRouteEventDetail(route.params.routeId, route.params.eventId);
  }, []);

  async function ShowIncidentOnMap() {
    const url = `https://dopravniinfo.cz/CR?action=link&e_X1=${routeEventDetail?.startPointX}&e_X2=${routeEventDetail?.endPointX}&e_Y1=${routeEventDetail?.startPointY}&e_Y2=${routeEventDetail?.endPointY}`
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);
  
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Nastala chyba během otevírání adresy: ${url}`);
    }
  }

  async function fetchRouteEventDetail(routeId: number, eventId: string) {
    setIsLoading(true);
    const response = await routeEventsRequests.getRouteEventDetail(routeId, eventId);
    setIsLoading(false);

    if (response.success && response.data) {
        setRouteEventDetail({...response.data, 
          startDate: new Date(response.data.startDate), 
          endDate: new Date(response.data.endDate)});
    }
    else {
      ToastAndroid.show("Nastala chyba během načítání dopravní události", ToastAndroid.LONG);
    }
  };

  return (
    <View style={[GlobalStyles.viewContainer, {flex: 1}]}>
      <ScrollView>
        <Text style={{fontSize: 20, marginBottom: 6}}>Název</Text>
        <Text style={{fontSize: 16, marginBottom: 16}}>{routeEventDetail.name}</Text>
        <Text style={{fontSize: 20, marginBottom: 6}}>Typ</Text>
        <Text style={{fontSize: 16, marginBottom: 16}}>{routeEventDetail.type}</Text>
        <Text style={{fontSize: 20, marginBottom: 6}}>Popis</Text>
        <Text style={{fontSize: 16, marginBottom: 16}}>{routeEventDetail.description}</Text>
        <Text style={{fontSize: 20, marginBottom: 6}}>Datum začátku</Text>
        <Text style={{fontSize: 16, marginBottom: 16}}>{format(routeEventDetail.startDate, "dd.MM.yyyy HH:mm:ss")}</Text>
        <Text style={{fontSize: 20, marginBottom: 6}}>Datum konce</Text>
        <Text style={{fontSize: 16, marginBottom: 16}}>{format(routeEventDetail.endDate, "dd.MM.yyyy HH:mm:ss")}</Text>
        <Text style={{fontSize: 20, marginBottom: 6}}>Zbývající počet dnů</Text>
        <Text style={{fontSize: 16, marginBottom: 16}}>{routeEventDetail.daysRemaining}</Text>
        <IconButton style={{marginBottom: 16}} icon="map" text="Zobrazit na mapě" onPress={ShowIncidentOnMap}></IconButton>
      </ScrollView>
      {isLoading && <ActivityIndicatorOverlay/>}
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    height: 40,
    borderWidth: 1,
    flexDirection: "row", 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 100
  }
});

export default IncidentDetail;