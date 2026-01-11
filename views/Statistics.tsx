
import React from 'react';
import { DEPARTMENTS, MOCK_GOVERNORATES } from '../constants';

const Statistics: React.FC = () => {
  const StatsCard = ({ count, label, subLabel, icon, color }: { count: number, label: string, subLabel: string, icon: string, color: string }) => (
    <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm transition-transform hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-4">
        <div className={`text-4xl ${color}`}>
          <i className={`fa ${icon}`}></i>
        </div>
        <div className="bg-orange-500 text-white text-3xl font-bold px-3 py-1 rounded-sm min-w-[60px] text-center">
          {count}
        </div>
      </div>
      <div className="text-right">
        <div className="text-gray-400 text-sm font-semibold">{label}</div>
        <div className="text-gray-800 text-lg font-bold">{subLabel}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 border border-gray-200 shadow-sm">
        <form className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">اسم المنطقة</label>
            <select className="w-full border border-gray-300 p-2 text-sm outline-none">
              <option value="">ادارة الهيئة</option>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">المحافظة</label>
            <select className="w-full border border-gray-300 p-2 text-sm outline-none">
              <option value="">اختار المحافظة</option>
              {MOCK_GOVERNORATES.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
            </select>
          </div>
          <button type="submit" className="bg-[#34495e] text-white py-2 hover:bg-slate-800 transition-colors rounded-sm shadow-sm">
            بحث
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          count={136} 
          label="نوع الطريق" 
          subLabel="مزدوج" 
          icon="fa-star" 
          color="text-purple-600" 
        />
        <StatsCard 
          count={6556} 
          label="اجمالى الطريق" 
          subLabel="مزدوج" 
          icon="fa-archive" 
          color="text-blue-600" 
        />
        <StatsCard 
          count={109} 
          label="نوع الطريق" 
          subLabel="مفرد" 
          icon="fa-map" 
          color="text-emerald-500" 
        />
        <StatsCard 
          count={4325} 
          label="اجمالى الطريق" 
          subLabel="مفرد" 
          icon="fa-building" 
          color="text-emerald-500" 
        />
      </div>
      
      {/* Visual Placeholder for charts often found in statistics pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 border border-gray-200 h-80 flex items-center justify-center text-gray-300">
          <div className="text-center">
            <i className="fa fa-chart-pie text-6xl mb-4"></i>
            <p>تمثيل بياني لتوزيع الطرق حسب المحافظة</p>
          </div>
        </div>
        <div className="bg-white p-6 border border-gray-200 h-80 flex items-center justify-center text-gray-300">
          <div className="text-center">
            <i className="fa fa-chart-bar text-6xl mb-4"></i>
            <p>إحصائيات الصيانة السنوية</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
