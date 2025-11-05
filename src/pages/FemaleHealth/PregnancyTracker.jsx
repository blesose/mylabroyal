// import React from 'react';
// import PregnancyForm from '../../components/forms/PregnancyForm';

// const PregnancyTracker = () => {
//   const pregnancyMilestones = [
//     { week: '4-7', milestone: 'Positive pregnancy test, missed period' },
//     { week: '8-12', milestone: 'First ultrasound, hearing heartbeat' },
//     { week: '13-16', milestone: 'Second trimester begins, reduced nausea' },
//     { week: '17-20', milestone: 'Feeling baby movements, anatomy scan' },
//     { week: '21-24', milestone: 'Viability milestone, active movements' },
//     { week: '25-28', milestone: 'Gestational diabetes test, rapid growth' },
//     { week: '29-32', milestone: 'Third trimester, frequent movements' },
//     { week: '33-36', milestone: 'Baby positioning, breathing practice' },
//     { week: '37-40', milestone: 'Full term, ready for delivery' }
//   ];

//   return (
//     <div className="p-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Pregnancy Progress Tracker</h2>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div>
//           <div className="bg-purple-50 rounded-2xl p-6 mb-6 border-2 border-purple-200">
//             <h3 className="text-xl font-semibold text-purple-800 mb-4">Log Your Pregnancy Progress</h3>
//             <PregnancyForm />
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div className="bg-white rounded-2xl p-6 border-2 border-pink-200">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Pregnancy Milestones</h3>
//             <div className="space-y-3">
//               {pregnancyMilestones.map((milestone, index) => (
//                 <div key={index} className="flex items-start space-x-3 p-3 bg-pink-50 rounded-lg">
//                   <div className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold min-w-16 text-center">
//                     Week {milestone.week}
//                   </div>
//                   <span className="text-gray-700">{milestone.milestone}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
//             <h3 className="text-xl font-semibold text-blue-800 mb-3">Important Reminders</h3>
//             <ul className="space-y-2 text-blue-700">
//               <li>• Take prenatal vitamins daily</li>
//               <li>• Stay hydrated and eat balanced meals</li>
//               <li>• Attend all prenatal appointments</li>
//               <li>• Monitor baby movements daily</li>
//               <li>• Know signs of preterm labor</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PregnancyTracker;
// // import React, { useState } from 'react';
// // import { apiService } from '../../services/api';
// // import { useApp } from '../../contexts/AppContext';
// // import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
// // import Button from '../../components/ui/Button';

// // const PregnancyTracker = () => {
// //   const { dispatch } = useApp();
// //   const [formData, setFormData] = useState({
// //     week: '',
// //     day: '',
// //     weight: '',
// //     bloodPressure: '',
// //     fetalMovement: 'normal',
// //     symptoms: [],
// //     mood: 'happy',
// //     cravings: [],
// //     notes: '',
// //     doctorVisit: false,
// //     ultrasound: ''
// //   });

// //   const pregnancySymptoms = [
// //     'Morning Sickness', 'Fatigue', 'Food Cravings', 'Back Pain', 
// //     'Mood Swings', 'Heartburn', 'Swelling', 'Insomnia', 'Braxton Hicks',
// //     'Shortness of Breath', 'Frequent Urination', 'Breast Tenderness'
// //   ];

// //   const commonCravings = [
// //     'Chocolate', 'Pickles', 'Ice Cream', 'Fruits', 'Salty Foods',
// //     'Spicy Foods', 'Carbs', 'Dairy', 'Meat', 'Vegetables', 'None'
// //   ];

// //   const moods = [
// //     { value: 'excited', emoji: '🎉', label: 'Excited', color: 'from-yellow-400 to-orange-400' },
// //     { value: 'happy', emoji: '😊', label: 'Happy', color: 'from-green-400 to-emerald-400' },
// //     { value: 'calm', emoji: '😌', label: 'Calm', color: 'from-blue-400 to-cyan-400' },
// //     { value: 'anxious', emoji: '😰', label: 'Anxious', color: 'from-orange-400 to-red-400' },
// //     { value: 'emotional', emoji: '🥲', label: 'Emotional', color: 'from-pink-400 to-rose-400' },
// //     { value: 'tired', emoji: '😴', label: 'Tired', color: 'from-purple-400 to-indigo-400' }
// //   ];

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       dispatch({ type: 'SET_LOADING', payload: true });
// //       const result = await apiService.logPregnancy({
// //         ...formData,
// //         week: parseInt(formData.week),
// //         day: parseInt(formData.day),
// //         weight: formData.weight ? parseFloat(formData.weight) : null
// //       });
      
