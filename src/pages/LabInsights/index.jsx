// // // import React, { useState, useEffect } from 'react';
// // // import { apiService } from '../../services/api';

// // // const LabInsights = () => {
// // //   const [weeklyReport, setWeeklyReport] = useState(null);
// // //   const [loading, setLoading] = useState(false);

// // //   const downloadWeeklyReport = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const blob = await apiService.getWeeklyReport();
// // //       const url = window.URL.createObjectURL(blob);
// // //       const a = document.createElement('a');
// // //       a.style.display = 'none';
// // //       a.href = url;
// // //       a.download = 'mylab-weekly-report.pdf';
// // //       document.body.appendChild(a);
// // //       a.click();
// // //       window.URL.revokeObjectURL(url);
// // //       alert('Weekly report downloaded successfully!');
// // //     } catch (error) {
// // //       alert('No weekly report available yet. Continue tracking to generate insights.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Sample dashboard data
// // //   const dashboardData = {
// // //     overallHealth: 85,
// // //     sleepQuality: 78,
// // //     activityLevel: 92,
// // //     nutritionScore: 81,
// // //     moodTrend: 'improving',
// // //     weeklyComparison: '+12%',
// // //     insights: [
// // //       'Your sleep consistency has improved by 15% this week',
// // //       'Great job maintaining your exercise routine',
// // //       'Consider increasing water intake based on activity levels',
// // //       'Mood tracking shows positive trend - keep it up!'
// // //     ],
// // //     recommendations: [
// // //       'Aim for 30 minutes of moderate activity daily',
// // //       'Try to maintain consistent sleep schedule',
// // //       'Include more leafy greens in your meals',
// // //       'Practice mindfulness for stress management'
// // //     ]
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //         <div className="text-center mb-8">
// // //           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
// // //             Lab Insights
// // //           </h1>
// // //           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
// // //             Your personalized health dashboard with AI-powered insights and weekly reports
// // //           </p>
// // //         </div>

// // //         {/* Download Report Section */}
// // //         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
// // //           <div className="flex flex-col md:flex-row items-center justify-between">
// // //             <div>
// // //               <h2 className="text-2xl font-bold text-gray-800 mb-2">Weekly Health Report</h2>
// // //               <p className="text-gray-600">Download your comprehensive weekly health analysis</p>
// // //             </div>
// // //             <button
// // //               onClick={downloadWeeklyReport}
// // //               disabled={loading}
// // //               className="bg-gradient-to-r from-sky-blue to-light-pink text-white px-8 py-4 rounded-lg font-semibold hover-lift transition-all duration-300 disabled:opacity-50 mt-4 md:mt-0"
// // //             >
// // //               {loading ? 'Generating Report...' : 'Download Weekly Report'}
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Health Score Overview */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // //           {[
// // //             { label: 'Overall Health', score: dashboardData.overallHealth, color: 'green' },
// // //             { label: 'Sleep Quality', score: dashboardData.sleepQuality, color: 'blue' },
// // //             { label: 'Activity Level', score: dashboardData.activityLevel, color: 'purple' },
// // //             { label: 'Nutrition Score', score: dashboardData.nutritionScore, color: 'orange' }
// // //           ].map((metric, index) => (
// // //             <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
// // //               <div className={`text-2xl font-bold text-${metric.color}-600 mb-2`}>
// // //                 {metric.score}%
// // //               </div>
// // //               <div className="text-gray-600">{metric.label}</div>
// // //               <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
// // //                 <div 
// // //                   className={`bg-${metric.color}-500 h-2 rounded-full`}
// // //                   style={{ width: `${metric.score}%` }}
// // //                 ></div>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>

// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // //           {/* AI Insights */}
// // //           <div className="bg-white rounded-2xl shadow-lg p-6">
// // //             <h2 className="text-2xl font-bold text-gray-800 mb-6">AI-Powered Insights</h2>
// // //             <div className="space-y-4">
// // //               {dashboardData.insights.map((insight, index) => (
// // //                 <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
// // //                   <span className="text-blue-500 text-lg">💡</span>
// // //                   <p className="text-gray-700">{insight}</p>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
// // //               <div className="flex items-center space-x-3">
// // //                 <span className="text-green-500 text-xl">📈</span>
// // //                 <div>
// // //                   <h3 className="font-semibold text-green-800">Weekly Progress</h3>
// // //                   <p className="text-green-700">Your health metrics improved by {dashboardData.weeklyComparison} this week!</p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Personalized Recommendations */}
// // //           <div className="bg-white rounded-2xl shadow-lg p-6">
// // //             <h2 className="text-2xl font-bold text-gray-800 mb-6">Personalized Recommendations</h2>
// // //             <div className="space-y-4">
// // //               {dashboardData.recommendations.map((recommendation, index) => (
// // //                 <div key={index} className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
// // //                   <span className="text-purple-500 text-lg">⭐</span>
// // //                   <p className="text-gray-700">{recommendation}</p>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
// // //               <h3 className="font-semibold text-yellow-800 mb-2">Mood Trend Analysis</h3>
// // //               <p className="text-yellow-700">
// // //                 Your mood tracking shows an {dashboardData.moodTrend} trend. 
// // //                 {dashboardData.moodTrend === 'improving' 
// // //                   ? ' Continue your current self-care practices!' 
// // //                   : ' Consider trying some relaxation techniques.'}
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Data Visualization Placeholder */}
// // //         <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
// // //           <h2 className="text-2xl font-bold text-gray-800 mb-6">Health Trends</h2>
// // //           <div className="bg-gray-100 rounded-lg p-8 text-center">
// // //             <p className="text-gray-500 mb-4">Interactive charts and graphs will appear here</p>
// // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // //               <div className="bg-blue-200 h-32 rounded-lg flex items-center justify-center">
// // //                 <span className="text-blue-700">Sleep Pattern Chart</span>
// // //               </div>
// // //               <div className="bg-green-200 h-32 rounded-lg flex items-center justify-center">
// // //                 <span className="text-green-700">Activity Timeline</span>
// // //               </div>
// // //               <div className="bg-purple-200 h-32 rounded-lg flex items-center justify-center">
// // //                 <span className="text-purple-700">Mood Correlation</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default LabInsights;
// // import React, { useState, useEffect } from 'react';
// // import {
// //   BarChart3,
// //   Download,
// //   FileText,
// //   Moon,
// //   Dumbbell,
// //   Heart,
// //   Users,
// //   Brain,
// //   Clock,
// //   Activity,
// //   TrendingUp,
// //   Calendar,
// //   User,
// //   RefreshCw,
// //   AlertCircle
// // } from 'lucide-react';
// // import { LabInsightsAPI } from '../';
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   ArcElement,
// //   PointElement,
// //   LineElement
// // } from 'chart.js';
// // import { Bar, Doughnut, Line } from 'react-chartjs-2';

// // // Register ChartJS components
// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   ArcElement,
// //   PointElement,
// //   LineElement
// // );

// // const Dashboard = () => {
// //   const [dashboardData, setDashboardData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [generatingReport, setGeneratingReport] = useState(false);
// //   const [activeTab, setActiveTab] = useState('weekly');
// //   const [insights, setInsights] = useState([]);
// //   const [stats, setStats] = useState(null);
// //   const [error, setError] = useState(null);

// //   const api = new LabInsightsAPI();

// //   const colors = {
// //     background: '#F4F1E9',
// //     primary: '#B1D182',
// //     text: '#0B132B',
// //     accent: '#688F48',
// //     lightAccent: '#E8F4D9',
// //     darkAccent: '#4A6B33',
// //     card: '#FFFFFF',
// //     success: '#4CAF50',
// //     warning: '#FF9800',
// //     error: '#F44336',
// //     info: '#2196F3'
// //   };

// //   useEffect(() => {
// //     fetchDashboardData();
// //     fetchRecentInsights();
// //     fetchActivityStats();
// //   }, []);

