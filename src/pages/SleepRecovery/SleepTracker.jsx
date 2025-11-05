// import React, { useState } from 'react';
// import { apiService } from '../../services/api';
// import { useApp } from '../../contexts/AppContext';

// const SleepTracker = () => {
//   const { dispatch } = useApp();
//   const [formData, setFormData] = useState({
//     sleepDuration: '',
//     quality: 'good',
//     bedTime: '',
//     wakeTime: '',
//     notes: ''
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch({ type: 'SET_LOADING', payload: true });
//       const result = await apiService.addSleepRecord({
//         sleepDuration: parseFloat(formData.sleepDuration),
//         quality: formData.quality
//       });
//       dispatch({ type: 'ADD_SLEEP_DATA', payload: result });
//       alert('Sleep data recorded successfully!');
//       setFormData({
//         sleepDuration: '',
//         quality: 'good',
//         bedTime: '',
//         wakeTime: '',
//         notes: ''
//       });
//     } catch (error) {
//       alert('Error recording sleep data');
//     } finally {
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };

//   const calculateSleepDuration = () => {
//     if (formData.bedTime && formData.wakeTime) {
//       const bedTime = new Date(`2000-01-01T${formData.bedTime}`);
//       const wakeTime = new Date(`2000-01-01T${formData.wakeTime}`);
      
//       if (wakeTime < bedTime) {
//         wakeTime.setDate(wakeTime.getDate() + 1);
//       }
      
//       const duration = (wakeTime - bedTime) / (1000 * 60 * 60);
//       setFormData(prev => ({ ...prev, sleepDuration: duration.toFixed(1) }));
//     }
//   };

//   return (
//     <div className="p-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Sleep Tracker</h2>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Log Your Sleep</h3>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Bed Time
//                 </label>
//                 <input
//                   type="time"
//                   value={formData.bedTime}
//                   onChange={(e) => {
//                     setFormData({ ...formData, bedTime: e.target.value });
//                     setTimeout(calculateSleepDuration, 100);
//                   }}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Wake Time
//                 </label>
//                 <input
//                   type="time"
//                   value={formData.wakeTime}
//                   onChange={(e) => {
//                     setFormData({ ...formData, wakeTime: e.target.value });
//                     setTimeout(calculateSleepDuration, 100);
//                   }}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Sleep Duration (hours)
//               </label>
//               <input
//                 type="number"
//                 step="0.1"
//                 min="0"
//                 max="24"
//                 required
//                 value={formData.sleepDuration}
//                 onChange={(e) => setFormData({ ...formData, sleepDuration: e.target.value })}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="e.g., 7.5"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Sleep Quality
//               </label>
//               <select
//                 value={formData.quality}
//                 onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="poor">Poor - Tossed and turned</option>
//                 <option value="fair">Fair - Woke up a few times</option>
//                 <option value="good">Good - Slept well</option>
//                 <option value="excellent">Excellent - Deep, restful sleep</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Notes (optional)
//               </label>
//               <textarea
//                 value={formData.notes}
//                 onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//                 rows="3"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Any dreams, interruptions, or how you felt upon waking..."
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover-lift transition-all duration-300"
//             >
//               Record Sleep Data
//             </button>
//           </form>
//         </div>

//         <div className="space-y-6">
//           <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
//             <h3 className="text-xl font-semibold text-blue-800 mb-4">Sleep Quality Indicators</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center p-3 bg-white rounded-lg">
//                 <span className="text-gray-700">Time to Fall Asleep</span>
//                 <span className="text-blue-600 font-semibold">&lt; 20 min</span>
//               </div>
//               <div className="flex justify-between items-center p-3 bg-white rounded-lg">
//                 <span className="text-gray-700">Wake-ups per Night</span>
//                 <span className="text-blue-600 font-semibold">&lt; 1 time</span>
//               </div>
//               <div className="flex justify-between items-center p-3 bg-white rounded-lg">
//                 <span className="text-gray-700">Deep Sleep</span>
//                 <span className="text-blue-600 font-semibold">1.5-2 hours</span>
//               </div>
//               <div className="flex justify-between items-center p-3 bg-white rounded-lg">
//                 <span className="text-gray-700">REM Sleep</span>
//                 <span className="text-blue-600 font-semibold">1.5-2 hours</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
//             <h3 className="text-xl font-semibold text-purple-800 mb-3">Tonight's Sleep Tips</h3>
//             <ul className="space-y-2 text-purple-700">
//               <li>• Avoid screens 1 hour before bed</li>
//               <li>• Keep room temperature cool (65°F/18°C)</li>
//               <li>• Try deep breathing exercises</li>
//               <li>• Maintain consistent sleep schedule</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SleepTracker;