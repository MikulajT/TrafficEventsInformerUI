import { useSelector } from "react-redux";
import { ApiResponse, TrafficRoute } from "../Types";
import Config from "react-native-config";

class RouteRequests {
  private userId: string;

  constructor() {
    const { userId, profilePictureUrl, firstName, lastName, email } = useSelector((state: any) => state.auth);
    this.userId = userId;
  }

  async getTrafficRoutes(): Promise<ApiResponse<TrafficRoute[]>> {
    let apiResponse: ApiResponse<TrafficRoute[]> = {success: false};
    try {
      const response = await fetch(`${Config.TEI_API_KEY}/users/${this.userId}/trafficRoutes`);
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

  async addRoute(formData: FormData): Promise<ApiResponse<number>> {
    let apiResponse: ApiResponse<number> = {success: false};
    try {
      const response = await fetch(`${Config.TEI_API_KEY}/users/${this.userId}/trafficRoutes`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
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

  async renameRoute(routeId: number, routeName: string): Promise<ApiResponse<undefined>> {
    let apiResponse: ApiResponse<undefined> = {success: false};
    try {
      const response = await fetch(`${Config.TEI_API_KEY}/trafficRoutes/${routeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({routeName: routeName}),
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

  async deleteRoute(routeId: number): Promise<ApiResponse<undefined>> {
    let apiResponse: ApiResponse<undefined> = {success: false};
    try {
      const response = await fetch(`${Config.TEI_API_KEY}/trafficRoutes/${routeId}`, {
        method: "DELETE",
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

export default RouteRequests;