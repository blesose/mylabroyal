import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
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
  Cloud,
  Sun,
  Bed,
  AlarmClock,
  TrendingUp,
  Heart
} from 'lucide-react';

// Animated moon phases
const MoonPhase = ({ phase = 0 }) => (
  <div className="relative w-16 h-16">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full"></div>
    <div 
      className="absolute inset-1 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full"
      style={{
        clipPath: `inset(0 ${phase * 100}% 0 0)`
      }}
    ></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <Moon className="h-8 w-8 text-white/30" />
    </div>
  </div>
);

// Quality rating stars
const QualityStars = ({ rating, onChange }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`transition-all duration-200 ${
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
  const [showAdvanced, setShowAdvanced] = useState(false);

  // If editingRecord changes, pre-fill the form
  useEffect(() => {
    if (editingRecord) {
      setFormData({
        sleepStart: editingRecord.sleepStart || '',
        sleepEnd: editingRecord.sleepEnd || '',
        sleepQuality: editingRecord.sleepQuality || 5,
        notes: editingRecord.notes || ''
      });
      
      toast.custom((t) => (
        <div className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl shadow-lg transform transition-all ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}`}>
          <div className="flex items-center space-x-3">
            <Edit2 className="h-6 w-6" />
            <div>
              <div className="font-bold">Editing Sleep Record</div>
              <div className="text-sm opacity-90">Make your changes and save</div>
            </div>
          </div>
        </div>
      ), { duration: 2000 });
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
    
    let diff = (end - start) / (1000 * 60 * 60); // hours
    if (diff < 0) diff += 24; // Handle overnight sleep
    
    const hours = Math.floor(diff);
    const minutes = Math.round((diff - hours) * 60);
    
    setDuration(`${hours}h ${minutes}m`);
    
    // Give feedback based on duration
    if (hours >= 7 && hours <= 9) {
      if (minutes > 0) {
        toast('🎯 Perfect duration! 7-9 hours is ideal for adults.', {
          icon: '💤',
          duration: 3000,
          position: 'bottom-right'
        });
      }
    } else if (hours < 6) {
      toast('⚠️ Consider getting more sleep for better health', {
        icon: '😴',
        duration: 3000,
        position: 'bottom-right'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitToast = toast.loading(
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        <span className="font-medium">
          {editingRecord ? 'Updating sleep record...' : 'Recording your sleep...'}
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
        
        toast.dismiss(submitToast);
        
        // Success toast based on quality
        if (formData.sleepQuality >= 8) {
          toast.success(
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">✨</div>
                <div>
                  <div className="font-bold text-lg">Amazing Sleep Recorded!</div>
                  <div className="text-sm opacity-90">Quality: {formData.sleepQuality}/10 ⭐</div>
                </div>
              </div>
              {result.data.aiTip && (
                <div className="mt-2 p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-800">AI Tip:</div>
                  <div className="text-sm text-green-700">{result.data.aiTip}</div>
                </div>
              )}
            </div>,
            { 
              style: {
                background: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
                color: '#fff',
                borderRadius: '12px',
              },
              duration: 5000 
            }
          );
        } else if (formData.sleepQuality >= 5) {
          toast.success(
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">😴</div>
                <div>
                  <div className="font-bold text-lg">Sleep Record Saved!</div>
                  <div className="text-sm opacity-90">Duration: {duration}</div>
                </div>
              </div>
            </div>,
            { 
              style: {
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: '#fff',
                borderRadius: '12px',
              },
              duration: 4000 
            }
          );
        } else {
          toast.success(
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🌙</div>
                <div>
                  <div className="font-bold text-lg">Sleep Logged</div>
                  <div className="text-sm opacity-90">Consider improving sleep quality</div>
                </div>
              </div>
            </div>,
            { 
              style: {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                borderRadius: '12px',
              },
              duration: 3000 
            }
          );
        }

        // Show AI tip in a separate toast if available
        if (result.data.aiTip) {
          setTimeout(() => {
            toast.custom((t) => (
              <div className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl shadow-2xl transform transition-all ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}`}>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🤖</div>
                  <div>
                    <div className="font-bold">AI Sleep Tip</div>
                    <div className="text-sm opacity-90">{result.data.aiTip}</div>
                  </div>
                </div>
              </div>
            ), { duration: 6000 });
          }, 500);
        }

        // Reset form if creating new
        if (!editingRecord) {
          setFormData({ sleepStart: '', sleepEnd: '', sleepQuality: 5, notes: '' });
          
          // Show celebration animation
          setTimeout(() => {
            toast.custom((t) => (
              <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white p-4 rounded-xl shadow-lg animate-pulse">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl">🎉</span>
                  <span className="font-bold">Ready for another sleep log!</span>
                  <span className="text-2xl">😴</span>
                </div>
              </div>
            ), { duration: 3000 });
          }, 1000);
        }

        // Callback to parent
        if (onSaved) onSaved();
      }
    } catch (error) {
      toast.dismiss(submitToast);
      const errorMessage = error.response?.data?.message || 'Error saving sleep data';
      
      toast.error(
        <div className="space-y-1">
          <div className="font-bold">❌ Save Failed</div>
          <div className="text-sm">{errorMessage}</div>
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
      console.error('Error saving sleep record:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getQualityFeedback = () => {
    const quality = formData.sleepQuality;
    if (quality >= 9) return { text: 'Excellent! Deep restorative sleep', emoji: '✨', color: 'text-green-600' };
    if (quality >= 7) return { text: 'Good quality sleep', emoji: '😊', color: 'text-blue-600' };
    if (quality >= 5) return { text: 'Average sleep', emoji: '😐', color: 'text-yellow-600' };
    if (quality >= 3) return { text: 'Poor sleep', emoji: '😕', color: 'text-orange-600' };
    return { text: 'Very poor sleep', emoji: '😫', color: 'text-red-600' };
  };

  const qualityFeedback = getQualityFeedback();

  const quickSleepTimes = [
    { label: '10:00 PM', value: '22:00', icon: '🌙' },
    { label: '11:00 PM', value: '23:00', icon: '😴' },
    { label: '12:00 AM', value: '00:00', icon: '🕛' },
    { label: '1:00 AM', value: '01:00', icon: '🌃' },
  ];

  const quickWakeTimes = [
    { label: '6:00 AM', value: '06:00', icon: '🌅' },
    { label: '7:00 AM', value: '07:00', icon: '☀️' },
    { label: '8:00 AM', value: '08:00', icon: '⏰' },
    { label: '9:00 AM', value: '09:00', icon: '😊' },
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
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            borderRadius: '12px',
            fontWeight: '600',
          },
        }}
      />

      <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <MoonPhase phase={moonPhase} />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {editingRecord ? 'Edit Sleep Record' : 'Log Your Sleep'}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Track your sleep patterns for better health
              </p>
            </div>
          </div>
          {editingRecord && (
            <button
              onClick={() => {
                setFormData({ sleepStart: '', sleepEnd: '', sleepQuality: 5, notes: '' });
                if (onSaved) onSaved();
                toast('Editing cancelled. Ready for new entry!', {
                  icon: '🔄',
                  duration: 2000,
                });
              }}
              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              title="Cancel editing"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sleep/Wake Times with Quick Select */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <Bed className="h-5 w-5 text-blue-500" />
                <span>Sleep Times</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                <Zap className="h-4 w-4" />
                <span>{showAdvanced ? 'Hide' : 'Show'} Quick Times</span>
              </button>
            </div>

            {/* Quick Time Selectors */}
            {showAdvanced && (
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Quick Sleep Start</div>
                  <div className="grid grid-cols-4 gap-2">
                    {quickSleepTimes.map((time) => (
                      <button
                        key={time.value}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, sleepStart: time.value });
                          toast(`Set sleep time to ${time.label}`, {
                            icon: time.icon,
                            duration: 1500,
                          });
                        }}
                        className="p-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all text-center"
                      >
                        <div className="text-lg">{time.icon}</div>
                        <div className="text-xs text-gray-700">{time.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Quick Wake Time</div>
                  <div className="grid grid-cols-4 gap-2">
                    {quickWakeTimes.map((time) => (
                      <button
                        key={time.value}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, sleepEnd: time.value });
                          toast(`Set wake time to ${time.label}`, {
                            icon: time.icon,
                            duration: 1500,
                          });
                        }}
                        className="p-2 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg hover:from-yellow-100 hover:to-orange-100 transition-all text-center"
                      >
                        <div className="text-lg">{time.icon}</div>
                        <div className="text-xs text-gray-700">{time.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Time Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-charcoal-grey">
                  <div className="flex items-center space-x-2">
                    <Moon className="h-4 w-4 text-indigo-500" />
                    <span>Sleep Start</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    required
                    value={formData.sleepStart}
                    onChange={(e) => setFormData({ ...formData, sleepStart: e.target.value })}
                    className="text-charcoal-grey w-full px-4 py-3 bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
                  />
                  {!formData.sleepStart && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Clock className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </div>

              <div className="text-charcoal-grey space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span>Wake Up</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    required
                    value={formData.sleepEnd}
                    onChange={(e) => setFormData({ ...formData, sleepEnd: e.target.value })}
                    className="w-full px-4 py-3 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all duration-200"
                  />
                  {!formData.sleepEnd && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <AlarmClock className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Duration Display */}
          {formData.sleepStart && formData.sleepEnd && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl shadow-lg animate-pulse">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm opacity-90">Sleep Duration</div>
                  <div className="text-2xl font-bold">{duration}</div>
                </div>
                <div className="text-3xl">⏱️</div>
              </div>
              <div className="mt-2 text-sm opacity-90">
                {parseFloat(duration) >= 7 ? '🎯 Optimal sleep duration!' : '💡 Aim for 7-9 hours'}
              </div>
            </div>
          )}

          {/* Sleep Quality */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Sleep Quality</span>
              </label>
              <span className={`text-lg font-bold ${qualityFeedback.color}`}>
                {qualityFeedback.emoji} {formData.sleepQuality}/10
              </span>
            </div>
            
            {/* Star Rating */}
            <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
              <QualityStars 
                rating={formData.sleepQuality} 
                onChange={(rating) => {
                  setFormData({ ...formData, sleepQuality: rating });
                  if (rating >= 8) {
                    toast('Great sleep quality! 😊', { icon: '⭐' });
                  }
                }}
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
              onChange={(e) => setFormData({ ...formData, sleepQuality: e.target.value })}
              className="w-full h-3 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg"
            />
          </div>

          {/* Notes */}
          <div className="text-charcoal-grey space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center space-x-2">
                <Edit2 className="h-4 w-4 text-gray-500" />
                <span>Sleep Notes (Optional)</span>
              </div>
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows="3"
              className="w-full px-4 py-3 bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none"
              placeholder="How did you feel? Any dreams or interruptions? Did you wake up refreshed?"
            />
            <div className="text-xs text-gray-500">
              Tip: Mention any factors affecting your sleep quality
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={state.loading}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-lg font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <span>{editingRecord ? 'Update Sleep Record' : 'Record My Sleep'}</span>
                  <Heart className="h-5 w-5" />
                </>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
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

        {/* Tips Section */}
        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <div className="font-medium text-indigo-800">Sleep Tips</div>
          </div>
          <div className="text-sm text-indigo-700 space-y-1">
            <div>• Consistent sleep schedule improves quality</div>
            <div>• Dark, cool rooms promote better sleep</div>
            <div>• Avoid screens 1 hour before bed</div>
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
          .grid-cols-4 {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .text-3xl {
            font-size: 1.5rem;
          }
          
          .p-6 {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SleepForm;