import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

// Configure WebBrowser for web
if (Platform.OS === 'web') {
  WebBrowser.maybeCompleteAuthSession();
}

// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_SECRET || '';



// Scopes for Google authentication
const GOOGLE_SCOPES = [
  'openid',
  'profile',
  'email',
];

// Redirect URI configuration
const getRedirectUri = () => {
  if (Platform.OS === 'web') {
    // return 'http://localhost:8000' 
      return 'http://localhost:8081';
  }
  return AuthSession.makeRedirectUri({
    scheme: 'aiassistant',
    path: 'auth',
  });
};

// Google OAuth discovery document
const googleDiscovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

export interface AuthResult {
  success: boolean;
  user?: GoogleUser;
  error?: string;
}

export class GoogleAuthService {
  private static instance: GoogleAuthService;

  private constructor() {}

  static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }
    return GoogleAuthService.instance;
  }

  async signIn(): Promise<AuthResult> {
    try {
      // Check if client ID is configured
      if (!GOOGLE_CLIENT_ID) {
        return {
          success: false,
          error: 'Google Client ID not configured. Please set EXPO_PUBLIC_GOOGLE_CLIENT_ID in your environment variables.',
        };
      }



      // Create auth request
      const request = new AuthSession.AuthRequest({
        clientId: GOOGLE_CLIENT_ID,
        scopes: GOOGLE_SCOPES,
        redirectUri: getRedirectUri(),
        responseType: AuthSession.ResponseType.Code,
        extraParams: {
          prompt: 'select_account',
          access_type: 'offline',
        },
      });

      // Perform authentication
      const result = await request.promptAsync(googleDiscovery, {
        showInRecents: true,
      });

      if (result.type === 'success' && result.params.code) {
        // Exchange code for tokens
        const tokenResult = await AuthSession.exchangeCodeAsync(
          {
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            code: result.params.code,
            redirectUri: getRedirectUri(),
            extraParams: {
              code_verifier: request.codeVerifier || '',
            },
          },
          googleDiscovery
        );
        console.log("tokenResult : ",tokenResult)
        if (tokenResult.accessToken) {
          
          // Get user info
          const userInfo = await this.getUserInfo(tokenResult.accessToken);
          
          return {
            success: true,
            user: userInfo,
          };
        }
      }

      return {
        success: false,
        error: 'Authentication was cancelled or failed',
      };
    } catch (error) {
      console.error('Google sign-in error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private async getUserInfo(accessToken: string): Promise<GoogleUser> {
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const userData = await response.json();
    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
      given_name: userData.given_name,
      family_name: userData.family_name,
    };
  }

  async signOut(): Promise<void> {
    // Clear any stored tokens or user data
    // No need to store authRequest reference
  }

  // Check if user is authenticated (you can implement token validation here)
  async isAuthenticated(): Promise<boolean> {
    // This is a simple implementation - you might want to validate tokens
    // or check stored user data
    return false;
  }
}

// Export singleton instance
export const googleAuth = GoogleAuthService.getInstance();
