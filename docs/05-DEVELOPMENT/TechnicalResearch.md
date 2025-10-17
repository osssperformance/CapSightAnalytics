# CapSight Analytics - Technical Research
## Pre-Development Investigation

**Date:** October 15, 2025  
**Purpose:** Validate technical approach before writing full spec

---

## 1. Web Scraping (ASX Announcements)

### Challenge
Need to scrape ASX company announcements hourly for:
- New announcements (drilling results, quarterly reports, etc.)
- Director transactions (Form 3Y/3Z)
- Substantial holder changes (Form 603/604/605)

### ASX Data Sources

**ASX Announcements Platform:**
- URL: `https://www.asx.com.au/asx/v2/statistics/announcements.csv`
- Alternative: `https://www.asx.com.au/asxpdf/[date]/pdf/[id].pdf`
- Format: Publicly accessible, no authentication required
- Rate limits: Unknown (need to test)
- Update frequency: Real-time during market hours

**Government Critical Minerals Data:**
- Geoscience Australia API: `https://portal.ga.gov.au/`
- Department of Industry grants database
- Critical Minerals Facility project listings
- Free, public access
- Update frequency: Quarterly/as announced

**Structure:**
```
Company Code, Announcement ID, Date/Time, Headline, URL, Price Sensitive, Critical Mineral Flag
LTR, 4567890, 2025-10-15 09:30, "Drilling Results Phase 3", https://..., Yes, Lithium
```

### Recommended Approach

**Option 1: Cheerio (Lightweight, Fast)**
```javascript
// Supabase Edge Function
import * as cheerio from 'cheerio';

export async function scrapeASX() {
  const response = await fetch('https://www.asx.com.au/asx/v2/statistics/announcements.csv');
  const html = await response.text();
  const $ = cheerio.load(html);
  
  // Parse announcement data
  const announcements = [];
  $('tr').each((i, row) => {
    // Extract company code, title, URL, etc.
  });
  
  return announcements;
}
```

**Pros:**
- Fast (no headless browser)
- Low memory usage
- Perfect for static HTML/CSV
- Works in Supabase Edge Functions

**Cons:**
- Can't handle JavaScript-rendered content
- Breaks if ASX changes structure

**Option 2: Puppeteer via n8n**
```javascript
// n8n workflow
{
  "nodes": [
    {
      "type": "n8n-nodes-base.httpRequest",
      "url": "https://www.asx.com.au/markets/company/[code]"
    },
    {
      "type": "puppeteer-scraper",
      "waitForSelector": ".announcement-list"
    }
  ]
}
```

**Pros:**
- Handles JavaScript rendering
- Can take screenshots for evidence
- Visual workflow (easy to debug)

**Cons:**
- Slower (browser overhead)
- More expensive (compute)
- Harder to run in Edge Functions

**RECOMMENDATION: Start with Cheerio + CSV endpoint, fallback to Puppeteer if needed**

### Legal/Ethical Considerations

**ASX Terms of Service:**
- ✅ Announcements are public domain
- ✅ No authentication required
- ⚠️ Respect robots.txt (check first)
- ⚠️ Don't overwhelm their servers (hourly scrapes OK)

**Rate Limiting Strategy:**
- Max 1 request per minute
- Cache aggressively (1 hour for historical)
- Use exponential backoff on failures

---

## 2. Email Management & Notifications

### Challenge
Need to send:
- Daily digest emails (1,000+ users)
- Real-time event alerts
- Watchlist notifications
- Company announcement updates

### Email Provider: Mailgun

**Why Mailgun over Resend/SendGrid:**
- ✅ Team experience with Mailgun
- ✅ Proven deliverability track record
- ✅ Better analytics (opens, clicks, bounces)
- ✅ Robust API with webhook support
- ✅ Enterprise-grade reliability

**Pricing:**
- Foundation: $35/month for 50,000 emails
- Growth: $80/month for 100,000 emails
- At scale: Custom pricing for enterprise

**Note:** Slightly more expensive than Resend, but offers better features for monitoring email deliverability and engagement metrics, which are critical for daily digest success.

### Implementation Strategy

**1. Email Templates (React Email)**
```jsx
// components/emails/DailyDigest.tsx
import { Html, Head, Body, Container, Text, Link, Img } from '@react-email/components';

export default function DailyDigest({ user, events }) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Img src="logo.png" alt="CapSight" />
          <Text>Hi {user.name},</Text>
          <Text>Here are today's events for your watchlist:</Text>
          
          {events.map(event => (
            <div key={event.id}>
              <Text>{event.company_name} - {event.title}</Text>
              <Text>{event.date}</Text>
              <Link href={`https://capsight.com/events/${event.id}`}>
                View Details
              </Link>
            </div>
          ))}
        </Container>
      </Body>
    </Html>
  );
}
```

**2. Sending Daily Digests (Batch)**
```typescript
// Supabase Edge Function: /functions/send-daily-digest/index.ts
import FormData from 'https://esm.sh/form-data@4.0.0';
import { createClient } from '@supabase/supabase-js';

const MAILGUN_API_KEY = Deno.env.get('MAILGUN_API_KEY')!
const MAILGUN_DOMAIN = Deno.env.get('MAILGUN_DOMAIN')!  // e.g., 'mg.capsight.com'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL'),
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
);

