import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import SleepForm from '../../components/forms/SleepForm';
import Education from './Education';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import { 
  Moon, Star, Clock, Calendar, TrendingUp, 
  Activity, Heart, Brain, Sparkles, 
  RefreshCw, Trash2, Edit2, X, CheckCircle, AlertCircle, AlertTriangle
} from 'lucide-react';

const SleepRecovery = () => {
  const { state, dispatch } = useApp();
  const [sleepRecords, setSleepRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [activeTab, setActiveTab] = useState('tracker');
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [stats, setStats] = useState({
    avgDuration: 0,
    avgQuality: 0,
    consistency: 0,
    totalRecords: 0
  });

  const sleepTips = [
    '🌙 Maintain consistent sleep schedule',
    '📱 Avoid screens 1 hour before bed',
    '☕ No caffeine after 2 PM',
    '🏋️ Regular exercise improves sleep quality',
    '🛏️ Keep bedroom cool (65-68°F / 18-20°C)',
    '🧘 Try 4-7-8 breathing technique',
    '📖 Read a book instead of scrolling phone',
    '🌿 Use white noise or nature sounds'
  ];

  const calculateStats = (records) => {
    if (records.length === 0) return { avgDuration: 0, avgQuality: 0, consistency: 0, totalRecords: 0 };
    
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
      totalRecords: records.length
    };
  };

  const fetchHistory = async () => {
    const loadingToast = toast.loading(
      <div className="flex items-center gap-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span className="font-medium">Loading sleep data...</span>
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
      const data = await apiService.getSleepHistory();
      
      if (Array.isArray(data)) {
        setSleepRecords(data);
        setStats(calculateStats(data));
        toast.dismiss(loadingToast);
        toast.custom(
          (t) => (
            <div className={`bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl shadow-2xl transform transition-all ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}`}>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6" />
                <div>
                  <div className="font-bold">Sleep Data Loaded!</div>
                  <div className="text-sm opacity-90">{data.length} records found</div>
                </div>
              </div>
            </div>
          ),
          { duration: 2000, position: 'top-right' }
        );
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to load sleep data', { duration: 4000 });
      console.error('Error fetching sleep history:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDeleteRecord = async (recordId) => {
    if (!recordId) return;
    
    setIsDeleting(true);
    const deleteToast = toast.loading(
      <div className="flex items-center gap-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span className="font-medium">Deleting sleep record...</span>
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
      const result = await apiService.deleteSleepRecord(recordId);
      
      if (result && result.success) {
        const updatedRecords = sleepRecords.filter((rec) => rec._id !== recordId);
        setSleepRecords(updatedRecords);
        setStats(calculateStats(updatedRecords));
        
        toast.dismiss(deleteToast);
        toast.custom(
          (t) => (
            <div className={`bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl shadow-2xl transform transition-all ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}`}>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6" />
                <div>
                  <div className="font-bold">Record Deleted</div>
                  <div className="text-sm opacity-90">Sleep record removed successfully</div>
                </div>
              </div>
            </div>
          ),
          { duration: 3000, position: 'top-right' }
        );
      } else {
        throw new Error(result?.message || 'Failed to delete record');
      }
    } catch (error) {
      toast.dismiss(deleteToast);
      toast.error('Failed to delete record', { duration: 4000 });
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
      setRecordToDelete(null);
    }
  };

  const handleEditClick = (record) => {
    setEditingRecord(record);
    setActiveTab('tracker');
    toast.success('Editing sleep record', { 
      icon: '✏️', 
      duration: 2000,
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        borderRadius: '12px',
      }
    });
  };

  const handleSaved = () => {
    fetchHistory();
    setEditingRecord(null);
    toast.success('Sleep record updated!', { 
      icon: '✅', 
      duration: 2000,
      style: {
        background: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
        color: '#fff',
        borderRadius: '12px',
      }
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getQualityColor = (quality) => {
    if (quality >= 8) return 'text-green-600';
    if (quality >= 6) return 'text-blue-600';
    if (quality >= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Delete Confirmation Modal (same pattern as MenHealth)
  const DeleteConfirmDialog = ({ record, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Delete Sleep Record</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete this sleep record from {record ? formatDate(record.createdAt) : 'this date'}?
          This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  <Moon className="h-8 w-8 sm:h-10 sm:w-10" />
                  Sleep Recovery
                </h1>
                <p className="text-indigo-100 text-sm sm:text-base">
                  Track your sleep patterns, analyze quality, and improve your rest
                </p>
              </div>
              <button
                onClick={fetchHistory}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all flex items-center gap-2 text-sm"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Data
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-500 text-sm">Total Records</div>
              <Calendar className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.totalRecords}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-500 text-sm">Avg Duration</div>
              <Clock className="h-5 w-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.avgDuration}h</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-500 text-sm">Avg Quality</div>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.avgQuality}/10</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-500 text-sm">Consistency</div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.consistency}%</div>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden mb-6">
          <div className="flex bg-white rounded-xl p-1 shadow-md">
            {[
              { id: 'tracker', label: 'Tracker', icon: '😴' },
              { id: 'history', label: 'History', icon: '📊' },
              { id: 'insights', label: 'Insights', icon: '💡' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Sleep Form */}
          <div className={`lg:col-span-2 ${activeTab !== 'tracker' ? 'hidden lg:block' : ''}`}>
            <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6">
              {editingRecord && (
                <div className="mb-4 p-3 bg-yellow-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-yellow-700">
                    <Edit2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Editing sleep record</span>
                  </div>
                  <button
                    onClick={() => setEditingRecord(null)}
                    className="p-1 hover:bg-yellow-100 rounded-lg"
                  >
                    <X className="h-4 w-4 text-yellow-700" />
                  </button>
                </div>
              )}
              <SleepForm editingRecord={editingRecord} onSaved={handleSaved} />
            </div>
          </div>

          {/* Right Column - Tips & Insights */}
          <div className={`space-y-6 ${activeTab !== 'insights' ? 'hidden lg:block' : ''}`}>
            {/* Sleep Tips */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-xl">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Sleep Improvement Tips
              </h3>
              <div className="space-y-2">
                {sleepTips.slice(0, 6).map((tip, idx) => (
                  <div key={idx} className="bg-white/10 rounded-lg p-3 text-sm">
                    {tip}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-white rounded-2xl p-5 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                Sleep Benefits
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-800">Heart Health</div>
                    <div className="text-sm text-gray-600">Quality sleep reduces cardiovascular risk</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-800">Immune System</div>
                    <div className="text-sm text-gray-600">Sleep strengthens immune response</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Brain className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-800">Memory Consolidation</div>
                    <div className="text-sm text-gray-600">Sleep helps process and store memories</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* History Section - Full Width on Mobile */}
          <div className={`lg:col-span-3 ${activeTab !== 'history' ? 'hidden lg:block' : ''}`}>
            <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Sleep History</h2>
                {sleepRecords.length > 0 && (
                  <span className="text-sm text-gray-500">{sleepRecords.length} records</span>
                )}
              </div>

              {sleepRecords.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">😴</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No Sleep Records Yet</h3>
                  <p className="text-gray-500">Start tracking your sleep to see your history here!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sleepRecords.slice(0, 10).map((record) => {
                    const start = new Date(`2000-01-01T${record.sleepStart}`);
                    const end = new Date(`2000-01-01T${record.sleepEnd}`);
                    let duration = (end - start) / (1000 * 60 * 60);
                    if (duration < 0) duration += 24;
                    duration = duration.toFixed(1);

                    return (
                      <div key={record._id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">🌙</span>
                              <div>
                                <div className="font-semibold text-gray-800">
                                  {record.sleepStart} - {record.sleepEnd}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {formatDate(record.createdAt)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-gray-400" />
                                {duration}h
                              </span>
                              <span className={`flex items-center gap-1 font-medium ${getQualityColor(record.sleepQuality)}`}>
                                <Star className="h-4 w-4" />
                                {record.sleepQuality}/10
                              </span>
                            </div>
                            {record.aiTip && (
                              <div className="mt-2 p-2 bg-blue-50 rounded-lg text-sm text-blue-700">
                                💡 {record.aiTip}
                              </div>
                            )}
                            {record.notes && (
                              <div className="mt-2 text-sm text-gray-600">
                                📝 {record.notes}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditClick(record)}
                              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all text-sm font-medium"
                            >
                              <Edit2 className="h-4 w-4 inline mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => setRecordToDelete(record)}
                              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all text-sm font-medium"
                            >
                              <Trash2 className="h-4 w-4 inline mr-1" />
                              Delete
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
        </div>

        {/* Education Section */}
        <div className="mt-8">
          <Education />
        </div>
      </div>

      {/* Delete Confirmation Modal - Same pattern as MenHealth */}
      {recordToDelete && (
        <DeleteConfirmDialog
          record={recordToDelete}
          onConfirm={() => handleDeleteRecord(recordToDelete._id)}
          onCancel={() => setRecordToDelete(null)}
        />
      )}

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-out {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .animate-slide-out {
          animation: slide-out 0.3s ease-in;
        }
      `}</style>
    </div>
  );
};

export default SleepRecovery;