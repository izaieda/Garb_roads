
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_ROADS, MOCK_MAINTENANCE_RECORDS, MOCK_MAINTENANCE_TYPES } from '../constants';

const MaintenanceList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const roadIdParam = searchParams.get('roadId');
  
  const selectedRoad = MOCK_ROADS.find(r => r.id === Number(roadIdParam)) || MOCK_ROADS[0];
  const roadRecords = MOCK_MAINTENANCE_RECORDS.filter(rec => rec.roadId === selectedRoad.id);

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

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">بيانات صيانة الطرق</h2>
      </div>

      {/* Road Info Table */}
      <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-[#337ab7] text-white text-xs font-bold">
              <th className="p-2 border border-gray-400">اسم الطريق</th>
              <th className="p-2 border border-gray-400">اسم المنطقة</th>
              <th className="p-2 border border-gray-400">المحافظة</th>
              <th className="p-2 border border-gray-400">نوع الطريق</th>
              <th className="p-2 border border-gray-400">طبيعة الطريق</th>
              <th className="p-2 border border-gray-400">طول الطريق</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            <tr className="bg-gray-50">
              <td className="p-2 border border-gray-200 font-bold">{selectedRoad.name}</td>
              <td className="p-2 border border-gray-200">{selectedRoad.department}</td>
              <td className="p-2 border border-gray-200">{selectedRoad.governorate}</td>
              <td className="p-2 border border-gray-200">{selectedRoad.type}</td>
              <td className="p-2 border border-gray-200">{selectedRoad.nature}</td>
              <td className="p-2 border border-gray-200 font-bold text-lg">{selectedRoad.length}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Historical Maintenance Logs */}
      <div>
        <h3 className="text-lg font-bold text-gray-700 mb-4 border-r-4 border-emerald-500 pr-3">سجل الصيانة</h3>
        <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm">
          <table className="w-full text-center border-collapse text-[10px]">
            <thead>
              <tr className="bg-[#337ab7] text-white font-bold whitespace-nowrap">
                <th className="p-1 border border-gray-400">م</th>
                <th className="p-1 border border-gray-400">السنة المالية</th>
                <th className="p-1 border border-gray-400">الطول(كم)</th>
                <th className="p-1 border border-gray-400">نوع الصيانة</th>
                <th className="p-1 border border-gray-400">الشركة</th>
                <th className="p-1 border border-gray-400">حالة المشروع</th>
                <th className="p-1 border border-gray-400">تكلفة الكلية</th>
                <th className="p-1 border border-gray-400">الأعمال المنفذة</th>
                <th className="p-1 border border-gray-400">نسبة التنفيذ</th>
                <th className="p-1 border border-gray-400">بداية الكم</th>
                <th className="p-1 border border-gray-400">نهاية الكم</th>
                <th className="p-1 border border-gray-400">تاريخ البدء</th>
                <th className="p-1 border border-gray-400">نوع التمويل</th>
                <th className="p-1 border border-gray-400">رقم العقد</th>
                <th className="p-1 border border-gray-400">اجراء</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {roadRecords.length > 0 ? roadRecords.map((rec, i) => (
                <tr key={rec.id} className="hover:bg-gray-50 even:bg-gray-50/50">
                  <td className="p-1 border border-gray-200">{i + 1}</td>
                  <td className="p-1 border border-gray-200">{rec.financialYear || rec.year}</td>
                  <td className="p-1 border border-gray-200 font-bold">{rec.length}</td>
                  <td className="p-1 border border-gray-200">{rec.type}</td>
                  <td className="p-1 border border-gray-200">{rec.company}</td>
                  <td className="p-1 border border-gray-200">
                    <span className={`px-1 py-0.5 rounded text-[8px] ${rec.status === 'تم التختيم' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="p-1 border border-gray-200 font-bold">{rec.cost.toLocaleString()}</td>
                  <td className="p-1 border border-gray-200">{rec.executedWorksAmount?.toLocaleString() || '-'}</td>
                  <td className="p-1 border border-gray-200 text-emerald-600 font-bold">
                    {rec.executionPercentage !== undefined ? `${rec.executionPercentage}%` : (rec.executedWorksAmount && rec.cost ? `${((rec.executedWorksAmount / rec.cost) * 100).toFixed(1)}%` : '-')}
                  </td>
                  <td className="p-1 border border-gray-200">{rec.projectStartKm || '-'}</td>
                  <td className="p-1 border border-gray-200">{rec.projectEndKm || '-'}</td>
                  <td className="p-1 border border-gray-200">{rec.startDate || '-'}</td>
                  <td className="p-1 border border-gray-200">{rec.fundingType}</td>
                  <td className="p-1 border border-gray-200">{rec.contractNumber}</td>
                  <td className="p-1 border border-gray-200">
                    <button className="text-emerald-600 hover:scale-110 transition-transform"><i className="fa fa-edit"></i></button>
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
      <div className="bg-white p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-700 mb-6 border-r-4 border-[#337ab7] pr-3">إضافة سجل جديد</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            
            {/* Section 1: Coordinates */}
            <div className="space-y-4 bg-gray-50 p-4 border border-gray-100 rounded">
               <h4 className="font-bold text-xs text-blue-800 mb-2 border-b pb-2">إحداثيات قطاع الصيانة</h4>
               
               <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                  <label className="md:col-span-4 text-[11px] font-bold text-gray-600">بداية قطاع الصيانة E <span className="text-red-500">*</span></label>
                  <div className="md:col-span-8">
                    <input type="text" className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs" placeholder="مثال: 287.2" />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                  <label className="md:col-span-4 text-[11px] font-bold text-gray-600">بداية قطاع الصيانة N <span className="text-red-500">*</span></label>
                  <div className="md:col-span-8">
                    <input type="text" className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs" placeholder="مثال: 287.2" />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                  <label className="md:col-span-4 text-[11px] font-bold text-gray-600">نهاية قطاع الصيانة E <span className="text-red-500">*</span></label>
                  <div className="md:col-span-8">
                    <input type="text" className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs" placeholder="مثال: 287.2" />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                  <label className="md:col-span-4 text-[11px] font-bold text-gray-600">نهاية قطاع الصيانة N <span className="text-red-500">*</span></label>
                  <div className="md:col-span-8">
                    <input type="text" className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs" placeholder="مثال: 287.2" />
                  </div>
               </div>
            </div>

            {/* Section 2: Project Kilometers & Basic Info */}
            <div className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                  <label className="md:col-span-4 text-[11px] font-bold text-gray-600">بداية قطاع المشروع الكم <span className="text-red-500">*</span></label>
                  <div className="md:col-span-8">
                    <input type="number" step="0.001" className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs" />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                  <label className="md:col-span-4 text-[11px] font-bold text-gray-600">نهاية قطاع المشروع الكم <span className="text-red-500">*</span></label>
                  <div className="md:col-span-8">
                    <input type="number" step="0.001" className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs" />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                  <label className="md:col-span-4 text-[11px] font-bold text-gray-600">اسم الشركة</label>
                  <div className="md:col-span-8 flex gap-1">
                    <div className="relative flex-1">
                      <input type="text" list="companies" className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs" placeholder="ابحث عن شركة..." />
                      <datalist id="companies">
                        <option value="شركة النيل للطرق الصحراوية" />
                        <option value="شركة مصرية لمستلزمات الطرق" />
                        <option value="النيل العامة للانشاء والطرق" />
                        <option value="السلام انترناشونال للمقاولات" />
                      </datalist>
                    </div>
                    <button type="button" className="bg-emerald-500 text-white w-8 flex items-center justify-center hover:bg-emerald-600 transition-colors" title="اضافة شركة جديدة">
                      <i className="fa fa-plus text-xs"></i>
                    </button>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                  <label className="md:col-span-4 text-[11px] font-bold text-gray-600">حالة المشروع</label>
                  <div className="md:col-span-8">
                    <select className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs">
                      {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt || "اختار الحالة"}</option>)}
                    </select>
                  </div>
               </div>
            </div>

            {/* Section 3: Dates & Performance */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <label className="md:col-span-4 text-[11px] font-bold text-gray-600">تاريخ البدء</label>
                <div className="md:col-span-8">
                  <input type="date" className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <label className="md:col-span-4 text-[11px] font-bold text-gray-600">تاريخ النهو المعتمد</label>
                <div className="md:col-span-8">
                  <input type="date" className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <label className="md:col-span-4 text-[11px] font-bold text-gray-600 text-blue-700">اجمالي الاعمال المنفذة (قيمة)</label>
                <div className="md:col-span-8">
                  <input 
                    type="number" 
                    onChange={(e) => setExecutedAmount(Number(e.target.value))}
                    className="w-full border border-blue-200 px-3 py-1.5 outline-none text-xs focus:border-blue-500" 
                    placeholder="قيمة عددية (Int)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <label className="md:col-span-4 text-[11px] font-bold text-emerald-700 font-bold underline">نسبة التنفيذ %</label>
                <div className="md:col-span-8">
                  <div className="w-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-emerald-800 text-xs font-bold rounded">
                    {calculatedPercentage}%
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Contract & Financial */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <label className="md:col-span-4 text-[11px] font-bold text-gray-600">نوع التمويل</label>
                <div className="md:col-span-8">
                  <select className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs">
                    <option value="استثمار">استثمار</option>
                    <option value="صيانة">صيانة</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <label className="md:col-span-4 text-[11px] font-bold text-gray-600">رقم العقد</label>
                <div className="md:col-span-8">
                  <input type="number" className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <label className="md:col-span-4 text-[11px] font-bold text-gray-600">السنة المالية</label>
                <div className="md:col-span-8">
                  <input type="text" className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs" placeholder="مثال: 2023/2024" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <label className="md:col-span-4 text-[11px] font-bold text-gray-600">التكلفة الإجمالية</label>
                <div className="md:col-span-8">
                  <input 
                    type="number" 
                    onChange={(e) => setTotalCost(Number(e.target.value))}
                    className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Full Width Footer Section */}
          <div className="space-y-4 border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <label className="md:col-span-2 text-[11px] font-bold text-gray-600">نوع الصيانة <span className="text-red-500">*</span></label>
              <div className="md:col-span-4">
                <select className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs">
                  {MOCK_MAINTENANCE_TYPES.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
              </div>
              <label className="md:col-span-2 text-[11px] font-bold text-gray-600 text-center">الطول (كم) <span className="text-red-500">*</span></label>
              <div className="md:col-span-4">
                <input type="number" step="0.001" required className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <label className="md:col-span-2 text-[11px] font-bold text-gray-600">ملاحظات <span className="text-red-500">*</span></label>
              <div className="md:col-span-10">
                <textarea rows={3} required className="w-full border border-gray-300 px-3 py-1.5 outline-none text-xs" />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button type="submit" className="bg-[#2a3f54] text-white px-16 py-2.5 hover:bg-slate-700 transition-colors shadow-md font-bold text-sm">
                حفظ بيانات الصيانة
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceList;
