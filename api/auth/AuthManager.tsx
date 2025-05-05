import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { store } from '../../redux/Store';

class AuthManager {
  private static instance: AuthManager;
  private idToken: string | null = null;
  private refreshingPromise: Promise<void> | null = null;

  private constructor() {
    const state = store.getState().auth;
    this.idToken = state.idToken || null;

    store.subscribe(() => {
      const newToken = store.getState().auth.idToken;
      if (this.idToken !== newToken) {
        this.idToken = newToken || null;
      }
    });
  }

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
    if (this.refreshingPromise) {
      // A refresh is already in progress. Wait for it.
      return this.refreshingPromise;
    }

    // Create a shared promise for all waiting requests
    this.refreshingPromise = (async () => {
      try {
        GoogleSignin.configure({
          scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
          webClientId: "995041589777-0idch4g4e5g2d436l0fj5fo6j698e5mv.apps.googleusercontent.com",
          offlineAccess: false,
        });

        const userInfo = await GoogleSignin.signInSilently();
        this.idToken = userInfo.idToken!;
      } catch (err) {
        console.error("Token refresh failed", err);
        throw new Error("Failed to refresh token");
      } finally {
        // Clear the shared promise so next refresh can happen if needed
        this.refreshingPromise = null;
      }
    })();

    return this.refreshingPromise;
  }
}

export default AuthManager.getInstance();