export default async function handler(req: Request) {
  // Get all users with daily digest enabled
  const { data: users } = await supabase
    .from('users')
    .select('*, watchlist:companies(*)')
    .eq('notification_preferences->daily_digest', true);
  
  // Get today's events for each user's watchlist
  const emails = [];
  for (const user of users) {
    const { data: events } = await supabase
      .from('events')
      .select('*, company:companies(*)')
      .in('company_id', user.watchlist.map(c => c.id))
      .gte('date', new Date().toISOString())
      .lte('date', new Date(Date.now() + 24*60*60*1000).toISOString());
    
    if (events.length > 0) {
      // Send email via Mailgun
      const formData = new FormData()
      formData.append('from', 'CapSight <digest@capsight.com>')
      formData.append('to', user.email)
      formData.append('subject', `Your Daily Digest - ${events.length} Events Today`)
      formData.append('html', generateDigestHTML(user, events))

      await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
        },
        body: formData,
      })

      emailsSent++
    }
  }

  // Process in batches to avoid overwhelming API
  for (let i = 0; i < users.length; i += 100) {
    const batch = users.slice(i, i + 100);
    // Process batch...
  }
  
  return new Response(JSON.stringify({ sent: emails.length }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

**3. Scheduled with Supabase Cron**
```sql
-- Run daily digest at 9am AEST
SELECT cron.schedule(
  'daily-digest',
  '0 9 * * *', -- Every day at 9am
  $$
  SELECT net.http_post(
    url := 'https://your-project.supabase.co/functions/v1/send-daily-digest',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'anon_key')
    )
  )
  $$
);
```

### Email List Management

**Unsubscribe Handling:**
```typescript
// /functions/unsubscribe/index.ts
export default async function handler(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token'); // Signed JWT with user_id
  
  // Verify token and update preferences
  const { user_id } = await verifyToken(token);
  
  await supabase
    .from('users')
    .update({ 
      notification_preferences: { 
        daily_digest: false,
        real_time_alerts: false 
      }
    })
    .eq('id', user_id);
  
  return new Response('You have been unsubscribed', { status: 200 });
}
```

**Bounce Handling (Webhook):**
```typescript
// Mailgun webhook handler
export default async function handler(req: Request) {
  const event = await req.json();

  // Mailgun sends different event types: bounced, failed, complained
  if (event['event-data']?.event === 'bounced' || event['event-data']?.event === 'failed') {
    await supabase
      .from('users')
      .update({ email_bounced: true })
      .eq('email', event['event-data']?.recipient);
  }

  return new Response('OK', { status: 200 });
}
```

### Deliverability Best Practices

**SPF/DKIM Setup:**
- Add DNS records for Mailgun
- Verify domain before sending
- Use subdomain (mg.capsight.com for sending)

**Content Guidelines:**
- Include unsubscribe link (legally required)
- Plain text alternative
- Reasonable send limits (not spam)
- Monitor bounce rates (<5%)

---

## 3. Supabase Capabilities & Edge Functions

### Edge Functions

**What They Are:**
- Serverless Deno functions
- Run on Cloudflare Workers (global)
- 10-50ms response time
- 10 second timeout (max)

**Perfect For:**
- API endpoints
- Webhook handlers
- Scheduled tasks (via cron)
- Data processing

**NOT Good For:**
- Long-running scrapes (>10s timeout)
- Heavy computation (CPU limits)
- Large file processing

**Solution for Long Tasks:**
Use background tasks + queues:

```typescript
// Edge function triggers background worker
export default async function handler(req: Request) {
  // Add job to queue
  await supabase
    .from('scrape_queue')
    .insert({ status: 'pending', url: 'asx.com.au' });
  
  // Return immediately
  return new Response('Queued', { status: 202 });
}

// Separate cron job processes queue
SELECT cron.schedule(
  'process-scrape-queue',
  '*/5 * * * *', -- Every 5 minutes
  $$
  SELECT process_scrape_queue(); -- Your PL/pgSQL function
  $$
);
```

### Cron Jobs (pg_cron)

**Native Postgres Extension:**
- Runs SQL directly on database
- Can trigger Edge Functions
- Persistent (survives restarts)
- Free (included in Supabase)

**Example Schedules:**
```sql
-- Scrape ASX announcements hourly
SELECT cron.schedule(
  'scrape-asx',
  '0 * * * *', -- Every hour
  $$
  SELECT net.http_post(
    url := 'https://your-project.supabase.co/functions/v1/scrape-asx'
  )
  $$
);

-- Send daily digest at 9am
SELECT cron.schedule(
  'daily-digest',
  '0 9 * * *',
  $$SELECT net.http_post(url := 'https://.../send-daily-digest')$$
);

-- Calculate algorithm scores every 6 hours
SELECT cron.schedule(
  'recalculate-scores',
  '0 */6 * * *',
  $$SELECT recalculate_all_scores()$$
);
```

### Real-Time Subscriptions

**WebSocket-Based Updates:**
```typescript
// Subscribe to new events
const subscription = supabase
  .channel('events')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'events'
  }, (payload) => {
    console.log('New event:', payload.new);
    // Update UI in real-time
  })
  .subscribe();
```

**Use Cases:**
- Live calendar updates (no refresh needed)
- Real-time notifications
- Collaborative editing
- Admin dashboard metrics

### Row Level Security (RLS)

**Secure by Default:**
```sql
-- Users can only see published events
CREATE POLICY "Public events are viewable by everyone"
ON events FOR SELECT
USING (published = true);

-- Company admins can only edit their own events
CREATE POLICY "Company admins can update own events"
ON events FOR UPDATE
USING (
  auth.uid() IN (
    SELECT user_id FROM users
    WHERE company_id = events.company_id
    AND role = 'company_admin'
  )
);
```

**Benefits:**
- No need for backend authorization logic
- Impossible to bypass (enforced at DB level)
- Automatic with Supabase client

---

## 4. Data Storage & File Handling

### Supabase Storage

**For PDFs, Images, Documents:**
```typescript
// Upload ASX announcement PDF
const { data, error } = await supabase.storage
  .from('announcements')
  .upload(`${company_code}/${announcement_id}.pdf`, file, {
    contentType: 'application/pdf',
    cacheControl: '3600',
    upsert: false
  });

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('announcements')
  .getPublicUrl(`${company_code}/${announcement_id}.pdf`);
```

**Pricing:**
- Free: 1GB storage
- Pro: $0.021/GB/month
- Bandwidth: $0.09/GB

**CDN Integration:**
- Automatic via Cloudflare
- Fast global delivery
- Image optimization (resize, webp)

### Database Limits

**Postgres on Supabase:**
- Free: 500MB, 2 CPU cores
- Pro: 8GB, unlimited connections
- Pooler for serverless (6,000 connections)

**Best Practices:**
- Use indexes on foreign keys
- Limit query result sizes (pagination)
- Use materialized views for heavy queries
- Archive old data (events >2 years)

**Critical Minerals Schema Additions:**
```sql
-- Add to companies table
ALTER TABLE companies ADD COLUMN critical_minerals TEXT[];
ALTER TABLE companies ADD COLUMN is_critical_minerals BOOLEAN DEFAULT false;
ALTER TABLE companies ADD COLUMN government_funding JSONB; -- Track grants, loans

-- Critical minerals reference table
CREATE TABLE critical_minerals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT, -- Battery materials, REE, Strategic metals
  government_priority BOOLEAN DEFAULT true,
  description TEXT,
  use_cases TEXT[],
  supply_risk TEXT, -- High, Medium, Low
  demand_drivers TEXT[]
);

-- Government incentives tracking
CREATE TABLE government_incentives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  program_name TEXT, -- Critical Minerals Facility, MMI
  amount_aud NUMERIC,
  announced_date DATE,
  status TEXT, -- Approved, Pending, Disbursed
  source_url TEXT
);

-- Indexes for filtering
CREATE INDEX idx_companies_critical ON companies(is_critical_minerals);
CREATE INDEX idx_companies_minerals ON companies USING GIN(critical_minerals);
```

---

## 5. Algorithm Implementation

### Computing Scores

**Option 1: On-Demand (Edge Function)**
```typescript
// Calculate when requested
GET /api/recommendations/:company_id

// Pros: Always fresh, no storage
// Cons: Slow (500ms+), compute cost
```

**Option 2: Pre-Calculated (Cron Job)**
```sql
-- Update scores every 6 hours
SELECT cron.schedule(
  'update-scores',
  '0 */6 * * *',
  $$
  UPDATE companies
  SET recommendation_score = calculate_score(id),
      score_updated_at = NOW()
  $$
);

// Pros: Fast reads (<10ms), cheap
// Cons: Slightly stale data (max 6 hours)
```

**RECOMMENDATION: Pre-calculated with manual refresh button**

### Algorithm Data Sources

**Already in Database:**
- ✅ Events (historical performance)
- ✅ Company info (projects, management)

**Need to Fetch:**
- ⚠️ Share prices (Yahoo Finance API)
- ⚠️ Director trades (scrape ASX)
- ⚠️ Social sentiment (Reddit/Twitter APIs)

**Data Freshness:**
- Share prices: Update every 15 min during market hours
- Director trades: Check daily (announcements are delayed 5 days anyway)
- Social sentiment: Update hourly
- Company scores: Recalculate every 6 hours

---

## 6. Third-Party APIs & Rate Limits

### Government Critical Minerals APIs

**Geoscience Australia:**
```typescript
const response = await fetch(
  'https://portal.ga.gov.au/api/v1/minerals/critical'
);
const data = await response.json();
```

**Rate Limits:**
- No strict limits (government API)
- Recommend caching (data changes infrequently)
- Update weekly or monthly

**Data Includes:**
- Project locations (lat/long)
- Mineral types
- Project stages
- Company information
- Government funding status

### Yahoo Finance (Share Prices)

**Free API:**
```typescript
const response = await fetch(
  `https://query1.finance.yahoo.com/v8/finance/chart/LTR.AX?interval=1d&range=1mo`
);
const data = await response.json();
```

**Rate Limits:**
- ~2,000 requests/hour
- No authentication needed
- Delayed 15-20 minutes

**Alternative: Alpha Vantage**
- 5 requests/minute (free)
- Real-time with paid tier

### Reddit API

**Official API:**
```typescript
// Get posts from r/ASX_Bets
const response = await fetch(
  'https://oauth.reddit.com/r/ASX_Bets/search.json?q=LTR&limit=100',
  {
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'User-Agent': 'CapSight/1.0'
    }
  }
);
```

**Rate Limits:**
- 60 requests/minute
- Requires OAuth2 (app registration)

**Alternative: Pushshift API**
- Historical data
- No authentication
- Slower updates

### Twitter/X API

**Basic Tier (Free):**
- 1,500 tweets/month
- ❌ Not enough for real-time

**Pro Tier ($100/month):**
- 500,000 tweets/month
- ✅ Sufficient for platform

**Alternative: Scraping (Risky)**
- Use nitter.net (unofficial mirror)
- May break without notice

---

## 7. Potential Issues & Mitigations

### Issue 1: ASX Blocks Scraping

**Risk:** High  
**Impact:** Critical (no data = no platform)

**Mitigation:**
1. Cache aggressively (announcements don't change)
2. Use multiple IPs (rotate proxies)
3. Manual fallback (admin enters data)
4. Official ASX data feed (paid, ~$500/month)

### Issue 2: Email Deliverability

**Risk:** Medium  
**Impact:** High (users don't get alerts)

**Mitigation:**
1. Warm up sending domain (start slow, increase volume)
2. Monitor bounce rates (<5%)
3. SPF/DKIM/DMARC setup
4. Allow users to whitelist emails
5. SMS fallback for critical alerts (Twilio)

### Issue 3: Algorithm Accuracy

**Risk:** Medium  
**Impact:** Medium (users lose trust)

**Mitigation:**
1. Backtest on historical data (validate before launch)
2. Show reasoning (transparency builds trust)
3. A/B test weight changes
4. Manual override for edge cases
5. Continuous learning (improve over time)

### Issue 4: Rate Limits (APIs)

**Risk:** Medium  
**Impact:** Medium (delayed updates)

**Mitigation:**
1. Cache responses (Redis/Supabase)
2. Queue requests (don't overwhelm APIs)
3. Upgrade to paid tiers when needed
4. Multiple data sources (fallbacks)

### Issue 5: Database Growth

**Risk:** Low  
**Impact:** Medium (slow queries, storage costs)

**Mitigation:**
1. Archive old events (>2 years)
2. Partition large tables
3. Use indexes on common queries
4. Materialized views for aggregations

### Issue 6: Edge Function Timeouts

**Risk:** Low  
**Impact:** Medium (failed scrapes)

**Mitigation:**
1. Use background tasks (don't block response)
2. Queue long operations
3. Process in chunks (pagination)
4. Separate functions (one task per function)

### Issue 7: Authentication & Security

**Risk:** Medium  
**Impact:** High (data breaches, unauthorized access)

**Challenges:**
- Company admins need secure access to their portal
- Users need to protect watchlists and preferences
- API keys must be stored securely
- GDPR/Privacy Act compliance required

**Mitigation:**
1. Use Supabase Auth (magic links + OAuth)
2. Implement Row Level Security (RLS) on all tables
3. Store API keys in Supabase Vault (encrypted)
4. Add 2FA for company admin accounts
5. Regular security audits
6. Data encryption at rest and in transit
7. Privacy policy + Terms of Service
8. User data export/deletion (GDPR compliance)

### Issue 8: Real-Time Updates at Scale

**Risk:** Medium  
**Impact:** Medium (laggy UI, poor UX)

**Challenges:**
- 1,000+ users watching calendar simultaneously
- Real-time updates when events added/changed
- WebSocket connection limits
- Database query performance under load

**Mitigation:**
1. Use Supabase real-time subscriptions (optimized)
2. Implement optimistic UI updates
3. Paginate calendar views (load only visible dates)
4. Use materialized views for aggregated data
5. CDN caching for static content
6. Database read replicas for scaling
7. Rate limit real-time subscriptions per user

### Issue 9: Mobile Performance (PWA)

**Risk:** Medium  
**Impact:** Medium (poor mobile UX)

**Challenges:**
- Calendar components heavy on mobile
- Offline functionality for saved watchlists
- Push notifications on mobile browsers
- Service worker caching strategy

**Mitigation:**
1. Lazy load calendar components
2. Implement service worker for offline calendar
3. Use IndexedDB for local watchlist cache
4. Compress images and assets aggressively
5. Test on low-end Android devices
6. Progressive enhancement (works without JS)
7. Web Push API for notifications

### Issue 10: Data Quality & Validation

**Risk:** Medium  
**Impact:** High (bad data = bad decisions)

**Challenges:**
- Companies may enter incorrect event dates
- ASX announcements sometimes have typos
- Share price data can have gaps/errors
- Social sentiment can be manipulated (bots)

**Mitigation:**
1. Input validation on company portal (date formats, required fields)
2. Admin review queue for suspicious entries
3. Cross-reference share prices from multiple sources
4. Bot detection for social sentiment (verify account age, activity)
5. User reporting system (flag incorrect data)
6. Automated data quality checks (cron jobs)
7. Display confidence scores on algorithm outputs

### Issue 11: Timezone Handling

**Risk:** Low  
**Impact:** Medium (confused users, missed notifications)

**Challenges:**
- ASX operates in AEST/AEDT
- Users may be in different timezones
- Event times need to be localized
- Email digests need timezone-aware scheduling

**Mitigation:**
1. Store all times in UTC in database
2. Display times in user's local timezone (browser detection)
3. Allow users to set timezone preference
4. Show both AEST and local time on events
5. Timezone-aware cron jobs for emails
6. Clear timezone indicators in UI

### Issue 12: Search & Discovery

**Risk:** Low  
**Impact:** Medium (users can't find companies/events)

**Challenges:**
- Full-text search across 300+ companies
- Fuzzy matching (typos, abbreviations)
- Search performance at scale
- Filtering + sorting combinations

**Mitigation:**
1. Postgres full-text search (built-in)
2. Create tsvector columns with indexes
3. Implement search suggestions (typeahead)
4. Cache popular search results
5. Consider Algolia/Meilisearch if needed
6. Search analytics (track what users search for)

### Issue 13: Payment Processing (Company Subscriptions)

**Risk:** Medium  
**Impact:** Critical (no revenue)

**Challenges:**
- Accepting equity as payment (non-standard)
- Tracking share allocations
- Recurring billing for cash subscriptions
- Failed payment handling
- Invoice generation

**Mitigation:**
1. Use Stripe for cash subscriptions
2. Manual process for equity agreements (legal docs)
3. CRM system to track equity allocations (Airtable/Notion)
4. Automated dunning (retry failed payments)
5. Grace period before access removal
6. Automated invoice generation (PDFs via API)

### Issue 14: Content Moderation

**Risk:** Low  
**Impact:** Medium (spam, inappropriate content)

**Challenges:**
- Companies uploading spam documents
- Fake news in company descriptions
- Manipulative event titles
- Abusive user comments (if added)

**Mitigation:**
1. Manual approval for new companies (onboarding)
2. Automated content filters (keywords, patterns)
3. User reporting system
4. Admin moderation dashboard
5. Terms of service enforcement
6. Ratelimiting on uploads/submissions

### Issue 15: SEO & Discoverability

**Risk:** Medium  
**Impact:** Medium (low organic traffic)

**Challenges:**
- Competing with established platforms (Morningstar, Hot Copper)
- Dynamic calendar content (hard to index)
- Company profiles need to rank for ASX codes
- Meta tags and structured data

**Mitigation:**
1. Server-side rendering with Next.js (SEO-friendly)
2. Static generation for company profiles
3. Comprehensive meta tags (Open Graph, Twitter Cards)
4. Structured data (JSON-LD for events, companies)
5. Sitemap generation (companies, events, commodities)
6. Content marketing (blog, guides)
7. Backlink strategy (partnerships, PR)

### Issue 16: Testing & Quality Assurance

**Risk:** Medium  
**Impact:** High (bugs in production)

**Challenges:**
- Complex calendar UI (many edge cases)
- Algorithm accuracy (hard to test)
- Email deliverability testing
- Cross-browser compatibility
- Mobile device testing

**Mitigation:**
1. Unit tests for algorithm logic (Jest)
2. Integration tests for API endpoints (Vitest)
3. E2E tests for user flows (Playwright)
4. Email testing tools (Mailtrap, Litmus)
5. Visual regression testing (Percy, Chromatic)
6. Staging environment (exact replica of prod)
7. Beta testing with pilot companies
8. Bug bounty program (post-launch)

### Issue 17: Monitoring & Observability

**Risk:** Low  
**Impact:** High (can't debug issues)

**Challenges:**
- Tracking edge function errors
- Monitoring scraper health
- Email delivery failures
- Database performance bottlenecks
- User behavior analytics

**Mitigation:**
1. Sentry for error tracking (Edge Functions, frontend)
2. Supabase built-in logs (database queries)
3. Vercel Analytics (web vitals, performance)
4. Custom dashboard (scraper status, email stats)
5. Uptime monitoring (Pingdom, UptimeRobot)
6. Database query performance monitoring
7. User analytics (PostHog, Mixpanel)
8. Alerting system (PagerDuty, Slack webhooks)

### Issue 18: Compliance & Legal

**Risk:** Medium  
**Impact:** Critical (lawsuits, fines)

**Challenges:**
- Privacy Act 1988 compliance (Australia)
- Financial advice disclaimers (algorithm recommendations)
- ASX announcement republishing rights
- User data protection
- Company data accuracy responsibility

**Mitigation:**
1. Clear disclaimers ("not financial advice")
2. Privacy policy (user data handling)
3. Terms of service (platform liability limits)
4. Company agreement (data accuracy responsibility)
5. Legal review before launch
6. GDPR compliance (if EU users)
7. Right to be forgotten (data deletion)
8. Data breach notification procedures

### Issue 19: Competitor Response

**Risk:** Medium  
**Impact:** Medium (market pressure)

**Challenges:**
- Next Investors launches similar calendar
- Hot Copper adds event tracking
- Morningstar clones features
- ASX launches official calendar

**Mitigation:**
1. Network effects (more companies = more value)
2. Algorithm advantage (proprietary scoring)
3. Community building (engaged users)
4. First-mover advantage (establish brand)
5. Continuous innovation (stay ahead)
6. Patents/trademarks (protect IP)
7. Exclusive partnerships with companies

### Issue 20: Scaling Team & Operations

**Risk:** Low  
**Impact:** Medium (can't support growth)

**Challenges:**
- Support requests from 1,000+ users
- Onboarding 100+ companies
- Content moderation workload
- Feature requests prioritization
- Technical debt accumulation

**Mitigation:**
1. Help center/FAQ (self-service support)
2. Automated onboarding flows
3. Community forum (users help each other)
4. Support ticket system (Intercom, Zendesk)
5. Prioritization framework (RICE scoring)
6. Technical debt sprints (quarterly)
7. Hire support team (as revenue grows)

---

## 8. Development Workflow

### Environment Setup

**Local Development:**
```bash
# Supabase CLI for local database
npx supabase start

