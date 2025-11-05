// import React, { useState, useEffect } from 'react';
// import { apiService } from '../../services/api';

// const OvulationTracker = () => {
//   const [ovulationData, setOvulationData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchOvulationData = async () => {
//     setLoading(true);
//     try {
//       const data = await apiService.getOvulationDates();
//       setOvulationData(data);
//     } catch (error) {
//       console.error('Error fetching ovulation data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOvulationData();
//   }, []);

//   return (
//     <div className="p-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Ovulation Prediction</h2>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="space-y-6">
//           <div className="bg-pink-50 rounded-2xl p-6 border-2 border-pink-200">
//             <h3 className="text-xl font-semibold text-pink-800 mb-3">Predicted Ovulation Window</h3>
//             {loading ? (
//               <p className="text-gray-600">Loading prediction data...</p>
//             ) : ovulationData ? (
//               <div className="space-y-2">
//                 <p><strong>Fertile Window:</strong> {ovulationData.fertileWindow}</p>
//                 <p><strong>Ovulation Date:</strong> {ovulationData.ovulationDate}</p>
//                 <p><strong>Next Period:</strong> {ovulationData.nextPeriod}</p>
//               </div>
//             ) : (
//               <p className="text-gray-600">No cycle data available for prediction. Start tracking your cycle!</p>
//             )}
//           </div>

//           <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
//             <h3 className="text-xl font-semibold text-blue-800 mb-3">Fertility Tips</h3>
//             <ul className="space-y-2 text-blue-700">
//               <li>• Track basal body temperature daily</li>
//               <li>• Monitor cervical mucus changes</li>
//               <li>• Use ovulation predictor kits</li>
//               <li>• Maintain a healthy lifestyle</li>
//             </ul>
//           </div>
//         </div>

//         <div className="bg-gray-50 rounded-2xl p-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Understanding Ovulation</h3>
//           <div className="prose text-gray-600">
//             <p>Ovulation typically occurs about 14 days before your next period starts. However, this can vary based on your cycle length and individual patterns.</p>
            
//             <h4 className="font-semibold text-gray-800 mt-4">Signs of Ovulation:</h4>
//             <ul className="list-disc list-inside space-y-1">
//               <li>Mild pelvic or lower abdominal pain</li>
//               <li>Light spotting or discharge</li>
//               <li>Breast tenderness</li>
//               <li>Increased sex drive</li>
//               <li>Changes in cervical mucus</li>
//             </ul>

//             <h4 className="font-semibold text-gray-800 mt-4">Tracking Methods:</h4>
//             <ul className="list-disc list-inside space-y-1">
//               <li>Calendar tracking</li>
//               <li>Basal body temperature charting</li>
//               <li>Cervical mucus monitoring</li>
//               <li>Ovulation predictor kits</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OvulationTracker;
// // import React, { useState } from 'react';
// // import { apiService } from '../../services/api';
// // import { useApp } from '../../contexts/AppContext';
// // import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
// // import Button from '../../components/ui/Button';

// // const OvulationTracker = () => {
// //   const { dispatch } = useApp();
// //   const [formData, setFormData] = useState({
// //     lhLevel: '',
// //     bbt: '',
// //     cervicalMucus: '',
// //     cervixPosition: '',
// //     ovulationPain: false,
// //     libido: 'normal',
// //     testResult: 'negative',
// //     confidence: 'medium',
// //     notes: ''
// //   });

// //   const cervicalMucusTypes = [
// //     { value: 'dry', label: 'Dry', description: 'No discharge', icon: '🏜️' },
// //     { value: 'sticky', label: 'Sticky', description: 'Tacky, paste-like', icon: '🍯' },
// //     { value: 'creamy', label: 'Creamy', description: 'Lotion-like', icon: '🥛' },
// //     { value: 'egg-white', label: 'Egg White', description: 'Stretchy, clear', icon: '🥚' },
// //     { value: 'watery', label: 'Watery', description: 'Wet, slippery', icon: '💧' }
// //   ];

