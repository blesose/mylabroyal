import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import { 
  Heart, 
  Clock, 
  Star, 
  Edit2, 
  Save, 
  X,
  Zap,
  Activity,
  Sun,
  Brain,
  BookOpen,
  Music,
  Coffee,
  TrendingUp,
  Sparkles
} from 'lucide-react';

// Activity type icon
const ActivityIcon = ({ type = 'meditation' }) => {
  const icons = {
    meditation: '🧘',
    reading: '📚',
    exercise: '🏃',
    music: '🎵',
    nature: '🌿',
    journaling: '📝',
    social: '👥',
    hobby: '🎨',
    relaxation: '😌',
    self_reflection: '💭',
    skinCare: '💆‍♀️',
    mindfulness: '🧠',
    sleep: '😴',
    other: '💖'
  };
  return (
    <div className="relative w-16 h-16 sm:w-16 sm:h-16">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl sm:text-3xl">{icons[type] || '💖'}</span>
      </div>
    </div>
  );
};

// Satisfaction rating stars
const SatisfactionStars = ({ rating, onChange }) => {
  return (
    <div className="flex items-center flex-wrap justify-center sm:justify-start gap-1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`transition-all duration-200 ${
            star <= rating 
              ? 'text-pink-500 transform scale-110' 
              : 'text-gray-300 hover:text-gray-400'
          }`}
        >
          {star <= rating ? '❤️' : '🤍'}
        </button>
      ))}
    </div>
  );
};

const SelfCareForm = ({ editingRecord, onSaved }) => {
  const { dispatch, state } = useApp();
  const [formData, setFormData] = useState({
    activity: '',
    activityType: 'meditation',
    duration: '',
    satisfaction: 5,
    notes: '',
    moodBefore: 5,
    moodAfter: 5
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Activity types with icons - UPDATED to match your backend model
  const activityTypes = [
    { id: 'meditation', name: 'Meditation', icon: '🧘', color: 'from-purple-400 to-pink-400' },
    { id: 'reading', name: 'Reading', icon: '📚', color: 'from-blue-400 to-cyan-400' },
    { id: 'exercise', name: 'Exercise', icon: '🏃', color: 'from-green-400 to-emerald-400' },
    { id: 'music', name: 'Music', icon: '🎵', color: 'from-yellow-400 to-orange-400' },
    { id: 'nature', name: 'Nature', icon: '🌿', color: 'from-green-500 to-teal-500' },
    { id: 'journaling', name: 'Journaling', icon: '📝', color: 'from-amber-400 to-red-400' },
    { id: 'social', name: 'Social', icon: '👥', color: 'from-indigo-400 to-purple-400' },
    { id: 'hobby', name: 'Hobby', icon: '🎨', color: 'from-pink-400 to-rose-400' },
    { id: 'relaxation', name: 'Relaxation', icon: '😌', color: 'from-blue-300 to-cyan-300' },
    { id: 'self_reflection', name: 'Reflection', icon: '💭', color: 'from-gray-400 to-blue-400' },
    { id: 'skinCare', name: 'Skin Care', icon: '💆‍♀️', color: 'from-pink-300 to-rose-300' },
    { id: 'mindfulness', name: 'Mindfulness', icon: '🧠', color: 'from-indigo-300 to-purple-300' },
    { id: 'sleep', name: 'Sleep', icon: '😴', color: 'from-blue-200 to-indigo-300' },
    { id: 'other', name: 'Other', icon: '💖', color: 'from-gray-300 to-gray-400' },
  ];

  // If editingRecord changes, pre-fill the form
  useEffect(() => {
    if (editingRecord) {
      setFormData({
        activity: editingRecord.activity || '',
        activityType: editingRecord.activityType || 'meditation',
        duration: editingRecord.duration || '',
        satisfaction: editingRecord.satisfaction || 5,
        notes: editingRecord.notes || '',
        moodBefore: editingRecord.moodBefore || 5,
        moodAfter: editingRecord.moodAfter || 5
      });
      
      toast.custom((t) => (
        <div className={`bg-gradient-to-r from-pink-500 to-rose-600 text-white p-4 rounded-xl shadow-lg transform transition-all ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}`}>
          <div className="flex items-center space-x-3">
            <Edit2 className="h-6 w-6" />
            <div>
              <div className="font-bold">Editing Self-Care Record</div>
              <div className="text-sm opacity-90">Make your changes and save</div>
            </div>
          </div>
        </div>
      ), { duration: 2000 });
    }
  }, [editingRecord]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitToast = toast.loading(
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span className="font-medium">
          {editingRecord ? 'Updating self-care record...' : 'Recording your self-care...'}
        </span>
      </div>,
      { 
        style: {
          background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
          color: '#fff',
          borderRadius: '12px',
        },
        duration: Infinity
      }
    );

    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const selfcareData = {
        activity: formData.activity || '',
        activityType: formData.activityType,
        duration: parseInt(formData.duration) || 15,
        moodBefore: parseInt(formData.moodBefore) || 5,
        moodAfter: parseInt(formData.moodAfter) || 5,
        satisfaction: parseInt(formData.satisfaction) || 5,
        notes: formData.notes || '',
      };

      console.log('📤 Sending self-care data:', selfcareData);

      let result;
      if (editingRecord) {
        result = await apiService.updateSelfCare(editingRecord._id, selfcareData);
      } else {
        result = await apiService.addSelfCare(selfcareData);
      }

      if (result.success) {
        toast.dismiss(submitToast);
        
        // ✅ SUCCESS TOAST
        toast.success(
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">✨</div>
              <div>
                <div className="font-bold text-lg">Self-Care Recorded!</div>
                <div className="text-sm opacity-90">
                  {formData.activityType} for {formData.duration} minutes
                </div>
              </div>
            </div>
            {result.data.aiTip && (
              <div className="mt-2 p-3 bg-pink-50 rounded-lg">
                <div className="font-medium text-pink-800">AI Tip:</div>
                <div className="text-sm text-pink-700">{result.data.aiTip}</div>
              </div>
            )}
          </div>,
          { 
            style: {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              borderRadius: '12px',
            },
            duration: 5000 
          }
        );

        // Show mood improvement toast if mood improved
        if (formData.moodAfter > formData.moodBefore) {
          setTimeout(() => {
            toast.custom((t) => (
              <div className={`bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl shadow-2xl transform transition-all ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}`}>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">📈</div>
                  <div>
                    <div className="font-bold">Mood Improved!</div>
                    <div className="text-sm opacity-90">
                      Your self-care raised your mood by {formData.moodAfter - formData.moodBefore} points!
                    </div>
                  </div>
                </div>
              </div>
            ), { duration: 6000 });
          }, 500);
        }

        // ✅ IMPORTANT: Reset form if creating new
        if (!editingRecord) {
          setFormData({
            activity: '',
            activityType: 'meditation',
            duration: '',
            satisfaction: 5,
            notes: '',
            moodBefore: 5,
            moodAfter: 5
          });
          
          // Show celebration animation
          setTimeout(() => {
            toast.custom((t) => (
              <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white p-4 rounded-xl shadow-lg animate-pulse">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl">🎉</span>
                  <span className="font-bold">Ready for more self-care!</span>
                  <span className="text-2xl">💖</span>
                </div>
              </div>
            ), { duration: 3000 });
          }, 1000);
        }

        // ✅ IMPORTANT: Call onSaved callback to notify parent
        if (onSaved) {
          console.log('✅ Form saved successfully, calling onSaved callback with:', result.data);
          onSaved(result.data); // Pass the new/updated data
        }

      } else {
        throw new Error(result.message || 'Failed to save self-care activity');
      }
    } catch (error) {
      toast.dismiss(submitToast);
      
      console.error('❌ Error saving self-care record:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      
      let errorMessage = 'Failed to save self-care record';
      let errorDetails = '';
      
      if (error.response?.data) {
        const backendError = error.response.data;
        errorMessage = backendError.message || errorMessage;
        
        // Include validation errors if present
        if (backendError.errors) {
          errorDetails = Object.values(backendError.errors)
            .map(err => err.message || err)
            .join(', ');
        }
      }
      
      toast.error(
        <div className="space-y-2">
          <div className="font-bold">❌ Save Failed</div>
          <div className="text-sm">{errorMessage}</div>
          {errorDetails && (
            <div className="text-xs opacity-75">{errorDetails}</div>
          )}
        </div>,
        { 
          style: {
            background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
            color: '#fff',
            borderRadius: '12px',
          },
          duration: 5000 
        }
      );
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getSatisfactionFeedback = () => {
    const satisfaction = formData.satisfaction;
    if (satisfaction >= 9) return { text: 'Excellent! Highly fulfilling', emoji: '✨', color: 'text-green-600' };
    if (satisfaction >= 7) return { text: 'Very satisfying', emoji: '😊', color: 'text-blue-600' };
    if (satisfaction >= 5) return { text: 'Moderately satisfying', emoji: '🙂', color: 'text-yellow-600' };
    if (satisfaction >= 3) return { text: 'Somewhat satisfying', emoji: '😐', color: 'text-orange-600' };
    return { text: 'Not very satisfying', emoji: '😕', color: 'text-red-600' };
  };

  const satisfactionFeedback = getSatisfactionFeedback();

  const quickDurations = [
    { label: '5 min', value: '5', icon: '⏱️', fullLabel: '5 min' },
    { label: '15 min', value: '15', icon: '🧘', fullLabel: '5 min' },
    { label: '30 min', value: '30', icon: '📚', fullLabel: '30 min' },
    { label: '60 min', value: '60', icon: '🏃', fullLabel: '60 min' },
  ];

  return (
    <div className="relative">
      {/* Local Toaster for form-specific notifications */}
      <Toaster
        position="top-right"
        containerStyle={{
          top: 10,
          zIndex: 9999,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
            color: '#fff',
            borderRadius: '12px',
            fontWeight: '600',
          },
        }}
      />

      <div className="bg-gradient-to-br from-white to-pink-50/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-white/20">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-6">
          <div className="fflex items-center space-x-3 sm:space-x-4">
            <ActivityIcon type={formData.activityType} />
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-gray-800">
                {editingRecord ? 'Edit Self-Care' : 'Log Self-Care'}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Nurture your mind, body, and soul
              </p>
            </div>
          </div>
          {editingRecord && (
            <button
              onClick={() => {
                setFormData({
                  activity: '',
                  activityType: 'meditation',
                  duration: '',
                  satisfaction: 5,
                  notes: '',
                  moodBefore: 5,
                  moodAfter: 5
                });
                if (onSaved) onSaved();
                toast('Editing cancelled. Ready for new entry!', {
                  icon: '🔄',
                  duration: 2000,
                });
              }}
              className="p-1.5 sm:p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex-shrink-0"
              title="Cancel editing"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Activity Type Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <Activity className="h-5 w-5 text-pink-500" />
                <span>Activity Type</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-pink-600 hover:text-pink-700 flex items-center space-x-1"
              >
                <Zap className="h-4 w-4" />
                <span>{showAdvanced ? 'Hide' : 'Show'} All Types</span>
              </button>
            </div>

            {/* Activity Type Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1.5 sm:gap-2">
              {activityTypes.slice(0, showAdvanced ? 14 : 6).map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, activityType: type.id })}
                  className={`p-2 sm:p-3 rounded-lg text-center transition-all ${
                    formData.activityType === type.id 
                      ? `bg-gradient-to-br ${type.color} text-white shadow-lg transform scale-105` 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-lg sm:text-xl">{type.icon}</div>
                  <div className="text-[10px] sm:text-xs font-medium mt-0.5 sm:mt-1 truncate">{type.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Activity Name & Duration */}
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  <span>Activity Name (Optional)</span>
                </div>
              </label>
              <input
                type="text"
                value={formData.activity}
                onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                className="text-charcoal-grey w-full px-4 py-3 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                placeholder="e.g., Morning meditation, Reading session"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span>Duration (minutes) *</span>
                  </div>
                </label>
                <span className="text-xs text-gray-500">Quick select:</span>
              </div>
              <div className="flex flex-col space-y-2">
                <input
                  type="number"
                  required
                  min="1"
                  max="1440"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="text-charcoal-grey w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all duration-200"
                  placeholder="e.g., 30"
                />
                {/* Quick Duration Buttons */}
                <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                  {quickDurations.map((duration) => (
                    <button
                      key={duration.value}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, duration: duration.value });
                        toast(`Set duration to ${duration.label}`, {
                          icon: duration.icon,
                          duration: 1500,
                        });
                      }}
                      className="flex-none px-3 py-2 bg-gradient-to-br text-charcoal-grey from-gray-50 to-gray-100 rounded-lg hover:from-gray-100 hover:to-gray-200 transition-all text-center text-sm"
                    >
                      <span className="hidden sm:inline">{duration.fullLabel}</span>
        <span className="sm:hidden">{duration.label}</span>
                      {/* {duration.label} */}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mood Before & After */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <span>Mood Tracking (1-10)</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span>Mood Before Activity</span>
                  </div>
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.moodBefore}
                    onChange={(e) => setFormData({ ...formData, moodBefore: e.target.value })}
                    className="w-full h-3 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1</span>
                    <span className="font-bold text-gray-700">{formData.moodBefore}/10</span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-green-500" />
                    <span>Mood After Activity</span>
                  </div>
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.moodAfter}
                    onChange={(e) => setFormData({ ...formData, moodAfter: e.target.value })}
                    className="w-full h-3 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1</span>
                    <span className="font-bold text-gray-700">{formData.moodAfter}/10</span>
                    <span>10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mood Difference Display */}
            {formData.moodBefore && formData.moodAfter && (
              <div className={`p-3 sm:p-4 rounded-xl shadow-lg ${
                formData.moodAfter > formData.moodBefore 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                  : formData.moodAfter < formData.moodBefore 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                  : 'bg-gradient-to-r from-gray-400 to-gray-600 text-white'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-sm opacity-90">Mood Change</div>
                    <div className="text-lg sm:text-xl font-bold">
                      {formData.moodAfter > formData.moodBefore ? '↑ +' : ''}
                      {formData.moodAfter - formData.moodBefore} points
                    </div>
                  </div>
                  <div className="text-3xl">
                    {formData.moodAfter > formData.moodBefore ? '📈' : 
                     formData.moodAfter < formData.moodBefore ? '📉' : '➡️'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Satisfaction */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <Heart className="h-5 w-5 text-pink-500" />
                <span>Satisfaction (1-10)</span>
              </label>
              <span className={`text-lg font-bold ${satisfactionFeedback.color}`}>
                {satisfactionFeedback.emoji} {formData.satisfaction}/10
              </span>
            </div>
            
            {/* Heart Rating */}
            <div className="p-3 sm:p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border-2 border-pink-200">
              <SatisfactionStars 
                rating={formData.satisfaction} 
                onChange={(rating) => {
                  setFormData({ ...formData, satisfaction: rating });
                  if (rating >= 8) {
                    toast('Great self-care satisfaction! 💖', { icon: '❤️' });
                  }
                }}
              />
              <div className="mt-2 text-center">
                <span className={`font-medium ${satisfactionFeedback.color}`}>
                  {satisfactionFeedback.text}
                </span>
              </div>
            </div>

            {/* Satisfaction Slider */}
            <input
              type="range"
              min="1"
              max="10"
              value={formData.satisfaction}
              onChange={(e) => setFormData({ ...formData, satisfaction: e.target.value })}
              className="w-full h-3 bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg"
            />
          </div>

          {/* Notes */}
          <div className="text-charcoal-grey space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center space-x-2">
                <Edit2 className="h-4 w-4 text-gray-500" />
                <span>Reflection Notes (Optional)</span>
              </div>
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows="2"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-br from-gray-50 to-purple-50 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200 resize-none"
              placeholder="How did this activity make you feel? What did you learn about yourself?"
            />
            <div className="text-xs text-gray-500">
              Tip: Journaling about your self-care enhances its benefits
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={state.loading || !formData.duration}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-white text-base sm:text-lg font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="relative z-10 flex items-center justify-center space-x-3">
              {state.loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>{editingRecord ? 'Updating...' : 'Recording...'}</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span className="text-sm sm:text-base">{editingRecord ? 'Update Self-Care' : 'Record Self-Care'}</span>
                  <Heart className="h-5 w-5" />
                </>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-700 via-rose-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
          </button>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-gray-200">
            <div className="text-center p-2 sm:p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div className="text-[10px] sm:text-xs text-gray-600">Duration</div>
              <div className="text-sm sm:text-base font-bold text-blue-600">{formData.duration || '0'} min</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
              <div className="text-[10px] sm:text-xs text-gray-600">Satisfaction</div>
              <div className="text-lg font-bold text-pink-600">{formData.satisfaction}/10</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <div className="text-[10px] sm:text-xs text-gray-600">Mood Δ</div>
              <div className="text-lg font-bold text-green-600">
                {formData.moodAfter && formData.moodBefore ? formData.moodAfter - formData.moodBefore : '0'}
              </div>
            </div>
          </div>
        </form>

        {/* Self-Care Tips */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <div className="font-medium text-purple-800 text-sm sm:text-base">Self-Care Tips</div>
          </div>
          <div className="text-xs sm:text-sm text-purple-700 space-y-1">
            <div>• Regular self-care improves mental resilience</div>
            <div>• Consistency is more important than duration</div>
            <div>• Track how different activities affect your mood</div>
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
        
        @keyframes shine {
          100% { left: 125%; }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-slide-out {
          animation: slide-out 0.3s ease-in;
        }
        
        .animate-shine {
          animation: shine 1.5s;
        }
        
        /* Custom range slider */
        input[type="range"]::-webkit-slider-thumb {
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transition: all 0.2s;
          border: 2px solid #fff;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0,0,0,0.3);
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .grid-cols-5 {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .text-3xl {
            font-size: 1.5rem;
          }
          
          .p-6 {
            padding: 1.5rem;
          }
            /* Mobile touch optimizations */
@media (max-width: 640px) {
  button, input, select, textarea {
    font-size: 16px !important; /* Prevents zoom on focus in iOS */
  }
  
  input[type="range"]::-webkit-slider-thumb {
    width: 24px !important;
    height: 24px !important;
    margin-top: -9px !important;
  }
}

/* Hide scrollbar for quick duration buttons */
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
        }
      `}</style>
    </div>
  );
};

export default SelfCareForm;