// //   const fetchDashboardData = async () => {
// //     try {
// //       setLoading(true);
// //       const data = await api.getDashboardInsights();
// //       setDashboardData(data);
// //       setError(null);
// //     } catch (err) {
// //       setError('Failed to load dashboard data');
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchRecentInsights = async () => {
// //     try {
// //       const data = await api.fetchInsights();
// //       setInsights(data.slice(0, 5));
// //     } catch (err) {
// //       console.error('Failed to fetch insights:', err);
// //     }
// //   };

// //   const fetchActivityStats = async () => {
// //     try {
// //       // You might want to create a separate endpoint for this
// //       const response = await api.client.get('/labinsights/lab/activity-stats');
// //       setStats(response.data);
// //     } catch (err) {
// //       console.error('Failed to fetch activity stats:', err);
// //     }
// //   };

// //   const handleGenerateReport = async () => {
// //     try {
// //       setGeneratingReport(true);
// //       const response = await api.generateWeeklyReport();
      
// //       if (response.success) {
// //         // Trigger download
// //         const downloadResponse = await api.downloadWeeklyReport(response.downloadUrl.split('/').pop());
        
// //         // Create blob and download
// //         const blob = new Blob([downloadResponse], { type: 'application/pdf' });
// //         const url = window.URL.createObjectURL(blob);
// //         const link = document.createElement('a');
// //         link.href = url;
// //         link.download = response.downloadUrl.split('/').pop() || 'weekly-report.pdf';
// //         document.body.appendChild(link);
// //         link.click();
// //         document.body.removeChild(link);
// //         window.URL.revokeObjectURL(url);
// //       }
// //     } catch (err) {
// //       setError('Failed to generate report');
// //       console.error(err);
// //     } finally {
// //       setGeneratingReport(false);
// //     }
// //   };

// //   const handleRefresh = () => {
// //     fetchDashboardData();
// //     fetchRecentInsights();
// //     fetchActivityStats();
// //   };

// //   const handleGenerateInsight = async (category) => {
// //     try {
// //       setLoading(true);
// //       const response = await api.client.post('/labinsights/lab/collect-real-data', { category });
      
// //       if (response.data.success) {
// //         fetchDashboardData();
// //         fetchRecentInsights();
// //       }
// //     } catch (err) {
// //       setError(`Failed to generate ${category} insight`);
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const formatDate = (dateString) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       month: 'short',
// //       day: 'numeric',
// //       year: 'numeric'
// //     });
// //   };

// //   const getCategoryIcon = (category) => {
// //     switch(category.toLowerCase()) {
// //       case 'sleeprecovery':
// //         return <Moon className="w-5 h-5" />;
// //       case 'fitness':
// //         return <Dumbbell className="w-5 h-5" />;
// //       case 'nutrition':
// //         return <Heart className="w-5 h-5" />;
// //       case 'selfcare':
// //         return <Brain className="w-5 h-5" />;
// //       case 'community':
// //         return <Users className="w-5 h-5" />;
// //       default:
// //         return <Activity className="w-5 h-5" />;
// //     }
// //   };

// //   const getCategoryColor = (category) => {
// //     switch(category.toLowerCase()) {
// //       case 'sleeprecovery':
// //         return colors.info;
// //       case 'fitness':
// //         return colors.success;
// //       case 'nutrition':
// //         return colors.warning;
// //       case 'selfcare':
// //         return colors.accent;
// //       case 'community':
// //         return colors.primary;
// //       default:
// //         return colors.text;
// //     }
// //   };

// //   // Prepare chart data
// //   const weeklyChartData = dashboardData?.weeklySummary ? {
// //     labels: ['Sleep', 'Workouts', 'Self-Care', 'Community'],
// //     datasets: [
// //       {
// //         label: 'Weekly Activity',
// //         data: [
// //           dashboardData.weeklySummary.totalSleepHours,
// //           dashboardData.weeklySummary.totalWorkouts,
// //           dashboardData.weeklySummary.totalSelfCare,
// //           dashboardData.weeklySummary.totalPosts
// //         ],
// //         backgroundColor: [
// //           colors.info,
// //           colors.success,
// //           colors.accent,
// //           colors.primary
// //         ],
// //         borderColor: [
// //           colors.info,
// //           colors.success,
// //           colors.accent,
// //           colors.primary
// //         ],
// //         borderWidth: 1
// //       }
// //     ]
// //   } : null;

// //   const sleepQualityChartData = {
// //     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
// //     datasets: [
// //       {
// //         label: 'Sleep Quality',
// //         data: [8, 7, 6, 8, 9, 7, 8],
// //         borderColor: colors.info,
// //         backgroundColor: `${colors.info}20`,
// //         tension: 0.4
// //       }
// //     ]
// //   };

// //   const activityChartData = {
// //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
// //     datasets: [
// //       {
// //         label: 'Workouts',
// //         data: [12, 19, 15, 25, 22, 30],
// //         backgroundColor: colors.success,
// //       },
// //       {
// //         label: 'Self-Care',
// //         data: [8, 15, 12, 18, 16, 20],
// //         backgroundColor: colors.accent,
// //       }
// //     ]
// //   };

// //   const chartOptions = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     plugins: {
// //       legend: {
// //         position: 'top',
// //         labels: {
// //           color: colors.text,
// //           font: {
// //             size: 12
// //           }
// //         }
// //       }
// //     },
// //     scales: {
// //       y: {
// //         beginAtZero: true,
// //         grid: {
// //           color: `${colors.text}20`
// //         },
// //         ticks: {
// //           color: colors.text
// //         }
// //       },
// //       x: {
// //         grid: {
// //           color: `${colors.text}20`
// //         },
// //         ticks: {
// //           color: colors.text
// //         }
// //       }
// //     }
// //   };

// //   if (loading && !dashboardData) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: colors.accent }}></div>
// //           <p style={{ color: colors.text }}>Loading your wellness dashboard...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: colors.background }}>
// //       {/* Header */}
// //       <div className="mb-6">
// //         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
// //           <div>
// //             <h1 className="text-2xl md:text-3xl font-bold" style={{ color: colors.text }}>Wellness Dashboard</h1>
// //             <p className="mt-1" style={{ color: colors.text + 'CC' }}>
// //               Track your health insights and weekly progress
// //             </p>
// //           </div>
          
// //           <div className="flex items-center gap-3">
// //             <button
// //               onClick={handleRefresh}
// //               className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
// //               style={{ 
// //                 backgroundColor: colors.lightAccent,
// //                 color: colors.darkAccent
// //               }}
// //               disabled={loading}
// //             >
// //               <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
// //               Refresh
// //             </button>
            
// //             <button
// //               onClick={handleGenerateReport}
// //               disabled={generatingReport}
// //               className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
// //               style={{ 
// //                 backgroundColor: colors.accent,
// //                 color: '#FFFFFF'
// //               }}
// //             >
// //               {generatingReport ? (
// //                 <>
// //                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
// //                   Generating...
// //                 </>
// //               ) : (
// //                 <>
// //                   <FileText className="w-4 h-4" />
// //                   Generate Report
// //                 </>
// //               )}
// //             </button>
// //           </div>
// //         </div>
        
// //         {/* Tabs */}
// //         <div className="flex gap-2 mt-6 border-b" style={{ borderColor: colors.text + '20' }}>
// //           <button
// //             onClick={() => setActiveTab('weekly')}
// //             className={`px-4 py-2 font-medium ${activeTab === 'weekly' ? 'border-b-2' : ''}`}
// //             style={{
// //               color: activeTab === 'weekly' ? colors.accent : colors.text + 'CC',
// //               borderColor: activeTab === 'weekly' ? colors.accent : 'transparent'
// //             }}
// //           >
// //             <div className="flex items-center gap-2">
// //               <Calendar className="w-4 h-4" />
// //               Weekly Overview
// //             </div>
// //           </button>
// //           <button
// //             onClick={() => setActiveTab('insights')}
// //             className={`px-4 py-2 font-medium ${activeTab === 'insights' ? 'border-b-2' : ''}`}
// //             style={{
// //               color: activeTab === 'insights' ? colors.accent : colors.text + 'CC',
// //               borderColor: activeTab === 'insights' ? colors.accent : 'transparent'
// //             }}
// //           >
// //             <div className="flex items-center gap-2">
// //               <Brain className="w-4 h-4" />
// //               AI Insights
// //             </div>
// //           </button>
// //           <button
// //             onClick={() => setActiveTab('activity')}
// //             className={`px-4 py-2 font-medium ${activeTab === 'activity' ? 'border-b-2' : ''}`}
// //             style={{
// //               color: activeTab === 'activity' ? colors.accent : colors.text + 'CC',
// //               borderColor: activeTab === 'activity' ? colors.accent : 'transparent'
// //             }}
// //           >
// //             <div className="flex items-center gap-2">
// //               <Activity className="w-4 h-4" />
// //               Activity Log
// //             </div>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Error Message */}
// //       {error && (
// //         <div className="mb-6 p-4 rounded-lg flex items-start gap-3" style={{ backgroundColor: `${colors.error}20`, borderLeft: `4px solid ${colors.error}` }}>
// //           <AlertCircle className="w-5 h-5 mt-0.5" style={{ color: colors.error }} />
// //           <div>
// //             <p className="font-medium" style={{ color: colors.error }}>Error</p>
// //             <p style={{ color: colors.text }}>{error}</p>
// //           </div>
// //         </div>
// //       )}

// //       {/* Weekly Overview Tab */}
// //       {activeTab === 'weekly' && dashboardData && (
// //         <>
// //           {/* Summary Cards */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
// //             <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm" style={{ color: colors.text + 'CC' }}>Sleep Hours</p>
// //                   <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>
// //                     {dashboardData.weeklySummary.totalSleepHours.toFixed(1)}h
// //                   </p>
// //                   <p className="text-sm mt-1" style={{ color: colors.accent }}>
// //                     Quality: {dashboardData.weeklySummary.avgSleepQuality}/10
// //                   </p>
// //                 </div>
// //                 <div className="p-3 rounded-full" style={{ backgroundColor: `${colors.info}20` }}>
// //                   <Moon className="w-6 h-6" style={{ color: colors.info }} />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm" style={{ color: colors.text + 'CC' }}>Workouts</p>
// //                   <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>
// //                     {dashboardData.weeklySummary.totalWorkouts}
// //                   </p>
// //                   <p className="text-sm mt-1" style={{ color: colors.success }}>
// //                     ~{dashboardData.weeklySummary.avgCaloriesBurned} calories
// //                   </p>
// //                 </div>
// //                 <div className="p-3 rounded-full" style={{ backgroundColor: `${colors.success}20` }}>
// //                   <Dumbbell className="w-6 h-6" style={{ color: colors.success }} />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm" style={{ color: colors.text + 'CC' }}>Self-Care</p>
// //                   <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>
// //                     {dashboardData.weeklySummary.totalSelfCare}
// //                   </p>
// //                   <p className="text-sm mt-1" style={{ color: colors.accent }}>
// //                     Activities completed
// //                   </p>
// //                 </div>
// //                 <div className="p-3 rounded-full" style={{ backgroundColor: `${colors.accent}20` }}>
// //                   <Brain className="w-6 h-6" style={{ color: colors.accent }} />
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
// //               <div className="flex items-center justify-between">
// //                 <div>
// //                   <p className="text-sm" style={{ color: colors.text + 'CC' }}>Community</p>
// //                   <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>
// //                     {dashboardData.weeklySummary.totalPosts}
// //                   </p>
// //                   <p className="text-sm mt-1" style={{ color: colors.primary }}>
// //                     Posts & interactions
// //                   </p>
// //                 </div>
// //                 <div className="p-3 rounded-full" style={{ backgroundColor: `${colors.primary}20` }}>
// //                   <Users className="w-6 h-6" style={{ color: colors.primary }} />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Charts */}
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// //             {/* Weekly Activity Chart */}
// //             <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
// //               <div className="flex items-center justify-between mb-4">
// //                 <h3 className="font-bold" style={{ color: colors.text }}>Weekly Activity Summary</h3>
// //                 <BarChart3 className="w-5 h-5" style={{ color: colors.text + '80' }} />
// //               </div>
// //               <div className="h-64">
// //                 {weeklyChartData && (
// //                   <Bar data={weeklyChartData} options={chartOptions} />
// //                 )}
// //               </div>
// //             </div>

// //             {/* Sleep Quality Chart */}
// //             <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
// //               <div className="flex items-center justify-between mb-4">
// //                 <h3 className="font-bold" style={{ color: colors.text }}>Sleep Quality Trend</h3>
// //                 <TrendingUp className="w-5 h-5" style={{ color: colors.text + '80' }} />
// //               </div>
// //               <div className="h-64">
// //                 <Line data={sleepQualityChartData} options={chartOptions} />
// //               </div>
// //             </div>
// //           </div>

// //           {/* AI Summary */}
// //           {dashboardData.aiSummary && (
// //             <div className="mb-6 p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
// //               <div className="flex items-center gap-3 mb-3">
// //                 <div className="p-2 rounded-full" style={{ backgroundColor: `${colors.accent}20` }}>
// //                   <Brain className="w-5 h-5" style={{ color: colors.accent }} />
// //                 </div>
// //                 <h3 className="font-bold" style={{ color: colors.text }}>AI Wellness Summary</h3>
// //               </div>
// //               <p style={{ color: colors.text }}>
// //                 {dashboardData.aiSummary}
// //               </p>
// //             </div>
// //           )}
// //         </>
// //       )}

// //       {/* Insights Tab */}
// //       {activeTab === 'insights' && (
// //         <div className="space-y-6">
// //           {/* Generate New Insights */}
// //           <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
// //             <h3 className="font-bold mb-4" style={{ color: colors.text }}>Generate New Insights</h3>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
// //               {['sleepRecovery', 'fitness', 'nutrition', 'selfCare', 'community'].map((category) => (
// //                 <button
// //                   key={category}
// //                   onClick={() => handleGenerateInsight(category)}
// //                   disabled={loading}
// //                   className="p-3 rounded-lg text-center transition-all hover:scale-105 disabled:opacity-50"
// //                   style={{ 
// //                     backgroundColor: getCategoryColor(category) + '20',
// //                     color: getCategoryColor(category)
// //                   }}
// //                 >
// //                   <div className="flex flex-col items-center gap-2">
// //                     {getCategoryIcon(category)}
// //                     <span className="text-sm font-medium capitalize">
// //                       {category === 'sleepRecovery' ? 'Sleep' : category}
// //                     </span>
// //                   </div>
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Recent Insights */}
// //           <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
// //             <h3 className="font-bold mb-4" style={{ color: colors.text }}>Recent Insights</h3>
// //             <div className="space-y-4">
// //               {insights.length > 0 ? (
// //                 insights.map((insight) => (
// //                   <div
// //                     key={insight._id}
// //                     className="p-4 rounded-lg border"
// //                     style={{ 
// //                       backgroundColor: colors.background,
// //                       borderColor: getCategoryColor(insight.category) + '40'
// //                     }}
// //                   >
// //                     <div className="flex items-start justify-between">
// //                       <div className="flex items-center gap-3">
// //                         <div
// //                           className="p-2 rounded-full"
// //                           style={{ backgroundColor: getCategoryColor(insight.category) + '20' }}
// //                         >
// //                           {getCategoryIcon(insight.category)}
// //                         </div>
// //                         <div>
// //                           <h4 className="font-bold capitalize" style={{ color: colors.text }}>
// //                             {insight.category === 'sleepRecovery' ? 'Sleep Recovery' : insight.category}
// //                           </h4>
// //                           <p className="text-sm mt-1" style={{ color: colors.text + 'CC' }}>
// //                             {insight.summary}
// //                           </p>
// //                         </div>
// //                       </div>
// //                       <span className="text-sm" style={{ color: colors.text + '80' }}>
// //                         {formatDate(insight.createdAt)}
// //                       </span>
// //                     </div>
                    
