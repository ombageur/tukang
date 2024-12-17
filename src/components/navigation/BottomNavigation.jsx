import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaClipboardList, 
  FaPercent, 
  FaComments, 
  FaUser 
} from 'react-icons/fa';

const navigationItems = [
  {
    path: '/user/dashboard',
    icon: <FaHome className="w-6 h-6" />,
    label: 'Beranda'
  },
  {
    path: '/user/orders',
    icon: <FaClipboardList className="w-6 h-6" />,
    label: 'Pesanan'
  },
  {
    path: '/user/promos',
    icon: <FaPercent className="w-6 h-6" />,
    label: 'Promo'
  },
  {
    path: '/user/chat',
    icon: <FaComments className="w-6 h-6" />,
    label: 'Chat'
  },
  {
    path: '/user/profile',
    icon: <FaUser className="w-6 h-6" />,
    label: 'Akun'
  }
];

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-white fixed bottom-0 left-0 right-0 z-10">
      <div className="flex justify-around border-t border-gray-200">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-2 px-4 ${
              location.pathname === item.path
                ? 'text-primary'
                : 'text-gray-500'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation; 