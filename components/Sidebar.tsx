
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    roads: true,
    maintenance: false,
    companies: false,
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
        onClick={() => { if (window.innerWidth < 768) onClose(); }}
        className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${location.pathname === to ? 'bg-white/10 text-emerald-400' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
      >
        <i className={`fa ${icon} w-5`}></i>
        <span>{label}</span>
      </Link>
    </li>
  );

  return (
    <div className={`
      fixed md:sticky top-0 right-0 h-screen w-64 bg-[#2A3F54] text-white z-40 shrink-0 transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
    `}>
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <i className="fa fa-road text-white"></i>
          </div>
          <span className="text-xl font-bold tracking-tight">الرئيسية</span>
        </Link>
        <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
          <i className="fa fa-times text-xl"></i>
        </button>
      </div>

      <div className="p-4 flex items-center gap-3 bg-black/10">
        <div className="text-xs">
          <div className="text-gray-400">أسم المستخدم</div>
          <div className="font-semibold text-sm">Eng Ismail</div>
        </div>
      </div>

      <nav className="mt-4 overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">
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

          {/* Companies */}
          <li>
            <button 
              onClick={() => toggleMenu('companies')}
              className="w-full flex items-center justify-between px-6 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <i className="fa fa-building w-5"></i>
                <span>الشركات</span>
              </div>
              <i className={`fa fa-chevron-${openMenus.companies ? 'up' : 'down'} text-[10px]`}></i>
            </button>
            {openMenus.companies && (
              <ul className="bg-black/20 text-xs">
                <MenuItem to="/companies/all" label="كل الشركات" icon="fa-list-ul" />
                <MenuItem to="/companies/add" label="اضافة شركة" icon="fa-plus-circle" />
              </ul>
            )}
          </li>

          {/* Statistics */}
          <li>
            <Link 
              to="/statistics" 
              onClick={() => { if (window.innerWidth < 768) onClose(); }}
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
