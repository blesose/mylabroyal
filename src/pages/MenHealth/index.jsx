// import React, { useState } from 'react';
// import MenHealthTracker from './HealthTracker'
// import Button from '../../components/ui/Button';

// const MenHealth = () => {
//   const [activeTab, setActiveTab] = useState('tracker'); // tracker | history | analytics

//   const tabs = [
//     { id: 'tracker', label: 'Track Health' },
//     { id: 'history', label: 'History' },
//     { id: 'analytics', label: 'Analytics' },
//   ];

//   return (
//     <div className="min-h-screen bg-midnight-blue/5 py-10">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Page Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-display font-bold text-midnight-blue">
//             Men's Health Dashboard
//           </h1>
//           <p className="text-charcoal-grey mt-2">
//             Track your vital stats, manage wellness routines, and monitor progress over time.
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className="flex justify-center gap-4 mb-8">
//           {tabs.map((tab) => (
//             <Button
//               key={tab.id}
//               variant={activeTab === tab.id ? 'primary' : 'secondary'}
//               className={`px-6 py-2 rounded-xl font-medium transition-all ${
//                 activeTab === tab.id
//                   ? 'bg-electric-blue text-off-white'
//                   : 'bg-off-white text-charcoal-grey hover:bg-soft-mint hover:text-midnight-blue'
//               }`}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               {tab.label}
//             </Button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <div className="space-y-8">
//           {activeTab === 'tracker' && <MenHealthTracker />}
//           {activeTab === 'history' && (
//             <div className="bg-off-white p-6 rounded-2xl shadow-lg text-charcoal-grey">
//               <h2 className="text-2xl font-semibold mb-4">Health History</h2>
//               <p>
//                 You can display past entries, trends, and progress charts here.
//                 This section will allow users to review their historical data.
//               </p>
//             </div>
//           )}
//           {activeTab === 'analytics' && (
//             <div className="bg-off-white p-6 rounded-2xl shadow-lg text-charcoal-grey">
//               <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
//               <p>
//                 Analytics and insights from the tracked data can be visualized here.
//                 Graphs, charts, and AI-driven suggestions can be displayed for better wellness management.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenHealth;


// // import React from 'react';
// // import { Outlet, Link, useLocation } from 'react-router-dom';

// // const MenHealth = () => {
// //   const location = useLocation();

// //   const tabs = [
// //     { name: 'Health Tracker', path: '/men-health/tracker' },
// //     { name: 'Education', path: '/men-health/education' }
// //   ];

// //   return (
// //     <div className="min-h-screen bg-#0D1B2A py-8">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="text-center mb-8">
// //           <h1 className="text-4xl md:text-5xl font-bold text-#F5F5F5 mb-4">
// //             Men's Health
// //           </h1>
// //           <p className="text-xl text-#A8E6CF max-w-3xl mx-auto">
// //             Comprehensive tracking and insights for male health, wellness, and preventive care
// //           </p>
// //         </div>

// //         {/* Navigation Tabs */}
// //         <div className="bg-#F5F5F5 rounded-2xl shadow-lg p-2 mb-8">
// //           <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide">
// //             {tabs.map(tab => (
// //               <Link
// //                 key={tab.path}
// //                 to={tab.path}
// //                 className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap min-w-max ${
// //                   location.pathname === tab.path
// //                     ? 'bg-gradient-to-r from-#2979FF to-#1ABC9C text-white shadow-md'
// //                     : 'text-#2E3A59 hover:bg-#A8E6CF/10'
// //                 }`}
// //               >
// //                 {tab.name}
// //               </Link>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Page Content */}
// //         <div className="bg-#F5F5F5 rounded-2xl shadow-lg p-6">
// //           <Outlet />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Export components for routing
// // import HealthTracker from './HealthTracker';
// // import Education from './Education';

// // MenHealth.HealthTracker = HealthTracker;
// // MenHealth.Education = Education;

// // export default MenHealth;

// // import React from 'react';
// // import { Outlet, Link, useLocation } from 'react-router-dom';

// // const MenHealth = () => {
// //   const location = useLocation();
  
// //   const tabs = [
// //     { name: 'Health Tracker', path: '/men-health/tracker' },
// //     { name: 'Education', path: '/men-health/education' }
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-soft-blue to-soft-pink py-8">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="text-center mb-8">
// //           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
// //             Men's Health
// //           </h1>
// //           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
// //             Comprehensive tracking and insights for male health, wellness, and preventive care
// //           </p>
// //         </div>

