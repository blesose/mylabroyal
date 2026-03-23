// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';
// import {
//   Apple,
//   Flame,
//   Heart,
//   Moon, 
//   Dumbbell,
//   Users,
//   Brain,
//   Calendar,
//   TrendingUp,
//   Activity,
//   Droplets,
//   Shield,
//   UtensilsCrossed,
//   MessageCircle,
//   Clock,
//   AlertCircle,
//   BarChart3,
//   Download,
//   CheckCircle,
//   XCircle,
//   Baby,
//   Stethoscope
// } from 'lucide-react';
// import { apiService } from '../../services/api';
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
//   LineElement,
//   Filler
// } from 'chart.js';
// import { Line, Doughnut } from 'react-chartjs-2';

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
//   LineElement,
//   Filler
// );

// // Custom Toast Components
// const SuccessToast = ({ message, description }) => (
//   <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-green-200 flex items-center gap-3 min-w-[280px]">
//     <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
//       <CheckCircle className="w-5 h-5 text-white" />
//     </div>
//     <div>
//       <p className="font-bold text-gray-800 text-sm">{message}</p>
//       <p className="text-xs text-gray-600">{description}</p>
//     </div>
//   </div>
// );

// const ErrorToast = ({ message, description }) => (
//   <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-red-200 flex items-center gap-3 min-w-[280px]">
//     <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-400 to-red-500 flex items-center justify-center flex-shrink-0">
//       <XCircle className="w-5 h-5 text-white" />
//     </div>
//     <div>
//       <p className="font-bold text-gray-800 text-sm">{message}</p>
//       <p className="text-xs text-gray-600">{description}</p>
//     </div>
//   </div>
// );

// // Helper function to calculate sleep duration from start and end times
// const calculateSleepDuration = (sleepStart, sleepEnd) => {
//   if (!sleepStart || !sleepEnd) return 0;
//   try {
//     const start = new Date(`2000-01-01T${sleepStart}`);
//     const end = new Date(`2000-01-01T${sleepEnd}`);
//     let diff = (end - start) / (1000 * 60 * 60);
//     if (diff < 0) diff += 24;
//     return diff;
//   } catch {
//     return 0;
//   }
// };

// const LabInsights = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [generatingReport, setGeneratingReport] = useState(false);
//   const [user, setUser] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [dashboardData, setDashboardData] = useState({
//     femaleHealth: {
//       hasData: false,
//       lastCycle: null,
//       cycleLength: 28,
//       nextCycle: null,
//       ovulationWindow: null,
//       pregnancy: {
//         hasData: false,
//         isPregnant: false,
//         dueDate: null,
//         trimester: null,
//         weeksPregnant: 0,
//         startDate: null,
//         conceptionDate: null
//       }
//     },
//     menHealth: {
//       hasData: false,
//       lastCheckup: null,
//       healthStatus: 'Good',
//       averageStress: 0,
//       averageEnergy: 0,
//       averageSleep: 0,
//       workoutDays: 0,
//       recentMoods: [],
//       healthScore: 0
//     },
//     sleep: {
//       records: [],
//       avgHours: 0,
//       avgQuality: 0,
//       totalHours: 0
//     },
//     fitness: {
//       records: [],
//       totalWorkouts: 0,
//       totalDuration: 0,
//       totalCalories: 0
//     },
//     nutrition: {
//       records: [],
//       totalCalories: 0,
//       avgCalories: 0,
//       totalProtein: 0,
//       totalCarbs: 0,
//       totalFats: 0
//     },
//     wellness: {
//       activities: [],
//       totalActivities: 0,
//       moodScores: []
//     },
//     community: {
//       posts: [],
//       totalPosts: 0,
//       totalLikes: 0,
//       totalComments: 0
//     },
//     recentActivity: []
//   });

//   const [weeklyStats, setWeeklyStats] = useState({
//     workouts: 0,
//     caloriesBurned: 0,
//     sleepHours: 0,
//     sleepQuality: 0,
//     caloriesEaten: 0,
//     proteinEaten: 0,
//     communityPosts: 0
//   });

//   const [trends, setTrends] = useState({
//     sleep: [],
//     calories: [],
//     workouts: []
//   });

//   const colors = {
//     background: '#F4F1E9',
//     primary: '#B1D182',
//     text: '#0B132B',
//     accent: '#688F48',
//     lightAccent: '#E8F4D9',
//     card: '#FFFFFF',
//     female: '#EF4444',
//     male: '#3B82F6',
//     sleep: '#8B5CF6',
//     fitness: '#10B981',
//     nutrition: '#F59E0B',
//     wellness: '#EC4899',
//     community: '#6366F1',
//     pregnancy: '#EC4899'
//   };

//   // Get user from localStorage
//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setUser(parsedUser);
//         setUserId(parsedUser._id || parsedUser.id);
//         console.log('✅ User loaded:', parsedUser.name);
//       } catch (e) {
//         console.error('Error parsing user:', e);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       fetchAllData();
//     }
//   }, [userId]);

//   const fetchAllData = async () => {
//     if (!userId) {
//       console.log('No user ID found');
//       setLoading(false);
//       return;
//     }
    
//     setLoading(true);
//     try {
//       console.log('📡 Fetching dashboard data for user:', userId);

//       // Fetch all data in parallel with proper error handling
//       const [
//         cycles,
//         sleepRecords,
//         fitnessRecords,
//         nutritionRecords,
//         wellnessActivities,
//         communityPosts,
//         menHealthRecords,
//         pregnancyRecords
//       ] = await Promise.allSettled([
//         apiService.getCycles(userId).catch(() => null),
//         apiService.getSleepHistory().catch(() => []),
//         apiService.getAllFitness().catch(() => []),
//         apiService.getAllNutrition().catch(() => []),
//         apiService.fetchAllSelfCareActivities().catch(() => []),
//         apiService.getCommunityPosts().catch(() => ({ data: [] })),
//         apiService.listRecordsHandler().catch(() => []),
//         apiService.getPregnancy(userId).catch(() => null)
//       ]);

//       console.log('📊 Data fetched:', {
//         cycles: cycles.status,
//         sleep: sleepRecords.status,
//         fitness: fitnessRecords.status,
//         nutrition: nutritionRecords.status,
//         wellness: wellnessActivities.status,
//         community: communityPosts.status,
//         menHealth: menHealthRecords.status,
//         pregnancy: pregnancyRecords.status
//       });

//       // Process cycles data
//       let cyclesData = [];
//       let analysis = {};
      
//       if (cycles.status === 'fulfilled' && cycles.value) {
//         const cycleResponse = cycles.value;
//         if (cycleResponse.data && cycleResponse.data.data) {
//           cyclesData = cycleResponse.data.data || [];
//           analysis = cycleResponse.data.analysis || {};
//         } else if (cycleResponse.data && cycleResponse.data.cycles) {
//           cyclesData = cycleResponse.data.cycles || [];
//           analysis = cycleResponse.data.analysis || {};
//         } else if (cycleResponse.data && Array.isArray(cycleResponse.data)) {
//           cyclesData = cycleResponse.data;
//         }
//       }
      
//       if (cyclesData.length > 0) {
//         const lastCycle = cyclesData[0];
//         const cycleLength = analysis.averageLength || 28;
//         const nextCycleDate = analysis.predictedNext || new Date(new Date(lastCycle.startDate).getTime() + (cycleLength * 24 * 60 * 60 * 1000));
        
//         const ovulationStart = new Date(nextCycleDate);
//         ovulationStart.setDate(ovulationStart.getDate() - 18);
//         const ovulationEnd = new Date(nextCycleDate);
//         ovulationEnd.setDate(ovulationEnd.getDate() - 10);
        
//         setDashboardData(prev => ({
//           ...prev,
//           femaleHealth: {
//             ...prev.femaleHealth,
//             hasData: true,
//             lastCycle: lastCycle,
//             cycleLength: cycleLength,
//             nextCycle: nextCycleDate,
//             ovulationWindow: { start: ovulationStart, end: ovulationEnd }
//           }
//         }));
//       }

//       // Process Pregnancy data - FIXED: Correct response structure
//       let pregnancyData = null;
//       if (pregnancyRecords.status === 'fulfilled' && pregnancyRecords.value) {
//         const pregResponse = pregnancyRecords.value;
//         console.log('📊 Pregnancy raw response:', pregResponse);
        
//         // Based on your backend: { success: true, record: {...}, insights: {...}, tip: "..." }
//         if (pregResponse.success && pregResponse.record) {
//           pregnancyData = pregResponse.record;
//           console.log('✅ Found pregnancy record:', pregnancyData);
//         } else if (pregResponse.record) {
//           pregnancyData = pregResponse.record;
//         } else if (pregResponse.data && pregResponse.data.record) {
//           pregnancyData = pregResponse.data.record;
//         } else if (pregResponse.data) {
//           pregnancyData = pregResponse.data;
//         }
//       }
      
//       console.log('📊 Pregnancy data extracted:', pregnancyData);
      
//       if (pregnancyData) {
//         // Get conception date or start date
//         const conceptionDate = pregnancyData.conceptionDate ? new Date(pregnancyData.conceptionDate) : null;
//         const dueDate = pregnancyData.dueDate ? new Date(pregnancyData.dueDate) : null;
//         const currentWeek = pregnancyData.currentWeek || pregnancyData.week || 0;
        
//         let weeksPregnant = currentWeek;
//         let trimester = null;
        
//         // Calculate weeks if we have conception date
//         if (conceptionDate && !weeksPregnant) {
//           const today = new Date();
//           const diffTime = Math.abs(today - conceptionDate);
//           weeksPregnant = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
//         }
        
//         if (weeksPregnant <= 12) trimester = 'First Trimester (1-12 weeks)';
//         else if (weeksPregnant <= 28) trimester = 'Second Trimester (13-28 weeks)';
//         else trimester = 'Third Trimester (29-40 weeks)';
        
//         setDashboardData(prev => ({
//           ...prev,
//           femaleHealth: {
//             ...prev.femaleHealth,
//             pregnancy: {
//               hasData: true,
//               isPregnant: true,
//               dueDate: dueDate,
//               startDate: conceptionDate,
//               conceptionDate: conceptionDate,
//               trimester: trimester,
//               weeksPregnant: weeksPregnant,
//               currentWeek: currentWeek
//             }
//           }
//         }));
//       }

