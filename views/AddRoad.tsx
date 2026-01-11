
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

  // Fix: Made children optional in the props type definition to satisfy TypeScript's strict attribute checking
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {isEdit ? 'تعديل بيانات الطريق' : 'اضافة بيانات الطريق'}
        </h2>
      </div>

      <div className="bg-white p-8 border border-gray-200 shadow-sm">
        <form onSubmit={handleSubmit}>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FormField label="نوع الطريق" required>
              <select className="w-full border border-gray-300 px-3 py-2 outline-none text-sm focus:ring-1 focus:ring-emerald-500">
                <option value="مزدوج">مزدوج</option>
                <option value="مفرد">مفرد</option>
              </select>
            </FormField>
            <FormField label="سرعة الطريق" required>
              <select className="w-full border border-gray-300 px-3 py-2 outline-none text-sm focus:ring-1 focus:ring-emerald-500">
                <option value="سريع">سريع</option>
                <option value="رئيس">رئيس</option>
                <option value="حر">حر</option>
              </select>
            </FormField>
            <FormField label="طبيعة الطريق" required>
              <select className="w-full border border-gray-300 px-3 py-2 outline-none text-sm focus:ring-1 focus:ring-emerald-500">
                <option value="زراعى">زراعى</option>
                <option value="صحراوى">صحراوى</option>
                <option value="ساحلى">ساحلى</option>
              </select>
            </FormField>
          </div>

          <FormField label="بداية الطريق" required>
            <input type="text" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm focus:ring-1 focus:ring-emerald-500" />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormField label="E بداية الطريق" description="الدرجات العشرية: مثل 287.2°" required>
              <input type="text" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm focus:ring-1 focus:ring-emerald-500" />
            </FormField>
            <FormField label="N بداية الطريق" description="الدرجات العشرية: مثل 257.2°" required>
              <input type="text" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm focus:ring-1 focus:ring-emerald-500" />
            </FormField>
          </div>

          <FormField label="نهاية الطريق" required>
            <input type="text" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm focus:ring-1 focus:ring-emerald-500" />
          </FormField>

          <FormField label="لينك جوجل ماب للطريق" required>
            <input type="text" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm focus:ring-1 focus:ring-emerald-500" />
          </FormField>

          <FormField label="رفع ملف KMZ" required>
            <input type="file" className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" accept=".kmz" />
          </FormField>

          <FormField label="طول الطريق" required>
            <input type="number" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm focus:ring-1 focus:ring-emerald-500" />
          </FormField>

          <FormField label="ملاحظات" required>
            <textarea rows={4} className="w-full border border-gray-300 px-3 py-2 outline-none text-sm focus:ring-1 focus:ring-emerald-500" />
          </FormField>

          <div className="border-t border-gray-100 pt-6 mt-6 flex justify-center">
            <button 
              type="submit" 
              className="bg-[#2a3f54] text-white px-12 py-2 hover:bg-slate-700 transition-colors shadow-sm font-bold"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoad;
