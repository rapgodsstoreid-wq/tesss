/*
  # Initial Database Schema for Workflow Tracking System

  1. New Tables
    - `users` - Store user accounts with roles
    - `reports` - Store report data and status
    - `documents` - Store file references for reports
    - `assignments` - Track report assignments and tasks

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control

  3. Sample Data
    - Insert demo users for each role
    - Create sample reports and assignments
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  user_id text UNIQUE NOT NULL,
  password_hash text NOT NULL DEFAULT 'demo_password_hash',
  role text NOT NULL CHECK (role IN ('admin', 'tu', 'coordinator', 'staff')),
  created_at timestamptz DEFAULT now()
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  letter_number text UNIQUE NOT NULL,
  subject text NOT NULL,
  status text NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'forwarded', 'in_verification', 'in_progress', 'completed', 'revision')),
  service_type text NOT NULL,
  disposition_sheet jsonb DEFAULT '{}',
  created_by_tu_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES reports(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL,
  uploaded_at timestamptz DEFAULT now()
);

-- Create assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES reports(id) ON DELETE CASCADE,
  coordinator_id uuid REFERENCES users(id),
  staff_id uuid REFERENCES users(id),
  assigned_at timestamptz DEFAULT now(),
  to_do_list jsonb DEFAULT '[]',
  progress_status integer DEFAULT 0 CHECK (progress_status >= 0 AND progress_status <= 100),
  notes text DEFAULT '',
  is_completed boolean DEFAULT false,
  completed_at timestamptz
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  USING (true); -- For demo, allow all users to read user data

CREATE POLICY "Admins can manage users"
  ON users
  FOR ALL
  USING (true); -- For demo, simplified access

-- Reports policies
CREATE POLICY "Users can access relevant reports"
  ON reports
  FOR ALL
  USING (true); -- For demo, simplified access

-- Documents policies
CREATE POLICY "Users can access documents for accessible reports"
  ON documents
  FOR ALL
  USING (true); -- For demo, simplified access

-- Assignments policies
CREATE POLICY "Users can access relevant assignments"
  ON assignments
  FOR ALL
  USING (true); -- For demo, simplified access

-- Insert sample users
INSERT INTO users (name, user_id, password_hash, role) VALUES
  ('Administrator', 'admin001', 'demo_hash_admin', 'admin'),
  ('John Doe', 'tu001', 'demo_hash_tu', 'tu'),
  ('Suwarti, S.h', 'coord001', 'demo_hash_coord', 'coordinator'),
  ('Achamd Evianto', 'coord002', 'demo_hash_coord2', 'coordinator'),
  ('Adi Sulaksono', 'coord003', 'demo_hash_coord3', 'coordinator'),
  ('Yosi Yosandi', 'coord004', 'demo_hash_coord4', 'coordinator'),
  ('Maria Santos', 'staff001', 'demo_hash_staff1', 'staff'),
  ('David Kim', 'staff002', 'demo_hash_staff2', 'staff'),
  ('Sarah Johnson', 'staff003', 'demo_hash_staff3', 'staff'),
  ('Michael Chen', 'staff004', 'demo_hash_staff4', 'staff')
ON CONFLICT (user_id) DO NOTHING;

-- Insert sample reports
INSERT INTO reports (letter_number, subject, status, service_type, disposition_sheet, created_by_tu_id) 
SELECT 
  'RPT001',
  'Budget Approval Request',
  'in_progress',
  'Financial Services',
  '{"nature": ["Important"], "degree": ["Urgent"], "agenda_no": "AG001", "originating_group": "Finance Department", "sestama_agenda": "Budget Review", "from": "Finance Director", "agenda_date": "2024-01-15", "letter_date": "2024-01-14"}',
  u.id
FROM users u WHERE u.user_id = 'tu001'
ON CONFLICT (letter_number) DO NOTHING;

INSERT INTO reports (letter_number, subject, status, service_type, disposition_sheet, created_by_tu_id)
SELECT 
  'RPT002',
  'Staff Training Program',
  'completed',
  'Human Resources',
  '{"nature": ["Ordinary"], "degree": ["Ordinary"], "agenda_no": "AG002", "originating_group": "HR Department", "sestama_agenda": "Training Initiative", "from": "HR Manager", "agenda_date": "2024-01-10", "letter_date": "2024-01-09"}',
  u.id
FROM users u WHERE u.user_id = 'tu001'
ON CONFLICT (letter_number) DO NOTHING;

-- Insert sample assignments
INSERT INTO assignments (report_id, coordinator_id, staff_id, to_do_list, progress_status, notes, is_completed)
SELECT 
  r.id,
  c.id,
  s.id,
  '["Review documentation", "Verify compliance", "Prepare summary report"]',
  60,
  'Document verification completed, working on compliance check',
  false
FROM reports r
JOIN users c ON c.user_id = 'coord001'
JOIN users s ON s.user_id = 'staff001'
WHERE r.letter_number = 'RPT001';

INSERT INTO assignments (report_id, coordinator_id, staff_id, to_do_list, progress_status, notes, is_completed, completed_at)
SELECT 
  r.id,
  c.id,
  s.id,
  '["Conduct training assessment", "Prepare training materials", "Schedule sessions"]',
  100,
  'Training program successfully completed',
  true,
  now() - interval '2 days'
FROM reports r
JOIN users c ON c.user_id = 'coord002'
JOIN users s ON s.user_id = 'staff002'
WHERE r.letter_number = 'RPT002';