import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import UserDashboard from './pages/dashboard/UserDashboard';
import PartnerDashboard from './pages/dashboard/PartnerDashboard';
import VendorDashboard from './pages/dashboard/VendorDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import OrdersPage from './pages/dashboard/OrdersPage';
import PromosPage from './pages/dashboard/PromosPage';
import ChatPage from './pages/dashboard/ChatPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import CreateOrder from './pages/order/CreateOrder';
import CreateServiceOrder from './pages/order/CreateServiceOrder';
import CreateSolutionOrder from './pages/order/CreateSolutionOrder';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Protected Routes */}
        <Route path="/user/*" element={
          <ProtectedRoute userType="user">
            <Routes>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="promos" element={<PromosPage />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="order/create/service/:serviceId" element={<CreateServiceOrder />} />
              <Route path="order/create/solution/:solutionId" element={<CreateSolutionOrder />} />
            </Routes>
          </ProtectedRoute>
        } />
        <Route path="/partner/*" element={
          <ProtectedRoute userType="partner">
            <PartnerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/vendor/*" element={
          <ProtectedRoute userType="vendor">
            <VendorDashboard />
          </ProtectedRoute>
        } />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App; 