// //   const cervixPositions = [
// //     { value: 'low', label: 'Low', description: 'Easy to reach', icon: '⬇️' },
// //     { value: 'medium', label: 'Medium', description: 'Moderate reach', icon: '↔️' },
// //     { value: 'high', label: 'High', description: 'Hard to reach', icon: '⬆️' }
// //   ];

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       dispatch({ type: 'SET_LOADING', payload: true });
// //       const result = await apiService.logOvulationData({
// //         ...formData,
// //         lhLevel: formData.lhLevel ? parseInt(formData.lhLevel) : null,
// //         bbt: formData.bbt ? parseFloat(formData.bbt) : null,
// //         ovulationPain: formData.ovulationPain
// //       });
      
// //       dispatch({
// //         type: 'SET_NOTIFICATION',
// //         payload: {
// //           id: Date.now(),
// //           type: 'success',
// //           message: '✨ Ovulation data recorded! Your fertile window is being analyzed.',
// //           duration: 5000
// //         }
// //       });
      
// //       setFormData({
// //         lhLevel: '',
// //         bbt: '',
// //         cervicalMucus: '',
// //         cervixPosition: '',
// //         ovulationPain: false,
// //         libido: 'normal',
// //         testResult: 'negative',
// //         confidence: 'medium',
// //         notes: ''
// //       });
// //     } catch (error) {
// //       dispatch({
// //         type: 'SET_NOTIFICATION',
// //         payload: {
// //           id: Date.now(),
// //           type: 'error',
// //           message: 'Unable to record ovulation data. Please try again.',
// //           duration: 5000
// //         }
// //       });
// //     } finally {
// //       dispatch({ type: 'SET_LOADING', payload: false });
// //     }
// //   };

// //   return (
// //     <div className="max-w-4xl mx-auto p-6">
// //       {/* Royal Header */}
// //       <div className="text-center mb-8">
// //         <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
// //           <span className="text-3xl text-white">📊</span>
// //         </div>
// //         <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
// //           Royal Ovulation Tracker
// //         </h1>
// //         <p className="text-gray-600 text-lg">
// //           Track your fertile window with precision and royal insight
// //         </p>
// //       </div>

// //       <Card hover glow className="backdrop-blur-sm">
// //         <CardContent>
// //           <form onSubmit={handleSubmit} className="space-y-8">
// //             {/* Test Results & BBT */}
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   LH Test Result
// //                 </label>
// //                 <select
// //                   value={formData.testResult}
// //                   onChange={(e) => setFormData({ ...formData, testResult: e.target.value })}
// //                   className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300"
// //                 >
// //                   <option value="negative">Negative</option>
// //                   <option value="positive">Positive</option>
// //                   <option value="high-positive">High Positive</option>
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   LH Level (mIU/mL)
// //                 </label>
// //                 <div className="relative">
// //                   <input
// //                     type="number"
// //                     step="0.1"
// //                     value={formData.lhLevel}
// //                     onChange={(e) => setFormData({ ...formData, lhLevel: e.target.value })}
// //                     className="w-full px-4 py-3 pl-12 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300"
// //                     placeholder="0.0"
// //                   />
// //                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
// //                     📈
// //                   </div>
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   BBT (°C)
// //                 </label>
// //                 <div className="relative">
// //                   <input
// //                     type="number"
// //                     step="0.01"
// //                     value={formData.bbt}
// //                     onChange={(e) => setFormData({ ...formData, bbt: e.target.value })}
// //                     className="w-full px-4 py-3 pl-12 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300"
// //                     placeholder="36.50"
// //                   />
// //                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
// //                     🌡️
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Cervical Mucus */}
// //             <div>
// //               <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
// //                 <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 text-white text-sm">💧</span>
// //                 Cervical Mucus Quality
// //               </label>
// //               <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
// //                 {cervicalMucusTypes.map(type => (
// //                   <button
// //                     key={type.value}
// //                     type="button"
// //                     onClick={() => setFormData({ ...formData, cervicalMucus: type.value })}
// //                     className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
// //                       formData.cervicalMucus === type.value
// //                         ? 'border-purple-500 bg-purple-500/10 text-purple-600 shadow-lg'
// //                         : 'border-gray-200 bg-white/80 text-gray-700 hover:border-purple-300'
// //                     }`}
// //                   >
// //                     <div className="text-2xl mb-2">{type.icon}</div>
// //                     <div className="font-medium text-sm mb-1">{type.label}</div>
// //                     <div className="text-xs text-gray-500">{type.description}</div>
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Cervix Position & Libido */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-3">
// //                   Cervix Position
// //                 </label>
// //                 <div className="space-y-3">
// //                   {cervixPositions.map(position => (
// //                     <button
// //                       key={position.value}
// //                       type="button"
// //                       onClick={() => setFormData({ ...formData, cervixPosition: position.value })}
// //                       className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-left ${
// //                         formData.cervixPosition === position.value
// //                           ? 'border-purple-500 bg-purple-500/10 text-purple-600 shadow-md'
// //                           : 'border-gray-200 bg-white/80 text-gray-700 hover:border-purple-300'
// //                       }`}
// //                     >
// //                       <div className="flex items-center space-x-3">
// //                         <span className="text-xl">{position.icon}</span>
// //                         <div>
// //                           <div className="font-medium">{position.label}</div>
// //                           <div className="text-sm text-gray-500">{position.description}</div>
// //                         </div>
// //                       </div>
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>

