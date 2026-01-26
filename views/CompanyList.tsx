
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_COMPANIES } from '../constants';

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState(MOCK_COMPANIES);

  const handleDelete = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الشركة؟')) {
      setCompanies(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-r-4 border-[#337ab7] pr-3">قائمة الشركات</h2>
        <Link to="/companies/add" className="bg-[#337ab7] text-white px-6 py-2 rounded-sm text-sm hover:bg-blue-700 transition-colors shadow-sm font-bold">
          اضافة شركة جديدة
        </Link>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-[#337ab7] text-white text-sm font-bold">
              <th className="p-3 border border-gray-400 w-24">م (ID)</th>
              <th className="p-3 border border-gray-400 text-right pr-10">اسم الشركة</th>
              <th className="p-3 border border-gray-400 w-32">اجراء</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {companies.map((company, index) => (
              <tr key={company.id} className="hover:bg-gray-50 even:bg-gray-50/50">
                <td className="p-3 border border-gray-200 font-bold text-gray-500">{company.id}</td>
                <td className="p-3 border border-gray-200 text-right pr-10 font-medium text-gray-700">{company.name}</td>
                <td className="p-3 border border-gray-200">
                  <div className="flex justify-center gap-4">
                    <button className="text-blue-500 hover:text-blue-700" title="تعديل">
                      <i className="fa fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => handleDelete(company.id)}
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
    </div>
  );
};

export default CompanyList;
