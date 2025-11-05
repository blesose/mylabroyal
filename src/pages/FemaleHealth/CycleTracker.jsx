// import React, { useState } from 'react';
// import { apiService } from '../../services/api';
// import { useApp } from '../../contexts/AppContext';

// const CycleTracker = () => {
//   const { dispatch } = useApp();
//   const [formData, setFormData] = useState({
//     startDate: '',
//     endDate: '',
//     flowLevel: 'medium',
//     symptoms: []
//   });

//   const symptomsList = ['cramps', 'fatigue', 'headache', 'bloating', 'mood swings', 'back pain'];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch({ type: 'SET_LOADING', payload: true });
//       const result = await apiService.addCycleData(formData);
//       dispatch({ type: 'ADD_CYCLE_DATA', payload: result });
//       // Reset form
//       setFormData({ startDate: '', endDate: '', flowLevel: 'medium', symptoms: [] });
//       alert('Cycle data saved successfully!');
//     } catch (error) {
//       alert('Error saving cycle data');
//     } finally {
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };

//   const toggleSymptom = (symptom) => {
//     setFormData(prev => ({
//       ...prev,
//       symptoms: prev.symptoms.includes(symptom)
//         ? prev.symptoms.filter(s => s !== symptom)
//         : [...prev.symptoms, symptom]
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-soft-pink to-soft-blue py-12">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">Cycle Tracker</h1>
//           <p className="text-gray-600 mb-8">Track your menstrual cycle and symptoms</p>
          
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   required
//                   value={formData.startDate}
//                   onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   required
//                   value={formData.endDate}
//                   onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Flow Level
//               </label>
//               <select
//                 value={formData.flowLevel}
//                 onChange={(e) => setFormData({ ...formData, flowLevel: e.target.value })}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//               >
//                 <option value="light">Light</option>
//                 <option value="medium">Medium</option>
//                 <option value="heavy">Heavy</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Symptoms
//               </label>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                 {symptomsList.map(symptom => (
//                   <button
//                     key={symptom}
//                     type="button"
//                     onClick={() => toggleSymptom(symptom)}
//                     className={`p-3 rounded-lg border-2 text-left transition-all ${
//                       formData.symptoms.includes(symptom)
//                         ? 'border-pink-500 bg-pink-50 text-pink-700'
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   >
//                     {symptom}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-lg font-semibold hover-lift transition-all duration-300"
//             >
//               Save Cycle Data
//             </button>
//           </form>
//         </div>

//         {/* Education Section */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Understanding Your Cycle</h2>
//           <div className="prose max-w-none text-gray-600">
//             <p>Your menstrual cycle is a vital sign of your overall health. Tracking it helps you understand your body better and identify any potential issues early.</p>
//             <ul className="mt-4 space-y-2">
//               <li>• Typical cycle length: 21-35 days</li>
//               <li>• Period duration: 2-7 days</li>
//               <li>• Regular tracking helps predict ovulation</li>
//               <li>• Changes can indicate health issues</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CycleTracker;

