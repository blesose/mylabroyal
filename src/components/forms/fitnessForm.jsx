import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { apiService } from '../../services/api';
import { 
  TrendingUp, 
  Flame, 
  Timer, 
  Activity, 
  Edit2, 
  Trash2, 
  Plus, 
  RefreshCw,
  Trophy,
  Target,
  ChevronRight,
  AlertTriangle,
  X
} from 'lucide-react';

const FitnessForm = () => {
  const [fitnessData, setFitnessData] = useState([]);
  const [form, setForm] = useState({
    activityType: '',
    duration: '',
    intensity: 'medium',
    frequency: '3',
    goal: 'weight_loss',
    notes: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [stats, setStats] = useState({
    totalDuration: 0,
    activitiesCount: 0,
    avgDuration: 0
  });
  const [activeTab, setActiveTab] = useState('all');

  // Fitness categories
  const activityCategories = [
    { id: 'all', name: 'All Activities', icon: '🏃‍♂️', color: 'from-blue-500 to-cyan-500' },
    { id: 'cardio', name: 'Cardio', icon: '🏃‍♀️', color: 'from-red-500 to-pink-500' },
    { id: 'strength', name: 'Strength', icon: '💪', color: 'from-orange-500 to-yellow-500' },
    { id: 'flexibility', name: 'Flexibility', icon: '🧘‍♀️', color: 'from-purple-500 to-indigo-500' },
    { id: 'sports', name: 'Sports', icon: '⚽', color: 'from-green-500 to-emerald-500' },
  ];

  // Intensity levels
  const intensityLevels = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800', icon: '🐢' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800', icon: '🚶‍♂️' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800', icon: '🏃‍♂️' },
  ];

  // Fitness goals
  const fitnessGoals = [
    { value: 'weight_loss', label: 'Weight Loss', icon: '⚖️' },
    { value: 'muscle_gain', label: 'Muscle Gain', icon: '💪' },
    { value: 'endurance', label: 'Endurance', icon: '🏃‍♂️' },
    { value: 'flexibility', label: 'Flexibility', icon: '🧘‍♂️' },
    { value: 'general_health', label: 'General Health', icon: '❤️' },
  ];

  // Delete Confirmation Modal
  const DeleteConfirmDialog = ({ record, onConfirm, onCancel }) => {
    const formatDate = (dateString) => {
      if (!dateString) return 'this date';
      try {
        return new Date(dateString).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      } catch {
        return 'this date';
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl mx-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-full">
              <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Delete Activity</h3>
          </div>
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            Are you sure you want to delete <span className="font-semibold text-gray-800">{record?.activityType}</span> from {formatDate(record?.createdAt)}?
            This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 text-sm sm:text-base font-medium"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const calculateStats = (data) => {
    const safeData = Array.isArray(data) ? data : [];
    const totalDuration = safeData.reduce((sum, item) => sum + (parseInt(item?.duration) || 0), 0);
    const activitiesCount = safeData.length;
    const avgDuration = activitiesCount > 0 ? Math.round(totalDuration / activitiesCount) : 0;

    setStats({
      totalDuration,
      activitiesCount,
      avgDuration
    });
  };

  const fetchFitness = async () => {
    const loadingToast = toast.loading(
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span className="font-medium text-sm sm:text-base">Loading fitness data...</span>
      </div>,
      { 
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          borderRadius: '12px',
        }
      }
    );

    try {
      setLoading(true);
      const response = await apiService.getAllFitness();
      
      const data = Array.isArray(response) ? response : [];
      setFitnessData(data);
      calculateStats(data);
      
      toast.dismiss(loadingToast);
      toast.success(
        <div className="space-y-1">
          <div className="font-bold text-sm sm:text-base">🏋️‍♂️ Fitness Data Loaded!</div>
          <div className="text-xs sm:text-sm opacity-90">{data.length} activities found</div>
        </div>,
        { 
          style: {
            background: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
            color: '#fff',
            borderRadius: '12px',
          },
          duration: 2000 
        }
      );
    } catch (error) {
      console.error('Error fetching fitness data:', error);
      setFitnessData([]);
      calculateStats([]);
      
      toast.dismiss(loadingToast);
      toast.error(
        <div className="space-y-1">
          <div className="font-bold text-sm sm:text-base">⚠️ Failed to Load Data</div>
          <div className="text-xs sm:text-sm">Unable to fetch fitness records</div>
        </div>,
        { 
          style: {
            background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
            color: '#fff',
            borderRadius: '12px',
          },
          duration: 4000 
        }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFitness();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = [];
    if (!form.activityType.trim()) errors.push('Activity type is required');
    if (!form.duration || parseInt(form.duration) < 10) errors.push('Duration must be at least 10 minutes');
    if (!form.frequency || parseInt(form.frequency) < 1 || parseInt(form.frequency) > 7) errors.push('Frequency must be between 1 and 7 days per week');
    if (!form.intensity) errors.push('Intensity level is required');
    if (!form.goal) errors.push('Fitness goal is required');
    
    if (errors.length > 0) {
      toast.error(
        <div className="space-y-1">
          <div className="font-bold text-sm sm:text-base">❌ Validation Error</div>
          <div className="text-xs sm:text-sm">
            {errors.map((error, idx) => (
              <div key={idx}>• {error}</div>
            ))}
          </div>
        </div>,
        { 
          style: {
            background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
            color: '#fff',
            borderRadius: '12px',
          },
          duration: 4000 
        }
      );
      return;
    }
    
    const formattedData = {
      activityType: form.activityType.trim(),
      duration: parseInt(form.duration),
      intensity: form.intensity,
      frequency: parseInt(form.frequency),
      goal: form.goal
    };
    
    const submitToast = toast.loading(
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span className="font-medium text-sm sm:text-base">
          {editingId ? 'Updating activity...' : 'Adding new activity...'}
        </span>
      </div>,
      { 
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          borderRadius: '12px',
        },
        duration: Infinity
      }
    );

    try {
      if (editingId) {
        await apiService.updateFitness(editingId, formattedData);
        toast.dismiss(submitToast);
        toast.success(
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">✏️</div>
              <div>
                <div className="font-bold text-sm sm:text-base">Activity Updated!</div>
                <div className="text-xs sm:text-sm opacity-90">{form.activityType} has been updated</div>
              </div>
            </div>
          </div>,
          { 
            style: {
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: '#fff',
              borderRadius: '12px',
            },
            duration: 3000 
          }
        );
      } else {
        await apiService.createFitness(formattedData);
        toast.dismiss(submitToast);
        toast.success(
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🎉</div>
              <div>
                <div className="font-bold text-sm sm:text-base">Activity Added!</div>
                <div className="text-xs sm:text-sm opacity-90">{form.activityType} has been recorded</div>
              </div>
            </div>
          </div>,
          { 
            style: {
              background: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
              color: '#fff',
              borderRadius: '12px',
            },
            duration: 3000 
          }
        );
      }
      
      setForm({
        activityType: '',
        duration: '',
        intensity: 'medium',
        frequency: '3',
        goal: 'weight_loss',
        notes: ''
      });
      setEditingId(null);
      fetchFitness();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.dismiss(submitToast);
      toast.error(
        <div className="space-y-1">
          <div className="font-bold text-sm sm:text-base">❌ Operation Failed</div>
          <div className="text-xs sm:text-sm">{error.response?.data?.message || error.message || 'Unable to save activity. Please try again.'}</div>
        </div>,
        { 
          style: {
            background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
            color: '#fff',
            borderRadius: '12px',
          },
          duration: 4000 
        }
      );
    }
  };

  const handleDeleteRecord = async (id) => {
    setIsDeleting(true);
    const deleteToast = toast.loading(
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span className="font-medium text-sm sm:text-base">Deleting activity...</span>
      </div>,
      {
        style: {
          background: 'linear-gradient(135deg, #ef4444 0%, #ec489a 100%)',
          color: '#fff',
          borderRadius: '12px',
        }
      }
    );

    try {
      await apiService.deleteFitness(id);
      toast.dismiss(deleteToast);
      toast.success(
        <div className="flex items-center space-x-3">
          <div className="text-green-500 text-2xl">✅</div>
          <div>
            <div className="font-bold text-sm sm:text-base">Activity Deleted</div>
            <div className="text-xs sm:text-sm opacity-90">Removed from your fitness log</div>
          </div>
        </div>,
        { 
          style: {
            background: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
            color: '#fff',
            borderRadius: '12px',
          },
          duration: 3000 
        }
      );
      fetchFitness();
    } catch (error) {
      toast.dismiss(deleteToast);
      toast.error(
        <div className="space-y-1">
          <div className="font-bold text-sm sm:text-base">❌ Delete Failed</div>
          <div className="text-xs sm:text-sm">Unable to delete activity. Please try again.</div>
        </div>,
        {
          style: {
            background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
            color: '#fff',
            borderRadius: '12px',
          }
        }
      );
    } finally {
      setIsDeleting(false);
      setRecordToDelete(null);
    }
  };

  const handleEdit = (item) => {
    setForm({
      activityType: item.activityType || '',
      duration: item.duration || '',
      intensity: item.intensity || 'medium',
      frequency: item.frequency || '3',
      goal: item.goal || 'weight_loss',
      notes: item.aiTip || ''
    });
    setEditingId(item._id);
    toast('✏️ Editing mode activated! Update your activity details.', {
      icon: '📝',
      duration: 2000,
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        borderRadius: '12px',
      }
    });
  };

  const getActivityIcon = (activity) => {
    if (!activity) return '🏅';
    const activityLower = activity.toLowerCase();
    if (activityLower.includes('run') || activityLower.includes('jog')) return '🏃‍♂️';
    if (activityLower.includes('walk')) return '🚶‍♂️';
    if (activityLower.includes('cycle') || activityLower.includes('bike')) return '🚴‍♂️';
    if (activityLower.includes('swim')) return '🏊‍♂️';
    if (activityLower.includes('yoga') || activityLower.includes('stretch')) return '🧘‍♂️';
    if (activityLower.includes('lift') || activityLower.includes('weight')) return '🏋️‍♂️';
    if (activityLower.includes('climb')) return '🧗‍♂️';
    if (activityLower.includes('dance')) return '💃';
    return '🏅';
  };

  const calculateCaloriesBurned = (duration, intensity) => {
    const factor = intensity === "high" ? 10 : intensity === "medium" ? 7 : 5;
    return Math.round(duration * factor);
  };

  const filteredData = (() => {
    if (!Array.isArray(fitnessData)) return [];
    
    if (activeTab === 'all') return fitnessData;
    
    return fitnessData.filter(item => {
      if (!item || !item.activityType) return false;
      
      const activityLower = item.activityType.toLowerCase();
      switch (activeTab) {
        case 'cardio':
          return activityLower.includes('run') || activityLower.includes('jog') || 
                 activityLower.includes('cycle') || activityLower.includes('swim') ||
                 activityLower.includes('cardio');
        case 'strength':
          return activityLower.includes('lift') || activityLower.includes('weight') || 
                 activityLower.includes('strength') || activityLower.includes('gym');
        case 'flexibility':
          return activityLower.includes('yoga') || activityLower.includes('stretch') ||
                 activityLower.includes('pilates');
        case 'sports':
          return activityLower.includes('soccer') || activityLower.includes('basketball') || 
                 activityLower.includes('tennis') || activityLower.includes('football') ||
                 activityLower.includes('volleyball');
        default:
          return true;
      }
    });
  })();

  const totalCalories = filteredData.reduce((sum, item) => {
    return sum + calculateCaloriesBurned(item.duration || 0, item.intensity || 'medium');
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-4 md:p-6">
      <Toaster
        position="top-right"
        containerStyle={{
          top: 20,
          zIndex: 9999,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            borderRadius: '12px',
            fontWeight: '600',
          },
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center space-x-2 sm:space-x-3">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl">
                  <Activity className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </div>
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800">Fitness Tracker</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600">Track your workouts, monitor progress, and achieve your fitness goals</p>
            </div>
            <button
              onClick={fetchFitness}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-all transform hover:scale-105 flex items-center space-x-2 text-sm sm:text-base"
            >
              <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Refresh</span>
            </button>
          </div>

          {/* Stats Cards - Responsive Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm opacity-90">Calories</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold">{totalCalories.toLocaleString()}</p>
                  <p className="text-[10px] sm:text-xs opacity-80 mt-1">kcal burned</p>
                </div>
                <Flame className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm opacity-90">Duration</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold">{Math.floor(stats.totalDuration / 60)}h {stats.totalDuration % 60}m</p>
                  <p className="text-[10px] sm:text-xs opacity-80 mt-1">active minutes</p>
                </div>
                <Timer className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm opacity-90">Activities</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold">{stats.activitiesCount}</p>
                  <p className="text-[10px] sm:text-xs opacity-80 mt-1">workouts logged</p>
                </div>
                <Trophy className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm opacity-90">Avg Duration</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold">{stats.avgDuration}m</p>
                  <p className="text-[10px] sm:text-xs opacity-80 mt-1">per workout</p>
                </div>
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 opacity-80" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column - Form & Categories */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Activity Form */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-5 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {editingId ? '✏️ Edit Activity' : '➕ Add New Activity'}
                </h2>
                {editingId && (
                  <button
                    onClick={() => {
                      setForm({
                        activityType: '',
                        duration: '',
                        intensity: 'medium',
                        frequency: '3',
                        goal: 'weight_loss',
                        notes: ''
                      });
                      setEditingId(null);
                      toast('Editing cancelled', { icon: '🔄' });
                    }}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Activity Type *</label>
                    <input
                      type="text"
                      placeholder="e.g., Running, Weight Lifting"
                      value={form.activityType}
                      onChange={(e) => setForm({ ...form, activityType: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Intensity Level *</label>
                    <div className="grid grid-cols-3 gap-1 sm:gap-2">
                      {intensityLevels.map((level) => (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() => setForm({ ...form, intensity: level.value })}
                          className={`p-2 sm:p-3 rounded-lg text-center transition-all text-xs sm:text-sm font-medium ${
                            form.intensity === level.value 
                              ? 'ring-2 ring-offset-2 ring-blue-400 transform scale-105' 
                              : 'hover:bg-gray-100'
                          } ${level.color}`}
                        >
                          <div className="text-sm sm:text-lg">{level.icon}</div>
                          <div className="text-[10px] sm:text-xs font-medium mt-0.5 sm:mt-1">{level.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      <Timer className="inline h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Duration (min) *
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 45"
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 text-sm sm:text-base"
                      required
                      min="10"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      <Target className="inline h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Days/Week *
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 3"
                      value={form.frequency}
                      onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 text-sm sm:text-base"
                      required
                      min="1"
                      max="7"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      <Trophy className="inline h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Fitness Goal *
                    </label>
                    <select
                      value={form.goal}
                      onChange={(e) => setForm({ ...form, goal: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 text-sm sm:text-base"
                      required
                    >
                      <option value="">Select a goal</option>
                      {fitnessGoals.map((goal) => (
                        <option key={goal.value} value={goal.value}>
                          {goal.icon} {goal.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Personal Notes</label>
                  <textarea
                    placeholder="How did you feel? Any achievements or challenges?"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none text-gray-800 text-sm sm:text-base"
                    rows={2}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                >
                  <div className="relative z-10 flex items-center justify-center space-x-2 sm:space-x-3">
                    {editingId ? (
                      <>
                        <Edit2 className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Update Activity</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Log Activity</span>
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>

            {/* Activity Categories Tabs */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-5 md:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Activity Categories</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
                {activityCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`p-3 sm:p-4 rounded-xl transition-all transform hover:scale-105 ${
                      activeTab === category.id
                        ? `bg-gradient-to-br ${category.color} text-white shadow-lg`
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{category.icon}</div>
                    <div className="text-[10px] sm:text-xs font-medium text-center">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Activity History */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-5 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Activity History</h2>
                <div className="text-xs sm:text-sm text-gray-500">
                  {Array.isArray(filteredData) ? filteredData.length : 0} activities
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-500"></div>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">Loading your fitness data...</p>
                </div>
              ) : !Array.isArray(filteredData) || filteredData.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🏃‍♂️</div>
                  <h3 className="text-base sm:text-xl font-semibold text-gray-700 mb-1 sm:mb-2">No Activities Yet</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Start by logging your first workout above!</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {filteredData.map((item) => {
                    const intensity = intensityLevels.find(l => l.value === (item?.intensity || 'medium'));
                    const calories = calculateCaloriesBurned(item.duration || 0, item.intensity || 'medium');
                    const goal = fitnessGoals.find(g => g.value === item.goal);
                    
                    return (
                      <div
                        key={item?._id || Math.random()}
                        className="group bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-cyan-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-300"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex items-start space-x-2 sm:space-x-4">
                            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg sm:rounded-xl flex-shrink-0">
                              <span className="text-xl sm:text-2xl">{getActivityIcon(item?.activityType)}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-start justify-between gap-2">
                                <div className="flex-1">
                                  <h4 className="font-bold text-gray-800 text-sm sm:text-base md:text-lg break-words">
                                    {item?.activityType || 'Unknown Activity'}
                                  </h4>
                                  {item?.grade && (
                                    <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] sm:text-xs font-medium rounded-full mt-1">
                                      Grade: {item.grade}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] sm:text-xs text-gray-500 flex-shrink-0">
                                  {new Date(item?.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 mt-2">
                                <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${intensity?.color || 'bg-gray-100 text-gray-800'}`}>
                                  {intensity?.icon} {intensity?.label}
                                </span>
                                <span className="text-gray-600 flex items-center text-[10px] sm:text-xs">
                                  <Timer className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                                  {item?.duration || 0} min
                                </span>
                                <span className="text-gray-600 flex items-center text-[10px] sm:text-xs">
                                  <Target className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                                  {item?.frequency || 0} days/wk
                                </span>
                                <span className="text-gray-600 flex items-center text-[10px] sm:text-xs">
                                  <Flame className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                                  {calories} kcal
                                </span>
                                {goal && (
                                  <span className="text-gray-600 text-[10px] sm:text-xs">
                                    {goal.icon} {goal.label}
                                  </span>
                                )}
                              </div>
                              {item?.aiTip && (
                                <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                                  <div className="flex items-start space-x-2">
                                    <span className="text-blue-500 text-xs sm:text-sm">💡</span>
                                    <p className="text-[10px] sm:text-xs text-gray-700 break-words">{item.aiTip}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity sm:self-center">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                              title="Edit"
                            >
                              <Edit2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                            <button
                              onClick={() => setRecordToDelete(item)}
                              className="p-1.5 sm:p-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                              title="Delete"
                            >
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Tips & Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Fitness Tips */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-5 md:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">💪 Fitness Tips</h3>
              <div className="space-y-2 sm:space-y-3">
                {[
                  'Stay hydrated before, during, and after workouts',
                  'Warm up for 5-10 minutes before intense exercise',
                  'Track your progress to stay motivated',
                  'Mix cardio and strength training for best results',
                  'Listen to your body and rest when needed',
                  'Set realistic and achievable fitness goals',
                ].map((tip, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg sm:rounded-xl cursor-pointer hover:from-blue-100 hover:to-cyan-100 transition-all"
                    onClick={() => toast(tip, { icon: '💡' })}
                  >
                    <div className="p-0.5 sm:p-1 bg-blue-100 rounded">
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700 text-xs sm:text-sm break-words">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Summary */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl shadow-2xl">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">📊 Weekly Summary</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between p-2 sm:p-3 bg-white/10 rounded-lg sm:rounded-xl">
                  <span className="text-xs sm:text-sm text-gray-200">Activities This Week</span>
                  <span className="font-bold text-green-400 text-sm sm:text-base">{stats.activitiesCount}</span>
                </div>
                <div className="flex items-center justify-between p-2 sm:p-3 bg-white/10 rounded-lg sm:rounded-xl">
                  <span className="text-xs sm:text-sm text-gray-200">Total Workout Time</span>
                  <span className="font-bold text-yellow-400 text-sm sm:text-base">{Math.floor(stats.totalDuration / 60)}h {stats.totalDuration % 60}m</span>
                </div>
                <div className="flex items-center justify-between p-2 sm:p-3 bg-white/10 rounded-lg sm:rounded-xl">
                  <span className="text-xs sm:text-sm text-gray-200">Calories Burned</span>
                  <span className="font-bold text-pink-400 text-sm sm:text-base">{totalCalories.toLocaleString()} kcal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Actions */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 p-2 sm:p-3 shadow-2xl">
          <div className="flex justify-around items-center max-w-md mx-auto">
            <button 
              onClick={() => {
                const formElement = document.querySelector('form');
                formElement?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col items-center p-2 sm:p-3 rounded-xl text-gray-600 hover:text-blue-600"
            >
              <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-[10px] sm:text-xs mt-1 font-medium">Add</span>
            </button>
            <button 
              onClick={() => setActiveTab(prev => prev === 'all' ? 'cardio' : 'all')}
              className="flex flex-col items-center p-2 sm:p-3 rounded-xl text-gray-600 hover:text-green-600"
            >
              <Activity className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-[10px] sm:text-xs mt-1 font-medium">Filter</span>
            </button>
            <button 
              onClick={fetchFitness}
              className="flex flex-col items-center p-2 sm:p-3 rounded-xl text-gray-600 hover:text-purple-600"
            >
              <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-[10px] sm:text-xs mt-1 font-medium">Refresh</span>
            </button>
            <button 
              onClick={() => {
                toast('🏆 You\'re doing great! Keep pushing!', {
                  icon: '💪',
                  style: {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                  }
                });
              }}
              className="flex flex-col items-center p-2 sm:p-3 rounded-xl text-gray-600 hover:text-red-600"
            >
              <Trophy className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-[10px] sm:text-xs mt-1 font-medium">Motivate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {recordToDelete && (
        <DeleteConfirmDialog
          record={recordToDelete}
          onConfirm={() => handleDeleteRecord(recordToDelete._id)}
          onCancel={() => setRecordToDelete(null)}
        />
      )}

      <style>{`
        @keyframes slide-in {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-out {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-20px); opacity: 0; }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-slide-out {
          animation: slide-out 0.3s ease-in;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          button, input, select, textarea {
            font-size: 16px !important;
          }
          
          /* Ensure text contrast on all elements */
          .text-gray-800, .text-gray-700, .text-gray-600, .text-gray-500 {
            color: #1f2937 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FitnessForm;