# Next.js dev server
npm run dev

# n8n for workflow testing
npx n8n start
```

**Testing:**
```bash
# Unit tests (algorithm logic)
npm run test:unit

# Integration tests (API endpoints)
npm run test:integration

# E2E tests (user flows)
npx playwright test
```

### Deployment Pipeline

**Vercel (Frontend + Edge Functions):**
1. Push to GitHub
2. Vercel auto-deploys
3. Preview URLs for PRs
4. Production on merge to main

**Supabase (Database + Storage):**
1. Migrations via CLI
2. Manual apply (review first)
3. Separate staging/production projects

**n8n (Scraping Workflows):**
1. Self-hosted on VPS/Docker
2. Export workflows as JSON
3. Version control in Git

---

## 9. Cost Projections

### Startup (0-100 users)

- **Supabase:** Pro tier $25/month (paid from start)
- **Vercel:** Pro tier $20/month (paid from start)
- **Mailgun:** Foundation tier $35/month (starting Week 10)
- **Domain:** $2/month
- **n8n:** Self-hosted on $5/month VPS

**Total: ~$87/month** (Weeks 1-9: ~$52/month, Weeks 10-16: ~$87/month)

### Growth (100-1,000 users)

- **Supabase:** $25/month (Pro)
- **Vercel:** $20/month (Pro)
- **Mailgun:** $35/month (Foundation - 50,000 emails)
- **Domain:** $2/month
- **n8n:** $10/month VPS
- **APIs:** $50/month (Yahoo, Reddit, Twitter)

**Total: ~$142/month**

### Scale (1,000-10,000 users)

- **Supabase:** $599/month (Team)
- **Vercel:** $20/month (Pro)
- **Mailgun:** $80/month (Growth - 100,000 emails)
- **Domain:** $2/month
- **n8n:** $50/month (dedicated server)
- **APIs:** $200/month
- **CDN/Images:** $50/month

**Total: ~$1,001/month**

---

## 10. Additional Research Areas

### Things We Should Test/Validate Before Building

**1. ASX Website Structure**
- [ ] Manually inspect ASX announcements page
- [ ] Check robots.txt file
- [ ] Test CSV endpoint availability
- [ ] Verify announcement PDF URLs are consistent
- [ ] Check for rate limiting (make 100 requests)

**2. Email Sending**
- [ ] Create Mailgun account
- [ ] Send 10 test emails (different templates)
- [ ] Test batch sending (100 emails)
- [ ] Verify delivery rates
- [ ] Check spam folder placement
- [ ] Test unsubscribe flow

**3. Algorithm Backtesting**
- [ ] Collect 12 months of historical ASX announcements
- [ ] Collect historical share price data
- [ ] Collect historical director trades
- [ ] Build simple algorithm v1
- [ ] Backtest against actual outcomes
- [ ] Measure accuracy (% of correct predictions)

**4. Performance Testing**
- [ ] Test Supabase Edge Function with 10s+ operation
- [ ] Benchmark database queries (100k+ events)
- [ ] Test calendar rendering with 1,000+ events
- [ ] Mobile performance on low-end device
- [ ] Measure PWA offline functionality

**5. Cost Validation**
- [ ] Estimate actual email volume (users × digests)
- [ ] Calculate storage costs (PDFs × companies)
- [ ] Project database size (events × years)
- [ ] Verify API pricing (Yahoo Finance, Reddit, Twitter)

**6. Legal/Compliance**
- [ ] Consult lawyer on financial disclaimers
- [ ] Review ASX terms of service (republishing)
- [ ] Draft privacy policy
- [ ] Draft terms of service
- [ ] GDPR requirements (if applicable)

**7. Competitor Analysis**
- [ ] Test Next Investors signup flow
- [ ] Analyze Hot Copper features
- [ ] Review Morningstar pricing
- [ ] Identify gaps we can fill
- [ ] Benchmark our features against competitors

**8. User Research**
- [ ] Interview 5-10 retail investors
- [ ] What platforms do they currently use?
- [ ] What's missing from existing tools?
- [ ] What would they pay for?
- [ ] What events matter most?

**9. Company Pilot Recruitment**
- [ ] Identify 10-20 target companies
- [ ] **Prioritize Critical Minerals companies** (government focus)
- [ ] Reach out to investor relations
- [ ] Gauge interest in platform
- [ ] Understand their pain points
- [ ] Validate pricing model (cash vs equity)

**10. Critical Minerals Validation**
- [ ] Verify official Australian Government list (current)
- [ ] Map ASX companies to critical minerals
- [ ] Test Geoscience Australia API
- [ ] Identify government funding sources to track
- [ ] Research supply chain priorities
- [ ] Validate investor interest in this filter

**11. Technical Prototyping**
- [ ] Build basic calendar (no backend)
- [ ] Test React Big Calendar library
- [ ] Build simple scraper (ASX)
- [ ] Test Supabase setup
- [ ] Deploy Hello World to Vercel
- [ ] Build Critical Minerals filter prototype

---

## 11. Critical Minerals Technical Implementation

### Why This Matters Technically

**Strategic Differentiation:**
- First platform to specifically track Australian Critical Minerals
- Government policy alignment (funding, approvals, strategic focus)
- Supply chain security narrative (diversification from China)
- Clean energy transition theme (EVs, batteries, renewables)

### Database Design

**Companies Table Extensions:**
```sql
CREATE TABLE companies (
  -- Existing fields
  id UUID PRIMARY KEY,
  asx_code TEXT UNIQUE,
  name TEXT,
  
  -- Commodities (all commodities the company works with)
  commodities TEXT[], -- Array: ['Gold', 'Copper', 'Silver']
  primary_commodity TEXT, -- 'Gold'
  secondary_commodities TEXT[], -- ['Copper', 'Silver']
  
  -- Critical Minerals (subset of commodities that are government priority)
  critical_minerals TEXT[], -- Array: ['Lithium', 'Tantalum'] (subset of commodities)
  is_critical_minerals BOOLEAN DEFAULT false, -- Has at least one critical mineral
  primary_critical_mineral TEXT, -- Main critical mineral focus
  government_funding JSONB -- {grants: [], loans: [], total_aud: 0}
);
```

**Example Data:**
```sql
-- Example 1: Pure gold company (not critical)
INSERT INTO companies VALUES (
  commodities: ['Gold'],
  primary_commodity: 'Gold',
  critical_minerals: NULL,
  is_critical_minerals: false
);

