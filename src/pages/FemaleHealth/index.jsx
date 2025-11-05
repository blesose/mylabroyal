import React, { useState } from 'react';
import CycleForm from '../../components/forms/CycleForm'; 
import OvulationForm from '../../components/forms/ovulationForm';
import PregnancyForm from '../../components/forms/PregnancyForm';
import Education from './Education';

const tabs = [
  { id: 'cycle', label: 'Menstrual Cycle' },
  { id: 'ovulation', label: 'Ovulation Tracker' },
  { id: 'pregnancy', label: 'Pregnancy Log' },
  { id: 'education', label: 'Education' }
];

const IndexFemaleHealth = () => {
  const [activeTab, setActiveTab] = useState('cycle');

  return (
    <div className="min-h-screen bg-[#F4F1E9] flex flex-col items-center px-4 py-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#2B463C] mb-6 text-center">
        Female Health Dashboard
      </h1>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-[#688F48] text-white shadow-md'
                : 'bg-white text-[#2B463C] border border-[#688F48] hover:bg-[#B1D182]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 transition-all duration-300">
        {activeTab === 'cycle' && <CycleForm />}
        {activeTab === 'ovulation' && <OvulationForm />}
        {activeTab === 'pregnancy' && <PregnancyForm />}
        {activeTab === 'education' && <FemaleEducation />}
      </div>
    </div>
  );
};

export default IndexFemaleHealth;

// import React, { useState, useEffect } from 'react';
// import CycleForm from '../../components/forms/CycleForm';
// import OvulationForm from '../../components/forms/ovulationForm';
// import PregnancyForm from '../../components/forms/PregnancyForm';
// import Education from './Education';

// const FemaleHealth = () => {
//   // Load the saved tab from localStorage, or default to 'cycle'
//   const [activeTab, setActiveTab] = useState(() => {
//     return localStorage.getItem('activeTab') || 'cycle';
//   });

//   // Update localStorage whenever the tab changes
//   useEffect(() => {
//     localStorage.setItem('activeTab', activeTab);
//   }, [activeTab]);

//   const tabs = [
//     { id: 'cycle', name: 'Cycle Tracker', icon: '🩸' },
//     { id: 'ovulation', name: 'Ovulation', icon: '🌸' },
//     { id: 'pregnancy', name: 'Pregnancy', icon: '🤰' },
//     { id: 'education', name: 'Education', icon: '📘' }
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'cycle':
//         return <CycleForm />;
//       case 'ovulation':
//         return <OvulationForm />;
//       case 'pregnancy':
//         return <PregnancyForm />;
//       case 'education':
//         return <Education />;
//       default:
//         return <CycleForm />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-5xl font-bold text-gray-800 mb-4">Female Health Hub</h1>
//           <p className="text-lg text-gray-600">
//             Track, learn, and understand your health journey in one place.
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-3 flex flex-wrap justify-center gap-3 mb-10">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
//                 activeTab === tab.id
//                   ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md scale-105'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               <span className="text-xl">{tab.icon}</span>
//               {tab.name}
//             </button>
//           ))}
//         </div>

//         {/* Dynamic section */}
//         <div className="bg-white rounded-3xl shadow-lg p-6 transition-all duration-500">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FemaleHealth;
// import React, { useState } from 'react';
// import CycleForm from './CycleForm';
// import OvulationForm from './OvulationForm';
// import PregnancyForm from './PregnancyForm';
// import FemaleEducation from './FemaleEducation';

// const tabs = [
//   { id: 'cycle', label: 'Menstrual Cycle' },
//   { id: 'ovulation', label: 'Ovulation Tracker' },
//   { id: 'pregnancy', label: 'Pregnancy Log' },
//   { id: 'education', label: 'Education' }
// ];

// const IndexFemaleHealth = () => {
//   const [activeTab, setActiveTab] = useState('cycle');

//   return (
//     <div className="min-h-screen bg-[#F4F1E9] flex flex-col items-center px-4 py-6">
//       {/* Header */}
//       <h1 className="text-3xl font-bold text-[#2B463C] mb-6 text-center">
//         Female Health Dashboard
//       </h1>

//       {/* Tabs Navigation */}
//       <div className="flex flex-wrap justify-center gap-3 mb-6">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//               activeTab === tab.id
//                 ? 'bg-[#688F48] text-white shadow-md'
//                 : 'bg-white text-[#2B463C] border border-[#688F48] hover:bg-[#B1D182]'
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Content Section */}
//       <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 transition-all duration-300">
//         {activeTab === 'cycle' && <CycleForm />}
//         {activeTab === 'ovulation' && <OvulationForm />}
//         {activeTab === 'pregnancy' && <PregnancyForm />}
//         {activeTab === 'education' && <FemaleEducation />}
//       </div>
//     </div>
//   );
// };

// export default IndexFemaleHealth;


// import React from 'react';
// import { Outlet, Link, useLocation } from 'react-router-dom';

// const FemaleHealth = () => {
//   const location = useLocation();
  
//   const tabs = [
//     { name: 'Cycle Tracker', path: '/female-health/cycle' },
//     { name: 'Ovulation Prediction', path: '/female-health/ovulation' },
//     { name: 'Pregnancy Progress', path: '/female-health/pregnancy' },
//     { name: 'Education', path: '/female-health/education' }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-soft-pink to-soft-blue py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//             Female Health
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Comprehensive tracking and insights for your reproductive health and wellness journey
//           </p>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
//           <div className="flex flex-wrap gap-2">
//             {tabs.map(tab => (
//               <Link
//                 key={tab.path}
//                 to={tab.path}
//                 className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
//                   location.pathname === tab.path
//                     ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md'
//                     : 'text-gray-600 hover:bg-gray-100'
//                 }`}
//               >
//                 {tab.name}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Page Content */}
//         <div className="bg-white rounded-2xl shadow-lg">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Export components for routing
// import CycleTracker from './CycleTracker';
// import OvulationTracker from './OvulationTracker';
// import PregnancyTracker from './PregnancyTracker';
// import Education from './Education';

// FemaleHealth.CycleTracker = CycleTracker;
// FemaleHealth.OvulationTracker = OvulationTracker;
// FemaleHealth.PregnancyTracker = PregnancyTracker;
// FemaleHealth.Education = Education;

// export default FemaleHealth;