// //                     {insight.aiGeneratedTips && insight.aiGeneratedTips.length > 0 && (
// //                       <div className="mt-3 pt-3 border-t" style={{ borderColor: getCategoryColor(insight.category) + '20' }}>
// //                         <p className="text-sm font-medium mb-2" style={{ color: colors.text }}>
// //                           AI Recommendations:
// //                         </p>
// //                         <ul className="space-y-1">
// //                           {insight.aiGeneratedTips.map((tip, index) => (
// //                             <li key={index} className="text-sm flex items-start gap-2" style={{ color: colors.text + 'CC' }}>
// //                               <span className="mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getCategoryColor(insight.category) }}></span>
// //                               {tip}
// //                             </li>
// //                           ))}
// //                         </ul>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ))
// //               ) : (
// //                 <div className="text-center py-8" style={{ color: colors.text + '80' }}>
// //                   <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
// //                   <p>No insights generated yet. Generate your first insight above!</p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Activity Tab */}
// //       {activeTab === 'activity' && (
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //           {/* Activity Stats */}
// //           <div className="lg:col-span-2 p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
// //             <h3 className="font-bold mb-4" style={{ color: colors.text }}>Activity Overview</h3>
// //             <div className="h-80">
// //               <Bar data={activityChartData} options={chartOptions} />
// //             </div>
// //           </div>

