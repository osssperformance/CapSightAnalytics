# 📋 CAPSIGHT ANALYTICS SPECIFICATIONS
## Project-Specific Configuration & Information

> **Note:** For system documentation and workflows, see `CLAUDE.md`

---

## 🎯 PROJECT OVERVIEW

**Project Name:** CapSight Analytics
**Version:** 1.0 (MVP)
**Purpose:** Calendar-first platform for ASX commodities investors to track exploration events, company announcements, and receive algorithm-driven recommendations
**Status:** Pre-Development (Planning Complete)
**Created:** October 17, 2025
**Last Updated:** October 17, 2025

### Business Context
- **Problem it solves:** ASX commodities investors miss critical exploration events (drilling results, assays, JORC updates) because announcements are scattered. No centralized calendar exists for tracking these time-sensitive opportunities, especially for Critical Minerals.
- **Target audience:**
  - Primary: Retail investors focused on ASX exploration companies (gold, lithium, copper, REE)
  - Secondary: ASX-listed exploration companies (revenue via subscriptions)
  - Tertiary: Critical Minerals investors (government policy-aligned opportunities)
- **Business model:**
  - Companies: $500-750/month subscription (cash or equity)
  - Investors: Freemium ($0) + Premium ($29/month)
  - Target: 50 companies ($25k MRR) + 50 premium users ($1.5k MRR) by Month 6

### Core Features
- **Calendar-first interface** - Month/week/list views with real-time updates
- **Critical Minerals focus** - Government-aligned filter for strategic commodities
- **Company Portal** - Self-service event/document management for ASX companies
- **Watchlist & Notifications** - Daily digest emails for tracked companies
- **Algorithm V1** - Event frequency + insider buying + Critical Minerals scoring
- **Calendar Export** - .ics files and webcal:// feed subscription

---

## 🔧 TECHNICAL DETAILS

### Tech Stack
- **Framework:** Next.js 15.0.0 (App Router)
- **Language:** TypeScript 5.3
- **Runtime:** React 19
- **Database:** Supabase (PostgreSQL 15)
- **Authentication:** Supabase Auth (Magic Links)
- **Styling:** Tailwind CSS 3.4 + shadcn/ui
- **Email:** Mailgun (Foundation tier)
- **Edge Functions:** Supabase Edge Functions (Deno 1.37)
- **Deployment:** Vercel (Pro tier, Sydney region)
- **Monitoring:** Sentry + PostHog
- **Cron Jobs:** pg_cron (PostgreSQL extension)

### Architecture Decisions

**1. Supabase over Firebase**
- Row Level Security (RLS) for multi-tenant data isolation
- Built-in real-time subscriptions (WebSocket)
- PostgreSQL advanced queries (arrays, JSONB, full-text search)
- Avoids vendor lock-in (standard Postgres)

**2. Next.js 15 Server Components**
- Server-side rendering for SEO (company profiles, commodity pages)
- API routes co-located with frontend
- Edge runtime for global performance
- Streaming for fast initial page loads

**3. Mailgun over Resend**
- Team has existing experience with Mailgun
- Better analytics (open rates, click tracking, bounce handling)
- Proven deliverability for daily digest emails (30k+/month)
- Webhook support for bounce/complaint handling

**4. Company-first Data Strategy**
- Primary: 100 invited companies submit events directly (legal, accurate)
- Secondary: ASX scraping as fallback for non-participating companies
- Reduces legal risk (companies opt-in to share data)

**5. Edge Function Architecture**
- Vercel API Routes (25s timeout): User-facing requests
- Supabase Edge Functions (150s timeout): Background jobs (scraping, emails)
- pg_cron (unlimited): Scheduled tasks (daily digest, score recalculation)

---

## 🌐 URLS & ENDPOINTS

### Application URLs
- **Local:** http://localhost:3000
- **Staging:** TBD (Vercel preview deployments)
- **Production:** https://capsight.com (planned)

### API Endpoints

**Public Routes:**
```
GET  /api/events              - List events (filtered)
GET  /api/events/:id          - Event details
GET  /api/companies           - List companies (filtered)
GET  /api/companies/:id       - Company profile
GET  /api/commodities         - List all commodities
GET  /api/critical-minerals   - Critical minerals hub
```

