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
import { InstantGeneration, PatternDetection, CodeSynchronized } from './pages/FeatureDetails';
import { AuthProvider, useAuth } from './context/AuthContext';

// Route protection component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><div className="loader"></div></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-wrapper">
          <div className="bg-blob bg-blob-1"></div>
          <div className="bg-blob bg-blob-2"></div>
          <div className="bg-blob bg-blob-3"></div>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/features/instant" element={<InstantGeneration />} />
              <Route path="/features/patterns" element={<PatternDetection />} />
              <Route path="/features/sync" element={<CodeSynchronized />} />
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
    </AuthProvider>
  );
}

export default App;
