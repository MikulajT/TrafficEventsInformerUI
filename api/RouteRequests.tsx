import { ApiResponse, TrafficRoute } from "../types";

class RouteRequests {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async getTrafficRoutes(): Promise<ApiResponse<TrafficRoute[]>> {
    let apiResponse: ApiResponse<TrafficRoute[]> = {success: false};
    try {
      const response = await fetch(this.apiUrl);
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
      const response = await fetch(this.apiUrl, {
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
      const response = await fetch(`${this.apiUrl}/${routeId}`, {
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
      const response = await fetch(`${this.apiUrl}/${routeId}`, {
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