// //           {/* Quick Stats */}
// //           <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
// //             <h3 className="font-bold mb-4" style={{ color: colors.text }}>Quick Stats</h3>
// //             <div className="space-y-4">
// //               {stats ? (
// //                 <>
// //                   <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
// //                     <div className="flex items-center gap-3">
// //                       <Moon className="w-4 h-4" style={{ color: colors.info }} />
// //                       <span style={{ color: colors.text }}>Sleep Records</span>
// //                     </div>
// //                     <span className="font-bold" style={{ color: colors.text }}>{stats.recordCounts?.sleep || 0}</span>
// //                   </div>
// //                   <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
// //                     <div className="flex items-center gap-3">
// //                       <Dumbbell className="w-4 h-4" style={{ color: colors.success }} />
// //                       <span style={{ color: colors.text }}>Workout Sessions</span>
// //                     </div>
// //                     <span className="font-bold" style={{ color: colors.text }}>{stats.recordCounts?.fitness || 0}</span>
// //                   </div>
// //                   <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
// //                     <div className="flex items-center gap-3">
// //                       <Brain className="w-4 h-4" style={{ color: colors.accent }} />
// //                       <span style={{ color: colors.text }}>Self-Care Activities</span>
// //                     </div>
// //                     <span className="font-bold" style={{ color: colors.text }}>{stats.recordCounts?.selfCare || 0}</span>
// //                   </div>
// //                   <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
// //                     <div className="flex items-center gap-3">
// //                       <Users className="w-4 h-4" style={{ color: colors.primary }} />
// //                       <span style={{ color: colors.text }}>Community Posts</span>
// //                     </div>
// //                     <span className="font-bold" style={{ color: colors.text }}>{stats.recordCounts?.community || 0}</span>
// //                   </div>
// //                 </>
// //               ) : (
// //                 <div className="text-center py-8" style={{ color: colors.text + '80' }}>
// //                   <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
// //                   <p>Loading activity stats...</p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Report History */}
// //           <div className="lg:col-span-3 p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
// //             <div className="flex items-center justify-between mb-4">
// //               <h3 className="font-bold" style={{ color: colors.text }}>Recent Reports</h3>
// //               <button
// //                 onClick={handleGenerateReport}
// //                 disabled={generatingReport}
// //                 className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg"
// //                 style={{ 
// //                   backgroundColor: colors.lightAccent,
// //                   color: colors.darkAccent
// //                 }}
// //               >
// //                 <FileText className="w-4 h-4" />
// //                 New Report
// //               </button>
// //             </div>
// //             <div className="space-y-3">
// //               <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
// //                 <div className="flex items-center gap-3">
// //                   <FileText className="w-4 h-4" style={{ color: colors.accent }} />
// //                   <div>
// //                     <p style={{ color: colors.text }}>Weekly Health Report</p>
// //                     <p className="text-sm" style={{ color: colors.text + '80' }}>
// //                       Generated {new Date().toLocaleDateString()}
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <button className="p-1.5 rounded" style={{ backgroundColor: colors.lightAccent }}>
// //                   <Download className="w-4 h-4" style={{ color: colors.darkAccent }} />
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import {
//   BarChart3,
//   Download,
//   FileText,
//   Moon,
//   Dumbbell,
//   Heart,
//   Users,
//   Brain,
//   Clock,
//   Activity,
//   TrendingUp,
//   Calendar,
//   User,
//   RefreshCw,
//   AlertCircle
// } from 'lucide-react';
// import { apiService } from '../../services/api'; // Import the unified apiService
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement
// } from 'chart.js';
// import { Bar, Doughnut, Line } from 'react-chartjs-2';

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement
// );

// const LabInsightsDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [generatingReport, setGeneratingReport] = useState(false);
//   const [activeTab, setActiveTab] = useState('weekly');
//   const [insights, setInsights] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [error, setError] = useState(null);

//   const colors = {
//     background: '#F4F1E9',
//     primary: '#B1D182',
//     text: '#0B132B',
//     accent: '#688F48',
//     lightAccent: '#E8F4D9',
//     darkAccent: '#4A6B33',
//     card: '#FFFFFF',
//     success: '#4CAF50',
//     warning: '#FF9800',
//     error: '#F44336',
//     info: '#2196F3'
//   };

//   useEffect(() => {
//     fetchDashboardData();
//     fetchRecentInsights();
//     fetchActivityStats();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const data = await apiService.getDashboardInsights();
//       setDashboardData(data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load dashboard data');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchRecentInsights = async () => {
//     try {
//       const data = await apiService.fetchInsights();
//       setInsights(data.slice(0, 5));
//     } catch (err) {
//       console.error('Failed to fetch insights:', err);
//     }
//   };

//   const fetchActivityStats = async () => {
//     try {
//       const data = await apiService.getActivityStats();
//       setStats(data);
//     } catch (err) {
//       console.error('Failed to fetch activity stats:', err);
//     }
//   };

//   const handleGenerateReport = async () => {
//     try {
//       setGeneratingReport(true);
//       const response = await apiService.generateWeeklyReport();
      
//       if (response.success) {
//         // Trigger download
//         const downloadResponse = await apiService.downloadWeeklyReport(response.downloadUrl.split('/').pop());
        
//         // Create blob and download
//         const blob = new Blob([downloadResponse.data], { type: 'application/pdf' });
//         const url = window.URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = response.downloadUrl.split('/').pop() || 'weekly-report.pdf';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         window.URL.revokeObjectURL(url);
//       }
//     } catch (err) {
//       setError('Failed to generate report');
//       console.error(err);
//     } finally {
//       setGeneratingReport(false);
//     }
//   };

//   const handleRefresh = () => {
//     fetchDashboardData();
//     fetchRecentInsights();
//     fetchActivityStats();
//   };

//   const handleGenerateInsight = async (category) => {
//     try {
//       setLoading(true);
//       const response = await apiService.collectRealData(category);
      
//       if (response.success) {
//         fetchDashboardData();
//         fetchRecentInsights();
//       }
//     } catch (err) {
//       setError(`Failed to generate ${category} insight`);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   const getCategoryIcon = (category) => {
//     switch(category.toLowerCase()) {
//       case 'sleeprecovery':
//         return <Moon className="w-5 h-5" />;
//       case 'fitness':
//         return <Dumbbell className="w-5 h-5" />;
//       case 'nutrition':
//         return <Heart className="w-5 h-5" />;
//       case 'selfcare':
//         return <Brain className="w-5 h-5" />;
//       case 'community':
//         return <Users className="w-5 h-5" />;
//       default:
//         return <Activity className="w-5 h-5" />;
//     }
//   };

//   const getCategoryColor = (category) => {
//     switch(category.toLowerCase()) {
//       case 'sleeprecovery':
//         return colors.info;
//       case 'fitness':
//         return colors.success;
//       case 'nutrition':
//         return colors.warning;
//       case 'selfcare':
//         return colors.accent;
//       case 'community':
//         return colors.primary;
//       default:
//         return colors.text;
//     }
//   };

//   // Prepare chart data
//   const weeklyChartData = dashboardData?.weeklySummary ? {
//     labels: ['Sleep', 'Workouts', 'Self-Care', 'Community'],
//     datasets: [
//       {
//         label: 'Weekly Activity',
//         data: [
//           dashboardData.weeklySummary.totalSleepHours,
//           dashboardData.weeklySummary.totalWorkouts,
//           dashboardData.weeklySummary.totalSelfCare,
//           dashboardData.weeklySummary.totalPosts
//         ],
//         backgroundColor: [
//           colors.info,
//           colors.success,
//           colors.accent,
//           colors.primary
//         ],
//         borderColor: [
//           colors.info,
//           colors.success,
//           colors.accent,
//           colors.primary
//         ],
//         borderWidth: 1
//       }
//     ]
//   } : null;

//   // Sample data for charts (you can replace with real data)
//   const sleepQualityChartData = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       {
//         label: 'Sleep Quality',
//         data: [8, 7, 6, 8, 9, 7, 8],
//         borderColor: colors.info,
//         backgroundColor: `${colors.info}20`,
//         tension: 0.4
//       }
//     ]
//   };

//   const activityChartData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//       {
//         label: 'Workouts',
//         data: [12, 19, 15, 25, 22, 30],
//         backgroundColor: colors.success,
//       },
//       {
//         label: 'Self-Care',
//         data: [8, 15, 12, 18, 16, 20],
//         backgroundColor: colors.accent,
//       }
//     ]
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           color: colors.text,
//           font: {
//             size: 12
//           }
//         }
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: `${colors.text}20`
//         },
//         ticks: {
//           color: colors.text
//         }
//       },
//       x: {
//         grid: {
//           color: `${colors.text}20`
//         },
//         ticks: {
//           color: colors.text
//         }
//       }
//     }
//   };

//   if (loading && !dashboardData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: colors.accent }}></div>
//           <p style={{ color: colors.text }}>Loading your wellness dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: colors.background }}>
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold" style={{ color: colors.text }}>Wellness Dashboard</h1>
//             <p className="mt-1" style={{ color: colors.text + 'CC' }}>
//               Track your health insights and weekly progress
//             </p>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <button
//               onClick={handleRefresh}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
//               style={{ 
//                 backgroundColor: colors.lightAccent,
//                 color: colors.darkAccent
//               }}
//               disabled={loading}
//             >
//               <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//               Refresh
//             </button>
            
//             <button
//               onClick={handleGenerateReport}
//               disabled={generatingReport}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
//               style={{ 
//                 backgroundColor: colors.accent,
//                 color: '#FFFFFF'
//               }}
//             >
//               {generatingReport ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                   Generating...
//                 </>
//               ) : (
//                 <>
//                   <FileText className="w-4 h-4" />
//                   Generate Report
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
        
//         {/* Tabs */}
//         <div className="flex gap-2 mt-6 border-b" style={{ borderColor: colors.text + '20' }}>
//           <button
//             onClick={() => setActiveTab('weekly')}
//             className={`px-4 py-2 font-medium ${activeTab === 'weekly' ? 'border-b-2' : ''}`}
//             style={{
//               color: activeTab === 'weekly' ? colors.accent : colors.text + 'CC',
//               borderColor: activeTab === 'weekly' ? colors.accent : 'transparent'
//             }}
//           >
//             <div className="flex items-center gap-2">
//               <Calendar className="w-4 h-4" />
//               Weekly Overview
//             </div>
//           </button>
//           <button
//             onClick={() => setActiveTab('insights')}
//             className={`px-4 py-2 font-medium ${activeTab === 'insights' ? 'border-b-2' : ''}`}
//             style={{
//               color: activeTab === 'insights' ? colors.accent : colors.text + 'CC',
//               borderColor: activeTab === 'insights' ? colors.accent : 'transparent'
//             }}
//           >
//             <div className="flex items-center gap-2">
//               <Brain className="w-4 h-4" />
//               AI Insights
//             </div>
//           </button>
//           <button
//             onClick={() => setActiveTab('activity')}
//             className={`px-4 py-2 font-medium ${activeTab === 'activity' ? 'border-b-2' : ''}`}
//             style={{
//               color: activeTab === 'activity' ? colors.accent : colors.text + 'CC',
//               borderColor: activeTab === 'activity' ? colors.accent : 'transparent'
//             }}
//           >
//             <div className="flex items-center gap-2">
//               <Activity className="w-4 h-4" />
//               Activity Log
//             </div>
//           </button>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-6 p-4 rounded-lg flex items-start gap-3" style={{ backgroundColor: `${colors.error}20`, borderLeft: `4px solid ${colors.error}` }}>
//           <AlertCircle className="w-5 h-5 mt-0.5" style={{ color: colors.error }} />
//           <div>
//             <p className="font-medium" style={{ color: colors.error }}>Error</p>
//             <p style={{ color: colors.text }}>{error}</p>
//           </div>
//         </div>
//       )}

//       {/* Weekly Overview Tab */}
//       {activeTab === 'weekly' && dashboardData && (
//         <>
//           {/* Summary Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm" style={{ color: colors.text + 'CC' }}>Sleep Hours</p>
//                   <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>
//                     {dashboardData.weeklySummary?.totalSleepHours?.toFixed(1) || '0'}h
//                   </p>
//                   <p className="text-sm mt-1" style={{ color: colors.accent }}>
//                     Quality: {dashboardData.weeklySummary?.avgSleepQuality || '0'}/10
//                   </p>
//                 </div>
//                 <div className="p-3 rounded-full" style={{ backgroundColor: `${colors.info}20` }}>
//                   <Moon className="w-6 h-6" style={{ color: colors.info }} />
//                 </div>
//               </div>
//             </div>

//             <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm" style={{ color: colors.text + 'CC' }}>Workouts</p>
//                   <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>
//                     {dashboardData.weeklySummary?.totalWorkouts || '0'}
//                   </p>
//                   <p className="text-sm mt-1" style={{ color: colors.success }}>
//                     ~{dashboardData.weeklySummary?.avgCaloriesBurned || '0'} calories
//                   </p>
//                 </div>
//                 <div className="p-3 rounded-full" style={{ backgroundColor: `${colors.success}20` }}>
//                   <Dumbbell className="w-6 h-6" style={{ color: colors.success }} />
//                 </div>
//               </div>
//             </div>

//             <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm" style={{ color: colors.text + 'CC' }}>Self-Care</p>
//                   <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>
//                     {dashboardData.weeklySummary?.totalSelfCare || '0'}
//                   </p>
//                   <p className="text-sm mt-1" style={{ color: colors.accent }}>
//                     Activities completed
//                   </p>
//                 </div>
//                 <div className="p-3 rounded-full" style={{ backgroundColor: `${colors.accent}20` }}>
//                   <Brain className="w-6 h-6" style={{ color: colors.accent }} />
//                 </div>
//               </div>
//             </div>

//             <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm" style={{ color: colors.text + 'CC' }}>Community</p>
//                   <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>
//                     {dashboardData.weeklySummary?.totalPosts || '0'}
//                   </p>
//                   <p className="text-sm mt-1" style={{ color: colors.primary }}>
//                     Posts & interactions
//                   </p>
//                 </div>
//                 <div className="p-3 rounded-full" style={{ backgroundColor: `${colors.primary}20` }}>
//                   <Users className="w-6 h-6" style={{ color: colors.primary }} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//             {/* Weekly Activity Chart */}
//             <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-bold" style={{ color: colors.text }}>Weekly Activity Summary</h3>
//                 <BarChart3 className="w-5 h-5" style={{ color: colors.text + '80' }} />
//               </div>
//               <div className="h-64">
//                 {weeklyChartData ? (
//                   <Bar data={weeklyChartData} options={chartOptions} />
//                 ) : (
//                   <div className="h-full flex items-center justify-center" style={{ color: colors.text + '80' }}>
//                     No weekly data available
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Sleep Quality Chart */}
//             <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-bold" style={{ color: colors.text }}>Sleep Quality Trend</h3>
//                 <TrendingUp className="w-5 h-5" style={{ color: colors.text + '80' }} />
//               </div>
//               <div className="h-64">
//                 <Line data={sleepQualityChartData} options={chartOptions} />
//               </div>
//             </div>
//           </div>

