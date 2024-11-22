import { useSelector } from "react-redux";
import { ApiResponse, RouteEvent, RouteEventDetail } from "../Types";
import Config from "react-native-config";

class RouteEventsRequest {
  private userId: string;

  constructor() {
    const { userId, profilePictureUrl, firstName, lastName, email, provider } = useSelector((state: any) => state.auth);
    
    this.userId = `${provider[0].toLowerCase()}_${userId}`;
  }

  async getRouteEvents(routeId: number): Promise<ApiResponse<RouteEvent[]>> {
    let apiResponse: ApiResponse<RouteEvent[]> = {success: false};
    try {
      const response = await fetch(`${Config.TEI_API_KEY}/trafficRoutes/${routeId}/events`);
      if (response.ok) {
        apiResponse.success = true;
        apiResponse.data = await response.json();
      } else {
        console.error("The request wasn't successful.", {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
        });
      }
    } catch (error) {
      console.error("An error occurred while fetching route events.", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
    return apiResponse;
  }

  async getRouteEventDetail(routeId: number, eventId: string): Promise<ApiResponse<RouteEventDetail>> {
    let apiResponse: ApiResponse<RouteEventDetail> = {success: false};
    try {
      const response = await fetch(`${Config.TEI_API_KEY}/trafficRoutes/${routeId}/events/${eventId}`);
      if (response.ok) {
        apiResponse.success = true;
        apiResponse.data = await response.json();
      } else {
        console.error("The request wasn't successful.", {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
        });        
      }
    } catch (error) {
      console.error("An error occurred while fetching route events.", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
    return apiResponse;
  }

  async syncAllUsersRouteEvents(): Promise<ApiResponse<undefined>> {
    let apiResponse: ApiResponse<undefined> = {success: false};
    try {
      const response = await fetch(`${Config.TEI_API_KEY}/users/${this.userId}/trafficRoutes/events/sync`, {
        method: "POST"
      });
      if (response.ok) {
        apiResponse.success = true;
      } else {
        console.error("The request wasn't successful.", {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
        });
      }
    } catch (error) {
      console.error("An error occurred while fetching route events.", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
    return apiResponse;
  }

  async syncUsersRouteEvents(routeId: number): Promise<ApiResponse<RouteEvent[]>> {
    let apiResponse: ApiResponse<RouteEvent[]> = {success: false};
    try {
      const response = await fetch(`${Config.TEI_API_KEY}/users/${this.userId}/trafficRoutes/${routeId}/events/sync`, {
        method: "POST"
      });
      if (response.ok) {
        apiResponse.success = true;
        apiResponse.data = await response.json();
      } else {
        console.error("The request wasn't successful.", {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
        });
      }
    } catch (error) {
      console.error("An error occurred while fetching route events.", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
    return apiResponse;
  }

  async renameRouteEvent(routeId: number, eventId: string, eventName: string): Promise<ApiResponse<undefined>> {
    let apiResponse: ApiResponse<undefined> = {success: false};
    try {
      const response = await fetch(`${Config.TEI_API_KEY}/trafficRoutes/${routeId}/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventName),
      });
      if (response.ok) {
        apiResponse.success = true;
      } else {
        console.error("The request wasn't successful.", {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
        });
      }
    } catch (error) {
      console.error("An error occurred while fetching route events.", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
    return apiResponse;
  }
}

export default RouteEventsRequest;