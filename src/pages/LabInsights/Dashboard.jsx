// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { apiService } from "../../services/api";

// const LabInsights = () => {
//   const [category, setCategory] = useState("");
//   const [result, setResult] = useState("");
//   const [score, setScore] = useState("");
//   const [notes, setNotes] = useState("");
//   const [date, setDate] = useState("");
//   const [source, setSource] = useState("");
//   const [insights, setInsights] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch all insights
//   const fetchInsights = async () => {
//     try {
//       setLoading(true);
//       const data = await apiService.fetchInsights();
//       setInsights(data || []);
//     } catch (err) {
//       toast.error("Failed to load insights");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInsights();
//   }, []);

//   // ✅ Create new insight
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!category || !result) {
//       toast.warning("Please fill in required fields");
//       return;
//     }

//     try {
//       const labinsightsData = {
//         category,
//         data: JSON.stringify({ result, score, notes, date, source }),
//       };
//       await apiService.createInsight(labinsightsData);
//       toast.success("Insight created successfully!");
//       fetchInsights();
//       setCategory("");
//       setResult("");
//       setScore("");
//       setNotes("");
//       setDate("");
//       setSource("");
//     } catch (err) {
//       toast.error("Error creating insight");
//     }
//   };

//   // ✅ Download weekly report
//   const handleDownloadReport = async () => {
//     try {
//       const response = await apiService.downloadWeeklyReport();
//       if (response && typeof response === "string") {
//         // if backend returns file path
//         window.open(response, "_blank");
//       } else {
//         toast.info("Report generated, but no file path returned.");
//       }
//     } catch (err) {
//       toast.error("Failed to download report");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-10 px-4">
//       <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           🧪 Lab Insights Dashboard
//         </h2>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
//         >
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Category
//             </label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//             >
//               <option value="">Select category</option>
//               <option>Blood Test</option>
//               <option>Fitness</option>
//               <option>Nutrition</option>
//               <option>Hormonal</option>
//               <option>Sleep</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Result
//             </label>
//             <input
//               type="text"
//               value={result}
//               onChange={(e) => setResult(e.target.value)}
//               className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//               placeholder="Enter test result"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Score</label>
//             <input
//               type="number"
//               value={score}
//               onChange={(e) => setScore(e.target.value)}
//               className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//               placeholder="e.g. 85"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Date</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Source
//             </label>
//             <input
//               type="text"
//               value={source}
//               onChange={(e) => setSource(e.target.value)}
//               className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//               placeholder="e.g. Manual Entry, Wearable"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Notes
//             </label>
//             <textarea
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//               placeholder="Optional notes..."
//               rows={1}
//             ></textarea>
//           </div>

//           <div className="md:col-span-2 flex justify-center">
//             <button
//               type="submit"
//               className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
//             >
//               Generate Insight
//             </button>
//           </div>
//         </form>

//         {/* Actions */}
//         <div className="flex justify-between items-center mb-4">
//           <button
//             onClick={fetchInsights}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//           >
//             Refresh Insights
//           </button>

//           <button
//             onClick={handleDownloadReport}
//             className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
//           >
//             Download Weekly Report
//           </button>
//         </div>

//         {/* Insights Table */}
//         <div className="overflow-x-auto">
//           {loading ? (
//             <p className="text-center text-gray-500 py-4">Loading...</p>
//           ) : insights.length === 0 ? (
//             <p className="text-center text-gray-500 py-4">
//               No insights found yet.
//             </p>
//           ) : (
//             <table className="min-w-full table-auto border">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="border px-4 py-2 text-left">Category</th>
//                   <th className="border px-4 py-2 text-left">Summary</th>
//                   <th className="border px-4 py-2 text-left">Created</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {insights.map((i) => (
//                   <tr key={i._id} className="hover:bg-gray-50">
//                     <td className="border px-4 py-2">{i.category}</td>
//                     <td className="border px-4 py-2">
//                       {i.summary?.slice(0, 100) || "N/A"}...
//                     </td>
//                     <td className="border px-4 py-2">
//                       {new Date(i.createdAt).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LabInsights;

// // // import React, { useState, useEffect } from 'react';
// // // import { apiService } from '../../services/api';

// // // const Dashboard = () => {
// // //   const [timeRange, setTimeRange] = useState('week');
// // //   const [healthData, setHealthData] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     // Simulate loading dashboard data
// // //     const loadDashboardData = async () => {
// // //       setLoading(true);
// // //       try {
// // //         // In a real app, you would fetch this from your API
// // //         const mockData = {
// // //           overallScore: 78,
// // //           trends: {
// // //             sleep: { current: 7.2, previous: 6.8, trend: 'up' },
// // //             activity: { current: 85, previous: 78, trend: 'up' },
// // //             nutrition: { current: 72, previous: 75, trend: 'down' },
// // //             mood: { current: 80, previous: 76, trend: 'up' }
// // //           },
// // //           insights: [
// // //             {
// // //               type: 'positive',
// // //               title: 'Sleep Consistency Improved',
// // //               description: 'Your sleep schedule has become more regular this week',
// // //               impact: 'high'
// // //             },
// // //             {
// // //               type: 'warning',
// // //               title: 'Nutrition Score Dropped',
// // //               description: 'Consider adding more vegetables to your meals',
// // //               impact: 'medium'
// // //             },
// // //             {
// // //               type: 'positive',
// // //               title: 'Activity Level Increased',
// // //               description: 'Great job maintaining your exercise routine',
// // //               impact: 'high'
// // //             }
// // //           ],
// // //           weeklyComparison: '+8%',
// // //           recommendations: [
// // //             'Aim for 7-9 hours of sleep consistently',
// // //             'Include protein with every meal',
// // //             'Take 10-minute walking breaks every 2 hours',
// // //             'Practice deep breathing for stress management'
// // //           ]
// // //         };
// // //         setHealthData(mockData);
// // //       } catch (error) {
// // //         console.error('Error loading dashboard data:', error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     loadDashboardData();
// // //   }, [timeRange]);

// // //   if (loading) {
// // //     return (
// // //       <div className="p-8">
// // //         <div className="animate-pulse">
// // //           <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // //             {[...Array(4)].map((_, i) => (
// // //               <div key={i} className="bg-gray-200 rounded-2xl h-32"></div>
// // //             ))}
// // //           </div>
// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // //             <div className="bg-gray-200 rounded-2xl h-96"></div>
// // //             <div className="bg-gray-200 rounded-2xl h-96"></div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!healthData) {
// // //     return (
// // //       <div className="p-8 text-center">
// // //         <p className="text-gray-600">No data available. Start tracking to see your insights!</p>
// // //       </div>
// // //     );
// // //   }

// // //   const getTrendIcon = (trend) => {
// // //     if (trend === 'up') return '↗️';
// // //     if (trend === 'down') return '↘️';
// // //     return '➡️';
// // //   };

// // //   const getTrendColor = (trend) => {
// // //     if (trend === 'up') return 'text-green-600';
// // //     if (trend === 'down') return 'text-red-600';
// // //     return 'text-gray-600';
// // //   };

// // //   return (
// // //     <div className="p-8">
// // //       <div className="flex justify-between items-center mb-8">
// // //         <h2 className="text-3xl font-bold text-gray-800">Health Dashboard</h2>
// // //         <select
// // //           value={timeRange}
// // //           onChange={(e) => setTimeRange(e.target.value)}
// // //           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-blue focus:border-transparent"
// // //         >
// // //           <option value="week">Last Week</option>
// // //           <option value="month">Last Month</option>
// // //           <option value="quarter">Last 3 Months</option>
// // //         </select>
// // //       </div>

// // //       {/* Overall Health Score */}
// // //       <div className="bg-gradient-to-r from-sky-blue to-light-pink rounded-2xl p-6 text-white mb-8">
// // //         <div className="flex justify-between items-center">
// // //           <div>
// // //             <h3 className="text-2xl font-bold mb-2">Overall Health Score</h3>
// // //             <p className="opacity-90">Based on your tracked activities and metrics</p>
// // //           </div>
// // //           <div className="text-right">
// // //             <div className="text-5xl font-bold">{healthData.overallScore}%</div>
// // //             <div className="text-lg opacity-90">
// // //               {healthData.weeklyComparison} from last week
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <div className="w-full bg-white bg-opacity-30 rounded-full h-3 mt-4">
// // //           <div 
// // //             className="bg-white rounded-full h-3 transition-all duration-1000"
// // //             style={{ width: `${healthData.overallScore}%` }}
// // //           ></div>
// // //         </div>
// // //       </div>

// // //       {/* Metric Trends */}
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // //         {Object.entries(healthData.trends).map(([metric, data]) => (
// // //           <div key={metric} className="bg-white rounded-2xl shadow-lg p-6">
// // //             <div className="flex justify-between items-start mb-4">
// // //               <h4 className="font-semibold text-gray-700 capitalize">{metric}</h4>
// // //               <span className={`text-lg ${getTrendColor(data.trend)}`}>
// // //                 {getTrendIcon(data.trend)}
// // //               </span>
// // //             </div>
// // //             <div className="text-3xl font-bold text-gray-800 mb-2">
// // //               {typeof data.current === 'number' ? data.current.toFixed(1) : data.current}
// // //             </div>
// // //             <div className="text-sm text-gray-500">
// // //               vs {typeof data.previous === 'number' ? data.previous.toFixed(1) : data.previous} previous
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // //         {/* AI Insights */}
// // //         <div className="bg-white rounded-2xl shadow-lg p-6">
// // //           <h3 className="text-2xl font-bold text-gray-800 mb-6">AI-Powered Insights</h3>
// // //           <div className="space-y-4">
// // //             {healthData.insights.map((insight, index) => (
// // //               <div
// // //                 key={index}
// // //                 className={`p-4 rounded-lg border-l-4 ${
// // //                   insight.type === 'positive'
// // //                     ? 'bg-green-50 border-green-400'
// // //                     : insight.type === 'warning'
// // //                     ? 'bg-yellow-50 border-yellow-400'
// // //                     : 'bg-blue-50 border-blue-400'
// // //                 }`}
// // //               >
// // //                 <div className="flex items-start justify-between mb-2">
// // //                   <h4 className="font-semibold text-gray-800">{insight.title}</h4>
// // //                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
// // //                     insight.impact === 'high' 
// // //                       ? 'bg-red-100 text-red-700'
// // //                       : insight.impact === 'medium'
// // //                       ? 'bg-yellow-100 text-yellow-700'
// // //                       : 'bg-blue-100 text-blue-700'
// // //                   }`}>
// // //                     {insight.impact} impact
// // //                   </span>
// // //                 </div>
// // //                 <p className="text-gray-600 text-sm">{insight.description}</p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Personalized Recommendations */}
// // //         <div className="bg-white rounded-2xl shadow-lg p-6">
// // //           <h3 className="text-2xl font-bold text-gray-800 mb-6">Personalized Recommendations</h3>
// // //           <div className="space-y-4">
// // //             {healthData.recommendations.map((recommendation, index) => (
// // //               <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
// // //                 <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
// // //                   {index + 1}
// // //                 </div>
// // //                 <p className="text-gray-700">{recommendation}</p>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           {/* Progress Chart Placeholder */}
// // //           <div className="mt-6 p-4 bg-gray-50 rounded-lg">
// // //             <h4 className="font-semibold text-gray-700 mb-3">Progress Over Time</h4>
// // //             <div className="h-32 bg-white rounded border border-gray-200 flex items-center justify-center">
// // //               <p className="text-gray-500">Interactive chart will appear here</p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Quick Stats */}
// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
// // //         <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
// // //           <div className="text-2xl font-bold text-green-600 mb-2">12</div>
// // //           <div className="text-gray-600">Workouts This Week</div>
// // //         </div>
// // //         <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
// // //           <div className="text-2xl font-bold text-blue-600 mb-2">7.5h</div>
// // //           <div className="text-gray-600">Average Sleep</div>
// // //         </div>
// // //         <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
// // //           <div className="text-2xl font-bold text-purple-600 mb-2">85%</div>
// // //           <div className="text-gray-600">Mood Consistency</div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;
// // // src/components/Dashboard/Dashboard.jsx
// // import React, { useState, useEffect } from 'react';
// // import { apiService } from '../../services/api';
// // import { useApp } from '../../contexts/AppContext';
// // import { Link } from 'react-router-dom';

// // const Dashboard = () => {
// //   const { state, dispatch } = useApp();
// //   const [userData, setUserData] = useState({
// //     cycles: [],
// //     sleep: [],
// //     fitness: [],
// //     nutrition: [],
// //     communityPosts: []
// //   });
// //   const [loading, setLoading] = useState(true);
// //   const user = state.user || JSON.parse(localStorage.getItem('user'));

// //   useEffect(() => {
// //     if (user) {
// //       fetchUserData();
// //     }
// //   }, [user]);

// //   const fetchUserData = async () => {
// //     try {
// //       setLoading(true);
      
// //       // Fetch all user data
// //       const [cyclesData, sleepData, fitnessData, nutritionData, communityData] = await Promise.all([
// //         apiService.getCycles(user._id).catch(() => ({ success: false, data: [] })),
// //         apiService.getSleepHistory().catch(() => ({ success: false, data: [] })),
// //         apiService.getAllFitness().catch(() => ({ success: false, data: [] })),
// //         apiService.getAllNutrition().catch(() => ({ success: false, data: [] })),
// //         apiService.getCommunityPosts().catch(() => ({ success: false, data: [] }))
// //       ]);

// //       setUserData({
// //         cycles: cyclesData.success ? cyclesData.data.cycles || [] : [],
// //         sleep: sleepData.success ? sleepData.data.records || [] : [],
// //         fitness: fitnessData.success ? fitnessData.data || [],
// //         nutrition: nutritionData.success ? nutritionData.data || [],
// //         communityPosts: communityData.success ? communityData.data || []
// //       });

// //     } catch (error) {
// //       console.error('Error fetching user data:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const hasData = () => {
// //     return (
// //       userData.cycles.length > 0 ||
// //       userData.sleep.length > 0 ||
// //       userData.fitness.length > 0 ||
// //       userData.nutrition.length > 0 ||
// //       userData.communityPosts.length > 0
// //     );
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
// //           <p className="mt-4 text-gray-600">Loading your dashboard...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!hasData()) {
// //     return <EmptyDashboard user={user} />;
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Welcome Section */}
// //         <div className="mb-8">
// //           <h1 className="text-3xl font-bold text-gray-900">
// //             Welcome back, {user?.name}!
// //           </h1>
// //           <p className="text-gray-600 mt-2">
// //             Here's your health overview
// //           </p>
// //         </div>

