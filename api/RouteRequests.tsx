import { useSelector } from "react-redux";
import { ApiResponse, TrafficRoute } from "../Types";
import Config from "react-native-config";

class RouteRequests {
  private userId: string;

  constructor() {
    const { userId, provider } = useSelector((state: any) => state.auth);
    
    this.userId = `${provider[0].toLowerCase()}_${userId}`;
  }

  async getUsersRoutes(): Promise<ApiResponse<TrafficRoute[]>> {
    let apiResponse: ApiResponse<TrafficRoute[]> = {success: false};

    try {
      const response = await fetch(`${Config.TEI_API_KEY}/users/${this.userId}/trafficRoutes`);
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

  async addRoute(formData: FormData): Promise<ApiResponse<number>> {
    let apiResponse: ApiResponse<number> = {success: false};
    formData.append("UserId", this.userId);

    try {
      const response = await fetch(`${Config.TEI_API_KEY}/trafficRoutes`, {
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

  async deleteRoute(routeId: number): Promise<ApiResponse<undefined>> {
    let apiResponse: ApiResponse<undefined> = {success: false};
    try {
      const response = await fetch(`${Config.TEI_API_KEY}/trafficRoutes/${routeId}`, {
        method: "DELETE",
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

export default RouteRequests;