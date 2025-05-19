import AuthManager from './AuthManager';

export async function requestWithAuth<T>(
  url: string,
  init: RequestInit = {},
  retry = true
): Promise<Response> {
  try {
    const token = await AuthManager.getValidToken();
    const response = await fetch(url, {
      ...init,
      headers: {
        ...(init.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401 && retry && AuthManager.getAuthProvider() === "google") {
      console.warn("Token expired. Refreshing and retrying...");
      //AuthManager.invalidateToken();
      await AuthManager.refreshGoogleToken();
      return requestWithAuth<T>(url, init, false); // Retry once
    }

    return response;
  } catch (error) {
    console.error("Request failed", error);
    throw error;
  }
}