
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_ROADS, MOCK_MAINTENANCE_RECORDS, MOCK_MAINTENANCE_TYPES, MOCK_COMPANIES } from '../constants';
import { Company } from '../types';

const AddCompanyModal: React.FC<{ onSave: (name: string) => void, onClose: () => void }> = ({ onSave, onClose }) => {
  const [name, setName] = useState('');
  
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-sm shadow-2xl overflow-hidden border border-gray-200">
        <div className="p-3 sm:p-4 border-b border-gray-200 flex justify-between items-center bg-[#2a3f54] text-white">
          <h3 className="font-bold text-sm">إضافة شركة جديدة سريعة</h3>
          <button onClick={onClose} className="text-xl">&times;</button>
        </div>
        <div className="p-4 sm:p-6">
          <label className="block text-[10px] sm:text-xs font-bold text-gray-600 mb-2">اسم الشركة</label>
          <input 
            autoFocus
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm focus:ring-1 focus:ring-blue-500" 
            placeholder="أدخل الاسم..."
          />
        </div>
        <div className="p-3 sm:p-4 bg-gray-50 border-t flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100">إلغاء</button>
          <button 
            onClick={() => onSave(name)}
            disabled={!name.trim()}
            className="bg-emerald-600 text-white px-6 py-2 rounded-sm text-xs sm:text-sm font-bold hover:bg-emerald-700 disabled:opacity-50"
          >
            حفظ الشركة
          </button>
        </div>
      </div>
    </div>
  );
};

