# CapSight Analytics - Technical Specification
## Complete Implementation Guide

**Version:** 1.0  
**Date:** October 17, 2025  
**Status:** Ready for Development  
**Target:** 16-week MVP build

---

## Table of Contents

1. [System Architecture](#1-system-architecture)
2. [Technology Stack](#2-technology-stack)
3. [Database Schema](#3-database-schema)
4. [API Endpoints](#4-api-endpoints)
5. [Authentication & Authorization](#5-authentication--authorization)
6. [Frontend Architecture](#6-frontend-architecture)
7. [Backend Services](#7-backend-services)
8. [Data Collection](#8-data-collection)
9. [Email System](#9-email-system)
10. [File Storage](#10-file-storage)
11. [Algorithm Implementation](#11-algorithm-implementation)
12. [Deployment & Infrastructure](#12-deployment--infrastructure)
13. [Security](#13-security)
14. [Performance Optimization](#14-performance-optimization)
15. [Monitoring & Logging](#15-monitoring--logging)

---

## 1. System Architecture

### 1.1 High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│  Web Browser (Desktop/Mobile)  │  Email Client  │  Calendar App │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│                    Next.js 15 + React 19                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Public Site │  │Company Portal│  │ User Dashboard│         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│           PWA (Service Worker + Manifest)                        │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API LAYER                                   │
├─────────────────────────────────────────────────────────────────┤
│              Next.js API Routes + Supabase Edge Functions        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  REST API    │  │  GraphQL     │  │ WebSockets   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND SERVICES                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐      │
│  │ ASX Scraper│  │Algorithm │  │  Email  │  │  Cron    │      │
│  │  (Hourly)  │  │(6-hourly)│  │  Queue  │  │  Jobs    │      │
│  └────────────┘  └──────────┘  └─────────┘  └──────────┘      │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌──────────────┐  ┌─────────────┐        │
│  │   PostgreSQL   │  │ Supabase     │  │  External   │        │
│  │   (Supabase)   │  │ Storage      │  │  APIs       │        │
│  └────────────────┘  └──────────────┘  └─────────────┘        │
│      Database            Files           Yahoo/Reddit           │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Component Interaction Flow

**User Views Calendar:**
```
Browser → Next.js Server → Supabase Query → PostgreSQL
        ← HTML/React JSX ← JSON Response ← Data
```

**Company Creates Event:**
```
Portal → API Route → Auth Check → RLS Policy → Insert Event
       ← Success    ← Verified   ← Allowed   ← Return ID
```

**Scraper Runs:**
```
Cron Job → Edge Function → ASX Website → Parse HTML → Store DB
         ← Trigger       ← Fetch       ← Extract   ← Commit
```

**Email Digest:**
```
Cron (9am) → Edge Function → Query Users/Events → Mailgun API
           ← Trigger       ← Get Watchlist      ← Send Batch
```

### 1.3 Technology Choices Rationale

| Decision | Choice | Why | Alternative Rejected |
|----------|--------|-----|---------------------|
| Frontend | Next.js 15 | SSR, API routes, great DX | Remix (less mature), Astro (no SSR) |
| Backend | Supabase | All-in-one, RLS, real-time | Firebase (vendor lock), custom (time) |
| Database | PostgreSQL | Mature, powerful, free | MongoDB (no joins), MySQL (less features) |
| Auth | Supabase Auth | Built-in, magic links | Auth0 (expensive), custom (risky) |
| Email | Mailgun | Proven deliverability, team experience, better analytics | Resend (less features), SendGrid (complex) |
| Hosting | Vercel | Next.js optimized, free | Netlify (slower), AWS (complex) |
| Styling | Tailwind + shadcn | Fast, accessible, beautiful | MUI (heavy), Chakra (limited) |

---

## 2. Technology Stack

### 2.1 Core Stack

**Frontend:**
```json
{
  "framework": "Next.js 15.0.0",
  "runtime": "React 19",
  "language": "TypeScript 5.3",
  "styling": "Tailwind CSS 3.4",
  "components": "shadcn/ui",
  "forms": "react-hook-form 7.48",
  "validation": "zod 3.22",
  "charts": "recharts 2.10",
  "icons": "lucide-react 0.292"
}
```

**Backend:**
```json
{
  "database": "Supabase (PostgreSQL 15)",
  "runtime": "Supabase Edge Functions (Deno 1.37)",
  "auth": "Supabase Auth",
  "storage": "Supabase Storage",
  "cron": "pg_cron (PostgreSQL extension)",
  "email": "Mailgun",
  "scraping": "cheerio 1.0 + puppeteer (optional)"
}
```

**DevOps:**
```json
{
  "hosting": "Vercel",
  "ci-cd": "GitHub Actions",
  "monitoring": "Sentry + PostHog",
  "analytics": "Vercel Analytics + PostHog",
  "uptime": "UptimeRobot"
}
```

### 2.2 Package.json

```json
{
  "name": "capsight-analytics",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:e2e": "playwright test",
    "db:migrate": "supabase db push",
    "db:seed": "supabase db seed",
    "db:reset": "supabase db reset"
  },
  "dependencies": {
    "next": "15.0.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "@supabase/auth-helpers-nextjs": "^0.8.7",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.4",
    "recharts": "^2.10.0",
    "lucide-react": "^0.292.0",
    "date-fns": "^2.30.0",
    "tailwindcss": "^3.4.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "eslint": "^8",
    "eslint-config-next": "15.0.0",
    "@playwright/test": "^1.40.0",
    "jest": "^29.7.0",
    "supabase": "^1.123.0"
  }
}
```

### 2.3 Development Tools

**Required:**
- Node.js 20.x
- pnpm 8.x (package manager)
- Supabase CLI
- Git
- VS Code (recommended)

**VS Code Extensions:**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- ESLint
- Supabase Snippets

---

## 3. Database Schema

### 3.1 Entity Relationship Diagram

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│   users     │──────<│  watchlist   │>──────│  companies  │
└─────────────┘       └──────────────┘       └─────────────┘
      │                                              │
      │                                              │
      ▼                                              ▼
┌─────────────┐                            ┌─────────────┐
│notifications│                            │   events    │
└─────────────┘                            └─────────────┘
                                                   │
                                                   ▼
                                           ┌─────────────┐
                                           │  documents  │
                                           └─────────────┘
```

### 3.2 Complete Schema (PostgreSQL)

**3.2.1 Users Table**

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('investor', 'company_admin', 'platform_admin')) DEFAULT 'investor',
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  
  -- Notification preferences
  notification_preferences JSONB DEFAULT '{
    "daily_digest": true,
    "event_alerts": true,
    "real_time": false,
    "quiet_hours": {"start": "22:00", "end": "08:00"}
  }'::jsonb,
  
  -- User metadata
  timezone TEXT DEFAULT 'Australia/Sydney',
  subscription_tier TEXT CHECK (subscription_tier IN ('free', 'premium')) DEFAULT 'free',
  subscription_expires_at TIMESTAMPTZ,
  
  -- Tracking
  email_bounced BOOLEAN DEFAULT false,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Indexes
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_company_id ON users(company_id) WHERE company_id IS NOT NULL;
CREATE INDEX idx_users_subscription ON users(subscription_tier, subscription_expires_at);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Trigger for updated_at
CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**3.2.2 Companies Table**

```sql
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic info
  asx_code TEXT NOT NULL UNIQUE CHECK (asx_code ~ '^[A-Z]{3}$'),
  company_name TEXT NOT NULL,
  website TEXT,
  contact_email TEXT,
  
  -- Logo
  logo_url TEXT,
  logo_storage_path TEXT,
  
  -- Description
  description TEXT,
  about_rich_text JSONB, -- Prosemirror/Tiptap JSON
  
  -- Commodities
  primary_commodity TEXT NOT NULL,
  secondary_commodities TEXT[], -- Array of commodities
  is_critical_minerals BOOLEAN DEFAULT false,
  critical_minerals_list TEXT[], -- Specific critical minerals
  
  -- Market data
  market_cap_aud BIGINT, -- Stored in cents to avoid float issues
  listing_date DATE,
  shares_on_issue BIGINT,
  
  -- Subscription
  subscription_status TEXT CHECK (subscription_status IN ('trial', 'active', 'cancelled', 'suspended')) DEFAULT 'trial',
  subscription_started_at TIMESTAMPTZ,
  subscription_equity_percent DECIMAL(5,3), -- e.g., 0.250 for 0.25%
  
  -- Profile completeness (0-100)
  profile_completion_score INTEGER DEFAULT 0 CHECK (profile_completion_score BETWEEN 0 AND 100),
  
  -- Tracking
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ, -- NULL = draft profile
  
  CONSTRAINT valid_website CHECK (website ~ '^https?://'),
  CONSTRAINT valid_email CHECK (contact_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Indexes
CREATE INDEX idx_companies_asx_code ON companies(asx_code);
CREATE INDEX idx_companies_primary_commodity ON companies(primary_commodity);
CREATE INDEX idx_companies_critical_minerals ON companies(is_critical_minerals) WHERE is_critical_minerals = true;
CREATE INDEX idx_companies_subscription ON companies(subscription_status) WHERE subscription_status = 'active';
CREATE INDEX idx_companies_published ON companies(published_at) WHERE published_at IS NOT NULL;

-- Full-text search
CREATE INDEX idx_companies_search ON companies USING gin(
  to_tsvector('english', company_name || ' ' || COALESCE(description, ''))
);

-- RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Public can view published companies
CREATE POLICY "Published companies are viewable by everyone"
  ON companies FOR SELECT
  USING (published_at IS NOT NULL);

-- Company admins can view their own company
CREATE POLICY "Company admins can view own company"
  ON companies FOR SELECT
  USING (
    id IN (
      SELECT company_id FROM users
      WHERE id = auth.uid() AND role = 'company_admin'
    )
  );

-- Company admins can update their own company
CREATE POLICY "Company admins can update own company"
  ON companies FOR UPDATE
  USING (
    id IN (
      SELECT company_id FROM users
      WHERE id = auth.uid() AND role = 'company_admin'
    )
  );

-- Platform admins can do anything
CREATE POLICY "Platform admins have full access"
  ON companies FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'platform_admin'
    )
  );
```

**3.2.3 Events Table**

```sql
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  
  -- Event details
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'drilling_results',
    'assay_results',
    'exploration_update',
    'jorc_resource',
    'resource_update',
    'production_update',
    'feasibility_study',
    'permits_approvals',
    'capital_raise',
    'quarterly_report',
    'agm_egm',
    'other'
  )),
  
  -- Timing
  event_date DATE NOT NULL,
  event_time TIME,
  date_is_confirmed BOOLEAN DEFAULT true,
  
  -- Location
  project_name TEXT,
  location_name TEXT,
  location_coordinates POINT, -- PostGIS point (lat, lon)
  
  -- Results data (flexible JSON structure)
  results_data JSONB, -- { "grade": 1.8, "grade_unit": "% Li2O", "width": 12, ... }
  
  -- Links
  asx_announcement_url TEXT,
  asx_announcement_pdf_url TEXT,
  
  -- Flags
  is_price_sensitive BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  
  -- Tracking
  created_by UUID REFERENCES users(id),
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  
  CONSTRAINT valid_asx_url CHECK (asx_announcement_url ~ '^https?://'),
  CONSTRAINT future_events CHECK (event_date >= CURRENT_DATE - INTERVAL '7 days')
);

-- Indexes
CREATE INDEX idx_events_company_id ON events(company_id);
CREATE INDEX idx_events_date ON events(event_date DESC);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_published ON events(published, event_date) WHERE published = true;
CREATE INDEX idx_events_price_sensitive ON events(is_price_sensitive) WHERE is_price_sensitive = true;
CREATE INDEX idx_events_upcoming ON events(event_date) WHERE event_date >= CURRENT_DATE AND published = true;

-- Full-text search
CREATE INDEX idx_events_search ON events USING gin(
  to_tsvector('english', title || ' ' || COALESCE(description, '') || ' ' || COALESCE(project_name, ''))
);

-- GIN index for results_data JSONB queries
CREATE INDEX idx_events_results_data ON events USING gin(results_data);

-- RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public can view published events
CREATE POLICY "Published events are viewable by everyone"
  ON events FOR SELECT
  USING (published = true);

-- Company admins can view their own events (even drafts)
CREATE POLICY "Company admins can view own events"
  ON events FOR SELECT
  USING (
    company_id IN (
      SELECT company_id FROM users
      WHERE id = auth.uid() AND role = 'company_admin'
    )
  );

-- Company admins can create events
CREATE POLICY "Company admins can create events"
  ON events FOR INSERT
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM users
      WHERE id = auth.uid() AND role = 'company_admin'
    )
  );

-- Company admins can update their own events
CREATE POLICY "Company admins can update own events"
  ON events FOR UPDATE
  USING (
    company_id IN (
      SELECT company_id FROM users
      WHERE id = auth.uid() AND role = 'company_admin'
    )
  );

-- Company admins can delete their own events (within 1 hour of creation)
CREATE POLICY "Company admins can delete recent events"
  ON events FOR DELETE
  USING (
    company_id IN (
      SELECT company_id FROM users
      WHERE id = auth.uid() AND role = 'company_admin'
    )
    AND created_at > NOW() - INTERVAL '1 hour'
  );
```

**3.2.4 Documents Table**

```sql
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Relationships
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  
  -- File info
  title TEXT NOT NULL,
  description TEXT,
  file_type TEXT NOT NULL CHECK (file_type IN ('pdf', 'image', 'spreadsheet', 'other')),
  mime_type TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  
  -- Storage
  storage_path TEXT NOT NULL UNIQUE, -- Supabase Storage path
  storage_bucket TEXT NOT NULL DEFAULT 'documents',
  
  -- Metadata
  is_public BOOLEAN DEFAULT true,
  download_count INTEGER DEFAULT 0,
  
  -- Tracking
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_file_size CHECK (file_size_bytes > 0 AND file_size_bytes <= 52428800) -- 50MB max
);

-- Indexes
CREATE INDEX idx_documents_company_id ON documents(company_id);
CREATE INDEX idx_documents_event_id ON documents(event_id) WHERE event_id IS NOT NULL;
CREATE INDEX idx_documents_public ON documents(is_public) WHERE is_public = true;
CREATE INDEX idx_documents_created_at ON documents(created_at DESC);

-- RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Public can view public documents
CREATE POLICY "Public documents are viewable by everyone"
  ON documents FOR SELECT
  USING (is_public = true);

-- Company admins can view their own documents
CREATE POLICY "Company admins can view own documents"
  ON documents FOR SELECT
  USING (
    company_id IN (
      SELECT company_id FROM users
      WHERE id = auth.uid() AND role = 'company_admin'
    )
  );

-- Company admins can upload documents
CREATE POLICY "Company admins can upload documents"
  ON documents FOR INSERT
  WITH CHECK (
    company_id IN (
      SELECT company_id FROM users
      WHERE id = auth.uid() AND role = 'company_admin'
    )
  );

-- Company admins can delete their own documents
CREATE POLICY "Company admins can delete own documents"
  ON documents FOR DELETE
  USING (
    company_id IN (
      SELECT company_id FROM users
      WHERE id = auth.uid() AND role = 'company_admin'
    )
  );
```

**3.2.5 Watchlist Table**

```sql
CREATE TABLE public.watchlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  
  -- Metadata
  added_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT, -- Personal notes about the company
  
  CONSTRAINT unique_user_company UNIQUE (user_id, company_id)
);

-- Indexes
CREATE INDEX idx_watchlist_user_id ON watchlist(user_id);
CREATE INDEX idx_watchlist_company_id ON watchlist(company_id);

-- RLS
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;

-- Users can only see their own watchlist
CREATE POLICY "Users can view own watchlist"
  ON watchlist FOR SELECT
  USING (auth.uid() = user_id);

-- Users can add to their watchlist
CREATE POLICY "Users can add to watchlist"
  ON watchlist FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND (
      -- Free users limited to 10 companies
      (SELECT subscription_tier FROM users WHERE id = auth.uid()) = 'premium'
      OR (SELECT COUNT(*) FROM watchlist WHERE user_id = auth.uid()) < 10
    )
  );

-- Users can remove from their watchlist
CREATE POLICY "Users can remove from watchlist"
  ON watchlist FOR DELETE
  USING (auth.uid() = user_id);
```

**3.2.6 Notifications Table**

```sql
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Notification details
  type TEXT NOT NULL CHECK (type IN ('new_event', 'event_update', 'event_reminder', 'digest', 'system')),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  
  -- Links
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  link_url TEXT,
  
  -- Email tracking
  email_sent_at TIMESTAMPTZ,
  email_opened_at TIMESTAMPTZ,
  email_clicked_at TIMESTAMPTZ,
  
  -- Status
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id, created_at DESC);
CREATE INDEX idx_notifications_unread ON notifications(user_id) WHERE read_at IS NULL;
CREATE INDEX idx_notifications_type ON notifications(type, created_at DESC);

-- RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can only see their own notifications
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Users can mark their notifications as read
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);
```

**3.2.7 Recommendation Scores Table**

```sql
CREATE TABLE public.recommendation_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  
  -- Overall score (0-100)
  total_score DECIMAL(5,2) NOT NULL CHECK (total_score BETWEEN 0 AND 100),
  
  -- Component scores (0-100 each)
  event_frequency_score DECIMAL(5,2) DEFAULT 0,
  insider_buying_score DECIMAL(5,2) DEFAULT 0,
  price_momentum_score DECIMAL(5,2) DEFAULT 0,
  critical_minerals_score DECIMAL(5,2) DEFAULT 0,
  resource_growth_score DECIMAL(5,2) DEFAULT 0,
  
  -- Reasoning (for transparency)
  reasoning JSONB, -- { "factors": [...], "highlights": [...] }
  
  -- Confidence level (0-100)
  confidence_score DECIMAL(5,2) DEFAULT 50,
  
  -- Timestamps
  calculated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT unique_company_score UNIQUE (company_id)
);

-- Indexes
CREATE INDEX idx_recommendation_scores_total ON recommendation_scores(total_score DESC);
CREATE INDEX idx_recommendation_scores_company ON recommendation_scores(company_id);
CREATE INDEX idx_recommendation_scores_calculated ON recommendation_scores(calculated_at DESC);

-- RLS
ALTER TABLE recommendation_scores ENABLE ROW LEVEL SECURITY;

-- Everyone can read scores
CREATE POLICY "Recommendation scores are public"
  ON recommendation_scores FOR SELECT
  USING (true);
```

**3.2.8 Scrape Queue Table**

```sql
CREATE TABLE public.scrape_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Task details
  task_type TEXT NOT NULL CHECK (task_type IN ('asx_announcements', 'director_trades', 'share_prices')),
  target_url TEXT NOT NULL,
  params JSONB, -- Additional parameters for the scrape
  
  -- Status
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
  
  -- Results
  result_data JSONB,
  error_message TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- Retry logic
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3
);

-- Indexes
CREATE INDEX idx_scrape_queue_status ON scrape_queue(status, created_at) WHERE status IN ('pending', 'processing');
CREATE INDEX idx_scrape_queue_completed ON scrape_queue(completed_at DESC) WHERE status = 'completed';

-- RLS (internal table, no public access)
ALTER TABLE scrape_queue ENABLE ROW LEVEL SECURITY;

-- Only platform admins can access
CREATE POLICY "Only admins can access scrape queue"
  ON scrape_queue FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'platform_admin'
    )
  );
