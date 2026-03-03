import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uowjirvabstysrjrzbhe.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvd2ppcnZhYnN0eXNyanJ6YmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NDc2MTcsImV4cCI6MjA4ODEyMzYxN30.feJ4mqDUai58Gv7Vj-pcznpP1BmrvP0_HhC0D7EqkaI';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export interface Department {
  id: string;
  name: string;
  code: string;
  head_doctor?: string;
  bed_count: number;
  created_at: string;
}

export interface Patient {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  phone?: string;
  department_id?: string;
  status: string;
  token_number?: number;
  admission_type: string;
  created_at: string;
}

export interface Bed {
  id: string;
  ward: string;
  bed_number: string;
  status: string;
  patient_id?: string;
  department_id?: string;
  floor: number;
  created_at: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  department_id?: string;
  shift: string;
  status: string;
  phone?: string;
  created_at: string;
}

export interface RevenueEntry {
  id: string;
  patient_id?: string;
  department_id?: string;
  amount: number;
  payment_mode: string;
  status: string;
  description?: string;
  entry_date: string;
  created_at: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  reorder_level: number;
  unit_price: number;
  expiry_date?: string;
  supplier?: string;
  created_at: string;
}

export interface AgentAction {
  id: string;
  agent_name: string;
  action_type: string;
  description: string;
  target_entity?: string;
  status: string;
  created_at: string;
}