// //       dispatch({
// //         type: 'SET_NOTIFICATION',
// //         payload: {
// //           id: Date.now(),
// //           type: 'success',
// //           message: '👑 Pregnancy progress recorded! Your royal journey continues beautifully.',
// //           duration: 5000
// //         }
// //       });
      
// //       setFormData({
// //         week: '',
// //         day: '',
// //         weight: '',
// //         bloodPressure: '',
// //         fetalMovement: 'normal',
// //         symptoms: [],
// //         mood: 'happy',
// //         cravings: [],
// //         notes: '',
// //         doctorVisit: false,
// //         ultrasound: ''
// //       });
// //     } catch (error) {
// //       dispatch({
// //         type: 'SET_NOTIFICATION',
// //         payload: {
// //           id: Date.now(),
// //           type: 'error',
// //           message: 'Unable to record pregnancy data. Please try again.',
// //           duration: 5000
// //         }
// //       });
// //     } finally {
// //       dispatch({ type: 'SET_LOADING', payload: false });
// //     }
// //   };

// //   const toggleSymptom = (symptom) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       symptoms: prev.symptoms.includes(symptom)
// //         ? prev.symptoms.filter(s => s !== symptom)
// //         : [...prev.symptoms, symptom]
// //     }));
// //   };

// //   const toggleCraving = (craving) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       cravings: prev.cravings.includes(craving)
// //         ? prev.cravings.filter(c => c !== craving)
// //         : [...prev.cravings, craving]
// //     }));
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-6">
// //       {/* Royal Header */}
// //       <div className="text-center mb-8">
// //         <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
// //           <span className="text-3xl text-white">🤰</span>
// //         </div>
// //         <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-3">
// //           Royal Pregnancy Journal
// //         </h1>
// //         <p className="text-gray-600 text-lg">
// //           Document your magnificent pregnancy journey with elegance and care
// //         </p>
// //       </div>

// //       <Card hover glow className="backdrop-blur-sm">
// //         <CardContent>
// //           <form onSubmit={handleSubmit} className="space-y-8">
// //             {/* Pregnancy Progress */}
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   Week of Pregnancy
// //                 </label>
// //                 <div className="relative">
// //                   <input
// //                     type="number"
// //                     min="1"
// //                     max="42"
// //                     required
// //                     value={formData.week}
// //                     onChange={(e) => setFormData({ ...formData, week: e.target.value })}
// //                     className="w-full px-4 py-3 pl-12 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-300"
// //                     placeholder="Current week"
// //                   />
// //                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
// //                     📅
// //                   </div>
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   Day of Week
// //                 </label>
// //                 <select
// //                   value={formData.day}
// //                   onChange={(e) => setFormData({ ...formData, day: e.target.value })}
// //                   className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-300"
// //                 >
// //                   {Array.from({ length: 7 }, (_, i) => (
// //                     <option key={i + 1} value={i + 1}>Day {i + 1}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   Weight (kg)
// //                 </label>
// //                 <div className="relative">
// //                   <input
// //                     type="number"
// //                     step="0.1"
// //                     value={formData.weight}
// //                     onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
// //                     className="w-full px-4 py-3 pl-12 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-300"
// //                     placeholder="Current weight"
// //                   />
// //                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
// //                     ⚖️
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Health Metrics */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   Blood Pressure
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={formData.bloodPressure}
// //                   onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
// //                   className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-300"
// //                   placeholder="e.g., 120/80"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   Fetal Movement
// //                 </label>
// //                 <select
// //                   value={formData.fetalMovement}
// //                   onChange={(e) => setFormData({ ...formData, fetalMovement: e.target.value })}
// //                   className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-300"
// //                 >
// //                   <option value="less">Less than usual</option>
// //                   <option value="normal">Normal</option>
// //                   <option value="more">More than usual</option>
// //                   <option value="active">Very active</option>
// //                 </select>
// //               </div>
// //             </div>