//       // Process sleep data
//       let sleepRecordsData = [];
//       if (sleepRecords.status === 'fulfilled' && sleepRecords.value) {
//         if (Array.isArray(sleepRecords.value)) {
//           sleepRecordsData = sleepRecords.value;
//         } else if (sleepRecords.value.data && Array.isArray(sleepRecords.value.data)) {
//           sleepRecordsData = sleepRecords.value.data;
//         }
//       }
      
//       if (sleepRecordsData.length > 0) {
//         const last7Days = sleepRecordsData.slice(-7);
//         let totalHours = 0;
//         let totalQuality = 0;
//         let qualityCount = 0;
//         const sleepDurations = [];
        
//         last7Days.forEach(record => {
//           const duration = calculateSleepDuration(record.sleepStart, record.sleepEnd);
//           totalHours += duration;
//           sleepDurations.push(duration);
          
//           if (record.sleepQuality) {
//             totalQuality += record.sleepQuality;
//             qualityCount++;
//           }
//         });
        
//         const avgHours = last7Days.length > 0 ? parseFloat((totalHours / last7Days.length).toFixed(1)) : 0;
//         const avgQuality = qualityCount > 0 ? parseFloat((totalQuality / qualityCount).toFixed(1)) : 0;
        
//         setDashboardData(prev => ({
//           ...prev,
//           sleep: {
//             records: sleepRecordsData,
//             avgHours: avgHours,
//             avgQuality: avgQuality,
//             totalHours: totalHours
//           }
//         }));
        
//         setTrends(prev => ({
//           ...prev,
//           sleep: sleepDurations
//         }));
        
//         setWeeklyStats(prev => ({
//           ...prev,
//           sleepHours: totalHours,
//           sleepQuality: avgQuality
//         }));
//       }

//       // Process fitness data
//       const fitnessData = fitnessRecords.value || [];
//       if (fitnessData.length > 0) {
//         const last7Days = fitnessData.slice(-7);
//         const totalWorkouts = last7Days.length;
//         const totalCalories = last7Days.reduce((sum, r) => sum + (r.caloriesBurned || (r.duration * 5) || 0), 0);
        
//         setDashboardData(prev => ({
//           ...prev,
//           fitness: {
//             records: fitnessData,
//             totalWorkouts: totalWorkouts,
//             totalDuration: last7Days.reduce((sum, r) => sum + (r.duration || 0), 0),
//             totalCalories: totalCalories
//           }
//         }));
        
//         setWeeklyStats(prev => ({
//           ...prev,
//           workouts: totalWorkouts,
//           caloriesBurned: totalCalories
//         }));
        
//         setTrends(prev => ({
//           ...prev,
//           workouts: last7Days.map(r => r.duration || 0)
//         }));
//       }

//       // Process nutrition data
//       const nutritionData = nutritionRecords.value || [];
//       if (nutritionData.length > 0) {
//         const last7Days = nutritionData.slice(-7);
//         const totalCalories = last7Days.reduce((sum, r) => sum + (parseInt(r.calories) || 0), 0);
//         const totalProtein = last7Days.reduce((sum, r) => sum + (parseInt(r.protein) || 0), 0);
//         const totalCarbs = last7Days.reduce((sum, r) => sum + (parseInt(r.carbs) || 0), 0);
//         const totalFats = last7Days.reduce((sum, r) => sum + (parseInt(r.fats) || 0), 0);
        
//         setDashboardData(prev => ({
//           ...prev,
//           nutrition: {
//             records: nutritionData,
//             totalCalories: totalCalories,
//             avgCalories: Math.round(totalCalories / (last7Days.length || 1)),
//             totalProtein: totalProtein,
//             totalCarbs: totalCarbs,
//             totalFats: totalFats
//           }
//         }));
        
//         setWeeklyStats(prev => ({
//           ...prev,
//           caloriesEaten: totalCalories,
//           proteinEaten: totalProtein
//         }));
        
//         setTrends(prev => ({
//           ...prev,
//           calories: last7Days.map(r => parseInt(r.calories) || 0)
//         }));
//       }

//       // Process wellness activities
//       let wellnessData = [];
//       if (wellnessActivities.status === 'fulfilled' && wellnessActivities.value) {
//         if (Array.isArray(wellnessActivities.value)) {
//           wellnessData = wellnessActivities.value;
//         } else if (wellnessActivities.value.data && Array.isArray(wellnessActivities.value.data)) {
//           wellnessData = wellnessActivities.value.data;
//         }
//       }
      
//       if (wellnessData.length > 0) {
//         setDashboardData(prev => ({
//           ...prev,
//           wellness: {
//             activities: wellnessData,
//             totalActivities: wellnessData.length,
//             moodScores: wellnessData.map(w => w.moodScore || 5)
//           }
//         }));
//       }

//       // Process community data - FIXED: Properly extract post count
//       let communityData = [];
//       if (communityPosts.status === 'fulfilled' && communityPosts.value) {
//         // Handle different response structures
//         if (communityPosts.value.data && Array.isArray(communityPosts.value.data)) {
//           communityData = communityPosts.value.data;
//         } else if (Array.isArray(communityPosts.value)) {
//           communityData = communityPosts.value;
//         } else if (communityPosts.value.success && Array.isArray(communityPosts.value.data)) {
//           communityData = communityPosts.value.data;
//         }
//       }
      
//       console.log('📊 Community posts found:', communityData.length);
      
//       if (communityData.length > 0) {
//         const totalLikes = communityData.reduce((sum, p) => sum + (p.likesCount || p.likes?.length || 0), 0);
//         const totalComments = communityData.reduce((sum, p) => sum + (p.comments?.length || 0), 0);
        
//         setDashboardData(prev => ({
//           ...prev,
//           community: {
//             posts: communityData,
//             totalPosts: communityData.length,
//             totalLikes: totalLikes,
//             totalComments: totalComments
//           }
//         }));
        
//         setWeeklyStats(prev => ({
//           ...prev,
//           communityPosts: communityData.length
//         }));
//       }

//       // Process Men's Health data
//       let menHealthData = [];
//       if (menHealthRecords.status === 'fulfilled' && menHealthRecords.value) {
//         if (menHealthRecords.value.records && Array.isArray(menHealthRecords.value.records)) {
//           menHealthData = menHealthRecords.value.records;
//         } else if (menHealthRecords.value.data && Array.isArray(menHealthRecords.value.data)) {
//           menHealthData = menHealthRecords.value.data;
//         } else if (Array.isArray(menHealthRecords.value)) {
//           menHealthData = menHealthRecords.value;
//         }
//       }
      
//       if (menHealthData.length > 0) {
//         const recentEntries = menHealthData.slice(-7);
//         const totalStress = recentEntries.reduce((sum, r) => sum + (r.stressLevel || 5), 0);
//         const totalEnergy = recentEntries.reduce((sum, r) => sum + (r.energyLevel || 5), 0);
//         const totalSleep = recentEntries.reduce((sum, r) => sum + (r.sleepHours || 7), 0);
//         const totalWorkouts = recentEntries.reduce((sum, r) => sum + (r.workoutDays || 3), 0);
        
//         const avgStress = recentEntries.length > 0 ? parseFloat((totalStress / recentEntries.length).toFixed(1)) : 0;
//         const avgEnergy = recentEntries.length > 0 ? parseFloat((totalEnergy / recentEntries.length).toFixed(1)) : 0;
//         const avgSleep = recentEntries.length > 0 ? parseFloat((totalSleep / recentEntries.length).toFixed(1)) : 0;
//         const avgWorkouts = recentEntries.length > 0 ? parseFloat((totalWorkouts / recentEntries.length).toFixed(1)) : 0;
        
//         // Calculate health score
//         let healthScore = 0;
//         if (avgStress <= 3) healthScore += 30;
//         else if (avgStress <= 6) healthScore += 20;
//         else healthScore += 10;
        
//         if (avgSleep >= 7 && avgSleep <= 9) healthScore += 25;
//         else if (avgSleep >= 6) healthScore += 15;
//         else healthScore += 5;
        
//         if (avgWorkouts >= 4) healthScore += 25;
//         else if (avgWorkouts >= 2) healthScore += 15;
//         else healthScore += 5;
        
//         if (avgEnergy >= 8) healthScore += 20;
//         else if (avgEnergy >= 5) healthScore += 10;
//         else healthScore += 5;
        
//         let healthStatus = 'Good';
//         if (healthScore >= 80) healthStatus = 'Excellent';
//         else if (healthScore >= 60) healthStatus = 'Good';
//         else if (healthScore >= 40) healthStatus = 'Fair';
//         else healthStatus = 'Needs Attention';
        
//         const recentMoods = recentEntries.map(r => {
//           if (r.stressLevel > 7) return 'stressed';
//           if (r.energyLevel < 4) return 'tired';
//           if (r.sleepHours < 6) return 'sleep-deprived';
//           return 'balanced';
//         });
        
//         setDashboardData(prev => ({
//           ...prev,
//           menHealth: {
//             hasData: true,
//             lastCheckup: recentEntries[0]?.createdAt || null,
//             healthStatus: healthStatus,
//             averageStress: avgStress,
//             averageEnergy: avgEnergy,
//             averageSleep: avgSleep,
//             workoutDays: avgWorkouts,
//             recentMoods: recentMoods,
//             healthScore: healthScore
//           }
//         }));
//       }

//       // Build recent activity feed
//       const activities = [];
      
//       if (fitnessData.length > 0) {
//         fitnessData.slice(0, 3).forEach(f => {
//           activities.push({
//             type: 'fitness',
//             title: 'Workout',
//             description: `${f.activityType || 'Exercise'} - ${f.duration || 0} mins`,
//             time: f.createdAt,
//             icon: <Dumbbell className="w-4 h-4" />
//           });
//         });
//       }
      
//       if (nutritionData.length > 0) {
//         nutritionData.slice(0, 3).forEach(n => {
//           activities.push({
//             type: 'nutrition',
//             title: 'Meal Logged',
//             description: `${n.meal || 'Meal'} - ${n.calories} kcal`,
//             time: n.createdAt,
//             icon: <UtensilsCrossed className="w-4 h-4" />
//           });
//         });
//       }
      