// //         {/* Stats Overview */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //           <StatCard
// //             title="Cycle Records"
// //             value={userData.cycles.length}
// //             icon="📅"
// //             color="pink"
// //             link="/female-health/cycle"
// //           />
// //           <StatCard
// //             title="Sleep Records"
// //             value={userData.sleep.length}
// //             icon="😴"
// //             color="blue"
// //             link="/sleep-recovery"
// //           />
// //           <StatCard
// //             title="Fitness Activities"
// //             value={userData.fitness.length}
// //             icon="💪"
// //             color="green"
// //             link="/fitness-nutrition"
// //           />
// //           <StatCard
// //             title="Community Posts"
// //             value={userData.communityPosts.length}
// //             icon="💬"
// //             color="purple"
// //             link="/community"
// //           />
// //         </div>

// //         {/* Recent Activity */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //           <RecentActivity 
// //             cycles={userData.cycles} 
// //             sleep={userData.sleep}
// //             fitness={userData.fitness}
// //           />
// //           <QuickActions />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Empty State Component
// // const EmptyDashboard = ({ user }) => {
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-4xl mx-auto text-center">
// //         {/* Welcome Message */}
// //         <div className="mb-12">
// //           <h1 className="text-4xl font-bold text-gray-900 mb-4">
// //             Welcome to MyLab, {user?.name}! 🎉
// //           </h1>
// //           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
// //             Your personal health lab is ready. Start tracking your wellness journey and discover insights about your health.
// //           </p>
// //         </div>

