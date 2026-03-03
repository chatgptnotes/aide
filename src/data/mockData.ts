import type { Department, Patient, Bed, Staff, RevenueEntry, InventoryItem, AgentAction } from '../lib/supabase';

export const mockDepartments: Department[] = [
  { id: '1', name: 'Orthopedics', code: 'ORTHO', head_doctor: 'Dr. BK Murali', bed_count: 15, created_at: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'General Surgery', code: 'SURG', head_doctor: 'Dr. Rajesh Sharma', bed_count: 12, created_at: '2024-01-01T00:00:00Z' },
  { id: '3', name: 'Internal Medicine', code: 'MED', head_doctor: 'Dr. Priya Patel', bed_count: 10, created_at: '2024-01-01T00:00:00Z' },
  { id: '4', name: 'Pediatrics', code: 'PEDI', head_doctor: 'Dr. Anita Desai', bed_count: 8, created_at: '2024-01-01T00:00:00Z' },
  { id: '5', name: 'Gynecology', code: 'GYNO', head_doctor: 'Dr. Sunita Rao', bed_count: 8, created_at: '2024-01-01T00:00:00Z' },
  { id: '6', name: 'Cardiology', code: 'CARD', head_doctor: 'Dr. Vikram Singh', bed_count: 10, created_at: '2024-01-01T00:00:00Z' },
  { id: '7', name: 'Emergency', code: 'ER', head_doctor: 'Dr. Amit Kumar', bed_count: 8, created_at: '2024-01-01T00:00:00Z' },
  { id: '8', name: 'Pathology', code: 'PATH', head_doctor: 'Dr. Neha Gupta', bed_count: 4, created_at: '2024-01-01T00:00:00Z' },
];

export const mockPatients: Patient[] = [
  { id: '1', name: 'Ramesh Kumar', age: 45, gender: 'Male', phone: '+91 9876543210', department_id: '1', status: 'waiting', token_number: 101, admission_type: 'opd', created_at: '2024-03-03T09:30:00Z' },
  { id: '2', name: 'Sushila Devi', age: 38, gender: 'Female', phone: '+91 9876543211', department_id: '2', status: 'in_consultation', token_number: 102, admission_type: 'opd', created_at: '2024-03-03T09:45:00Z' },
  { id: '3', name: 'Prakash Yadav', age: 52, gender: 'Male', phone: '+91 9876543212', department_id: '1', status: 'done', token_number: 103, admission_type: 'opd', created_at: '2024-03-03T08:15:00Z' },
  { id: '4', name: 'Kavita Sharma', age: 29, gender: 'Female', phone: '+91 9876543213', department_id: '5', status: 'waiting', token_number: 104, admission_type: 'opd', created_at: '2024-03-03T10:00:00Z' },
  { id: '5', name: 'Rajesh Gupta', age: 67, gender: 'Male', phone: '+91 9876543214', department_id: '6', status: 'admitted', token_number: undefined, admission_type: 'ipd', created_at: '2024-03-01T14:20:00Z' },
  { id: '6', name: 'Anjali Singh', age: 34, gender: 'Female', phone: '+91 9876543215', department_id: '4', status: 'waiting', token_number: 105, admission_type: 'opd', created_at: '2024-03-03T10:15:00Z' },
  { id: '7', name: 'Mohan Lal', age: 58, gender: 'Male', phone: '+91 9876543216', department_id: '3', status: 'in_consultation', token_number: 106, admission_type: 'opd', created_at: '2024-03-03T10:30:00Z' },
  { id: '8', name: 'Geeta Devi', age: 41, gender: 'Female', phone: '+91 9876543217', department_id: '2', status: 'admitted', token_number: undefined, admission_type: 'ipd', created_at: '2024-03-02T16:45:00Z' },
];

