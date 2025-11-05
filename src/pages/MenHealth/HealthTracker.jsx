


// import React, { useState } from 'react';
// import { apiService } from '../../services/api';
// import { useApp } from '../../contexts/AppContext';
// import Button from '../ui/Button';

// const MenHealthTracker = () => {
//   const { dispatch, state } = useApp();
//   const [formData, setFormData] = useState({
//     stressLevel: 5,
//     sleepHours: 7,
//     workoutDays: 3,
//     age: '',
//     prostateCheck: false,
//     testosteroneLevel: '',
//     sexualHealthConcerns: '',
//     energyLevel: 5,
//     notes: ''
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch({ type: 'SET_LOADING', payload: true });

//       const menHealthData = {
//         stressLevel: parseInt(formData.stressLevel),
//         sleepHours: parseFloat(formData.sleepHours),
//         workoutDays: parseInt(formData.workoutDays),
//         age: formData.age ? parseInt(formData.age) : undefined,
//         prostateCheck: formData.prostateCheck,
//         testosteroneLevel: formData.testosteroneLevel ? parseFloat(formData.testosteroneLevel) : undefined,
//         sexualHealthConcerns: formData.sexualHealthConcerns,
//         energyLevel: parseInt(formData.energyLevel),
//         notes: formData.notes
//       };

//       const result = await apiService.createMenHealthRecord(menHealthData);

//       if (result.success) {
//         alert('Men health record created successfully!');
//         setFormData({
//           stressLevel: 5,
//           sleepHours: 7,
//           workoutDays: 3,
//           age: '',
//           prostateCheck: false,
//           testosteroneLevel: '',
//           sexualHealthConcerns: '',
//           energyLevel: 5,
//           notes: ''
//         });
//       }
//     } catch (error) {
//       console.error('Error creating men health record:', error);
//       const errorMessage = error.response?.data?.message || 'Error creating health record';
//       alert(errorMessage);
//     } finally {
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-#F5F5F5 rounded-2xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-#2E3A59 mb-6">Men's Health Tracking</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Stress Level & Sleep Hours */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-#2E3A59 mb-2">
//               Stress Level: <span className="text-#1ABC9C">{formData.stressLevel}/10</span>
//             </label>
//             <input
//               type="range"
//               min="1"
//               max="10"
//               value={formData.stressLevel}
//               onChange={(e) => setFormData({ ...formData, stressLevel: e.target.value })}
//               className="w-full accent-#1ABC9C"
//             />
//             <div className="flex justify-between text-xs text-#2E3A59 mt-1">
//               <span>Low</span>
//               <span>High</span>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-#2E3A59 mb-2">
//               Sleep Hours
//             </label>
//             <input
//               type="number"
//               step="0.5"
//               min="0"
//               max="24"
//               value={formData.sleepHours}
//               onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
//               className="w-full px-4 py-3 border border-#2E3A59 rounded-lg focus:ring-2 focus:ring-#2979FF focus:border-transparent"
//               placeholder="7.5"
//             />
//           </div>
//         </div>

//         {/* Workout Days & Age */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-#2E3A59 mb-2">
//               Workout Days
//             </label>
//             <input
//               type="number"
//               min="0"
//               max="7"
//               value={formData.workoutDays}
//               onChange={(e) => setFormData({ ...formData, workoutDays: e.target.value })}
//               className="w-full px-4 py-3 border border-#2E3A59 rounded-lg focus:ring-2 focus:ring-#2979FF focus:border-transparent"
//               placeholder="3"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-#2E3A59 mb-2">
//               Age (optional)
//             </label>
//             <input
//               type="number"
//               min="18"
//               max="100"
//               value={formData.age}
//               onChange={(e) => setFormData({ ...formData, age: e.target.value })}
//               className="w-full px-4 py-3 border border-#2E3A59 rounded-lg focus:ring-2 focus:ring-#2979FF focus:border-transparent"
//               placeholder="30"
//             />
//           </div>
//         </div>

//         {/* Energy Level & Testosterone */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-#2E3A59 mb-2">
//               Energy Level: <span className="text-#1ABC9C">{formData.energyLevel}/10</span>
//             </label>
//             <input
//               type="range"
//               min="1"
//               max="10"
//               value={formData.energyLevel}
//               onChange={(e) => setFormData({ ...formData, energyLevel: e.target.value })}
//               className="w-full accent-#1ABC9C"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-#2E3A59 mb-2">
//               Testosterone Level (optional)
//             </label>
//             <input
//               type="number"
//               step="0.1"
//               min="0"
//               value={formData.testosteroneLevel}
//               onChange={(e) => setFormData({ ...formData, testosteroneLevel: e.target.value })}
//               className="w-full px-4 py-3 border border-#2E3A59 rounded-lg focus:ring-2 focus:ring-#2979FF focus:border-transparent"
//               placeholder="6.5 ng/mL"
//             />
//           </div>
//         </div>

//         {/* Prostate Check */}
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             id="prostateCheck"
//             checked={formData.prostateCheck}
//             onChange={(e) => setFormData({ ...formData, prostateCheck: e.target.checked })}
//             className="accent-#FF6B6B mr-3"
//           />
//           <label htmlFor="prostateCheck" className="text-#2E3A59 font-medium">
//             Had Prostate Check This Year
//           </label>
//         </div>

//         {/* Sexual Health & Notes */}
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-#2E3A59 mb-2">Sexual Health Concerns</label>
//             <textarea
//               value={formData.sexualHealthConcerns}
//               onChange={(e) => setFormData({ ...formData, sexualHealthConcerns: e.target.value })}
//               className="w-full px-4 py-3 border border-#2E3A59 rounded-lg focus:ring-2 focus:ring-#2979FF focus:border-transparent"
//               placeholder="Describe any concerns..."
//               rows={3}
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-#2E3A59 mb-2">Additional Notes</label>
//             <textarea
//               value={formData.notes}
//               onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//               className="w-full px-4 py-3 border border-#2E3A59 rounded-lg focus:ring-2 focus:ring-#2979FF focus:border-transparent"
//               placeholder="Any other info..."
//               rows={3}
//             />
//           </div>
//         </div>

//         <Button
//           type="submit"
//           variant="primary"
//           className="w-full bg-#2979FF hover:bg-#1ABC9C text-white mt-4"
//           icon="✅"
//         >
//           Submit Health Data
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default MenHealthTracker;