// //               <div className="space-y-6">
// //                 <div>
// //                   <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                     Libido Level
// //                   </label>
// //                   <select
// //                     value={formData.libido}
// //                     onChange={(e) => setFormData({ ...formData, libido: e.target.value })}
// //                     className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300"
// //                   >
// //                     <option value="low">Low</option>
// //                     <option value="normal">Normal</option>
// //                     <option value="high">High</option>
// //                     <option value="very-high">Very High</option>
// //                   </select>
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                     Prediction Confidence
// //                   </label>
// //                   <select
// //                     value={formData.confidence}
// //                     onChange={(e) => setFormData({ ...formData, confidence: e.target.value })}
// //                     className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300"
// //                   >
// //                     <option value="low">Low</option>
// //                     <option value="medium">Medium</option>
// //                     <option value="high">High</option>
// //                     <option value="very-high">Very High</option>
// //                   </select>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Ovulation Pain */}
// //             <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/80 hover:bg-white transition-all duration-300">
// //               <div>
// //                 <div className="font-semibold text-gray-800">Ovulation Pain (Mittelschmerz)</div>
// //                 <div className="text-sm text-gray-600">Experience any mid-cycle pain?</div>
// //               </div>
// //               <label className="relative cursor-pointer">
// //                 <input
// //                   type="checkbox"
// //                   checked={formData.ovulationPain}
// //                   onChange={(e) => setFormData({ ...formData, ovulationPain: e.target.checked })}
// //                   className="sr-only"
// //                 />
// //                 <div className={`w-12 h-6 rounded-full transition-all duration-300 ${
// //                   formData.ovulationPain ? 'bg-purple-500' : 'bg-gray-300'
// //                 }`}></div>
// //                 <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
// //                   formData.ovulationPain ? 'transform translate-x-6' : ''
// //                 }`}></div>
// //               </label>
// //             </div>

// //             {/* Notes */}
// //             <div>
// //               <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
// //                 <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 text-white text-sm">📝</span>
// //                 Royal Observations
// //               </label>
// //               <textarea
// //                 value={formData.notes}
// //                 onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
// //                 rows="4"
// //                 className="w-full px-6 py-4 bg-white/80 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300 text-lg resize-none"
// //                 placeholder="Any additional observations, feelings, or notes about your ovulation signs..."
// //               />
// //             </div>

// //             {/* Fertility Insights */}
// //             <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
// //               <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
// //                 <span className="mr-2">💡</span>
// //                 Fertility Insights
// //               </h3>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700">
// //                 <div className="flex items-center space-x-2">
// //                   <span className="text-purple-500">✓</span>
// //                   <span>Egg-white mucus indicates peak fertility</span>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <span className="text-purple-500">✓</span>
// //                   <span>BBT rise confirms ovulation occurred</span>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <span className="text-purple-500">✓</span>
// //                   <span>LH surge precedes ovulation by 24-36 hours</span>
// //                 </div>
// //                 <div className="flex items-center space-x-2">
// //                   <span className="text-purple-500">✓</span>
// //                   <span>High cervix = fertile window</span>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Submit Button */}
// //             <Button
// //               type="submit"
// //               variant="primary"
// //               size="large"
// //               className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
// //               icon="📊"
// //             >
// //               Record Ovulation Data
// //             </Button>
// //           </form>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default OvulationTracker;