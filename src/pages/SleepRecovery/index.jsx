import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import SleepForm from '../../components/forms/SleepForm';
import Education from './Education';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';

// Animated moon component
const AnimatedMoon = ({ size = 40 }) => (
  <div className="relative" style={{ width: size, height: size }}>
    <div className="absolute inset-0 bg-yellow-200 rounded-full animate-pulse"></div>
    <div className="absolute inset-2 bg-indigo-700 rounded-full animate-ping opacity-20"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-lg">🌙</span>
    </div>
  </div>
);

// Star rating component
const StarRating = ({ rating, max = 10 }) => {
  const stars = Math.round((rating / max) * 5);
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-xl ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`}
          style={{ animationDelay: `${i * 100}ms` }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const SleepRecovery = () => {
  const { state, dispatch } = useApp();
  const [sleepRecords, setSleepRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [activeTab, setActiveTab] = useState('history');
  const [stats, setStats] = useState({
    avgDuration: 0,
    avgQuality: 0,
    consistency: 0,
  });

  const sleepTips = [
    'Maintain consistent sleep schedule',
    'Create relaxing bedtime routine',
    'Keep bedroom cool and dark',
    'Avoid caffeine and heavy meals before bed',
    'Limit screen time 1 hour before sleep',
    'Try 4-7-8 breathing technique',
    'Invest in quality mattress & pillows',
    'Use white noise or nature sounds',
  ];

  const sleepBenefits = [
    { benefit: 'Memory Consolidation', description: 'Sleep helps solidify memories and learning', icon: '🧠' },
    { benefit: 'Muscle Repair', description: 'Growth hormone released during deep sleep', icon: '💪' },
    { benefit: 'Immune Function', description: 'Adequate sleep strengthens immune system', icon: '🛡️' },
    { benefit: 'Mood Regulation', description: 'Sleep affects emotional stability and mental health', icon: '😊' },
    { benefit: 'Metabolism Boost', description: 'Regulates hormones that control appetite', icon: '⚡' },
    { benefit: 'Detoxification', description: 'Brain clears toxins during sleep', icon: '🧹' },
  ];

  const calculateStats = (records) => {
    if (records.length === 0) return { avgDuration: 0, avgQuality: 0, consistency: 0 };
    
    const totalDuration = records.reduce((sum, record) => {
      const start = new Date(`2000-01-01T${record.sleepStart}`);
      const end = new Date(`2000-01-01T${record.sleepEnd}`);
      let duration = (end - start) / (1000 * 60 * 60);
      if (duration < 0) duration += 24;
      return sum + duration;
    }, 0);

    const totalQuality = records.reduce((sum, record) => sum + record.sleepQuality, 0);
    const consistency = Math.min(100, (records.length / 30) * 100);

    return {
      avgDuration: (totalDuration / records.length).toFixed(1),
      avgQuality: (totalQuality / records.length).toFixed(1),
      consistency: consistency.toFixed(0),
    };
  };

  const fetchHistory = async () => {
    const loadingToast = toast.loading(
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span className="font-medium">Loading your sleep data...</span>
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
      dispatch({ type: 'SET_LOADING', payload: true });
      const result = await apiService.getSleepHistory();
      if (result.success) {
        setSleepRecords(result.data);
        setStats(calculateStats(result.data));
        toast.dismiss(loadingToast);
        toast.success(
          <div className="space-y-1">
            <div className="font-bold">📊 Sleep Data Loaded!</div>
            <div className="text-sm opacity-90">{result.data.length} records found</div>
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
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(
        <div className="space-y-1">
          <div className="font-bold">⚠️ Failed to Load Data</div>
          <div className="text-sm">{error.message}</div>
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
      console.error('Error fetching sleep history:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (recordId) => {
    const deletePromise = new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const result = await apiService.deleteSleepRecord(recordId);
        if (result.success) {
          setSleepRecords((prev) => prev.filter((rec) => rec._id !== recordId));
          setStats(calculateStats(sleepRecords.filter((rec) => rec._id !== recordId)));
          resolve('Sleep record deleted successfully!');
        } else {
          reject('Failed to delete record');
        }
      } catch (error) {
        reject(error.message);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    });

    toast.promise(
      deletePromise,
      {
        loading: 'Deleting sleep record...',
        success: (message) => (
          <div className="flex items-center space-x-3">
            <div className="text-green-500 text-2xl">✅</div>
            <div>
              <div className="font-bold">Record Deleted</div>
              <div className="text-sm opacity-90">Sleep record removed successfully</div>
            </div>
          </div>
        ),
        error: (error) => `Failed to delete: ${error}`,
      },
      {
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          borderRadius: '12px',
        },
        success: {
          style: {
            background: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
          },
          duration: 3000,
        },
        error: {
          style: {
            background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
          },
          duration: 4000,
        },
      }
    );
  };

  const handleSaved = () => {
    toast.success(
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">💤</span>
          <div className="font-bold text-lg">Sleep Record Saved!</div>
        </div>
        <div className="text-sm opacity-90">Your sleep data has been updated successfully</div>
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
    fetchHistory();
    setEditingRecord(null);
  };

  const handleEditClick = (record) => {
    setEditingRecord(record);
    toast('✏️ Editing Sleep Record - Make your changes and save', {
      icon: '📝',
      duration: 2000,
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        borderRadius: '12px',
      }
    });
  };

  // Mobile Stats Cards
  const StatCard = ({ icon, label, value, unit, color }) => (
    <div className={`bg-gradient-to-br ${color} p-4 rounded-2xl shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-white/90 text-sm">{label}</div>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
      {unit && <div className="text-white/70 text-xs mt-2">{unit}</div>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-4 md:py-8">
      {/* Toaster Component */}
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

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Animated Header */}
        <div className="relative mb-8 md:mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 md:p-8 shadow-2xl">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 flex items-center space-x-3">
                  <AnimatedMoon size={60} />
                  <span>Sleep Recovery</span>
                </h1>
                <p className="text-lg text-indigo-100 max-w-2xl">
                  Track your sleep patterns, view history, and learn how to improve sleep quality for better health.
                </p>
              </div>
              <button
                onClick={() => {
                  toast('🌙 Good night! Sweet dreams await...', {
                    icon: '✨',
                    style: {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: '#fff',
                    }
                  });
                }}
                className="mt-4 md:mt-0 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-colors border border-white/30"
              >
                🌜 Bedtime Mode
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 md:hidden">
          <StatCard 
            icon="⏰" 
            label="Avg Duration" 
            value={stats.avgDuration} 
            unit="hours" 
            color="from-blue-500 to-cyan-500"
          />
          <StatCard 
            icon="⭐" 
            label="Avg Quality" 
            value={stats.avgQuality} 
            unit="/10" 
            color="from-purple-500 to-pink-500"
          />
          <StatCard 
            icon="📊" 
            label="Consistency" 
            value={`${stats.consistency}%`} 
            color="from-green-500 to-emerald-500"
          />
        </div>

        {/* Mobile Tabs */}
        <div className="md:hidden mb-6">
          <div className="flex space-x-2 bg-white/80 backdrop-blur-sm rounded-xl p-1">
            {['tracker', 'history', 'insights'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 md:gap-8">
          {/* Left Column */}
          <div className="space-y-6 md:space-y-8">
            {/* Sleep Form */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-5 md:p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Sleep Tracker</h2>
                {editingRecord && (
                  <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    ✏️ Editing
                  </span>
                )}
              </div>
              <SleepForm editingRecord={editingRecord} onSaved={handleSaved} />
            </div>

            {/* Sleep History */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-5 md:p-8 border border-white/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Sleep History</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={fetchHistory}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:opacity-90 transition-opacity"
                  >
                    🔄 Refresh
                  </button>
                  {sleepRecords.length > 0 && (
                    <div className="text-sm text-gray-600">
                      {sleepRecords.length} records
                    </div>
                  )}
                </div>
              </div>

              {sleepRecords.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">😴</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Sleep Records Yet</h3>
                  <p className="text-gray-500">Start tracking your sleep to see your history here!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <div className="min-w-[600px]">
                    {/* Desktop Table */}
                    <table className="hidden md:table w-full divide-y divide-gray-200">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Duration</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quality</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">AI Tip</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {sleepRecords.slice(0, 10).map((record) => {
                          const start = new Date(`2000-01-01T${record.sleepStart}`);
                          const end = new Date(`2000-01-01T${record.sleepEnd}`);
                          let duration = (end - start) / (1000 * 60 * 60);
                          if (duration < 0) duration += 24;
                          duration = duration.toFixed(1);

                          return (
                            <tr key={record._id} className="hover:bg-blue-50/50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="font-medium text-gray-900">{record.date}</div>
                                <div className="text-sm text-gray-500">
                                  {record.sleepStart} - {record.sleepEnd}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <div className="w-24 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full"
                                      style={{ width: `${Math.min(100, (duration / 10) * 100)}%` }}
                                    ></div>
                                  </div>
                                  <span className="font-semibold">{duration}h</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <StarRating rating={record.sleepQuality} />
                                <div className="text-sm text-gray-500 mt-1">{record.sleepQuality}/10</div>
                              </td>
                              <td className="px-6 py-4 max-w-xs">
                                <div className="text-sm text-green-700 bg-green-50/50 p-3 rounded-lg">
                                  {record.aiTip || 'No AI tip available'}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleEditClick(record)}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:opacity-90 transition-all transform hover:scale-105"
                                  >
                                    ✏️ Edit
                                  </button>
                                  <button
                                    onClick={() => handleDelete(record._id)}
                                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-all transform hover:scale-105"
                                  >
                                    🗑️ Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                      {sleepRecords.slice(0, 5).map((record) => {
                        const start = new Date(`2000-01-01T${record.sleepStart}`);
                        const end = new Date(`2000-01-01T${record.sleepEnd}`);
                        let duration = (end - start) / (1000 * 60 * 60);
                        if (duration < 0) duration += 24;
                        duration = duration.toFixed(1);

                        return (
                          <div key={record._id} className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-4 shadow-lg border border-blue-100">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <div className="font-bold text-gray-800">{record.date}</div>
                                <div className="text-sm text-gray-600">{record.sleepStart} - {record.sleepEnd}</div>
                              </div>
                              <div className="text-lg font-bold text-blue-600">{duration}h</div>
                            </div>
                            
                            <div className="mb-3">
                              <StarRating rating={record.sleepQuality} />
                            </div>

                            {record.aiTip && (
                              <div className="mb-4">
                                <div className="text-xs font-semibold text-green-700 mb-1">AI Tip</div>
                                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                                  {record.aiTip}
                                </div>
                              </div>
                            )}

                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditClick(record)}
                                className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(record._id)}
                                className="flex-1 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg text-sm font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Scrollable Sidebar */}
          <div className="space-y-6">
            {/* Stats Card - Desktop */}
            <div className="hidden md:block bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Sleep Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <span className="text-blue-600">⏰</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">Avg Duration</div>
                      <div className="text-2xl font-bold text-blue-600">{stats.avgDuration}h</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Goal: 8h</div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <span className="text-purple-600">⭐</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">Avg Quality</div>
                      <div className="text-2xl font-bold text-purple-600">{stats.avgQuality}/10</div>
                    </div>
                  </div>
                  <StarRating rating={stats.avgQuality} />
                </div>
              </div>
            </div>

            {/* Sleep Tips */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-2xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <span>💡</span>
                <span>Sleep Improvement Tips</span>
              </h3>
              <div className="space-y-3">
                {sleepTips.map((tip, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors cursor-pointer"
                    onClick={() => toast(tip, { icon: '💡' })}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-yellow-300 text-lg">•</span>
                      <span className="text-white/90">{tip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sleep Benefits */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Sleep Matters</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sleepBenefits.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border-2 border-blue-200 hover:border-purple-300 transition-all transform hover:scale-[1.02] cursor-pointer"
                    onClick={() => toast(
                      <div>
                        <div className="font-bold">{item.benefit}</div>
                        <div>{item.description}</div>
                      </div>,
                      { icon: item.icon }
                    )}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="text-2xl">{item.icon}</div>
                      <h4 className="font-semibold text-blue-800">{item.benefit}</h4>
                    </div>
                    <p className="text-blue-700 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Component */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-2xl p-6 border border-green-200">
              <Education />
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 p-3 shadow-2xl">
          <div className="flex justify-around items-center max-w-md mx-auto">
            <button 
              onClick={() => setActiveTab('tracker')}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                activeTab === 'tracker' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'text-gray-600'
              }`}
            >
              <span className="text-2xl">📝</span>
              <span className="text-xs mt-1 font-medium">Track</span>
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                activeTab === 'history' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'text-gray-600'
              }`}
            >
              <span className="text-2xl">📊</span>
              <span className="text-xs mt-1 font-medium">History</span>
            </button>
            <button 
              onClick={() => {
                toast('🌙 Entering sleep mode...', {
                  icon: '😴',
                  style: {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                  }
                });
              }}
              className="flex flex-col items-center p-3 rounded-xl text-gray-600"
            >
              <span className="text-2xl">🌙</span>
              <span className="text-xs mt-1 font-medium">Sleep</span>
            </button>
            <button 
              onClick={fetchHistory}
              className="flex flex-col items-center p-3 rounded-xl text-gray-600"
            >
              <span className="text-2xl">🔄</span>
              <span className="text-xs mt-1 font-medium">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Inline styles for animations */}
      <style>{`
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
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
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #667eea, #764ba2);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default SleepRecovery;