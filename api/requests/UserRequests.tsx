import { ApiResponse } from "../../Types";
import Config from "react-native-config";
import { store } from '../../redux/Store';
import { requestWithAuth } from "../auth/requestWithAuth";

class UserRequests {

  constructor() {

  }

  private get authState() {
    return store.getState().auth;
  }
  
  private get userId(): string {
    const { userId, provider } = this.authState;
    return provider && provider.length > 0 ? `${provider[0].toLowerCase()}_${userId}` : '';
  }
  
  private get email(): string | null {
    return this.authState.email;
  }

  async addFcmDeviceToken(fcmDeviceToken: string): Promise<ApiResponse<undefined>> {
    let apiResponse: ApiResponse<undefined> = { success: false };
    try {
      const response = await requestWithAuth(`${Config.TEI_API_KEY}/users/${this.userId}/fcm-tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fcmDeviceToken),
      });

      console.log(`addFcmDeviceToken response status code: ${response.status}`);
      
      if (response.ok) {
        apiResponse.success = true;
        console.log("Device token added.");
      } else if (response.status === 409) {
        apiResponse.success = true;
        console.log("Device token already exists.");
      }
    } catch (error) {
      console.log(`addFcmDeviceToken error: ${error}`);
    }
    return apiResponse;
  }

  async addUser(): Promise<ApiResponse<undefined>> {
    let apiResponse: ApiResponse<undefined> = { success: false };

    try {
      const response = await requestWithAuth(`${Config.TEI_API_KEY}/users/${this.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: this.email }),
      });

      console.log(`addUser response status code: ${response.status}`);

      if (response.ok) {
        apiResponse.success = true;
        console.log("User added.");
      } else if (response.status === 409) {
        apiResponse.success = true;
        console.log("User already exists.");
      }
    } catch (error) {
      console.log(`addUser error: ${error}`);
    }

    return apiResponse;
  }
}

export default UserRequests;