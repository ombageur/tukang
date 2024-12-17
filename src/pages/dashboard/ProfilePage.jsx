import React from 'react';
import { useAuth } from '../../hooks/useAuth.jsx';
import BottomNavigation from '../../components/navigation/BottomNavigation';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="px-4 h-16 flex items-center">
          <h1 className="text-xl font-semibold text-gray-900">Akun Saya</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 pt-16">
        <div className="px-4 py-6">
          {/* Profile Info */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl text-gray-600">
                  {user?.full_name?.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="font-semibold text-lg">{user?.full_name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="bg-white rounded-lg shadow-sm">
            <button className="w-full px-4 py-3 text-left border-b border-gray-100">
              Edit Profil
            </button>
            <button className="w-full px-4 py-3 text-left border-b border-gray-100">
              Pengaturan
            </button>
            <button className="w-full px-4 py-3 text-left border-b border-gray-100">
              Bantuan
            </button>
            <button 
              onClick={logout}
              className="w-full px-4 py-3 text-left text-red-600"
            >
              Keluar
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default ProfilePage; 