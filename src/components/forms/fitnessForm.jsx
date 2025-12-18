import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { apiService } from '../../services/api';
import { 
  TrendingUp, 
  Flame, 
  Timer, 
  Calendar, 
  Activity, 
  Edit2, 
  Trash2, 
  Plus, 
  RefreshCw,
  Trophy,
  Target,
  Zap,
  TrendingDown,
  ChevronRight
} from 'lucide-react';

const FitnessForm = () => {
  const [fitnessData, setFitnessData] = useState([]);
  const [form, setForm] = useState({
    activity: '',
    duration: '',
    caloriesBurned: '',
    date: new Date().toISOString().split('T')[0],
    intensity: 'medium',
    notes: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalCalories: 0,
    totalDuration: 0,
    activitiesCount: 0,
    avgCalories: 0
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
    { value: 'extreme', label: 'Extreme', color: 'bg-red-100 text-red-800', icon: '🔥' },
  ];

  const calculateStats = (data) => {
    const totalCalories = data.reduce((sum, item) => sum + (parseInt(item.caloriesBurned) || 0), 0);
    const totalDuration = data.reduce((sum, item) => sum + (parseInt(item.duration) || 0), 0);
    const activitiesCount = data.length;
    const avgCalories = activitiesCount > 0 ? Math.round(totalCalories / activitiesCount) : 0;

    setStats({
      totalCalories,
      totalDuration,
      activitiesCount,
      avgCalories
    });
  };

  const fetchFitness = async () => {
    const loadingToast = toast.loading(
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span className="font-medium">Loading fitness data...</span>
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
      const data = await apiService.getAllFitness();
      setFitnessData(data);
      calculateStats(data);
      
      toast.dismiss(loadingToast);
      toast.success(
        <div className="space-y-1">
          <div className="font-bold">🏋️‍♂️ Fitness Data Loaded!</div>
          <div className="text-sm opacity-90">{data.length} activities found</div>
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
    } catch {
      toast.dismiss(loadingToast);
      toast.error(
        <div className="space-y-1">
          <div className="font-bold">⚠️ Failed to Load Data</div>
          <div className="text-sm">Unable to fetch fitness records</div>
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
    
    const submitToast = toast.loading(
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span className="font-medium">
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
        await apiService.updateFitness(editingId, form);
        toast.dismiss(submitToast);
        toast.success(
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">✏️</div>
              <div>
                <div className="font-bold text-lg">Activity Updated!</div>
                <div className="text-sm opacity-90">{form.activity} has been updated</div>
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
        await apiService.createFitness(form);
        toast.dismiss(submitToast);
        toast.success(
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🎉</div>
              <div>
                <div className="font-bold text-lg">Activity Added!</div>
                <div className="text-sm opacity-90">{form.activity} has been recorded</div>
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
        activity: '',
        duration: '',
        caloriesBurned: '',
        date: new Date().toISOString().split('T')[0],
        intensity: 'medium',
        notes: ''
      });
      setEditingId(null);
      fetchFitness();
    } catch {
      toast.dismiss(submitToast);
      toast.error(
        <div className="space-y-1">
          <div className="font-bold">❌ Operation Failed</div>
          <div className="text-sm">Unable to save activity. Please try again.</div>
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

  const handleDelete = async (id, activityName) => {
    toast.custom((t) => (
      <div className={`bg-white rounded-xl shadow-2xl p-4 max-w-sm ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}`}>
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <span className="text-red-600 text-xl">⚠️</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">Delete Activity?</h3>
            <p className="text-gray-600 text-sm mt-1">"{activityName}" will be permanently deleted</p>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  confirmDelete(id);
                }}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const confirmDelete = async (id) => {
    const deleteToast = toast.loading('Deleting activity...', {
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        borderRadius: '12px',
      }
    });

    try {
      await apiService.deleteFitness(id);
      toast.dismiss(deleteToast);
      toast.success(
        <div className="flex items-center space-x-3">
          <div className="text-green-500 text-2xl">✅</div>
          <div>
            <div className="font-bold">Activity Deleted</div>
            <div className="text-sm opacity-90">Removed from your fitness log</div>
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
    } catch {
      toast.dismiss(deleteToast);
      toast.error('Failed to delete activity. Please try again.', {
        style: {
          background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
          color: '#fff',
          borderRadius: '12px',
        }
      });
    }
  };

  const handleEdit = (item) => {
    setForm(item);
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

  const filteredData = activeTab === 'all' 
    ? fitnessData 
    : fitnessData.filter(item => {
        const activityLower = item.activity.toLowerCase();
        if (activeTab === 'cardio') return activityLower.includes('run') || activityLower.includes('jog') || activityLower.includes('cycle') || activityLower.includes('swim');
        if (activeTab === 'strength') return activityLower.includes('lift') || activityLower.includes('weight') || activityLower.includes('strength');
        if (activeTab === 'flexibility') return activityLower.includes('yoga') || activityLower.includes('stretch');
        if (activeTab === 'sports') return activityLower.includes('soccer') || activityLower.includes('basketball') || activityLower.includes('tennis');
        return true;
      });

  return (
    <div className="text-charcoal-grey min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      {/* React Hot Toast Container */}
      <Toaster
        position="top-center"
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
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <span>Fitness Tracker</span>
              </h1>
              <p className="text-gray-600">Track your workouts, monitor progress, and achieve your fitness goals</p>
            </div>
            <button
              onClick={fetchFitness}
              className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Refresh Data</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-5 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Calories</p>
                  <p className="text-2xl font-bold">{stats.totalCalories.toLocaleString()}</p>
                  <p className="text-xs opacity-80 mt-1">kcal burned</p>
                </div>
                <Flame className="h-10 w-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-5 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Duration</p>
                  <p className="text-2xl font-bold">{Math.floor(stats.totalDuration / 60)}h {stats.totalDuration % 60}m</p>
                  <p className="text-xs opacity-80 mt-1">active minutes</p>
                </div>
                <Timer className="h-10 w-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-5 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Activities</p>
                  <p className="text-2xl font-bold">{stats.activitiesCount}</p>
                  <p className="text-xs opacity-80 mt-1">workouts logged</p>
                </div>
                <Trophy className="h-10 w-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white p-5 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Avg Calories</p>
                  <p className="text-2xl font-bold">{stats.avgCalories}</p>
                  <p className="text-xs opacity-80 mt-1">per workout</p>
                </div>
                <TrendingUp className="h-10 w-10 opacity-80" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Form & Categories */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Activity Form */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingId ? '✏️ Edit Activity' : '➕ Add New Activity'}
                </h2>
                {editingId && (
                  <button
                    onClick={() => {
                      setForm({
                        activity: '',
                        duration: '',
                        caloriesBurned: '',
                        date: new Date().toISOString().split('T')[0],
                        intensity: 'medium',
                        notes: ''
                      });
                      setEditingId(null);
                      toast('Editing cancelled. Ready for new activity!', { icon: '🔄' });
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Activity Name</label>
                    <input
                      type="text"
                      placeholder="e.g., Morning Run, Yoga Session, Weight Training"
                      value={form.activity}
                      onChange={(e) => setForm({ ...form, activity: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Intensity Level</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {intensityLevels.map((level) => (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() => setForm({ ...form, intensity: level.value })}
                          className={`p-3 rounded-lg text-center transition-all ${
                            form.intensity === level.value 
                              ? 'ring-2 ring-offset-2 ring-blue-400 transform scale-105' 
                              : 'hover:bg-gray-100'
                          } ${level.color}`}
                        >
                          <div className="text-lg">{level.icon}</div>
                          <div className="text-xs font-medium mt-1">{level.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Timer className="inline h-4 w-4 mr-2" />
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 45"
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      required
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Flame className="inline h-4 w-4 mr-2" />
                      Calories Burned
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 350"
                      value={form.caloriesBurned}
                      onChange={(e) => setForm({ ...form, caloriesBurned: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      required
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline h-4 w-4 mr-2" />
                      Date
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    placeholder="How did you feel? Any achievements or challenges?"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none"
                    rows={3}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="relative z-10 flex items-center justify-center space-x-3">
                    {editingId ? (
                      <>
                        <Edit2 className="h-5 w-5" />
                        <span>Update Activity</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-5 w-5" />
                        <span>Log Activity</span>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>

            {/* Activity Categories Tabs */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Activity Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {activityCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`p-4 rounded-xl transition-all transform hover:scale-105 ${
                      activeTab === category.id
                        ? `bg-gradient-to-br ${category.color} text-white shadow-lg`
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="text-sm font-medium">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Activity History */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Activity History</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {filteredData.length} activities
                  </span>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  <p className="mt-4 text-gray-600">Loading your fitness data...</p>
                </div>
              ) : filteredData.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏃‍♂️</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Activities Yet</h3>
                  <p className="text-gray-500">Start by logging your first workout above!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredData.map((item) => {
                    const intensity = intensityLevels.find(l => l.value === (item.intensity || 'medium'));
                    return (
                      <div
                        key={item._id}
                        className="group bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-cyan-50 rounded-2xl p-5 shadow-lg border border-gray-200 hover:border-blue-300 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl">
                              <span className="text-2xl">{getActivityIcon(item.activity)}</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800 text-lg">{item.activity}</h4>
                              <div className="flex flex-wrap items-center gap-3 mt-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${intensity?.color || 'bg-gray-100 text-gray-800'}`}>
                                  {intensity?.icon} {intensity?.label}
                                </span>
                                <span className="text-gray-600 flex items-center">
                                  <Timer className="h-3 w-3 mr-1" />
                                  {item.duration} min
                                </span>
                                <span className="text-gray-600 flex items-center">
                                  <Flame className="h-3 w-3 mr-1" />
                                  {item.caloriesBurned} kcal
                                </span>
                                <span className="text-gray-600 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {item.date}
                                </span>
                              </div>
                              {item.notes && (
                                <p className="text-gray-600 text-sm mt-3">{item.notes}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item._id, item.activity)}
                              className="p-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
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

          {/* Right Column - Quick Stats & Tips */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-3xl shadow-2xl">
              <h3 className="text-xl font-bold mb-4">🔥 Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                  <span>Calories Today</span>
                  <span className="font-bold text-green-400">450 kcal</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                  <span>Weekly Goal</span>
                  <span className="font-bold text-yellow-400">75%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                  <span>Current Streak</span>
                  <span className="font-bold text-pink-400">7 days</span>
                </div>
              </div>
            </div>

            {/* Fitness Tips */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">💪 Fitness Tips</h3>
              <div className="space-y-4">
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
                    className="flex items-start space-x-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl cursor-pointer hover:from-blue-100 hover:to-cyan-100 transition-all"
                    onClick={() => toast(tip, { icon: '💡' })}
                  >
                    <div className="p-1 bg-blue-100 rounded">
                      <ChevronRight className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700 text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-3xl shadow-2xl">
              <h3 className="text-xl font-bold mb-4">🏆 Recent Achievements</h3>
              <div className="space-y-3">
                {[
                  { icon: '🔥', text: '7-day workout streak', date: 'Today' },
                  { icon: '⚡', text: 'Personal best: 500 kcal', date: 'Yesterday' },
                  { icon: '💪', text: 'Completed 30 workouts', date: 'This month' },
                ].map((achievement, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{achievement.icon}</span>
                      <div>
                        <div className="font-medium">{achievement.text}</div>
                        <div className="text-xs opacity-80">{achievement.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Actions */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 p-3 shadow-2xl">
          <div className="flex justify-around items-center max-w-md mx-auto">
            <button 
              onClick={() => {
                const formElement = document.querySelector('form');
                formElement?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col items-center p-3 rounded-xl text-gray-600 hover:text-blue-600"
            >
              <Plus className="h-6 w-6" />
              <span className="text-xs mt-1 font-medium">Add</span>
            </button>
            <button 
              onClick={() => setActiveTab(prev => prev === 'all' ? 'cardio' : 'all')}
              className="flex flex-col items-center p-3 rounded-xl text-gray-600 hover:text-green-600"
            >
              <Activity className="h-6 w-6" />
              <span className="text-xs mt-1 font-medium">Filter</span>
            </button>
            <button 
              onClick={fetchFitness}
              className="flex flex-col items-center p-3 rounded-xl text-gray-600 hover:text-purple-600"
            >
              <RefreshCw className="h-6 w-6" />
              <span className="text-xs mt-1 font-medium">Refresh</span>
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
              className="flex flex-col items-center p-3 rounded-xl text-gray-600 hover:text-red-600"
            >
              <Trophy className="h-6 w-6" />
              <span className="text-xs mt-1 font-medium">Motivate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
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
        
        /* Smooth scrolling for mobile */
        @media (max-width: 768px) {
          .overflow-y-auto {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
};

export default FitnessForm;