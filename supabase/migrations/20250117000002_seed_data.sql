-- ============================================
-- SEED DATA: Critical Minerals Reference Data
-- ============================================

INSERT INTO critical_minerals (name, symbol, category, description, use_cases, is_government_priority, slug, meta_title, meta_description) VALUES
('Lithium', 'Li', 'battery', 'Key battery mineral for EVs and energy storage', ARRAY['EV batteries', 'Grid storage', 'Electronics'], true, 'lithium', 'Lithium Mining Companies | CapSight Analytics', 'Track ASX lithium mining companies and exploration updates'),
('Rare Earth Elements', 'REE', 'rare_earth', 'Critical for magnets, electronics, defense', ARRAY['Magnets', 'Catalysts', 'Defense'], true, 'rare-earth-elements', 'Rare Earth Mining Companies | CapSight Analytics', 'Monitor ASX rare earth mining announcements'),
('Nickel', 'Ni', 'battery', 'Battery cathodes and stainless steel', ARRAY['EV batteries', 'Stainless steel'], true, 'nickel', 'Nickel Mining Companies | CapSight Analytics', 'Follow ASX nickel exploration and production'),
('Copper', 'Cu', 'green_energy', 'Essential for electrification and renewables', ARRAY['Wiring', 'EVs', 'Renewables'], true, 'copper', 'Copper Mining Companies | CapSight Analytics', 'Track ASX copper mining developments'),
('Cobalt', 'Co', 'battery', 'Battery cathodes and aerospace alloys', ARRAY['EV batteries', 'Aerospace', 'Magnets'], true, 'cobalt', 'Cobalt Mining Companies | CapSight Analytics', 'Monitor ASX cobalt exploration projects'),
('Graphite', 'C', 'battery', 'Anode material for lithium-ion batteries', ARRAY['EV batteries', 'Steelmaking', 'Lubricants'], true, 'graphite', 'Graphite Mining Companies | CapSight Analytics', 'Follow ASX graphite mining updates'),
('Manganese', 'Mn', 'battery', 'Battery cathodes and steel alloys', ARRAY['EV batteries', 'Steel alloys'], true, 'manganese', 'Manganese Mining Companies | CapSight Analytics', 'Track ASX manganese exploration'),
('Vanadium', 'V', 'green_energy', 'Flow batteries and steel strengthening', ARRAY['Flow batteries', 'Steel alloys'], true, 'vanadium', 'Vanadium Mining Companies | CapSight Analytics', 'Monitor ASX vanadium mining projects'),
('Tungsten', 'W', 'strategic', 'High-temperature applications and defense', ARRAY['Defense', 'Electronics', 'Industrial'], true, 'tungsten', 'Tungsten Mining Companies | CapSight Analytics', 'Follow ASX tungsten exploration'),
('Gold', 'Au', 'other', 'Precious metal for investment and electronics', ARRAY['Investment', 'Electronics', 'Jewelry'], false, 'gold', 'Gold Mining Companies | CapSight Analytics', 'Track ASX gold mining announcements'),
('Iron Ore', 'Fe', 'other', 'Primary ingredient in steel production', ARRAY['Steelmaking', 'Construction'], false, 'iron-ore', 'Iron Ore Mining Companies | CapSight Analytics', 'Monitor ASX iron ore producers');


-- ============================================
-- SEED DATA: 10 Sample ASX Companies
-- ============================================

-- 1. Pilbara Minerals (PLS) - Lithium
INSERT INTO companies (
  asx_code, company_name, website, contact_email,
  description, primary_commodity, secondary_commodities,
  is_critical_minerals, critical_minerals_list,
  market_cap_aud, listing_date, shares_on_issue,
  subscription_status, is_published, published_at
) VALUES (
  'PLS', 'Pilbara Minerals Limited', 'https://www.pilbaraminerals.com.au', 'info@pilbaraminerals.com.au',
  'Leading ASX-listed lithium company, owning 100% of the world''s largest independent hard-rock lithium operation, Pilgangoora Project in Western Australia.',
  'Lithium', ARRAY['Tantalum'],
  true, ARRAY['Lithium'],
  850000000000, '2005-11-08', 3100000000,
  'active', true, NOW()
);