// //         {/* Empty State Illustration */}
// //         <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
// //           <div className="max-w-md mx-auto">
// //             <div className="text-6xl mb-6">📊</div>
// //             <h2 className="text-2xl font-bold text-gray-800 mb-4">
// //               Your Dashboard is Empty
// //             </h2>
// //             <p className="text-gray-600 mb-8">
// //               No health data tracked yet. Start by adding your first record to see personalized insights and trends.
// //             </p>
// //           </div>
// //         </div>

// //         {/* Get Started Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
// //           <GetStartedCard
// //             title="Track Your Cycle"
// //             description="Monitor menstrual cycles, predict ovulation, and understand patterns"
// //             icon="📅"
// //             color="pink"
// //             link="/female-health/cycle"
// //             availableFor={['female']}
// //             userGender={user?.gender}
// //           />
// //           <GetStartedCard
// //             title="Log Sleep"
// //             description="Track sleep patterns and get AI-powered recovery tips"
// //             icon="😴"
// //             color="blue"
// //             link="/sleep-recovery"
// //             availableFor={['female', 'male']}
// //             userGender={user?.gender}
// //           />
// //           <GetStartedCard
// //             title="Fitness & Nutrition"
// //             description="Log workouts, track nutrition, and monitor progress"
// //             icon="💪"
// //             color="green"
// //             link="/fitness-nutrition"
// //             availableFor={['female', 'male']}
// //             userGender={user?.gender}
// //           />
// //           <GetStartedCard
// //             title="Men's Health"
// //             description="Track stress, sleep, and overall wellness"
// //             icon="👨‍⚕️"
// //             color="blue"
// //             link="/men-health"
// //             availableFor={['male']}
// //             userGender={user?.gender}
// //           />
// //           <GetStartedCard
// //             title="Join Community"
// //             description="Connect with others and share experiences"
// //             icon="💬"
// //             color="purple"
// //             link="/community"
// //             availableFor={['female', 'male']}
// //             userGender={user?.gender}
// //           />
// //           <GetStartedCard
// //             title="Self Care"
// //             description="Track mindfulness activities and mental wellness"
// //             icon="🧘"
// //             color="purple"
// //             link="/self-care"
// //             availableFor={['female', 'male']}
// //             userGender={user?.gender}
// //           />
// //         </div>