```

**3.2.9 Critical Minerals Reference Table**

```sql
CREATE TABLE public.critical_minerals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Mineral details
  name TEXT NOT NULL UNIQUE,
  symbol TEXT, -- Chemical symbol (e.g., Li, REE, Ni)
  category TEXT NOT NULL CHECK (category IN ('battery', 'rare_earth', 'strategic', 'green_energy', 'other')),
  
  -- Description
  description TEXT NOT NULL,
  use_cases TEXT[], -- Array of use cases
  
  -- Government status
  is_government_priority BOOLEAN DEFAULT false,
  government_notes TEXT,
  
  -- SEO
  slug TEXT NOT NULL UNIQUE,
  meta_title TEXT,
  meta_description TEXT,
  
  -- Tracking
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed data
INSERT INTO critical_minerals (name, symbol, category, description, use_cases, is_government_priority, slug) VALUES
('Lithium', 'Li', 'battery', 'Key battery mineral for EVs and energy storage', ARRAY['EV batteries', 'Grid storage', 'Electronics'], true, 'lithium'),
('Rare Earth Elements', 'REE', 'rare_earth', 'Critical for magnets, electronics, defense', ARRAY['Magnets', 'Catalysts', 'Defense'], true, 'rare-earth-elements'),
('Nickel', 'Ni', 'battery', 'Battery cathodes and stainless steel', ARRAY['EV batteries', 'Stainless steel'], true, 'nickel'),
('Copper', 'Cu', 'green_energy', 'Essential for electrification and renewables', ARRAY['Wiring', 'EVs', 'Renewables'], true, 'copper'),
('Graphite', 'C', 'battery', 'Anode material for lithium-ion batteries', ARRAY['Battery anodes', 'Steel', 'Lubricants'], true, 'graphite');