//           {/* AI Summary */}
//           {dashboardData.aiSummary && (
//             <div className="mb-6 p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="p-2 rounded-full" style={{ backgroundColor: `${colors.accent}20` }}>
//                   <Brain className="w-5 h-5" style={{ color: colors.accent }} />
//                 </div>
//                 <h3 className="font-bold" style={{ color: colors.text }}>AI Wellness Summary</h3>
//               </div>
//               <p style={{ color: colors.text }}>
//                 {dashboardData.aiSummary}
//               </p>
//             </div>
//           )}
//         </>
//       )}

//       {/* Insights Tab */}
//       {activeTab === 'insights' && (
//         <div className="space-y-6">
//           {/* Generate New Insights */}
//           <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
//             <h3 className="font-bold mb-4" style={{ color: colors.text }}>Generate New Insights</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
//               {['sleepRecovery', 'fitness', 'nutrition', 'selfCare', 'community'].map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => handleGenerateInsight(category)}
//                   disabled={loading}
//                   className="p-3 rounded-lg text-center transition-all hover:scale-105 disabled:opacity-50"
//                   style={{ 
//                     backgroundColor: getCategoryColor(category) + '20',
//                     color: getCategoryColor(category)
//                   }}
//                 >
//                   <div className="flex flex-col items-center gap-2">
//                     {getCategoryIcon(category)}
//                     <span className="text-sm font-medium capitalize">
//                       {category === 'sleepRecovery' ? 'Sleep' : category}
//                     </span>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Recent Insights */}
//           <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
//             <h3 className="font-bold mb-4" style={{ color: colors.text }}>Recent Insights</h3>
//             <div className="space-y-4">
//               {insights.length > 0 ? (
//                 insights.map((insight) => (
//                   <div
//                     key={insight._id}
//                     className="p-4 rounded-lg border"
//                     style={{ 
//                       backgroundColor: colors.background,
//                       borderColor: getCategoryColor(insight.category) + '40'
//                     }}
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-center gap-3">
//                         <div
//                           className="p-2 rounded-full"
//                           style={{ backgroundColor: getCategoryColor(insight.category) + '20' }}
//                         >
//                           {getCategoryIcon(insight.category)}
//                         </div>
//                         <div>
//                           <h4 className="font-bold capitalize" style={{ color: colors.text }}>
//                             {insight.category === 'sleepRecovery' ? 'Sleep Recovery' : insight.category}
//                           </h4>
//                           <p className="text-sm mt-1" style={{ color: colors.text + 'CC' }}>
//                             {insight.summary}
//                           </p>
//                         </div>
//                       </div>
//                       <span className="text-sm" style={{ color: colors.text + '80' }}>
//                         {formatDate(insight.createdAt)}
//                       </span>
//                     </div>
                    