-- Example 2: Multi-commodity with some critical minerals
INSERT INTO companies VALUES (
  commodities: ['Nickel', 'Copper', 'Platinum', 'Gold'],
  primary_commodity: 'Nickel',
  secondary_commodities: ['Copper', 'Platinum', 'Gold'],
  critical_minerals: ['Nickel', 'Copper', 'Platinum'], -- Subset that are critical
  is_critical_minerals: true,
  primary_critical_mineral: 'Nickel'
);

-- Example 3: Pure lithium (critical only)
INSERT INTO companies VALUES (
  commodities: ['Lithium'],
  primary_commodity: 'Lithium',
  critical_minerals: ['Lithium'],
  is_critical_minerals: true,
  primary_critical_mineral: 'Lithium'
);
```

**Commodities Reference Table:**
```sql
CREATE TABLE commodities (
  id UUID PRIMARY KEY,
  name TEXT UNIQUE, -- 'Gold', 'Lithium', 'Copper'
  category TEXT, -- 'Precious Metals', 'Battery Metals', 'Base Metals', 'Bulk Commodities'
  is_critical BOOLEAN DEFAULT false, -- True if on government critical list
  symbol TEXT, -- Chemical symbol 'Au', 'Li', 'Cu'
  description TEXT,
  use_cases TEXT[],
  current_price_usd NUMERIC,
  price_source TEXT, -- 'Kitco', 'Trading Economics', 'Benchmark Mineral Intelligence'
  price_updated_at TIMESTAMPTZ
);