//       if (sleepRecordsData.length > 0) {
//         sleepRecordsData.slice(0, 3).forEach(s => {
//           const duration = calculateSleepDuration(s.sleepStart, s.sleepEnd);
//           activities.push({
//             type: 'sleep',
//             title: 'Sleep Recorded',
//             description: `${duration.toFixed(1)} hours - Quality: ${s.sleepQuality || 0}/10`,
//             time: s.createdAt,
//             icon: <Moon className="w-4 h-4" />
//           });
//         });
//       }
      
//       if (communityData.length > 0) {
//         communityData.slice(0, 3).forEach(p => {
//           activities.push({
//             type: 'community',
//             title: 'Community Post',
//             description: p.content?.substring(0, 50) + (p.content?.length > 50 ? '...' : ''),
//             time: p.createdAt,
//             icon: <MessageCircle className="w-4 h-4" />
//           });
//         });
//       }
      
//       activities.sort((a, b) => new Date(b.time) - new Date(a.time));
//       setDashboardData(prev => ({
//         ...prev,
//         recentActivity: activities.slice(0, 10)
//       }));

//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       toast.custom((t) => (
//         <ErrorToast
//           message="Data Load Error"
//           description="Failed to load dashboard data. Please refresh."
//         />
//       ), { duration: 4000 });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownloadReport = async () => {
//     const loadingToast = toast.loading(
//       <div className="flex items-center gap-2">
//         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//         <span>Generating your weekly health report...</span>
//       </div>,
//       {
//         style: {
//           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//           color: '#fff',
//           borderRadius: '12px',
//           padding: '12px 20px',
//         },
//         duration: Infinity
//       }
//     );

//     try {
//       setGeneratingReport(true);
//       const response = await apiService.generateWeeklyReport();
      
//       if (response.success && response.downloadUrl) {
//         const filename = response.downloadUrl.split('/').pop();
//         const downloadResponse = await apiService.downloadWeeklyReport(filename);
        
//         const blob = new Blob([downloadResponse.data], { type: 'application/pdf' });
//         const url = window.URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = filename || 'weekly-health-report.pdf';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         window.URL.revokeObjectURL(url);
        
//         toast.dismiss(loadingToast);
//         toast.custom((t) => (
//           <SuccessToast
//             message="Weekly Report Downloaded!"
//             description="Your health report has been saved to your device"
//           />
//         ), { duration: 5000 });
        
//       } else {
//         toast.dismiss(loadingToast);
//         toast.custom((t) => (
//           <ErrorToast
//             message="Report Generation Failed"
//             description={response.message || 'Unable to generate report. Please try again.'}
//           />
//         ), { duration: 5000 });
//       }
//     } catch (error) {
//       console.error('Error downloading report:', error);
//       toast.dismiss(loadingToast);
//       toast.custom((t) => (
//         <ErrorToast
//           message="Download Failed"
//           description="Something went wrong. Please try again later."
//         />
//       ), { duration: 5000 });
//     } finally {
//       setGeneratingReport(false);
//     }
//   };

//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     try {
//       return new Date(date).toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric'
//       });
//     } catch {
//       return 'N/A';
//     }
//   };

//   const formatTimeAgo = (date) => {
//     if (!date) return '';
//     const now = new Date();
//     const then = new Date(date);
//     const diffMs = now - then;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMins / 60);
//     const diffDays = Math.floor(diffHours / 24);
    
//     if (diffMins < 1) return 'just now';
//     if (diffMins < 60) return `${diffMins} min ago`;
//     if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
//     return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
//   };

//   // Get health status color
//   const getHealthStatusColor = (status) => {
//     switch(status) {
//       case 'Excellent': return 'text-green-600 bg-green-100';
//       case 'Good': return 'text-blue-600 bg-blue-100';
//       case 'Fair': return 'text-yellow-600 bg-yellow-100';
//       case 'Needs Attention': return 'text-red-600 bg-red-100';
//       default: return 'text-gray-600 bg-gray-100';
//     }
//   };

//   // Get mood emoji
//   const getMoodEmoji = (mood) => {
//     switch(mood) {
//       case 'stressed': return '😰';
//       case 'tired': return '😴';
//       case 'sleep-deprived': return '😫';
//       default: return '😊';
//     }
//   };

//   // Chart data - ONLY real data, no dummy fallbacks
//   const sleepChartData = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [{
//       label: 'Sleep Hours',
//       data: trends.sleep.length === 7 ? trends.sleep : [],
//       borderColor: colors.sleep,
//       backgroundColor: `${colors.sleep}20`,
//       tension: 0.4,
//       fill: true
//     }]
//   };

//   const calorieChartData = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [
//       {
//         label: 'Calories Eaten',
//         data: trends.calories.length === 7 ? trends.calories : [],
//         borderColor: colors.nutrition,
//         backgroundColor: `${colors.nutrition}20`,
//         tension: 0.4
//       },
//       {
//         label: 'Calories Burned',
//         data: trends.workouts.length === 7 ? trends.workouts.map(w => w * 100) : [],
//         borderColor: colors.fitness,
//         backgroundColor: `${colors.fitness}20`,
//         tension: 0.4
//       }
//     ]
//   };

//   const macroChartData = {
//     labels: ['Protein', 'Carbs', 'Fats'],
//     datasets: [{
//       data: [
//         dashboardData.nutrition.totalProtein,
//         dashboardData.nutrition.totalCarbs,
//         dashboardData.nutrition.totalFats
//       ],
//       backgroundColor: [colors.fitness, colors.nutrition, colors.wellness],
//       borderWidth: 0
//     }]
//   };

//   const StatCard = ({ title, value, unit, icon, color, trend }) => (
//     <motion.div
//       whileHover={{ y: -5, transition: { duration: 0.2 } }}
//       className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
//     >
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-gray-500 text-sm font-medium">{title}</p>
//           <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>
//             {value}{unit && <span className="text-sm ml-1 text-gray-400">{unit}</span>}
//           </p>
//           {trend && (
//             <div className="flex items-center gap-1 mt-2">
//               {trend > 0 ? (
//                 <TrendingUp className="w-3 h-3 text-green-500" />
//               ) : (
//                 <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
//               )}
//               <span className={`text-xs ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
//                 {Math.abs(trend)}% from last week
//               </span>
//             </div>
//           )}
//         </div>
//         <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}15` }}>
//           <div style={{ color }}>{icon}</div>
//         </div>
//       </div>
//     </motion.div>
//   );

//   const SectionCard = ({ title, icon, color, children }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
//     >
//       <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
//         <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
//           <div style={{ color }}>{icon}</div>
//         </div>
//         <h2 className="text-lg font-semibold" style={{ color: colors.text }}>{title}</h2>
//       </div>
//       <div className="p-5">
//         {children}
//       </div>
//     </motion.div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: colors.accent }}></div>
//           <p style={{ color: colors.text }}>Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: colors.background }}>
//       {/* Toaster Container */}
//       <Toaster 
//         position="top-right"
//         containerStyle={{
//           top: 20,
//           right: 20,
//           zIndex: 9999,
//         }}
//         toastOptions={{
//           duration: 4000,
//           style: {
//             background: 'transparent',
//             boxShadow: 'none',
//             padding: 0,
//           },
//         }}
//       />
      
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold" style={{ color: colors.text }}>
//               Welcome back, {user?.name || 'User'}! 👋
//             </h1>
//             <p className="text-gray-500 mt-1">Here's your health summary for this week</p>
//           </div>
          
//           <button
//             onClick={handleDownloadReport}
//             disabled={generatingReport}
//             className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:opacity-90 transition-colors disabled:opacity-50"
//           >
//             {generatingReport ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                 Generating...
//               </>
//             ) : (
//               <>
//                 <BarChart3 className="w-4 h-4" />
//                 Download Weekly Report
//               </>
//             )}
//           </button>
//         </div>

//         {/* Quick Stats Row */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <StatCard
//             title="Weekly Activity"
//             value={dashboardData.fitness.totalWorkouts + dashboardData.wellness.totalActivities}
//             icon={<Activity className="w-5 h-5" />}
//             color={colors.primary}
//             trend={5}
//           />
//           <StatCard
//             title="Sleep Average"
//             value={dashboardData.sleep.avgHours || 0}
//             unit="hrs"
//             icon={<Moon className="w-5 h-5" />}
//             color={colors.sleep}
//             trend={2}
//           />
//           <StatCard
//             title="Calories Burned"
//             value={dashboardData.fitness.totalCalories || 0}
//             unit="kcal"
//             icon={<Flame className="w-5 h-5" />}
//             color={colors.fitness}
//           />
//           <StatCard
//             title="Community Posts"
//             value={dashboardData.community.totalPosts || 0}
//             icon={<Users className="w-5 h-5" />}
//             color={colors.community}
//           />
//         </div>

//         {/* Two Column Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
//           {/* Female Health Section with Pregnancy */}
//           <SectionCard title="Female Health" icon={<Droplets className="w-5 h-5" />} color={colors.female}>
//             <div className="space-y-4">
//               {/* Cycle Tracking */}
//               {dashboardData.femaleHealth.hasData ? (
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-500">Last Cycle</span>
//                     <span className="font-medium text-gray-800">
//                       {formatDate(dashboardData.femaleHealth.lastCycle?.startDate)} - {formatDate(dashboardData.femaleHealth.lastCycle?.endDate)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-500">Cycle Length</span>
//                     <span className="font-medium text-gray-800">{dashboardData.femaleHealth.cycleLength} days</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-500">Next Cycle</span>
//                     <span className="font-medium text-pink-600">{formatDate(dashboardData.femaleHealth.nextCycle)}</span>
//                   </div>
//                   {dashboardData.femaleHealth.ovulationWindow && (
//                     <div className="mt-2 pt-2 border-t border-gray-100">
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-500">Ovulation Window</span>
//                         <span className="font-medium text-purple-600">
//                           {formatDate(dashboardData.femaleHealth.ovulationWindow.start)} - {formatDate(dashboardData.femaleHealth.ovulationWindow.end)}
//                         </span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-center py-3">
//                   <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" style={{ color: colors.text }} />
//                   <p className="text-gray-500 text-sm">No cycle data yet</p>
//                   <button 
//                     onClick={() => navigate('/female-health/cycle')}
//                     className="mt-2 text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white"
//                   >
//                     Log Cycle
//                   </button>
//                 </div>
//               )}
              