-- 2. Lynas Rare Earths (LYC) - Rare Earth Elements
INSERT INTO companies (
  asx_code, company_name, website, contact_email,
  description, primary_commodity, secondary_commodities,
  is_critical_minerals, critical_minerals_list,
  market_cap_aud, listing_date, shares_on_issue,
  subscription_status, is_published, published_at
) VALUES (
  'LYC', 'Lynas Rare Earths Limited', 'https://www.lynasrareearths.com', 'info@lynasrareearths.com',
  'World''s second largest producer of separated rare earths, mining and processing rare earths from the Mt Weld deposit in Western Australia.',
  'Rare Earth Elements', ARRAY[]::TEXT[],
  true, ARRAY['Rare Earth Elements'],
  650000000000, '1986-06-30', 950000000,
  'active', true, NOW()
);

-- 3. IGO Limited (IGO) - Nickel, Lithium
INSERT INTO companies (
  asx_code, company_name, website, contact_email,
  description, primary_commodity, secondary_commodities,
  is_critical_minerals, critical_minerals_list,
  market_cap_aud, listing_date, shares_on_issue,
  subscription_status, is_published, published_at
) VALUES (
  'IGO', 'IGO Limited', 'https://www.igo.com.au', 'contact@igo.com.au',
  'Diversified mining company with nickel, lithium and copper operations. Key assets include Nova nickel mine and 24.99% stake in Greenbushes lithium mine.',
  'Nickel', ARRAY['Lithium', 'Copper'],
  true, ARRAY['Nickel', 'Lithium', 'Copper'],
  520000000000, '2000-09-27', 760000000,
  'active', true, NOW()
);

-- 4. Core Lithium (CXO) - Lithium
INSERT INTO companies (
  asx_code, company_name, website, contact_email,
  description, primary_commodity, secondary_commodities,
  is_critical_minerals, critical_minerals_list,
  market_cap_aud, listing_date, shares_on_issue,
  subscription_status, is_published, published_at
) VALUES (
  'CXO', 'Core Lithium Limited', 'https://www.corelithium.com.au', 'info@corelithium.com.au',
  'Lithium producer operating the Finniss Lithium Project in the Northern Territory, Australia''s first lithium producer outside Western Australia.',
  'Lithium', ARRAY[]::TEXT[],
  true, ARRAY['Lithium'],
  85000000000, '2010-12-03', 1850000000,
  'active', true, NOW()
);

-- 5. Syrah Resources (SYR) - Graphite
INSERT INTO companies (
  asx_code, company_name, website, contact_email,
  description, primary_commodity, secondary_commodities,
  is_critical_minerals, critical_minerals_list,
  market_cap_aud, listing_date, shares_on_issue,
  subscription_status, is_published, published_at
) VALUES (
  'SYR', 'Syrah Resources Limited', 'https://www.syrahresources.com.au', 'info@syrahresources.com.au',
  'Industrial minerals and technology company. Owner of Balama Graphite Operation in Mozambique and Vidalia active anode material facility in USA.',
  'Graphite', ARRAY[]::TEXT[],
  true, ARRAY['Graphite'],
  120000000000, '2007-05-02', 550000000,
  'active', true, NOW()
);

-- 6. Chalice Mining (CHN) - Nickel, Copper, PGEs
INSERT INTO companies (
  asx_code, company_name, website, contact_email,
  description, primary_commodity, secondary_commodities,
  is_critical_minerals, critical_minerals_list,
  market_cap_aud, listing_date, shares_on_issue,
  subscription_status, is_published, published_at
) VALUES (
  'CHN', 'Chalice Mining Limited', 'https://www.chalicemining.com', 'info@chalicemining.com',
  'Exploration company focused on the Gonneville PGE-Ni-Cu-Co discovery in Western Australia, one of the world''s largest palladium discoveries.',
  'Nickel', ARRAY['Copper', 'Platinum Group Elements', 'Cobalt'],
  true, ARRAY['Nickel', 'Copper', 'Cobalt'],
  195000000000, '2005-11-10', 680000000,
  'active', true, NOW()
);