const MaintenanceList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const roadIdParam = searchParams.get('roadId');
  
  const selectedRoad = MOCK_ROADS.find(r => r.id === Number(roadIdParam)) || MOCK_ROADS[0];
  const roadRecords = MOCK_MAINTENANCE_RECORDS.filter(rec => rec.roadId === selectedRoad.id);

  // Companies state
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');

  // Form State for dynamic calculation
  const [totalCost, setTotalCost] = useState<number>(0);
  const [executedAmount, setExecutedAmount] = useState<number>(0);

  const calculatedPercentage = useMemo(() => {
    if (totalCost > 0) {
      return ((executedAmount / totalCost) * 100).toFixed(2);
    }
    return "0.00";
  }, [totalCost, executedAmount]);

  // Status options from image
  const STATUS_OPTIONS = ["تحت الدراسة", "جاري التعاقد", "تم التعاقد", "جاري التنفيذ", "تم التختيم", "استلام نهائي", ""];

  const handleQuickAddCompany = (name: string) => {
    const nextId = companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1;
    const newCompany = { id: nextId, name };
    setCompanies(prev => [...prev, newCompany]);
    setSelectedCompany(name);
    setShowAddCompanyModal(false);
  };

  return (
    <div className="space-y-6 sm:space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">بيانات صيانة الطرق</h2>
      </div>

      {/* Road Info Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm custom-scrollbar">
        <table className="w-full text-center border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-[#337ab7] text-white text-[10px] sm:text-xs font-bold">
              <th className="p-2 border border-gray-400">اسم الطريق</th>
              <th className="p-2 border border-gray-400">اسم المنطقة</th>
              <th className="p-2 border border-gray-400">المحافظة</th>
              <th className="p-2 border border-gray-400">نوع الطريق</th>
              <th className="p-2 border border-gray-400">طبيعة الطريق</th>
              <th className="p-2 border border-gray-400">طول الطريق</th>
            </tr>
          </thead>
          <tbody className="text-[10px] sm:text-xs">
            <tr className="bg-gray-50">
              <td className="p-2 border border-gray-200 font-bold">{selectedRoad.name}</td>
              <td className="p-2 border border-gray-200">{selectedRoad.department}</td>
              <td className="p-2 border border-gray-200">{selectedRoad.governorate}</td>
              <td className="p-2 border border-gray-200">{selectedRoad.type}</td>
              <td className="p-2 border border-gray-200">{selectedRoad.nature}</td>
              <td className="p-2 border border-gray-200 font-bold text-base sm:text-lg">{selectedRoad.length}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Historical Maintenance Logs */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-4 border-r-4 border-emerald-500 pr-3">سجل الصيانة</h3>
        <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm custom-scrollbar">
          <table className="w-full text-center border-collapse text-[10px] min-w-[1200px]">
            <thead>
              <tr className="bg-[#337ab7] text-white font-bold whitespace-nowrap">
                <th className="p-2 border border-gray-400">م</th>
                <th className="p-2 border border-gray-400">السنة المالية</th>
                <th className="p-2 border border-gray-400">الطول(كم)</th>
                <th className="p-2 border border-gray-400">نوع الصيانة</th>
                <th className="p-2 border border-gray-400">الشركة</th>
                <th className="p-2 border border-gray-400">حالة المشروع</th>
                <th className="p-2 border border-gray-400">تكلفة الكلية</th>
                <th className="p-2 border border-gray-400">الأعمال المنفذة</th>
                <th className="p-2 border border-gray-400">نسبة التنفيذ</th>
                <th className="p-2 border border-gray-400">بداية الكم</th>
                <th className="p-2 border border-gray-400">نهاية الكم</th>
                <th className="p-2 border border-gray-400">تاريخ البدء</th>
                <th className="p-2 border border-gray-400">نوع التمويل</th>
                <th className="p-2 border border-gray-400">رقم العقد</th>
                <th className="p-2 border border-gray-400">اجراء</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {roadRecords.length > 0 ? roadRecords.map((rec, i) => (
                <tr key={rec.id} className="hover:bg-gray-50 even:bg-gray-50/50">
                  <td className="p-2 border border-gray-200">{i + 1}</td>
                  <td className="p-2 border border-gray-200">{rec.financialYear || rec.year}</td>
                  <td className="p-2 border border-gray-200 font-bold">{rec.length}</td>
                  <td className="p-2 border border-gray-200">{rec.type}</td>
                  <td className="p-2 border border-gray-200 text-right pr-2">{rec.company}</td>
                  <td className="p-2 border border-gray-200">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${rec.status === 'تم التختيم' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="p-2 border border-gray-200 font-bold">{rec.cost.toLocaleString()}</td>
                  <td className="p-2 border border-gray-200">{rec.executedWorksAmount?.toLocaleString() || '-'}</td>
                  <td className="p-2 border border-gray-200 text-emerald-600 font-bold">
                    {rec.executionPercentage !== undefined ? `${rec.executionPercentage}%` : (rec.executedWorksAmount && rec.cost ? `${((rec.executedWorksAmount / rec.cost) * 100).toFixed(1)}%` : '-')}
                  </td>
                  <td className="p-2 border border-gray-200">{rec.projectStartKm || '-'}</td>
                  <td className="p-2 border border-gray-200">{rec.projectEndKm || '-'}</td>
                  <td className="p-2 border border-gray-200">{rec.startDate || '-'}</td>
                  <td className="p-2 border border-gray-200">{rec.fundingType}</td>
                  <td className="p-2 border border-gray-200">{rec.contractNumber}</td>
                  <td className="p-2 border border-gray-200">
                    <button className="text-emerald-600 hover:scale-125 transition-transform p-1"><i className="fa fa-edit"></i></button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={15} className="p-8 text-gray-400 text-sm">لا يوجد سجلات صيانة لهذا الطريق</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Maintenance Form */}
      <div className="bg-white p-4 sm:p-8 border border-gray-200 shadow-sm">
        <h3 className="text-base sm:text-lg font-bold text-gray-700 mb-6 border-r-4 border-[#337ab7] pr-3">إضافة سجل جديد</h3>
        <form className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
            
            {/* Section 1: Coordinates */}
            <div className="space-y-4 bg-gray-50 p-4 border border-gray-100 rounded-sm">
               <h4 className="font-bold text-[10px] sm:text-xs text-blue-800 mb-2 border-b pb-2 flex items-center gap-2">
                 <i className="fa fa-map-pin"></i> إحداثيات قطاع الصيانة
               </h4>
               
               <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                  <label className="sm:col-span-4 text-[10px] sm:text-[11px] font-bold text-gray-600">بداية قطاع الصيانة E <span className="text-red-500">*</span></label>
                  <div className="sm:col-span-8">
                    <input type="text" className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm focus:border-blue-500" placeholder="مثال: 287.2" />
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                  <label className="sm:col-span-4 text-[10px] sm:text-[11px] font-bold text-gray-600">بداية قطاع الصيانة N <span className="text-red-500">*</span></label>
                  <div className="sm:col-span-8">
                    <input type="text" className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm focus:border-blue-500" placeholder="مثال: 287.2" />
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                  <label className="sm:col-span-4 text-[10px] sm:text-[11px] font-bold text-gray-600">نهاية قطاع الصيانة E <span className="text-red-500">*</span></label>
                  <div className="sm:col-span-8">
                    <input type="text" className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm focus:border-blue-500" placeholder="مثال: 287.2" />
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                  <label className="sm:col-span-4 text-[10px] sm:text-[11px] font-bold text-gray-600">نهاية قطاع الصيانة N <span className="text-red-500">*</span></label>
                  <div className="sm:col-span-8">
                    <input type="text" className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm focus:border-blue-500" placeholder="مثال: 287.2" />
                  </div>
               </div>
            </div>

            {/* Section 2: Project Kilometers & Basic Info */}
            <div className="space-y-4">
               <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                  <label className="sm:col-span-4 text-[10px] sm:text-[11px] font-bold text-gray-600">بداية قطاع المشروع الكم <span className="text-red-500">*</span></label>
                  <div className="sm:col-span-8">
                    <input type="number" step="0.001" className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm" />
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                  <label className="sm:col-span-4 text-[10px] sm:text-[11px] font-bold text-gray-600">نهاية قطاع المشروع الكم <span className="text-red-500">*</span></label>
                  <div className="sm:col-span-8">
                    <input type="number" step="0.001" className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm" />
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                  <label className="sm:col-span-4 text-[10px] sm:text-[11px] font-bold text-gray-600">اسم الشركة</label>
                  <div className="sm:col-span-8 flex gap-1">
                    <div className="relative flex-1">
                      <select 
                        value={selectedCompany}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm bg-white"
                      >
                        <option value="">اختار الشركة...</option>
                        {companies.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setShowAddCompanyModal(true)}
                      className="bg-emerald-500 text-white w-10 flex items-center justify-center hover:bg-emerald-600 transition-colors rounded-sm shadow-sm" 
                      title="اضافة شركة جديدة"
                    >
                      <i className="fa fa-plus text-xs sm:text-sm"></i>
                    </button>
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                  <label className="sm:col-span-4 text-[10px] sm:text-[11px] font-bold text-gray-600">حالة المشروع</label>
                  <div className="sm:col-span-8">
                    <select className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm">
                      {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt || "اختار الحالة"}</option>)}
                    </select>
                  </div>
               </div>
            </div>

            {/* Section 3: Dates & Performance */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <label className="sm:col-span-4 text-[10px] sm:text-[11px] font-bold text-gray-600">تاريخ البدء</label>
                <div className="sm:col-span-8">
                  <input type="date" className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <label className="sm:col-span-4 text-[10px] sm:text-[11px] font-bold text-gray-600">تاريخ النهو المعتمد</label>
                <div className="sm:col-span-8">
                  <input type="date" className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <label className="sm:col-span-4 text-[10px] sm:text-[11px] font-bold text-blue-700">اجمالي الاعمال المنفذة (قيمة)</label>
                <div className="sm:col-span-8">
                  <input 
                    type="number" 
                    onChange={(e) => setExecutedAmount(Number(e.target.value))}
                    className="w-full border border-blue-200 px-3 py-2 outline-none text-xs sm:text-sm focus:border-blue-500" 
                    placeholder="قيمة عددية (Int)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <label className="sm:col-span-4 text-[10px] sm:text-[11px] font-bold text-emerald-700 underline">نسبة التنفيذ %</label>
                <div className="sm:col-span-8">
                  <div className="w-full bg-emerald-50 border border-emerald-200 px-3 py-2 text-emerald-800 text-xs sm:text-sm font-bold rounded-sm">
                    {calculatedPercentage}%
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Contract & Financial */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <label className="sm:col-span-4 text-[10px] sm:text-[11px] font-bold text-gray-600">نوع التمويل</label>
                <div className="sm:col-span-8">
                  <select className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm">
                    <option value="استثمار">استثمار</option>
                    <option value="صيانة">صيانة</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <label className="sm:col-span-4 text-[10px] sm:text-[11px] font-bold text-gray-600">رقم العقد</label>
                <div className="sm:col-span-8">
                  <input type="number" className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <label className="sm:col-span-4 text-[10px] sm:text-[11px] font-bold text-gray-600">السنة المالية</label>
                <div className="sm:col-span-8">
                  <input type="text" className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm" placeholder="مثال: 2023/2024" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                <label className="sm:col-span-4 text-[10px] sm:text-[11px] font-bold text-gray-600">التكلفة الإجمالية</label>
                <div className="sm:col-span-8">
                  <input 
                    type="number" 
                    onChange={(e) => setTotalCost(Number(e.target.value))}
                    className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Full Width Footer Section */}
          <div className="space-y-4 sm:space-y-6 border-t pt-6 sm:pt-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <label className="md:col-span-2 text-[10px] sm:text-[11px] font-bold text-gray-600">نوع الصيانة <span className="text-red-500">*</span></label>
              <div className="md:col-span-4">
                <select className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm focus:border-blue-500">
                  {MOCK_MAINTENANCE_TYPES.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
              </div>
              <label className="md:col-span-2 text-[10px] sm:text-[11px] font-bold text-gray-600 md:text-center">الطول (كم) <span className="text-red-500">*</span></label>
              <div className="md:col-span-4">
                <input type="number" step="0.001" required className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <label className="md:col-span-2 text-[10px] sm:text-[11px] font-bold text-gray-600">ملاحظات <span className="text-red-500">*</span></label>
              <div className="md:col-span-10">
                <textarea rows={3} required className="w-full border border-gray-300 px-3 py-2 outline-none text-xs sm:text-sm focus:border-blue-500" placeholder="اكتب الملاحظات الفنية هنا..." />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button type="submit" className="bg-[#2a3f54] text-white px-10 sm:px-20 py-3 hover:bg-slate-700 transition-colors shadow-lg font-bold text-sm sm:text-base rounded-sm">
                حفظ بيانات الصيانة
              </button>
            </div>
          </div>
        </form>
      </div>

      {showAddCompanyModal && (
        <AddCompanyModal 
          onSave={handleQuickAddCompany} 
          onClose={() => setShowAddCompanyModal(false)} 
        />
      )}
    </div>
  );
};

export default MaintenanceList;