//               {/* Pregnancy Tracking - NOW SHOWS REAL DATA */}
//               {dashboardData.femaleHealth.pregnancy.hasData ? (
//                 <div className="mt-4 pt-3 border-t border-pink-200 bg-pink-50/50 rounded-lg p-3">
//                   <div className="flex items-center gap-2 mb-2">
//                     <Baby className="w-4 h-4 text-pink-500" />
//                     <span className="font-semibold text-pink-700 text-sm">Pregnancy Tracker</span>
//                   </div>
//                   <div className="space-y-2 text-sm">
//                     {dashboardData.femaleHealth.pregnancy.dueDate && (
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Due Date</span>
//                         <span className="font-medium text-pink-600">{formatDate(dashboardData.femaleHealth.pregnancy.dueDate)}</span>
//                       </div>
//                     )}
//                     {dashboardData.femaleHealth.pregnancy.conceptionDate && (
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Conception Date</span>
//                         <span className="font-medium text-pink-600">{formatDate(dashboardData.femaleHealth.pregnancy.conceptionDate)}</span>
//                       </div>
//                     )}
//                     {dashboardData.femaleHealth.pregnancy.trimester && (
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Trimester</span>
//                         <span className="font-medium text-pink-600">{dashboardData.femaleHealth.pregnancy.trimester}</span>
//                       </div>
//                     )}
//                     {dashboardData.femaleHealth.pregnancy.weeksPregnant > 0 && (
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Weeks Pregnant</span>
//                         <span className="font-medium text-pink-600">{dashboardData.femaleHealth.pregnancy.weeksPregnant} weeks</span>
//                       </div>
//                     )}
//                   </div>
//                   <button 
//                     onClick={() => navigate('/female-health/pregnancy')}
//                     className="mt-3 w-full text-xs py-1.5 rounded-lg bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
//                   >
//                     Update Pregnancy
//                   </button>
//                 </div>
//               ) : (
//                 <div className="mt-3 pt-2 border-t border-gray-100">
//                   <button 
//                     onClick={() => navigate('/female-health/pregnancy')}
//                     className="w-full text-xs py-1.5 rounded-lg border border-pink-200 text-pink-600 hover:bg-pink-50 transition-colors flex items-center justify-center gap-1"
//                   >
//                     <Baby className="w-3 h-3" />
//                     Track Pregnancy
//                   </button>
//                 </div>
//               )}
//             </div>
//           </SectionCard>

//           {/* Men's Health Section */}
//           <SectionCard title="Men's Health" icon={<Shield className="w-5 h-5" />} color={colors.male}>
//             {dashboardData.menHealth.hasData ? (
//               <div className="space-y-4">
//                 {/* Health Status */}
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-500">Health Status</span>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthStatusColor(dashboardData.menHealth.healthStatus)}`}>
//                     {dashboardData.menHealth.healthStatus}
//                     {dashboardData.menHealth.healthStatus === 'Excellent' && ' 🎯'}
//                     {dashboardData.menHealth.healthStatus === 'Good' && ' ✓'}
//                     {dashboardData.menHealth.healthStatus === 'Fair' && ' ⚠️'}
//                     {dashboardData.menHealth.healthStatus === 'Needs Attention' && ' ⚠️'}
//                   </span>
//                 </div>
                
//                 {/* Health Score */}
//                 <div className="flex items-center justify-center mb-2">
//                   <div className="relative w-24 h-24">
//                     <svg className="w-24 h-24 transform -rotate-90">
//                       <circle
//                         cx="48"
//                         cy="48"
//                         r="42"
//                         stroke="currentColor"
//                         strokeWidth="8"
//                         fill="none"
//                         className="text-gray-200"
//                       />
//                       <circle
//                         cx="48"
//                         cy="48"
//                         r="42"
//                         stroke="currentColor"
//                         strokeWidth="8"
//                         fill="none"
//                         strokeDasharray={`${(dashboardData.menHealth.healthScore / 100) * 264} 264`}
//                         className="text-blue-500 transition-all duration-500"
//                         style={{ strokeDashoffset: 0 }}
//                       />
//                     </svg>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="text-center">
//                         <div className="text-2xl font-bold text-blue-600">{dashboardData.menHealth.healthScore}</div>
//                         <div className="text-xs text-gray-500">Score</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Average Metrics */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="bg-red-50 rounded-lg p-3 text-center">
//                     <div className="text-sm text-gray-500">Stress Level</div>
//                     <div className="text-xl font-bold text-red-600">{dashboardData.menHealth.averageStress}/10</div>
//                   </div>
//                   <div className="bg-green-50 rounded-lg p-3 text-center">
//                     <div className="text-sm text-gray-500">Energy Level</div>
//                     <div className="text-xl font-bold text-green-600">{dashboardData.menHealth.averageEnergy}/10</div>
//                   </div>
//                   <div className="bg-purple-50 rounded-lg p-3 text-center">
//                     <div className="text-sm text-gray-500">Sleep Hours</div>
//                     <div className="text-xl font-bold text-purple-600">{dashboardData.menHealth.averageSleep}h</div>
//                   </div>
//                   <div className="bg-orange-50 rounded-lg p-3 text-center">
//                     <div className="text-sm text-gray-500">Workouts/Week</div>
//                     <div className="text-xl font-bold text-orange-600">{dashboardData.menHealth.workoutDays} days</div>
//                   </div>
//                 </div>
                
//                 {/* Last Checkup */}
//                 <div className="flex justify-between items-center pt-2 border-t border-gray-100">
//                   <span className="text-gray-500">Last Checkup</span>
//                   <span className="font-medium text-gray-800">
//                     {dashboardData.menHealth.lastCheckup 
//                       ? formatDate(dashboardData.menHealth.lastCheckup)
//                       : 'Not recorded'}
//                   </span>
//                 </div>
                
//                 {/* Recent Mood Trends */}
//                 {dashboardData.menHealth.recentMoods.length > 0 && (
//                   <div className="mt-2 p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Brain className="w-4 h-4 text-purple-500" />
//                       <span className="text-sm font-medium text-gray-700">Recent Mood Trend</span>
//                     </div>
//                     <div className="flex gap-2">
//                       {dashboardData.menHealth.recentMoods.slice(0, 7).map((mood, idx) => (
//                         <div key={idx} className="flex flex-col items-center">
//                           <div className="text-xl">{getMoodEmoji(mood)}</div>
//                           <div className="text-xs text-gray-500 mt-1">{idx + 1}</div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Action Button */}
//                 <button 
//                   onClick={() => navigate('/men-health')}
//                   className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-colors flex items-center justify-center gap-2"
//                 >
//                   <Shield className="w-4 h-4" />
//                   Update Health Data
//                 </button>
//               </div>
//             ) : (
//               <div className="text-center py-6">
//                 <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" style={{ color: colors.text }} />
//                 <p className="text-gray-500">No health data yet</p>
//                 <p className="text-xs text-gray-400 mt-1">Track your health to see insights</p>
//                 <button 
//                   onClick={() => navigate('/men-health')}
//                   className="mt-4 text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white"
//                 >
//                   Log Health Data
//                 </button>
//               </div>
//             )}
//           </SectionCard>

//           {/* Sleep & Recovery Chart */}
//           <SectionCard title="Sleep & Recovery" icon={<Moon className="w-5 h-5" />} color={colors.sleep}>
//             <div className="h-48 mb-4">
//               {trends.sleep.length > 0 ? (
//                 <Line data={sleepChartData} options={{ responsive: true, maintainAspectRatio: false }} />
//               ) : (
//                 <div className="h-full flex items-center justify-center text-gray-400 text-sm">
//                   No sleep data available
//                 </div>
//               )}
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="text-center p-3 bg-gray-50 rounded-lg">
//                 <p className="text-2xl font-bold text-purple-600">{dashboardData.sleep.avgHours || 0}h</p>
//                 <p className="text-sm text-gray-500">Average Sleep</p>
//               </div>
//               <div className="text-center p-3 bg-gray-50 rounded-lg">
//                 <p className="text-2xl font-bold text-purple-600">{dashboardData.sleep.avgQuality || 0}/10</p>
//                 <p className="text-sm text-gray-500">Sleep Quality</p>
//               </div>
//             </div>
//           </SectionCard>

//           {/* Fitness & Nutrition Chart */}
//           <SectionCard title="Fitness & Nutrition" icon={<Dumbbell className="w-5 h-5" />} color={colors.fitness}>
//             <div className="h-48 mb-4">
//               {trends.calories.length > 0 || trends.workouts.length > 0 ? (
//                 <Line data={calorieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
//               ) : (
//                 <div className="h-full flex items-center justify-center text-gray-400 text-sm">
//                   No fitness or nutrition data available
//                 </div>
//               )}
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="text-center p-3 bg-gray-50 rounded-lg">
//                 <p className="text-2xl font-bold text-green-600">{dashboardData.fitness.totalWorkouts || 0}</p>
//                 <p className="text-sm text-gray-500">Workouts This Week</p>
//               </div>
//               <div className="text-center p-3 bg-gray-50 rounded-lg">
//                 <p className="text-2xl font-bold text-orange-600">{dashboardData.fitness.totalCalories || 0}</p>
//                 <p className="text-sm text-gray-500">Calories Burned</p>
//               </div>
//             </div>
//           </SectionCard>

//           {/* Nutrition Macros */}
//           <SectionCard title="Nutrition Overview" icon={<UtensilsCrossed className="w-5 h-5" />} color={colors.nutrition}>
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-orange-600">{dashboardData.nutrition.avgCalories || 0}</p>
//                 <p className="text-sm text-gray-500">Avg Daily Calories</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-blue-600">{dashboardData.nutrition.totalProtein || 0}g</p>
//                 <p className="text-sm text-gray-500">Total Protein</p>
//               </div>
//             </div>
//             <div className="h-32">
//               {dashboardData.nutrition.totalProtein > 0 || dashboardData.nutrition.totalCarbs > 0 || dashboardData.nutrition.totalFats > 0 ? (
//                 <Doughnut data={macroChartData} options={{ responsive: true, maintainAspectRatio: false }} />
//               ) : (
//                 <div className="h-full flex items-center justify-center text-gray-400 text-sm">
//                   No nutrition data available
//                 </div>
//               )}
//             </div>
//           </SectionCard>

