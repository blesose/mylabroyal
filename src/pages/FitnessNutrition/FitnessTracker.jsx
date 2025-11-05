// import React, { useState } from 'react';
// import { apiService } from '../../services/api';
// import { useApp } from '../../contexts/AppContext';

// const FitnessTracker = () => {
//   const { dispatch } = useApp();
//   const [formData, setFormData] = useState({
//     activity: '',
//     duration: '',
//     intensity: 'medium',
//     caloriesBurned: '',
//     notes: ''
//   });

//   const activityTypes = [
//     { category: 'Cardio', activities: ['walking', 'running', 'cycling', 'swimming', 'elliptical', 'rowing'] },
//     { category: 'Strength', activities: ['weight-lifting', 'bodyweight', 'resistance-bands', 'kettlebell', 'crossfit'] },
//     { category: 'Flexibility', activities: ['yoga', 'pilates', 'stretching', 'tai-chi'] },
//     { category: 'Sports', activities: ['basketball', 'soccer', 'tennis', 'dancing', 'hiking'] }
//   ];

//   const intensityLevels = [
//     { value: 'light', label: 'Light - Easy breathing, can sing' },
//     { value: 'moderate', label: 'Moderate - Can talk but not sing' },
//     { value: 'vigorous', label: 'Vigorous - Hard to say more than few words' }
//   ];

//   const calculateCalories = (activity, duration, intensity) => {
//     const baseRates = {
//       walking: 4, running: 10, cycling: 8, swimming: 9, 
//       'weight-lifting': 5, yoga: 3, stretching: 2
//     };
    
//     const intensityMultipliers = { light: 0.7, moderate: 1, vigorous: 1.3 };
//     const baseRate = baseRates[activity] || 5;
//     const multiplier = intensityMultipliers[intensity] || 1;
    
//     return Math.round(baseRate * (duration / 60) * multiplier * 10) / 10;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch({ type: 'SET_LOADING', payload: true });
//       const result = await apiService.addFitnessNutrition({
//         activity: formData.activity,
//         duration: parseInt(formData.duration),
//         mealType: 'exercise'
//       });
//       alert('Fitness activity logged successfully!');
//       setFormData({
//         activity: '',
//         duration: '',
//         intensity: 'medium',
//         caloriesBurned: '',
//         notes: ''
//       });
//     } catch (error) {
//       alert('Error logging fitness activity');
//     } finally {
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };

//   const updateCalories = () => {
//     if (formData.activity && formData.duration && formData.intensity) {
//       const calories = calculateCalories(formData.activity, formData.duration, formData.intensity);
//       setFormData(prev => ({ ...prev, caloriesBurned: calories }));
//     }
//   };

//   React.useEffect(() => {
//     updateCalories();
//   }, [formData.activity, formData.duration, formData.intensity]);

//   const weeklyGoals = {
//     cardio: '150 minutes moderate or 75 minutes vigorous',
//     strength: '2+ days per week targeting major muscle groups',
//     flexibility: 'Daily stretching or 2-3 yoga sessions weekly'
//   };

//   return (
//     <div className="p-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Fitness Tracker</h2>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Log Workout</h3>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Activity Type
//                 </label>
//                 <select
//                   value={formData.activity}
//                   onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   required
//                 >
//                   <option value="">Select activity</option>
//                   {activityTypes.map(category => (
//                     <optgroup key={category.category} label={category.category}>
//                       {category.activities.map(activity => (
//                         <option key={activity} value={activity}>
//                           {activity.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
//                         </option>
//                       ))}
//                     </optgroup>
//                   ))}
//                 </select>
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Duration (minutes)
//                   </label>
//                   <input
//                     type="number"
//                     min="1"
//                     max="480"
//                     required
//                     value={formData.duration}
//                     onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     placeholder="e.g., 30"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Intensity
//                   </label>
//                   <select
//                     value={formData.intensity}
//                     onChange={(e) => setFormData({ ...formData, intensity: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   >
//                     {intensityLevels.map(level => (
//                       <option key={level.value} value={level.value}>
//                         {level.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Estimated Calories Burned
//                 </label>
//                 <input
//                   type="number"
//                   readOnly
//                   value={formData.caloriesBurned}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
//                   placeholder="Auto-calculated"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Notes (optional)
//                 </label>
//                 <textarea
//                   value={formData.notes}
//                   onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//                   rows="3"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="How did you feel? Any achievements or challenges?"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold hover-lift transition-all duration-300"
//               >
//                 Log Workout
//               </button>
//             </form>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Weekly Goals</h3>
//             <div className="space-y-4">
//               {Object.entries(weeklyGoals).map(([type, goal]) => (
//                 <div key={type} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
//                   <h4 className="font-semibold text-green-800 mb-2 capitalize">{type}</h4>
//                   <p className="text-green-700 text-sm">{goal}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
//             <h3 className="text-xl font-semibold text-blue-800 mb-3">Fitness Benefits</h3>
//             <ul className="space-y-2 text-blue-700">
//               <li>• Improves cardiovascular health</li>
//               <li>• Strengthens muscles and bones</li>
//               <li>• Boosts mood and reduces stress</li>
//               <li>• Enhances sleep quality</li>
//               <li>• Increases energy levels</li>
//             </ul>
//           </div>

//           <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
//             <h3 className="text-xl font-semibold text-purple-800 mb-3">Activity Tips</h3>
//             <ul className="space-y-2 text-purple-700 text-sm">
//               <li>• Warm up for 5-10 minutes before exercise</li>
//               <li>• Stay hydrated during workouts</li>
//               <li>• Listen to your body and rest when needed</li>
//               <li>• Mix different types of activities</li>
//               <li>• Gradually increase intensity and duration</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FitnessTracker;
