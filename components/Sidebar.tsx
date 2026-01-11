
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    roads: true,
    maintenance: false,
    data: false,
    users: false
  });

  const location = useLocation();

  const toggleMenu = (menu: string) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const MenuItem = ({ to, label, icon }: { to: string, label: string, icon: string }) => (
    <li>
      <Link 
        to={to} 
        className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${location.pathname === to ? 'bg-white/10 text-emerald-400' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
      >
        <i className={`fa ${icon} w-5`}></i>
        <span>{label}</span>
      </Link>
    </li>
  );

  return (
    <div className="w-64 bg-[#2A3F54] min-h-screen text-white hidden md:block shrink-0">
      <div className="p-4 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <i className="fa fa-road text-white"></i>
          </div>
          <span className="text-xl font-bold tracking-tight">الرئيسية</span>
        </Link>
      </div>

      <div className="p-4 flex items-center gap-3 bg-black/10">
        <div className="text-xs">
          <div className="text-gray-400">أسم المستخدم</div>
          <div className="font-semibold text-sm">Eng Ismail</div>
        </div>
      </div>

      <nav className="mt-4">
        <div className="px-6 py-2 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
          القائمة الاساسية
        </div>
        
        <ul className="space-y-1">
          {/* Roads */}
          <li>
            <button 
              onClick={() => toggleMenu('roads')}
              className="w-full flex items-center justify-between px-6 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <i className="fa fa-road w-5"></i>
                <span>الطرق</span>
              </div>
              <i className={`fa fa-chevron-${openMenus.roads ? 'up' : 'down'} text-[10px]`}></i>
            </button>
            {openMenus.roads && (
              <ul className="bg-black/20 text-xs">
                <MenuItem to="/roads/all" label="كل الطرق" icon="fa-list" />
                <MenuItem to="/roads/add" label="اضافة طريق" icon="fa-plus" />
              </ul>
            )}
          </li>

          {/* Maintenance */}
          <li>
            <button 
              onClick={() => toggleMenu('maintenance')}
              className="w-full flex items-center justify-between px-6 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <i className="fa fa-wrench w-5"></i>
                <span>الصيانة</span>
              </div>
              <i className={`fa fa-chevron-${openMenus.maintenance ? 'up' : 'down'} text-[10px]`}></i>
            </button>
            {openMenus.maintenance && (
              <ul className="bg-black/20 text-xs">
                <MenuItem to="/maintenance/all" label="كل الصيانة" icon="fa-list" />
                <MenuItem to="/maintenance/add" label="اضافة صيانة" icon="fa-plus" />
              </ul>
            )}
          </li>

          {/* Statistics */}
          <li>
            <Link 
              to="/statistics" 
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${location.pathname === '/statistics' ? 'bg-white/10 text-emerald-400' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
            >
              <i className="fa fa-chart-line w-5"></i>
              <span>الاحصائيات</span>
            </Link>
          </li>

          {/* Data */}
          <li>
            <button 
              onClick={() => toggleMenu('data')}
              className="w-full flex items-center justify-between px-6 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <i className="fa fa-database w-5"></i>
                <span>بيانات</span>
              </div>
              <i className={`fa fa-chevron-${openMenus.data ? 'up' : 'down'} text-[10px]`}></i>
            </button>
            {openMenus.data && (
              <ul className="bg-black/20 text-xs">
                <MenuItem to="/data/governorates" label="المحافظات" icon="fa-map-marker-alt" />
                <MenuItem to="/data/maintenance-types" label="انواع الصيانة" icon="fa-tools" />
              </ul>
            )}
          </li>

          {/* Users */}
          <li>
            <button 
              onClick={() => toggleMenu('users')}
              className="w-full flex items-center justify-between px-6 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <i className="fa fa-users w-5"></i>
                <span>المستخدمين</span>
              </div>
              <i className={`fa fa-chevron-${openMenus.users ? 'up' : 'down'} text-[10px]`}></i>
            </button>
            {openMenus.users && (
              <ul className="bg-black/20 text-xs">
                <MenuItem to="/users/all" label="كل المستخدمين" icon="fa-user-friends" />
                <MenuItem to="/users/add" label="اضافة مستخدم" icon="fa-user-plus" />
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
