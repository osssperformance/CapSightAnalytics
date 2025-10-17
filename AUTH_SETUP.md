# Authentication Setup Instructions

## Supabase Auth Configuration

To test the authentication flow, you need to configure a few settings in your Supabase dashboard:

### 1. Enable Email Auth

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Providers**
3. Make sure **Email** is enabled
4. Under Email settings:
   - Enable **Confirm email** (optional - off for development)
   - Enable **Secure email change** (recommended)

### 2. Configure Email Templates

1. Navigate to **Authentication** → **Email Templates**
2. For **Magic Link** template, make sure it's enabled
3. The default template should work, but you can customize it later with Mailgun branding

### 3. Configure Site URL and Redirect URLs

1. Navigate to **Authentication** → **URL Configuration**
2. Set **Site URL** to:
   - Development: `http://localhost:3001`
   - Production: `https://capsightanalytics.com` (when ready)
3. Add **Redirect URLs**:
   - `http://localhost:3001/auth/callback`
   - `https://capsightanalytics.com/auth/callback` (when ready)
   - Your Vercel preview URLs (e.g., `https://*.vercel.app/auth/callback`)

### 4. Test the Authentication Flow

1. Visit http://localhost:3001
2. Click **Sign in** button
3. Enter your email address
4. Check your email for the magic link
5. Click the magic link to authenticate
6. You should be redirected back to the homepage, now signed in

### Current Auth Flow

```
1. User visits /login
2. User enters email address
3. POST to /auth/login → sends magic link via Supabase
4. User clicks link in email
5. GET to /auth/callback → verifies token and creates session
6. User redirected to homepage (/)
7. Homepage shows UserMenu with email and sign out button
```

### Testing Checklist

- [ ] Supabase Email provider enabled
- [ ] Site URL configured (http://localhost:3001)
- [ ] Redirect URLs configured
- [ ] Magic link email sends successfully
- [ ] Magic link redirects to /auth/callback
- [ ] User session persists on page refresh
- [ ] Sign out works correctly
- [ ] RLS policies protect user data

### Troubleshooting

**Email not sending?**
- Check Supabase logs in Dashboard → Logs → Auth
- Verify your email isn't in spam folder
- Check that Email provider is enabled
- In development, Supabase uses their SMTP (rate limited to 3 emails/hour for free tier)

**Redirect not working?**
- Verify redirect URL is added to allowed list
- Check browser console for errors
- Ensure `NEXT_PUBLIC_APP_URL` in .env.local matches your Site URL

**Session not persisting?**
- Check that middleware is running (should see refresh in browser network tab)
- Verify cookies are being set (check Application tab in browser DevTools)
- Make sure Supabase URL and anon key are correct in .env.local

## Next Steps

After authentication works:
1. Set up Mailgun for production emails (Day 4)
2. Create custom email templates with branding
3. Add user profile pages
4. Implement protected routes
5. Add email verification for production