**Authenticated User Routes:**
```
GET  /api/watchlist           - User's watchlist
POST /api/watchlist           - Add company to watchlist
GET  /api/recommendations     - Algorithm recommendations (premium)
GET  /api/calendar/export     - .ics file export
GET  /api/calendar/feed       - webcal:// subscription
```

**Company Portal Routes:**
```
GET  /api/company/events      - Company's events (RLS filtered)
POST /api/company/events      - Create event
PUT  /api/company/events/:id  - Edit event
GET  /api/company/documents   - Company's documents
POST /api/company/documents   - Upload document
```

**Admin Routes:**
```
GET  /api/admin/companies     - Approve/reject companies
GET  /api/admin/analytics     - Platform metrics
POST /api/admin/moderate      - Content moderation
```

**Edge Functions (Supabase):**
```
POST /functions/v1/scrape-asx           - Scrape ASX announcements
POST /functions/v1/send-daily-digest    - Send email digest
POST /functions/v1/calculate-scores     - Recalculate algorithm scores
```

---

## 🔐 ENVIRONMENT VARIABLES

### Required Variables
```bash
# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # Server-side only

# Authentication
NEXTAUTH_URL=http://localhost:3000  # or production URL
NEXTAUTH_SECRET=your-secret-key-here

# Email (Mailgun)
MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_DOMAIN=mg.capsight.com

# Base URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Optional Variables
```bash
# Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Error Tracking
SENTRY_DSN=https://...@sentry.io/...

# Feature Flags
ENABLE_ALGORITHM=true
ENABLE_PREMIUM=false
ENABLE_SMS_ALERTS=false

# External APIs
YAHOO_FINANCE_API_KEY=optional  # Uses free endpoint
REDDIT_CLIENT_ID=optional       # For sentiment (Phase 3)
TWITTER_API_KEY=optional        # For sentiment (Phase 3)
```

---

## 📁 PROJECT STRUCTURE

```
capsight-analytics/
├── app/                      # Next.js 15 App Router
│   ├── (public)/            # Public routes (landing, calendar)
│   │   ├── page.tsx         # Homepage
│   │   ├── calendar/        # Calendar views
│   │   └── companies/       # Company profiles
│   ├── (auth)/              # Authenticated routes
│   │   ├── dashboard/       # User dashboard
│   │   └── watchlist/       # Watchlist management
│   ├── (company)/           # Company portal
│   │   ├── portal/          # Company admin dashboard
│   │   └── events/          # Event CRUD
│   ├── (admin)/             # Platform admin
│   │   └── admin/           # Admin dashboard
│   ├── api/                 # API routes
│   │   ├── events/          # Event endpoints
│   │   ├── companies/       # Company endpoints
│   │   └── webhooks/        # Mailgun, Stripe webhooks
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── calendar/            # Calendar components
│   ├── company/             # Company-specific components
│   └── shared/              # Shared components
├── lib/                     # Utilities
│   ├── supabase/            # Supabase client + types
│   ├── utils.ts             # Helper functions
│   ├── hooks/               # Custom React hooks
│   └── validators/          # Zod schemas
├── supabase/                # Supabase configuration
│   ├── migrations/          # Database migrations
│   ├── functions/           # Edge Functions
│   │   ├── scrape-asx/      # ASX scraper
│   │   ├── send-daily-digest/ # Email digest
│   │   └── calculate-scores/  # Algorithm
│   └── seed.sql             # Seed data
├── public/                  # Static assets
│   ├── icons/               # PWA icons
│   └── images/              # Company logos, etc.
├── docs/                    # Project documentation
│   ├── 01-GETTING-STARTED/
│   ├── 02-ARCHITECTURE/
│   ├── 05-DEVELOPMENT/      # Technical specs
│   └── ...
├── tests/                   # Test files
│   ├── unit/                # Unit tests (Vitest)
│   ├── integration/         # API tests
│   └── e2e/                 # Playwright E2E tests
├── .env.local               # Local environment variables
├── .env.example             # Example environment file
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