// //         {/* Quick Tips */}
// //         <div className="bg-white rounded-2xl p-6 shadow-lg">
// //           <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Getting Started Tips</h3>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
// //             <div className="text-center p-4">
// //               <div className="text-2xl mb-2">🎯</div>
// //               <p>Start with one tracking area that matters most to you</p>
// //             </div>
// //             <div className="text-center p-4">
// //               <div className="text-2xl mb-2">📱</div>
// //               <p>Be consistent - regular tracking gives better insights</p>
// //             </div>
// //             <div className="text-center p-4">
// //               <div className="text-2xl mb-2">🤝</div>
// //               <p>Join our community for support and motivation</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Supporting Components
// // const GetStartedCard = ({ title, description, icon, color, link, availableFor, userGender }) => {
// //   const isAvailable = availableFor.includes(userGender) || availableFor.includes('all');
  
// //   if (!isAvailable) return null;

// //   const colorClasses = {
// //     pink: 'from-pink-500 to-rose-500',
// //     blue: 'from-blue-500 to-cyan-500',
// //     green: 'from-green-500 to-emerald-500',
// //     purple: 'from-purple-500 to-indigo-500'
// //   };

// //   return (
// //     <Link
// //       to={link}
// //       className="block bg-white rounded-2xl shadow-lg p-6 hover-lift transition-all duration-300 border-2 border-transparent hover:border-gray-200"
// //     >
// //       <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colorClasses[color]} flex items-center justify-center text-white text-xl mb-4`}>
// //         {icon}
// //       </div>
// //       <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
// //       <p className="text-gray-600 text-sm">{description}</p>
// //     </Link>
// //   );
// // };

