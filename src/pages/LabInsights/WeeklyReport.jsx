// import React, { useState } from 'react';
// import { useApp } from '../../contexts/AppContext';
// import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
// import Button from '../../components/ui/Button';

// const WeeklyReport = () => {
//   const { state, dispatch } = useApp();
//   const [selectedWeek, setSelectedWeek] = useState('current');

//   const weeklyData = {
//     current: {
//       period: 'Dec 10 - Dec 16, 2024',
//       overallScore: 88,
//       sleep: { score: 85, trend: 5, hours: '7.2', consistency: '92%' },
//       activity: { score: 78, trend: 8, steps: '48,250', activeMinutes: '285' },
//       nutrition: { score: 88, trend: 3, calories: '12,950', protein: '85%' },
//       mental: { score: 82, trend: 2, stress: 'Low', mood: 'Stable' },
//       cycle: { score: 90, trend: 0, phase: 'Luteal', symptoms: 'Mild' }
//     },
//     previous: {
//       period: 'Dec 3 - Dec 9, 2024',
//       overallScore: 84,
//       sleep: { score: 82, trend: 2, hours: '6.9', consistency: '88%' },
//       activity: { score: 75, trend: 5, steps: '45,120', activeMinutes: '265' },
//       nutrition: { score: 85, trend: 1, calories: '13,200', protein: '82%' },
//       mental: { score: 80, trend: 0, stress: 'Medium', mood: 'Variable' },
//       cycle: { score: 90, trend: 0, phase: 'Follicular', symptoms: 'Minimal' }
//     }
//   };

//   const keyInsights = [
//     {
//       category: 'sleep',
//       title: 'Sleep Quality Improvement',
//       description: 'Your sleep efficiency increased by 5% this week, correlating with earlier bedtimes.',
//       impact: 'high',
//       recommendation: 'Maintain consistent 10:30 PM bedtime',
//       icon: '😴',
//       color: 'from-blue-500 to-cyan-500'
//     },
//     {
//       category: 'activity',
//       title: 'Activity Consistency',
//       description: 'Excellent workout consistency with 5 active days. Consider adding more variety.',
//       impact: 'medium',
//       recommendation: 'Include 1-2 yoga sessions for flexibility',
//       icon: '💪',
//       color: 'from-green-500 to-emerald-500'
//     },
//     {
//       category: 'nutrition',
//       title: 'Protein Optimization',
//       description: 'Protein intake reached optimal levels, supporting muscle recovery and energy.',
//       impact: 'high',
//       recommendation: 'Continue current protein distribution',
//       icon: '🍎',
//       color: 'from-orange-500 to-red-500'
//     },
//     {
//       category: 'mental',
//       title: 'Stress Management',
//       description: 'Stress levels decreased significantly. Meditation practice shows positive impact.',
//       impact: 'medium',
//       recommendation: 'Increase meditation to 15 minutes daily',
//       icon: '🧠',
//       color: 'from-purple-500 to-pink-500'
//     }
//   ];

//   const weeklyGoals = [
//     { goal: 'Complete 5 workouts', completed: true, progress: 100 },
//     { goal: 'Drink 2L water daily', completed: true, progress: 100 },
//     { goal: '7+ hours sleep', completed: false, progress: 85 },
//     { goal: 'Meditate 5 times', completed: true, progress: 100 },
//     { goal: 'Log all meals', completed: false, progress: 92 }
//   ];

//   const dailyBreakdown = [
//     { day: 'Mon', sleep: 7.1, activity: 85, nutrition: 90, mood: '😊' },
//     { day: 'Tue', sleep: 7.3, activity: 92, nutrition: 88, mood: '😄' },
//     { day: 'Wed', sleep: 6.8, activity: 78, nutrition: 85, mood: '😌' },
//     { day: 'Thu', sleep: 7.5, activity: 85, nutrition: 92, mood: '😊' },
//     { day: 'Fri', sleep: 7.0, activity: 88, nutrition: 86, mood: '😊' },
//     { day: 'Sat', sleep: 8.2, activity: 65, nutrition: 82, mood: '😴' },
//     { day: 'Sun', sleep: 7.4, activity: 70, nutrition: 88, mood: '😌' }
//   ];

