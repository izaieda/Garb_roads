
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './views/Login';
import RoadsList from './views/RoadsList';
import AddRoad from './views/AddRoad';
import MaintenanceList from './views/MaintenanceList';
import Statistics from './views/Statistics';

// Placeholder for missing views to ensure the app runs
const DataList = ({ title }: { title: string }) => (
  <div className="bg-white p-6 border border-gray-200">
    <h2 className="text-2xl font-semibold mb-6">{title}</h2>
    <div className="p-20 text-center text-gray-400">شاشة {title} تحت الإنشاء</div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/roads/all" replace />} />
          
          <Route path="/roads">
            <Route path="all" element={<RoadsList />} />
            <Route path="add" element={<AddRoad />} />
            <Route path="edit/:id" element={<AddRoad />} />
          </Route>

          <Route path="/maintenance">
            <Route path="all" element={<DataList title="كل الصيانة" />} />
            <Route path="add" element={<MaintenanceList />} />
          </Route>

          <Route path="/statistics" element={<Statistics />} />

          <Route path="/data">
            <Route path="governorates" element={<DataList title="المحافظات" />} />
            <Route path="maintenance-types" element={<DataList title="انواع الصيانة" />} />
          </Route>

          <Route path="/users">
            <Route path="all" element={<DataList title="كل المستخدمين" />} />
            <Route path="add" element={<DataList title="اضافة مستخدم" />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
