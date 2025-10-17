-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable PostGIS for location coordinates
CREATE EXTENSION IF NOT EXISTS postgis;

-- ============================================
-- TABLES
-- ============================================

-- 1. COMPANIES TABLE
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
  subscription_expires_at TIMESTAMPTZ,
  stripe_customer_id TEXT,

  -- Publishing
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,

  -- Tracking
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for companies
CREATE INDEX idx_companies_asx_code ON companies(asx_code);
CREATE INDEX idx_companies_critical_minerals ON companies(is_critical_minerals) WHERE is_critical_minerals = true;
CREATE INDEX idx_companies_primary_commodity ON companies(primary_commodity);
CREATE INDEX idx_companies_published ON companies(is_published) WHERE is_published = true;
CREATE INDEX idx_companies_subscription_status ON companies(subscription_status);

-- Full-text search on company names
CREATE INDEX idx_companies_search ON companies USING gin(to_tsvector('english', company_name));


-- 2. USERS TABLE
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

-- Indexes for users
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_company_id ON users(company_id);
CREATE INDEX idx_users_subscription_tier ON users(subscription_tier);
CREATE INDEX idx_users_email_bounced ON users(email_bounced) WHERE email_bounced = true;


-- 3. EVENTS TABLE
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

  -- Importance (AI scoring)
  importance_score DECIMAL(3,2) CHECK (importance_score BETWEEN 0 AND 1),
  importance_reasoning TEXT,

  -- Publishing
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,

  -- Source
  source TEXT CHECK (source IN ('company_portal', 'asx_scrape', 'manual')),
  source_url TEXT,

  -- Tracking
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for events
CREATE INDEX idx_events_company_id ON events(company_id);
CREATE INDEX idx_events_date ON events(event_date DESC);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_published ON events(is_published) WHERE is_published = true;
CREATE INDEX idx_events_importance ON events(importance_score DESC NULLS LAST);

-- Composite indexes for common queries
CREATE INDEX idx_events_company_date ON events(company_id, event_date DESC);
CREATE INDEX idx_events_published_date ON events(event_date DESC) WHERE is_published = true;

-- Full-text search on event titles and descriptions
CREATE INDEX idx_events_search ON events USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));


-- 4. DOCUMENTS TABLE
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

-- Indexes for documents
CREATE INDEX idx_documents_company_id ON documents(company_id);
CREATE INDEX idx_documents_event_id ON documents(event_id);
CREATE INDEX idx_documents_created_at ON documents(created_at DESC);


-- 5. WATCHLIST TABLE
CREATE TABLE public.watchlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,

  -- Metadata
  added_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT, -- Personal notes about the company

  CONSTRAINT unique_user_company UNIQUE (user_id, company_id)
);

-- Indexes for watchlist
CREATE INDEX idx_watchlist_user_id ON watchlist(user_id);
CREATE INDEX idx_watchlist_company_id ON watchlist(company_id);


-- 6. NOTIFICATIONS TABLE
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

-- Indexes for notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id, created_at DESC);
CREATE INDEX idx_notifications_unread ON notifications(user_id) WHERE read_at IS NULL;
CREATE INDEX idx_notifications_type ON notifications(type, created_at DESC);


-- 7. RECOMMENDATION SCORES TABLE
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

-- Indexes for recommendation_scores
CREATE INDEX idx_recommendation_scores_total ON recommendation_scores(total_score DESC);
CREATE INDEX idx_recommendation_scores_company ON recommendation_scores(company_id);
CREATE INDEX idx_recommendation_scores_calculated ON recommendation_scores(calculated_at DESC);


-- 8. SCRAPE QUEUE TABLE
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

-- Indexes for scrape_queue
CREATE INDEX idx_scrape_queue_status ON scrape_queue(status, created_at) WHERE status IN ('pending', 'processing');
CREATE INDEX idx_scrape_queue_completed ON scrape_queue(completed_at DESC) WHERE status = 'completed';


-- 9. CRITICAL MINERALS TABLE
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


-- 10. SHARE PRICE CACHE TABLE
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

-- Indexes for share_price_cache
CREATE INDEX idx_share_price_cache_cached_at ON share_price_cache(cached_at DESC);


-- 11. GOVERNMENT INCENTIVES TABLE
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


-- 12. COMPANY INCENTIVES JUNCTION TABLE
CREATE TABLE public.company_incentives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  incentive_id UUID NOT NULL REFERENCES government_incentives(id) ON DELETE CASCADE,
  amount_received_aud BIGINT, -- Specific amount company received
  received_date DATE,
  notes TEXT,

  CONSTRAINT unique_company_incentive UNIQUE (company_id, incentive_id)
);


-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE scrape_queue ENABLE ROW LEVEL SECURITY;


-- COMPANIES POLICIES
-- Anyone can view published companies
CREATE POLICY "Anyone can view published companies"
  ON companies FOR SELECT
  USING (is_published = true);

-- Company admins can view their own company
CREATE POLICY "Company admins can view own company"
  ON companies FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE company_id = companies.id AND role = 'company_admin'
    )
  );

-- Company admins can update their own company
CREATE POLICY "Company admins can update own company"
  ON companies FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE company_id = companies.id AND role = 'company_admin'
    )
  );


-- USERS POLICIES
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);


-- EVENTS POLICIES
-- Anyone can view published events
CREATE POLICY "Anyone can view published events"
  ON events FOR SELECT
  USING (is_published = true);

-- Company admins can view their company's events
CREATE POLICY "Company admins can view own events"
  ON events FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE company_id = events.company_id AND role = 'company_admin'
    )
  );

-- Company admins can create events for their company
CREATE POLICY "Company admins can create events"
  ON events FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM users WHERE company_id = events.company_id AND role = 'company_admin'
    )
  );

-- Company admins can update their company's events
CREATE POLICY "Company admins can update own events"
  ON events FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE company_id = events.company_id AND role = 'company_admin'
    )
  );


-- DOCUMENTS POLICIES
-- Anyone can view public documents
CREATE POLICY "Anyone can view public documents"
  ON documents FOR SELECT
  USING (is_public = true);

-- Company admins can view their company's documents
CREATE POLICY "Company admins can view own documents"
  ON documents FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE company_id = documents.company_id AND role = 'company_admin'
    )
  );


-- WATCHLIST POLICIES
-- Users can view their own watchlist
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


-- NOTIFICATIONS POLICIES
-- Users can view their own notifications
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);


-- SCRAPE QUEUE POLICIES (internal table - no public access)
CREATE POLICY "No public access to scrape queue"
  ON scrape_queue FOR ALL
  USING (false);


-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();
