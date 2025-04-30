import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Not used
class AuthManager {
  private static instance: AuthManager;
  private idToken: string | null = null;
  private refreshInProgress: Promise<void> | null = null;

  private constructor() {}

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  public async getValidToken(): Promise<string> {
    if (!this.idToken) {
      await this.refreshToken();
    }
    return this.idToken!;
  }

  public invalidateToken(): void {
    this.idToken = null;
  }

  public async refreshToken(): Promise<void> {
    // Prevent overlapping refreshes
    if (this.refreshInProgress) {
      await this.refreshInProgress;
      return;
    }

    this.refreshInProgress = (async () => {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        this.idToken = userInfo.idToken!;
      } catch (err) {
        console.error("Token refresh failed", err);
        throw new Error("Failed to refresh token");
      } finally {
        this.refreshInProgress = null;
      }
    })();

    await this.refreshInProgress;
  }
}

export default AuthManager.getInstance();