-- 7. Liontown Resources (LTR) - Lithium
INSERT INTO companies (
  asx_code, company_name, website, contact_email,
  description, primary_commodity, secondary_commodities,
  is_critical_minerals, critical_minerals_list,
  market_cap_aud, listing_date, shares_on_issue,
  subscription_status, is_published, published_at
) VALUES (
  'LTR', 'Liontown Resources Limited', 'https://www.ltresources.com.au', 'info@ltresources.com.au',
  'Lithium developer advancing the Kathleen Valley Lithium Project in Western Australia, targeting first production in 2024.',
  'Lithium', ARRAY[]::TEXT[],
  true, ARRAY['Lithium'],
  430000000000, '2006-12-21', 2400000000,
  'active', true, NOW()
);

-- 8. Australian Vanadium (AVL) - Vanadium
INSERT INTO companies (
  asx_code, company_name, website, contact_email,
  description, primary_commodity, secondary_commodities,
  is_critical_minerals, critical_minerals_list,
  market_cap_aud, listing_date, shares_on_issue,
  subscription_status, is_published, published_at
) VALUES (
  'AVL', 'Australian Vanadium Limited', 'https://www.australianvanadium.com.au', 'info@australianvanadium.com.au',
  'Vanadium producer developing the Australian Vanadium Project and VSUN Energy battery manufacturing business.',
  'Vanadium', ARRAY[]::TEXT[],
  true, ARRAY['Vanadium'],
  12500000000, '2007-03-26', 3200000000,
  'trial', true, NOW()
);

-- 9. Arafura Rare Earths (ARU) - Rare Earth Elements
INSERT INTO companies (
  asx_code, company_name, website, contact_email,
  description, primary_commodity, secondary_commodities,
  is_critical_minerals, critical_minerals_list,
  market_cap_aud, listing_date, shares_on_issue,
  subscription_status, is_published, published_at
) VALUES (
  'ARU', 'Arafura Rare Earths Limited', 'https://www.arultd.com', 'arafura@arultd.com',
  'Rare earths developer advancing the Nolans NdPr Project in Northern Territory, targeting production of neodymium and praseodymium.',
  'Rare Earth Elements', ARRAY[]::TEXT[],
  true, ARRAY['Rare Earth Elements'],
  95000000000, '2000-12-08', 1750000000,
  'active', true, NOW()
);

-- 10. Jervois Global (JRV) - Cobalt, Nickel
INSERT INTO companies (
  asx_code, company_name, website, contact_email,
  description, primary_commodity, secondary_commodities,
  is_critical_minerals, critical_minerals_list,
  market_cap_aud, listing_date, shares_on_issue,
  subscription_status, is_published, published_at
) VALUES (
  'JRV', 'Jervois Global Limited', 'https://www.jervoisglobal.com', 'info@jervoisglobal.com',
  'Global cobalt producer with operations in USA and Uganda. Developing nickel-cobalt projects and cobalt refining capabilities.',
  'Cobalt', ARRAY['Nickel', 'Copper'],
  true, ARRAY['Cobalt', 'Nickel', 'Copper'],
  45000000000, '2011-06-30', 2100000000,
  'trial', true, NOW()
);


-- ============================================
-- SEED DATA: Sample Events for Companies
-- ============================================

