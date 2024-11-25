import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Documents from './pages/Documents';
import DocumentUpload from './pages/DocumentUpload';
import Orders from './pages/Orders';
import Shipments from './pages/Shipments';
import Analytics from './pages/Analytics';
import Help from './pages/Help';
import AccountInfo from './pages/AccountInfo';
import Messages from './pages/Messages';
import TaxRegulations from './pages/TaxRegulations';
import ReturnLabels from './pages/ReturnLabels';
import Chatbot from './components/Chatbot';
import Chat from './components/Chat';
import VideoConference from './components/VideoConference';
import { InventoryProvider } from './contexts/InventoryContext';
import { OrdersProvider } from './contexts/OrdersContext';
import { ShipmentsProvider } from './contexts/ShipmentsContext';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import Login from './auth/Login';
import { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

// Layout component for protected routes
const DashboardLayout = ({ children }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [roomId, setRoomId] = useState(null);

  const startVideoCall = () => {
    const newRoomId = uuidv4();
    setRoomId(newRoomId);
    setIsVideoCallActive(true);
  };

  return (
    <div className="flex">
      <Navigation 
        isCollapsed={isNavCollapsed} 
        onCollapse={setIsNavCollapsed}
        onStartVideoCall={startVideoCall}
        onOpenChat={() => setIsChatOpen(true)}
      />
      <main className={`flex-1 ${isNavCollapsed ? 'ml-20' : 'ml-64'} bg-[#EAEDED] min-h-screen transition-all duration-300`}>
        {children}
      </main>
      <Chatbot />
      {isChatOpen && (
        <Chat
          userId="current-user-id" // Replace with actual user ID from auth context
          userName="John Doe" // Replace with actual user name
          onClose={() => setIsChatOpen(false)}
        />
      )}
      {isVideoCallActive && (
        <VideoConference
          roomId={roomId}
          onClose={() => {
            setIsVideoCallActive(false);
            setRoomId(null);
          }}
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <AuthProvider>
          <ShipmentsProvider>
            <OrdersProvider>
              <InventoryProvider>
                <Routes>
                  {/* Public route */}
                  <Route path="/login" element={<Login />} />
                  
                  {/* Protected routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route
                      path="/"
                      element={
                        <DashboardLayout>
                          <Dashboard />
                        </DashboardLayout>
                      }
                    />
                    <Route
                      path="/inventory"
                      element={
                        <DashboardLayout>
                          <Inventory />
                        </DashboardLayout>
                      }
                    />
                    <Route
                      path="/documents"
                      element={
                        <DashboardLayout>
                          <Documents />
                        </DashboardLayout>
                      }
                    />
                    <Route
                      path="/documents/upload"
                      element={
                        <DashboardLayout>
                          <DocumentUpload />
                        </DashboardLayout>
                      }
                    />
                    <Route
                      path="/orders"
                      element={
                        <DashboardLayout>
                          <Orders />
                        </DashboardLayout>
                      }
                    />
                    <Route
                      path="/shipments"
                      element={
                        <DashboardLayout>
                          <Shipments />
                        </DashboardLayout>
                      }
                    />
                    <Route
                      path="/messages"
                      element={
                        <DashboardLayout>
                          <Messages />
                        </DashboardLayout>
                      }
                    />
                    <Route
                      path="/analytics"
                      element={
                        <DashboardLayout>
                          <Analytics />
                        </DashboardLayout>
                      }
                    />
                    <Route
                      path="/help"
                      element={
                        <DashboardLayout>
                          <Help />
                        </DashboardLayout>
                      }
                    />
                    <Route
                      path="/account"
                      element={
                        <DashboardLayout>
                          <AccountInfo />
                        </DashboardLayout>
                      }
                    />
                    <Route
                      path="/tax-regulations"
                      element={
                        <DashboardLayout>
                          <TaxRegulations />
                        </DashboardLayout>
                      }
                    />
                    <Route
                      path="/return-labels"
                      element={
                        <DashboardLayout>
                          <ReturnLabels />
                        </DashboardLayout>
                      }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Route>
                </Routes>
              </InventoryProvider>
            </OrdersProvider>
          </ShipmentsProvider>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;