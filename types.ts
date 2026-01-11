
export interface Road {
  id: number;
  name: string;
  department: string;
  governorate: string;
  type: 'مزدوج' | 'مفرد';
  speed: 'سريع' | 'رئيس' | 'حر';
  nature: 'زراعى' | 'صحراوى' | 'ساحلى';
  start: string;
  startE: string;
  startN: string;
  end: string;
  endE: string;
  endN: string;
  mapLink: string;
  length: number;
  notes: string;
  kmzFile?: string;
}

export interface MaintenanceRecord {
  id: number;
  roadId: number;
  year: string;
  length: number;
  type: string;
  cost: number;
  company: string;
  sectorPdf?: string;
  stagesPdf?: string;
  notes: string;
}

export interface Governorate {
  id: number;
  name: string;
  areas: string[];
}

export interface MaintenanceType {
  id: number;
  name: string;
  addedAt: string;
  addedBy: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  department: string;
}
