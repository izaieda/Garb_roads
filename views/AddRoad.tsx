
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DEPARTMENTS, MOCK_GOVERNORATES, MOCK_ROADS } from '../constants';

const AddRoad: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم الحفظ بنجاح');
    navigate('/roads/all');
  };

  const FormField = ({ label, children, required = false, description }: { label: string, children?: React.ReactNode, required?: boolean, description?: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-4">
      <label className="md:col-span-3 text-sm font-bold text-gray-600 md:text-left">
        {label} {required && <span className="text-red-500">*</span>}
        {description && <div className="text-[10px] text-red-400 font-normal">{description}</div>}
      </label>
      <div className="md:col-span-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-r-4 border-emerald-500 pr-3">
          {isEdit ? 'تعديل بيانات الطريق' : 'اضافة بيانات الطريق'}
        </h2>
      </div>

      <div className="bg-white p-8 border border-gray-200 shadow-sm rounded-sm">
        <form onSubmit={handleSubmit}>
          {/* Header Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-8 pb-8 border-b border-gray-100">
            <FormField label="اسم المنطقة" required>
              <select className="w-full border border-gray-300 px-3 py-2 outline-none text-sm focus:ring-1 focus:ring-emerald-500">
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </FormField>

            <FormField label="المحافظة" required>
              <select className="w-full border border-gray-300 px-3 py-2 outline-none text-sm focus:ring-1 focus:ring-emerald-500">
                <option value="">اختار المحافظة</option>
                {MOCK_GOVERNORATES.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
              </select>
            </FormField>

            <FormField label="اسم الطريق" required>
              <input type="text" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm focus:ring-1 focus:ring-emerald-500" />
            </FormField>
          </div>

          {/* Section 1: KM Data & Speed */}
          <div className="bg-gray-50 p-6 rounded-md mb-8 border border-gray-100">
            <h3 className="text-xs font-bold text-blue-700 uppercase mb-6 tracking-widest border-b pb-2">بيانات قطاع المنطقة والسرعة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <FormField label="بداية قطاع المنطقة الكم" required>
                <input type="number" step="0.001" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" placeholder="رقم" />
              </FormField>

              <FormField label="نهاية قطاع المنطقة الكم" required>
                <input type="number" step="0.001" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" placeholder="رقم" />
              </FormField>

              <FormField label="garb_id">
                <input type="number" className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" placeholder="رقم" />
              </FormField>

              <FormField label="السرعة بالارقام كم">
                <input type="number" className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" placeholder="رقم" />
              </FormField>
            </div>
          </div>

          {/* Section 2: Pavement & Jurisdiction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-8">
            <FormField label="نوع الرصف">
              <select className="w-full border border-gray-300 px-3 py-2 outline-none text-sm">
                <option value="">اختار النوع</option>
                <option value="اسفلتي">اسفلتي</option>
                <option value="خرساني">خرساني</option>
                <option value="اسفلتي وخرساني">اسفلتي وخرساني</option>
              </select>
            </FormField>

            <FormField label="جهة الولاية">
              <input type="text" defaultValue="الهيئة العامة للطرق والكباري" className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" />
            </FormField>
          </div>

          {/* Section 3: Dimensions */}
          <div className="bg-emerald-50/30 p-6 rounded-md mb-8 border border-emerald-100/50">
            <h3 className="text-xs font-bold text-emerald-800 uppercase mb-6 tracking-widest border-b border-emerald-100 pb-2">أبعاد الطريق والجزيرة</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
              <FormField label="عرض الطريق">
                <input type="number" step="0.1" className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" placeholder="رقم" />
              </FormField>
              <FormField label="عرض الجزيرة">
                <input type="number" step="0.1" className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" placeholder="رقم" />
              </FormField>
              <FormField label="عرض side_walk">
                <input type="number" step="0.1" className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" placeholder="رقم" />
              </FormField>
            </div>
          </div>

          {/* Section 4: Lane Separation & Buffer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-8">
            <FormField label="فاصل الحركة">
              <select className="w-full border border-gray-300 px-3 py-2 outline-none text-sm">
                <option value="">اختار الفاصل</option>
                <option value="جزيرة">جزيرة</option>
                <option value="حواجز">حواجز</option>
                <option value="بدون">بدون</option>
              </select>
            </FormField>

            <FormField label="حد نزع الملكية Buffer">
              <input type="number" step="0.1" className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" placeholder="رقم" />
            </FormField>

            <FormField label="عدد الحارات">
              <input type="number" className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" placeholder="رقم" />
            </FormField>
          </div>

          {/* Road Properties */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <FormField label="نوع الطريق" required>
              <select className="w-full border border-gray-300 px-3 py-2 outline-none text-sm">
                <option value="مزدوج">مزدوج</option>
                <option value="مفرد">مفرد</option>
              </select>
            </FormField>
            <FormField label="تصنيف السرعة" required>
              <select className="w-full border border-gray-300 px-3 py-2 outline-none text-sm">
                <option value="سريع">سريع</option>
                <option value="رئيس">رئيس</option>
                <option value="حر">حر</option>
              </select>
            </FormField>
            <FormField label="طبيعة الطريق" required>
              <select className="w-full border border-gray-300 px-3 py-2 outline-none text-sm">
                <option value="زراعى">زراعى</option>
                <option value="صحراوى">صحراوى</option>
                <option value="ساحلى">ساحلى</option>
              </select>
            </FormField>
          </div>

          {/* Start/End Text & Coordinates */}
          <div className="space-y-4 mb-8">
            <FormField label="بداية الطريق" required>
              <input type="text" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="E بداية الطريق" description="الدرجات العشرية" required>
                <input type="text" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" />
              </FormField>
              <FormField label="N بداية الطريق" description="الدرجات العشرية" required>
                <input type="text" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" />
              </FormField>
            </div>

            <FormField label="نهاية الطريق" required>
              <input type="text" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="E نهاية الطريق" description="الدرجات العشرية" required>
                <input type="text" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" />
              </FormField>
              <FormField label="N نهاية الطريق" description="الدرجات العشرية" required>
                <input type="text" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" />
              </FormField>
            </div>
          </div>

          {/* Map Link & KMZ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-8">
            <FormField label="لينك جوجل ماب" required>
              <input type="text" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" />
            </FormField>

            <FormField label="ملف KMZ" required>
              <input type="file" className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" accept=".kmz" />
            </FormField>

            <FormField label="طول الطريق الكلي" required>
              <input type="number" step="0.01" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" />
            </FormField>
          </div>

          <FormField label="ملاحظات">
            <textarea rows={4} className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" />
          </FormField>

          <div className="border-t border-gray-100 pt-6 mt-10 flex justify-center">
            <button 
              type="submit" 
              className="bg-[#2a3f54] text-white px-20 py-3 hover:bg-slate-700 transition-colors shadow-lg font-bold rounded-sm text-base"
            >
              حفظ بيانات الطريق
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoad;
