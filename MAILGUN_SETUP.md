# Mailgun Setup Guide

## Step 1: Add Mailgun Credentials to .env.local

Add your Mailgun API key and domain to `.env.local`:

```bash
MAILGUN_API_KEY=your-mailgun-api-key-here
MAILGUN_DOMAIN=mg.capsightanalytics.com  # or your verified domain
```

## Step 2: Verify Domain DNS Records

You need to add DNS records for your domain to verify it with Mailgun and enable email sending.

### Required DNS Records

Go to your Mailgun dashboard → Sending → Domains → [Your Domain] → DNS Records

You'll need to add these records to your DNS provider (where you registered capsightanalytics.com):

#### 1. TXT Record (Domain Verification)
```
Type: TXT
Name: @ (or your subdomain like mg)
Value: v=spf1 include:mailgun.org ~all
TTL: 3600
```

#### 2. TXT Record (DKIM)
```
Type: TXT
Name: smtp._domainkey  (or the value provided by Mailgun)
Value: [Long key provided by Mailgun]
TTL: 3600
```

#### 3. CNAME Record (Tracking)
```
Type: CNAME
Name: email (or the value provided by Mailgun)
Value: mailgun.org
TTL: 3600
```

#### 4. MX Records (Receiving - Optional)
If you want to receive emails (for replies):
```
Type: MX
Name: @ (or mg)
Value: mxa.mailgun.org
Priority: 10
TTL: 3600

Type: MX
Name: @ (or mg)
Value: mxb.mailgun.org
Priority: 10
TTL: 3600
```

### Verification

After adding DNS records:
1. Wait 5-15 minutes for DNS propagation
2. Go to Mailgun dashboard → Domains → [Your Domain]
3. Click "Verify DNS Settings"
4. All records should show green checkmarks ✅

## Step 3: Test Email Sending

### Option 1: Using the Test API Route

Send a test welcome email:
```bash
curl -X POST http://localhost:3050/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"type": "welcome", "email": "your@email.com"}'
```

Send a test digest email:
```bash
curl -X POST http://localhost:3050/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"type": "digest", "email": "your@email.com"}'
```

### Option 2: Sign Up Flow

1. Visit http://localhost:3050/login
2. Sign up with your email
3. The welcome email should be sent automatically (once we hook it up)

## Step 4: Configure Email Templates

We've created two email templates:

1. **Welcome Email** (`src/lib/email/templates/welcome.ts`)
   - Sent when a new user signs up
   - Introduces CapSight Analytics features
   - CTA to view calendar

2. **Daily Digest** (`src/lib/email/templates/digest.ts`)
   - Sent daily to users who opt in
   - Shows upcoming events, watchlist events, and recommendations
   - Personalized based on user preferences

## Step 5: Hook Up Welcome Email to Auth

To automatically send welcome emails when users sign up, we need to create a Supabase Edge Function or Database Trigger.

### Option A: Database Trigger (Recommended)

Run this SQL in Supabase SQL Editor:

```sql
-- Function to call our API when a new user signs up
CREATE OR REPLACE FUNCTION send_welcome_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Call Next.js API to send welcome email
  -- This requires pg_net extension
  PERFORM net.http_post(
    url := '[YOUR_APP_URL]/api/webhooks/new-user',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := json_build_object(
      'user_id', NEW.id,
      'email', NEW.email,
      'full_name', NEW.raw_user_meta_data->>'full_name'
    )::jsonb
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on new user creation
CREATE TRIGGER on_user_created_send_welcome
  AFTER INSERT ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION send_welcome_email();
```

Then create the webhook API route: `src/app/api/webhooks/new-user/route.ts`

### Option B: Supabase Edge Function

Create a Supabase Edge Function that listens to auth events and calls Mailgun directly.

## Mailgun Features We're Using

### Email Tracking
- **Open Tracking**: Know when users open emails
- **Click Tracking**: Track which links users click
- **Bounce Tracking**: Detect invalid emails

All tracking is enabled in `src/lib/email/mailgun.ts`:
```typescript
'o:tracking': 'yes',
'o:tracking-clicks': 'yes',
'o:tracking-opens': 'yes',
```

### Email Tags
We tag all emails for better organization:
- `welcome` - Welcome emails
- `digest` - Daily digest emails
- `event-alert` - Individual event notifications
- `test` - Test emails

View email stats by tag in Mailgun dashboard → Analytics

## Troubleshooting

### Emails not sending?
1. Check Mailgun API key is correct in `.env.local`
2. Verify domain DNS records are all green in Mailgun dashboard
3. Check Mailgun logs: Dashboard → Sending → Logs
4. Ensure domain is not in sandbox mode (sandbox domains have recipient limits)

### Emails going to spam?
1. Verify SPF and DKIM records are properly configured
2. Use a custom domain (not a free email provider)
3. Warm up your domain by sending emails gradually
4. Ensure email content isn't spammy (avoid all caps, too many links)

### High bounce rate?
1. Validate email addresses before sending
2. Remove bounced emails from your list
3. Check that email content renders correctly

## Production Checklist

Before going live:
- [ ] Domain DNS records verified (green checkmarks)
- [ ] Welcome email tested and working
- [ ] Daily digest tested and working
- [ ] Email templates look good on mobile
- [ ] Unsubscribe links working
- [ ] Email tracking enabled
- [ ] Bounce handling configured
- [ ] Rate limits understood (check Mailgun plan)
- [ ] Custom domain (not sandbox mode)
- [ ] From address matches your domain

## Next Steps

1. Add welcome email to user signup flow
2. Create Edge Function for daily digest (runs at 8am AEST)
3. Add event alert emails (when new events published)
4. Create email preferences page (manage subscriptions)
5. Add unsubscribe handling
6. Set up Mailgun webhooks for bounce handling
