# Supabase Database Migrations

This directory contains Supabase database migrations for CapSight Analytics.

## Running Migrations

### Option 1: Apply to Remote Supabase Project

Since you've already created your Supabase project and have the credentials in `.env.local`, you can apply these migrations using the Supabase CLI:

```bash
# Install Supabase CLI (if not already installed)
brew install supabase/tap/supabase

# Link to your remote project
supabase link --project-ref YOUR_PROJECT_REF

# Push migrations to remote database
supabase db push
```

### Option 2: Run SQL Directly in Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Select your CapSight Analytics project
3. Navigate to SQL Editor
4. Copy and paste the contents of each migration file in order:
   - First: `20250117000001_initial_schema.sql`
   - Second: `20250117000002_seed_data.sql`
5. Execute each script

### Option 3: Use Supabase Migration API

You can also run the migrations programmatically using the Supabase Management API or by creating a one-time setup script.

## Migration Files

### `20250117000001_initial_schema.sql`
- Creates all database tables (12 tables)
- Sets up indexes for query performance
- Implements Row Level Security (RLS) policies
- Creates triggers for automatic timestamp updates
- Creates function to auto-create user profiles on signup

**Tables created:**
1. `companies` - ASX company information
2. `users` - User profiles and preferences
3. `events` - Mining events and announcements
4. `documents` - File attachments for events
5. `watchlist` - User-company watchlist relationships
6. `notifications` - User notification tracking
7. `recommendation_scores` - AI-powered company recommendations
8. `scrape_queue` - Background scraping task queue
9. `critical_minerals` - Reference data for critical minerals
10. `share_price_cache` - Cached share price data
11. `government_incentives` - Government funding programs
12. `company_incentives` - Company-incentive junction table

### `20250117000002_seed_data.sql`
- Seeds critical minerals reference data (11 minerals)
- Creates 10 sample ASX companies across various commodities:
  - PLS (Pilbara Minerals) - Lithium
  - LYC (Lynas Rare Earths) - Rare Earth Elements
  - IGO (IGO Limited) - Nickel, Lithium, Copper
  - CXO (Core Lithium) - Lithium
  - SYR (Syrah Resources) - Graphite
  - CHN (Chalice Mining) - Nickel, Copper, PGEs
  - LTR (Liontown Resources) - Lithium
  - AVL (Australian Vanadium) - Vanadium
  - ARU (Arafura Rare Earths) - Rare Earth Elements
  - JRV (Jervois Global) - Cobalt, Nickel
- Creates 15+ sample events across companies
- Seeds 3 government incentive programs
- Creates sample recommendation scores

## Database Schema Overview

### Security (RLS Policies)

All tables have Row Level Security enabled with the following access patterns:

**Public Access:**
- Published companies (read-only)
- Published events (read-only)
- Public documents (read-only)

**User Access:**
- Users can view/edit their own profile
- Users can manage their own watchlist (max 10 for free tier)
- Users can view their own notifications

**Company Admin Access:**
- Company admins can view/edit their own company data
- Company admins can create/edit events for their company
- Company admins can manage their company's documents

**Platform Admin Access:**
- Full access to all tables (service role key)

### Key Features

1. **Full-text Search**: Companies and events have GIN indexes for fast text search
2. **Geospatial Support**: Events can have location coordinates using PostGIS
3. **Timezone Support**: All timestamps stored as TIMESTAMPTZ (UTC)
4. **Email Tracking**: Notifications track email opens and clicks
5. **Audit Trail**: created_at/updated_at timestamps on all relevant tables
6. **Data Integrity**: CHECK constraints, foreign keys, and unique constraints

## Next Steps

After running the migrations:

1. ✅ Verify tables were created in Supabase Dashboard
2. ✅ Test RLS policies work correctly
3. ✅ Verify seed data loaded (should see 10 companies)
4. Build API routes in Next.js to interact with database
5. Set up Supabase client in application
