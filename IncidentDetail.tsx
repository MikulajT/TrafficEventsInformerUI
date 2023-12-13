import { Alert, Linking, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import GlobalStyles from "./GlobalStyles";
import IconButton from "./IconButton";
import { useEffect, useState } from "react";
import { RouteEventDetail } from "./types";

function IncidentDetail() {
  const [routeEventDetail, setRouteEventDetail] = useState<RouteEventDetail>();

  useEffect(() => {
    fetchRouteEventDetail();
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
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }

  async function fetchRouteEventDetail() {
    try {
      const response = await fetch('http://192.168.88.7:7246/api/trafficRoutes/34/events/1');
      if (response.ok) {
        const data: RouteEventDetail = await response.json();
        setRouteEventDetail({...data, 
          startDate: new Date(data.startDate), 
          endDate: new Date(data.endDate) 
        });
      } else {
        console.error('Failed to fetch traffic route events.');
      }
    } catch (error) {
      console.error('Error fetching traffic route events.', error);
    }
  };

  return (
    <ScrollView style={GlobalStyles.viewContainer}>
      <Text style={{fontSize: 20, marginBottom: 6}}>Incident type</Text>
      <Text style={{fontSize: 16, marginBottom: 16}}>{routeEventDetail?.type}</Text>
      <Text style={{fontSize: 20, marginBottom: 6}}>Incident description</Text>
      <Text style={{fontSize: 16, marginBottom: 16}}>{routeEventDetail?.description}</Text>
      <Text style={{fontSize: 20, marginBottom: 6}}>Start date</Text>
      <Text style={{fontSize: 16, marginBottom: 16}}>{routeEventDetail?.startDate.toLocaleString()}</Text>
      <Text style={{fontSize: 20, marginBottom: 6}}>End date</Text>
      <Text style={{fontSize: 16, marginBottom: 16}}>{routeEventDetail?.endDate.toLocaleString()}</Text>
      <Text style={{fontSize: 20, marginBottom: 6}}>Remaining days</Text>
      <Text style={{fontSize: 16, marginBottom: 16}}>{routeEventDetail?.daysRemaining}</Text>
      <IconButton style={{marginBottom: 16}} icon="map" text="Show on a map" onPress={ShowIncidentOnMap}></IconButton>
    </ScrollView>
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