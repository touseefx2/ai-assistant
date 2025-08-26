# Google Authentication Setup

This guide will help you set up Google OAuth authentication for your app.

## Prerequisites

1. A Google Cloud Console account
2. A project in Google Cloud Console

## Setup Steps

### 1. Create OAuth 2.0 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth 2.0 Client IDs"

### 2. Configure OAuth Consent Screen

1. Go to "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name
   - User support email
   - Developer contact information
4. Add scopes: `openid`, `profile`, `email`
5. Add test users if needed

### 3. Create OAuth Client ID

1. Go back to "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" for web
4. Add authorized redirect URIs:
   - Web: `http://localhost:8081`
   - Android: `aiassistant://auth`
   - iOS: `aiassistant://auth`
5. Copy the Client ID and Client Secret

### 4. Environment Variables

Create a `.env` file in your project root with:

```bash
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
EXPO_PUBLIC_GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### 5. Platform-Specific Configuration

#### Android
The scheme `aiassistant` is already configured in `app.json`.

#### iOS
The scheme `aiassistant` is already configured in `app.json`.

#### Web
The redirect URI `http://localhost:8081` is configured for development.

## Testing

1. Start your app: `yarn start`
2. Test on web: `yarn web`
3. Test on mobile: `yarn android` or `yarn ios`

## Troubleshooting

- Make sure your redirect URIs match exactly
- Check that the OAuth consent screen is published
- Verify your Client ID and Secret are correct
- Ensure the required scopes are added

## Security Notes

- Never commit your `.env` file to version control
- Use different Client IDs for development and production
- Regularly rotate your Client Secret
- Monitor your OAuth usage in Google Cloud Console
