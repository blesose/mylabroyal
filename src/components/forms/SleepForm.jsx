import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import { 
  Moon, 
  Clock, 
  Star, 
  Edit2, 
  Save, 
  X,
  Zap,
  Sun,
  Bed,
  Heart,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Animated moon phase component
const MoonPhase = ({ phase = 0 }) => (
  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full"></div>
    <div 
      className="absolute inset-1 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full transition-all duration-500"
      style={{
        clipPath: `inset(0 ${phase * 100}% 0 0)`
      }}
    ></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <Moon className="h-5 w-5 sm:h-6 sm:w-6 text-white/30" />
    </div>
  </div>
);

// Professional quality stars
const QualityStars = ({ rating, onChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-1 sm:gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`transition-all duration-200 text-base sm:text-xl ${
            star <= rating 
              ? 'text-yellow-400 transform scale-110' 
              : 'text-gray-300 hover:text-gray-400'
          }`}
        >
          {star <= rating ? '⭐' : '☆'}
        </button>
      ))}
    </div>
  );
};

const SleepForm = ({ editingRecord, onSaved }) => {
  const { dispatch, state } = useApp();
  const [formData, setFormData] = useState({
    sleepStart: '',
    sleepEnd: '',
    sleepQuality: 5,
    notes: ''
  });
  const [duration, setDuration] = useState('0h 0m');
  const [moonPhase, setMoonPhase] = useState(0.5);
  const [showQuickSelect, setShowQuickSelect] = useState(false);

  // If editingRecord changes, pre-fill the form
  useEffect(() => {
    if (editingRecord) {
      setFormData({
        sleepStart: editingRecord.sleepStart || '',
        sleepEnd: editingRecord.sleepEnd || '',
        sleepQuality: editingRecord.sleepQuality || 5,
        notes: editingRecord.notes || ''
      });
      
      toast.success('✏️ Editing sleep record', {
        icon: '📝',
        duration: 2000,
        position: 'top-right',
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          borderRadius: '12px',
        }
      });
    }
    
    // Simulate moon phase based on time
    const hour = new Date().getHours();
    setMoonPhase(hour < 12 ? hour / 24 : (24 - hour) / 24);
  }, [editingRecord]);

  useEffect(() => {
    calculateDuration();
  }, [formData.sleepStart, formData.sleepEnd]);

  const calculateDuration = () => {
    if (!formData.sleepStart || !formData.sleepEnd) {
      setDuration('0h 0m');
      return;
    }
    
    const start = new Date(`2000-01-01T${formData.sleepStart}`);
    const end = new Date(`2000-01-01T${formData.sleepEnd}`);
    
    let diff = (end - start) / (1000 * 60 * 60);
    if (diff < 0) diff += 24;
    
    const hours = Math.floor(diff);
    const minutes = Math.round((diff - hours) * 60);
    
    setDuration(`${hours}h ${minutes}m`);
  };

  const getQualityFeedback = () => {
    const quality = formData.sleepQuality;
    if (quality >= 9) return { text: 'Excellent! Deep restorative sleep', emoji: '✨', color: 'text-green-600', bg: 'bg-green-50' };
    if (quality >= 7) return { text: 'Good quality sleep', emoji: '😊', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (quality >= 5) return { text: 'Average sleep', emoji: '😐', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (quality >= 3) return { text: 'Poor sleep', emoji: '😕', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { text: 'Very poor sleep', emoji: '😫', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const qualityFeedback = getQualityFeedback();

  const quickSleepTimes = [
    { label: '10:00 PM', value: '22:00', icon: '🌙', time: '22:00' },
    { label: '11:00 PM', value: '23:00', icon: '😴', time: '23:00' },
    { label: '12:00 AM', value: '00:00', icon: '🕛', time: '00:00' },
    { label: '1:00 AM', value: '01:00', icon: '🌃', time: '01:00' },
  ];

  const quickWakeTimes = [
    { label: '6:00 AM', value: '06:00', icon: '🌅', time: '06:00' },
    { label: '7:00 AM', value: '07:00', icon: '☀️', time: '07:00' },
    { label: '8:00 AM', value: '08:00', icon: '⏰', time: '08:00' },
    { label: '9:00 AM', value: '09:00', icon: '😊', time: '09:00' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading(
      <div className="flex items-center gap-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span className="font-medium">
          {editingRecord ? 'Updating sleep record...' : 'Recording your sleep...'}
        </span>
      </div>,
      { 
        duration: Infinity,
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          borderRadius: '12px',
        }
      }
    );

    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const sleepData = {
        sleepStart: formData.sleepStart,
        sleepEnd: formData.sleepEnd,
        sleepQuality: parseInt(formData.sleepQuality),
        notes: formData.notes
      };

      let result;
      if (editingRecord) {
        result = await apiService.updateSleepRecord(editingRecord._id, sleepData);
      } else {
        result = await apiService.addSleepRecord(sleepData);
      }

      if (result.success) {
        dispatch({ 
          type: editingRecord ? 'UPDATE_SLEEP_DATA' : 'ADD_SLEEP_DATA', 
          payload: result.data 
        });
        
        toast.dismiss(loadingToast);
        
        // Success toast based on quality
        if (formData.sleepQuality >= 8) {
          toast.custom(
            (t) => (
              <div className={`bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl shadow-2xl transform transition-all ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}`}>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">✨</div>
                  <div>
                    <div className="font-bold text-lg">Amazing Sleep Recorded!</div>
                    <div className="text-sm opacity-90">Quality: {formData.sleepQuality}/10</div>
                    <div className="text-xs opacity-75 mt-1">Duration: {duration}</div>
                  </div>
                </div>
                {result.data?.aiTip && (
                  <div className="mt-2 pt-2 border-t border-white/20 text-sm">
                    💡 {result.data.aiTip}
                  </div>
                )}
              </div>
            ),
            { duration: 5000, position: 'top-right' }
          );
        } else {
          toast.custom(
            (t) => (
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl shadow-2xl transform transition-all ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">😴</div>
                  <div>
                    <div className="font-bold text-lg">Sleep Record Saved!</div>
                    <div className="text-sm opacity-90">Duration: {duration}</div>
                    <div className="text-xs opacity-75 mt-1">Quality: {formData.sleepQuality}/10</div>
                  </div>
                </div>
              </div>
            ),
            { duration: 4000, position: 'top-right' }
          );
        }

        // Reset form if creating new
        if (!editingRecord) {
          setFormData({ sleepStart: '', sleepEnd: '', sleepQuality: 5, notes: '' });
        }

        if (onSaved) onSaved();
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.custom(
        (t) => (
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-xl shadow-2xl transform transition-all ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6" />
              <div>
                <div className="font-bold">Failed to Save</div>
                <div className="text-sm opacity-90">{error.message || 'Error saving sleep data'}</div>
              </div>
            </div>
          </div>
        ),
        { duration: 5000, position: 'top-right' }
      );
      console.error('Error saving sleep record:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sleep/Wake Times */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Bed className="h-5 w-5 text-blue-500" />
              <span>Sleep Schedule</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowQuickSelect(!showQuickSelect)}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Zap className="h-4 w-4" />
              <span>{showQuickSelect ? 'Hide' : 'Quick Select'}</span>
            </button>
          </div>

          {/* Quick Time Selectors */}
          {showQuickSelect && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Quick Sleep Start</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {quickSleepTimes.map((time) => (
                    <button
                      key={time.value}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, sleepStart: time.time });
                        toast.success(`Sleep time set to ${time.label}`, { 
                          icon: time.icon, 
                          duration: 1500,
                          style: {
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: '#fff',
                            borderRadius: '12px',
                          }
                        });
                      }}
                      className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all text-center border border-blue-200"
                    >
                      <div className="text-lg">{time.icon}</div>
                      <div className="text-xs font-medium text-gray-700">{time.label}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Quick Wake Time</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {quickWakeTimes.map((time) => (
                    <button
                      key={time.value}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, sleepEnd: time.time });
                        toast.success(`Wake time set to ${time.label}`, { 
                          icon: time.icon, 
                          duration: 1500,
                          style: {
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: '#fff',
                            borderRadius: '12px',
                          }
                        });
                      }}
                      className="p-2 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg hover:from-yellow-100 hover:to-orange-100 transition-all text-center border border-yellow-200"
                    >
                      <div className="text-lg">{time.icon}</div>
                      <div className="text-xs font-medium text-gray-700">{time.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Time Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-indigo-500" />
                  <span>Sleep Start Time *</span>
                </div>
              </label>
              <input
                type="time"
                required
                value={formData.sleepStart}
                onChange={(e) => setFormData({ ...formData, sleepStart: e.target.value })}
                className="w-full px-4 py-3 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-gray-800"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <span>Wake Up Time *</span>
                </div>
              </label>
              <input
                type="time"
                required
                value={formData.sleepEnd}
                onChange={(e) => setFormData({ ...formData, sleepEnd: e.target.value })}
                className="w-full px-4 py-3 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all duration-200 text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Duration Display */}
        {formData.sleepStart && formData.sleepEnd && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Sleep Duration</div>
                <div className="text-2xl font-bold">{duration}</div>
              </div>
              <div className="text-3xl">⏱️</div>
            </div>
            <div className="mt-2 text-sm opacity-90">
              {parseInt(duration) >= 7 ? '🎯 Optimal sleep duration!' : '💡 Aim for 7-9 hours'}
            </div>
          </div>
        )}

        {/* Sleep Quality */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Sleep Quality</span>
            </label>
            <span className={`text-lg font-bold ${qualityFeedback.color}`}>
              {qualityFeedback.emoji} {formData.sleepQuality}/10
            </span>
          </div>
          
          {/* Star Rating */}
          <div className={`p-4 ${qualityFeedback.bg} rounded-xl border-2 border-yellow-200 transition-all`}>
            <QualityStars 
              rating={formData.sleepQuality} 
              onChange={(rating) => setFormData({ ...formData, sleepQuality: rating })}
            />
            <div className="mt-3 text-center">
              <span className={`font-medium ${qualityFeedback.color}`}>
                {qualityFeedback.text}
              </span>
            </div>
          </div>

          {/* Quality Slider */}
          <input
            type="range"
            min="1"
            max="10"
            value={formData.sleepQuality}
            onChange={(e) => setFormData({ ...formData, sleepQuality: parseInt(e.target.value) })}
            className="w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <Edit2 className="h-4 w-4 text-gray-500" />
              <span>Sleep Notes (Optional)</span>
            </div>
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows="3"
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none text-gray-800"
            placeholder="How did you feel? Any dreams or interruptions? Did you wake up refreshed?"
          />
          <div className="text-xs text-gray-500">
            💡 Tip: Mention any factors affecting your sleep quality
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={state.loading}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="relative z-10 flex items-center justify-center gap-3">
            {state.loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>{editingRecord ? 'Updating...' : 'Recording...'}</span>
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                <span className="text-base">{editingRecord ? 'Update Sleep Record' : 'Record My Sleep'}</span>
                <Heart className="h-5 w-5" />
              </>
            )}
          </div>
        </button>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
            <div className="text-sm text-gray-600">Duration</div>
            <div className="text-lg font-bold text-blue-600">{duration}</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
            <div className="text-sm text-gray-600">Quality</div>
            <div className="text-lg font-bold text-yellow-600">{formData.sleepQuality}/10</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
            <div className="text-sm text-gray-600">Status</div>
            <div className="text-lg font-bold text-green-600">
              {formData.sleepStart && formData.sleepEnd ? 'Ready' : 'Need Times'}
            </div>
          </div>
        </div>
      </form>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-out {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .animate-slide-out {
          animation: slide-out 0.3s ease-in;
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #6366f1;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: all 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default SleepForm;