
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_ROADS, DEPARTMENTS, MOCK_GOVERNORATES } from '../constants';
import { Road } from '../types';

declare const L: any; // Declare Leaflet global

const MapModal: React.FC<{ road: Road, onClose: () => void }> = ({ road, onClose }) => {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Wait for the modal animation/render to stabilize
    const timeout = setTimeout(() => {
      const startLat = parseFloat(road.startN);
      const startLng = parseFloat(road.startE);
      const endLat = parseFloat(road.endN);
      const endLng = parseFloat(road.endE);

      // Initialize Map centered between points or at start
      mapRef.current = L.map('map').setView([startLat, startLng], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);

      // Add markers
      const startMarker = L.marker([startLat, startLng]).addTo(mapRef.current)
        .bindPopup(`<b>بداية الطريق:</b> ${road.start}`)
        .openPopup();

      const endMarker = L.marker([endLat, endLng]).addTo(mapRef.current)
        .bindPopup(`<b>نهاية الطريق:</b> ${road.end}`);

      // Draw a line between points if both exist
      if (!isNaN(startLat) && !isNaN(endLat)) {
        const polyline = L.polyline([
          [startLat, startLng],
          [endLat, endLng]
        ], { color: 'blue' }).addTo(mapRef.current);
        
        // Adjust map to fit both markers
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
            <tr className="bg-[#337ab7] text-white text-xs font-bold">
              <th className="p-2 border border-gray-400">م</th>
              <th className="p-2 border border-gray-400">اسم الطريق</th>
              <th className="p-2 border border-gray-400">اسم المنطقة</th>
              <th className="p-2 border border-gray-400">المحافظة</th>
              <th className="p-2 border border-gray-400">نوع الطريق</th>
              <th className="p-2 border border-gray-400">سرعة الطريق</th>
              <th className="p-2 border border-gray-400">طبيعة الطريق</th>
              <th className="p-2 border border-gray-400">بداية الطريق</th>
              <th className="p-2 border border-gray-400">نهاية الطريق</th>
              <th className="p-2 border border-gray-400">لينك جوجل ماب</th>
              <th className="p-2 border border-gray-400">خريطة</th>
              <th className="p-2 border border-gray-400">طول الطريق</th>
              <th className="p-2 border border-gray-400">اضافة صيانة</th>
              <th className="p-2 border border-gray-400">نوع الاجراء</th>
            </tr>
          </thead>
          <tbody className="text-xs text-gray-700">
            {roads.map((road, index) => (
              <tr key={road.id} className="hover:bg-gray-50 even:bg-gray-50">
                <td className="p-2 border border-gray-200">{index + 1}</td>
                <td className="p-2 border border-gray-200 font-bold">{road.name}</td>
                <td className="p-2 border border-gray-200">{road.department}</td>
                <td className="p-2 border border-gray-200">{road.governorate}</td>
                <td className="p-2 border border-gray-200">{road.type}</td>
                <td className="p-2 border border-gray-200">{road.speed}</td>
                <td className="p-2 border border-gray-200">{road.nature}</td>
                <td className="p-2 border border-gray-200">{road.start}</td>
                <td className="p-2 border border-gray-200">{road.end}</td>
                <td className="p-2 border border-gray-200 text-blue-600 underline">
                  <a href={road.mapLink} target="_blank" rel="noopener noreferrer">لينك</a>
                </td>
                <td className="p-2 border border-gray-200">
                  <button 
                    onClick={() => setSelectedRoadForMap(road)}
                    className="bg-emerald-500 text-white px-2 py-1 rounded hover:bg-emerald-600 transition-colors shadow-sm"
                    title="عرض الموقع على الخريطة"
                  >
                    <i className="fa fa-map-marked-alt"></i>
                  </button>
                </td>
                <td className="p-2 border border-gray-200">{road.length}</td>
                <td className="p-2 border border-gray-200">
                  <Link to={`/maintenance/add?roadId=${road.id}`} className="text-blue-500 hover:text-blue-700">
                    <i className="fa fa-pencil-alt"></i>
                  </Link>
                </td>
                <td className="p-2 border border-gray-200">
                  <div className="flex flex-col items-center gap-2">
                    <Link to={`/roads/edit/${road.id}`} className="text-blue-500 hover:text-blue-700" title="تعديل">
                      <i className="fa fa-edit"></i>
                    </Link>
                    <div className="w-full border-t border-gray-300"></div>
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
    </div>
  );
};

export default RoadsList;