// //             {/* Mood Selection */}
// //             <div>
// //               <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
// //                 <span className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 text-white text-sm">💖</span>
// //                 Royal Mood Today
// //               </label>
// //               <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
// //                 {moods.map(mood => (
// //                   <button
// //                     key={mood.value}
// //                     type="button"
// //                     onClick={() => setFormData({ ...formData, mood: mood.value })}
// //                     className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
// //                       formData.mood === mood.value
// //                         ? `border-rose-500 bg-gradient-to-r ${mood.color} text-white shadow-xl`
// //                         : 'border-gray-200 bg-white/80 hover:border-rose-300'
// //                     }`}
// //                   >
// //                     <div className="text-2xl mb-1">{mood.emoji}</div>
// //                     <div className="text-xs font-medium">{mood.label}</div>
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Symptoms */}
// //             <div>
// //               <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
// //                 <span className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 text-white text-sm">🤒</span>
// //                 Pregnancy Symptoms
// //               </label>
// //               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
// //                 {pregnancySymptoms.map(symptom => (
// //                   <button
// //                     key={symptom}
// //                     type="button"
// //                     onClick={() => toggleSymptom(symptom)}
// //                     className={`p-3 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${
// //                       formData.symptoms.includes(symptom)
// //                         ? 'border-rose-500 bg-rose-500/10 text-rose-600 shadow-md'
// //                         : 'border-gray-200 bg-white/80 text-gray-700 hover:border-rose-300'
// //                     }`}
// //                   >
// //                     {symptom}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Cravings */}
// //             <div>
// //               <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
// //                 <span className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 text-white text-sm">🍽️</span>
// //                 Food Cravings & Aversions
// //               </label>
// //               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
// //                 {commonCravings.map(craving => (
// //                   <button
// //                     key={craving}
// //                     type="button"
// //                     onClick={() => toggleCraving(craving)}
// //                     className={`p-3 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${
// //                       formData.cravings.includes(craving)
// //                         ? 'border-rose-500 bg-rose-500/10 text-rose-600 shadow-md'
// //                         : 'border-gray-200 bg-white/80 text-gray-700 hover:border-rose-300'
// //                     }`}
// //                   >
// //                     {craving}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Medical Appointments */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/80 hover:bg-white transition-all duration-300">
// //                 <div>
// //                   <div className="font-semibold text-gray-800">Doctor Visit Today</div>
// //                   <div className="text-sm text-gray-600">Had a medical appointment?</div>
// //                 </div>
// //                 <label className="relative cursor-pointer">
// //                   <input
// //                     type="checkbox"
// //                     checked={formData.doctorVisit}
// //                     onChange={(e) => setFormData({ ...formData, doctorVisit: e.target.checked })}
// //                     className="sr-only"
// //                   />
// //                   <div className={`w-12 h-6 rounded-full transition-all duration-300 ${
// //                     formData.doctorVisit ? 'bg-rose-500' : 'bg-gray-300'
// //                   }`}></div>
// //                   <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
// //                     formData.doctorVisit ? 'transform translate-x-6' : ''
// //                   }`}></div>
// //                 </label>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   Ultrasound Notes
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={formData.ultrasound}
// //                   onChange={(e) => setFormData({ ...formData, ultrasound: e.target.value })}
// //                   className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-300"
// //                   placeholder="Ultrasound findings or notes"
// //                 />
// //               </div>
// //             </div>

// //             {/* Notes */}
// //             <div>
// //               <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
// //                 <span className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 text-white text-sm">📝</span>
// //                 Royal Pregnancy Journal
// //               </label>
// //               <textarea
// //                 value={formData.notes}
// //                 onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
// //                 rows="5"
// //                 className="w-full px-6 py-4 bg-white/80 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-300 text-lg resize-none"
// //                 placeholder="Share your thoughts, feelings, special moments, baby movements, or any notes about this magnificent pregnancy week..."
// //               />
// //             </div>

// //             {/* Pregnancy Tips */}
// //             <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-200">
// //               <h3 className="text-lg font-semibold text-rose-800 mb-3 flex items-center">
// //                 <span className="mr-2">💡</span>
// //                 Royal Pregnancy Tips
// //               </h3>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-rose-700">
// //                 <div className="flex items-center space-x-2">
// //                   <span className="text-rose-500">👑</span>
// //                   <span>Stay hydrated - drink plenty of water</span>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <span className="text-rose-500">👑</span>
// //                   <span>Rest when your body needs it</span>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <span className="text-rose-500">👑</span>
// //                   <span>Eat small, frequent meals</span>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <span className="text-rose-500">👑</span>
// //                   <span>Monitor baby movements daily</span>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Submit Button */}
// //             <Button
// //               type="submit"
// //               variant="primary"
// //               size="large"
// //               className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
// //               icon="🤰"
// //             >
// //               Document Royal Pregnancy Progress
// //             </Button>
// //           </form>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default PregnancyTracker;