//   const handleExport = (format) => {
//     dispatch({
//       type: 'SET_NOTIFICATION',
//       payload: {
//         id: Date.now(),
//         type: 'success',
//         message: `📄 ${format} report generated successfully!`,
//         duration: 4000
//       }
//     });
//   };

//   const getScoreColor = (score) => {
//     if (score >= 90) return 'from-green-500 to-emerald-500';
//     if (score >= 80) return 'from-blue-500 to-cyan-500';
//     if (score >= 70) return 'from-yellow-500 to-orange-500';
//     return 'from-red-500 to-pink-500';
//   };

//   const getTrendIcon = (trend) => {
//     if (trend > 0) return '↗️';
//     if (trend < 0) return '↘️';
//     return '➡️';
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
//           <span className="text-3xl text-white">📊</span>
//         </div>
//         <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
//           Royal Weekly Report
//         </h1>
//         <p className="text-gray-600 text-lg">
//           Comprehensive analysis of your wellness journey from {weeklyData[selectedWeek].period}
//         </p>
//       </div>

//       {/* Week Selection */}
//       <Card className="mb-8">
//         <CardContent>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <h2 className="text-xl font-semibold text-gray-800">Select Week:</h2>
//               <div className="flex space-x-2 bg-gray-100 rounded-2xl p-1">
//                 {['current', 'previous'].map((week) => (
//                   <button
//                     key={week}
//                     onClick={() => setSelectedWeek(week)}
//                     className={`px-6 py-2 rounded-xl transition-all duration-300 font-semibold capitalize ${
//                       selectedWeek === week
//                         ? 'bg-white text-purple-600 shadow-lg'
//                         : 'text-gray-600 hover:text-purple-600'
//                     }`}
//                   >
//                     {week} Week
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="flex space-x-3">
//               <Button variant="ghost" icon="📥" onClick={() => handleExport('PDF')}>
//                 PDF
//               </Button>
//               <Button variant="ghost" icon="📊" onClick={() => handleExport('CSV')}>
//                 CSV
//               </Button>
//               <Button variant="primary" icon="🖨️" className="bg-gradient-to-r from-purple-500 to-pink-500">
//                 Print
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//         {/* Left Column - Overview & Goals */}
//         <div className="xl:col-span-2 space-y-8">
//           {/* Overall Score */}
//           <Card hover glow>
//             <CardContent>
//               <div className="text-center">
//                 <div className={`w-32 h-32 bg-gradient-to-r ${getScoreColor(weeklyData[selectedWeek].overallScore)} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
//                   <div className="text-center text-white">
//                     <div className="text-3xl font-bold">{weeklyData[selectedWeek].overallScore}</div>
//                     <div className="text-sm">Overall Score</div>
//                   </div>
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                   Royal Wellness Summary
//                 </h2>
//                 <p className="text-gray-600 mb-6">
//                   {selectedWeek === 'current' ? 'Excellent progress this week!' : 'Solid performance last week.'} 
//                   Your consistency is paying off with noticeable improvements across multiple metrics.
//                 </p>
//                 <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                   {Object.entries(weeklyData[selectedWeek]).filter(([key]) => key !== 'overallScore' && key !== 'period').map(([category, data]) => (
//                     <div key={category} className="text-center p-3 rounded-xl bg-gray-50/80 hover:bg-white transition-all duration-300">
//                       <div className={`w-12 h-12 bg-gradient-to-r ${
//                         category === 'sleep' ? 'from-blue-500 to-cyan-500' :
//                         category === 'activity' ? 'from-green-500 to-emerald-500' :
//                         category === 'nutrition' ? 'from-orange-500 to-red-500' :
//                         category === 'mental' ? 'from-purple-500 to-pink-500' :
//                         'from-pink-500 to-rose-500'
//                       } rounded-xl flex items-center justify-center text-white mx-auto mb-2`}>
//                         <span className="text-lg">
//                           {category === 'sleep' ? '😴' : 
//                            category === 'activity' ? '💪' : 
//                            category === 'nutrition' ? '🍎' : 
//                            category === 'mental' ? '🧠' : '📅'}
//                         </span>
//                       </div>
//                       <div className="font-bold text-gray-800 text-lg">{data.score}</div>
//                       <div className="text-xs text-gray-500 capitalize">{category}</div>
//                       <div className={`text-xs font-semibold ${data.trend > 0 ? 'text-green-500' : data.trend < 0 ? 'text-red-500' : 'text-gray-500'}`}>
//                         {getTrendIcon(data.trend)} {Math.abs(data.trend)}%
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Key Insights */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Royal AI Insights</CardTitle>
//               <p className="text-gray-600">Personalized recommendations based on your weekly data</p>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-6">
//                 {keyInsights.map((insight, index) => (
//                   <div key={insight.title} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50/80 hover:bg-white transition-all duration-300 group">
//                     <div className={`w-12 h-12 bg-gradient-to-r ${insight.color} rounded-2xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
//                       <span className="text-lg">{insight.icon}</span>
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="font-semibold text-gray-800">{insight.title}</h4>
//                         <div className={`px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${
//                           insight.impact === 'high' ? 'from-green-500 to-emerald-500' :
//                           insight.impact === 'medium' ? 'from-yellow-500 to-orange-500' :
//                           'from-gray-500 to-gray-600'
//                         }`}>
//                           {insight.impact.toUpperCase()} IMPACT
//                         </div>
//                       </div>
//                       <p className="text-gray-600 text-sm mb-3 leading-relaxed">
//                         {insight.description}
//                       </p>
//                       <div className="flex items-center space-x-2 text-sm text-purple-600 bg-purple-50 px-3 py-2 rounded-lg">
//                         <span>💡</span>
//                         <span className="font-medium">{insight.recommendation}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Daily Breakdown */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Daily Performance</CardTitle>
//               <p className="text-gray-600">Your metrics throughout the week</p>
//             </CardHeader>
//             <CardContent>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b border-gray-200">
//                       <th className="text-left py-3 font-semibold text-gray-700">Day</th>
//                       <th className="text-center py-3 font-semibold text-gray-700">Sleep</th>
//                       <th className="text-center py-3 font-semibold text-gray-700">Activity</th>
//                       <th className="text-center py-3 font-semibold text-gray-700">Nutrition</th>
//                       <th className="text-center py-3 font-semibold text-gray-700">Mood</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {dailyBreakdown.map((day, index) => (
//                       <tr key={day.day} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
//                         <td className="py-3 font-medium text-gray-800">{day.day}</td>
//                         <td className="text-center py-3">
//                           <div className="flex items-center justify-center space-x-1">
//                             <span className="text-blue-500">😴</span>
//                             <span>{day.sleep}h</span>
//                           </div>
//                         </td>
//                         <td className="text-center py-3">
//                           <div className="flex items-center justify-center space-x-1">
//                             <span className="text-green-500">💪</span>
//                             <span>{day.activity}%</span>
//                           </div>
//                         </td>
//                         <td className="text-center py-3">
//                           <div className="flex items-center justify-center space-x-1">
//                             <span className="text-orange-500">🍎</span>
//                             <span>{day.nutrition}%</span>
//                           </div>
//                         </td>
//                         <td className="text-center py-3 text-2xl">
//                           {day.mood}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column - Goals & Details */}
//         <div className="space-y-8">
//           {/* Weekly Goals */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Weekly Goals Progress</CardTitle>
//               <p className="text-gray-600">Your achievement summary</p>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {weeklyGoals.map((goal, index) => (
//                   <div key={goal.goal} className="space-y-2">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-3">
//                         <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
//                           goal.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
//                         }`}>
//                           {goal.completed ? '✓' : '○'}
//                         </div>
//                         <span className={`font-medium ${goal.completed ? 'text-gray-800' : 'text-gray-600'}`}>
//                           {goal.goal}
//                         </span>
//                       </div>
//                       <span className="text-sm font-semibold text-gray-500">
//                         {goal.progress}%
//                       </span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div 
//                         className={`h-2 rounded-full transition-all duration-500 ${
//                           goal.completed ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'
//                         }`}
//                         style={{ width: `${goal.progress}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">
//                     <span className="text-lg">🎯</span>
//                   </div>
//                   <div>
//                     <div className="font-semibold text-green-800">Goals Achievement</div>
//                     <div className="text-sm text-green-600">
//                       {weeklyGoals.filter(g => g.completed).length} of {weeklyGoals.length} goals completed
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Category Details */}
//           <Card variant="gradient" className="border-2 border-purple-200">
//             <CardHeader>
//               <CardTitle className="text-purple-800">Category Details</CardTitle>
//               <p className="text-purple-600">Deep dive into your weekly performance</p>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-6">
//                 {Object.entries(weeklyData[selectedWeek]).filter(([key]) => key !== 'overallScore' && key !== 'period').map(([category, data]) => (
//                   <div key={category} className="p-4 bg-white/50 rounded-xl">
//                     <div className="flex items-center space-x-3 mb-3">
//                       <div className={`w-10 h-10 bg-gradient-to-r ${
//                         category === 'sleep' ? 'from-blue-500 to-cyan-500' :
//                         category === 'activity' ? 'from-green-500 to-emerald-500' :
//                         category === 'nutrition' ? 'from-orange-500 to-red-500' :
//                         category === 'mental' ? 'from-purple-500 to-pink-500' :
//                         'from-pink-500 to-rose-500'
//                       } rounded-xl flex items-center justify-center text-white`}>
//                         <span className="text-lg">
//                           {category === 'sleep' ? '😴' : 
//                            category === 'activity' ? '💪' : 
//                            category === 'nutrition' ? '🍎' : 
//                            category === 'mental' ? '🧠' : '📅'}
//                         </span>
//                       </div>
//                       <div>
//                         <div className="font-semibold text-gray-800 capitalize">{category}</div>
//                         <div className="text-2xl font-bold text-gray-800">{data.score}</div>
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-2 text-sm">
//                       {Object.entries(data).filter(([key]) => key !== 'score' && key !== 'trend').map(([metric, value]) => (
//                         <div key={metric} className="text-center p-2 bg-white/80 rounded-lg">
//                           <div className="font-medium text-gray-700">{value}</div>
//                           <div className="text-xs text-gray-500 capitalize">{metric}</div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Next Week Preview */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Next Week Preview</CardTitle>
//               <p className="text-gray-600">Focus areas for continued improvement</p>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 {[
//                   { area: 'Sleep Consistency', priority: 'High', icon: '😴' },
//                   { area: 'Strength Training', priority: 'Medium', icon: '💪' },
//                   { area: 'Meal Planning', priority: 'Medium', icon: '🍎' },
//                   { area: 'Mindfulness Practice', priority: 'Low', icon: '🧘' }
//                 ].map((item, index) => (
//                   <div key={item.area} className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50/80 hover:bg-white transition-all duration-300">
//                     <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white">
//                       <span className="text-sm">{item.icon}</span>
//                     </div>
//                     <div className="flex-1">
//                       <div className="font-medium text-gray-800 text-sm">{item.area}</div>
//                       <div className="text-xs text-purple-600 font-semibold">{item.priority} PRIORITY</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <Button variant="ghost" className="w-full mt-4" icon="📅">
//                 Set Next Week Goals
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeeklyReport;