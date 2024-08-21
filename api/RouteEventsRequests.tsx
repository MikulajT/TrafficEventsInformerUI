import { useSelector } from "react-redux";
import { ApiResponse, RouteEvent, RouteEventDetail } from "../Types";
import Config from "react-native-config";

class RouteEventsRequest {
  private userId: string;

  constructor() {
    const { userId, profilePictureUrl, firstName, lastName, email } = useSelector((state: any) => state.auth);
    this.userId = userId;
  }

  async getRouteEvents(routeId: number): Promise<ApiResponse<RouteEvent[]>> {
    let apiResponse: ApiResponse<RouteEvent[]> = {success: false};
    try {
      const response = await fetch(`${Config.TEI_API_KEY}/users/${this.userId}/trafficRoutes/${routeId}/events`);
      if (response.ok) {
        apiResponse.success = true;
        apiResponse.data = await response.json();
      } 
      else {
        // TODO: Log
      }
    } catch (error) {
      // TODO: Log
    }
    return apiResponse;
  }

  async getRouteEventDetail(routeId: number, eventId: string): Promise<ApiResponse<RouteEventDetail>> {
    let apiResponse: ApiResponse<RouteEventDetail> = {success: false};
    try {
      const response = await fetch(`${Config.TEI_API_KEY}/users/${this.userId}/trafficRoutes/${routeId}/events/${eventId}`);
      if (response.ok) {
        apiResponse.success = true;
        apiResponse.data = await response.json();
      } else {
      // TODO: Log
      }
    } catch (error) {
      // TODO: Log
    }
    return apiResponse;
  }

  async syncAllRouteEvents(): Promise<ApiResponse<undefined>> {
    let apiResponse: ApiResponse<undefined> = {success: false};
    try {
      const response = await fetch(`${Config.TEI_API_KEY}/users/${this.userId}/trafficRoutes/events/sync`, {
        method: "POST"
      });
      if (response.ok) {
        apiResponse.success = true;
      } else {
      // TODO: Log
      }
    } catch (error) {
      // TODO: Log
    }
    return apiResponse;
  }

  async syncRouteEvents(routeId: number): Promise<ApiResponse<RouteEvent[]>> {
    let apiResponse: ApiResponse<RouteEvent[]> = {success: false};
    try {
      const response = await fetch(`${Config.TEI_API_KEY}/users/${this.userId}/trafficRoutes/${routeId}/events/sync`, {
        method: "POST"
      });
      if (response.ok) {
        apiResponse.success = true;
        apiResponse.data = await response.json();
      } else {
      // TODO: Log
      }
    } catch (error) {
      // TODO: Log
    }
    return apiResponse;
  }

  async renameRouteEvent(routeId: number, eventId: string, eventName: string): Promise<ApiResponse<undefined>> {
    let apiResponse: ApiResponse<undefined> = {success: false};
    try {
      const response = await fetch(`${Config.TEI_API_KEY}/users/${this.userId}/trafficRoutes/${routeId}/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventName),
      });
      if (response.ok) {
        apiResponse.success = true;
      } else {
      // TODO: Log
      }
    } catch (error) {
      // TODO: Log
    }
    return apiResponse;
  }
}

export default RouteEventsRequest;