-- Index
CREATE INDEX idx_critical_minerals_slug ON critical_minerals(slug);
CREATE INDEX idx_critical_minerals_priority ON critical_minerals(is_government_priority) WHERE is_government_priority = true;
```

### 3.3 Database Functions

**3.3.1 Update Updated_At Function**

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables
CREATE TRIGGER set_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**3.3.2 Calculate Profile Completion**

```sql
CREATE OR REPLACE FUNCTION calculate_profile_completion(company_row companies)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
BEGIN
  -- Logo (15 points)
  IF company_row.logo_url IS NOT NULL THEN
    score := score + 15;
  END IF;
  
  -- Description (20 points)
  IF company_row.description IS NOT NULL AND LENGTH(company_row.description) > 100 THEN
    score := score + 20;
  END IF;
  
  -- Contact info (10 points)
  IF company_row.contact_email IS NOT NULL AND company_row.website IS NOT NULL THEN
    score := score + 10;
  END IF;
  
  -- Commodities (15 points)
  IF company_row.primary_commodity IS NOT NULL THEN
    score := score + 15;
  END IF;
  
  -- Has at least one event (20 points)
  IF EXISTS (SELECT 1 FROM events WHERE company_id = company_row.id AND published = true) THEN
    score := score + 20;
  END IF;
  
  -- Has at least one document (10 points)
  IF EXISTS (SELECT 1 FROM documents WHERE company_id = company_row.id AND is_public = true) THEN
    score := score + 10;
  END IF;
  
  -- Published profile (10 points)
  IF company_row.published_at IS NOT NULL THEN
    score := score + 10;
  END IF;
  
  RETURN score;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update score automatically
CREATE OR REPLACE FUNCTION update_profile_completion()
RETURNS TRIGGER AS $$
BEGIN
  NEW.profile_completion_score := calculate_profile_completion(NEW);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_companies_profile_score
  BEFORE INSERT OR UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_profile_completion();
```

**3.3.3 Search Companies and Events**

```sql
CREATE OR REPLACE FUNCTION search_content(search_query TEXT)
RETURNS TABLE (
  result_type TEXT,
  result_id UUID,
  result_title TEXT,
  result_snippet TEXT,
  relevance REAL
) AS $$
BEGIN
  RETURN QUERY
  
  -- Search companies
  SELECT
    'company'::TEXT,
    id,
    company_name,
    SUBSTRING(description, 1, 200),
    ts_rank(
      to_tsvector('english', company_name || ' ' || COALESCE(description, '')),
      plainto_tsquery('english', search_query)
    )
  FROM companies
  WHERE published_at IS NOT NULL
    AND to_tsvector('english', company_name || ' ' || COALESCE(description, '')) @@ plainto_tsquery('english', search_query)
  
  UNION ALL
  
  -- Search events
  SELECT
    'event'::TEXT,
    id,
    title,
    SUBSTRING(description, 1, 200),
    ts_rank(
      to_tsvector('english', title || ' ' || COALESCE(description, '') || ' ' || COALESCE(project_name, '')),
      plainto_tsquery('english', search_query)
    )
  FROM events
  WHERE published = true
    AND to_tsvector('english', title || ' ' || COALESCE(description, '') || ' ' || COALESCE(project_name, '')) @@ plainto_tsquery('english', search_query)
  
  ORDER BY relevance DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql;