//           {/* Wellness Activities */}
//           <SectionCard title="Wellness Activities" icon={<Brain className="w-5 h-5" />} color={colors.wellness}>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500">Activities Completed</span>
//                 <span className="text-2xl font-bold text-pink-600">{dashboardData.wellness.totalActivities || 0}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500">Average Mood</span>
//                 <div className="flex items-center gap-1">
//                   {dashboardData.wellness.moodScores.length > 0 ? (
//                     <>
//                       <span className="text-lg">{['😢', '😐', '🙂', '😊', '😄'][Math.round(dashboardData.wellness.moodScores.reduce((a,b)=>a+b,0)/dashboardData.wellness.moodScores.length) - 1] || '🙂'}</span>
//                       <span className="font-medium">
//                         {Math.round(dashboardData.wellness.moodScores.reduce((a,b)=>a+b,0)/dashboardData.wellness.moodScores.length)}/5
//                       </span>
//                     </>
//                   ) : (
//                     <span className="text-gray-400">No data</span>
//                   )}
//                 </div>
//               </div>
//               <div className="mt-3 pt-3 border-t border-gray-100">
//                 <p className="text-sm text-gray-500">Quick activities:</p>
//                 <div className="flex gap-2 mt-2">
//                   <button className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">Meditate</button>
//                   <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">Journal</button>
//                   <button className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">Stretch</button>
//                 </div>
//               </div>
//             </div>
//           </SectionCard>
//         </div>

//         {/* Community Activity */}
//         <SectionCard title="Community Activity" icon={<Users className="w-5 h-5" />} color={colors.community}>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div className="text-center p-3 bg-gray-50 rounded-lg">
//               <p className="text-2xl font-bold text-indigo-600">{dashboardData.community.totalPosts || 0}</p>
//               <p className="text-sm text-gray-500">Posts</p>
//             </div>
//             <div className="text-center p-3 bg-gray-50 rounded-lg">
//               <p className="text-2xl font-bold text-indigo-600">{dashboardData.community.totalLikes || 0}</p>
//               <p className="text-sm text-gray-500">Likes Received</p>
//             </div>
//             <div className="text-center p-3 bg-gray-50 rounded-lg">
//               <p className="text-2xl font-bold text-indigo-600">{dashboardData.community.totalComments || 0}</p>
//               <p className="text-sm text-gray-500">Comments</p>
//             </div>
//           </div>
//           <button 
//             onClick={() => navigate('/community')}
//             className="w-full py-2 rounded-lg border-2 border-indigo-200 text-indigo-600 font-medium hover:bg-indigo-50 transition-colors"
//           >
//             Go to Community
//           </button>
//         </SectionCard>

//         {/* Recent Activity Feed */}
//         <SectionCard title="Recent Activity" icon={<Clock className="w-5 h-5" />} color={colors.primary}>
//           <div className="space-y-3">
//             {dashboardData.recentActivity.length > 0 ? (
//               dashboardData.recentActivity.slice(0, 5).map((activity, idx) => (
//                 <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
//                   <div className="p-2 bg-white rounded-lg shadow-sm">
//                     {activity.icon}
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-medium text-gray-800">{activity.title}</p>
//                     <p className="text-sm text-gray-500">{activity.description}</p>
//                   </div>
//                   <span className="text-xs text-gray-400">{formatTimeAgo(activity.time)}</span>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-6">
//                 <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" style={{ color: colors.text }} />
//                 <p className="text-gray-500">No recent activity</p>
//                 <p className="text-sm text-gray-400">Start tracking your health to see activity here</p>
//               </div>
//             )}
//           </div>
//         </SectionCard>
//       </div>
//     </div>
//   );
// };

// export default LabInsights;



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import {
  Apple,
  Flame,
  Heart,
  Moon,
  Dumbbell,
  Users,
  Brain,
  Calendar,
  TrendingUp,
  Activity,
  Droplets,
  Shield,
  UtensilsCrossed,
  MessageCircle,
  Clock,
  AlertCircle,
  BarChart3,
  Download,
  CheckCircle,
  XCircle,
  Baby,
  Stethoscope,
  Sparkles
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
  LineElement,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

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
  LineElement,
  Filler
);

// Custom Toast Components
const SuccessToast = ({ message, description }) => (
  <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-green-200 flex items-center gap-3 min-w-[280px]">
    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
      <CheckCircle className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="font-bold text-gray-800 text-sm">{message}</p>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  </div>
);

const ErrorToast = ({ message, description }) => (
  <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-red-200 flex items-center gap-3 min-w-[280px]">
    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-400 to-red-500 flex items-center justify-center flex-shrink-0">
      <XCircle className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="font-bold text-gray-800 text-sm">{message}</p>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  </div>
);

// Helper function to calculate sleep duration from start and end times
const calculateSleepDuration = (sleepStart, sleepEnd) => {
  if (!sleepStart || !sleepEnd) return 0;
  try {
    const start = new Date(`2000-01-01T${sleepStart}`);
    const end = new Date(`2000-01-01T${sleepEnd}`);
    let diff = (end - start) / (1000 * 60 * 60);
    if (diff < 0) diff += 24;
    return diff;
  } catch {
    return 0;
  }
};

// Helper function to calculate pregnancy weeks
const calculatePregnancyWeeks = (conceptionDate) => {
  if (!conceptionDate) return 0;
  const today = new Date();
  const conception = new Date(conceptionDate);
  const diffTime = Math.abs(today - conception);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffDays / 7);
  return Math.max(1, Math.min(42, weeks));
};

// Helper function to determine trimester
const getTrimester = (weeks) => {
  if (weeks <= 12) return 'First Trimester (1-12 weeks)';
  if (weeks <= 28) return 'Second Trimester (13-28 weeks)';
  return 'Third Trimester (29-40 weeks)';
};

// Helper function to calculate due date
const calculateDueDate = (conceptionDate) => {
  if (!conceptionDate) return null;
  const due = new Date(conceptionDate);
  due.setDate(due.getDate() + 280); // 40 weeks
  return due;
};