-- Seed data examples
INSERT INTO commodities VALUES
  ('Gold', 'Precious Metals', false, 'Au', 'Precious metal for jewelry and investment', ...),
  ('Lithium', 'Battery Metals', true, 'Li', 'Key battery material for EVs', ...),
  ('Iron Ore', 'Bulk Commodities', false, 'Fe', 'Primary steel-making ingredient', ...),
  ('Rare Earth Elements', 'Strategic Metals', true, 'REE', 'Group of 17 elements for magnets and tech', ...);
```

**Critical Minerals Reference Table:**
```sql
CREATE TABLE critical_minerals (
  id UUID PRIMARY KEY,
  name TEXT UNIQUE, -- 'Lithium'
  category TEXT, -- 'Battery Materials', 'REE', 'Strategic Metals'
  government_priority BOOLEAN DEFAULT true,
  description TEXT,
  use_cases TEXT[], -- ['EV Batteries', 'Energy Storage']
  supply_risk TEXT, -- 'High', 'Medium', 'Low'
  demand_drivers TEXT[], -- ['EV Transition', 'Renewable Energy']
  china_supply_percentage NUMERIC, -- e.g., 60.0 (for context)
  australian_resources TEXT, -- Description of AU reserves
  key_australian_projects TEXT[] -- Major projects
);
```

**Government Incentives Table:**
```sql
CREATE TABLE government_incentives (
  id UUID PRIMARY KEY,
  company_id UUID REFERENCES companies(id),
  program_name TEXT, -- 'Critical Minerals Facility', 'Modern Manufacturing Initiative'
  program_type TEXT, -- 'Grant', 'Loan', 'Tax Incentive'
  amount_aud NUMERIC,
  announced_date DATE,
  status TEXT, -- 'Approved', 'Pending', 'Disbursed'
  source_url TEXT, -- Link to official announcement
  description TEXT
);
```

### API Endpoints

**Filter by Commodities (All):**
```typescript
// GET /api/companies?commodity=Gold
// GET /api/companies?commodities=Gold,Silver,Copper
// GET /api/events?commodity=Lithium

