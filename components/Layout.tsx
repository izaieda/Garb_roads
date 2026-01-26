
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar - responsive handling via props or shared logic */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-[#EDEDED] border-b border-gray-300 flex items-center justify-between px-4 sticky top-0 z-20">
          <button 
            onClick={toggleSidebar}
            className="text-gray-600 md:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
          >
            <i className={`fa ${isSidebarOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button className="hidden sm:flex p-2 hover:bg-black/5 rounded-full transition-colors text-gray-600" title="تكبير">
              <i className="fa fa-expand"></i>
            </button>
            <button className="hidden sm:flex p-2 hover:bg-black/5 rounded-full transition-colors text-gray-600" title="قفل">
              <i className="fa fa-eye-slash"></i>
            </button>
            <div className="h-6 w-px bg-gray-300 mx-1 hidden sm:block"></div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-600 font-bold text-sm" 
              title="خروج"
            >
              <span className="hidden xs:inline">خروج</span>
              <i className="fa fa-power-off"></i>
            </button>
          </div>
        </header>

        <main className="flex-1 p-3 sm:p-4 md:p-6 bg-[#f7f7f7] overflow-x-hidden">
          <Outlet />
        </main>

        <footer className="p-4 text-center text-[10px] sm:text-xs text-gray-500 border-top bg-white border-gray-200">
           الإدارة العامة لنظم المعلومات -- تنفيذ الهيئة العامة للطرق والكباري ©2023
        </footer>
      </div>
    </div>
  );
};

export default Layout;