const LabInsights = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    femaleHealth: {
      hasData: false,
      lastCycle: null,
      cycleLength: 28,
      nextCycle: null,
      ovulationWindow: null,
      pregnancy: {
        hasData: false,
        isPregnant: false,
        dueDate: null,
        trimester: null,
        weeksPregnant: 0,
        startDate: null,
        conceptionDate: null
      }
    },
    menHealth: {
      hasData: false,
      lastCheckup: null,
      healthStatus: 'Good',
      averageStress: 0,
      averageEnergy: 0,
      averageSleep: 0,
      workoutDays: 0,
      recentMoods: [],
      healthScore: 0
    },
    sleep: {
      records: [],
      avgHours: 0,
      avgQuality: 0,
      totalHours: 0
    },
    fitness: {
      records: [],
      totalWorkouts: 0,
      totalDuration: 0,
      totalCalories: 0
    },
    nutrition: {
      records: [],
      totalCalories: 0,
      avgCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFats: 0
    },
    wellness: {
      activities: [],
      totalActivities: 0,
      moodScores: []
    },
    community: {
      posts: [],
      totalPosts: 0,
      totalLikes: 0,
      totalComments: 0
    },
    recentActivity: []
  });

  const [weeklyStats, setWeeklyStats] = useState({
    workouts: 0,
    caloriesBurned: 0,
    sleepHours: 0,
    sleepQuality: 0,
    caloriesEaten: 0,
    proteinEaten: 0,
    communityPosts: 0
  });

  const [trends, setTrends] = useState({
    sleep: [],
    calories: [],
    workouts: []
  });

  const colors = {
    background: '#F4F1E9',
    primary: '#B1D182',
    text: '#0B132B',
    accent: '#688F48',
    lightAccent: '#E8F4D9',
    card: '#FFFFFF',
    female: '#EF4444',
    male: '#3B82F6',
    sleep: '#8B5CF6',
    fitness: '#10B981',
    nutrition: '#F59E0B',
    wellness: '#EC4899',
    community: '#6366F1',
    pregnancy: '#EC4899'
  };

  // Get user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setUserId(parsedUser._id || parsedUser.id);
        console.log('✅ User loaded:', parsedUser.name);
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchAllData();
    }
  }, [userId]);

  const fetchAllData = async () => {
    if (!userId) {
      console.log('No user ID found');
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      console.log('📡 Fetching dashboard data for user:', userId);

      const [
        cycles,
        sleepRecords,
        fitnessRecords,
        nutritionRecords,
        wellnessActivities,
        communityPosts,
        menHealthRecords,
        pregnancyRecords
      ] = await Promise.allSettled([
        apiService.getCycles(userId).catch(() => null),
        apiService.getSleepHistory().catch(() => []),
        apiService.getAllFitness().catch(() => []),
        apiService.getAllNutrition().catch(() => []),
        apiService.fetchAllSelfCareActivities().catch(() => []),
        apiService.getCommunityPosts().catch(() => ({ data: [] })),
        apiService.listRecordsHandler().catch(() => []),
        apiService.getPregnancy(userId).catch(() => null)
      ]);

      console.log('📊 Data fetched:', {
        cycles: cycles.status,
        sleep: sleepRecords.status,
        fitness: fitnessRecords.status,
        nutrition: nutritionRecords.status,
        wellness: wellnessActivities.status,
        community: communityPosts.status,
        menHealth: menHealthRecords.status,
        pregnancy: pregnancyRecords.status
      });

      // Process cycles data
      let cyclesData = [];
      let analysis = {};
      
      if (cycles.status === 'fulfilled' && cycles.value) {
        const cycleResponse = cycles.value;
        if (cycleResponse.data && cycleResponse.data.data) {
          cyclesData = cycleResponse.data.data || [];
          analysis = cycleResponse.data.analysis || {};
        } else if (cycleResponse.data && cycleResponse.data.cycles) {
          cyclesData = cycleResponse.data.cycles || [];
          analysis = cycleResponse.data.analysis || {};
        } else if (cycleResponse.data && Array.isArray(cycleResponse.data)) {
          cyclesData = cycleResponse.data;
        }
      }
      
      if (cyclesData.length > 0) {
        const lastCycle = cyclesData[0];
        const cycleLength = analysis.averageLength || 28;
        const nextCycleDate = analysis.predictedNext || new Date(new Date(lastCycle.startDate).getTime() + (cycleLength * 24 * 60 * 60 * 1000));
        
        const ovulationStart = new Date(nextCycleDate);
        ovulationStart.setDate(ovulationStart.getDate() - 18);
        const ovulationEnd = new Date(nextCycleDate);
        ovulationEnd.setDate(ovulationEnd.getDate() - 10);
        
        setDashboardData(prev => ({
          ...prev,
          femaleHealth: {
            ...prev.femaleHealth,
            hasData: true,
            lastCycle: lastCycle,
            cycleLength: cycleLength,
            nextCycle: nextCycleDate,
            ovulationWindow: { start: ovulationStart, end: ovulationEnd }
          }
        }));
      }

      // Process Pregnancy data - SMART CALCULATION
      let pregnancyData = null;
      if (pregnancyRecords.status === 'fulfilled' && pregnancyRecords.value) {
        const pregResponse = pregnancyRecords.value;
        console.log('📊 Pregnancy raw response:', pregResponse);
        
        if (pregResponse.success && pregResponse.record) {
          pregnancyData = pregResponse.record;
        } else if (pregResponse.record) {
          pregnancyData = pregResponse.record;
        } else if (pregResponse.data && pregResponse.data.record) {
          pregnancyData = pregResponse.data.record;
        } else if (pregResponse.data) {
          pregnancyData = pregResponse.data;
        }
      }
      
      console.log('📊 Pregnancy data extracted:', pregnancyData);
      
      if (pregnancyData) {
        const conceptionDate = pregnancyData.conceptionDate ? new Date(pregnancyData.conceptionDate) : null;
        
        // SMART CALCULATION: Calculate weeks based on current date
        let weeksPregnant = 0;
        let dueDate = pregnancyData.dueDate ? new Date(pregnancyData.dueDate) : null;
        let trimester = null;
        
        if (conceptionDate) {
          weeksPregnant = calculatePregnancyWeeks(conceptionDate);
          trimester = getTrimester(weeksPregnant);
          
          // Calculate due date if not present
          if (!dueDate) {
            dueDate = calculateDueDate(conceptionDate);
          }
        } else if (dueDate) {
          // Calculate weeks from due date
          const today = new Date();
          const diffTime = Math.abs(dueDate - today);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          weeksPregnant = 40 - Math.floor(diffDays / 7);
          if (weeksPregnant < 1) weeksPregnant = 1;
          if (weeksPregnant > 42) weeksPregnant = 42;
          trimester = getTrimester(weeksPregnant);
        }
        
        console.log(`📊 SMART PREGNANCY CALC: Conception: ${conceptionDate?.toDateString()}, Today: ${new Date().toDateString()}, Weeks: ${weeksPregnant}, Trimester: ${trimester}`);
        
        setDashboardData(prev => ({
          ...prev,
          femaleHealth: {
            ...prev.femaleHealth,
            pregnancy: {
              hasData: true,
              isPregnant: true,
              dueDate: dueDate,
              conceptionDate: conceptionDate,
              trimester: trimester,
              weeksPregnant: weeksPregnant,
              startDate: conceptionDate
            }
          }
        }));
      }

      // Process sleep data
      let sleepRecordsData = [];
      if (sleepRecords.status === 'fulfilled' && sleepRecords.value) {
        if (Array.isArray(sleepRecords.value)) {
          sleepRecordsData = sleepRecords.value;
        } else if (sleepRecords.value.data && Array.isArray(sleepRecords.value.data)) {
          sleepRecordsData = sleepRecords.value.data;
        }
      }
      
      if (sleepRecordsData.length > 0) {
        const last7Days = sleepRecordsData.slice(-7);
        let totalHours = 0;
        let totalQuality = 0;
        let qualityCount = 0;
        const sleepDurations = [];
        
        last7Days.forEach(record => {
          const duration = calculateSleepDuration(record.sleepStart, record.sleepEnd);
          totalHours += duration;
          sleepDurations.push(duration);
          
          if (record.sleepQuality) {
            totalQuality += record.sleepQuality;
            qualityCount++;
          }
        });
        
        const avgHours = last7Days.length > 0 ? parseFloat((totalHours / last7Days.length).toFixed(1)) : 0;
        const avgQuality = qualityCount > 0 ? parseFloat((totalQuality / qualityCount).toFixed(1)) : 0;
        
        setDashboardData(prev => ({
          ...prev,
          sleep: {
            records: sleepRecordsData,
            avgHours: avgHours,
            avgQuality: avgQuality,
            totalHours: totalHours
          }
        }));
        
        setTrends(prev => ({
          ...prev,
          sleep: sleepDurations
        }));
        
        setWeeklyStats(prev => ({
          ...prev,
          sleepHours: totalHours,
          sleepQuality: avgQuality
        }));
      }

      // Process fitness data
      const fitnessData = fitnessRecords.value || [];
      if (fitnessData.length > 0) {
        const last7Days = fitnessData.slice(-7);
        const totalWorkouts = last7Days.length;
        const totalCalories = last7Days.reduce((sum, r) => sum + (r.caloriesBurned || (r.duration * 5) || 0), 0);
        
        setDashboardData(prev => ({
          ...prev,
          fitness: {
            records: fitnessData,
            totalWorkouts: totalWorkouts,
            totalDuration: last7Days.reduce((sum, r) => sum + (r.duration || 0), 0),
            totalCalories: totalCalories
          }
        }));
        
        setWeeklyStats(prev => ({
          ...prev,
          workouts: totalWorkouts,
          caloriesBurned: totalCalories
        }));
        
        setTrends(prev => ({
          ...prev,
          workouts: last7Days.map(r => r.duration || 0)
        }));
      }

      // Process nutrition data
      const nutritionData = nutritionRecords.value || [];
      if (nutritionData.length > 0) {
        const last7Days = nutritionData.slice(-7);
        const totalCalories = last7Days.reduce((sum, r) => sum + (parseInt(r.calories) || 0), 0);
        const totalProtein = last7Days.reduce((sum, r) => sum + (parseInt(r.protein) || 0), 0);
        const totalCarbs = last7Days.reduce((sum, r) => sum + (parseInt(r.carbs) || 0), 0);
        const totalFats = last7Days.reduce((sum, r) => sum + (parseInt(r.fats) || 0), 0);
        
        setDashboardData(prev => ({
          ...prev,
          nutrition: {
            records: nutritionData,
            totalCalories: totalCalories,
            avgCalories: Math.round(totalCalories / (last7Days.length || 1)),
            totalProtein: totalProtein,
            totalCarbs: totalCarbs,
            totalFats: totalFats
          }
        }));
        
        setWeeklyStats(prev => ({
          ...prev,
          caloriesEaten: totalCalories,
          proteinEaten: totalProtein
        }));
        
        setTrends(prev => ({
          ...prev,
          calories: last7Days.map(r => parseInt(r.calories) || 0)
        }));
      }

      // Process wellness activities
      let wellnessData = [];
      if (wellnessActivities.status === 'fulfilled' && wellnessActivities.value) {
        if (Array.isArray(wellnessActivities.value)) {
          wellnessData = wellnessActivities.value;
        } else if (wellnessActivities.value.data && Array.isArray(wellnessActivities.value.data)) {
          wellnessData = wellnessActivities.value.data;
        }
      }
      
      if (wellnessData.length > 0) {
        setDashboardData(prev => ({
          ...prev,
          wellness: {
            activities: wellnessData,
            totalActivities: wellnessData.length,
            moodScores: wellnessData.map(w => w.moodScore || 5)
          }
        }));
      }

      // Process community data
      let communityData = [];
      if (communityPosts.status === 'fulfilled' && communityPosts.value) {
        if (communityPosts.value.data && Array.isArray(communityPosts.value.data)) {
          communityData = communityPosts.value.data;
        } else if (Array.isArray(communityPosts.value)) {
          communityData = communityPosts.value;
        } else if (communityPosts.value.success && Array.isArray(communityPosts.value.data)) {
          communityData = communityPosts.value.data;
        }
      }
      
      console.log('📊 Community posts found:', communityData.length);
      
      if (communityData.length > 0) {
        const totalLikes = communityData.reduce((sum, p) => sum + (p.likesCount || p.likes?.length || 0), 0);
        const totalComments = communityData.reduce((sum, p) => sum + (p.comments?.length || 0), 0);
        
        setDashboardData(prev => ({
          ...prev,
          community: {
            posts: communityData,
            totalPosts: communityData.length,
            totalLikes: totalLikes,
            totalComments: totalComments
          }
        }));
        
        setWeeklyStats(prev => ({
          ...prev,
          communityPosts: communityData.length
        }));
      }

      // Process Men's Health data
      let menHealthData = [];
      if (menHealthRecords.status === 'fulfilled' && menHealthRecords.value) {
        if (menHealthRecords.value.records && Array.isArray(menHealthRecords.value.records)) {
          menHealthData = menHealthRecords.value.records;
        } else if (menHealthRecords.value.data && Array.isArray(menHealthRecords.value.data)) {
          menHealthData = menHealthRecords.value.data;
        } else if (Array.isArray(menHealthRecords.value)) {
          menHealthData = menHealthRecords.value;
        }
      }
      
      if (menHealthData.length > 0) {
        const recentEntries = menHealthData.slice(-7);
        const totalStress = recentEntries.reduce((sum, r) => sum + (r.stressLevel || 5), 0);
        const totalEnergy = recentEntries.reduce((sum, r) => sum + (r.energyLevel || 5), 0);
        const totalSleep = recentEntries.reduce((sum, r) => sum + (r.sleepHours || 7), 0);
        const totalWorkouts = recentEntries.reduce((sum, r) => sum + (r.workoutDays || 3), 0);
        
        const avgStress = recentEntries.length > 0 ? parseFloat((totalStress / recentEntries.length).toFixed(1)) : 0;
        const avgEnergy = recentEntries.length > 0 ? parseFloat((totalEnergy / recentEntries.length).toFixed(1)) : 0;
        const avgSleep = recentEntries.length > 0 ? parseFloat((totalSleep / recentEntries.length).toFixed(1)) : 0;
        const avgWorkouts = recentEntries.length > 0 ? parseFloat((totalWorkouts / recentEntries.length).toFixed(1)) : 0;
        
        let healthScore = 0;
        if (avgStress <= 3) healthScore += 30;
        else if (avgStress <= 6) healthScore += 20;
        else healthScore += 10;
        
        if (avgSleep >= 7 && avgSleep <= 9) healthScore += 25;
        else if (avgSleep >= 6) healthScore += 15;
        else healthScore += 5;
        
        if (avgWorkouts >= 4) healthScore += 25;
        else if (avgWorkouts >= 2) healthScore += 15;
        else healthScore += 5;
        
        if (avgEnergy >= 8) healthScore += 20;
        else if (avgEnergy >= 5) healthScore += 10;
        else healthScore += 5;
        
        let healthStatus = 'Good';
        if (healthScore >= 80) healthStatus = 'Excellent';
        else if (healthScore >= 60) healthStatus = 'Good';
        else if (healthScore >= 40) healthStatus = 'Fair';
        else healthStatus = 'Needs Attention';
        
        const recentMoods = recentEntries.map(r => {
          if (r.stressLevel > 7) return 'stressed';
          if (r.energyLevel < 4) return 'tired';
          if (r.sleepHours < 6) return 'sleep-deprived';
          return 'balanced';
        });
        
        setDashboardData(prev => ({
          ...prev,
          menHealth: {
            hasData: true,
            lastCheckup: recentEntries[0]?.createdAt || null,
            healthStatus: healthStatus,
            averageStress: avgStress,
            averageEnergy: avgEnergy,
            averageSleep: avgSleep,
            workoutDays: avgWorkouts,
            recentMoods: recentMoods,
            healthScore: healthScore
          }
        }));
      }

      // Build recent activity feed
      const activities = [];
      
      if (fitnessData.length > 0) {
        fitnessData.slice(0, 3).forEach(f => {
          activities.push({
            type: 'fitness',
            title: 'Workout',
            description: `${f.activityType || 'Exercise'} - ${f.duration || 0} mins`,
            time: f.createdAt,
            icon: <Dumbbell className="w-4 h-4" />
          });
        });
      }
      
      if (nutritionData.length > 0) {
        nutritionData.slice(0, 3).forEach(n => {
          activities.push({
            type: 'nutrition',
            title: 'Meal Logged',
            description: `${n.meal || 'Meal'} - ${n.calories} kcal`,
            time: n.createdAt,
            icon: <UtensilsCrossed className="w-4 h-4" />
          });
        });
      }
      
      if (sleepRecordsData.length > 0) {
        sleepRecordsData.slice(0, 3).forEach(s => {
          const duration = calculateSleepDuration(s.sleepStart, s.sleepEnd);
          activities.push({
            type: 'sleep',
            title: 'Sleep Recorded',
            description: `${duration.toFixed(1)} hours - Quality: ${s.sleepQuality || 0}/10`,
            time: s.createdAt,
            icon: <Moon className="w-4 h-4" />
          });
        });
      }
      
      if (communityData.length > 0) {
        communityData.slice(0, 3).forEach(p => {
          activities.push({
            type: 'community',
            title: 'Community Post',
            description: p.content?.substring(0, 50) + (p.content?.length > 50 ? '...' : ''),
            time: p.createdAt,
            icon: <MessageCircle className="w-4 h-4" />
          });
        });
      }
      
      activities.sort((a, b) => new Date(b.time) - new Date(a.time));
      setDashboardData(prev => ({
        ...prev,
        recentActivity: activities.slice(0, 10)
      }));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.custom((t) => (
        <ErrorToast
          message="Data Load Error"
          description="Failed to load dashboard data. Please refresh."
        />
      ), { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    const loadingToast = toast.loading(
      <div className="flex items-center gap-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        <span>Generating your weekly health report...</span>
      </div>,
      {
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          borderRadius: '12px',
          padding: '12px 20px',
        },
        duration: Infinity
      }
    );

    try {
      setGeneratingReport(true);
      const response = await apiService.generateWeeklyReport();
      
      if (response.success && response.downloadUrl) {
        const filename = response.downloadUrl.split('/').pop();
        const downloadResponse = await apiService.downloadWeeklyReport(filename);
        
        const blob = new Blob([downloadResponse.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || 'weekly-health-report.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        toast.dismiss(loadingToast);
        toast.custom((t) => (
          <SuccessToast
            message="Weekly Report Downloaded!"
            description="Your health report has been saved to your device"
          />
        ), { duration: 5000 });
        
      } else {
        toast.dismiss(loadingToast);
        toast.custom((t) => (
          <ErrorToast
            message="Report Generation Failed"
            description={response.message || 'Unable to generate report. Please try again.'}
          />
        ), { duration: 5000 });
      }
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.dismiss(loadingToast);
      toast.custom((t) => (
        <ErrorToast
          message="Download Failed"
          description="Something went wrong. Please try again later."
        />
      ), { duration: 5000 });
    } finally {
      setGeneratingReport(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  const formatTimeAgo = (date) => {
    if (!date) return '';
    const now = new Date();
    const then = new Date(date);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const getHealthStatusColor = (status) => {
    switch(status) {
      case 'Excellent': return 'text-green-600 bg-green-100';
      case 'Good': return 'text-blue-600 bg-blue-100';
      case 'Fair': return 'text-yellow-600 bg-yellow-100';
      case 'Needs Attention': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMoodEmoji = (mood) => {
    switch(mood) {
      case 'stressed': return '😰';
      case 'tired': return '😴';
      case 'sleep-deprived': return '😫';
      default: return '😊';
    }
  };

  const sleepChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Sleep Hours',
      data: trends.sleep.length === 7 ? trends.sleep : [],
      borderColor: colors.sleep,
      backgroundColor: `${colors.sleep}20`,
      tension: 0.4,
      fill: true
    }]
  };

  const calorieChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calories Eaten',
        data: trends.calories.length === 7 ? trends.calories : [],
        borderColor: colors.nutrition,
        backgroundColor: `${colors.nutrition}20`,
        tension: 0.4
      },
      {
        label: 'Calories Burned',
        data: trends.workouts.length === 7 ? trends.workouts.map(w => w * 100) : [],
        borderColor: colors.fitness,
        backgroundColor: `${colors.fitness}20`,
        tension: 0.4
      }
    ]
  };

  const macroChartData = {
    labels: ['Protein', 'Carbs', 'Fats'],
    datasets: [{
      data: [
        dashboardData.nutrition.totalProtein,
        dashboardData.nutrition.totalCarbs,
        dashboardData.nutrition.totalFats
      ],
      backgroundColor: [colors.fitness, colors.nutrition, colors.wellness],
      borderWidth: 0
    }]
  };

  const StatCard = ({ title, value, unit, icon, color, trend }) => (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1" style={{ color: colors.text }}>
            {value}{unit && <span className="text-sm ml-1 text-gray-400">{unit}</span>}
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend > 0 ? (
                <TrendingUp className="w-3 h-3 text-green-500" />
              ) : (
                <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
              )}
              <span className={`text-xs ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(trend)}% from last week
              </span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}15` }}>
          <div style={{ color }}>{icon}</div>
        </div>
      </div>
    </motion.div>
  );

  const SectionCard = ({ title, icon, color, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
    >
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
          <div style={{ color }}>{icon}</div>
        </div>
        <h2 className="text-lg font-semibold" style={{ color: colors.text }}>{title}</h2>
      </div>
      <div className="p-5">
        {children}
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: colors.accent }}></div>
          <p style={{ color: colors.text }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: colors.background }}>
      <Toaster 
        position="top-right"
        containerStyle={{
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
          },
        }}
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{ color: colors.text }}>
              Welcome back, {user?.name || 'User'}! 👋
            </h1>
            <p className="text-gray-500 mt-1">Here's your health summary for this week</p>
          </div>
          
          <button
            onClick={handleDownloadReport}
            disabled={generatingReport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:opacity-90 transition-colors disabled:opacity-50"
          >
            {generatingReport ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <BarChart3 className="w-4 h-4" />
                Download Weekly Report
              </>
            )}
          </button>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Weekly Activity"
            value={dashboardData.fitness.totalWorkouts + dashboardData.wellness.totalActivities}
            icon={<Activity className="w-5 h-5" />}
            color={colors.primary}
            trend={5}
          />
          <StatCard
            title="Sleep Average"
            value={dashboardData.sleep.avgHours || 0}
            unit="hrs"
            icon={<Moon className="w-5 h-5" />}
            color={colors.sleep}
            trend={2}
          />
          <StatCard
            title="Calories Burned"
            value={dashboardData.fitness.totalCalories || 0}
            unit="kcal"
            icon={<Flame className="w-5 h-5" />}
            color={colors.fitness}
          />
          <StatCard
            title="Community Posts"
            value={dashboardData.community.totalPosts || 0}
            icon={<Users className="w-5 h-5" />}
            color={colors.community}
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Female Health Section with SMART Pregnancy Tracking */}
          <SectionCard title="Female Health" icon={<Droplets className="w-5 h-5" />} color={colors.female}>
            <div className="space-y-4">
              {/* Cycle Tracking */}
              {dashboardData.femaleHealth.hasData ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Last Cycle</span>
                    <span className="font-medium text-gray-800">
                      {formatDate(dashboardData.femaleHealth.lastCycle?.startDate)} - {formatDate(dashboardData.femaleHealth.lastCycle?.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Cycle Length</span>
                    <span className="font-medium text-gray-800">{dashboardData.femaleHealth.cycleLength} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Next Cycle</span>
                    <span className="font-medium text-pink-600">
                      {formatDate(dashboardData.femaleHealth.nextCycle)}
                      {new Date(dashboardData.femaleHealth.nextCycle) < new Date() && (
                        <span className="text-xs text-red-500 ml-1">(Overdue)</span>
                      )}
                    </span>
                  </div>
                  {dashboardData.femaleHealth.ovulationWindow && (
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Ovulation Window</span>
                        <span className="font-medium text-purple-600">
                          {formatDate(dashboardData.femaleHealth.ovulationWindow.start)} - {formatDate(dashboardData.femaleHealth.ovulationWindow.end)}
                        </span>
                      </div>
                      {new Date() >= dashboardData.femaleHealth.ovulationWindow.start && 
                       new Date() <= dashboardData.femaleHealth.ovulationWindow.end && (
                        <div className="mt-2 text-xs text-pink-500 bg-pink-50 p-2 rounded-lg">
                          🌸 You are currently in your fertile window!
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-3">
                  <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" style={{ color: colors.text }} />
                  <p className="text-gray-500 text-sm">No cycle data yet</p>
                  <button 
                    onClick={() => navigate('/female-health/cycle')}
                    className="mt-2 text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                  >
                    Log Cycle
                  </button>
                </div>
              )}
              
              {/* Pregnancy Tracking - SMART CALCULATION */}
              {dashboardData.femaleHealth.pregnancy.hasData ? (
                <div className="mt-4 pt-3 border-t border-pink-200 bg-pink-50/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Baby className="w-4 h-4 text-pink-500" />
                    <span className="font-semibold text-pink-700 text-sm">Pregnancy Tracker</span>
                    <span className="text-xs text-pink-500 ml-auto">
                      Updated: {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {dashboardData.femaleHealth.pregnancy.conceptionDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Conception Date</span>
                        <span className="font-medium text-pink-600">{formatDate(dashboardData.femaleHealth.pregnancy.conceptionDate)}</span>
                      </div>
                    )}
                    {dashboardData.femaleHealth.pregnancy.dueDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date</span>
                        <span className="font-medium text-pink-600">{formatDate(dashboardData.femaleHealth.pregnancy.dueDate)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Week</span>
                      <span className="font-medium text-pink-600">{dashboardData.femaleHealth.pregnancy.weeksPregnant} weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trimester</span>
                      <span className="font-medium text-pink-600">{dashboardData.femaleHealth.pregnancy.trimester}</span>
                    </div>
                    {dashboardData.femaleHealth.pregnancy.weeksPregnant > 0 && (
                      <div className="mt-2 pt-2 border-t border-pink-100">
                        <div className="text-xs text-pink-600 flex items-center gap-1">
                          <span>📅</span>
                          <span>Estimated delivery in {40 - dashboardData.femaleHealth.pregnancy.weeksPregnant} weeks</span>
                        </div>
                        {dashboardData.femaleHealth.pregnancy.weeksPregnant <= 12 && (
                          <div className="mt-1 text-xs text-purple-500 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>First trimester: Focus on folic acid and prenatal vitamins</span>
                          </div>
                        )}
                        {dashboardData.femaleHealth.pregnancy.weeksPregnant > 12 && dashboardData.femaleHealth.pregnancy.weeksPregnant <= 28 && (
                          <div className="mt-1 text-xs text-blue-500 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Second trimester: Baby is growing rapidly!</span>
                          </div>
                        )}
                        {dashboardData.femaleHealth.pregnancy.weeksPregnant > 28 && (
                          <div className="mt-1 text-xs text-green-500 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Third trimester: Prepare for baby's arrival</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => navigate('/female-health/pregnancy')}
                    className="mt-3 w-full text-xs py-1.5 rounded-lg bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
                  >
                    Update Pregnancy
                  </button>
                </div>
              ) : (
                <div className="mt-3 pt-2 border-t border-gray-100">
                  <button 
                    onClick={() => navigate('/female-health/pregnancy')}
                    className="w-full text-xs py-1.5 rounded-lg border border-pink-200 text-pink-600 hover:bg-pink-50 transition-colors flex items-center justify-center gap-1"
                  >
                    <Baby className="w-3 h-3" />
                    Track Pregnancy
                  </button>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Men's Health Section */}
          <SectionCard title="Men's Health" icon={<Shield className="w-5 h-5" />} color={colors.male}>
            {dashboardData.menHealth.hasData ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Health Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthStatusColor(dashboardData.menHealth.healthStatus)}`}>
                    {dashboardData.menHealth.healthStatus}
                    {dashboardData.menHealth.healthStatus === 'Excellent' && ' 🎯'}
                    {dashboardData.menHealth.healthStatus === 'Good' && ' ✓'}
                    {dashboardData.menHealth.healthStatus === 'Fair' && ' ⚠️'}
                    {dashboardData.menHealth.healthStatus === 'Needs Attention' && ' ⚠️'}
                  </span>
                </div>
                
                <div className="flex items-center justify-center mb-2">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-200" />
                      <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray={`${(dashboardData.menHealth.healthScore / 100) * 264} 264`} className="text-blue-500 transition-all duration-500" style={{ strokeDashoffset: 0 }} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{dashboardData.menHealth.healthScore}</div>
                        <div className="text-xs text-gray-500">Score</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-50 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-500">Stress Level</div>
                    <div className="text-xl font-bold text-red-600">{dashboardData.menHealth.averageStress}/10</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-500">Energy Level</div>
                    <div className="text-xl font-bold text-green-600">{dashboardData.menHealth.averageEnergy}/10</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-500">Sleep Hours</div>
                    <div className="text-xl font-bold text-purple-600">{dashboardData.menHealth.averageSleep}h</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <div className="text-sm text-gray-500">Workouts/Week</div>
                    <div className="text-xl font-bold text-orange-600">{dashboardData.menHealth.workoutDays} days</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-gray-500">Last Checkup</span>
                  <span className="font-medium text-gray-800">
                    {dashboardData.menHealth.lastCheckup 
                      ? formatDate(dashboardData.menHealth.lastCheckup)
                      : 'Not recorded'}
                  </span>
                </div>
                
                {dashboardData.menHealth.recentMoods.length > 0 && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium text-gray-700">Recent Mood Trend</span>
                    </div>
                    <div className="flex gap-2">
                      {dashboardData.menHealth.recentMoods.slice(0, 7).map((mood, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className="text-xl">{getMoodEmoji(mood)}</div>
                          <div className="text-xs text-gray-500 mt-1">{idx + 1}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={() => navigate('/men-health')}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Update Health Data
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" style={{ color: colors.text }} />
                <p className="text-gray-500">No health data yet</p>
                <p className="text-xs text-gray-400 mt-1">Track your health to see insights</p>
                <button 
                  onClick={() => navigate('/men-health')}
                  className="mt-4 text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                >
                  Log Health Data
                </button>
              </div>
            )}
          </SectionCard>

          {/* Sleep & Recovery Chart */}
          <SectionCard title="Sleep & Recovery" icon={<Moon className="w-5 h-5" />} color={colors.sleep}>
            <div className="h-48 mb-4">
              {trends.sleep.length > 0 ? (
                <Line data={sleepChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                  No sleep data available
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{dashboardData.sleep.avgHours || 0}h</p>
                <p className="text-sm text-gray-500">Average Sleep</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{dashboardData.sleep.avgQuality || 0}/10</p>
                <p className="text-sm text-gray-500">Sleep Quality</p>
              </div>
            </div>
          </SectionCard>

          {/* Fitness & Nutrition Chart */}
          <SectionCard title="Fitness & Nutrition" icon={<Dumbbell className="w-5 h-5" />} color={colors.fitness}>
            <div className="h-48 mb-4">
              {trends.calories.length > 0 || trends.workouts.length > 0 ? (
                <Line data={calorieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                  No fitness or nutrition data available
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{dashboardData.fitness.totalWorkouts || 0}</p>
                <p className="text-sm text-gray-500">Workouts This Week</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{dashboardData.fitness.totalCalories || 0}</p>
                <p className="text-sm text-gray-500">Calories Burned</p>
              </div>
            </div>
          </SectionCard>

          {/* Nutrition Macros */}
          <SectionCard title="Nutrition Overview" icon={<UtensilsCrossed className="w-5 h-5" />} color={colors.nutrition}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{dashboardData.nutrition.avgCalories || 0}</p>
                <p className="text-sm text-gray-500">Avg Daily Calories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{dashboardData.nutrition.totalProtein || 0}g</p>
                <p className="text-sm text-gray-500">Total Protein</p>
              </div>
            </div>
            <div className="h-32">
              {dashboardData.nutrition.totalProtein > 0 || dashboardData.nutrition.totalCarbs > 0 || dashboardData.nutrition.totalFats > 0 ? (
                <Doughnut data={macroChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                  No nutrition data available
                </div>
              )}
            </div>
          </SectionCard>

          {/* Wellness Activities */}
          <SectionCard title="Wellness Activities" icon={<Brain className="w-5 h-5" />} color={colors.wellness}>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Activities Completed</span>
                <span className="text-2xl font-bold text-pink-600">{dashboardData.wellness.totalActivities || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Average Mood</span>
                <div className="flex items-center gap-1">
                  {dashboardData.wellness.moodScores.length > 0 ? (
                    <>
                      <span className="text-lg">{['😢', '😐', '🙂', '😊', '😄'][Math.round(dashboardData.wellness.moodScores.reduce((a,b)=>a+b,0)/dashboardData.wellness.moodScores.length) - 1] || '🙂'}</span>
                      <span className="font-medium">
                        {Math.round(dashboardData.wellness.moodScores.reduce((a,b)=>a+b,0)/dashboardData.wellness.moodScores.length)}/5
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-400">No data</span>
                  )}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-500">Quick activities:</p>
                <div className="flex gap-2 mt-2">
                  <button className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">Meditate</button>
                  <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">Journal</button>
                  <button className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">Stretch</button>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Community Activity */}
        <SectionCard title="Community Activity" icon={<Users className="w-5 h-5" />} color={colors.community}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-indigo-600">{dashboardData.community.totalPosts || 0}</p>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-indigo-600">{dashboardData.community.totalLikes || 0}</p>
              <p className="text-sm text-gray-500">Likes Received</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-indigo-600">{dashboardData.community.totalComments || 0}</p>
              <p className="text-sm text-gray-500">Comments</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/community')}
            className="w-full py-2 rounded-lg border-2 border-indigo-200 text-indigo-600 font-medium hover:bg-indigo-50 transition-colors"
          >
            Go to Community
          </button>
        </SectionCard>

        {/* Recent Activity Feed */}
        <SectionCard title="Recent Activity" icon={<Clock className="w-5 h-5" />} color={colors.primary}>
          <div className="space-y-3">
            {dashboardData.recentActivity.length > 0 ? (
              dashboardData.recentActivity.slice(0, 5).map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-400">{formatTimeAgo(activity.time)}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" style={{ color: colors.text }} />
                <p className="text-gray-500">No recent activity</p>
                <p className="text-sm text-gray-400">Start tracking your health to see activity here</p>
              </div>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default LabInsights;