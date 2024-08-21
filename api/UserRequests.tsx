import { useSelector } from "react-redux";
import { ApiResponse } from "../Types";
import Config from "react-native-config";

class UserRequests {
  private userId: string;

  constructor() {
    const { userId, profilePictureUrl, firstName, lastName, email } = useSelector((state: any) => state.auth);
    this.userId = userId;
  }

  async addFcmDeviceToken(fcmDeviceToken: string): Promise<ApiResponse<undefined>> {
    let apiResponse: ApiResponse<undefined> = { success: false };
    try {
      console.log(`token: ${fcmDeviceToken}`);
      const response = await fetch(`${Config.TEI_API_KEY}/users/${this.userId}/fcm-tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fcmDeviceToken), // Wrap the token in a JSON object
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
}

export default UserRequests;