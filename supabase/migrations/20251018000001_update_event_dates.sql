-- Update event dates to October-December 2025 (current period)

-- Pilbara Minerals events
UPDATE events
SET event_date = '2025-10-31'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'PLS')
  AND event_type = 'quarterly_report';

UPDATE events
SET event_date = '2025-11-15'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'PLS')
  AND event_type = 'production_update';

-- Lynas Rare Earths events
UPDATE events
SET event_date = '2025-10-25'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'LYC')
  AND event_type = 'drilling_results';

UPDATE events
SET event_date = '2025-11-20'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'LYC')
  AND event_type = 'production_update';

-- IGO Limited events
UPDATE events
SET event_date = '2025-10-28'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'IGO')
  AND event_type = 'production_update';

UPDATE events
SET event_date = '2025-12-10'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'IGO')
  AND event_type = 'feasibility_study';

-- Core Lithium events
UPDATE events
SET event_date = '2025-11-12'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'CXO')
  AND event_type = 'jorc_resource';

UPDATE events
SET event_date = '2025-12-15'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'CXO')
  AND event_type = 'agm_egm';

-- Syrah Resources events
UPDATE events
SET event_date = '2025-11-18'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'SYR')
  AND event_type = 'production_update';

-- Chalice Mining events
UPDATE events
SET event_date = '2025-12-05'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'CHN')
  AND event_type = 'feasibility_study';

UPDATE events
SET event_date = '2025-11-08'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'CHN')
  AND event_type = 'assay_results';

-- Liontown Resources events
UPDATE events
SET event_date = '2025-10-20'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'LTR')
  AND event_type = 'production_update';

UPDATE events
SET event_date = '2025-12-01'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'LTR')
  AND event_type = 'permits_approvals';

-- Australian Vanadium events
UPDATE events
SET event_date = '2025-11-25'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'AVL')
  AND event_type = 'capital_raise';

-- Arafura Rare Earths events
UPDATE events
SET event_date = '2025-11-01'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'ARU')
  AND title LIKE '%Construction%';

UPDATE events
SET event_date = '2025-10-25'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'ARU')
  AND title LIKE '%Funding%';

-- Jervois Global events
UPDATE events
SET event_date = '2025-11-10'
WHERE company_id = (SELECT id FROM companies WHERE asx_code = 'JRV')
  AND event_type = 'production_update';

-- Add some additional events for better calendar coverage
INSERT INTO events (
  company_id, title, description, event_type, event_date, event_time,
  date_is_confirmed, project_name, importance_score, is_published, published_at, source
) VALUES
-- More October events
(
  (SELECT id FROM companies WHERE asx_code = 'PLS'),
  'Pilgangoora Exploration Update',
  'Update on exploration activities at Pilgangoora tenements.',
  'exploration_update',
  '2025-10-22',
  NULL,
  true,
  'Pilgangoora Project',
  0.65,
  true,
  NOW(),
  'company_portal'
),
(
  (SELECT id FROM companies WHERE asx_code = 'IGO'),
  'Greenbushes Lithium Production Report',
  'Update on production from Greenbushes joint venture.',
  'production_update',
  '2025-10-18',
  '09:00:00',
  true,
  'Greenbushes',
  0.82,
  true,
  NOW(),
  'company_portal'
),
(
  (SELECT id FROM companies WHERE asx_code = 'LYC'),
  'Rare Earths Market Update Presentation',
  'Corporate presentation on rare earths market dynamics and Lynas positioning.',
  'other',
  '2025-10-24',
  '14:00:00',
  true,
  NULL,
  0.55,
  true,
  NOW(),
  'company_portal'
),
-- More November events
(
  (SELECT id FROM companies WHERE asx_code = 'CHN'),
  'Gonneville Resource Extension Drilling',
  'Commencement of resource extension drilling program at Gonneville.',
  'exploration_update',
  '2025-11-14',
  NULL,
  true,
  'Gonneville Project',
  0.70,
  true,
  NOW(),
  'company_portal'
),
(
  (SELECT id FROM companies WHERE asx_code = 'SYR'),
  'Balama Graphite Quarterly Report',
  'Production and sales update from Balama Graphite Operation.',
  'quarterly_report',
  '2025-11-28',
  NULL,
  true,
  'Balama Operation',
  0.68,
  true,
  NOW(),
  'company_portal'
),
(
  (SELECT id FROM companies WHERE asx_code = 'AVL'),
  'VSUN Energy Battery Technology Showcase',
  'Demonstration of VSUN vanadium flow battery technology.',
  'other',
  '2025-11-22',
  '10:00:00',
  true,
  'VSUN Energy',
  0.58,
  true,
  NOW(),
  'company_portal'
),
-- More December events
(
  (SELECT id FROM companies WHERE asx_code = 'LTR'),
  'Kathleen Valley December Production Update',
  'Monthly production update from Kathleen Valley operations.',
  'production_update',
  '2025-12-20',
  NULL,
  true,
  'Kathleen Valley',
  0.75,
  true,
  NOW(),
  'company_portal'
),
(
  (SELECT id FROM companies WHERE asx_code = 'ARU'),
  'Nolans Project Construction Progress Report',
  'Construction milestone update for Nolans NdPr Project.',
  'other',
  '2025-12-12',
  NULL,
  false,
  'Nolans Project',
  0.78,
  true,
  NOW(),
  'company_portal'
),
(
  (SELECT id FROM companies WHERE asx_code = 'CXO'),
  'Finniss December Drilling Campaign',
  'Results from December drilling campaign at BP33 deposit.',
  'drilling_results',
  '2025-12-18',
  NULL,
  false,
  'Finniss Project',
  0.72,
  true,
  NOW(),
  'company_portal'
);
