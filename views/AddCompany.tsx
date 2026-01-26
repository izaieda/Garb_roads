
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_COMPANIES } from '../constants';

const AddCompany: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    // Logic for auto increment normally happens on backend
    const nextId = MOCK_COMPANIES.length > 0 ? Math.max(...MOCK_COMPANIES.map(c => c.id)) + 1 : 1;
    MOCK_COMPANIES.push({ id: nextId, name: name });
    
    alert('تم إضافة الشركة بنجاح');
    navigate('/companies/all');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-r-4 border-emerald-500 pr-3">إضافة شركة جديدة</h2>
      </div>

      <div className="bg-white p-10 border border-gray-200 shadow-sm rounded-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-600">
                اسم الشركة (company_name) <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                placeholder="أدخل اسم الشركة هنا..."
                className="w-full border border-gray-300 px-4 py-3 outline-none text-sm focus:ring-2 focus:ring-blue-500 transition-all" 
              />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 flex justify-center gap-4">
            <button 
              type="button" 
              onClick={() => navigate('/companies/all')}
              className="bg-gray-100 text-gray-600 px-10 py-3 hover:bg-gray-200 transition-colors font-bold rounded-sm text-sm"
            >
              الغاء
            </button>
            <button 
              type="submit" 
              className="bg-[#2a3f54] text-white px-16 py-3 hover:bg-slate-700 transition-colors shadow-md font-bold rounded-sm text-sm"
            >
              حفظ الشركة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;
