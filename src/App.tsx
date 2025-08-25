import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Login } from './components/Login';
import { PublicTracking } from './components/PublicTracking';
import { AdminDashboard } from './components/admin/AdminDashboard';

function App() {
  const { user, loading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check for existing user in localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser && !user) {
      // User data exists but auth hook hasn't loaded it yet
      setIsInitialized(true);
    } else {
      setIsInitialized(true);
    }
  }, [user]);

  if (loading || !isInitialized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public route for tracking */}
        <Route path="/track" element={<PublicTracking />} />
        
        {/* Protected routes */}
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            {user.role === 'admin' && (
              <Route path="/admin" element={<AdminDashboard />} />
            )}
            {user.role === 'tu' && (
              <Route path="/tu" element={<div>TU Dashboard - Coming Soon</div>} />
            )}
            {user.role === 'coordinator' && (
              <Route path="/coordinator" element={<div>Coordinator Dashboard - Coming Soon</div>} />
            )}
            {user.role === 'staff' && (
              <Route path="/staff" element={<div>Staff Dashboard - Coming Soon</div>} />
            )}
            <Route path="/" element={<Navigate to={`/${user.role}`} replace />} />
            <Route path="*" element={<Navigate to={`/${user.role}`} replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;