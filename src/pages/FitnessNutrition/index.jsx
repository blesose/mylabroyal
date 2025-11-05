import React, { useState } from 'react';
import FitnessForm from '../../components/forms/fitnessForm';
import NutritionForm from '../../components/forms/nutritionForm';

const FitnessNutrition = () => {
  const [activeTab, setActiveTab] = useState('fitness');

  const tabs = [
    { id: 'fitness', name: 'Fitness Tracker' },
    { id: 'nutrition', name: 'Nutrition Tracker' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1E9] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B132B] mb-4">
            Fitness & Nutrition
          </h1>
          <p className="text-lg text-[#688F48]">
            Track your workouts and meals to stay in balance.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md p-2 mb-8 flex justify-between gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#688F48] text-white shadow-lg'
                  : 'text-[#0B132B] hover:bg-[#B1D182] hover:text-white'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          {activeTab === 'fitness' ? <FitnessForm /> : <NutritionForm />}
        </div>
      </div>
    </div>
  );
};

export default FitnessNutrition;

// // import React, { useState } from 'react';
// // import { Outlet, useLocation, Link } from 'react-router-dom';

// // const FitnessNutrition = () => {
// //   const location = useLocation();
// //   const [activeTab, setActiveTab] = useState(
// //     location.pathname.includes('fitness') ? 'fitness' : 'nutrition'
// //   );

// //   const tabs = [
// //     { id: 'fitness', name: 'Fitness Tracker', path: '/fitness-nutrition/fitness' },
// //     { id: 'nutrition', name: 'Nutrition Tracker', path: '/fitness-nutrition/nutrition' }
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="text-center mb-8">
// //           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
// //             Fitness & Nutrition
// //           </h1>
// //           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
// //             Track your physical activity and nutritional intake for optimal health and performance
// //           </p>
// //         </div>

// //         {/* Tabs */}
// //         <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
// //           <div className="flex gap-2">
// //             {tabs.map(tab => (
// //               <Link
// //                 key={tab.id}
// //                 to={tab.path}
// //                 className={`flex-1 py-3 rounded-lg font-medium text-center transition-all duration-200 ${
// //                   activeTab === tab.id
// //                     ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md'
// //                     : 'text-gray-600 hover:bg-gray-100'
// //                 }`}
// //                 onClick={() => setActiveTab(tab.id)}
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
// // import FitnessTracker from './FitnessTracker';
// // import NutritionTracker from './NutritionTracker';

// // FitnessNutrition.FitnessTracker = FitnessTracker;
// // FitnessNutrition.NutritionTracker = NutritionTracker;

// // export default FitnessNutrition;
// import React, { useState } from "react";
// import FitnessForm from "./FitnessForm";
// import NutritionForm from "./NutritionForm";

// const FitnessNutrition = () => {
//   const [activeTab, setActiveTab] = useState("fitness");

//   return (
//     <div className="min-h-screen bg-[#0B132B] text-[#F4F1E9] p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-6">Fitness & Nutrition Tracker</h1>

//         {/* Tabs */}
//         <div className="flex justify-center space-x-4 mb-6">
//           <button
//             onClick={() => setActiveTab("fitness")}
//             className={`px-4 py-2 rounded-lg ${
//               activeTab === "fitness"
//                 ? "bg-[#688F48] text-white"
//                 : "bg-[#B1D182] text-[#0B132B]"
//             }`}
//           >
//             Fitness
//           </button>
//           <button
//             onClick={() => setActiveTab("nutrition")}
//             className={`px-4 py-2 rounded-lg ${
//               activeTab === "nutrition"
//                 ? "bg-[#688F48] text-white"
//                 : "bg-[#B1D182] text-[#0B132B]"
//             }`}
//           >
//             Nutrition
//           </button>
//         </div>

//         {/* Content */}
//         <div className="bg-[#1C2541] p-6 rounded-2xl shadow-lg">
//           {activeTab === "fitness" ? <FitnessForm /> : <NutritionForm />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FitnessNutrition;