```

---

## 4. API Endpoints

### 4.1 API Architecture

**Pattern:** Next.js API Routes + Supabase Edge Functions

**Base URLs:**
- Next.js API: `/api/*`
- Supabase Edge: `https://[project].supabase.co/functions/v1/*`

**Authentication:**
- JWT tokens from Supabase Auth
- Passed in `Authorization: Bearer <token>` header
- Validated via Supabase client

### 4.2 Public API Routes

**4.2.1 Calendar & Events**

```typescript
// GET /api/events
// Get events with filters
interface GetEventsQuery {
  commodities?: string[]; // Filter by commodity
  companies?: string[]; // Filter by company IDs
  event_types?: string[]; // Filter by event type
  date_from?: string; // ISO date
  date_to?: string; // ISO date
  is_critical_minerals?: boolean;
  limit?: number; // Default 100
  offset?: number; // Pagination
}

// Response
interface EventsResponse {
  data: Event[];
  count: number;
  has_more: boolean;
}

// GET /api/events/:id
// Get single event details
interface EventResponse {
  data: Event;
  company: Company;
  documents: Document[];
}

// GET /api/events/:id/ics
// Export event to iCal format
// Returns: text/calendar file
```

**4.2.2 Companies**

```typescript
// GET /api/companies
// List all published companies
interface GetCompaniesQuery {
  commodities?: string[];
  is_critical_minerals?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
}

interface CompaniesResponse {
  data: Company[];
  count: number;
  has_more: boolean;
}

// GET /api/companies/:asx_code
// Get company profile
interface CompanyResponse {
  data: Company;
  upcoming_events: Event[];
  recent_events: Event[];
  documents: Document[];
  management_team: ManagementMember[];
  projects: Project[];
  share_price: SharePriceData;
  recommendation_score?: RecommendationScore;
}

// GET /api/companies/:asx_code/events
// Get all events for a company
interface CompanyEventsQuery {
  status?: 'upcoming' | 'past';
  limit?: number;
  offset?: number;
}
```

**4.2.3 Critical Minerals**

```typescript
// GET /api/critical-minerals
// List all critical minerals
interface CriticalMineralsResponse {
  data: CriticalMineral[];
}

// GET /api/critical-minerals/:slug
// Get specific critical mineral page
interface CriticalMineralResponse {
  data: CriticalMineral;
  companies: Company[]; // Companies mining this mineral
  upcoming_events: Event[]; // Upcoming events for this mineral
  statistics: {
    total_companies: number;
    total_events: number;
    government_funding: number;
  };
}
```

**4.2.4 Search**

```typescript
// GET /api/search
// Full-text search across companies and events
interface SearchQuery {
  q: string; // Search query
  types?: ('company' | 'event')[]; // Filter by type
  limit?: number;
}

interface SearchResponse {
  data: SearchResult[];
  query: string;
  total: number;
}

interface SearchResult {
  type: 'company' | 'event';
  id: string;
  title: string;
  snippet: string;
  relevance: number;
}
```

### 4.3 Authenticated User Routes

**4.3.1 Watchlist**

```typescript
// GET /api/watchlist
// Get user's watchlist
// Auth: Required
interface WatchlistResponse {
  data: WatchlistItem[];
}

interface WatchlistItem {
  id: string;
  company: Company;
  added_at: string;
  notes?: string;
  upcoming_events_count: number;
}

// POST /api/watchlist
// Add company to watchlist
// Auth: Required
interface AddToWatchlistRequest {
  company_id: string;
  notes?: string;
}

// DELETE /api/watchlist/:id
// Remove company from watchlist
// Auth: Required
```

**4.3.2 User Preferences**

```typescript
// GET /api/user/preferences
// Get user preferences
// Auth: Required
interface PreferencesResponse {
  notification_preferences: NotificationPreferences;
  timezone: string;
  subscription_tier: 'free' | 'premium';
}

// PATCH /api/user/preferences
// Update user preferences
// Auth: Required
interface UpdatePreferencesRequest {
  notification_preferences?: Partial<NotificationPreferences>;
  timezone?: string;
}

// GET /api/user/notifications
// Get user notifications
// Auth: Required
interface NotificationsQuery {
  unread_only?: boolean;
  limit?: number;
  offset?: number;
}

// POST /api/user/notifications/:id/read
// Mark notification as read
// Auth: Required
```

**4.3.3 Calendar Export**

```typescript
// GET /api/user/calendar/feed
// Get personalized calendar feed (webcal://)
// Auth: Required via token in URL
// Returns: text/calendar (iCal feed)

// GET /api/user/calendar/export
// Export calendar events to .ics
// Auth: Required
interface CalendarExportQuery {
  watchlist_only?: boolean;
  date_from?: string;
  date_to?: string;
}
// Returns: text/calendar file
```

### 4.4 Company Portal Routes

**4.4.1 Company Management**

```typescript
// GET /api/portal/company
// Get own company details
// Auth: Required (company_admin)
interface PortalCompanyResponse {
  data: Company;
  statistics: {
    total_events: number;
    published_events: number;
    draft_events: number;
    total_documents: number;
    profile_completion: number;
  };
}

// PATCH /api/portal/company
// Update company profile
// Auth: Required (company_admin)
interface UpdateCompanyRequest {
  description?: string;
  about_rich_text?: object;
  website?: string;
  contact_email?: string;
  primary_commodity?: string;
  secondary_commodities?: string[];
}

// POST /api/portal/company/logo
// Upload company logo
// Auth: Required (company_admin)
// Content-Type: multipart/form-data
interface UploadLogoRequest {
  file: File; // PNG/JPG, max 2MB
}
```

**4.4.2 Event Management**

```typescript
// GET /api/portal/events
// Get company's events (including drafts)
// Auth: Required (company_admin)
interface PortalEventsQuery {
  status?: 'published' | 'draft';
  limit?: number;
  offset?: number;
}

// POST /api/portal/events
// Create new event
// Auth: Required (company_admin)
interface CreateEventRequest {
  title: string;
  description?: string;
  event_type: string;
  event_date: string; // ISO date
  event_time?: string; // HH:MM
  date_is_confirmed?: boolean;
  project_name?: string;
  location_name?: string;
  location_coordinates?: { lat: number; lon: number };
  results_data?: object;
  asx_announcement_url?: string;
  is_price_sensitive?: boolean;
  published?: boolean;
}

// PATCH /api/portal/events/:id
// Update event
// Auth: Required (company_admin, own event only)
interface UpdateEventRequest extends Partial<CreateEventRequest> {}

// DELETE /api/portal/events/:id
// Delete event (within 1 hour of creation)
// Auth: Required (company_admin, own event only)

// POST /api/portal/events/:id/publish
// Publish a draft event
// Auth: Required (company_admin)
```

**4.4.3 Document Management**

```typescript
// GET /api/portal/documents
// Get company's documents
// Auth: Required (company_admin)
interface PortalDocumentsResponse {
  data: Document[];
}

// POST /api/portal/documents
// Upload document
// Auth: Required (company_admin)
// Content-Type: multipart/form-data
interface UploadDocumentRequest {
  file: File; // PDF, max 50MB
  title: string;
  description?: string;
  event_id?: string;
  is_public?: boolean;
}

// DELETE /api/portal/documents/:id
// Delete document
// Auth: Required (company_admin, own document only)
```

### 4.5 Admin Routes

```typescript
// GET /api/admin/stats
// Platform statistics
// Auth: Required (platform_admin)
interface AdminStatsResponse {
  users: {
    total: number;
    active_today: number;
    active_this_week: number;
  };
  companies: {
    total: number;
    active: number;
    pending_approval: number;
  };
  events: {
    total: number;
    published_this_week: number;
    upcoming: number;
  };
}

// GET /api/admin/companies/pending
// Companies awaiting approval
// Auth: Required (platform_admin)

// POST /api/admin/companies/:id/approve
// Approve company
// Auth: Required (platform_admin)

// POST /api/admin/companies/:id/reject
// Reject company
// Auth: Required (platform_admin)
interface RejectCompanyRequest {
  reason: string;
}

// GET /api/admin/events/flagged
// Flagged events for moderation
// Auth: Required (platform_admin)

// POST /api/admin/events/:id/unpublish
// Unpublish event
// Auth: Required (platform_admin)
interface UnpublishEventRequest {
  reason: string;
}
```

### 4.6 Supabase Edge Functions

**4.6.1 Scraper Functions**

```typescript
// POST /functions/v1/scrape-asx
// Scrape ASX announcements
// Auth: Service role key (cron job)
interface ScrapeASXRequest {
  date?: string; // Default: today
  companies?: string[]; // Optional: specific ASX codes
}

interface ScrapeASXResponse {
  announcements_found: number;
  new_events_created: number;
  errors: string[];
}
```

**4.6.2 Email Functions**

```typescript
// POST /functions/v1/send-daily-digest
// Send daily digest emails
// Auth: Service role key (cron job)
interface SendDigestResponse {
  emails_sent: number;
  errors: number;
}

// POST /functions/v1/send-event-alert
// Send real-time event alert
// Auth: Internal only
interface SendEventAlertRequest {
  event_id: string;
  user_ids?: string[]; // Optional: specific users
}
```

**4.6.3 Algorithm Functions**

```typescript
// POST /functions/v1/calculate-scores
// Calculate recommendation scores
// Auth: Service role key (cron job)
interface CalculateScoresResponse {
  companies_scored: number;
  average_score: number;
  top_recommendations: Array<{
    company_id: string;
    asx_code: string;
    score: number;
  }>;
}
```

---

## 5. Authentication & Authorization

### 5.1 Authentication Flow

**Magic Link Authentication:**

```typescript
// pages/auth/login.tsx
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function LoginPage() {
  const supabase = createClientComponentClient()

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={[]}
      magicLink
      view="magic_link"
      redirectTo={`${window.location.origin}/auth/callback`}
    />
  )
}
```

**Callback Handler:**

```typescript
// app/auth/callback/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirect to dashboard or home
  return NextResponse.redirect(requestUrl.origin)
}
```

### 5.2 Middleware (Route Protection)

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect /portal/* routes (company admins only)
  if (req.nextUrl.pathname.startsWith('/portal')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    // Check if user is company admin
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (user?.role !== 'company_admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Protect /admin/* routes (platform admins only)
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (user?.role !== 'platform_admin') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/portal/:path*', '/admin/:path*'],
}
```

### 5.3 API Route Protection

```typescript
// lib/api-middleware.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function requireAuth() {
  const supabase = createRouteHandlerClient({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return { session, supabase }
}

export async function requireCompanyAdmin() {
  const result = await requireAuth()
  if (result instanceof NextResponse) return result

  const { session, supabase } = result

  const { data: user } = await supabase
    .from('users')
    .select('role, company_id')
    .eq('id', session.user.id)
    .single()

  if (user?.role !== 'company_admin' || !user.company_id) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    )
  }

  return { session, supabase, user }
}

// Usage in API route:
// app/api/portal/events/route.ts
export async function POST(request: Request) {
  const auth = await requireCompanyAdmin()
  if (auth instanceof NextResponse) return auth

  const { supabase, user } = auth
  // ... rest of handler
}
```

### 5.4 Row Level Security (RLS) Policies

**Already defined in schema, but key patterns:**

```sql
-- Pattern 1: Public read for published content
CREATE POLICY "Public can view published"
  ON table_name FOR SELECT
  USING (published = true);

-- Pattern 2: Users can only see their own data
CREATE POLICY "Users see own data"
  ON table_name FOR SELECT
  USING (auth.uid() = user_id);

-- Pattern 3: Company admins see only their company's data
CREATE POLICY "Company admins see own company"
  ON table_name FOR SELECT
  USING (
    company_id IN (
      SELECT company_id FROM users
      WHERE id = auth.uid() AND role = 'company_admin'
    )
  );

-- Pattern 4: Platform admins see everything
CREATE POLICY "Admins see all"
  ON table_name FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'platform_admin'
    )
  );
```

---

## 6. Frontend Architecture

### 6.1 Project Structure

```
capsight-analytics/
├── app/                          # Next.js 15 App Router
│   ├── (public)/                 # Public routes (no auth)
│   │   ├── page.tsx              # Homepage
│   │   ├── calendar/
│   │   │   └── page.tsx          # Calendar page
│   │   ├── companies/
│   │   │   ├── page.tsx          # Companies list
│   │   │   └── [asx_code]/
│   │   │       └── page.tsx      # Company profile
│   │   ├── events/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Event detail
│   │   ├── critical-minerals/
│   │   │   ├── page.tsx          # Critical minerals hub
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Specific mineral page
│   │   └── search/
│   │       └── page.tsx          # Search results
│   ├── (auth)/                   # Auth routes
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── callback/
│   │       └── route.ts
│   ├── portal/                   # Company portal (auth required)
│   │   ├── layout.tsx            # Portal layout
│   │   ├── page.tsx              # Dashboard
│   │   ├── events/
│   │   │   ├── page.tsx          # Events list
│   │   │   ├── new/
│   │   │   │   └── page.tsx      # Create event
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx  # Edit event
│   │   ├── documents/
│   │   │   └── page.tsx          # Document library
│   │   ├── profile/
│   │   │   └── page.tsx          # Edit company profile
│   │   └── settings/
│   │       └── page.tsx          # Portal settings
│   ├── admin/                    # Admin dashboard (admins only)
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Admin dashboard
│   │   ├── companies/
│   │   │   └── page.tsx          # Manage companies
│   │   ├── events/
│   │   │   └── page.tsx          # Moderate events
│   │   └── users/
│   │       └── page.tsx          # User management
│   ├── api/                      # API routes
│   │   ├── events/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── companies/
│   │   │   ├── route.ts
│   │   │   └── [asx_code]/
│   │   │       └── route.ts
│   │   ├── watchlist/
│   │   │   └── route.ts
│   │   └── user/
│   │       ├── preferences/
│   │       │   └── route.ts
│   │       └── notifications/
│   │           └── route.ts
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── manifest.ts               # PWA manifest
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── select.tsx
│   │   └── ...
│   ├── calendar/                 # Calendar components
│   │   ├── calendar-view.tsx
│   │   ├── event-card.tsx
│   │   ├── event-detail-modal.tsx
│   │   └── calendar-filters.tsx
│   ├── company/                  # Company components
│   │   ├── company-card.tsx
│   │   ├── company-header.tsx
│   │   ├── management-team.tsx
│   │   └── project-list.tsx
│   ├── portal/                   # Portal components
│   │   ├── event-form.tsx
│   │   ├── document-upload.tsx
│   │   ├── profile-editor.tsx
│   │   └── dashboard-stats.tsx
│   ├── layout/                   # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx
│   │   └── mobile-nav.tsx
│   └── shared/                   # Shared components
│       ├── search-bar.tsx
│       ├── pagination.tsx
│       ├── loading-spinner.tsx
│       └── error-boundary.tsx
├── lib/
│   ├── supabase/                 # Supabase clients
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── middleware.ts         # Middleware client
│   ├── api/                      # API utilities
│   │   ├── events.ts
│   │   ├── companies.ts
│   │   └── watchlist.ts
│   ├── utils/                    # Utility functions
│   │   ├── date.ts
│   │   ├── format.ts
│   │   └── validators.ts
│   └── hooks/                    # Custom React hooks
│       ├── use-events.ts
│       ├── use-watchlist.ts
│       └── use-user.ts
├── types/
│   ├── database.ts               # Generated from Supabase
│   ├── api.ts                    # API types
│   └── ui.ts                     # UI component types
├── emails/                       # React Email templates
│   ├── daily-digest.tsx
│   ├── event-alert.tsx
│   └── welcome.tsx
├── public/
│   ├── icons/                    # PWA icons
│   ├── images/
│   └── robots.txt
├── supabase/                     # Supabase config
│   ├── migrations/               # SQL migrations
│   ├── functions/                # Edge Functions
│   │   ├── scrape-asx/
│   │   │   └── index.ts
│   │   ├── send-daily-digest/
│   │   │   └── index.ts
│   │   └── calculate-scores/
│   │       └── index.ts
│   └── config.toml
├── .env.local                    # Local env vars
├── .env.production               # Production env vars
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 6.2 Key Components

**6.2.1 Calendar View Component**

```typescript
// components/calendar/calendar-view.tsx
'use client'

import moment from 'moment'
import { Event } from '@/types/database'
import EventCard from './event-card'

const localizer = momentLocalizer(moment)

interface CalendarViewProps {
  events: Event[]
  onEventClick: (event: Event) => void
  view?: 'month' | 'week' | 'day' | 'agenda'
  date?: Date
}

export default function CalendarView({
  events,
  onEventClick,
  view = 'month',
  date = new Date(),
}: CalendarViewProps) {
  const calendarEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: new Date(event.event_date),
    end: new Date(event.event_date),
    resource: event,
  }))

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 200px)' }}
      view={view}
      date={date}
      onSelectEvent={e => onEventClick(e.resource)}
      components={{
        event: ({ event }) => <EventCard event={event.resource} compact />,
      }}
      eventPropGetter={event => ({
        style: {
          backgroundColor: getEventColor(event.resource.event_type),
          borderRadius: '4px',
          border: 'none',
          padding: '4px',
        },
      })}
    />
  )
}

function getEventColor(eventType: string): string {
  const colors = {
    drilling_results: '#10b981', // Green
    assay_results: '#3b82f6', // Blue
    jorc_resource: '#f59e0b', // Yellow
    production_update: '#8b5cf6', // Purple
  }
  return colors[eventType] || '#6b7280' // Gray default
}
```

**6.2.2 Event Form Component**

```typescript
// components/portal/event-form.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'

const eventSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().optional(),
  event_type: z.enum([
    'drilling_results',
    'assay_results',
    'exploration_update',
    'jorc_resource',
    'resource_update',
    'production_update',
    'feasibility_study',
    'permits_approvals',
    'capital_raise',
    'quarterly_report',
    'agm_egm',
    'other',
  ]),
  event_date: z.date(),
  event_time: z.string().optional(),
  project_name: z.string().optional(),
  location_name: z.string().optional(),
  asx_announcement_url: z.string().url().optional(),
  is_price_sensitive: z.boolean().default(false),
  published: z.boolean().default(false),
})

type EventFormValues = z.infer<typeof eventSchema>

interface EventFormProps {
  defaultValues?: Partial<EventFormValues>
  onSubmit: (values: EventFormValues) => Promise<void>
  isLoading?: boolean
}

export default function EventForm({ defaultValues, onSubmit, isLoading }: EventFormProps) {
  const [showCalendar, setShowCalendar] = useState(false)

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      event_type: 'drilling_results',
      is_price_sensitive: false,
      published: false,
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Event Type */}
      <div>
        <label className="block text-sm font-medium mb-2">Event Type *</label>
        <Select
          value={form.watch('event_type')}
          onValueChange={value => form.setValue('event_type', value as any)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="drilling_results">Drilling Results</SelectItem>
            <SelectItem value="assay_results">Assay Results</SelectItem>
            <SelectItem value="jorc_resource">JORC Resource</SelectItem>
            <SelectItem value="production_update">Production Update</SelectItem>
            {/* ... other options */}
          </SelectContent>
        </Select>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-2">Event Title *</label>
        <Input
          {...form.register('title')}
          placeholder="e.g., Phase 3 Drilling Complete - High Grade Intercepts"
        />
        {form.formState.errors.title && (
          <p className="text-sm text-red-500 mt-1">{form.formState.errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          {...form.register('description')}
          placeholder="Provide details about the event..."
          rows={5}
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium mb-2">Event Date *</label>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {form.watch('event_date')
            ? moment(form.watch('event_date')).format('DD MMM YYYY')
            : 'Select date'}
        </Button>
        {showCalendar && (
          <Calendar
            mode="single"
            selected={form.watch('event_date')}
            onSelect={date => {
              form.setValue('event_date', date)
              setShowCalendar(false)
            }}
          />
        )}
      </div>

      {/* Flags */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...form.register('is_price_sensitive')}
            className="rounded"
          />
          <span className="text-sm">Price Sensitive</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...form.register('published')}
            className="rounded"
          />
          <span className="text-sm">Publish Immediately</span>
        </label>
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : defaultValues ? 'Update Event' : 'Create Event'}
        </Button>
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
      </div>
    </form>
  )
}
```

### 6.3 State Management

**Use Server Components + Client Components (No Global State Library Needed)**

```typescript
// Server Component (fetches data)
// app/calendar/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import CalendarView from '@/components/calendar/calendar-view'

