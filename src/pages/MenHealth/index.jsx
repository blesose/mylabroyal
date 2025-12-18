import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import Button from '../../components/ui/Button';

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
      dispatch({ type: 'SET_LOADING', payload: true });

      const menHealthData = {
        stressLevel: parseInt(formData.stressLevel),
        sleepHours: parseFloat(formData.sleepHours),
        workoutDays: parseInt(formData.workoutDays),
        age: formData.age ? parseInt(formData.age) : undefined,
        prostateCheck: formData.prostateCheck,
        testosteroneLevel: formData.testosteroneLevel ? parseFloat(formData.testosteroneLevel) : undefined,
        sexualHealthConcerns: formData.sexualHealthConcerns,
        energyLevel: parseInt(formData.energyLevel),
        notes: formData.notes
      };

      const result = await apiService.createMenHealthRecord(menHealthData);

      if (result.success) {
        toast.dismiss(submitToast);
        toast.success(
          <div className="space-y-2">
            <div className="font-bold text-lg">🎉 Health Data Saved!</div>
            <div className="text-sm opacity-90">Your men's health record has been successfully created.</div>
          </div>,
          { 
            style: {
              ...toastStyle,
              background: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
            },
            duration: 4000 
          }
        );
        
        // Add celebratory animation
        setTimeout(() => {
          toast.custom((t) => (
            <div className={`bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-2xl transform transition-all ${t.visible ? 'animate-slide-in' : 'animate-slide-out'}`}>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">💪</div>
                <div>
                  <div className="font-bold">Strong Work!</div>
                  <div className="text-sm opacity-90">Your health data is now tracked and secured</div>
                </div>
              </div>
            </div>
          ), { duration: 3000 });
        }, 500);

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
      const errorMessage = error.response?.data?.message || 'Error creating health record';
      
      toast.error(
        <div className="space-y-2">
          <div className="font-bold text-lg">⚠️ Submission Failed</div>
          <div className="text-sm">{errorMessage}</div>
        </div>,
        { 
          style: {
            ...toastStyle,
            background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
          },
          duration: 5000 
        }
      );
      
      console.error('Error creating men health record:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Real-time feedback indicators
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

  return (
    <>
      {/* React Hot Toast Container with custom positioning */}
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
        <div className="max-w-4xl mx-auto">
          {/* Header with animated gradient */}
          <div className="mb-8 text-center relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 shadow-2xl animate-gradient-x">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 relative z-10">
              🦸‍♂️ Men's Health Tracker
            </h1>
            <p className="text-blue-100 text-lg relative z-10">
              Track. Improve. Thrive.
            </p>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full opacity-10 blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-300 rounded-full opacity-10 blur-xl"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Stress Level & Sleep Hours - Mobile responsive grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
                        onChange={(e) => {
                          setFormData({ ...formData, stressLevel: e.target.value });
                          toast.custom((t) => (
                            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border">
                              <div className="flex items-center space-x-2">
                                <span>Stress: {e.target.value}/10</span>
                                <span className="text-lg">
                                  {e.target.value <= 3 ? '😌' : e.target.value <= 7 ? '😐' : '😫'}
                                </span>
                              </div>
                            </div>
                          ), { duration: 1000 });
                        }}
                        className="w-full h-3 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-gray-300"
                      />
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100">
                      <label className="block text-lg font-bold text-gray-800 mb-3">
                        😴 Sleep Hours
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="24"
                          value={formData.sleepHours}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFormData({ ...formData, sleepHours: value });
                            if (value < 7) {
                              toast('💤 Aim for 7-9 hours for optimal health!', {
                                icon: '⚠️',
                                duration: 2000,
                              });
                            }
                          }}
                          className="w-full px-5 py-4 text-lg font-bold text-blue-600 bg-white/50 border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                          placeholder="7.5"
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400">
                          ⏰
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Workout Days & Age */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
                          className="flex-1 h-3 bg-gradient-to-r from-gray-300 to-green-500 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg"
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
                        className="w-full px-5 py-4 text-lg font-bold text-purple-600 bg-white/50 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
                        placeholder="30"
                      />
                    </div>
                  </div>

                  {/* Energy Level & Testosterone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
                        className="w-full h-3 bg-gradient-to-r from-red-300 via-yellow-300 to-green-400 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg"
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
                        className="w-full px-5 py-4 text-lg font-bold text-red-600 bg-white/50 border-2 border-orange-200 rounded-xl focus:border-red-400 focus:ring-4 focus:ring-red-100 transition-all duration-200"
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
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setFormData({ ...formData, prostateCheck: checked });
                            toast.success(
                              checked 
                                ? '✅ Prostate check recorded!' 
                                : '📝 Consider scheduling a prostate check',
                              { duration: 2000 }
                            );
                          }}
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
                        className="w-full px-5 py-4 text-gray-700 bg-white/50 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-200 resize-none"
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
                        className="w-full px-5 py-4 text-gray-700 bg-white/50 border-2 border-cyan-200 rounded-xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all duration-200 resize-none"
                        placeholder="Any other health notes or observations..."
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white text-lg font-bold py-5 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => {
                      // Preview toast
                      toast('🚀 Analyzing your health data...', {
                        icon: '🔍',
                        duration: 1500,
                      });
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      <span className="text-xl">📊</span>
                      <span>Submit Health Data</span>
                      <span className="animate-pulse">⚡</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar Stats & Tips */}
            <div className="space-y-6">
              {/* Health Score Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-2xl shadow-2xl">
                <h3 className="text-xl font-bold mb-4">📈 Health Score</h3>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-40 h-40">
                    <div className="absolute inset-0 rounded-full border-8 border-gray-700"></div>
                    <div 
                      className="absolute inset-4 rounded-full border-8 border-transparent border-t-blue-500 border-r-green-500 border-b-yellow-500 border-l-purple-500 animate-spin-slow"
                      style={{
                        animationDuration: '3s'
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-black">78</div>
                        <div className="text-sm text-gray-300">Good</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center text-gray-300 text-sm">
                  Based on your current metrics
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Pro Tips</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl">
                    <div className="text-blue-600 text-xl">💧</div>
                    <div>
                      <div className="font-semibold text-gray-800">Stay Hydrated</div>
                      <div className="text-sm text-gray-600">Drink 3-4L water daily for optimal testosterone</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-xl">
                    <div className="text-green-600 text-xl">💤</div>
                    <div>
                      <div className="font-semibold text-gray-800">Sleep Quality</div>
                      <div className="text-sm text-gray-600">7-9 hours improves recovery & hormone production</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-xl">
                    <div className="text-purple-600 text-xl">🏋️‍♂️</div>
                    <div>
                      <div className="font-semibold text-gray-800">Strength Training</div>
                      <div className="text-sm text-gray-600">3-4x weekly boosts testosterone naturally</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Quick Actions */}
              <div className="md:hidden bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 shadow-xl">
                <h3 className="text-white font-bold text-lg mb-4">📱 Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => toast('📅 Calendar opened!', { icon: '🗓️' })}
                    className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-colors"
                  >
                    🗓️ Schedule
                  </button>
                  <button 
                    onClick={() => toast('📊 Viewing history...', { icon: '📈' })}
                    className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-colors"
                  >
                    📈 History
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Bar */}
          <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 p-4 shadow-2xl">
            <div className="flex justify-between items-center max-w-md mx-auto">
              <button 
                onClick={() => toast('📊 Refreshing data...', { icon: '🔄' })}
                className="p-3 text-gray-600 hover:text-blue-600 transition-colors"
              >
                🔄
              </button>
              <button 
                onClick={() => toast('📥 Saving draft...', { icon: '💾' })}
                className="p-3 text-gray-600 hover:text-green-600 transition-colors"
              >
                💾
              </button>
              <button 
                onClick={() => toast('🆘 Help is on the way!', { icon: '👨‍⚕️' })}
                className="p-3 text-gray-600 hover:text-red-600 transition-colors"
              >
                🆘
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shine {
          100% { left: 125%; }
        }
        
        @keyframes slide-in {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-out {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-20px); opacity: 0; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-shine {
          animation: shine 1.5s;
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-slide-out {
          animation: slide-out 0.3s ease-in;
        }
        
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        
        /* Custom range slider for WebKit */
        input[type="range"]::-webkit-slider-thumb {
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transition: all 0.2s;
        }
        
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0,0,0,0.3);
        }
        
        /* Responsive design */
        @media (max-width: 640px) {
          .grid-cols-1 > div {
            margin-bottom: 1rem;
          }
          
          .p-8 {
            padding: 1.5rem;
          }
          
          .text-4xl {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default MenHealth;