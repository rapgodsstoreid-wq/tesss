export interface User {
  id: string;
  name: string;
  user_id: string;
  role: 'admin' | 'tu' | 'coordinator' | 'staff';
  created_at: string;
}

export interface Report {
  id: string;
  letter_number: string;
  subject: string;
  status: 'created' | 'forwarded' | 'in_verification' | 'in_progress' | 'completed' | 'revision';
  service_type: string;
  disposition_sheet: DispositionSheet;
  created_by_tu_id: string;
  created_by_tu?: User;
  created_at: string;
}

export interface DispositionSheet {
  nature: string[];
  degree: string[];
  agenda_no: string;
  originating_group: string;
  sestama_agenda: string;
  letter_no: string;
  subject: string;
  from: string;
  agenda_date: string;
  letter_date: string;
}

export interface Document {
  id: string;
  report_id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  uploaded_at: string;
}

export interface Assignment {
  id: string;
  report_id: string;
  coordinator_id: string;
  staff_id?: string;
  assigned_at: string;
  to_do_list: string[];
  progress_status: number;
  notes: string;
  is_completed: boolean;
  completed_at?: string;
  staff?: User;
  coordinator?: User;
  report?: Report;
}

export interface AuthUser {
  user: User | null;
  loading: boolean;
}