async function getCompanies(filters: {
  commodity?: string
  commodities?: string[]
}) {
  let query = supabase.from('companies').select('*')
  
  if (filters.commodity) {
    query = query.contains('commodities', [filters.commodity])
  }
  
  if (filters.commodities) {
    // Companies that have ANY of these commodities
    query = query.overlaps('commodities', filters.commodities)
  }
  
  return query
}
```

**Filter by Critical Minerals (Subset):**
```typescript
// GET /api/companies?critical_minerals=true
// GET /api/companies?mineral=Lithium
// GET /api/events?critical_minerals=true

async function getCompanies(filters: {
  critical_minerals?: boolean
  mineral?: string
  commodity?: string
}) {
  let query = supabase.from('companies').select('*')
  
  // Option 1: Only companies with critical minerals
  if (filters.critical_minerals) {
    query = query.eq('is_critical_minerals', true)
  }
  
  // Option 2: Specific critical mineral
  if (filters.mineral) {
    query = query.contains('critical_minerals', [filters.mineral])
  }
  
  // Option 3: Any commodity (critical or not)
  if (filters.commodity) {
    query = query.contains('commodities', [filters.commodity])
  }
  
  return query
}
```

**Combined Filtering:**
```typescript
// GET /api/companies?commodity=Gold&critical_minerals=true
// Returns: Gold companies that are ALSO critical minerals (e.g., gold + REE projects)