// // const StatCard = ({ title, value, icon, color, link }) => {
// //   const colorClasses = {
// //     pink: 'bg-pink-50 text-pink-600',
// //     blue: 'bg-blue-50 text-blue-600',
// //     green: 'bg-green-50 text-green-600',
// //     purple: 'bg-purple-50 text-purple-600'
// //   };

// //   return (
// //     <Link
// //       to={link}
// //       className="bg-white rounded-2xl shadow-lg p-6 hover-lift transition-all duration-300"
// //     >
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <p className="text-sm font-medium text-gray-600">{title}</p>
// //           <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
// //         </div>
// //         <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center text-xl`}>
// //           {icon}
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // };

// // const RecentActivity = ({ cycles, sleep, fitness }) => {
// //   const recentItems = [
// //     ...cycles.slice(0, 3).map(cycle => ({
// //       type: 'cycle',
// //       title: 'Cycle Recorded',
// //       description: `Period from ${new Date(cycle.startDate).toLocaleDateString()}`,
// //       time: new Date(cycle.createdAt).toLocaleDateString(),
// //       icon: '📅'
// //     })),
// //     ...sleep.slice(0, 3).map(record => ({
// //       type: 'sleep',
// //       title: 'Sleep Logged',
// //       description: `${record.sleepQuality}/10 quality sleep`,
// //       time: new Date(record.createdAt).toLocaleDateString(),
// //       icon: '😴'
// //     })),
// //     ...fitness.slice(0, 3).map(activity => ({
// //       type: 'fitness',
// //       title: 'Workout Completed',
// //       description: activity.activityType || 'Fitness activity',
// //       time: new Date(activity.createdAt).toLocaleDateString(),
// //       icon: '💪'
// //     }))
// //   ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);

