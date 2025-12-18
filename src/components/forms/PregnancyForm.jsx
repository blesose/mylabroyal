import React, { useState } from 'react';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import { 
  Baby, 
  Calendar, 
  Heart, 
  AlertCircle, 
  CheckCircle,
  Save,
  Sparkles,
  Activity,
  Brain,
  Thermometer,
  Wind,
  Moon,
  Star,
  ChevronRight,
  X,
  Clock,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const PregnancyForm = () => {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    week: '',
    notes: ''
  });
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [activeEmotion, setActiveEmotion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [energyLevel, setEnergyLevel] = useState(5);

  // Custom toast components
  const CustomSuccessToast = ({ message, description }) => (
    <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-white/40 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center">
        <Baby className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="font-medium text-gray-800">{message}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={() => toast.dismiss()}
        className="ml-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );

  const CustomErrorToast = ({ message, description }) => (
    <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-white/40 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-400 to-red-500 flex items-center justify-center">
        <AlertCircle className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="font-medium text-gray-800">{message}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={() => toast.dismiss()}
        className="ml-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );

  // Emotion options
  const emotionOptions = [
    { value: 'excited', label: 'Excited', emoji: '😊', icon: <Star className="w-5 h-5" />, color: 'from-yellow-400 to-orange-400' },
    { value: 'peaceful', label: 'Peaceful', emoji: '😌', icon: <Moon className="w-5 h-5" />, color: 'from-blue-300 to-blue-400' },
    { value: 'energetic', label: 'Energetic', emoji: '⚡', icon: <Zap className="w-5 h-5" />, color: 'from-green-400 to-emerald-500' },
    { value: 'tired', label: 'Tired', emoji: '😴', icon: <Moon className="w-5 h-5" />, color: 'from-gray-400 to-gray-500' },
    { value: 'anxious', label: 'Anxious', emoji: '😰', icon: <AlertCircle className="w-5 h-5" />, color: 'from-purple-300 to-purple-400' },
    { value: 'grateful', label: 'Grateful', emoji: '🥰', icon: <Heart className="w-5 h-5" />, color: 'from-pink-400 to-rose-500' }
  ];

  // Common pregnancy symptoms
  const symptomOptions = [
    { id: 'nausea', label: 'Morning Sickness', icon: '🤢' },
    { id: 'fatigue', label: 'Fatigue', icon: '😴' },
    { id: 'cravings', label: 'Food Cravings', icon: '🍕' },
    { id: 'mood', label: 'Mood Swings', icon: '🎭' },
    { id: 'backache', label: 'Back Pain', icon: '💆' },
    { id: 'swelling', label: 'Swelling', icon: '🦶' },
    { id: 'heartburn', label: 'Heartburn', icon: '🔥' },
    { id: 'movement', label: 'Baby Movement', icon: '👣' },
    { id: 'nesting', label: 'Nesting Instinct', icon: '🏠' },
    { id: 'breathless', label: 'Shortness of Breath', icon: '💨' }
  ];

  // Week milestones
  const weekMilestones = {
    1: "Conception",
    4: "Positive test possible",
    8: "Baby's organs developing",
    12: "First trimester complete",
    16: "Feel baby movements",
    20: "Halfway there!",
    24: "Viability milestone",
    28: "Third trimester begins",
    32: "Baby getting plump",
    36: "Almost full-term",
    40: "Due date!"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.week || formData.week < 1 || formData.week > 42) {
      toast.custom((t) => (
        <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-white/40">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-800 mb-1">Invalid Week</p>
              <p className="text-sm text-gray-600">Please enter a valid week between 1-42</p>
            </div>
          </div>
        </div>
      ), {
        duration: 3000,
        position: 'bottom-right',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const loadingToast = toast.loading('Saving your pregnancy progress...', {
        position: 'bottom-right',
      });

      dispatch({ type: 'SET_LOADING', payload: true });
      
      const submissionData = {
        week: parseInt(formData.week),
        notes: formData.notes,
        symptoms: selectedSymptoms,
        emotion: activeEmotion,
        energyLevel: energyLevel,
        timestamp: new Date().toISOString()
      };

      const result = await apiService.createPregnancy(submissionData);
      
      toast.dismiss(loadingToast);
      
      toast.custom((t) => (
        <CustomSuccessToast
          message={`Week ${formData.week} Progress Saved!`}
          description="Your pregnancy journey has been recorded"
        />
      ), {
        duration: 4000,
        position: 'bottom-right',
      });

      // Reset form
      setFormData({ week: '', notes: '' });
      setSelectedSymptoms([]);
      setActiveEmotion('');
      setEnergyLevel(5);
      
    } catch (error) {
      console.error('Error logging pregnancy data:', error);
      
      toast.custom((t) => (
        <CustomErrorToast
          message="Failed to save data"
          description="Please check your connection and try again"
        />
      ), {
        duration: 4000,
        position: 'bottom-right',
      });
    } finally {
      setIsSubmitting(false);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
    
    if (!selectedSymptoms.includes(symptomId)) {
      const symptom = symptomOptions.find(s => s.id === symptomId);
      toast.success(`Added: ${symptom?.label}`, {
        duration: 1500,
        position: 'bottom-right',
        icon: '📝',
      });
    }
  };

  const quickWeekSelect = (week) => {
    setFormData({ ...formData, week: week.toString() });
    
    const milestone = weekMilestones[week];
    if (milestone) {
      toast.custom((t) => (
        <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-white/40">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-1">Week {week} Selected</p>
              <p className="text-sm text-gray-600">{milestone}</p>
            </div>
          </div>
        </div>
      ), {
        duration: 3000,
        position: 'bottom-right',
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 md:px-6">
      <Toaster 
        position="bottom-right"
        toastOptions={{
          success: {
            style: {
              background: 'linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)',
              border: '1px solid #EC4899',
            },
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
              border: '1px solid #EF4444',
            },
          },
        }}
      />
      
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-2xl sm:blur-3xl"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-2xl sm:blur-3xl"
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
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Pregnancy Journey
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base flex items-center gap-2">
              <Baby className="w-4 h-4" />
              Track your weekly progress and symptoms
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100">
            <Heart className="w-4 h-4 text-pink-600" />
            <span className="text-sm font-medium text-pink-700">Growing Together</span>
          </div>
        </div>
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit} 
        className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-white/40 overflow-hidden"
      >
        {/* Quick Week Selection */}
        <div className="p-4 sm:p-6 md:p-8">
          <div className="mb-6 sm:mb-8">
            <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              Current Pregnancy Week *
            </label>
            
            <div className="mb-4 sm:mb-6">
              <input
                type="number"
                min="1"
                max="42"
                required
                value={formData.week}
                onChange={(e) => setFormData({ ...formData, week: e.target.value })}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-pink-300 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all bg-white/80 text-pink-700 text-base sm:text-lg"
                placeholder="Enter week (1-42)"
              />
              <p className="text-xs sm:text-sm text-pink-600 mt-2">
                Tap quick select buttons below or type your week
              </p>
            </div>

            {/* Quick Select Weeks */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[4, 8, 12, 16, 20, 24, 28, 32, 36, 40].map(week => (
                <motion.button
                  key={week}
                  type="button"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => quickWeekSelect(week)}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border-2 transition-all text-sm sm:text-base ${
                    formData.week === week.toString()
                      ? 'border-pink-500 bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                      : 'border-pink-200 hover:border-pink-300 hover:bg-pink-50 text-pink-700'
                  }`}
                >
                  Week {week}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Energy Level */}
          <div className="mb-6 sm:mb-8">
            <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              Energy Level
            </label>
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-gray-600">Low Energy</span>
                <span className="text-xs sm:text-sm text-gray-600">High Energy</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-red-300 via-yellow-300 to-green-400 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-center mt-2">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 text-sm font-medium">
                  {energyLevel}/10
                </span>
              </div>
            </div>
          </div>

          {/* Emotions */}
          <div className="mb-6 sm:mb-8">
            <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              How are you feeling today?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
              {emotionOptions.map(emotion => (
                <motion.button
                  key={emotion.value}
                  type="button"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveEmotion(emotion.value);
                    toast.success(`Feeling: ${emotion.label}`, {
                      duration: 1500,
                      position: 'bottom-right',
                      icon: '❤️',
                    });
                  }}
                  className={`text-red-600 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                    activeEmotion === emotion.value
                      ? `border-pink-500 bg-gradient-to-r ${emotion.color} text-white shadow-lg`
                      : 'border-gray-200 hover:border-pink-300 hover:bg-gray-50/80'
                  }`}
                >
                  <span className="text-xl sm:text-2xl">{emotion.emoji}</span>
                  <span className="font-medium text-xs sm:text-sm">{emotion.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Symptoms */}
          <div className="mb-6 sm:mb-8">
            <label className="block text-sm sm:text-base font-semibold text-charcoal-grey mb-3 sm:mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
              Symptoms ({selectedSymptoms.length} selected)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
              {symptomOptions.map(symptom => {
                const isSelected = selectedSymptoms.includes(symptom.id);
                return (
                  <motion.button
                    key={symptom.id}
                    type="button"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`text-fuchsia-600 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                      isSelected
                        ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-rose-50 shadow-lg'
                        : 'border-gray-200 hover:border-pink-300 hover:bg-gray-50/80'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl">{symptom.icon}</span>
                    <span className="font-medium text-xs sm:text-sm text-center">{symptom.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6 sm:mb-8">
            <label className="block text-sm sm:text-base font-semibold text-charcoal-grey mb-3 sm:mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              Notes & Reflections
            </label>
            <div className="relative">
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows="4"
                className="text-charcoal-grey w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all resize-none bg-white/80 text-sm sm:text-base"
                placeholder="How are you feeling this week? Any special moments, cravings, or thoughts you want to remember..."
              />
              <div className="absolute bottom-3 right-3 text-xs sm:text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                {formData.notes.length}/500
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Record special moments, baby movements, or any reflections
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="p-4 sm:p-6 md:p-8 border-t border-gray-200/80 bg-gradient-to-r from-gray-50/50 to-white/50">
          <motion.button
            type="submit"
            disabled={isSubmitting || !formData.week}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-pink-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving Journey...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Pregnancy Progress
              </>
            )}
          </motion.button>
          
          <p className="text-xs sm:text-sm text-gray-500 mt-3 text-center">
            Your journey is saved securely and can be reviewed anytime
          </p>
        </div>
      </motion.form>

      {/* Milestone Tracker */}
      {formData.week && weekMilestones[parseInt(formData.week)] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 sm:mt-6 md:mt-8 bg-gradient-to-r from-yellow-50/80 to-amber-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-amber-200/80"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-amber-800 mb-2 sm:mb-3">
                Week {formData.week} Milestone
              </h3>
              <p className="text-xs sm:text-sm text-amber-700/80">
                {weekMilestones[parseInt(formData.week)]}
              </p>
              <div className="mt-3">
                <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(parseInt(formData.week) / 40) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-amber-600">
                  <span>Week 1</span>
                  <span>Week {formData.week}</span>
                  <span>Week 40</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tips Card */}
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
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-blue-800 mb-2 sm:mb-3">
              Pregnancy Tracking Tips
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-blue-700/80">
              <li className="flex items-start gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-blue-600" />
                </div>
                Track weekly to notice patterns and changes
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-blue-600" />
                </div>
                Note baby movements and when you first feel them
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-blue-600" />
                </div>
                Share your log with healthcare providers
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PregnancyForm;