export const mockBeds: Bed[] = [
  { id: '1', ward: 'General Male', bed_number: 'GM-01', status: 'occupied', patient_id: '5', department_id: '6', floor: 1, created_at: '2024-01-01T00:00:00Z' },
  { id: '2', ward: 'General Male', bed_number: 'GM-02', status: 'available', patient_id: undefined, department_id: undefined, floor: 1, created_at: '2024-01-01T00:00:00Z' },
  { id: '3', ward: 'General Female', bed_number: 'GF-01', status: 'occupied', patient_id: '8', department_id: '2', floor: 1, created_at: '2024-01-01T00:00:00Z' },
  { id: '4', ward: 'Private', bed_number: 'PV-01', status: 'available', patient_id: undefined, department_id: undefined, floor: 2, created_at: '2024-01-01T00:00:00Z' },
  { id: '5', ward: 'ICU', bed_number: 'ICU-01', status: 'occupied', patient_id: '5', department_id: '6', floor: 1, created_at: '2024-01-01T00:00:00Z' },
  { id: '6', ward: 'ICU', bed_number: 'ICU-02', status: 'maintenance', patient_id: undefined, department_id: undefined, floor: 1, created_at: '2024-01-01T00:00:00Z' },
  { id: '7', ward: 'NICU', bed_number: 'NICU-01', status: 'available', patient_id: undefined, department_id: undefined, floor: 2, created_at: '2024-01-01T00:00:00Z' },
  { id: '8', ward: 'Semi-Private', bed_number: 'SP-01', status: 'reserved', patient_id: undefined, department_id: '1', floor: 2, created_at: '2024-01-01T00:00:00Z' },
];

export const mockStaff: Staff[] = [
  { id: '1', name: 'Dr. BK Murali', role: 'Doctor', department_id: '1', shift: 'morning', status: 'on_duty', phone: '+91 9373111709', created_at: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'Dr. Rajesh Sharma', role: 'Doctor', department_id: '2', shift: 'morning', status: 'on_duty', phone: '+91 9876543201', created_at: '2024-01-01T00:00:00Z' },
  { id: '3', name: 'Sister Meera Joshi', role: 'Nurse', department_id: '1', shift: 'morning', status: 'on_duty', phone: '+91 9876543202', created_at: '2024-01-01T00:00:00Z' },
  { id: '4', name: 'Ravi Technician', role: 'Technician', department_id: '8', shift: 'morning', status: 'on_duty', phone: '+91 9876543203', created_at: '2024-01-01T00:00:00Z' },
  { id: '5', name: 'Dr. Priya Patel', role: 'Doctor', department_id: '3', shift: 'afternoon', status: 'off', phone: '+91 9876543204', created_at: '2024-01-01T00:00:00Z' },
  { id: '6', name: 'Sister Sunita Rao', role: 'Nurse', department_id: '5', shift: 'night', status: 'on_duty', phone: '+91 9876543205', created_at: '2024-01-01T00:00:00Z' },
];

export const mockRevenue: RevenueEntry[] = [
  { id: '1', patient_id: '1', department_id: '1', amount: 1500, payment_mode: 'cash', status: 'paid', description: 'OPD Consultation', entry_date: '2024-03-03', created_at: '2024-03-03T09:30:00Z' },
  { id: '2', patient_id: '2', department_id: '2', amount: 25000, payment_mode: 'card', status: 'paid', description: 'Surgery Charges', entry_date: '2024-03-03', created_at: '2024-03-03T09:45:00Z' },
  { id: '3', patient_id: '5', department_id: '6', amount: 45000, payment_mode: 'insurance', status: 'pending', description: 'ICU Charges', entry_date: '2024-03-03', created_at: '2024-03-03T10:00:00Z' },
  { id: '4', patient_id: '4', department_id: '5', amount: 2000, payment_mode: 'upi', status: 'paid', description: 'Gyno Consultation', entry_date: '2024-03-03', created_at: '2024-03-03T10:15:00Z' },
];