-- Pilbara Minerals (PLS) Events
INSERT INTO events (
  company_id, title, description, event_type, event_date, event_time,
  date_is_confirmed, project_name, importance_score, is_published, published_at, source
) VALUES
(
  (SELECT id FROM companies WHERE asx_code = 'PLS'),
  'Pilgangoora Quarterly Production Update - Q1 2025',
  'Quarterly production and sales update for the Pilgangoora Lithium-Tantalum Project.',
  'quarterly_report',
  '2025-01-31',
  '09:00:00',
  true,
  'Pilgangoora Project',
  0.85,
  true,
  NOW(),
  'company_portal'
),
(
  (SELECT id FROM companies WHERE asx_code = 'PLS'),
  'P1000 Expansion Project Update',
  'Construction progress update on the P1000 expansion to increase spodumene production capacity.',
  'production_update',
  '2025-02-15',
  NULL,
  true,
  'Pilgangoora Project',
  0.90,
  true,
  NOW(),
  'company_portal'
);

-- Lynas Rare Earths (LYC) Events
INSERT INTO events (
  company_id, title, description, event_type, event_date, event_time,
  date_is_confirmed, project_name, importance_score, is_published, published_at, source
) VALUES
(
  (SELECT id FROM companies WHERE asx_code = 'LYC'),
  'Mt Weld Drilling Results - Phase 3',
  'Assay results from recent resource extension drilling at Mt Weld rare earths deposit.',
  'drilling_results',
  '2025-02-05',
  '10:00:00',
  true,
  'Mt Weld',
  0.75,
  true,
  NOW(),
  'company_portal'
),
(
  (SELECT id FROM companies WHERE asx_code = 'LYC'),
  'Kalgoorlie Processing Plant Commissioning Update',
  'Progress on commissioning of the new Kalgoorlie Rare Earths Processing Facility.',
  'production_update',
  '2025-02-20',
  NULL,
  true,
  'Kalgoorlie Facility',
  0.88,
  true,
  NOW(),
  'company_portal'
);

-- IGO Limited (IGO) Events
INSERT INTO events (
  company_id, title, description, event_type, event_date, event_time,
  date_is_confirmed, project_name, importance_score, is_published, published_at, source
) VALUES
(
  (SELECT id FROM companies WHERE asx_code = 'IGO'),
  'Nova Mine Q1 2025 Production Results',
  'First quarter production and cost guidance for Nova nickel-copper operation.',
  'production_update',
  '2025-01-28',
  '08:30:00',
  true,
  'Nova Operation',
  0.80,
  true,
  NOW(),
  'company_portal'
),
(
  (SELECT id FROM companies WHERE asx_code = 'IGO'),
  'Cosmos Nickel Project Feasibility Study',
  'Release of updated feasibility study for Cosmos South nickel discovery.',
  'feasibility_study',
  '2025-03-10',
  NULL,
  false,
  'Cosmos Project',
  0.92,
  true,
  NOW(),
  'company_portal'
);

-- Core Lithium (CXO) Events
INSERT INTO events (
  company_id, title, description, event_type, event_date, event_time,
  date_is_confirmed, project_name, importance_score, is_published, published_at, source
) VALUES
(
  (SELECT id FROM companies WHERE asx_code = 'CXO'),
  'Finniss Lithium Project - Resource Update',
  'Updated JORC mineral resource estimate incorporating recent BP33 drilling results.',
  'jorc_resource',
  '2025-02-12',
  NULL,
  true,
  'Finniss Project',
  0.87,
  true,
  NOW(),
  'company_portal'
),
(
  (SELECT id FROM companies WHERE asx_code = 'CXO'),
  'Annual General Meeting 2025',
  'Annual shareholder meeting to discuss company performance and strategy.',
  'agm_egm',
  '2025-05-15',
  '10:00:00',
  true,
  NULL,
  0.45,
  true,
  NOW(),
  'company_portal'
);

-- Syrah Resources (SYR) Events
INSERT INTO events (
  company_id, title, description, event_type, event_date, event_time,
  date_is_confirmed, project_name, importance_score, is_published, published_at, source
) VALUES
(
  (SELECT id FROM companies WHERE asx_code = 'SYR'),
  'Vidalia AAM Production Ramp-Up Update',
  'Progress on ramping up Active Anode Material production at Vidalia facility.',
  'production_update',
  '2025-02-18',
  NULL,
  true,
  'Vidalia Facility',
  0.83,
  true,
  NOW(),
  'company_portal'
);

