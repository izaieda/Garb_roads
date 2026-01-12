
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
  // New infrastructure fields
  startAreaKm?: number;
  endAreaKm?: number;
  garbId?: number;
  numericSpeed?: number;
  pavementType?: 'اسفلتي' | 'خرساني' | 'اسفلتي وخرساني';
  jurisdiction?: string;
  roadWidth?: number;
  medianWidth?: number;
  sidewalkWidth?: number;
  separatorType?: 'جزيرة' | 'حواجز' | 'بدون';
  bufferLimit?: number;
  lanesCount?: number;
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
  sectorStartE?: string;
  sectorStartN?: string;
  sectorEndE?: string;
  sectorEndN?: string;
  projectStartKm?: number;
  projectEndKm?: number;
  status?: string;
  startDate?: string;
  approvedEndDate?: string;
  expectedEndDate?: string;
  executedWorksAmount?: number; // Changed from Date to Int as per new specification
  executionPercentage?: number; // (Executed / Total Cost) * 100
  fundingType?: string;
  contractNumber?: number;
  financialYear?: string;
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