### Key Directories
- **app/(public):** Public-facing pages (calendar, company profiles, landing page)
- **app/(auth):** User dashboard, watchlist, preferences (requires login)
- **app/(company):** Company portal for event management (company admin role)
- **app/(admin):** Platform admin tools (approval, moderation, analytics)
- **supabase/migrations:** Database schema changes (version controlled)
- **supabase/functions:** Edge Functions for background tasks
- **components/ui:** shadcn/ui components (Button, Dialog, Calendar, etc.)
- **lib/supabase:** Supabase client setup (browser, server, admin)

### Important Files
- **supabase/migrations/20251017_initial_schema.sql:** Complete database schema
- **lib/supabase/database.types.ts:** Auto-generated TypeScript types from Supabase
- **app/api/webhooks/mailgun/route.ts:** Email bounce/complaint handler
- **components/calendar/EventCalendar.tsx:** Main calendar component (react-big-calendar)
- **supabase/functions/send-daily-digest/index.ts:** Daily email digest Edge Function

---

## 🚀 DEVELOPMENT

### Setup
```bash
# Clone repository
git clone https://github.com/osssperformance/CapSightAnalytics.git
cd CapSightAnalytics

# Install dependencies
npm install  # or pnpm install

# Set up Supabase locally (optional)
npx supabase start

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase project URL, keys, etc.

# Run database migrations
npx supabase db push

# Seed database with sample data
npx supabase db seed

# Run development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start Next.js development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Vitest unit tests
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run db:migrate` - Apply database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:reset` - Reset database (migrations + seed)
- `npm run type-check` - Run TypeScript compiler check

---

## 🧪 TESTING

### Test Strategy
- **Unit Tests:** Vitest for algorithm logic, utility functions
- **Integration Tests:** Vitest + Supabase local for API endpoint testing
- **E2E Tests:** Playwright for critical user flows

### Critical Test Paths
1. **User signup → watchlist → receive email digest**
   - Magic link authentication
   - Add companies to watchlist
   - Verify email received with correct events
2. **Company creates event → appears on calendar → users notified**
   - Company admin login
   - Create event (draft → publish)
   - Verify event appears on public calendar
   - Verify watchlist users receive email
3. **Filter by Critical Minerals → correct results**
   - Apply Critical Minerals filter
   - Verify only Critical Minerals companies shown
   - Test commodity filter combinations

### Performance Requirements
- **Page load:** <2s (calendar, homepage, company profiles)
- **API response:** <100ms (filtering, search)
- **Calendar rendering:** <500ms (1,000+ events)
- **Database queries:** <50ms (with proper indexes)
- **Email delivery:** 95%+ success rate, <5% bounce

---

## 📝 DEPLOYMENT

### Build Process
```bash
# Build Next.js application
npm run build

# Deploy Supabase Edge Functions
npx supabase functions deploy scrape-asx
npx supabase functions deploy send-daily-digest
npx supabase functions deploy calculate-scores