//                     {insight.aiGeneratedTips && insight.aiGeneratedTips.length > 0 && (
//                       <div className="mt-3 pt-3 border-t" style={{ borderColor: getCategoryColor(insight.category) + '20' }}>
//                         <p className="text-sm font-medium mb-2" style={{ color: colors.text }}>
//                           AI Recommendations:
//                         </p>
//                         <ul className="space-y-1">
//                           {insight.aiGeneratedTips.map((tip, index) => (
//                             <li key={index} className="text-sm flex items-start gap-2" style={{ color: colors.text + 'CC' }}>
//                               <span className="mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getCategoryColor(insight.category) }}></span>
//                               {tip}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-8" style={{ color: colors.text + '80' }}>
//                   <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
//                   <p>No insights generated yet. Generate your first insight above!</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Activity Tab */}
//       {activeTab === 'activity' && (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Activity Stats */}
//           <div className="lg:col-span-2 p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
//             <h3 className="font-bold mb-4" style={{ color: colors.text }}>Activity Overview</h3>
//             <div className="h-80">
//               <Bar data={activityChartData} options={chartOptions} />
//             </div>
//           </div>

//           {/* Quick Stats */}
//           <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
//             <h3 className="font-bold mb-4" style={{ color: colors.text }}>Quick Stats</h3>
//             <div className="space-y-4">
//               {stats ? (
//                 <>
//                   <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
//                     <div className="flex items-center gap-3">
//                       <Moon className="w-4 h-4" style={{ color: colors.info }} />
//                       <span style={{ color: colors.text }}>Sleep Records</span>
//                     </div>
//                     <span className="font-bold" style={{ color: colors.text }}>{stats.recordCounts?.sleep || 0}</span>
//                   </div>
//                   <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
//                     <div className="flex items-center gap-3">
//                       <Dumbbell className="w-4 h-4" style={{ color: colors.success }} />
//                       <span style={{ color: colors.text }}>Workout Sessions</span>
//                     </div>
//                     <span className="font-bold" style={{ color: colors.text }}>{stats.recordCounts?.fitness || 0}</span>
//                   </div>
//                   <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
//                     <div className="flex items-center gap-3">
//                       <Brain className="w-4 h-4" style={{ color: colors.accent }} />
//                       <span style={{ color: colors.text }}>Self-Care Activities</span>
//                     </div>
//                     <span className="font-bold" style={{ color: colors.text }}>{stats.recordCounts?.selfCare || 0}</span>
//                   </div>
//                   <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
//                     <div className="flex items-center gap-3">
//                       <Users className="w-4 h-4" style={{ color: colors.primary }} />
//                       <span style={{ color: colors.text }}>Community Posts</span>
//                     </div>
//                     <span className="font-bold" style={{ color: colors.text }}>{stats.recordCounts?.community || 0}</span>
//                   </div>
//                 </>
//               ) : (
//                 <div className="text-center py-8" style={{ color: colors.text + '80' }}>
//                   <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
//                   <p>Loading activity stats...</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Report History */}
//           <div className="lg:col-span-3 p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="font-bold" style={{ color: colors.text }}>Recent Reports</h3>
//               <button
//                 onClick={handleGenerateReport}
//                 disabled={generatingReport}
//                 className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg"
//                 style={{ 
//                   backgroundColor: colors.lightAccent,
//                   color: colors.darkAccent
//                 }}
//               >
//                 <FileText className="w-4 h-4" />
//                 New Report
//               </button>
//             </div>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
//                 <div className="flex items-center gap-3">
//                   <FileText className="w-4 h-4" style={{ color: colors.accent }} />
//                   <div>
//                     <p style={{ color: colors.text }}>Weekly Health Report</p>
//                     <p className="text-sm" style={{ color: colors.text + '80' }}>
//                       Generated {new Date().toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//                 <button 
//                   onClick={handleGenerateReport}
//                   className="p-1.5 rounded hover:opacity-80 transition-opacity" 
//                   style={{ backgroundColor: colors.lightAccent }}
//                 >
//                   <Download className="w-4 h-4" style={{ color: colors.darkAccent }} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabInsightsDashboard;

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Download,
  FileText,
  Moon,
  Dumbbell,
  Heart,
  Users,
  Brain,
  Clock,
  Activity,
  TrendingUp,
  Calendar,
  RefreshCw,
  AlertCircle,
  Shield,
  Droplets,
  Thermometer,
  ActivitySquare
} from 'lucide-react';
import { apiService } from '../../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const LabInsights = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [activeTab, setActiveTab] = useState('weekly');
  const [insights, setInsights] = useState([]);
  const [activityStats, setActivityStats] = useState(null);
  const [error, setError] = useState(null);
  const [sleepData, setSleepData] = useState([]);

  // Color palette from your specifications
  const colors = {
    background: '#F4F1E9',
    primary: '#B1D182',
    text: '#0B132B',
    accent: '#688F48',
    lightAccent: '#E8F4D9',
    darkAccent: '#4A6B33',
    card: '#FFFFFF',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    sleep: '#3B82F6',
    fitness: '#10B981',
    nutrition: '#F59E0B',
    selfcare: '#8B5CF6',
    community: '#EC4899',
    femaleHealth: '#EF4444',
    menHealth: '#6366F1'
  };

  useEffect(() => {
    fetchDashboardData();
    fetchRecentInsights();
    fetchActivityStatsData();
    fetchSleepHistory();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getDashboardInsights();
      setDashboardData(data);
      setError(null);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentInsights = async () => {
    try {
      const data = await apiService.fetchInsights();
      setInsights(Array.isArray(data) ? data.slice(0, 5) : []);
    } catch (err) {
      console.error('Insights fetch error:', err);
    }
  };

  const fetchActivityStatsData = async () => {
    try {
      const response = await apiService.getActivityStats();
      if (response.success) {
        setActivityStats(response);
      }
    } catch (err) {
      console.error('Activity stats fetch error:', err);
    }
  };

  const fetchSleepHistory = async () => {
    try {
      const data = await apiService.getSleepHistory();
      if (Array.isArray(data)) {
        setSleepData(data.slice(0, 7)); // Last 7 days
      }
    } catch (err) {
      console.error('Sleep history fetch error:', err);
    }
  };

  const handleGenerateReport = async () => {
    try {
      setGeneratingReport(true);
      setError(null);
      
      // First generate the report
      const response = await apiService.generateWeeklyReport();
      
      if (response.success && response.downloadUrl) {
        // Extract filename from download URL
        const filename = response.downloadUrl.split('/').pop();
        
        // Download the report
        const downloadResponse = await apiService.downloadWeeklyReport(filename);
        
        // Create blob and trigger download
        const blob = new Blob([downloadResponse.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || 'weekly-health-report.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        // Refresh dashboard data
        fetchDashboardData();
      } else {
        setError(response.message || 'Failed to generate report');
      }
    } catch (err) {
      console.error('Report generation error:', err);
      setError('Failed to generate report. Please try again.');
    } finally {
      setGeneratingReport(false);
    }
  };

  const handleRefresh = () => {
    fetchDashboardData();
    fetchRecentInsights();
    fetchActivityStatsData();
    fetchSleepHistory();
  };

  const handleGenerateInsight = async (category) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.collectRealData(category);
      
      if (response.success) {
        // Refresh all data
        fetchDashboardData();
        fetchRecentInsights();
        fetchActivityStatsData();
      } else {
        setError(response.message || `Failed to generate ${category} insight`);
      }
    } catch (err) {
      console.error('Insight generation error:', err);
      setError(`Failed to generate ${category} insight`);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAllTimeInsight = async (category) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.collectAllTimeData(category);
      
      if (response.success) {
        fetchDashboardData();
        fetchRecentInsights();
      } else {
        setError(response.message || `Failed to generate all-time ${category} insight`);
      }
    } catch (err) {
      console.error('All-time insight generation error:', err);
      setError(`Failed to generate all-time ${category} insight`);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getCategoryIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'sleeprecovery':
      case 'sleep':
        return <Moon className="w-5 h-5" />;
      case 'fitness':
        return <Dumbbell className="w-5 h-5" />;
      case 'nutrition':
        return <Heart className="w-5 h-5" />;
      case 'selfcare':
      case 'self-care':
        return <Brain className="w-5 h-5" />;
      case 'community':
        return <Users className="w-5 h-5" />;
      case 'femalehealth':
        return <Droplets className="w-5 h-5" />;
      case 'menhealth':
        return <Shield className="w-5 h-5" />;
      case 'blood-test':
        return <Thermometer className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category?.toLowerCase()) {
      case 'sleeprecovery':
      case 'sleep':
        return colors.sleep;
      case 'fitness':
        return colors.fitness;
      case 'nutrition':
        return colors.nutrition;
      case 'selfcare':
      case 'self-care':
        return colors.selfcare;
      case 'community':
        return colors.community;
      case 'femalehealth':
        return colors.femaleHealth;
      case 'menhealth':
        return colors.menHealth;
      case 'blood-test':
        return colors.error;
      default:
        return colors.text;
    }
  };

  const getCategoryDisplayName = (category) => {
    switch(category?.toLowerCase()) {
      case 'sleeprecovery':
        return 'Sleep Recovery';
      case 'selfcare':
        return 'Self Care';
      case 'femalehealth':
        return 'Female Health';
      case 'menhealth':
        return 'Men Health';
      case 'blood-test':
        return 'Blood Test';
      default:
        return category?.charAt(0).toUpperCase() + category?.slice(1) || 'Unknown';
    }
  };

  // Prepare real chart data from backend
  const prepareWeeklyChartData = () => {
    if (!dashboardData?.weeklySummary) return null;
    
    return {
      labels: ['Sleep Hours', 'Workouts', 'Self-Care', 'Community Posts'],
      datasets: [
        {
          label: 'This Week',
          data: [
            dashboardData.weeklySummary.totalSleepHours || 0,
            dashboardData.weeklySummary.totalWorkouts || 0,
            dashboardData.weeklySummary.totalSelfCare || 0,
            dashboardData.weeklySummary.totalPosts || 0
          ],
          backgroundColor: [
            colors.sleep,
            colors.fitness,
            colors.selfcare,
            colors.community
          ],
          borderColor: [
            colors.sleep,
            colors.fitness,
            colors.selfcare,
            colors.community
          ],
          borderWidth: 1
        }
      ]
    };
  };

  const prepareSleepQualityChartData = () => {
    if (!sleepData.length) return null;
    
    const last7Days = sleepData.slice(-7);
    return {
      labels: last7Days.map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - index));
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      }),
      datasets: [
        {
          label: 'Sleep Quality',
          data: last7Days.map(record => record.sleepQuality || record.quality || 0),
          borderColor: colors.sleep,
          backgroundColor: `${colors.sleep}20`,
          tension: 0.4,
          fill: true
        }
      ]
    };
  };

  const prepareActivityTrendData = () => {
    if (!activityStats?.recordCounts) return null;
    
    // This would ideally come from historical data, but we'll use current stats
    return {
      labels: ['Sleep', 'Fitness', 'Nutrition', 'Self-Care', 'Community'],
      datasets: [
        {
          label: 'Activity Records',
          data: [
            activityStats.recordCounts.sleep || 0,
            activityStats.recordCounts.fitness || 0,
            activityStats.recordCounts.nutrition || 0,
            activityStats.recordCounts.selfCare || 0,
            activityStats.recordCounts.community || 0
          ],
          backgroundColor: [
            colors.sleep,
            colors.fitness,
            colors.nutrition,
            colors.selfcare,
            colors.community
          ]
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: colors.text,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: colors.card,
        titleColor: colors.text,
        bodyColor: colors.text,
        borderColor: colors.text + '20',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: colors.text + '10'
        },
        ticks: {
          color: colors.text + '80'
        }
      },
      x: {
        grid: {
          color: colors.text + '10'
        },
        ticks: {
          color: colors.text + '80'
        }
      }
    }
  };

  const lineChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        grid: {
          color: colors.text + '10'
        },
        ticks: {
          color: colors.text + '80'
        }
      },
      x: {
        grid: {
          color: colors.text + '10'
        },
        ticks: {
          color: colors.text + '80'
        }
      }
    }
  };

  if (loading && !dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: colors.accent }}></div>
          <p style={{ color: colors.text }}>Loading your wellness dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{ color: colors.text }}>Lab Insights Dashboard</h1>
            <p className="mt-1" style={{ color: colors.text + 'CC' }}>
              AI-powered health insights and weekly progress tracking
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:opacity-90"
              style={{ 
                backgroundColor: colors.lightAccent,
                color: colors.darkAccent
              }}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            
            <button
              onClick={handleGenerateReport}
              disabled={generatingReport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
              style={{ 
                backgroundColor: colors.accent,
                color: '#FFFFFF'
              }}
            >
              {generatingReport ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2 mt-6 border-b" style={{ borderColor: colors.text + '20' }}>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'weekly' ? 'border-b-2' : ''}`}
            style={{
              color: activeTab === 'weekly' ? colors.accent : colors.text + 'CC',
              borderColor: activeTab === 'weekly' ? colors.accent : 'transparent'
            }}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Weekly Overview
            </div>
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'insights' ? 'border-b-2' : ''}`}
            style={{
              color: activeTab === 'insights' ? colors.accent : colors.text + 'CC',
              borderColor: activeTab === 'insights' ? colors.accent : 'transparent'
            }}
          >
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI Insights
            </div>
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'activity' ? 'border-b-2' : ''}`}
            style={{
              color: activeTab === 'activity' ? colors.accent : colors.text + 'CC',
              borderColor: activeTab === 'activity' ? colors.accent : 'transparent'
            }}
          >
            <div className="flex items-center gap-2">
              <ActivitySquare className="w-4 h-4" />
              Activity Log
            </div>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 rounded-lg flex items-start gap-3" style={{ backgroundColor: `${colors.error}15`, borderLeft: `4px solid ${colors.error}` }}>
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: colors.error }} />
          <div>
            <p className="font-medium" style={{ color: colors.error }}>Error</p>
            <p className="text-sm" style={{ color: colors.text }}>{error}</p>
          </div>
        </div>
      )}

      {/* Weekly Overview Tab */}
      {activeTab === 'weekly' && dashboardData && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.text + 'CC' }}>Sleep Hours</p>
                  <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>
                    {dashboardData.weeklySummary?.totalSleepHours?.toFixed(1) || '0.0'}h
                  </p>
                  <p className="text-sm mt-1" style={{ color: colors.sleep }}>
                    Quality: {dashboardData.weeklySummary?.avgSleepQuality || '0'}/10
                  </p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: colors.sleep + '20' }}>
                  <Moon className="w-6 h-6" style={{ color: colors.sleep }} />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.text + 'CC' }}>Workouts</p>
                  <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>
                    {dashboardData.weeklySummary?.totalWorkouts || 0}
                  </p>
                  <p className="text-sm mt-1" style={{ color: colors.fitness }}>
                    ~{dashboardData.weeklySummary?.avgCaloriesBurned || 0} calories
                  </p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: colors.fitness + '20' }}>
                  <Dumbbell className="w-6 h-6" style={{ color: colors.fitness }} />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.text + 'CC' }}>Self-Care</p>
                  <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>
                    {dashboardData.weeklySummary?.totalSelfCare || 0}
                  </p>
                  <p className="text-sm mt-1" style={{ color: colors.selfcare }}>
                    Activities completed
                  </p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: colors.selfcare + '20' }}>
                  <Brain className="w-6 h-6" style={{ color: colors.selfcare }} />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.text + 'CC' }}>Community</p>
                  <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>
                    {dashboardData.weeklySummary?.totalPosts || 0}
                  </p>
                  <p className="text-sm mt-1" style={{ color: colors.community }}>
                    Posts & interactions
                  </p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: colors.community + '20' }}>
                  <Users className="w-6 h-6" style={{ color: colors.community }} />
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Weekly Activity Chart */}
            <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold" style={{ color: colors.text }}>Weekly Activity Summary</h3>
                <BarChart3 className="w-5 h-5" style={{ color: colors.text + '80' }} />
              </div>
              <div className="h-64">
                {prepareWeeklyChartData() ? (
                  <Bar data={prepareWeeklyChartData()} options={chartOptions} />
                ) : (
                  <div className="h-full flex items-center justify-center" style={{ color: colors.text + '80' }}>
                    <p>No activity data available for this week</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sleep Quality Chart */}
            <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold" style={{ color: colors.text }}>Sleep Quality Trend</h3>
                <TrendingUp className="w-5 h-5" style={{ color: colors.text + '80' }} />
              </div>
              <div className="h-64">
                {prepareSleepQualityChartData() ? (
                  <Line data={prepareSleepQualityChartData()} options={lineChartOptions} />
                ) : (
                  <div className="h-full flex items-center justify-center" style={{ color: colors.text + '80' }}>
                    <p>No sleep data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI Summary */}
          {dashboardData.aiSummary && (
            <div className="mb-6 p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full" style={{ backgroundColor: colors.accent + '20' }}>
                  <Brain className="w-5 h-5" style={{ color: colors.accent }} />
                </div>
                <h3 className="font-bold" style={{ color: colors.text }}>AI Wellness Summary</h3>
              </div>
              <p style={{ color: colors.text, lineHeight: '1.6' }}>
                {dashboardData.aiSummary}
              </p>
            </div>
          )}

          {/* Recent Insights Preview */}
          {dashboardData.recentInsights && dashboardData.recentInsights.length > 0 && (
            <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
              <h3 className="font-bold mb-4" style={{ color: colors.text }}>Recent Insights</h3>
              <div className="space-y-3">
                {dashboardData.recentInsights.slice(0, 3).map((insight, index) => (
                  <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
                    <div className="flex items-center gap-2 mb-1">
                      {getCategoryIcon(insight.category)}
                      <span className="font-medium" style={{ color: getCategoryColor(insight.category) }}>
                        {getCategoryDisplayName(insight.category)}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: colors.text + 'CC' }}>
                      {insight.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          {/* Generate New Insights */}
          <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
            <h3 className="font-bold mb-4" style={{ color: colors.text }}>Generate New Insights</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {['sleepRecovery', 'fitness', 'nutrition', 'selfCare'].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleGenerateInsight(category)}
                    disabled={loading}
                    className="p-4 rounded-lg text-center transition-all hover:scale-[1.02] disabled:opacity-50"
                    style={{ 
                      backgroundColor: getCategoryColor(category) + '15',
                      color: getCategoryColor(category),
                      border: `2px solid ${getCategoryColor(category)}20`
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-2 rounded-full" style={{ backgroundColor: getCategoryColor(category) + '30' }}>
                        {getCategoryIcon(category)}
                      </div>
                      <span className="text-sm font-medium capitalize">
                        {getCategoryDisplayName(category)}
                      </span>
                      <span className="text-xs opacity-75">Weekly Data</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {['community', 'femaleHealth', 'menHealth', 'blood-test'].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleGenerateAllTimeInsight(category)}
                    disabled={loading}
                    className="p-4 rounded-lg text-center transition-all hover:scale-[1.02] disabled:opacity-50"
                    style={{ 
                      backgroundColor: getCategoryColor(category) + '15',
                      color: getCategoryColor(category),
                      border: `2px solid ${getCategoryColor(category)}20`
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-2 rounded-full" style={{ backgroundColor: getCategoryColor(category) + '30' }}>
                        {getCategoryIcon(category)}
                      </div>
                      <span className="text-sm font-medium capitalize">
                        {getCategoryDisplayName(category)}
                      </span>
                      <span className="text-xs opacity-75">All Time Data</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Insights */}
          <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold" style={{ color: colors.text }}>Your Insights</h3>
              <span className="text-sm" style={{ color: colors.text + '80' }}>
                {insights.length} total insights
              </span>
            </div>
            <div className="space-y-4">
              {insights.length > 0 ? (
                insights.map((insight) => (
                  <div
                    key={insight._id}
                    className="p-4 rounded-lg border"
                    style={{ 
                      backgroundColor: colors.background,
                      borderColor: getCategoryColor(insight.category) + '40',
                      borderLeft: `4px solid ${getCategoryColor(insight.category)}`
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2 rounded-full"
                          style={{ backgroundColor: getCategoryColor(insight.category) + '20' }}
                        >
                          {getCategoryIcon(insight.category)}
                        </div>
                        <div>
                          <h4 className="font-bold" style={{ color: colors.text }}>
                            {getCategoryDisplayName(insight.category)} Analysis
                          </h4>
                          <p className="text-sm mt-1" style={{ color: colors.text + 'CC' }}>
                            {insight.summary}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm whitespace-nowrap" style={{ color: colors.text + '80' }}>
                        {formatDate(insight.createdAt)}
                      </span>
                    </div>
                    
                    {insight.aiGeneratedTips && insight.aiGeneratedTips.length > 0 && (
                      <div className="mt-3 pt-3 border-t" style={{ borderColor: getCategoryColor(insight.category) + '20' }}>
                        <p className="text-sm font-medium mb-2" style={{ color: colors.text }}>
                          AI Recommendations:
                        </p>
                        <ul className="space-y-2">
                          {insight.aiGeneratedTips.map((tip, index) => (
                            <li key={index} className="text-sm flex items-start gap-2" style={{ color: colors.text + 'CC' }}>
                              <span className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: getCategoryColor(insight.category) }}></span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8" style={{ color: colors.text + '80' }}>
                  <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No insights generated yet. Generate your first insight above!</p>
                  <p className="text-sm mt-2">Select a category to analyze your data</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Stats */}
          <div className="lg:col-span-2 p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
            <h3 className="font-bold mb-4" style={{ color: colors.text }}>Activity Overview</h3>
            <div className="h-80">
              {prepareActivityTrendData() ? (
                <Bar data={prepareActivityTrendData()} options={chartOptions} />
              ) : (
                <div className="h-full flex items-center justify-center" style={{ color: colors.text + '80' }}>
                  <p>No activity data available</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
            <h3 className="font-bold mb-4" style={{ color: colors.text }}>Quick Stats</h3>
            <div className="space-y-4">
              {activityStats ? (
                <>
                  <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
                    <div className="flex items-center gap-3">
                      <Moon className="w-4 h-4" style={{ color: colors.sleep }} />
                      <span style={{ color: colors.text }}>Sleep Records</span>
                    </div>
                    <span className="font-bold" style={{ color: colors.text }}>{activityStats.recordCounts?.sleep || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
                    <div className="flex items-center gap-3">
                      <Dumbbell className="w-4 h-4" style={{ color: colors.fitness }} />
                      <span style={{ color: colors.text }}>Workout Sessions</span>
                    </div>
                    <span className="font-bold" style={{ color: colors.text }}>{activityStats.recordCounts?.fitness || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
                    <div className="flex items-center gap-3">
                      <Heart className="w-4 h-4" style={{ color: colors.nutrition }} />
                      <span style={{ color: colors.text }}>Nutrition Logs</span>
                    </div>
                    <span className="font-bold" style={{ color: colors.text }}>{activityStats.recordCounts?.nutrition || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
                    <div className="flex items-center gap-3">
                      <Brain className="w-4 h-4" style={{ color: colors.selfcare }} />
                      <span style={{ color: colors.text }}>Self-Care Activities</span>
                    </div>
                    <span className="font-bold" style={{ color: colors.text }}>{activityStats.recordCounts?.selfCare || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4" style={{ color: colors.community }} />
                      <span style={{ color: colors.text }}>Community Posts</span>
                    </div>
                    <span className="font-bold" style={{ color: colors.text }}>{activityStats.recordCounts?.community || 0}</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-8" style={{ color: colors.text + '80' }}>
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Loading activity stats...</p>
                </div>
              )}
            </div>
          </div>

          {/* Report History */}
          <div className="lg:col-span-3 p-4 rounded-xl shadow-sm" style={{ backgroundColor: colors.card }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold" style={{ color: colors.text }}>Reports</h3>
              <button
                onClick={handleGenerateReport}
                disabled={generatingReport}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors hover:opacity-90"
                style={{ 
                  backgroundColor: colors.lightAccent,
                  color: colors.darkAccent
                }}
              >
                <FileText className="w-4 h-4" />
                {generatingReport ? 'Generating...' : 'New Report'}
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: colors.background }}>
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" style={{ color: colors.accent }} />
                  <div>
                    <p className="font-medium" style={{ color: colors.text }}>Weekly Health Report</p>
                    <p className="text-sm" style={{ color: colors.text + '80' }}>
                      Generated on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleGenerateReport}
                  className="p-1.5 rounded transition-colors hover:opacity-90"
                  style={{ backgroundColor: colors.lightAccent }}
                >
                  <Download className="w-4 h-4" style={{ color: colors.darkAccent }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabInsights;