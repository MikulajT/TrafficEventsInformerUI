import { ApiResponse, TrafficRoute } from "../../Types";
import Config from "react-native-config";
import { store } from '../../redux/Store';
import { requestWithAuth } from "../auth/requestWithAuth";

class RouteRequests {

  constructor() {

  }

  private get authState() {
    return store.getState().auth;
  }
  
  private get userId(): string {
    const { userId, provider } = this.authState;
    return provider && provider.length > 0 ? `${provider[0].toLowerCase()}_${userId}` : '';
  }

  async getUsersRoutes(): Promise<ApiResponse<TrafficRoute[]>> {
    let apiResponse: ApiResponse<TrafficRoute[]> = {success: false};

    try {
      const response = await requestWithAuth<TrafficRoute[]>(
        `${Config.TEI_API_KEY}/users/${this.userId}/trafficRoutes`,
        { method: 'GET' }
      );
      
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
      const response = await requestWithAuth<number>(
        `${Config.TEI_API_KEY}/users/${this.userId}/trafficRoutes`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      );

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
      const response = await requestWithAuth<undefined>(
        `${Config.TEI_API_KEY}/users/${this.userId}/trafficRoutes/${routeId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ routeName }),
        }
      );

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
      const response = await requestWithAuth<undefined>(
        `${Config.TEI_API_KEY}/users/${this.userId}/trafficRoutes/${routeId}`,
        {
          method: 'DELETE',
        }
      );

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