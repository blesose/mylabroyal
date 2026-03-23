import React, { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import { 
  Shield, 
  History, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Heart,
  Moon,
  Dumbbell,
  Calendar,
  Eye,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Trash2,
  AlertTriangle
} from 'lucide-react';

// Custom toast styles
const toastStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: '#fff',
  fontWeight: '600',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
};

const MenHealth = () => {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    stressLevel: 5,
    sleepHours: 7,
    workoutDays: 3,
    age: '',
    prostateCheck: false,
    testosteroneLevel: '',
    sexualHealthConcerns: '',
    energyLevel: 5,
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [lastAITip, setLastAITip] = useState('');
  const [healthHistory, setHealthHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [stats, setStats] = useState({
    averageStress: 0,
    averageEnergy: 0,
    averageSleep: 0,
    averageWorkouts: 0,
    totalRecords: 0,
    trend: 'stable'
  });

  // Fetch health history - wrapped in useCallback to prevent duplicate calls
  const fetchHealthHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      console.log('📡 Fetching men\'s health history...');
      const response = await apiService.listRecordsHandler();
      console.log('✅ History response:', response);
      
      // Handle different response structures
      let records = [];
      if (response.success && response.records) {
        records = response.records;
      } else if (response.success && response.data) {
        records = response.data;
      } else if (Array.isArray(response)) {
        records = response;
      } else if (response.data && Array.isArray(response.data)) {
        records = response.data;
      }
      
      console.log(`📊 Found ${records.length} records`);
      setHealthHistory(records);
      
      // Calculate statistics from real data
      if (records.length > 0) {
        const totalStress = records.reduce((sum, r) => sum + (r.stressLevel || 5), 0);
        const totalEnergy = records.reduce((sum, r) => sum + (r.energyLevel || 5), 0);
        const totalSleep = records.reduce((sum, r) => sum + (r.sleepHours || 7), 0);
        const totalWorkouts = records.reduce((sum, r) => sum + (r.workoutDays || 3), 0);
        
        const avgStress = totalStress / records.length;
        const avgEnergy = totalEnergy / records.length;
        const avgSleep = totalSleep / records.length;
        const avgWorkouts = totalWorkouts / records.length;
        
        // Calculate trend based on recent vs older records
        let trend = 'stable';
        if (records.length >= 2) {
          const recent = records[0];
          const older = records[records.length - 1];
          const stressChange = (recent.stressLevel || 5) - (older.stressLevel || 5);
          const energyChange = (recent.energyLevel || 5) - (older.energyLevel || 5);
          
          if (stressChange < -1 && energyChange > 1) trend = 'improving';
          else if (stressChange > 1 && energyChange < -1) trend = 'declining';
        }
        
        setStats({
          averageStress: avgStress.toFixed(1),
          averageEnergy: avgEnergy.toFixed(1),
          averageSleep: avgSleep.toFixed(1),
          averageWorkouts: avgWorkouts.toFixed(1),
          totalRecords: records.length,
          trend
        });
      } else {
        // Reset stats when no records
        setStats({
          averageStress: 0,
          averageEnergy: 0,
          averageSleep: 0,
          averageWorkouts: 0,
          totalRecords: 0,
          trend: 'stable'
        });
      }
      
    } catch (error) {
      console.error('❌ Error fetching health history:', error);
      // Don't show error toast for timeout - just log it
      if (error.code !== 'ECONNABORTED') {
        toast.error('Failed to load health history', { duration: 3000 });
      }
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  // Fetch on mount - only once
  useEffect(() => {
    fetchHealthHistory();
  }, [fetchHealthHistory]);

  const handleDeleteRecord = async (recordId) => {
    if (!recordId) return;
    
    setIsDeleting(true);
    const deleteToast = toast.loading(
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span className="font-medium">Deleting health record...</span>
      </div>,
      { style: toastStyle, duration: Infinity }
    );
    
    try {
      const response = await apiService.deleteRecordHandler(recordId);
      console.log('Delete response:', response);
      
      if (response.success) {
        toast.dismiss(deleteToast);
        toast.custom((t) => (
          <div className={`bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl shadow-2xl ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}`}>
            <div className="flex items-center gap-3">
              <div className="text-2xl">🗑️</div>
              <div>
                <div className="font-bold text-white">Record Deleted</div>
                <div className="text-sm text-white/90">Health record has been removed successfully.</div>
              </div>
            </div>
          </div>
        ), { duration: 3000 });
        
        // Refresh the history
        await fetchHealthHistory();
        
        // Close any expanded record
        if (expandedRecord === recordId) {
          setExpandedRecord(null);
        }
      } else {
        toast.dismiss(deleteToast);
        toast.error('Failed to delete record', { duration: 3000 });
      }
    } catch (error) {
      toast.dismiss(deleteToast);
      console.error('Error deleting record:', error);
      toast.error('Failed to delete record. Please try again.', { duration: 4000 });
    } finally {
      setIsDeleting(false);
      setRecordToDelete(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitToast = toast.loading(
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span className="font-medium">Submitting your health data...</span>
      </div>,
      { style: toastStyle, duration: Infinity }
    );

    try {
      setIsSubmitting(true);
      dispatch({ type: 'SET_LOADING', payload: true });

      const menHealthData = {
        stressLevel: parseInt(formData.stressLevel) || 0,
        sleepHours: parseFloat(formData.sleepHours) || 0,
        workoutDays: parseInt(formData.workoutDays) || 0,
        energyLevel: parseInt(formData.energyLevel) || 0,
        age: formData.age ? parseInt(formData.age) : undefined,
        prostateCheck: formData.prostateCheck,
        testosteroneLevel: formData.testosteroneLevel ? parseFloat(formData.testosteroneLevel) : undefined,
        sexualHealthConcerns: formData.sexualHealthConcerns || '',
        notes: formData.notes || '',
        exerciseFrequency: formData.workoutDays >= 5 ? 'daily' : 
                         formData.workoutDays >= 3 ? 'weekly' : 
                         formData.workoutDays >= 1 ? 'rarely' : 'none'
      };

      console.log('Sending men health data:', menHealthData);

      const result = await apiService.createRecordHandler(menHealthData);
      console.log('API Response:', result);

      if (result.success) {
        toast.dismiss(submitToast);
        
        const aiTip = result.record?.aiTip || result.aiTip || result.data?.aiTip;
        
        if (aiTip) {
          setLastAITip(aiTip);
        }

        toast.custom((t) => (
          <div className={`bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 rounded-xl shadow-2xl ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}`}>
            <div className="space-y-3 max-w-md">
              <div className="font-bold text-lg text-white">🎉 Health Data Saved!</div>
              <div className="text-sm text-white/90">Your men's health record has been successfully created.</div>
              {aiTip && (
                <div className="mt-3 p-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
                  <div className="flex items-start gap-2">
                    <div className="text-lg mt-0.5">🤖</div>
                    <div className="flex-1">
                      <div className="font-semibold text-white mb-1">AI Health Tip:</div>
                      <div className="text-sm text-white/90">{aiTip}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ), { duration: 8000 });

        // Refresh history after successful submission
        await fetchHealthHistory();

        // Reset form
        setFormData({
          stressLevel: 5,
          sleepHours: 7,
          workoutDays: 3,
          age: '',
          prostateCheck: false,
          testosteroneLevel: '',
          sexualHealthConcerns: '',
          energyLevel: 5,
          notes: ''
        });
      }
    } catch (error) {
      toast.dismiss(submitToast);
      
      let errorMessage = 'Error creating health record';
      let errorDetails = 'Please check your connection and try again';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      console.error('Error creating men health record:', error);

      toast.error(
        <div className="space-y-2">
          <div className="font-bold text-lg">⚠️ Submission Failed</div>
          <div className="text-sm">{errorMessage}</div>
          <div className="text-xs opacity-75">{errorDetails}</div>
        </div>,
        { 
          style: {
            ...toastStyle,
            background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
          },
          duration: 6000 
        }
      );
    } finally {
      setIsSubmitting(false);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  const getStressColor = (level) => {
    if (level <= 3) return 'text-green-500';
    if (level <= 7) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getEnergyEmoji = (level) => {
    if (level >= 8) return '⚡';
    if (level >= 5) return '💪';
    if (level >= 3) return '😐';
    return '😴';
  };

  const viewLastAITip = () => {
    if (lastAITip) {
      toast.custom((t) => (
        <div className={`bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-xl shadow-2xl ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}`}>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="text-2xl">🤖</div>
              <div className="font-bold text-white">Last AI Health Tip</div>
            </div>
            <div className="text-sm text-white/90">{lastAITip}</div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="mt-2 text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      ), { duration: 6000 });
    } else {
      toast('Submit health data first to get AI tips!', {
        icon: '📝',
        duration: 3000,
      });
    }
  };

  const toggleExpandRecord = (id) => {
    setExpandedRecord(expandedRecord === id ? null : id);
  };

  const handleRefreshHistory = () => {
    fetchHealthHistory();
    toast('Refreshing health history...', { icon: '🔄', duration: 1500 });
  };

  // Delete confirmation dialog
  const DeleteConfirmDialog = ({ record, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Delete Record</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete this health record from {record ? formatDate(record.createdAt) : 'this date'}?
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
    <>
      <Toaster
        position="top-center"
        containerStyle={{
          top: 20,
          zIndex: 9999,
        }}
        toastOptions={{
          duration: 4000,
          style: toastStyle,
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 shadow-2xl animate-gradient-x">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 relative z-10">
              🦸‍♂️ Men's Health Tracker
            </h1>
            <p className="text-blue-100 text-lg relative z-10">
              Track. Improve. Thrive.
            </p>
          </div>

          {/* Stats Cards - Only show if there are records */}
          {stats.totalRecords > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-md text-center">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-2xl font-bold text-blue-600">{stats.totalRecords}</div>
                <div className="text-xs text-gray-500">Total Records</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md text-center">
                <div className="text-2xl mb-1">😰</div>
                <div className={`text-2xl font-bold ${getStressColor(stats.averageStress)}`}>{stats.averageStress}/10</div>
                <div className="text-xs text-gray-500">Avg Stress</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md text-center">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-2xl font-bold text-green-600">{stats.averageEnergy}/10</div>
                <div className="text-xs text-gray-500">Avg Energy</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md text-center">
                <div className="text-2xl mb-1">😴</div>
                <div className="text-2xl font-bold text-purple-600">{stats.averageSleep}h</div>
                <div className="text-xs text-gray-500">Avg Sleep</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md text-center">
                <div className="text-2xl mb-1">🏋️</div>
                <div className="text-2xl font-bold text-orange-600">{stats.averageWorkouts}/week</div>
                <div className="text-xs text-gray-500">Workouts</div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Stress Level & Sleep Hours */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 p-5 rounded-2xl border border-red-100">
                      <label className="block text-lg font-bold text-gray-800 mb-3">
                        😰 Stress Level
                        <span className={`block text-2xl font-black mt-2 ${getStressColor(formData.stressLevel)}`}>
                          {formData.stressLevel}/10
                        </span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={formData.stressLevel}
                        onChange={(e) => setFormData({ ...formData, stressLevel: e.target.value })}
                        className="w-full h-3 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full appearance-none"
                      />
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100">
                      <label className="block text-lg font-bold text-gray-800 mb-3">
                        😴 Sleep Hours
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="24"
                        value={formData.sleepHours}
                        onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
                        className="w-full px-5 py-4 text-lg font-bold text-blue-600 bg-white/50 border-2 border-blue-200 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Workout Days & Age */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl border border-green-100">
                      <label className="block text-lg font-bold text-gray-800 mb-3">
                        🏋️‍♂️ Workout Days
                      </label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="0"
                          max="7"
                          value={formData.workoutDays}
                          onChange={(e) => setFormData({ ...formData, workoutDays: e.target.value })}
                          className="flex-1 h-3 bg-gradient-to-r from-gray-300 to-green-500 rounded-full"
                        />
                        <span className="text-2xl font-black text-green-600 min-w-[60px]">
                          {formData.workoutDays}/7
                        </span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-2xl border border-purple-100">
                      <label className="block text-lg font-bold text-gray-800 mb-3">
                        🎂 Age (optional)
                      </label>
                      <input
                        type="number"
                        min="18"
                        max="100"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full px-5 py-4 text-lg font-bold text-purple-600 bg-white/50 border-2 border-purple-200 rounded-xl"
                        placeholder="30"
                      />
                    </div>
                  </div>

                  {/* Energy Level & Testosterone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-5 rounded-2xl border border-yellow-100">
                      <label className="block text-lg font-bold text-gray-800 mb-3">
                        {getEnergyEmoji(formData.energyLevel)} Energy Level
                        <span className="block text-2xl font-black text-yellow-600 mt-2">
                          {formData.energyLevel}/10
                        </span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={formData.energyLevel}
                        onChange={(e) => setFormData({ ...formData, energyLevel: e.target.value })}
                        className="w-full h-3 bg-gradient-to-r from-red-300 via-yellow-300 to-green-400 rounded-full"
                      />
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-2xl border border-orange-100">
                      <label className="block text-lg font-bold text-gray-800 mb-3">
                        🔥 Testosterone Level (optional)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={formData.testosteroneLevel}
                        onChange={(e) => setFormData({ ...formData, testosteroneLevel: e.target.value })}
                        className="w-full px-5 py-4 text-lg font-bold text-red-600 bg-white/50 border-2 border-orange-200 rounded-xl"
                        placeholder="6.5 ng/mL"
                      />
                    </div>
                  </div>

                  {/* Prostate Check */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full ${formData.prostateCheck ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {formData.prostateCheck ? '✅' : '📋'}
                        </div>
                        <div>
                          <label htmlFor="prostateCheck" className="text-lg font-bold text-gray-800 cursor-pointer">
                            Prostate Check This Year
                          </label>
                          <p className="text-sm text-gray-600 mt-1">Annual screening is recommended for men over 50</p>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="prostateCheck"
                          checked={formData.prostateCheck}
                          onChange={(e) => setFormData({ ...formData, prostateCheck: e.target.checked })}
                          className="sr-only"
                        />
                        <label
                          htmlFor="prostateCheck"
                          className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${formData.prostateCheck ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                          <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${formData.prostateCheck ? 'translate-x-6' : ''}`}></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Sexual Health & Notes */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-5 rounded-2xl border border-pink-100">
                      <label className="block text-lg font-bold text-gray-800 mb-3">
                        ❤️ Sexual Health Concerns
                      </label>
                      <textarea
                        value={formData.sexualHealthConcerns}
                        onChange={(e) => setFormData({ ...formData, sexualHealthConcerns: e.target.value })}
                        className="w-full px-5 py-4 text-gray-700 bg-white/50 border-2 border-pink-200 rounded-xl resize-none"
                        placeholder="Describe any concerns (confidential)..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-5 rounded-2xl border border-cyan-100">
                      <label className="block text-lg font-bold text-gray-800 mb-3">
                        📝 Additional Notes
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-5 py-4 text-gray-700 bg-white/50 border-2 border-cyan-200 rounded-xl resize-none"
                        placeholder="Any other health notes or observations..."
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-lg font-bold py-5 px-8 rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      '📊 Submit Health Data'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar - Stats & History */}
            <div className="space-y-6">
              {/* AI Tips Section */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl p-6 border border-indigo-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  AI Health Assistant
                </h3>
                
                {lastAITip ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-white/70 rounded-xl">
                      <div className="text-sm text-gray-700 line-clamp-3">{lastAITip}</div>
                    </div>
                    <button
                      onClick={viewLastAITip}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-xl font-medium hover:shadow-lg transition-all"
                    >
                      View Full Tip
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-gray-600 p-4">
                    <div className="text-lg mb-2">📊</div>
                    <div className="text-sm">Submit your health data to receive personalized AI-powered health tips.</div>
                  </div>
                )}
              </div>

              {/* Health History Section with Delete Button */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-4">
                  <History className="w-5 h-5 text-blue-500" />
                  <h3 className="text-xl font-bold text-gray-800">Health History</h3>
                  <button
                    onClick={handleRefreshHistory}
                    className="ml-auto p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Refresh history"
                  >
                    <RefreshCw className="w-4 h-4 text-gray-500" />
                  </button>
                  <span className="text-sm text-gray-500">{healthHistory.length} records</span>
                </div>
                
                {isLoadingHistory ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-sm text-gray-500 mt-2">Loading history...</p>
                  </div>
                ) : healthHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="w-12 h-12 mx-auto mb-3 opacity-50 text-gray-400" />
                    <p className="text-gray-500">No health records yet</p>
                    <p className="text-xs text-gray-400 mt-1">Submit your first health record above</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {healthHistory.map((record, index) => (
                      <div key={record._id || index} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleExpandRecord(record._id)}
                          className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="font-medium text-gray-800">
                                {formatDate(record.createdAt)}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                                <span>😰 {record.stressLevel || 5}/10</span>
                                <span>⚡ {record.energyLevel || 5}/10</span>
                                <span>😴 {record.sleepHours || 7}h</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {expandedRecord === record._id ? 
                              <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            }
                          </div>
                        </button>
                        
                        {expandedRecord === record._id && (
                          <div className="p-4 pt-0 border-t border-gray-100 bg-gray-50">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-gray-500">Stress:</span>
                                <span className="ml-2 font-medium">{record.stressLevel || 5}/10</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Energy:</span>
                                <span className="ml-2 font-medium">{record.energyLevel || 5}/10</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Sleep:</span>
                                <span className="ml-2 font-medium">{record.sleepHours || 7}h</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Workouts:</span>
                                <span className="ml-2 font-medium">{record.workoutDays || 3}/week</span>
                              </div>
                              {record.age && (
                                <div>
                                  <span className="text-gray-500">Age:</span>
                                  <span className="ml-2 font-medium">{record.age}</span>
                                </div>
                              )}
                              {record.testosteroneLevel && (
                                <div>
                                  <span className="text-gray-500">Testosterone:</span>
                                  <span className="ml-2 font-medium">{record.testosteroneLevel} ng/mL</span>
                                </div>
                              )}
                              {record.prostateCheck && (
                                <div>
                                  <span className="text-gray-500">Prostate Check:</span>
                                  <span className="ml-2 font-medium text-green-600">✅ Completed</span>
                                </div>
                              )}
                            </div>
                            {record.notes && (
                              <div className="mt-3 pt-2 border-t border-gray-200">
                                <span className="text-gray-500 text-xs">Notes:</span>
                                <p className="text-sm text-gray-700 mt-1">{record.notes}</p>
                              </div>
                            )}
                            {record.aiTip && (
                              <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                                <div className="flex items-start gap-2">
                                  <span className="text-sm">🤖</span>
                                  <div className="text-xs text-blue-700">{record.aiTip}</div>
                                </div>
                              </div>
                            )}
                            
                            {/* Delete Button */}
                            <div className="mt-3 pt-2 border-t border-gray-200 flex justify-end">
                              <button
                                onClick={() => setRecordToDelete(record)}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete Record
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Tips */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Pro Tips</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                    <div className="text-blue-600 text-xl">💧</div>
                    <div>
                      <div className="font-semibold text-gray-800">Stay Hydrated</div>
                      <div className="text-sm text-gray-600">Drink 3-4L water daily for optimal testosterone</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                    <div className="text-green-600 text-xl">💤</div>
                    <div>
                      <div className="font-semibold text-gray-800">Sleep Quality</div>
                      <div className="text-sm text-gray-600">7-9 hours improves recovery & hormone production</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
                    <div className="text-purple-600 text-xl">🏋️‍♂️</div>
                    <div>
                      <div className="font-semibold text-gray-800">Strength Training</div>
                      <div className="text-sm text-gray-600">3-4x weekly boosts testosterone naturally</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-slide-out {
          animation: slide-out 0.3s ease-in;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          cursor: pointer;
          border: 2px solid #e5e7eb;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
};

export default MenHealth;