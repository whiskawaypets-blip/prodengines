# Productivity Engines Authentication Setup

This document explains how to set up authentication for the Productivity Engines application.

## Prerequisites

- [Supabase Account](https://supabase.com) - Sign up for a free account
- [Google Cloud Console Project](https://console.cloud.google.com) - For Google OAuth integration

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [app.supabase.io](https://app.supabase.io) and create a new project
2. Once created, go to Project Settings > API
3. Copy your project URL and anon/public key

### 2. Configure Environment Variables

1. Create or edit the `.env.local` file in the frontend directory:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Application URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

2. Replace the placeholder values with your actual Supabase project URL and anon key

### 3. Set Up Google OAuth (Optional)

1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or use an existing one
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth Client ID"
5. Set up the OAuth consent screen if prompted
6. For "Application type", choose "Web application"
7. Add authorized redirect URIs:
   - `https://your-project-url.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback`
8. Copy the Client ID and Client Secret

### 4. Configure Google OAuth in Supabase

1. In your Supabase dashboard, go to "Authentication" > "Providers"
2. Find "Google" and toggle it on
3. Enter your Google Client ID and Client Secret
4. Save changes

### 5. Test the Authentication

1. Start your frontend: `cd productivity-engines-frontend && npm run dev`
2. Navigate to http://localhost:3000/login
3. Try signing in with email/password or Google

## Troubleshooting

- **"Failed to fetch" errors**: Make sure your Supabase URL and anon key are correct and properly formatted
- **Google login not working**: Verify the redirect URIs are correct in both Google Console and Supabase
- **"Authentication not configured" error**: Ensure your environment variables are properly set in `.env.local`

## Next Steps

After successfully setting up authentication, you can:

1. Create protected routes that require authentication
2. Implement user profiles
3. Set up row-level security in Supabase for your database tables 