-- Chalice Mining (CHN) Events
INSERT INTO events (
  company_id, title, description, event_type, event_date, event_time,
  date_is_confirmed, project_name, importance_score, is_published, published_at, source
) VALUES
(
  (SELECT id FROM companies WHERE asx_code = 'CHN'),
  'Gonneville PFS Results Release',
  'Pre-Feasibility Study results for the Gonneville PGE-Ni-Cu-Co Project.',
  'feasibility_study',
  '2025-03-05',
  '09:00:00',
  true,
  'Gonneville Project',
  0.95,
  true,
  NOW(),
  'company_portal'
),
(
  (SELECT id FROM companies WHERE asx_code = 'CHN'),
  'Gonneville Step-Out Drilling Assays',
  'High-grade assay results from step-out drilling extending Gonneville mineralisation.',
  'assay_results',
  '2025-02-08',
  NULL,
  true,
  'Gonneville Project',
  0.78,
  true,
  NOW(),
  'company_portal'
);

-- Liontown Resources (LTR) Events
INSERT INTO events (
  company_id, title, description, event_type, event_date, event_time,
  date_is_confirmed, project_name, importance_score, is_published, published_at, source
) VALUES
(
  (SELECT id FROM companies WHERE asx_code = 'LTR'),
  'Kathleen Valley First Spodumene Production',
  'Announcement of first spodumene concentrate production from Kathleen Valley.',
  'production_update',
  '2025-01-20',
  '08:00:00',
  true,
  'Kathleen Valley',
  0.98,
  true,
  NOW(),
  'company_portal'
),
(
  (SELECT id FROM companies WHERE asx_code = 'LTR'),
  'Kathleen Valley Mining Permit Approval',
  'Approval of key environmental permits for expanded mining operations.',
  'permits_approvals',
  '2025-03-01',
  NULL,
  false,
  'Kathleen Valley',
  0.72,
  true,
  NOW(),
  'company_portal'
);

-- Australian Vanadium (AVL) Events
INSERT INTO events (
  company_id, title, description, event_type, event_date, event_time,
  date_is_confirmed, project_name, importance_score, is_published, published_at, source
) VALUES
(
  (SELECT id FROM companies WHERE asx_code = 'AVL'),
  'AVP Project Financing Update',
  'Update on project financing discussions with export credit agencies.',
  'capital_raise',
  '2025-02-25',
  NULL,
  false,
  'Australian Vanadium Project',
  0.81,
  true,
  NOW(),
  'company_portal'
);

-- Arafura Rare Earths (ARU) Events
INSERT INTO events (
  company_id, title, description, event_type, event_date, event_time,
  date_is_confirmed, project_name, importance_score, is_published, published_at, source
) VALUES
(
  (SELECT id FROM companies WHERE asx_code = 'ARU'),
  'Nolans Project Construction Commencement',
  'Formal commencement of construction activities at Nolans NdPr Project.',
  'other',
  '2025-02-01',
  '11:00:00',
  true,
  'Nolans Project',
  0.94,
  true,
  NOW(),
  'company_portal'
),
(
  (SELECT id FROM companies WHERE asx_code = 'ARU'),
  'Nolans Federal Government Funding Announcement',
  'Government announces co-funding package for Nolans rare earths project.',
  'other',
  '2025-01-25',
  NULL,
  true,
  'Nolans Project',
  0.96,
  true,
  NOW(),
  'company_portal'
);

-- Jervois Global (JRV) Events
INSERT INTO events (
  company_id, title, description, event_type, event_date, event_time,
  date_is_confirmed, project_name, importance_score, is_published, published_at, source
) VALUES
(
  (SELECT id FROM companies WHERE asx_code = 'JRV'),
  'Idaho Cobalt Operations Update',
  'Operational update and production guidance for Idaho Cobalt Operations.',
  'production_update',
  '2025-02-10',
  NULL,
  true,
  'Idaho Cobalt Operations',
  0.68,
  true,
  NOW(),
  'company_portal'
);


