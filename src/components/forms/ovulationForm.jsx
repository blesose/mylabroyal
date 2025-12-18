import React, { useState } from 'react';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import { 
  Calendar, 
  Droplets, 
  Thermometer, 
  Heart, 
  Brain, 
  Activity,
  Zap,
  Clock,
  Target,
  Egg,
  CalendarDays,
  Save,
  Sparkles,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  X,
  Info,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const OvulationForm = () => {
  const { dispatch, state } = useApp();
  const [formData, setFormData] = useState({
    cycleStart: '',
    cycleLength: 28,
    notes: '',
    symptoms: [],
    temperature: '',
    mucusConsistency: ''
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [predictedDates, setPredictedDates] = useState(null);
  const [activeTab, setActiveTab] = useState('basics');

  // Custom toast components
  const CustomSuccessToast = ({ message, description, icon }) => (
    <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-white/40 flex items-center gap-3">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
        {icon || <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-white" />}
      </div>
      <div>
        <p className="font-medium text-gray-800 text-sm sm:text-base">{message}</p>
        <p className="text-xs sm:text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={() => toast.dismiss()}
        className="ml-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      </button>
    </div>
  );

  const CustomErrorToast = ({ message, description }) => (
    <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-white/40 flex items-center gap-3">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-red-400 to-red-500 flex items-center justify-center">
        <AlertCircle className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
      </div>
      <div>
        <p className="font-medium text-gray-800 text-sm sm:text-base">{message}</p>
        <p className="text-xs sm:text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={() => toast.dismiss()}
        className="ml-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      </button>
    </div>
  );

  const CustomInfoToast = ({ message, description, icon }) => (
    <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-white/40 flex items-center gap-3">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center">
        {icon || <Info className="w-4 h-4 sm:w-6 sm:h-6 text-white" />}
      </div>
      <div>
        <p className="font-medium text-gray-800 text-sm sm:text-base">{message}</p>
        <p className="text-xs sm:text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={() => toast.dismiss()}
        className="ml-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      </button>
    </div>
  );

  const CustomWarningToast = ({ message, description }) => (
    <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-white/40 flex items-center gap-3">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
        <AlertTriangle className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
      </div>
      <div>
        <p className="font-medium text-gray-800 text-sm sm:text-base">{message}</p>
        <p className="text-xs sm:text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={() => toast.dismiss()}
        className="ml-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      </button>
    </div>
  );

  // Symptom options
  const symptomOptions = [
    { id: 'mucus', label: 'Egg-white mucus', icon: <Droplets className="w-4 h-4" /> },
    { id: 'pain', label: 'Ovulation pain', icon: <Activity className="w-4 h-4" /> },
    { id: 'libido', label: 'Increased libido', icon: <Heart className="w-4 h-4" /> },
    { id: 'energy', label: 'Energy boost', icon: <Zap className="w-4 h-4" /> },
    { id: 'mood', label: 'Mood changes', icon: <Brain className="w-4 h-4" /> },
    { id: 'breast', label: 'Breast tenderness', icon: <Heart className="w-4 h-4" /> },
  ];

  // Mucus consistency options
  const mucusOptions = [
    { value: 'dry', label: 'Dry', color: 'from-gray-300 to-gray-400' },
    { value: 'sticky', label: 'Sticky', color: 'from-yellow-300 to-amber-400' },
    { value: 'creamy', label: 'Creamy', color: 'from-white to-gray-200' },
    { value: 'eggwhite', label: 'Egg-white', color: 'from-blue-100 to-blue-200' },
  ];

  const calculateOvulation = () => {
    if (!formData.cycleStart) {
      toast.custom((t) => (
        <CustomWarningToast
          message="Missing Information"
          description="Please enter your cycle start date"
        />
      ), {
        duration: 3000,
        position: 'bottom-right',
      });
      return;
    }

    setIsCalculating(true);
    
    // Show calculating toast
    const calculatingToast = toast.loading('Calculating your fertility window...', {
      position: 'bottom-right',
    });
    
    // Simulate calculation
    setTimeout(() => {
      const startDate = new Date(formData.cycleStart);
      const cycleLength = parseInt(formData.cycleLength);
      
      // Calculate ovulation (typically 14 days before next period)
      const nextPeriod = new Date(startDate);
      nextPeriod.setDate(startDate.getDate() + cycleLength);
      
      const ovulationDate = new Date(nextPeriod);
      ovulationDate.setDate(nextPeriod.getDate() - 14);
      
      // Fertile window (5 days before ovulation)
      const fertileStart = new Date(ovulationDate);
      fertileStart.setDate(ovulationDate.getDate() - 5);
      
      setPredictedDates({
        fertileWindow: {
          start: fertileStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          end: ovulationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        },
        ovulationDay: ovulationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' }),
        nextPeriod: nextPeriod.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })
      });
      
      setIsCalculating(false);
      setShowResults(true);
      
      // Dismiss loading toast
      toast.dismiss(calculatingToast);
      
      // Show success toast
      toast.custom((t) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-white/40 flex items-center gap-3"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
            <Target className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-800 text-sm sm:text-base">Ovulation calculated!</p>
            <p className="text-xs sm:text-sm text-gray-600">View your fertility window below</p>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="ml-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </button>
        </motion.div>
      ), {
        duration: 4000,
        position: 'bottom-right',
      });
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.cycleStart) {
      toast.custom((t) => (
        <CustomWarningToast
          message="Validation Error"
          description="Please enter your cycle start date"
        />
      ), {
        duration: 3000,
        position: 'bottom-right',
      });
      return;
    }

    try {
      // Show loading toast
      const loadingToast = toast.loading('Saving ovulation data...', {
        position: 'bottom-right',
      });

      dispatch({ type: 'SET_LOADING', payload: true });

      const user = JSON.parse(localStorage.getItem('user'));
      const ovulationData = {
        userId: user._id,
        cycleStart: formData.cycleStart,
        cycleLength: parseInt(formData.cycleLength),
        notes: formData.notes,
        symptoms: formData.symptoms,
        temperature: formData.temperature,
        mucusConsistency: formData.mucusConsistency
      };

      const response = await apiService.createOvulationEntry(ovulationData);
      console.log('Ovulation saved:', response);

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success toast
      toast.custom((t) => (
        <CustomSuccessToast
          message="Ovulation data saved!"
          description="Your fertility insights have been recorded"
          icon={<CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-white" />}
        />
      ), {
        duration: 4000,
        position: 'bottom-right',
      });

      // Reset form
      setFormData({
        cycleStart: '',
        cycleLength: 28,
        notes: '',
        symptoms: [],
        temperature: '',
        mucusConsistency: ''
      });
      setShowResults(false);
      setActiveTab('basics');
      
    } catch (error) {
      console.error('Error saving ovulation data:', error);
      
      // Show error toast
      toast.custom((t) => (
        <CustomErrorToast
          message="Failed to save ovulation data"
          description="Please check your connection and try again"
        />
      ), {
        duration: 5000,
        position: 'bottom-right',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const toggleSymptom = (symptomId) => {
    const isAdding = !formData.symptoms.includes(symptomId);
    setFormData(prev => ({
      ...prev,
      symptoms: isAdding
        ? [...prev.symptoms, symptomId]
        : prev.symptoms.filter(id => id !== symptomId)
    }));
    
    // Show quick feedback
    if (isAdding) {
      const symptomLabel = symptomOptions.find(s => s.id === symptomId)?.label || 'symptom';
      toast.success(`Added "${symptomLabel}"`, {
        duration: 2000,
        position: 'bottom-right',
        icon: '✅',
      });
    }
  };

  // Show toast when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    const tabLabels = {
      'basics': 'Cycle Information',
      'symptoms': 'Symptoms & Observations',
      'results': 'Fertility Window'
    };
    
    if (tab !== activeTab) {
      toast.success(`Now viewing: ${tabLabels[tab]}`, {
        duration: 1500,
        position: 'bottom-right',
        icon: '📝',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          success: {
            style: {
              background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
              border: '1px solid #10B981',
            },
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
              border: '1px solid #EF4444',
            },
          },
          loading: {
            style: {
              background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
              border: '1px solid #0EA5E9',
            },
          },
        }}
      />
      
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-2xl sm:blur-3xl"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 blur-2xl sm:blur-3xl"
          animate={{ 
            x: [0, -15, 0],
            y: [0, 20, 0]
          }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Ovulation Tracking
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base flex items-center gap-2">
              <Target className="w-4 h-4" />
              Track your fertile window and ovulation symptoms
            </p>
          </div>
          
          <div className="mt-2 sm:mt-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-100 to-purple-100">
            <Egg className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-pink-700">Fertility Insights</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {['basics', 'symptoms', 'results'].map(tab => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 sm:flex-none px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'basics' && <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Basics</span>}
              {tab === 'symptoms' && <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> Symptoms</span>}
              {tab === 'results' && <span className="flex items-center gap-2"><Target className="w-4 h-4" /> Results</span>}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit} 
        className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-white/40 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {/* Basics Tab */}
          {activeTab === 'basics' && (
            <motion.div
              key="basics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 sm:p-6 md:p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Cycle Start Date */}
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-gradient-to-br from-pink-50/80 to-rose-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-pink-200"
                >
                  <label className="block text-sm font-semibold text-pink-800 mb-3 sm:mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    Cycle Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.cycleStart}
                    onChange={(e) => setFormData({ ...formData, cycleStart: e.target.value })}
                    className="w-full px-3 sm:px-4 md:px-5 py-3 sm:py-4 border-2 border-pink-300 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all bg-white/80 text-pink-700 text-sm sm:text-base"
                  />
                  <p className="text-xs sm:text-sm text-pink-600 mt-3">
                    Enter the first day of your last menstrual period
                  </p>
                </motion.div>

                {/* Cycle Length */}
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-gradient-to-br from-purple-50/80 to-violet-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-purple-200"
                >
                  <label className="block text-sm font-semibold text-purple-800 mb-3 sm:mb-4 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />
                    Cycle Length (days)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="20"
                      max="40"
                      value={formData.cycleLength}
                      onChange={(e) => setFormData({ ...formData, cycleLength: e.target.value })}
                      className="w-full px-3 sm:px-4 md:px-5 py-3 sm:py-4 border-2 border-purple-300 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all bg-white/80 text-purple-700 text-sm sm:text-base"
                      placeholder="28"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-purple-600 mt-3">
                    Typical range: 21-35 days (Average: 28)
                  </p>
                </motion.div>
              </div>

              {/* Calculate Button */}
              <div className="mt-6 sm:mt-8">
                <motion.button
                  type="button"
                  onClick={calculateOvulation}
                  disabled={!formData.cycleStart || isCalculating}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-pink-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isCalculating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Target className="w-5 h-5" />
                      Calculate Fertility Window
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Symptoms Tab */}
          {activeTab === 'symptoms' && (
            <motion.div
              key="symptoms"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 sm:p-6 md:p-8"
            >
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-pink-500" />
                  Ovulation Symptoms
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Select any symptoms you're experiencing ({formData.symptoms.length} selected)
                </p>
              </div>

              {/* Symptom Selection */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {symptomOptions.map(symptom => {
                  const isSelected = formData.symptoms.includes(symptom.id);
                  return (
                    <motion.button
                      key={symptom.id}
                      type="button"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2 sm:gap-3 ${
                        isSelected
                          ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 shadow-lg'
                          : 'border-gray-200 hover:border-pink-300 hover:bg-gray-50/80'
                      }`}
                    >
                      <div className={`p-2 sm:p-3 rounded-lg ${
                        isSelected
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {symptom.icon}
                      </div>
                      <span className={`font-medium text-xs sm:text-sm text-center ${
                        isSelected ? 'text-pink-700' : 'text-gray-700'
                      }`}>
                        {symptom.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Mucus Consistency */}
              <div className="mb-6 sm:mb-8">
                <h4 className="font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  Cervical Mucus Consistency
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {mucusOptions.map(option => (
                    <motion.button
                      key={option.value}
                      type="button"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setFormData({ ...formData, mucusConsistency: option.value });
                        toast.success(`Selected: ${option.label} mucus`, {
                          duration: 1500,
                          position: 'bottom-right',
                          icon: '💧',
                        });
                      }}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                        formData.mucusConsistency === option.value
                          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50/80'
                      }`}
                    >
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${option.value === 'eggwhite' ? 'animate-pulse' : ''} ${option.color}`} />
                      <span className="font-medium text-xs sm:text-sm text-gray-700">
                        {option.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
                  Additional Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows="3"
                  className="w-full px-3 sm:px-4 md:px-5 py-3 sm:py-4 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all resize-none bg-white/80 text-sm sm:text-base"
                  placeholder="Any other observations, basal body temperature readings, or patterns you've noticed..."
                />
              </div>
            </motion.div>
          )}

          {/* Results Tab */}
          {activeTab === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 sm:p-6 md:p-8"
            >
              {showResults && predictedDates ? (
                <>
                  <div className="mb-6 sm:mb-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                      <Egg className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                      Fertility Window Calculated
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Based on your cycle data
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {/* Fertile Window */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-pink-200"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-pink-500" />
                        <h4 className="font-semibold text-pink-700">Fertile Window</h4>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-pink-800 mb-1">
                        {predictedDates.fertileWindow.start} - {predictedDates.fertileWindow.end}
                      </div>
                      <p className="text-xs sm:text-sm text-pink-600">
                        Most likely to conceive
                      </p>
                    </motion.div>

                    {/* Ovulation Day */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-purple-200"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-5 h-5 text-purple-500" />
                        <h4 className="font-semibold text-purple-700">Ovulation Day</h4>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-purple-800 mb-1">
                        {predictedDates.ovulationDay}
                      </div>
                      <p className="text-xs sm:text-sm text-purple-600">
                        Peak fertility
                      </p>
                    </motion.div>

                    {/* Next Period */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-blue-200"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <h4 className="font-semibold text-blue-700">Next Period</h4>
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-blue-800 mb-1">
                        {predictedDates.nextPeriod}
                      </div>
                      <p className="text-xs sm:text-sm text-blue-600">
                        Expected start date
                      </p>
                    </motion.div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                    <Target className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                    No Data Calculated Yet
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base mb-6">
                    Go to the Basics tab to enter your cycle information
                  </p>
                  <motion.button
                    type="button"
                    onClick={() => {
                      handleTabChange('basics');
                      toast.success('Switched to Cycle Information', {
                        duration: 1500,
                        position: 'bottom-right',
                        icon: '📋',
                      });
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Enter Cycle Data
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <div className="p-4 sm:p-6 md:p-8 border-t border-gray-200/80 bg-gradient-to-r from-gray-50/50 to-white/50">
          <motion.button
            type="submit"
            disabled={state.loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-pink-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {state.loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging Data...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Ovulation Data
              </>
            )}
          </motion.button>
        </div>
      </motion.form>

      {/* Information Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 sm:mt-6 md:mt-8 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-blue-200/80"
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-blue-800 mb-2 sm:mb-3">About Ovulation Tracking</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-blue-700/80">
              <li className="flex items-start gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-blue-600" />
                </div>
                Ovulation typically occurs 12-16 days before your next period
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-blue-600" />
                </div>
                Fertile window is usually 5 days before ovulation through ovulation day
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-blue-600" />
                </div>
                Track symptoms like egg-white cervical mucus for better predictions
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OvulationForm;