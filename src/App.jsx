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
        path="/lab-insights"
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

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AppProvider } from './contexts/AppContext';
// import Layout from './components/layout/Layout';

// // Pages
// import Login from "./pages/Auth/login";
// import Signup from "./pages/Auth/signup";
// import Home from './pages/Home';
// import FemaleHealth from './pages/FemaleHealth';
// import MenHealth from './pages/MenHealth';
// import FitnessNutrition from './pages/FitnessNutrition';
// import SleepRecovery from './pages/SleepRecovery';
// import SelfCare from './pages/SelfCare';
// import Community from './pages/Community';
// import LabInsights from './pages/LabInsights';

// import './index.css';

// function App() {
//   return (
//     <AppProvider>
//       <Router>
//         <Layout>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             {/* auth route */}
//             <Route path="/register" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//             {/* Female Health Routes */}
//             <Route path="/female-health" element={<FemaleHealth />}>
//               <Route path="cycle" element={<FemaleHealth.CycleTracker />} />
//               <Route path="ovulation" element={<FemaleHealth.OvulationTracker />} />
//               <Route path="pregnancy" element={<FemaleHealth.PregnancyTracker />} />
//               <Route path="education" element={<FemaleHealth.Education />} />
//             </Route>
            
//             {/* Men Health Routes */}
//             <Route path="/men-health" element={<MenHealth />}>
//               <Route path="tracker" element={<MenHealth.HealthTracker />} />
//               <Route path="education" element={<MenHealth.Education />} />
//             </Route>
            
//             {/* Other Routes */}
//             <Route path="/fitness-nutrition" element={<FitnessNutrition />} />
//             <Route path="/sleep-recovery" element={<SleepRecovery />} />
//             <Route path="/self-care" element={<SelfCare />} />
//             <Route path="/community" element={<Community />} />
//             <Route path="/lab-insights" element={<LabInsights />} />
//           </Routes>
//         </Layout>
//       </Router>
//     </AppProvider>
//   );
// }

// export default App;
// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AppProvider } from './contexts/AppContext';
// import Layout from './components/Layout/Layout';
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import Dashboard from './components/Dashboard/Dashboard';
// import SleepDashboard from './components/Sleep/SleepDashboard';
// import CycleForm from './components/Cycle/CycleForm';
// import PregnancyForm from './components/Pregnancy/PregnancyForm';
// import Community from './components/Community/Community';
// import CreatePost from './components/Community/CreatePost';

// // Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   return token ? children : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <AppProvider>
//       <Router>
//         <div className="App">
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
            
//             {/* Protected Routes with Layout */}
//             <Route path="/" element={
//               <ProtectedRoute>
//                 <Layout>
//                   <Dashboard />
//                 </Layout>
//               </ProtectedRoute>
//             } />
            
//             <Route path="/dashboard" element={
//               <ProtectedRoute>
//                 <Layout>
//                   <Dashboard />
//                 </Layout>
//               </ProtectedRoute>
//             } />

//             <Route path="/sleep-recovery" element={
//               <ProtectedRoute>
//                 <Layout>
//                   <SleepDashboard />
//                 </Layout>
//               </ProtectedRoute>
//             } />

//             <Route path="/female-health/cycle" element={
//               <ProtectedRoute>
//                 <Layout>
//                   <div className="min-h-screen bg-gray-50 py-8">
//                     <div className="max-w-2xl mx-auto px-4">
//                       <h1 className="text-3xl font-bold text-gray-800 mb-8">Cycle Tracking</h1>
//                       <CycleForm />
//                     </div>
//                   </div>
//                 </Layout>
//               </ProtectedRoute>
//             } />

//             <Route path="/female-health/pregnancy" element={
//               <ProtectedRoute>
//                 <Layout>
//                   <div className="min-h-screen bg-gray-50 py-8">
//                     <div className="max-w-2xl mx-auto px-4">
//                       <h1 className="text-3xl font-bold text-gray-800 mb-8">Pregnancy Tracking</h1>
//                       <PregnancyForm />
//                     </div>
//                   </div>
//                 </Layout>
//               </ProtectedRoute>
//             } />

//             <Route path="/community" element={
//               <ProtectedRoute>
//                 <Layout>
//                   <Community />
//                 </Layout>
//               </ProtectedRoute>
//             } />

//             <Route path="/community/create-post" element={
//               <ProtectedRoute>
//                 <Layout>
//                   <CreatePost />
//                 </Layout>
//               </ProtectedRoute>
//             } />

//             {/* Add more routes for other modules... */}
//           </Routes>
//         </div>
//       </Router>
//     </AppProvider>
//   );
// }

// export default App;