// GET /api/companies?commodities=Copper,Nickel&critical_minerals=true
// Returns: Companies with Copper OR Nickel that are also critical minerals
```

**Government Incentives API:**
```typescript
// GET /api/companies/:id/incentives
async function getIncentives(companyId: string) {
  const { data } = await supabase
    .from('government_incentives')
    .select('*')
    .eq('company_id', companyId)
    .order('announced_date', { ascending: false })
  
  return data
}
```

### UI Components

**Commodity Badges (All Commodities):**
```tsx
function CommodityBadges({ commodities, criticalMinerals }: { 
  commodities: string[]
  criticalMinerals: string[]
}) {
  return (
    <div className="flex gap-1 flex-wrap">
      {commodities.map(commodity => {
        const isCritical = criticalMinerals?.includes(commodity)
        
        return (
          <span 
            key={commodity} 
            className={isCritical ? "badge badge-critical" : "badge badge-commodity"}
          >
            {commodity} {isCritical && "⭐"}
          </span>
        )
      })}
    </div>
  )
}

// Example usage:
<CommodityBadges 
  commodities={['Gold', 'Lithium', 'Copper']} 
  criticalMinerals={['Lithium', 'Copper']} 
/>
// Renders:
// [Gold] [Lithium ⭐] [Copper ⭐]
```

**Filter Component (Comprehensive):**
```tsx
function CommodityFilter() {
  const allCommodities = [
    { name: 'Gold', category: 'Precious Metals', critical: false },
    { name: 'Silver', category: 'Precious Metals', critical: false },
    { name: 'Lithium', category: 'Battery Metals', critical: true },
    { name: 'Copper', category: 'Base Metals', critical: true },
    { name: 'Nickel', category: 'Battery Metals', critical: true },
    { name: 'Iron Ore', category: 'Bulk Commodities', critical: false },
    { name: 'Rare Earths', category: 'Strategic Metals', critical: true },
    // ... etc
  ]
  
  return (
    <div className="filter-panel">
      {/* Quick toggle for critical minerals only */}
      <label className="critical-toggle">
        <input type="checkbox" name="critical_minerals_only" />
        <span className="toggle-label">
          ⭐ Critical Minerals Only
        </span>
      </label>
      
      <hr />
      
      {/* Commodity selection by category */}
      <div className="commodity-categories">
        <h3>Precious Metals</h3>
        <label><input type="checkbox" value="Gold" /> Gold</label>
        <label><input type="checkbox" value="Silver" /> Silver</label>
        
        <h3>Battery Metals</h3>
        <label><input type="checkbox" value="Lithium" /> Lithium ⭐</label>
        <label><input type="checkbox" value="Cobalt" /> Cobalt ⭐</label>
        <label><input type="checkbox" value="Nickel" /> Nickel (Battery) ⭐</label>
        
        <h3>Base Metals</h3>
        <label><input type="checkbox" value="Copper" /> Copper ⭐</label>
        <label><input type="checkbox" value="Zinc" /> Zinc</label>
        
        <h3>Strategic Metals</h3>
        <label><input type="checkbox" value="Rare Earths" /> Rare Earth Elements ⭐</label>
        <label><input type="checkbox" value="Tungsten" /> Tungsten ⭐</label>
        
        <h3>Bulk Commodities</h3>
        <label><input type="checkbox" value="Iron Ore" /> Iron Ore</label>
        <label><input type="checkbox" value="Coal" /> Coal</label>
      </div>
      
      <hr />
      
      {/* Government funding filter */}
      <label>
        <input type="checkbox" name="government_funded" />
        Government Funded Projects Only
      </label>
    </div>
  )
}
```

**Calendar Event Card:**
```tsx
function EventCard({ event }: { event: Event }) {
  return (
    <div className="event-card">
      <div className="company-header">
        <img src={event.company.logo} />
        <span>{event.company.asx_code}</span>
      </div>
      
      <h3>{event.title}</h3>
      
      {/* Show all commodities with critical mineral indicators */}
      <CommodityBadges 
        commodities={event.company.commodities}
        criticalMinerals={event.company.critical_minerals}
      />
      
      <div className="event-meta">
        <span>{event.date}</span>
        <span>{event.type}</span>
      </div>
    </div>
  )
}
```

### Data Collection Strategy

**1. Manual Seed Data (Week 1):**
- Research ASX companies
- Identify which are Critical Minerals focused
- Tag each with relevant minerals
- Input into database manually (one-time)

**2. Government API Integration (Week 2-3):**
```typescript
// Edge Function: sync-government-data
async function syncGovernmentData() {
  // Fetch from Geoscience Australia
  const projects = await fetch('https://portal.ga.gov.au/api/v1/minerals/critical')
  
  // Match to ASX companies by name/location
  for (const project of projects) {
    const company = await findCompanyByName(project.company_name)
    
    if (company) {
      // Update critical minerals tags
      await supabase
        .from('companies')
        .update({
          critical_minerals: project.minerals,
          is_critical_minerals: true
        })
        .eq('id', company.id)
    }
  }
}

// Run weekly
SELECT cron.schedule(
  'sync-government-data',
  '0 0 * * 0', -- Every Sunday
  $$SELECT net.http_post(url := 'https://.../sync-government-data')$$
);
```

**3. News Monitoring (Ongoing):**
- Track Department of Industry announcements
- Monitor Critical Minerals Facility approvals
- Update government_incentives table
- Send alerts to users watching these companies

### Search & Filtering Implementation

**Full-Text Search with Commodities:**
```sql
-- Add search vector
ALTER TABLE companies ADD COLUMN search_vector tsvector;

