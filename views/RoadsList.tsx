
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_ROADS, DEPARTMENTS, MOCK_GOVERNORATES } from '../constants';
import { Road } from '../types';

declare const L: any; // Declare Leaflet global

const RoadDetailsModal: React.FC<{ road: Road, onClose: () => void }> = ({ road, onClose }) => {
  const DetailRow = ({ label, value, fullWidth = false }: { label: string, value: any, fullWidth?: boolean }) => (
    <div className={`${fullWidth ? 'col-span-full' : 'col-span-1'} flex flex-col border-b border-gray-100 pb-2`}>
      <span className="text-[10px] text-gray-400 font-bold mb-1">{label}</span>
      <span className="text-sm text-gray-800 font-medium">{value ?? '-'}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-[#2A3F54] text-white">
          <div className="flex items-center gap-3">
            <i className="fa fa-info-circle text-emerald-400 text-xl"></i>
            <h3 className="font-bold text-lg tracking-wide">تفاصيل بيانات الطريق: {road.name}</h3>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform duration-200 text-2xl font-bold">&times;</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Section: Basic & Admin */}
          <section>
            <h4 className="text-xs font-bold text-blue-700 mb-4 border-r-4 border-blue-600 pr-2 uppercase">البيانات الإدارية</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DetailRow label="اسم الطريق" value={road.name} />
              <DetailRow label="المنطقة" value={road.department} />
              <DetailRow label="المحافظة" value={road.governorate} />
              <DetailRow label="garb_id" value={road.garbId} />
              <DetailRow label="جهة الولاية" value={road.jurisdiction || 'الهيئة العامة للطرق والكباري'} />
              <DetailRow label="طول الطريق (كم)" value={<span className="text-emerald-600 font-bold">{road.length}</span>} />
            </div>
          </section>

          {/* Section: Infrastructure */}
          <section className="bg-gray-50 p-4 rounded-sm border border-gray-100">
            <h4 className="text-xs font-bold text-blue-700 mb-4 border-r-4 border-blue-600 pr-2 uppercase">بيانات البنية التحتية</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <DetailRow label="نوع الطريق" value={road.type} />
              <DetailRow label="تصنيف السرعة" value={road.speed} />
              <DetailRow label="السرعة المقررة" value={road.numericSpeed ? `${road.numericSpeed} كم/س` : '-'} />
              <DetailRow label="طبيعة الطريق" value={road.nature} />
              <DetailRow label="نوع الرصف" value={road.pavementType} />
              <DetailRow label="فاصل الحركة" value={road.separatorType} />
              <DetailRow label="عدد الحارات" value={road.lanesCount} />
              <DetailRow label="بداية المنطقة (كم)" value={road.startAreaKm} />
              <DetailRow label="نهاية المنطقة (كم)" value={road.endAreaKm} />
            </div>
          </section>

          {/* Section: Dimensions */}
          <section>
            <h4 className="text-xs font-bold text-blue-700 mb-4 border-r-4 border-blue-600 pr-2 uppercase">الأبعاد والمقاييس</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <DetailRow label="عرض الطريق (م)" value={road.roadWidth} />
              <DetailRow label="عرض الجزيرة (م)" value={road.medianWidth} />
              <DetailRow label="عرض الرصيف (م)" value={road.sidewalkWidth} />
              <DetailRow label="حد الملكية (Buffer)" value={road.bufferLimit} />
            </div>
          </section>

          {/* Section: Location */}
          <section className="bg-emerald-50/30 p-4 rounded-sm border border-emerald-100/50">
            <h4 className="text-xs font-bold text-emerald-800 mb-4 border-r-4 border-emerald-600 pr-2 uppercase">الموقع الجغرافي</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-3">
                <DetailRow label="نقطة البداية" value={road.start} />
                <div className="grid grid-cols-2 gap-4">
                  <DetailRow label="E (بداية)" value={road.startE} />
                  <DetailRow label="N (بداية)" value={road.startN} />
                </div>
              </div>
              <div className="space-y-3">
                <DetailRow label="نقطة النهاية" value={road.end} />
                <div className="grid grid-cols-2 gap-4">
                  <DetailRow label="E (نهاية)" value={road.endE} />
                  <DetailRow label="N (نهاية)" value={road.endN} />
                </div>
              </div>
              <DetailRow label="رابط جوجل ماب" fullWidth value={<a href={road.mapLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-2"><i className="fa fa-external-link-alt text-xs"></i> عرض على الخريطة الخارجية</a>} />
            </div>
          </section>

          {/* Section: Notes */}
          <section>
             <DetailRow label="ملاحظات اضافية" fullWidth value={road.notes || 'لا توجد ملاحظات'} />
          </section>
        </div>
        
        <div className="p-4 bg-gray-50 border-t flex justify-end">
          <button 
            onClick={onClose}
            className="bg-[#2A3F54] text-white px-8 py-2 text-sm font-bold hover:bg-slate-700 transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

const MapModal: React.FC<{ road: Road, onClose: () => void }> = ({ road, onClose }) => {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const timeout = setTimeout(() => {
      const startLat = parseFloat(road.startN);
      const startLng = parseFloat(road.startE);
      const endLat = parseFloat(road.endN);
      const endLng = parseFloat(road.endE);

      mapRef.current = L.map('map').setView([startLat, startLng], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);

      L.marker([startLat, startLng]).addTo(mapRef.current)
        .bindPopup(`<b>بداية الطريق:</b> ${road.start}`)
        .openPopup();

      L.marker([endLat, endLng]).addTo(mapRef.current)
        .bindPopup(`<b>نهاية الطريق:</b> ${road.end}`);

      if (!isNaN(startLat) && !isNaN(endLat)) {
        const polyline = L.polyline([
          [startLat, startLng],
          [endLat, endLng]
        ], { color: 'blue' }).addTo(mapRef.current);
        
        mapRef.current.fitBounds(polyline.getBounds(), { padding: [50, 50] });
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [road]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl overflow-hidden flex flex-col h-[80vh]">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-[#337ab7] text-white">
          <h3 className="font-bold text-lg">موقع الطريق: {road.name}</h3>
          <button onClick={onClose} className="hover:text-gray-200 text-2xl font-bold">&times;</button>
        </div>
        <div id="map" ref={containerRef} className="flex-1 bg-gray-100"></div>
        <div className="p-4 bg-gray-50 text-xs text-gray-500 border-t flex justify-between">
          <div>البداية: {road.startN}, {road.startE}</div>
          <div>النهاية: {road.endN}, {road.endE}</div>
        </div>
      </div>
    </div>
  );
};

const RoadsList: React.FC = () => {
  const [roads, setRoads] = useState<Road[]>(MOCK_ROADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoadForMap, setSelectedRoadForMap] = useState<Road | null>(null);
  const [selectedRoadForDetails, setSelectedRoadForDetails] = useState<Road | null>(null);

  const handleDelete = (id: number) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا الطريق؟')) {
      setRoads(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">عرض كل الطرق</h2>
        <Link to="/roads/add" className="bg-[#337ab7] text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors">
          اضافة طريق
        </Link>
      </div>

      <div className="bg-white p-4 border border-gray-200 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">اسم الطريق</label>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 p-1 text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">اسم المنطقة</label>
            <select className="w-full border border-gray-300 p-1 text-sm outline-none">
              <option value="">ادارة الهيئة</option>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">المحافظة</label>
            <select className="w-full border border-gray-300 p-1 text-sm outline-none">
              <option value="">اختار المحافظة</option>
              {MOCK_GOVERNORATES.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
            </select>
          </div>
          <button className="bg-gray-100 border border-gray-300 px-6 py-1 hover:bg-gray-200 text-sm transition-colors">
            بحث
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white border border-gray-200 shadow-sm">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-[#337ab7] text-white text-[10px] font-bold">
              <th className="p-2 border border-gray-400">م</th>
              <th className="p-2 border border-gray-400">اسم الطريق</th>
              <th className="p-2 border border-gray-400">اسم المنطقة</th>
              <th className="p-2 border border-gray-400">المحافظة</th>
              <th className="p-2 border border-gray-400">نوع الطريق</th>
              <th className="p-2 border border-gray-400">طول الطريق</th>
              <th className="p-2 border border-gray-400">بداية الكم</th>
              <th className="p-2 border border-gray-400">نهاية الكم</th>
              <th className="p-2 border border-gray-400">garb_id</th>
              <th className="p-2 border border-gray-400">السرعة</th>
              <th className="p-2 border border-gray-400">الرصف</th>
              <th className="p-2 border border-gray-400">عرض الطريق</th>
              <th className="p-2 border border-gray-400">الحارات</th>
              <th className="p-2 border border-gray-400">خريطة</th>
              <th className="p-2 border border-gray-400">اجراء</th>
            </tr>
          </thead>
          <tbody className="text-[10px] text-gray-700">
            {roads.map((road, index) => (
              <tr key={road.id} className="hover:bg-gray-50 even:bg-gray-50">
                <td className="p-2 border border-gray-200">{index + 1}</td>
                <td className="p-2 border border-gray-200 font-bold whitespace-nowrap">{road.name}</td>
                <td className="p-2 border border-gray-200 whitespace-nowrap">{road.department}</td>
                <td className="p-2 border border-gray-200">{road.governorate}</td>
                <td className="p-2 border border-gray-200">{road.type}</td>
                <td className="p-2 border border-gray-200 font-bold">{road.length}</td>
                <td className="p-2 border border-gray-200">{road.startAreaKm ?? '-'}</td>
                <td className="p-2 border border-gray-200">{road.endAreaKm ?? '-'}</td>
                <td className="p-2 border border-gray-200">{road.garbId ?? '-'}</td>
                <td className="p-2 border border-gray-200">{road.numericSpeed ?? '-'}</td>
                <td className="p-2 border border-gray-200">{road.pavementType ?? '-'}</td>
                <td className="p-2 border border-gray-200">{road.roadWidth ?? '-'}</td>
                <td className="p-2 border border-gray-200">{road.lanesCount ?? '-'}</td>
                <td className="p-2 border border-gray-200">
                  <button 
                    onClick={() => setSelectedRoadForMap(road)}
                    className="bg-emerald-500 text-white p-1 rounded hover:bg-emerald-600 transition-colors shadow-sm"
                    title="عرض الموقع على الخريطة"
                  >
                    <i className="fa fa-map-marked-alt"></i>
                  </button>
                </td>
                <td className="p-2 border border-gray-200">
                  <div className="flex gap-2 justify-center">
                    <button 
                      onClick={() => setSelectedRoadForDetails(road)}
                      className="text-blue-500 hover:text-blue-700 transition-colors" 
                      title="عرض التفاصيل الكاملة"
                    >
                      <i className="fa fa-eye"></i>
                    </button>
                    <div className="w-px h-4 bg-gray-200 self-center"></div>
                    <Link to={`/roads/edit/${road.id}`} className="text-amber-600 hover:text-amber-800" title="تعديل">
                      <i className="fa fa-edit"></i>
                    </Link>
                    <div className="w-px h-4 bg-gray-200 self-center"></div>
                    <button 
                      onClick={() => handleDelete(road.id)}
                      className="text-red-500 hover:text-red-700" 
                      title="حذف"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <nav className="flex items-center gap-1">
          <button className="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 text-sm">السابق</button>
          <button className="px-3 py-1 border border-[#337ab7] bg-[#337ab7] text-white text-sm">1</button>
          <button className="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-100 text-sm">2</button>
          <button className="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-100 text-sm">3</button>
          <button className="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-100 text-sm">التالي</button>
        </nav>
      </div>

      {selectedRoadForMap && (
        <MapModal 
          road={selectedRoadForMap} 
          onClose={() => setSelectedRoadForMap(null)} 
        />
      )}

      {selectedRoadForDetails && (
        <RoadDetailsModal 
          road={selectedRoadForDetails} 
          onClose={() => setSelectedRoadForDetails(null)} 
        />
      )}
    </div>
  );
};

export default RoadsList;