// //         {/* Navigation Tabs */}
// //         <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
// //           <div className="flex flex-wrap gap-2">
// //             {tabs.map(tab => (
// //               <Link
// //                 key={tab.path}
// //                 to={tab.path}
// //                 className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
// //                   location.pathname === tab.path
// //                     ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
// //                     : 'text-gray-600 hover:bg-gray-100'
// //                 }`}
// //               >
// //                 {tab.name}
// //               </Link>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Page Content */}
// //         <div className="bg-white rounded-2xl shadow-lg">
// //           <Outlet />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Export components for routing
// // import HealthTracker from './HealthTracker';
// // import Education from './Education';

// // MenHealth.HealthTracker = HealthTracker;
// // MenHealth.Education = Education;

// // export default MenHealth;
import React, { useState } from 'react';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import Button from '../../components/ui/Button';

const MenHealth = () => {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    stressLevel: 5,
    sleepHours: 7,
    workoutDays: 3,
    age: '',
    prostateCheck: false,
    testosteroneLevel: '',
    sexualHealthConcerns: '',
    energyLevel: 5,
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const menHealthData = {
        stressLevel: parseInt(formData.stressLevel),
        sleepHours: parseFloat(formData.sleepHours),
        workoutDays: parseInt(formData.workoutDays),
        age: formData.age ? parseInt(formData.age) : undefined,
        prostateCheck: formData.prostateCheck,
        testosteroneLevel: formData.testosteroneLevel ? parseFloat(formData.testosteroneLevel) : undefined,
        sexualHealthConcerns: formData.sexualHealthConcerns,
        energyLevel: parseInt(formData.energyLevel),
        notes: formData.notes
      };

      const result = await apiService.createMenHealthRecord(menHealthData);

      if (result.success) {
        alert('Men health record created successfully!');
        setFormData({
          stressLevel: 5,
          sleepHours: 7,
          workoutDays: 3,
          age: '',
          prostateCheck: false,
          testosteroneLevel: '',
          sexualHealthConcerns: '',
          energyLevel: 5,
          notes: ''
        });
      }
    } catch (error) {
      console.error('Error creating men health record:', error);
      const errorMessage = error.response?.data?.message || 'Error creating health record';
      alert(errorMessage);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-off-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-charcoal-grey mb-6">Men's Health Tracking</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Stress Level & Sleep Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-charcoal-grey mb-2">
              Stress Level: <span className="text-vibrant-teal">{formData.stressLevel}/10</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.stressLevel}
              onChange={(e) => setFormData({ ...formData, stressLevel: e.target.value })}
              className="w-full accent-vibrant-teal"
            />
            <div className="flex justify-between text-xs text-charcoal-grey mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-grey mb-2">
              Sleep Hours
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              max="24"
              value={formData.sleepHours}
              onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal-grey rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              placeholder="7.5"
            />
          </div>
        </div>

        {/* Workout Days & Age */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-charcoal-grey mb-2">
              Workout Days
            </label>
            <input
              type="number"
              min="0"
              max="7"
              value={formData.workoutDays}
              onChange={(e) => setFormData({ ...formData, workoutDays: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal-grey rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              placeholder="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-grey mb-2">
              Age (optional)
            </label>
            <input
              type="number"
              min="18"
              max="100"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal-grey rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              placeholder="30"
            />
          </div>
        </div>

        {/* Energy Level & Testosterone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-charcoal-grey mb-2">
              Energy Level: <span className="text-vibrant-teal">{formData.energyLevel}/10</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.energyLevel}
              onChange={(e) => setFormData({ ...formData, energyLevel: e.target.value })}
              className="w-full accent-vibrant-teal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal-grey mb-2">
              Testosterone Level (optional)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={formData.testosteroneLevel}
              onChange={(e) => setFormData({ ...formData, testosteroneLevel: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal-grey rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              placeholder="6.5 ng/mL"
            />
          </div>
        </div>

        {/* Prostate Check */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="prostateCheck"
            checked={formData.prostateCheck}
            onChange={(e) => setFormData({ ...formData, prostateCheck: e.target.checked })}
            className="accent-warm-coral mr-3"
          />
          <label htmlFor="prostateCheck" className="text-charcoal-grey font-medium">
            Had Prostate Check This Year
          </label>
        </div>

        {/* Sexual Health & Notes */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal-grey mb-2">Sexual Health Concerns</label>
            <textarea
              value={formData.sexualHealthConcerns}
              onChange={(e) => setFormData({ ...formData, sexualHealthConcerns: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal-grey rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              placeholder="Describe any concerns..."
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-grey mb-2">Additional Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 border border-charcoal-grey rounded-lg focus:ring-2 focus:ring-electric-blue focus:border-transparent"
              placeholder="Any other info..."
              rows={3}
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full bg-electric-blue hover:bg-vibrant-teal text-off-white mt-4"
          icon="✅"
        >
          Submit Health Data
        </Button>
      </form>
    </div>
  );
};

export default MenHealth;