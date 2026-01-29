import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ProjectViewer from './pages/ProjectViewer';
import LoginPage from './pages/LoginPage';
import TemplatesPage from './pages/TemplatesPage';
import DocsPage from './pages/DocsPage';
import ForgotPassword from './pages/ForgotPassword';
import ExportPage from './pages/ExportPage';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';
import { authService } from './services/api';

// Route protection component
const ProtectedRoute = ({ children }) => {
  const user = authService.getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project/:id"
              element={
                <ProtectedRoute>
                  <ProjectViewer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/export/:id"
              element={
                <ProtectedRoute>
                  <ExportPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>

      <style jsx="true">{`
        .app-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        main {
          flex: 1;
        }
      `}</style>
    </Router>
  );
}

export default App;