export default async function CalendarPage() {
  const supabase = createServerComponentClient({ cookies })

  const { data: events } = await supabase
    .from('events')
    .select('*, company:companies(*)')
    .eq('published', true)
    .gte('event_date', new Date().toISOString())
    .order('event_date', { ascending: true })

  return (
    <div>
      <h1>Calendar</h1>
      <CalendarView events={events || []} />
    </div>
  )
}

// Client Component (for interactivity)
// components/calendar/calendar-view.tsx
'use client'

import { useState } from 'react'
import { Event } from '@/types/database'

export default function CalendarView({ events }: { events: Event[] }) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  // Client-side state and interactions
  return (
    <div>
      {/* Calendar UI */}
      {selectedEvent && <EventDetailModal event={selectedEvent} />}
    </div>
  )
}
```

**For Complex State (if needed):**

```typescript
// lib/hooks/use-calendar-filters.ts
import { create } from 'zustand'

interface CalendarFilters {
  commodities: string[]
  companies: string[]
  eventTypes: string[]
  dateRange: { from: Date; to: Date }
  isCriticalMinerals: boolean
}

interface CalendarStore {
  filters: CalendarFilters
  setFilters: (filters: Partial<CalendarFilters>) => void
  resetFilters: () => void
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  filters: {
    commodities: [],
    companies: [],
    eventTypes: [],
    dateRange: { from: new Date(), to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    isCriticalMinerals: false,
  },
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () =>
    set({
      filters: {
        commodities: [],
        companies: [],
        eventTypes: [],
        dateRange: { from: new Date(), to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
        isCriticalMinerals: false,
      },
    }),
}))
```

---

## 7. Backend Services

### 7.1 ASX Scraper (Edge Function)

```typescript
// supabase/functions/scrape-asx/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as cheerio from 'https://esm.sh/cheerio@1.0.0-rc.12'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

