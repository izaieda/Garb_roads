
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_ROADS, MOCK_MAINTENANCE_RECORDS, MOCK_MAINTENANCE_TYPES } from '../constants';

const MaintenanceList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const roadIdParam = searchParams.get('roadId');
  
  const selectedRoad = MOCK_ROADS.find(r => r.id === Number(roadIdParam)) || MOCK_ROADS[0];
  const roadRecords = MOCK_MAINTENANCE_RECORDS.filter(rec => rec.roadId === selectedRoad.id);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">اضافة بيانات الصيانة</h2>
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
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#337ab7] text-white text-xs font-bold">
                <th className="p-2 border border-gray-400">م</th>
                <th className="p-2 border border-gray-400">عام</th>
                <th className="p-2 border border-gray-400">الطول(كم)</th>
                <th className="p-2 border border-gray-400">نوع الصيانة</th>
                <th className="p-2 border border-gray-400">تكلفة</th>
                <th className="p-2 border border-gray-400">الشركة المنفذة</th>
                <th className="p-2 border border-gray-400">مراحل التنفيذ</th>
                <th className="p-2 border border-gray-400">ملاحظات</th>
                <th className="p-2 border border-gray-400">نوع الاجراء</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {roadRecords.length > 0 ? roadRecords.map((rec, i) => (
                <tr key={rec.id} className="hover:bg-gray-50">
                  <td className="p-2 border border-gray-200">{i + 1}</td>
                  <td className="p-2 border border-gray-200">{rec.year}</td>
                  <td className="p-2 border border-gray-200">{rec.length}</td>
                  <td className="p-2 border border-gray-200">{rec.type}</td>
                  <td className="p-2 border border-gray-200">{rec.cost.toLocaleString()}</td>
                  <td className="p-2 border border-gray-200">{rec.company}</td>
                  <td className="p-2 border border-gray-200">
                    <button className="text-blue-500" title="تحميل PDF"><i className="fa fa-cloud-download-alt"></i></button>
                  </td>
                  <td className="p-2 border border-gray-200">{rec.notes}</td>
                  <td className="p-2 border border-gray-200">
                    <button className="text-emerald-600 hover:scale-110 transition-transform"><i className="fa fa-edit"></i></button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={9} className="p-8 text-gray-400">لا يوجد سجلات صيانة لهذا الطريق</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Maintenance Form */}
      <div className="bg-white p-8 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-700 mb-6 border-r-4 border-[#337ab7] pr-3">إضافة سجل جديد</h3>
        <form className="space-y-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <label className="md:col-span-3 text-sm font-bold text-gray-600">عام <span className="text-red-500">*</span></label>
            <div className="md:col-span-6">
              <input type="text" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" placeholder="مثال: 2023" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <label className="md:col-span-3 text-sm font-bold text-gray-600">طول الطريق <span className="text-red-500">*</span></label>
            <div className="md:col-span-6">
              <input type="number" required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <label className="md:col-span-3 text-sm font-bold text-gray-600">نوع الصيانة <span className="text-red-500">*</span></label>
            <div className="md:col-span-6">
              <select className="w-full border border-gray-300 px-3 py-2 outline-none text-sm">
                {MOCK_MAINTENANCE_TYPES.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <label className="md:col-span-3 text-sm font-bold text-gray-600">تكلفة</label>
            <div className="md:col-span-6">
              <input type="number" className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <label className="md:col-span-3 text-sm font-bold text-gray-600">الشركة</label>
            <div className="md:col-span-6">
              <input type="text" className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <label className="md:col-span-3 text-sm font-bold text-gray-600">صورة القطاع العرض PDF</label>
            <div className="md:col-span-6">
              <input type="file" className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" accept=".pdf" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <label className="md:col-span-3 text-sm font-bold text-gray-600">ملاحظات <span className="text-red-500">*</span></label>
            <div className="md:col-span-9">
              <textarea rows={4} required className="w-full border border-gray-300 px-3 py-2 outline-none text-sm" />
            </div>
          </div>

          <div className="pt-6 flex justify-center">
            <button type="submit" className="bg-[#2a3f54] text-white px-12 py-2 hover:bg-slate-700 transition-colors shadow-sm font-bold">
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceList;
