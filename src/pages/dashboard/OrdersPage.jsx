import React from 'react';
import BottomNavigation from '../../components/navigation/BottomNavigation';

const OrdersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="px-4 h-16 flex items-center">
          <h1 className="text-xl font-semibold text-gray-900">Pesanan Saya</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 pt-16">
        <div className="px-4 py-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-gray-500 text-center py-4">
              Belum ada pesanan
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default OrdersPage; 