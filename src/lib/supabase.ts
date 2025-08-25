import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Helper function to validate URL
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Only create client if we have valid environment variables
export const supabase = supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Service types for reports
export const SERVICE_TYPES = [
  'Administrative Services',
  'Financial Services',
  'Human Resources',
  'IT Services',
  'Legal Services',
  'Public Relations',
  'Procurement',
  'Security Services'
];

// Coordinators list
export const COORDINATORS = [
  'Suwarti, S.h',
  'Achamd Evianto',
  'Adi Sulaksono',
  'Yosi Yosandi'
];

// Sample to-do items
export const TODO_ITEMS = [
  'Review documentation',
  'Verify compliance',
  'Prepare summary report',
  'Conduct field inspection',
  'Update database records',
  'Schedule meetings',
  'Prepare presentations',
  'Coordinate with stakeholders',
  'Quality assurance check',
  'Final approval process'
];

// Document requirements by service type
export const DOCUMENT_REQUIREMENTS: Record<string, string[]> = {
  'Administrative Services': [
    'Administrative Form',
    'Authorization Letter',
    'Identity Verification'
  ],
  'Financial Services': [
    'Financial Statement',
    'Budget Authorization',
    'Audit Report',
    'Receipt Documentation'
  ],
  'Human Resources': [
    'Personnel File',
    'Training Certificate',
    'Performance Evaluation'
  ],
  'IT Services': [
    'Technical Specification',
    'Security Clearance',
    'System Documentation'
  ],
  'Legal Services': [
    'Legal Brief',
    'Contract Documentation',
    'Compliance Certificate'
  ],
  'Public Relations': [
    'Press Release',
    'Media Authorization',
    'Public Statement'
  ],
  'Procurement': [
    'Vendor Documentation',
    'Price Quotation',
    'Quality Certificate',
    'Delivery Schedule'
  ],
  'Security Services': [
    'Security Clearance',
    'Background Check',
    'Access Authorization'
  ]
};