serve(async (req) => {
  try {
    console.log('Starting ASX scrape...')

    // Fetch ASX announcements
    const response = await fetch(
      'https://www.asx.com.au/asx/v2/statistics/announcements.csv'
    )

    if (!response.ok) {
      throw new Error(`ASX API returned ${response.status}`)
    }

    const csv = await response.text()
    const lines = csv.split('\n').slice(1) // Skip header

    const announcements = lines
      .map((line) => {
        const [code, id, datetime, headline, url, priceSensitive] = line.split(',')
        return {
          asx_code: code,
          announcement_id: id,
          datetime: new Date(datetime),
          headline: headline.replace(/"/g, ''),
          url: url.replace(/"/g, ''),
          is_price_sensitive: priceSensitive === 'Y',
        }
      })
      .filter((a) => a.asx_code) // Filter empty lines

    console.log(`Found ${announcements.length} announcements`)

    // Filter for relevant event types (drilling, assay, etc.)
    const relevantKeywords = [
      'drill',
      'assay',
      'jorc',
      'resource',
      'production',
      'study',
      'feasibility',
      'permit',
      'quarterly',
    ]

    const relevantAnnouncements = announcements.filter((a) =>
      relevantKeywords.some((keyword) =>
        a.headline.toLowerCase().includes(keyword)
      )
    )

    console.log(`Filtered to ${relevantAnnouncements.length} relevant announcements`)

    // Create events for relevant announcements
    let newEventsCreated = 0
    const errors: string[] = []

    for (const announcement of relevantAnnouncements) {
      try {
        // Check if company exists
        const { data: company } = await supabase
          .from('companies')
          .select('id')
          .eq('asx_code', announcement.asx_code)
          .single()

        if (!company) {
          console.log(`Skipping ${announcement.asx_code} - company not in database`)
          continue
        }

        // Check if event already exists (by ASX announcement URL)
        const { data: existingEvent } = await supabase
          .from('events')
          .select('id')
          .eq('asx_announcement_url', announcement.url)
          .single()

        if (existingEvent) {
          console.log(`Event already exists for ${announcement.url}`)
          continue
        }

        // Determine event type from headline
        const eventType = determineEventType(announcement.headline)

        // Create event
        const { error: insertError } = await supabase.from('events').insert({
          company_id: company.id,
          title: announcement.headline,
          event_type: eventType,
          event_date: announcement.datetime.toISOString().split('T')[0],
          asx_announcement_url: announcement.url,
          is_price_sensitive: announcement.is_price_sensitive,
          published: false, // Company needs to review and publish
          created_at: new Date().toISOString(),
        })

        if (insertError) {
          errors.push(`Failed to create event for ${announcement.asx_code}: ${insertError.message}`)
        } else {
          newEventsCreated++
        }
      } catch (error) {
        errors.push(`Error processing ${announcement.asx_code}: ${error.message}`)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        announcements_found: announcements.length,
        relevant_announcements: relevantAnnouncements.length,
        new_events_created: newEventsCreated,
        errors,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Scraper error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

function determineEventType(headline: string): string {
  const lower = headline.toLowerCase()

  if (lower.includes('drill') && lower.includes('result')) return 'drilling_results'
  if (lower.includes('assay') && lower.includes('result')) return 'assay_results'
  if (lower.includes('jorc')) return 'jorc_resource'
  if (lower.includes('resource') && lower.includes('update')) return 'resource_update'
  if (lower.includes('production')) return 'production_update'
  if (lower.includes('feasibility') || lower.includes('pfs') || lower.includes('dfs'))
    return 'feasibility_study'
  if (lower.includes('permit') || lower.includes('approval')) return 'permits_approvals'
  if (lower.includes('capital') || lower.includes('raise') || lower.includes('placement'))
    return 'capital_raise'
  if (lower.includes('quarterly')) return 'quarterly_report'
  if (lower.includes('agm') || lower.includes('egm')) return 'agm_egm'

  return 'other'
}
```

**Cron Job (SQL):**

```sql
-- Run scraper every hour during market hours (10am-4pm AEST weekdays)
SELECT cron.schedule(
  'scrape-asx-hourly',
  '0 10-16 * * 1-5', -- Every hour from 10am-4pm, Mon-Fri
  $$
  SELECT net.http_post(
    url := 'https://your-project.supabase.co/functions/v1/scrape-asx',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'service_role_key')
    )
  );
  $$
);
```

### 7.2 Email Digest (Edge Function)

```typescript
// supabase/functions/send-daily-digest/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import FormData from 'https://esm.sh/form-data@4.0.0'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const MAILGUN_API_KEY = Deno.env.get('MAILGUN_API_KEY')!
const MAILGUN_DOMAIN = Deno.env.get('MAILGUN_DOMAIN')!  // e.g., 'mg.capsight.com'

serve(async (req) => {
  try {
    console.log('Starting daily digest send...')

    // Get all users with daily digest enabled
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select(`
        id,
        email,
        full_name,
        timezone,
        watchlist (
          company:companies (
            id,
            asx_code,
            company_name
          )
        )
      `)
      .eq('notification_preferences->daily_digest', true)

    if (usersError) throw usersError

    console.log(`Found ${users.length} users with daily digest enabled`)

    const today = new Date().toISOString().split('T')[0]
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    let emailsSent = 0
    let errors = 0

    // Process in batches of 100 (Mailgun recommended batch size)
    for (let i = 0; i < users.length; i += 100) {
      const batch = users.slice(i, i + 100)

      const emailPromises = batch.map(async (user) => {
        try {
          // Get watchlist company IDs
          const companyIds = user.watchlist.map((w) => w.company.id)

          if (companyIds.length === 0) {
            console.log(`User ${user.email} has no watchlist, skipping`)
            return
          }

          // Get events for watchlist companies (today + next 7 days)
          const { data: events } = await supabase
            .from('events')
            .select(`
              id,
              title,
              event_type,
              event_date,
              event_time,
              company:companies (
                asx_code,
                company_name,
                logo_url
              )
            `)
            .in('company_id', companyIds)
            .eq('published', true)
            .gte('event_date', today)
            .lte('event_date', nextWeek)
            .order('event_date', { ascending: true })

          if (!events || events.length === 0) {
            console.log(`No events for user ${user.email}, skipping`)
            return
          }

          // Send email via Mailgun
          const formData = new FormData()
          formData.append('from', 'CapSight <digest@capsight.com>')
          formData.append('to', user.email)
          formData.append('subject', `Your Daily Digest - ${events.length} Upcoming Events`)
          formData.append('html', generateDigestHTML(user, events))

          await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
            },
            body: formData,
          })

          emailsSent++
        } catch (error) {
          console.error(`Error sending email to ${user.email}:`, error)
          errors++
        }
      })

      await Promise.all(emailPromises)
    }

    return new Response(
      JSON.stringify({
        success: true,
        emails_sent: emailsSent,
        errors,
        total_users: users.length,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Digest error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

function generateDigestHTML(user: any, events: any[]): string {
  const eventsHTML = events
    .map(
      (event) => `
    <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src="${event.company.logo_url}" alt="${event.company.company_name}" style="width: 40px; height: 40px; border-radius: 4px;" />
        <div>
          <strong>${event.company.asx_code}</strong> - ${event.company.company_name}
        </div>
      </div>
      <h3 style="margin-top: 10px;">${event.title}</h3>
      <p style="color: #6b7280;">
        📅 ${new Date(event.event_date).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        ${event.event_time ? `at ${event.event_time}` : ''}
      </p>
      <a href="https://capsight.com/events/${event.id}" style="color: #3b82f6; text-decoration: none;">View Details →</a>
    </div>
  `
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://capsight.com/logo.png" alt="CapSight" style="width: 150px;" />
        </div>
        
        <h1 style="color: #111827;">Hi ${user.full_name || 'there'}! 👋</h1>
        <p style="color: #6b7280; font-size: 16px;">
          Here are the upcoming events for your watchlist companies:
        </p>

        ${eventsHTML}

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 14px;">
          <p>
            <a href="https://capsight.com/calendar" style="color: #3b82f6; text-decoration: none;">View Full Calendar</a>
            |
            <a href="https://capsight.com/watchlist" style="color: #3b82f6; text-decoration: none;">Manage Watchlist</a>
            |
            <a href="https://capsight.com/settings/notifications" style="color: #3b82f6; text-decoration: none;">Update Preferences</a>
          </p>
          <p style="margin-top: 10px;">
            <a href="https://capsight.com/unsubscribe?token={{UNSUBSCRIBE_TOKEN}}" style="color: #9ca3af; text-decoration: none;">Unsubscribe</a>
          </p>
        </div>
      </body>
    </html>
  `
}
```

**Cron Job:**

```sql
-- Send daily digest at 9am AEST every day
SELECT cron.schedule(
  'send-daily-digest',
  '0 9 * * *', -- 9am daily
  $$
  SELECT net.http_post(
    url := 'https://your-project.supabase.co/functions/v1/send-daily-digest',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'service_role_key')
    )
  );
  $$
);
```

### 7.3 Algorithm Calculation (Edge Function)

```typescript
// supabase/functions/calculate-scores/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

serve(async (req) => {
  try {
    console.log('Starting score calculation...')

    // Get all active companies
    const { data: companies, error: companiesError } = await supabase
      .from('companies')
      .select('*')
      .eq('subscription_status', 'active')

    if (companiesError) throw companiesError

    console.log(`Calculating scores for ${companies.length} companies`)

    const scores = []

    for (const company of companies) {
      try {
        const score = await calculateCompanyScore(company)
        scores.push(score)

        // Upsert score
        await supabase
          .from('recommendation_scores')
          .upsert({
            company_id: company.id,
            ...score,
            calculated_at: new Date().toISOString(),
          })
      } catch (error) {
        console.error(`Error calculating score for ${company.asx_code}:`, error)
      }
    }

    const avgScore = scores.reduce((sum, s) => sum + s.total_score, 0) / scores.length

    return new Response(
      JSON.stringify({
        success: true,
        companies_scored: scores.length,
        average_score: avgScore,
        top_recommendations: scores
          .sort((a, b) => b.total_score - a.total_score)
          .slice(0, 10)
          .map((s) => ({
            company_id: s.company_id,
            asx_code: companies.find((c) => c.id === s.company_id)?.asx_code,
            score: s.total_score,
          })),
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Score calculation error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

async function calculateCompanyScore(company: any) {
  // 1. Event Frequency Score (0-100)
  const { count: eventsLast3Months } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('company_id', company.id)
    .eq('published', true)
    .gte('event_date', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString())

  const eventFrequencyScore = Math.min(100, eventsLast3Months * 10) // Max 100 for 10+ events

  // 2. Insider Buying Score (0-100)
  // TODO: Implement when director trades data is available
  const insiderBuyingScore = 50 // Placeholder

  // 3. Price Momentum Score (0-100)
  // TODO: Fetch share price data from Yahoo Finance
  const priceMomentumScore = 50 // Placeholder

  // 4. Critical Minerals Bonus (0-100)
  const criticalMineralsScore = company.is_critical_minerals ? 100 : 0

  // 5. Resource Growth Score (0-100)
  // Check for JORC resource updates in last 6 months
  const { count: resourceUpdates } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('company_id', company.id)
    .eq('event_type', 'jorc_resource')
    .gte('event_date', new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString())

  const resourceGrowthScore = Math.min(100, resourceUpdates * 50) // Max 100 for 2+ updates

  // Weighted average
  const weights = {
    event_frequency: 0.25,
    insider_buying: 0.20,
    price_momentum: 0.20,
    critical_minerals: 0.20,
    resource_growth: 0.15,
  }

  const totalScore =
    eventFrequencyScore * weights.event_frequency +
    insiderBuyingScore * weights.insider_buying +
    priceMomentumScore * weights.price_momentum +
    criticalMineralsScore * weights.critical_minerals +
    resourceGrowthScore * weights.resource_growth

  // Confidence score (based on data completeness)
  const confidenceScore = company.is_critical_minerals ? 70 : 60 // Higher confidence for critical minerals

  return {
    company_id: company.id,
    total_score: Math.round(totalScore * 100) / 100,
    event_frequency_score: eventFrequencyScore,
    insider_buying_score: insiderBuyingScore,
    price_momentum_score: priceMomentumScore,
    critical_minerals_score: criticalMineralsScore,
    resource_growth_score: resourceGrowthScore,
    confidence_score: confidenceScore,
    reasoning: {
      factors: [
        { name: 'Event Frequency', score: eventFrequencyScore, weight: weights.event_frequency },
        { name: 'Insider Buying', score: insiderBuyingScore, weight: weights.insider_buying },
        { name: 'Price Momentum', score: priceMomentumScore, weight: weights.price_momentum },
        {
          name: 'Critical Minerals',
          score: criticalMineralsScore,
          weight: weights.critical_minerals,
        },
        { name: 'Resource Growth', score: resourceGrowthScore, weight: weights.resource_growth },
      ],
      highlights: [
        `${eventsLast3Months} events in last 3 months`,
        company.is_critical_minerals ? 'Critical Minerals company' : null,
        resourceUpdates > 0 ? `${resourceUpdates} resource updates in 6 months` : null,
      ].filter(Boolean),
    },
  }
}
```

**Cron Job:**

```sql
-- Recalculate scores every 6 hours
SELECT cron.schedule(
  'calculate-scores-6h',
  '0 */6 * * *', -- Every 6 hours
  $$
  SELECT net.http_post(
    url := 'https://your-project.supabase.co/functions/v1/calculate-scores',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'service_role_key')
    )
  );
  $$
);
```

---

## 8. Data Collection

### 8.1 Yahoo Finance Integration

```typescript
// lib/api/share-prices.ts
import { createClient } from '@supabase/supabase-js'

const YAHOO_FINANCE_API = 'https://query1.finance.yahoo.com/v8/finance/chart'

interface SharePriceData {
  current_price: number
  change_percent: number
  high_52w: number
  low_52w: number
  market_cap: number
  volume: number
  last_updated: Date
}

export async function fetchSharePrice(asxCode: string): Promise<SharePriceData | null> {
  try {
    // Yahoo Finance uses .AX suffix for ASX stocks
    const symbol = `${asxCode}.AX`
    
    const response = await fetch(
      `${YAHOO_FINANCE_API}/${symbol}?interval=1d&range=1y`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; CapSight/1.0)',
        },
      }
    )

    if (!response.ok) {
      console.error(`Yahoo Finance API error: ${response.status}`)
      return null
    }

    const data = await response.json()
    const quote = data.chart.result[0]
    const meta = quote.meta
    const prices = quote.indicators.quote[0]

    return {
      current_price: meta.regularMarketPrice,
      change_percent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100,
      high_52w: meta.fiftyTwoWeekHigh,
      low_52w: meta.fiftyTwoWeekLow,
      market_cap: meta.marketCap,
      volume: meta.regularMarketVolume,
      last_updated: new Date(),
    }
  } catch (error) {
    console.error(`Error fetching share price for ${asxCode}:`, error)
    return null
  }
}

// Cache share prices in database (15-minute TTL)
export async function getCachedSharePrice(asxCode: string): Promise<SharePriceData | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Check cache
  const { data: cached } = await supabase
    .from('share_price_cache')
    .select('*')
    .eq('asx_code', asxCode)
    .gte('cached_at', new Date(Date.now() - 15 * 60 * 1000).toISOString()) // 15 min TTL
    .single()

  if (cached) {
    return {
      current_price: cached.current_price,
      change_percent: cached.change_percent,
      high_52w: cached.high_52w,
      low_52w: cached.low_52w,
      market_cap: cached.market_cap,
      volume: cached.volume,
      last_updated: new Date(cached.cached_at),
    }
  }

  // Fetch fresh data
  const priceData = await fetchSharePrice(asxCode)
  if (!priceData) return null

  // Update cache
  await supabase.from('share_price_cache').upsert({
    asx_code: asxCode,
    current_price: priceData.current_price,
    change_percent: priceData.change_percent,
    high_52w: priceData.high_52w,
    low_52w: priceData.low_52w,
    market_cap: priceData.market_cap,
    volume: priceData.volume,
    cached_at: new Date().toISOString(),
  })

  return priceData
}
```

**Share Price Cache Table:**

```sql
CREATE TABLE public.share_price_cache (
  asx_code TEXT PRIMARY KEY,
  current_price DECIMAL(10,2),
  change_percent DECIMAL(5,2),
  high_52w DECIMAL(10,2),
  low_52w DECIMAL(10,2),
  market_cap BIGINT,
  volume BIGINT,
  cached_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_share_price_cache_cached_at ON share_price_cache(cached_at DESC);
```

### 8.2 Government Incentives (Manual Entry)

```sql
-- Government incentives table (manual data entry)
CREATE TABLE public.government_incentives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_name TEXT NOT NULL,
  description TEXT,
  amount_aud BIGINT, -- In cents
  announcement_date DATE,
  announcement_url TEXT,
  
  -- Filtering
  applies_to_critical_minerals BOOLEAN DEFAULT false,
  applies_to_commodities TEXT[], -- Array of commodities
  
  -- Tracking
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction table: Which companies received which incentives
CREATE TABLE public.company_incentives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  incentive_id UUID NOT NULL REFERENCES government_incentives(id) ON DELETE CASCADE,
  amount_received_aud BIGINT, -- Specific amount company received
  received_date DATE,
  notes TEXT,
  
  CONSTRAINT unique_company_incentive UNIQUE (company_id, incentive_id)
);
```

---

## 9. Email System

### 9.1 React Email Templates

```typescript
// emails/daily-digest.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
  Img,
  Hr,
} from '@react-email/components'

interface Event {
  id: string
  title: string
  event_date: string
  event_time?: string
  company: {
    asx_code: string
    company_name: string
    logo_url: string
  }
}

interface DailyDigestProps {
  user: {
    full_name: string
  }
  events: Event[]
}

export default function DailyDigest({ user, events }: DailyDigestProps) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'sans-serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          {/* Logo */}
          <Section style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Img
              src="https://capsight.com/logo.png"
              alt="CapSight"
              width="150"
              style={{ margin: '0 auto' }}
            />
          </Section>

          {/* Greeting */}
          <Heading style={{ color: '#111827', fontSize: '24px' }}>
            Hi {user.full_name || 'there'}! 👋
          </Heading>
          <Text style={{ color: '#6b7280', fontSize: '16px' }}>
            Here are the upcoming events for your watchlist companies:
          </Text>

          {/* Events */}
          {events.map((event) => (
            <Section
              key={event.id}
              style={{
                marginBottom: '20px',
                padding: '15px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
              }}
            >
              {/* Company Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Img
                  src={event.company.logo_url}
                  alt={event.company.company_name}
                  width="40"
                  height="40"
                  style={{ borderRadius: '4px' }}
                />
                <div>
                  <Text style={{ margin: '0', fontWeight: 'bold' }}>
                    {event.company.asx_code}
                  </Text>
                  <Text style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>
                    {event.company.company_name}
                  </Text>
                </div>
              </div>

              {/* Event Details */}
              <Heading style={{ fontSize: '18px', margin: '10px 0' }}>{event.title}</Heading>
              <Text style={{ color: '#6b7280', margin: '5px 0' }}>
                📅 {new Date(event.event_date).toLocaleDateString('en-AU', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
                {event.event_time && ` at ${event.event_time}`}
              </Text>
              <Link
                href={`https://capsight.com/events/${event.id}`}
                style={{ color: '#3b82f6', textDecoration: 'none' }}
              >
                View Details →
              </Link>
            </Section>
          ))}

          {/* Footer */}
          <Hr style={{ margin: '40px 0 20px', borderColor: '#e5e7eb' }} />
          <Section style={{ textAlign: 'center' }}>
            <Text style={{ color: '#9ca3af', fontSize: '14px' }}>
              <Link
                href="https://capsight.com/calendar"
                style={{ color: '#3b82f6', textDecoration: 'none' }}
              >
                View Full Calendar
              </Link>
              {' | '}
              <Link
                href="https://capsight.com/watchlist"
                style={{ color: '#3b82f6', textDecoration: 'none' }}
              >
                Manage Watchlist
              </Link>
              {' | '}
              <Link
                href="https://capsight.com/settings/notifications"
                style={{ color: '#3b82f6', textDecoration: 'none' }}
              >
                Update Preferences
              </Link>
            </Text>
            <Text style={{ color: '#9ca3af', fontSize: '12px', marginTop: '10px' }}>
              <Link
                href="https://capsight.com/unsubscribe"
                style={{ color: '#9ca3af', textDecoration: 'none' }}
              >
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
```

### 9.2 Unsubscribe Handling

```typescript
// app/unsubscribe/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }

  // Verify JWT token (contains user_id)
  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error || !user) {
      return NextResponse.redirect(new URL('/error', request.url))
    }

    // Update notification preferences
    await supabase
      .from('users')
      .update({
        notification_preferences: {
          daily_digest: false,
          event_alerts: false,
          real_time: false,
        },
      })
      .eq('id', user.id)

    // Redirect to confirmation page
    return NextResponse.redirect(new URL('/unsubscribed', request.url))
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  }
}
```

---

## 10. File Storage

### 10.1 Supabase Storage Setup

```typescript
// lib/storage.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Storage buckets
export const BUCKETS = {
  LOGOS: 'company-logos',
  DOCUMENTS: 'company-documents',
}

// Upload company logo
export async function uploadLogo(file: File, companyId: string): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${companyId}-${Date.now()}.${fileExt}`
    const filePath = `logos/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from(BUCKETS.LOGOS)
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
      })

    if (uploadError) throw uploadError

    // Get public URL
    const { data } = supabase.storage.from(BUCKETS.LOGOS).getPublicUrl(filePath)

    return data.publicUrl
  } catch (error) {
    console.error('Logo upload error:', error)
    return null
  }
}

