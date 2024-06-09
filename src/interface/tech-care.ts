export type Patients = Patient[];

export interface Patient {
  name: string;
  gender: string;
  age: number;
  profile_picture: string;
  date_of_birth: string;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  diagnosis_history: DiagnosisHistory[];
  diagnostic_list: DiagnosticList[];
  lab_results: string[];
}

export interface DiagnosisHistory {
  month: string;
  year: number;
  blood_pressure: BloodPressure;
  heart_rate: HeartRate;
  respiratory_rate: RespiratoryRate;
  temperature: Temperature;
}

export interface BloodPressure {
  systolic: Systolic;
  diastolic: Diastolic;
}

export interface Systolic {
  value: number;
  levels: string;
}

export interface Diastolic {
  value: number;
  levels: string;
}

export interface HeartRate {
  value: number;
  levels: string;
}

export interface RespiratoryRate {
  value: number;
  levels: string;
}

export interface Temperature {
  value: number;
  levels: string;
}

export interface DiagnosticList {
  name: string;
  description: string;
  status: string;
}

