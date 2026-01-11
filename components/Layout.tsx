
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-[#EDEDED] border-b border-gray-300 flex items-center justify-between px-4 sticky top-0 z-20">
          <button className="text-gray-600 md:hidden">
            <i className="fa fa-bars text-xl"></i>
          </button>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-600" title="تكبير">
              <i className="fa fa-expand"></i>
            </button>
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-600" title="قفل">
              <i className="fa fa-eye-slash"></i>
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-600" 
              title="خروج"
            >
              <i className="fa fa-power-off"></i>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 bg-[#f7f7f7]">
          <Outlet />
        </main>

        <footer className="p-4 text-center text-xs text-gray-500 border-top bg-white border-gray-200">
           الإدارة العامة لنظم المعلومات -- تنفيذ الهيئة العامة للطرق والكباري ©2023
        </footer>
      </div>
    </div>
  );
};

export default Layout;