// Upload document
export async function uploadDocument(
  file: File,
  companyId: string,
  eventId?: string
): Promise<{ url: string; path: string } | null> {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${companyId}-${Date.now()}.${fileExt}`
    const filePath = eventId ? `${companyId}/${eventId}/${fileName}` : `${companyId}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from(BUCKETS.DOCUMENTS)
      .upload(filePath, file, {
        contentType: file.type,
      })

    if (uploadError) throw uploadError

    // Get public URL
    const { data } = supabase.storage.from(BUCKETS.DOCUMENTS).getPublicUrl(filePath)

    return {
      url: data.publicUrl,
      path: filePath,
    }
  } catch (error) {
    console.error('Document upload error:', error)
    return null
  }
}

// Delete document
export async function deleteDocument(path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage.from(BUCKETS.DOCUMENTS).remove([path])

    if (error) throw error

    return true
  } catch (error) {
    console.error('Document deletion error:', error)
    return false
  }
}
```

### 10.2 Storage Policies (RLS)

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
('company-logos', 'company-logos', true),
('company-documents', 'company-documents', true);

-- Company logos policies
CREATE POLICY "Anyone can view logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'company-logos');

CREATE POLICY "Company admins can upload own logos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'company-logos'
  AND auth.uid() IN (
    SELECT id FROM users WHERE role = 'company_admin'
  )
);

-- Documents policies
CREATE POLICY "Anyone can view public documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'company-documents'
  AND (storage.foldername(name))[1] IN (
    SELECT id::text FROM documents WHERE is_public = true
  )
);

CREATE POLICY "Company admins can upload documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'company-documents'
  AND (storage.foldername(name))[1] IN (
    SELECT company_id::text FROM users
    WHERE id = auth.uid() AND role = 'company_admin'
  )
);

CREATE POLICY "Company admins can delete own documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'company-documents'
  AND (storage.foldername(name))[1] IN (
    SELECT company_id::text FROM users
    WHERE id = auth.uid() AND role = 'company_admin'
  )
);
```

---

## 11. Algorithm Implementation

### 11.1 Scoring Algorithm (Detailed)

**Formula:**

```
Total Score = (
  Event Frequency Score × 25% +
  Insider Buying Score × 20% +
  Price Momentum Score × 20% +
  Critical Minerals Score × 20% +
  Resource Growth Score × 15%
)
```

**Component Calculations:**

**1. Event Frequency Score (0-100)**
```typescript
// Events published in last 3 months
const eventsLast3Months = await getEventCount(companyId, 90)

// Score: 10 points per event, max 100
const eventFrequencyScore = Math.min(100, eventsLast3Months * 10)
```

**2. Insider Buying Score (0-100)**
```typescript
// Director transactions in last 6 months
const directorBuys = await getDirectorTransactions(companyId, 180, 'buy')
const directorSells = await getDirectorTransactions(companyId, 180, 'sell')

// Net buying score
const netBuying = directorBuys.total_value - directorSells.total_value

// Score based on net buying as % of market cap
const insiderBuyingScore = Math.min(100, (netBuying / marketCap) * 1000)
```