-- ============================================
-- SEED DATA: Government Incentives
-- ============================================

INSERT INTO government_incentives (
  program_name, description, amount_aud, announcement_date, announcement_url,
  applies_to_critical_minerals, applies_to_commodities
) VALUES
(
  'Critical Minerals Accelerator Initiative',
  'Federal government initiative to accelerate development of critical minerals projects in Australia.',
  200000000000, -- $2 billion in cents
  '2024-05-15',
  'https://www.industry.gov.au/news/critical-minerals-accelerator-initiative',
  true,
  ARRAY['Lithium', 'Rare Earth Elements', 'Cobalt', 'Nickel', 'Graphite', 'Vanadium']
),
(
  'Northern Australia Infrastructure Facility - Mining',
  'NAIF concessional loans for infrastructure supporting mining developments in Northern Australia.',
  500000000000, -- $5 billion in cents
  '2024-03-20',
  'https://www.naif.gov.au',
  true,
  ARRAY['Lithium', 'Rare Earth Elements', 'Copper', 'Nickel']
),
(
  'Modern Manufacturing Initiative - Resources Technology',
  'Co-funding for advanced manufacturing and processing technology in resources sector.',
  130000000000, -- $1.3 billion in cents
  '2024-08-10',
  'https://www.industry.gov.au/funding-and-incentives/modern-manufacturing-initiative',
  true,
  ARRAY['Lithium', 'Rare Earth Elements', 'Nickel', 'Cobalt', 'Graphite']
);


-- Link incentives to specific companies
INSERT INTO company_incentives (company_id, incentive_id, amount_received_aud, received_date, notes) VALUES
(
  (SELECT id FROM companies WHERE asx_code = 'ARU'),
  (SELECT id FROM government_incentives WHERE program_name = 'Critical Minerals Accelerator Initiative'),
  14000000000, -- $140M
  '2024-06-01',
  'Federal government co-investment in Nolans NdPr Project development'
),
(
  (SELECT id FROM companies WHERE asx_code = 'CXO'),
  (SELECT id FROM government_incentives WHERE program_name = 'Northern Australia Infrastructure Facility - Mining'),
  5500000000, -- $55M
  '2024-07-15',
  'NAIF loan for Finniss Project infrastructure development'
);


-- ============================================
-- SEED DATA: Sample Recommendation Scores
-- ============================================

INSERT INTO recommendation_scores (
  company_id, total_score,
  event_frequency_score, insider_buying_score, price_momentum_score,
  critical_minerals_score, resource_growth_score,
  reasoning, confidence_score, calculated_at
) VALUES
(
  (SELECT id FROM companies WHERE asx_code = 'LTR'),
  87.5,
  85.0, 75.0, 90.0, 95.0, 85.0,
  '{"factors": ["High-quality lithium asset", "Near-term production", "Strong management team", "Government priority mineral"], "highlights": ["First production Q1 2025", "World-class resource grade", "Tier-1 jurisdiction"]}'::jsonb,
  82.0,
  NOW()
),
(
  (SELECT id FROM companies WHERE asx_code = 'ARU'),
  83.0,
  70.0, 65.0, 88.0, 100.0, 75.0,
  '{"factors": ["Government co-funding secured", "Critical minerals focus", "Construction commenced"], "highlights": ["$140M government funding", "NdPr production by 2026", "Fills supply gap"]}'::jsonb,
  78.0,
  NOW()
),
(
  (SELECT id FROM companies WHERE asx_code = 'CHN'),
  79.5,
  90.0, 70.0, 75.0, 85.0, 80.0,
  '{"factors": ["Major new discovery", "Multi-commodity upside", "Resource expansion ongoing"], "highlights": ["Gonneville world-class PGE-Ni-Cu-Co", "PFS due Q1 2025", "Strong exploration success"]}'::jsonb,
  75.0,
  NOW()
);
