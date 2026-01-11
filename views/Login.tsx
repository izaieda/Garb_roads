
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/roads/all');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white p-4">
      {/* Left side Branding */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-l border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">قاعده بيانات لشبكة الطرق</h1>
        <p className="text-gray-500 mb-8">التابعة للهيئة العامة للطرق والكباري</p>
        
        <div className="flex flex-wrap gap-8 justify-center items-center">
          <div className="w-32 h-32 flex items-center justify-center">
             <i className="fa fa-road text-6xl text-[#3498db]"></i>
          </div>
          <div className="w-32 h-32 flex items-center justify-center">
             <img src="https://picsum.photos/120/120?random=1" alt="National Logo" className="rounded-full shadow-lg" />
          </div>
        </div>
        
        <p className="mt-12 text-sm text-gray-400">الإدارة العامة لنظم المعلومات ©</p>
      </div>

      {/* Right side Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-md w-full">
        <div className="w-full">
          <h2 className="text-3xl font-light text-gray-700 mb-8 text-right">تسجيل الدخول</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 text-right">
                أسم المستخدم <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                required 
                className="w-full border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1 text-right">
                كلمة المرور <span className="text-red-500">*</span>
              </label>
              <input 
                type="password" 
                required 
                className="w-full border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#4870f1] hover:bg-blue-700 text-white font-bold py-3 transition-colors shadow-md"
            >
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