**3. Price Momentum Score (0-100)**
```typescript
// Share price change over last 3 months
const priceChange3M = await getPriceChange(asxCode, 90)

// Score: 0 at -50%, 50 at 0%, 100 at +50%
const priceMomentumScore = Math.max(0, Math.min(100, (priceChange3M + 50) * 2))
```

**4. Critical Minerals Score (0-100)**
```typescript
// Binary: 100 if critical minerals, 0 otherwise
const criticalMineralsScore = isCriticalMinerals ? 100 : 0
```

**5. Resource Growth Score (0-100)**
```typescript
// JORC resource updates in last 6 months
const resourceUpdates = await getEventCount(companyId, 180, 'jorc_resource')

// Score: 50 points per update, max 100
const resourceGrowthScore = Math.min(100, resourceUpdates * 50)
```

### 11.2 Backtesting Framework

```typescript
// lib/algorithm/backtest.ts
interface BacktestResult {
  total_tests: number
  successful_predictions: number
  accuracy: number
  average_return: number
  best_performer: { company: string; return: number }
  worst_performer: { company: string; return: number }
}

export async function backtestAlgorithm(
  startDate: Date,
  endDate: Date
): Promise<BacktestResult> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Get all companies active during the period
  const { data: companies } = await supabase
    .from('companies')
    .select('*')
    .lte('listing_date', endDate.toISOString())

  const results = []

  for (const company of companies) {
    // Calculate score as of startDate
    const score = await calculateHistoricalScore(company.id, startDate)

    // Get actual share price performance from startDate to endDate
    const priceChange = await getHistoricalPriceChange(
      company.asx_code,
      startDate,
      endDate
    )

    results.push({
      company_id: company.id,
      asx_code: company.asx_code,
      score,
      price_change: priceChange,
      prediction_correct: (score > 65 && priceChange > 0) || (score < 35 && priceChange < 0),
    })
  }

  const successfulPredictions = results.filter((r) => r.prediction_correct).length
  const accuracy = (successfulPredictions / results.length) * 100
  const averageReturn = results.reduce((sum, r) => sum + r.price_change, 0) / results.length

  return {
    total_tests: results.length,
    successful_predictions: successfulPredictions,
    accuracy,
    average_return: averageReturn,
    best_performer: results.sort((a, b) => b.price_change - a.price_change)[0],
    worst_performer: results.sort((a, b) => a.price_change - b.price_change)[0],
  }
}
```

---

## 12. Deployment & Infrastructure

### 12.1 Environment Variables

```bash
# .env.local (Development)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_DOMAIN=mg.capsight.com

NEXT_PUBLIC_APP_URL=http://localhost:3000

# .env.production (Production)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_DOMAIN=mg.capsight.com

NEXT_PUBLIC_APP_URL=https://capsight.com
```

### 12.2 Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["syd1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-role-key",
    "MAILGUN_API_KEY": "@mailgun-api-key",
    "MAILGUN_DOMAIN": "@mailgun-domain"
  }
}
```

### 12.3 PWA Configuration

```typescript
// app/manifest.ts
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CapSight Analytics',
    short_name: 'CapSight',
    description: 'ASX Commodities Event Calendar',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-maskable-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
```

**Service Worker:**

```typescript
// public/sw.js
const CACHE_NAME = 'capsight-v1'
const urlsToCache = [
  '/',
  '/calendar',
  '/critical-minerals',
  '/offline',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response
      }

      return fetch(event.request).then((response) => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        // Clone response
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
    })
  )
})

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
```

---

## 13. Security

### 13.1 Security Checklist

**Authentication:**
- âœ… Magic links only (no passwords to steal)
- âœ… JWT tokens with 7-day expiry
- âœ… Session validation on every request
- âœ… 2FA available for premium users (Phase 2)

**Authorization:**
- âœ… Row Level Security on all tables
- âœ… API route protection middleware
- âœ… Company admins can only access their data
- âœ… Platform admins have read-only by default

**Data Protection:**
- âœ… All connections over HTTPS
- âœ… Sensitive data encrypted at rest (Supabase)
- âœ… API keys stored in Supabase Vault
- âœ… No sensitive data in frontend

**Input Validation:**
- âœ… Zod validation on all forms
- âœ… Server-side validation on all API routes
- âœ… SQL injection protection (parameterized queries)
- âœ… XSS protection (React escapes by default)

**File Uploads:**
- âœ… File type validation (PDFs only)
- âœ… File size limits (50MB max)
- âœ… Virus scanning (ClamAV integration - Phase 3)
- âœ… Storage policies (company admins only)

**Rate Limiting:**
- âœ… 100 requests per minute per IP (API routes)
- âœ… 10 uploads per hour per company
- âœ… 5 search queries per second per user

### 13.2 Rate Limiting Implementation

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Create rate limiter
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
  analytics: true,
})

// Apply rate limit
export async function rateLimit(identifier: string) {
  const { success, limit, reset, remaining } = await ratelimit.limit(identifier)

  if (!success) {
    throw new Error('Rate limit exceeded')
  }

  return {
    limit,
    remaining,
    reset,
  }
}

// Usage in API route
// app/api/events/route.ts
export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'

  try {
    await rateLimit(ip)
  } catch (error) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    )
  }

  // ... rest of handler
}
```

---

## 14. Performance Optimization

### 14.1 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Homepage Load | <2s | Lighthouse |
| Calendar Load | <2s | Lighthouse |
| Company Profile | <1.5s | Lighthouse |
| Event Detail | <1s | Lighthouse |
| API Response | <100ms | Server logs |
| Database Query | <50ms | Supabase dashboard |

### 14.2 Optimization Strategies

**Frontend:**
1. **Code Splitting**
   - Dynamic imports for large components
   - Route-based code splitting (default in Next.js)

2. **Image Optimization**
   - Use next/image for all images
   - WebP format with fallbacks
   - Lazy loading below the fold

3. **Caching**
   - Static pages cached at CDN
   - API responses cached (15 min TTL)
   - Service worker for offline access

**Backend:**
1. **Database Optimization**
   - Indexes on frequently queried columns
   - Materialized views for aggregations
   - Query result pagination

2. **API Optimization**
   - Response compression (gzip)
   - GraphQL for complex queries (Phase 2)
   - Batch requests where possible

3. **Edge Functions**
   - Run close to users (Cloudflare)
   - 10-50ms response times
   - Auto-scale with traffic

### 14.3 Monitoring Performance

```typescript
// lib/monitoring.ts
import * as Sentry from '@sentry/nextjs'

// Track slow API responses
export function trackAPIPerformance(
  endpoint: string,
  duration: number
) {
  if (duration > 1000) {
    Sentry.captureMessage(`Slow API response: ${endpoint} took ${duration}ms`, 'warning')
  }
}

// Track slow database queries
export function trackQueryPerformance(
  query: string,
  duration: number
) {
  if (duration > 100) {
    Sentry.captureMessage(`Slow query: ${query} took ${duration}ms`, 'warning')
  }
}

// Usage
const start = Date.now()
const data = await supabase.from('events').select('*')
const duration = Date.now() - start
trackQueryPerformance('select * from events', duration)
```

---

## 15. Monitoring & Logging

### 15.1 Error Tracking (Sentry)

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  
  // Adjust sample rates
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Filter out noise
  beforeSend(event, hint) {
    // Don't send rate limit errors
    if (event.message?.includes('Rate limit')) {
      return null
    }
    return event
  },
})
```

### 15.2 Analytics (PostHog)

```typescript
// lib/analytics.ts
import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing()
    },
  })
}

// Track custom events
export const analytics = {
  page: (name: string) => {
    posthog.capture('$pageview', { page: name })
  },
  
  event: (name: string, properties?: Record<string, any>) => {
    posthog.capture(name, properties)
  },
  
  identify: (userId: string, traits?: Record<string, any>) => {
    posthog.identify(userId, traits)
  },
}

// Usage
analytics.event('event_viewed', {
  event_id: 'abc123',
  event_type: 'drilling_results',
  company_asx_code: 'LTR',
})
```

### 15.3 Uptime Monitoring (UptimeRobot)

**Endpoints to Monitor:**
- Homepage: https://capsight.com
- Calendar: https://capsight.com/calendar
- API Health: https://capsight.com/api/health
- Database: Supabase dashboard health check

**Alert Channels:**
- Email: team@capsight.com
- Slack: #alerts channel

**Check Frequency:** Every 5 minutes

---

## Appendix A: Quick Reference

### Common Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm start                  # Start production server

# Database
pnpm supabase db push       # Apply migrations
pnpm supabase db seed       # Seed database
pnpm supabase db reset      # Reset database (DANGER)

# Testing
pnpm test                   # Run unit tests
pnpm test:e2e               # Run E2E tests

# Deployment
git push origin main        # Deploy to production (Vercel)
```

### Useful Links

- **Supabase Dashboard:** https://app.supabase.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Mailgun Dashboard:** https://app.mailgun.com/
- **Sentry Dashboard:** https://sentry.io
- **PostHog Dashboard:** https://app.posthog.com

---

**Document Version:** 1.0  
**Last Updated:** October 17, 2025  
**Status:** Ready for Development  
**Next Review:** After Week 4 milestone

**Sign-off:**
- [ ] Technical Lead (confirms architecture)
- [ ] Backend Developer (confirms database schema)
- [ ] Frontend Developer (confirms component structure)
- [ ] Ready to build ✅
### 6.X Custom Calendar Architecture

**Design Philosophy:**
The calendar is the core product - built custom for complete UX control and unique features.

**Tech Stack:**
- **Headless Logic:** @internationalized/date + react-aria (accessibility, i18n, date math)
- **Animations:** Framer Motion (micro-interactions, view transitions)
- **Gestures:** react-use-gesture (mobile swipe, pinch-to-zoom)
- **Virtualization:** @tanstack/react-virtual (performance for large date ranges)
- **State:** Zustand (calendar-specific state management)

**Views:**
1. Month View (custom grid)
2. Week View (timeline-based)
3. List View (agenda)
4. Day View (detailed)
5. Heatmap Overlay (density visualization)

**Unique Features:**
- Smart event clustering (multiple events on same day)
- Predictive highlighting (AI-powered importance)
- Gesture-based navigation (swipe, pinch)
- Command palette (Cmd+K power user shortcuts)
- Real-time collaborative watching (Supabase Presence)
- Timeline scrubber with preview