-- Update function (includes ALL commodities)
CREATE OR REPLACE FUNCTION companies_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.asx_code, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(array_to_string(NEW.commodities, ' '), '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(array_to_string(NEW.critical_minerals, ' '), '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
CREATE TRIGGER companies_search_vector_trigger
BEFORE INSERT OR UPDATE ON companies
FOR EACH ROW EXECUTE FUNCTION companies_search_vector_update();

-- Index
CREATE INDEX companies_search_idx ON companies USING GIN(search_vector);

-- Additional indexes for fast filtering
CREATE INDEX idx_companies_commodities ON companies USING GIN(commodities);
CREATE INDEX idx_companies_critical ON companies USING GIN(critical_minerals);
CREATE INDEX idx_companies_is_critical ON companies(is_critical_minerals);
```

**Search Query Examples:**
```typescript
// Search for "lithium" returns:
// - Companies with "lithium" in name (e.g., "Core Lithium")
// - Companies with lithium in commodities array
// - Companies with lithium in critical_minerals array
const { data } = await supabase
  .from('companies')
  .select('*')
  .textSearch('search_vector', 'lithium')

// Search for "gold" returns:
// - Companies with "gold" in name (e.g., "Northern Star Gold")
// - Companies with gold in commodities array
// - Both critical and non-critical gold companies
const { data } = await supabase
  .from('companies')
  .select('*')
  .textSearch('search_vector', 'gold')

// Filter: Gold companies that are ALSO critical minerals
const { data } = await supabase
  .from('companies')
  .select('*')
  .contains('commodities', ['Gold'])
  .eq('is_critical_minerals', true)
// Returns: Companies doing Gold + another critical mineral (e.g., Gold + REE)
```

### SEO Strategy for Commodities & Critical Minerals

**Landing Pages (All Commodities):**
- `/commodities` - Overview of all commodities
- `/commodities/gold` - Gold companies
- `/commodities/lithium` - Lithium companies (critical mineral ⭐)
- `/commodities/copper` - Copper companies (critical mineral ⭐)
- `/commodities/iron-ore` - Iron ore companies
- `/commodities/rare-earths` - REE companies (critical mineral ⭐)

**Critical Minerals Hub:**
- `/critical-minerals` - Overview of all critical minerals
- `/critical-minerals/battery-metals` - Lithium, Nickel, Cobalt, Graphite
- `/critical-minerals/rare-earths` - REE companies
- `/critical-minerals/government-funding` - Companies with grants/loans

**Content Strategy:**
- "ASX Gold Companies: Complete List 2025"
- "Australian Lithium Companies: Critical Minerals Leaders" (combines commodity + critical)
- "Critical Minerals vs Regular Commodities: What Investors Need to Know"
- "Government Funding for Critical Minerals Projects"
- "ASX Copper Companies: Critical Mineral Opportunities"

**URL Strategy Examples:**
```
/commodities/lithium → All lithium companies (86 companies)
/critical-minerals/lithium → Same page, different URL (SEO for both terms)
/commodities/gold → All gold companies (400+ companies)
/critical-minerals?commodity=gold → Gold companies that also do critical minerals (50 companies)
```

**Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "ASX Lithium Companies - Complete List",
  "keywords": ["Lithium", "ASX", "Battery Metals", "Critical Minerals"],
  "about": [
    {
      "@type": "Thing",
      "name": "Lithium",
      "additionalType": "Critical Mineral"
    },
    {
      "@type": "Thing", 
      "name": "Battery Metals"
    }
  ]
}
```

---

## 12. Technical Stack Summary

### Confirmed Choices

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | Next.js 15 + TypeScript | SSR, API routes, React 19 |
| Styling | Tailwind + shadcn/ui | Fast, accessible, beautiful |
| Database | Supabase (Postgres) | Real-time, auth, storage, RLS |
| Functions | Supabase Edge (Deno) | Serverless, fast, global |
| Email | Mailgun | Proven deliverability, team experience |
| Hosting | Vercel | Auto-scale, CDN, preview deploys |
| Scraping | Cheerio + n8n | Lightweight, visual workflows |
| Calendar | Custom (react-aria + Framer Motion) | Complete UX control, unique features, performance-optimized |
| Charts | Recharts | React-native, responsive |

### Open Questions

1. **Social sentiment:** Twitter API ($100/month) or scrape?
2. **Share prices:** Yahoo Finance (free, delayed) or Alpha Vantage (paid, real-time)?
3. **Deployment:** Single Vercel project or separate frontend/API?
4. **Testing:** Playwright (E2E) or Cypress?

---

## 13. Next Steps

### Before Writing Full Spec

- [ ] Test ASX scraping (verify structure)
- [ ] Check robots.txt on ASX website
- [ ] Test Resend free tier (send 10 emails)
- [ ] Verify Supabase Edge Function timeout (run 10s+ job)
- [ ] Benchmark algorithm calculation time (mock data)
- [ ] Test Yahoo Finance API rate limits

### Week 1 Tasks

- [ ] Set up Supabase project
- [ ] Initialize Next.js repo
- [ ] Create database schema
- [ ] Build first scraper (ASX announcements)
- [ ] Set up Mailgun domain and DNS verification
- [ ] Deploy to Vercel (staging)

---

**Ready for Technical Spec:** ✅  
**Confidence Level:** High  
**Remaining Risks:** Low (all major blockers researched)
### Custom Calendar Decision

**Why Custom over react-big-calendar:**
1. **Product Differentiation:** Calendar IS the product, not a feature
2. **UX Control:** Every interaction tuned for commodity investors
3. **Unique Features:** Smart clustering, predictive highlighting, heatmap overlay
4. **Performance:** Optimized for 1,000+ events with virtualization
5. **Brand Moat:** Competitors can't easily copy custom implementation

**Architecture:**
- Headless calendar logic: @internationalized/date (dates) + react-aria (accessibility)
- Custom rendering: Full control over month/week/day/list views
- Animations: Framer Motion for delightful micro-interactions
- Mobile: react-use-gesture for swipe/pinch navigation
- Performance: @tanstack/react-virtual for large date ranges

**Development Time:** 8 weeks (strategic investment in core product)

