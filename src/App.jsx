import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import Layout from './components/layout/Layout';

// Pages
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/signup";
import Home from './pages/Home';
import FemaleHealth from './pages/FemaleHealth';
import MenHealth from './pages/MenHealth';
import FitnessNutrition from './pages/FitnessNutrition';
import SleepRecovery from './pages/SleepRecovery';
import SelfCare from './pages/SelfCare';
import LabInsights from './pages/LabInsights';
import CommunityPost from './pages/Community/communityPost';
import ArticleDetails from './pages/FemaleHealth/articleDetails';

// Protected Route Wrapper
// const ProtectedRoute = ({ children }) => {
//   const { state } = useApp();
//   const isLoggedIn = !!state.user; // check if user is logged in
//   return isLoggedIn ? children : <Navigate to="/login" />;
// };

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Protected Routes */}
      <Route
        path="/female-health/*"
        element={
          // <ProtectedRoute>
            <FemaleHealth />
            
          // </ProtectedRoute>
        }
      />
      <Route path="/female-health/education/:id" element={<ArticleDetails />} />

      <Route
        path="/men-health/*"
        element={
          // <ProtectedRoute>
            <MenHealth />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/fitness-nutrition"
        element={
          // <ProtectedRoute>
            <FitnessNutrition />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/sleep-recovery"
        element={
          // <ProtectedRoute>
            <SleepRecovery />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/self-care"
        element={
          // <ProtectedRoute>
            <SelfCare />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/community"
        element={
          // <ProtectedRoute>
            <CommunityPost />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/labinsights"
        element={
          // <ProtectedRoute>
            <LabInsights />
          // </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;