# Run database migrations on production
npx supabase db push --db-url $SUPABASE_DB_URL
```

### Deployment Platforms
- **Platform:** Vercel (Pro tier, Sydney region for low latency)
- **Database:** Supabase (Pro tier, co-located with Vercel)
- **Edge Functions:** Supabase Edge Functions (Deno runtime)
- **CI/CD:** GitHub Actions + Vercel auto-deploy on merge to `main`

### Deployment Checklist
- [ ] Environment variables set in Vercel
- [ ] Database migrations applied to production Supabase
- [ ] Mailgun domain verified (SPF/DKIM records)
- [ ] Edge Functions deployed and tested
- [ ] Cron jobs scheduled (daily digest, scraper, scores)
- [ ] Tests passing (unit, integration, E2E)
- [ ] Build successful (no TypeScript errors)
- [ ] Sentry error tracking configured
- [ ] PostHog analytics tracking configured
- [ ] PWA manifest and icons added
- [ ] SEO meta tags and structured data verified

---

## ⚠️ KNOWN ISSUES

### Current Bugs
- None (pre-development)

### Technical Debt
- **ASX scraping legality:** Requires legal review before implementation (Week 1 priority)
- **Email warm-up:** Mailgun sending needs gradual ramp-up to avoid spam filters
- **Algorithm accuracy:** Needs backtesting with 12+ months historical data before launch

### Limitations
- **Real-time updates:** Limited to 1,000 concurrent WebSocket connections (Supabase Pro tier)
- **Edge Function timeout:** 150s max for Supabase Edge Functions (use pg_cron for longer tasks)
- **Share price data:** 15-20 min delay (Yahoo Finance free tier)
- **Email volume:** 50,000 emails/month max (Mailgun Foundation tier)
- **Browser support:** No IE11 (modern browsers only)

---

## 👥 TEAM & RESOURCES

### Team Members
- **Full-Stack Lead:** TBD (40 hours/week, backend APIs, database, auth, Edge Functions)
- **Frontend Developer:** TBD (40 hours/week, calendar UI, company portal, mobile responsive)
- **Data Engineer (Part-time):** TBD (20-40 hours/week, ASX scraper, algorithm, government APIs)
- **Business Lead:** TBD (20-30 hours/week, company outreach, user research, support)

### Resources
- **Repository:** https://github.com/osssperformance/CapSightAnalytics.git
- **Documentation:** [docs/](docs/) folder (comprehensive specs, development plan)
- **Supabase Dashboard:** https://app.supabase.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Mailgun Dashboard:** https://app.mailgun.com/
- **Sentry Dashboard:** https://sentry.io
- **PostHog Dashboard:** https://app.posthog.com

---

## 📚 RELATED DOCUMENTS

- [CLAUDE.md](CLAUDE.md) - System documentation and workflows
- [docs/05-DEVELOPMENT/TECHNICALSPEC.md](docs/05-DEVELOPMENT/TECHNICALSPEC.md) - Complete technical specification
- [docs/05-DEVELOPMENT/DevelopmentPlan.md](docs/05-DEVELOPMENT/DevelopmentPlan.md) - 16-week roadmap
- [docs/05-DEVELOPMENT/ProjectScopeDocument.md](docs/05-DEVELOPMENT/ProjectScopeDocument.md) - Scope and boundaries
- [docs/05-DEVELOPMENT/TechnicalResearch.md](docs/05-DEVELOPMENT/TechnicalResearch.md) - Pre-development research
- [docs/02-ARCHITECTURE/](docs/02-ARCHITECTURE/) - Architecture decisions (to be created)
- [docs/07-API-REFERENCE/](docs/07-API-REFERENCE/) - API documentation (to be created)

---

## 🔄 CHANGELOG

### Version 1.0 (MVP) - Target: February 10, 2026
**Phase 1: Foundation (Weeks 1-4)**
- Database schema + authentication
- Public calendar (month/week/list views)
- Company profiles (basic)
- ASX scraper (hourly)
- 20 companies onboarded

**Phase 2: Company Portal (Weeks 5-8)**
- Event creation/editing
- Document uploads
- 20 companies onboarded
- Email notifications setup

**Phase 3: User Features (Weeks 9-12)**
- Watchlist functionality
- Daily digest emails
- Calendar export (.ics)
- Critical Minerals hub

**Phase 4: Polish & Launch (Weeks 13-16)**
- Algorithm V1 (basic scoring)
- PWA enhancements
- Admin tools
- Beta testing (50 users)
- **Public launch: February 10, 2026**

### Previous Updates
- October 17, 2025: Project initialized, documentation created
- See git history for detailed changes

---

## 🎯 SUCCESS METRICS

### Week 17 Targets (Post-Launch)
- 50 companies onboarded
- 500 registered users
- 100 daily active users
- 50 events published per week
- 99% uptime

### Month 6 Targets
- 100 companies ($50k MRR from companies)
- 2,000 registered users
- 500 daily active users
- Algorithm >70% accuracy
- 50 premium subscriptions ($1,450 MRR)

---

*Last updated: October 17, 2025 by Claude*
*This file contains project-specific information. For system documentation, see CLAUDE.md*
