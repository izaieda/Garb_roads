
import { Road, Governorate, MaintenanceType, User, MaintenanceRecord } from './types';

export const DEPARTMENTS = [
  "ادارة الهيئة",
  "الهيئة",
  "الادارة المركزية",
  "المنطقة الاولي المركزية",
  "المنطقة الثانية الاسماعيلية",
  "المنطقة الثالثة شرق الدلتا",
  "المنطقة الرابعة وسط الدلتا",
  "المنطقة الخامسة غرب الدلتا",
  "المنطقة السادسة بني سويف",
  "المنطقة السابعة اسيوط",
  "المنطقة الثامنة قنا",
  "المنطقة التاسعة البحر الاحمر",
  "المنطقة العاشرة اسوان",
  "المنطقة الحادية عشر الطور",
  "المنطقة الثانية عشر الوادي الجديد",
  "المنطقة الثالثة عشر البحيرة",
  "المنطقة الرابعة عشر الدائري"
];

export const MOCK_GOVERNORATES: Governorate[] = [
  { id: 26, name: "المنيا", areas: ["مغاغة", "بنى مزار", "مركز العدوة", "مطاى", "سمالوط", "أبو قرقاص", "ملوى", "دير مواس", "مركز المنيا"] },
  { id: 6, name: "البحر الأحمر", areas: ["رأس غارب", "الغردقة", "القصير", "سفاجا", "مرسى علم", "شلاتين"] },
  { id: 24, name: "مرسى مطروح", areas: ["مركز الحمام", "العلمين", "الضبعة", "مرسى مطروح", "النجيلة", "برانى", "السلوم", "سيوة"] }
];

export const MOCK_MAINTENANCE_TYPES: MaintenanceType[] = [
  { id: 1, name: "جسيمة", addedAt: "0000-00-00", addedBy: "Admin Roads" },
  { id: 2, name: "متوسطة", addedAt: "2025-05-12", addedBy: "Admin Roads" },
  { id: 3, name: "توسعة", addedAt: "2025-05-21", addedBy: "مهندسة / هبة" },
  { id: 4, name: "رفع كفاءة", addedAt: "2025-05-21", addedBy: "مهندسة / هبة" }
];

export const MOCK_ROADS: Road[] = [
  {
    id: 100,
    name: "الزعفرانة / رأس غارب",
    department: "المنطقة التاسعة البحر الاحمر",
    governorate: "البحر الأحمر",
    type: "مزدوج",
    speed: "سريع",
    nature: "ساحلى",
    start: "مدينة الزعفرانة",
    startE: "32.6577180",
    startN: "29.1161900",
    end: "مدينة رأس غارب",
    endE: "33.0518560",
    endN: "28.3507880",
    mapLink: "https://www.google.com/maps",
    length: 102,
    notes: "",
    startAreaKm: 0,
    endAreaKm: 102,
    garbId: 1001,
    numericSpeed: 100,
    pavementType: 'اسفلتي',
    jurisdiction: 'الهيئة العامة للطرق والكباري',
    roadWidth: 24,
    medianWidth: 4,
    sidewalkWidth: 2,
    separatorType: 'جزيرة',
    bufferLimit: 50,
    lanesCount: 3
  },
  {
    id: 184,
    name: "طريق مطروح / سيوة",
    department: "المنطقة الخامسة غرب الدلتا",
    governorate: "مرسى مطروح",
    type: "مفرد",
    speed: "سريع",
    nature: "صحراوى",
    start: "مطروح",
    startE: "27.126331",
    startN: "31.256999",
    end: "سيوة",
    endE: "25.522044",
    endN: "29.210299",
    mapLink: "https://www.google.com/maps",
    length: 290,
    notes: "",
    startAreaKm: 0,
    endAreaKm: 290,
    garbId: 2005,
    numericSpeed: 90,
    pavementType: 'اسفلتي',
    jurisdiction: 'الهيئة العامة للطرق والكباري',
    roadWidth: 12,
    medianWidth: 0,
    sidewalkWidth: 1.5,
    separatorType: 'بدون',
    bufferLimit: 30,
    lanesCount: 2
  }
];

export const MOCK_MAINTENANCE_RECORDS: MaintenanceRecord[] = [
  {
    id: 1,
    roadId: 184,
    year: "2021",
    length: 45,
    type: "رفع كفاءة",
    cost: 108300000,
    company: "النيل العامة للانشاء والطرق",
    notes: "تم نهو المشروع",
    status: "تم التختيم",
    fundingType: "استثمار",
    financialYear: "2021/2022",
    executedWorksAmount: 108300000,
    executionPercentage: 100
  },
  {
    id: 2,
    roadId: 100,
    year: "2021",
    length: 41,
    type: "جسيمة",
    cost: 223316446,
    company: "السلام انترناشونال للمقاولات",
    notes: "اتجاه راس غارب",
    status: "جاري التنفيذ",
    fundingType: "صيانة",
    financialYear: "2021/2022",
    executedWorksAmount: 111658223,
    executionPercentage: 50
  }
];
