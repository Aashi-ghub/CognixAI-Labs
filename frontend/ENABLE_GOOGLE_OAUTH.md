# How to Enable Google OAuth in Supabase

## Step 1: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Configure OAuth consent screen (if not done):
   - User Type: External (for testing) or Internal (for organization)
   - Fill in app name, support email, developer contact
   - Add scopes: `email`, `profile`, `openid`
   - Add test users (if in testing mode)
6. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: "CognixAI Labs" (or your app name)
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://your-production-domain.com` (for production)
   - Authorized redirect URIs:
     - `https://wyqhofuwxzyyjnffavgq.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (if using local callback)
7. Copy your **Client ID** and **Client Secret**

## Step 2: Enable Google in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/wyqhofuwxzyyjnffavgq
2. Navigate to **Authentication** → **Providers** (left sidebar)
3. Find **Google** in the list of providers
4. Click on **Google** to expand it
5. Toggle **Enable Google provider** to ON
6. Enter your credentials:
   - **Client ID (for OAuth)**: Paste your Google Client ID
   - **Client Secret (for OAuth)**: Paste your Google Client Secret
7. Click **Save**

## Step 3: Configure Redirect URLs

1. In Supabase Dashboard → **Authentication** → **URL Configuration**
2. Add your site URLs:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: 
     - `http://localhost:3000/**`
     - `https://your-production-domain.com/**`
     - `https://wyqhofuwxzyyjnffavgq.supabase.co/auth/v1/callback`

## Step 4: Test It

1. Go to your login page: `http://localhost:3000/login`
2. Click **Continue with Google**
3. You should be redirected to Google sign-in
4. After signing in, you'll be redirected back to your app

## Notes

- **Auth0** is a different service (enterprise auth provider) - you don't need it for Google OAuth
- Google OAuth is free to use
- The Google button in your login page will automatically work once enabled
- Make sure the redirect URLs match exactly in both Google Console and Supabase

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Check that the redirect URI in Google Console matches exactly: `https://wyqhofuwxzyyjnffavgq.supabase.co/auth/v1/callback`
- Make sure there are no trailing slashes or extra characters

### Error: "provider is not enabled"
- Make sure you clicked "Save" after entering credentials in Supabase
- Wait a few seconds and try again (sometimes takes a moment to propagate)

### Error: "invalid_client"
- Double-check your Client ID and Client Secret are correct
- Make sure you copied the entire values without extra spaces

---

**Quick Checklist:**
- ✅ Google OAuth credentials created in Google Cloud Console
- ✅ Authorized redirect URI added: `https://wyqhofuwxzyyjnffavgq.supabase.co/auth/v1/callback`
- ✅ Google provider enabled in Supabase Dashboard
- ✅ Client ID and Secret entered in Supabase
- ✅ Site URL and Redirect URLs configured in Supabase
- ✅ Tested the Google sign-in button

