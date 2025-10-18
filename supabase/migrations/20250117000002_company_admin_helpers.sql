-- Migration: Company Admin Helper Functions
-- Created: 2025-01-17
-- Purpose: Functions to help manage company admin accounts

-- ============================================
-- FUNCTION: Create Company Admin Account
-- ============================================
-- This function creates a company admin user and links them to a company
-- Usage: SELECT create_company_admin('admin@company.com', 'Company Admin', 'ABC');

CREATE OR REPLACE FUNCTION create_company_admin(
  admin_email TEXT,
  admin_name TEXT,
  company_asx_code TEXT
)
RETURNS JSONB AS $$
DECLARE
  company_record RECORD;
  user_id UUID;
  result JSONB;
BEGIN
  -- Find the company
  SELECT id, company_name INTO company_record
  FROM public.companies
  WHERE asx_code = company_asx_code;

  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Company not found with ASX code: ' || company_asx_code
    );
  END IF;

  -- Check if user already exists
  SELECT id INTO user_id
  FROM public.users
  WHERE email = admin_email;

  IF FOUND THEN
    -- Update existing user to be company admin
    UPDATE public.users
    SET
      role = 'company_admin',
      company_id = company_record.id,
      full_name = admin_name,
      updated_at = NOW()
    WHERE id = user_id;

    RETURN jsonb_build_object(
      'success', true,
      'message', 'Existing user updated to company admin',
      'user_id', user_id,
      'company_id', company_record.id,
      'company_name', company_record.company_name
    );
  ELSE
    RETURN jsonb_build_object(
      'success', false,
      'error', 'User must sign up first before being assigned as company admin'
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ============================================
-- FUNCTION: Get Company Admin Dashboard Data
-- ============================================
-- This function returns all relevant data for a company admin's dashboard
-- Usage: SELECT * FROM get_company_admin_dashboard();

CREATE OR REPLACE FUNCTION get_company_admin_dashboard()
RETURNS JSONB AS $$
DECLARE
  current_user_record RECORD;
  result JSONB;
BEGIN
  -- Get current user's company
  SELECT u.company_id, u.role, c.company_name, c.asx_code
  INTO current_user_record
  FROM public.users u
  LEFT JOIN public.companies c ON u.company_id = c.id
  WHERE u.id = auth.uid();

  -- Check if user is a company admin
  IF current_user_record.role != 'company_admin' OR current_user_record.company_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'User is not a company admin'
    );
  END IF;

  -- Build dashboard data
  SELECT jsonb_build_object(
    'success', true,
    'company', jsonb_build_object(
      'id', c.id,
      'asx_code', c.asx_code,
      'company_name', c.company_name,
      'logo_url', c.logo_url,
      'is_published', c.is_published
    ),
    'stats', jsonb_build_object(
      'total_events', (
        SELECT COUNT(*) FROM events WHERE company_id = current_user_record.company_id
      ),
      'published_events', (
        SELECT COUNT(*) FROM events
        WHERE company_id = current_user_record.company_id AND is_published = true
      ),
      'draft_events', (
        SELECT COUNT(*) FROM events
        WHERE company_id = current_user_record.company_id AND is_published = false
      ),
      'events_this_month', (
        SELECT COUNT(*) FROM events
        WHERE company_id = current_user_record.company_id
        AND event_date >= date_trunc('month', CURRENT_DATE)
        AND event_date < date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'
      ),
      'total_documents', (
        SELECT COUNT(*) FROM documents WHERE company_id = current_user_record.company_id
      )
    ),
    'upcoming_events', (
      SELECT COALESCE(jsonb_agg(
        jsonb_build_object(
          'id', e.id,
          'title', e.title,
          'event_date', e.event_date,
          'event_type', e.event_type,
          'is_published', e.is_published
        ) ORDER BY e.event_date
      ), '[]'::jsonb)
      FROM events e
      WHERE e.company_id = current_user_record.company_id
      AND e.event_date >= CURRENT_DATE
      LIMIT 5
    )
  ) INTO result
  FROM companies c
  WHERE c.id = current_user_record.company_id;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ============================================
-- POLICY: Platform admins can manage everything
-- ============================================
-- Allow platform admins to view all companies, events, etc.

CREATE POLICY "Platform admins can view all companies"
  ON companies FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'platform_admin'
    )
  );

CREATE POLICY "Platform admins can view all events"
  ON events FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'platform_admin'
    )
  );

CREATE POLICY "Platform admins can view all documents"
  ON documents FOR SELECT
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'platform_admin'
    )
  );
