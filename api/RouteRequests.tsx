class RouteRequests {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async renameRoute(routeId: number, routeName: string) {
    let result: boolean;
    try {
      const response = await fetch(`${this.apiUrl}/${routeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({routeName: routeName}),
      });
      if (response.ok) {
        result = true;
      } else {
        result = false;
      }
    } catch (error) {
      result = false;
    }
    return result;
  }

  async deleteRoute(routeId: number) {
    let result: boolean;
    try {
      const response = await fetch(`${this.apiUrl}/${routeId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        result = true;
      } else {
        result = false;
      }
    } catch (error) {
      result = false;
    }
    return result;
  }
}

export default RouteRequests;