export const mockInventory: InventoryItem[] = [
  { id: '1', name: 'Paracetamol 500mg', category: 'Medicines', quantity: 250, reorder_level: 100, unit_price: 2.50, expiry_date: '2025-06-30', supplier: 'Cipla Ltd', created_at: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'Surgical Gloves', category: 'Consumables', quantity: 50, reorder_level: 200, unit_price: 125, expiry_date: '2026-12-31', supplier: 'Ansell Healthcare', created_at: '2024-01-01T00:00:00Z' },
  { id: '3', name: 'Hip Implant', category: 'Implants', quantity: 5, reorder_level: 3, unit_price: 85000, expiry_date: undefined, supplier: 'Stryker India', created_at: '2024-01-01T00:00:00Z' },
  { id: '4', name: 'X-Ray Films', category: 'Equipment', quantity: 15, reorder_level: 25, unit_price: 450, expiry_date: '2025-03-31', supplier: 'Kodak Healthcare', created_at: '2024-01-01T00:00:00Z' },
  { id: '5', name: 'Amoxicillin 250mg', category: 'Medicines', quantity: 8, reorder_level: 50, unit_price: 8.75, expiry_date: '2025-04-15', supplier: 'Sun Pharma', created_at: '2024-01-01T00:00:00Z' },
];

export const mockAgentActions: AgentAction[] = [
  { id: '1', agent_name: 'Flow Agent', action_type: 'optimization', description: 'Rerouted 3 patients to OPD-2 (wait time reduced by 12 min)', target_entity: 'opd_queue', status: 'completed', created_at: '2024-03-03T10:15:00Z' },
  { id: '2', agent_name: 'Resource Agent', action_type: 'maintenance', description: 'Flagged ICU Bed 7 for maintenance', target_entity: 'bed_icu_07', status: 'completed', created_at: '2024-03-03T10:20:00Z' },
  { id: '3', agent_name: 'Revenue Agent', action_type: 'billing', description: 'Auto-submitted 5 ESIC claims', target_entity: 'esic_claims', status: 'completed', created_at: '2024-03-03T10:25:00Z' },
  { id: '4', agent_name: 'Logistics Agent', action_type: 'inventory', description: 'Alerted 8 low-stock items, processed 23 lab requests', target_entity: 'inventory_system', status: 'completed', created_at: '2024-03-03T10:30:00Z' },
  { id: '5', agent_name: 'Flow Agent', action_type: 'communication', description: 'Need 2 additional beds in General Ward by 2 PM', target_entity: 'resource_agent', status: 'pending', created_at: '2024-03-03T10:35:00Z' },
  { id: '6', agent_name: 'Resource Agent', action_type: 'allocation', description: 'Optimized 3 bed transfers, flagged 2 maintenance needs', target_entity: 'bed_management', status: 'completed', created_at: '2024-03-03T10:40:00Z' },
];

export const hospitalStats = {
  totalPatientsToday: 127,
  opdToday: 89,
  ipdToday: 38,
  bedOccupancy: { occupied: 42, total: 75 },
  revenueToday: 423500,
  criticalAlerts: 3,
  staffOnDuty: { present: 47, total: 62 },
};

export const departmentLoad = {
  'OPD': 67,
  'ICU': 80,
  'General Ward': 45,
  'OT': 67, // 2/3 in use
  'Lab': 12, // pending tests
  'Pharmacy': 8, // pending orders
};

export const chartData = {
  patientFlow: [
    { time: '08:00', inflow: 5, outflow: 2 },
    { time: '09:00', inflow: 12, outflow: 3 },
    { time: '10:00', inflow: 18, outflow: 8 },
    { time: '11:00', inflow: 15, outflow: 12 },
    { time: '12:00', inflow: 8, outflow: 15 },
    { time: '13:00', inflow: 10, outflow: 10 },
    { time: '14:00', inflow: 14, outflow: 8 },
    { time: '15:00', inflow: 12, outflow: 11 },
    { time: '16:00', inflow: 9, outflow: 13 },
    { time: '17:00', inflow: 6, outflow: 14 },
  ],
  revenueBreakdown: [
    { name: 'OPD Fees', value: 125000, fill: '#0F4C75' },
    { name: 'IPD Charges', value: 180000, fill: '#3282B8' },
    { name: 'Surgery', value: 75000, fill: '#00B4D8' },
    { name: 'Lab', value: 25000, fill: '#16A34A' },
    { name: 'Pharmacy', value: 18500, fill: '#F59E0B' },
  ],
  monthlyRevenue: [
    { month: 'Jan', target: 4500000, actual: 4200000 },
    { month: 'Feb', target: 4500000, actual: 4350000 },
    { month: 'Mar', target: 4500000, actual: 3800000 },
  ],
};