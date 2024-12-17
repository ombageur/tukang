import React from 'react';
import { useAuth } from '../../hooks/useAuth.jsx';

const PartnerDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard Mitra</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">{user?.full_name}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <h2 className="text-lg font-semibold mb-4">Selamat Datang di Dashboard Mitra</h2>
            {/* Tambahkan konten dashboard di sini */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartnerDashboard; 