// //   if (recentItems.length === 0) {
// //     return (
// //       <div className="bg-white rounded-2xl shadow-lg p-6">
// //         <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
// //         <div className="text-center py-8">
// //           <div className="text-4xl mb-4">📊</div>
// //           <p className="text-gray-500">No recent activity yet</p>
// //           <p className="text-sm text-gray-400 mt-2">Start tracking to see your activity here</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-white rounded-2xl shadow-lg p-6">
// //       <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
// //       <div className="space-y-4">
// //         {recentItems.map((item, index) => (
// //           <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
// //             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
// //               {item.icon}
// //             </div>
// //             <div className="flex-1">
// //               <p className="font-medium text-gray-800">{item.title}</p>
// //               <p className="text-sm text-gray-600">{item.description}</p>
// //             </div>
// //             <span className="text-xs text-gray-400">{item.time}</span>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // const QuickActions = () => {
// //   return (
// //     <div className="bg-white rounded-2xl shadow-lg p-6">
// //       <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
// //       <div className="space-y-3">
// //         <Link
// //           to="/sleep-recovery"
// //           className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
// //         >
// //           <span className="text-xl">😴</span>
// //           <span className="font-medium">Log Today's Sleep</span>
// //         </Link>
// //         <Link
// //           to="/fitness-nutrition"
// //           className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all"
// //         >
// //           <span className="text-xl">💪</span>
// //           <span className="font-medium">Add Workout</span>
// //         </Link>
// //         <Link
// //           to="/community"
// //           className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all"
// //         >
// //           <span className="text-xl">💬</span>
// //           <span className="font-medium">Join Community</span>
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;
