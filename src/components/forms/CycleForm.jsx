import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import { SYMPTOMS_LIST, FLOW_LEVELS } from '../../utils/constants';
import { 
  Calendar, 
  Heart, 
  Zap, 
  Thermometer, 
  Droplets, 
  Moon, 
  Sun, 
  Cloud, 
  Wind, 
  AlertCircle,
  Save,
  X,
  ChevronRight,
  ChevronLeft,
  Clock,
  CheckCircle,
  Brain,
  Pill,
  Activity,
  ThermometerSun,
  Edit3,
  Info,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const CycleForm = ({ 
  initialData = null, 
  onSuccess, 
  onCancel,
  mode = 'create'
}) => {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    flowLevel: 'medium',
    symptoms: [],
    notes: '',
    mood: 'neutral',
    energyLevel: 'medium',
    crampsIntensity: 'none',
    flowConsistency: 'normal'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeSection, setActiveSection] = useState('dates');
  const [savedData, setSavedData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        startDate: initialData.startDate || '',
        endDate: initialData.endDate || '',
        symptoms: initialData.symptoms || []
      }));
    }
  }, [initialData]);

  useEffect(() => {
    if (initialData) {
      const hasChanges = JSON.stringify(formData) !== JSON.stringify({
        ...initialData,
        startDate: initialData.startDate || '',
        endDate: initialData.endDate || '',
        symptoms: initialData.symptoms || []
      });
      setHasUnsavedChanges(hasChanges);
    }
  }, [formData, initialData]);

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const cycleLength = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      
      if (cycleLength > 0) {
        setFormData(prev => ({ ...prev, cycleLength }));
      }
    }
  }, [formData.startDate, formData.endDate]);

  const symptomCategories = {
    'Physical': [
      'cramps', 'headache', 'bloating', 'back pain', 'breast tenderness',
      'acne', 'food cravings', 'fatigue', 'nausea', 'dizziness'
    ],
    'Emotional': [
      'mood swings', 'irritability', 'anxiety', 'depression', 'emotional',
      'clumsiness', 'forgetfulness', 'insomnia', 'libido changes'
    ],
    'Digestive': [
      'constipation', 'diarrhea', 'appetite changes', 'weight gain'
    ]
  };

  const flowLevelDescriptions = {
    light: 'Light - Minimal flow, 1-2 pads/tampons per day',
    medium: 'Medium - Regular flow, 3-4 pads/tampons per day',
    heavy: 'Heavy - Heavy flow, 5+ pads/tampons per day'
  };

  const flowLevelIcons = {
    light: <Droplets className="w-4 h-4 sm:w-5 sm:h-5" />,
    medium: <Droplets className="w-4 h-4 sm:w-5 sm:h-5" />,
    heavy: <Droplets className="w-4 h-4 sm:w-5 sm:h-5" />
  };

  const moodOptions = [
    { value: 'very-happy', label: 'Very Happy', emoji: '😄', icon: <Sun className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-yellow-400 to-orange-400' },
    { value: 'happy', label: 'Happy', emoji: '😊', icon: <Sun className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-yellow-300 to-orange-300' },
    { value: 'neutral', label: 'Neutral', emoji: '😐', icon: <Cloud className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-gray-300 to-gray-400' },
    { value: 'sad', label: 'Sad', emoji: '😔', icon: <Cloud className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-blue-300 to-blue-400' },
    { value: 'very-sad', label: 'Very Sad', emoji: '😢', icon: <Wind className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-blue-400 to-blue-500' },
    { value: 'anxious', label: 'Anxious', emoji: '😰', icon: <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-purple-300 to-purple-400' },
    { value: 'irritable', label: 'Irritable', emoji: '😠', icon: <ThermometerSun className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-red-300 to-red-400' }
  ];

  const energyLevels = [
    { value: 'very-high', label: 'Very High', icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-green-400 to-emerald-500' },
    { value: 'high', label: 'High', icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-green-300 to-emerald-400' },
    { value: 'medium', label: 'Medium', icon: <Activity className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-yellow-300 to-amber-400' },
    { value: 'low', label: 'Low', icon: <Activity className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-orange-300 to-orange-400' },
    { value: 'very-low', label: 'Very Low', icon: <Moon className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-red-300 to-red-400' }
  ];

  const crampsIntensities = [
    { value: 'none', label: 'No Cramps', intensity: 0, icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-green-300 to-green-400' },
    { value: 'mild', label: 'Mild', intensity: 1, icon: <Thermometer className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-yellow-300 to-yellow-400' },
    { value: 'moderate', label: 'Moderate', intensity: 2, icon: <Thermometer className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-orange-300 to-orange-400' },
    { value: 'severe', label: 'Severe', intensity: 3, icon: <Thermometer className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-red-300 to-red-400' },
    { value: 'debilitating', label: 'Debilitating', intensity: 4, icon: <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'from-red-400 to-red-500' }
  ];

  const symptomIcons = {
    'cramps': <Activity className="w-3 h-3 sm:w-4 sm:h-4" />,
    'headache': <Brain className="w-3 h-3 sm:w-4 sm:h-4" />,
    'bloating': <Wind className="w-3 h-3 sm:w-4 sm:h-4" />,
    'back pain': <Activity className="w-3 h-3 sm:w-4 sm:h-4" />,
    'breast tenderness': <Heart className="w-3 h-3 sm:w-4 sm:h-4" />,
    'acne': <Wind className="w-3 h-3 sm:w-4 sm:h-4" />,
    'food cravings': <Pill className="w-3 h-3 sm:w-4 sm:h-4" />,
    'fatigue': <Moon className="w-3 h-3 sm:w-4 sm:h-4" />,
    'nausea': <Wind className="w-3 h-3 sm:w-4 sm:h-4" />,
    'dizziness': <Wind className="w-3 h-3 sm:w-4 sm:h-4" />,
    'mood swings': <Brain className="w-3 h-3 sm:w-4 sm:h-4" />,
    'irritability': <ThermometerSun className="w-3 h-3 sm:w-4 sm:h-4" />,
    'anxiety': <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />,
    'depression': <Cloud className="w-3 h-3 sm:w-4 sm:h-4" />,
    'emotional': <Brain className="w-3 h-3 sm:w-4 sm:h-4" />,
    'clumsiness': <Activity className="w-3 h-3 sm:w-4 sm:h-4" />,
    'forgetfulness': <Brain className="w-3 h-3 sm:w-4 sm:h-4" />,
    'insomnia': <Moon className="w-3 h-3 sm:w-4 sm:h-4" />,
    'libido changes': <Heart className="w-3 h-3 sm:w-4 sm:h-4" />,
    'constipation': <Wind className="w-3 h-3 sm:w-4 sm:h-4" />,
    'diarrhea': <Wind className="w-3 h-3 sm:w-4 sm:h-4" />,
    'appetite changes': <Pill className="w-3 h-3 sm:w-4 sm:h-4" />,
    'weight gain': <Activity className="w-3 h-3 sm:w-4 sm:h-4" />
  };

  const CustomSuccessToast = ({ message, description }) => (
    <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-white/40 flex items-center gap-3">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
        <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
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

  const CustomInfoToast = ({ message, description }) => (
    <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-white/40 flex items-center gap-3">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center">
        <Info className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      
      if (end < start) {
        newErrors.endDate = 'End date cannot be before start date';
      }

      const cycleLength = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      if (cycleLength > 14) {
        newErrors.endDate = 'Cycle length seems unusually long. Please verify dates.';
      }

      if (cycleLength < 1) {
        newErrors.endDate = 'Cycle must be at least 1 day long';
      }
    }

    if (!formData.flowLevel) {
      newErrors.flowLevel = 'Flow level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      toast.custom((t) => (
        <CustomWarningToast
          message="Form Validation Error"
          description="Please check the highlighted fields and try again."
        />
      ), {
        duration: 4000,
        position: isMobile ? 'top-center' : 'bottom-right',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const submissionData = {
        startDate: formData.startDate,
        endDate: formData.endDate,
        flowLevel: formData.flowLevel,
        symptoms: formData.symptoms,
        ...(formData.notes && { notes: formData.notes }),
        ...(formData.mood && { mood: formData.mood }),
        ...(formData.energyLevel && { energyLevel: formData.energyLevel }),
        ...(formData.crampsIntensity && { crampsIntensity: formData.crampsIntensity }),
        ...(formData.flowConsistency && { flowConsistency: formData.flowConsistency })
      };

      const result = await apiService.addCycleData(submissionData);
      setSavedData(submissionData);
      
      dispatch({ 
        type: 'ADD_CYCLE_DATA', 
        payload: { ...submissionData, id: result.id || Date.now() } 
      });

      toast.custom((t) => (
        <CustomSuccessToast
          message={mode === 'create' ? 'Cycle data saved successfully!' : 'Cycle data updated successfully!'}
          description="Your cycle has been logged and saved to your records."
        />
      ), {
        duration: 4000,
        position: isMobile ? 'top-center' : 'bottom-right',
      });

      if (mode === 'create') {
        setFormData({
          startDate: '',
          endDate: '',
          flowLevel: 'medium',
          symptoms: [],
          notes: '',
          mood: 'neutral',
          energyLevel: 'medium',
          crampsIntensity: 'none',
          flowConsistency: 'normal'
        });
        setHasUnsavedChanges(false);
        setSavedData(submissionData);
      }

      onSuccess?.(result);
    } catch (error) {
      console.error('Error saving cycle data:', error);
      
      toast.custom((t) => (
        <CustomErrorToast
          message="Failed to save cycle data"
          description="Please check your connection and try again."
        />
      ), {
        duration: 5000,
        position: isMobile ? 'top-center' : 'bottom-right',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSymptomToggle = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
    
    const isNowSelected = !formData.symptoms.includes(symptom);
    if (isNowSelected) {
      toast.success(`Added "${symptom}" to symptoms`, {
        duration: 2000,
        position: isMobile ? 'top-center' : 'bottom-right',
        icon: '✅',
      });
    }
  };

  const handleQuickDateSelect = (days) => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - days + 1);
    
    const endDate = new Date(today);
    
    setFormData(prev => ({
      ...prev,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    }));
    
    toast.custom((t) => (
      <CustomInfoToast
        message="Dates Updated"
        description={`Quick dates selected for ${days}-day cycle`}
      />
    ), {
      duration: 2000,
      position: isMobile ? 'top-center' : 'bottom-right',
    });
  };

  const getSelectedSymptomsCount = (category) => {
    return symptomCategories[category].filter(symptom => 
      formData.symptoms.includes(symptom)
    ).length;
  };

  const isSymptomSelected = (symptom) => {
    return formData.symptoms.includes(symptom);
  };

  const steps = ['dates', 'flow', 'symptoms', 'details', 'review'];

  const handleSectionChange = (newSection) => {
    setActiveSection(newSection);
    
    const sectionLabels = {
      'dates': 'Cycle Dates',
      'flow': 'Flow Level',
      'symptoms': 'Symptoms',
      'details': 'Details & Notes',
      'review': 'Review & Save'
    };
    
    if (newSection !== 'review') {
      toast.success(`Now editing: ${sectionLabels[newSection]}`, {
        duration: 1500,
        position: isMobile ? 'top-center' : 'bottom-right',
        icon: '📝',
      });
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      toast.custom((t) => (
        <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-white/40 max-w-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-500 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-gray-800 mb-2">Unsaved Changes</p>
              <p className="text-sm text-gray-600 mb-3">You have unsaved changes. Are you sure you want to cancel?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    onCancel?.();
                  }}
                  className="flex-1 px-3 py-2 text-sm bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                >
                  Yes, Cancel
                </button>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="flex-1 px-3 py-2 text-sm bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg hover:shadow-lg transition-shadow"
                >
                  Continue Editing
                </button>
              </div>
            </div>
          </div>
        </div>
      ), {
        duration: 6000,
        position: isMobile ? 'top-center' : 'bottom-right',
      });
    } else {
      onCancel?.();
    }
  };

  return (
    <div className="max-w-5xl mx-auto relative px-3 sm:px-4 md:px-6">
      <Toaster 
        position={isMobile ? "top-center" : "bottom-right"} 
        containerStyle={{
          top: isMobile ? '20px' : 'auto',
          bottom: isMobile ? 'auto' : '20px',
        }}
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
        }}
      />
      
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-pink-500/10 to-rose-500/10 blur-2xl sm:blur-3xl"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-2xl sm:blur-3xl"
          animate={{ 
            x: [0, -15, 0],
            y: [0, 20, 0]
          }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        />
      </div>

      {/* Progress Steps - Mobile Optimized */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6 md:mb-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              {mode === 'create' ? 'Log Menstrual Cycle' : 'Edit Cycle'}
            </h2>
            <p className="text-gray-600 mt-1 text-xs sm:text-sm flex items-center gap-1">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              Track your cycle, symptoms, and patterns
            </p>
          </div>
          
          {hasUnsavedChanges && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-xs sm:text-sm"
            >
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-medium text-amber-700">Unsaved</span>
            </motion.div>
          )}
        </div>

        {/* Mobile Step Indicator */}
        {isMobile ? (
          <div className="mb-4">
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/40">
              <button
                onClick={() => {
                  const currentIndex = steps.indexOf(activeSection);
                  if (currentIndex > 0) {
                    handleSectionChange(steps[currentIndex - 1]);
                  }
                }}
                disabled={activeSection === 'dates'}
                className={`p-2 rounded-lg ${activeSection === 'dates' ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1">
                  {steps.map((step, index) => (
                    <div
                      key={step}
                      className={`w-1.5 h-1.5 rounded-full ${
                        activeSection === step 
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500' 
                          : index < steps.indexOf(activeSection) 
                            ? 'bg-gradient-to-r from-pink-300 to-rose-300'
                            : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium capitalize text-pink-600">
                  {activeSection}
                </span>
              </div>
              
              <button
                onClick={() => {
                  const currentIndex = steps.indexOf(activeSection);
                  if (currentIndex < steps.length - 1) {
                    handleSectionChange(steps[currentIndex + 1]);
                  }
                }}
                disabled={activeSection === 'review'}
                className={`p-2 rounded-lg ${activeSection === 'review' ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
            <div className="flex items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step}>
                  <motion.button
                    onClick={() => handleSectionChange(step)}
                    className={`flex flex-col items-center ${index <= 3 ? 'cursor-pointer' : 'cursor-default'}`}
                    whileHover={index <= 3 ? { scale: 1.05 } : {}}
                  >
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${
                      activeSection === step 
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg scale-110' 
                        : index <= 3 
                          ? 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-500 hover:from-gray-200 hover:to-gray-300'
                          : 'bg-gray-100 text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`mt-1 sm:mt-2 text-xs font-medium capitalize hidden sm:block ${
                      activeSection === step ? 'text-pink-600' : 'text-gray-500'
                    }`}>
                      {step}
                    </span>
                  </motion.button>
                  {index < 4 && (
                    <div className={`w-8 sm:w-12 md:w-16 h-1 mx-1 sm:mx-2 ${
                      index < 3 ? 'bg-gradient-to-r from-pink-200 to-rose-200' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit} 
        className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-2xl border border-white/40 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {activeSection === 'dates' && (
            <motion.div
              key="dates"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 sm:p-6 md:p-8"
            >
              <div className="mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  Quick Date Selection
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {[
                    { label: '3-day', days: 3, icon: '📅' },
                    { label: '5-day', days: 5, icon: '📆' },
                    { label: '7-day', days: 7, icon: '🗓️' },
                    { label: 'Yesterday', days: 1, icon: '⏱️' }
                  ].map(option => (
                    <motion.button
                      key={option.days}
                      type="button"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickDateSelect(option.days)}
                      className="p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl border-2 border-blue-200 hover:border-blue-300 hover:bg-white transition-all text-left group text-xs sm:text-sm"
                    >
                      <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{option.icon}</div>
                      <div className="font-medium text-blue-700 group-hover:text-blue-800">
                        {option.label}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-gradient-to-br from-pink-50/80 to-rose-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-pink-200"
                >
                  <label htmlFor="startDate" className="block text-xs sm:text-sm font-semibold text-pink-800 mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    Start Date *
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className={`w-full px-3 sm:px-4 md:px-5 py-3 sm:py-4 border-2 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all text-sm sm:text-base ${
                      errors.startDate 
                        ? 'border-red-300 bg-red-50 text-red-700' 
                        : 'border-pink-300 bg-white/80 text-pink-700'
                    }`}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.startDate && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1 sm:gap-2"
                    >
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      {errors.startDate}
                    </motion.p>
                  )}
                </motion.div>
                
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-gradient-to-br from-rose-50/80 to-pink-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-rose-200"
                >
                  <label htmlFor="endDate" className="block text-xs sm:text-sm font-semibold text-rose-800 mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    End Date *
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className={`w-full px-3 sm:px-4 md:px-5 py-3 sm:py-4 border-2 rounded-lg sm:rounded-xl focus:ring-2 sm:focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-sm sm:text-base ${
                      errors.endDate 
                        ? 'border-red-300 bg-red-50 text-red-700' 
                        : 'border-rose-300 bg-white/80 text-rose-700'
                    }`}
                    max={new Date().toISOString().split('T')[0]}
                    min={formData.startDate}
                  />
                  {errors.endDate && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1 sm:gap-2"
                    >
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      {errors.endDate}
                    </motion.p>
                  )}
                  {formData.startDate && formData.endDate && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 text-xs sm:text-sm font-medium text-pink-600 bg-white/60 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg inline-block"
                    >
                      Cycle length: {Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) + 1} days
                    </motion.p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeSection === 'flow' && (
            <motion.div
              key="flow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 sm:p-6 md:p-8"
            >
              <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">
                Flow Level *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {['light', 'medium', 'heavy'].map(level => (
                  <motion.button
                    key={level}
                    type="button"
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setFormData({ ...formData, flowLevel: level })}
                    className={`p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-left ${
                      formData.flowLevel === level
                        ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-pink-100 shadow-lg sm:shadow-xl shadow-pink-200/50'
                        : 'border-gray-200 hover:border-pink-300 hover:bg-gray-50/80'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
                        formData.flowLevel === level
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-500'
                      }`}>
                        {flowLevelIcons[level]}
                      </div>
                      <div className={`font-semibold capitalize text-base sm:text-lg ${
                        formData.flowLevel === level ? 'text-pink-700' : 'text-gray-700'
                      }`}>
                        {level}
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 opacity-90">
                      {flowLevelDescriptions[level]}
                    </div>
                  </motion.button>
                ))}
              </div>
              {errors.flowLevel && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 sm:mt-4 text-xs sm:text-sm text-red-600 flex items-center gap-1 sm:gap-2"
                >
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  {errors.flowLevel}
                </motion.p>
              )}
            </motion.div>
          )}

          {activeSection === 'symptoms' && (
            <motion.div
              key="symptoms"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 sm:p-6 md:p-8"
            >
              <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center justify-between">
                <span className="text-sm sm:text-base">Symptoms ({formData.symptoms.length} selected)</span>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs sm:text-sm font-medium hidden sm:block"
                >
                  Tap to select
                </motion.div>
              </label>
              
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                {Object.entries(symptomCategories).map(([category, symptoms]) => (
                  <motion.div 
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-white to-gray-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-gray-200/80"
                  >
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <h4 className="font-bold text-sm sm:text-base md:text-lg text-gray-800 flex items-center gap-1 sm:gap-2">
                        {category === 'Physical' && <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />}
                        {category === 'Emotional' && <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />}
                        {category === 'Digestive' && <Pill className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />}
                        {category}
                      </h4>
                      <span className="text-xs sm:text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                        {getSelectedSymptomsCount(category)} selected
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                      {symptoms.map(symptom => (
                        <motion.button
                          key={symptom}
                          type="button"
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSymptomToggle(symptom)}
                          className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 flex items-center gap-2 sm:gap-3 ${
                            isSymptomSelected(symptom)
                              ? 'border-pink-500 bg-gradient-to-r from-pink-50 to-rose-50 shadow-sm sm:shadow-lg'
                              : 'border-gray-200 hover:border-pink-300 hover:bg-white/80'
                          }`}
                        >
                          <div className={`p-1 sm:p-2 rounded-lg ${
                            isSymptomSelected(symptom)
                              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            {symptomIcons[symptom]}
                          </div>
                          <div className="font-medium capitalize text-xs sm:text-sm text-left truncate">
                            {symptom.split('-').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 sm:p-6 md:p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
                <motion.div whileHover={{ y: -3 }} className="space-y-3 sm:space-y-4">
                  <label className="block text-base sm:text-lg font-semibold text-gray-800">
                    Overall Mood
                  </label>
                  <div className="text-orange-500 space-y-2 sm:space-y-3">
                    {moodOptions.map(mood => (
                      <motion.button
                        key={mood.value}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, mood: mood.value })}
                        className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 flex items-center gap-2 sm:gap-3 ${
                          formData.mood === mood.value
                            ? `border-pink-500 bg-gradient-to-r ${mood.color} text-white shadow-lg`
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-1.5 sm:p-2 rounded-lg ${
                          formData.mood === mood.value
                            ? 'bg-white/20'
                            : 'bg-gray-100'
                        }`}>
                          {mood.icon}
                        </div>
                        <div className="font-medium text-left text-xs sm:text-sm">
                          {mood.label}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} className="space-y-3 sm:space-y-4">
                  <label className="block text-base sm:text-lg font-semibold text-gray-800">
                    Energy Level
                  </label>
                  <div className="text-green-700 space-y-2 sm:space-y-3">
                    {energyLevels.map(level => (
                      <motion.button
                        key={level.value}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, energyLevel: level.value })}
                        className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 flex items-center gap-2 sm:gap-3 ${
                          formData.energyLevel === level.value
                            ? `border-pink-500 bg-gradient-to-r ${level.color} text-white shadow-lg`
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-1.5 sm:p-2 rounded-lg ${
                          formData.energyLevel === level.value
                            ? 'bg-white/20'
                            : 'bg-gray-100'
                        }`}>
                          {level.icon}
                        </div>
                        <div className="font-medium text-left text-xs sm:text-sm">
                          {level.label}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} className="space-y-3 sm:space-y-4">
                  <label className="block text-base sm:text-lg font-semibold text-gray-800">
                    Cramps Intensity
                  </label>
                  <div className="text-red-600 space-y-2 sm:space-y-3">
                    {crampsIntensities.map(intensity => (
                      <motion.button
                        key={intensity.value}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, crampsIntensity: intensity.value })}
                        className={`w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 flex items-center gap-2 sm:gap-3 ${
                          formData.crampsIntensity === intensity.value
                            ? `border-pink-500 bg-gradient-to-r ${intensity.color} text-white shadow-lg`
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-1.5 sm:p-2 rounded-lg ${
                          formData.crampsIntensity === intensity.value
                            ? 'bg-white/20'
                            : 'bg-gray-100'
                        }`}>
                          {intensity.icon}
                        </div>
                        <div className="font-medium text-left text-xs sm:text-sm">
                          {intensity.label}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
                  <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                  Additional Notes
                </label>
                <div className="relative">
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows="3"
                    className="text-charcoal-grey w-full px-3 sm:px-4 md:px-5 py-3 sm:py-4 border-2 border-gray-300 rounded-lg sm:rounded-xl md:rounded-2xl focus:ring-2 sm:focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all resize-none bg-white/80 backdrop-blur-sm text-sm sm:text-base"
                    placeholder="Any other observations, medication taken, or specific patterns you noticed..."
                  />
                  <motion.div 
                    className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-xs sm:text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full"
                    animate={{ scale: formData.notes.length > 400 ? 1.1 : 1 }}
                  >
                    {formData.notes.length}/500
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="p-4 sm:p-6 md:p-8 border-t border-gray-200/80 bg-gradient-to-r from-gray-50/50 to-white/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              {activeSection !== 'dates' && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const currentIndex = steps.indexOf(activeSection);
                    if (currentIndex > 0) {
                      handleSectionChange(steps[currentIndex - 1]);
                    }
                  }}
                  className="flex-1 sm:flex-none px-4 py-3 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  Previous
                </motion.button>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              {activeSection !== 'review' ? (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const currentIndex = steps.indexOf(activeSection);
                    if (currentIndex < steps.length - 1) {
                      handleSectionChange(steps[currentIndex + 1]);
                    }
                  }}
                  className="flex-1 sm:flex-none px-4 py-3 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium hover:shadow-lg hover:shadow-pink-500/30 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Continue
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </motion.button>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  {onCancel && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCancel}
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-none px-4 py-3 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all disabled:opacity-50 text-sm sm:text-base"
                    >
                      Cancel
                    </motion.button>
                  )}
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-none px-4 py-3 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium hover:shadow-lg hover:shadow-pink-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {mode === 'create' ? 'Saving...' : 'Updating...'}
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                        {mode === 'create' ? 'Save Cycle' : 'Update'}
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.form>

      {/* Educational Tips Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 sm:mt-6 md:mt-8 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-blue-200/80"
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base md:text-xl font-bold text-blue-800 mb-2 sm:mb-3">Tracking Tips</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-blue-700/80">
              <li className="flex items-start gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-blue-600" />
                </div>
                Track consistently at the same time each day for accurate data
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-blue-600" />
                </div>
                Note any unusual symptoms or pattern changes
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-blue-600" />
                </div>
                Regular tracking helps predict future cycles and ovulation
              </li>
              <li className="flex items-start gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-blue-600" />
                </div>
                Share concerning patterns with your healthcare provider
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Success Preview */}
      <AnimatePresence>
        {savedData && mode === 'create' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 sm:mt-6 md:mt-8 bg-gradient-to-r from-green-50 to-emerald-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-emerald-200/80"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-800 text-sm sm:text-base">Cycle Data Saved!</h3>
                  <p className="text-xs sm:text-sm text-emerald-600">Your information has been recorded</p>
                </div>
              </div>
              <button
                onClick={() => setSavedData(null)}
                className="p-1 sm:p-2 hover:bg-white/50 rounded-full transition-colors"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-600" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              <div className="bg-white/60 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl">
                <div className="text-xs sm:text-sm text-emerald-600 mb-1">Cycle Length</div>
                <div className="font-bold text-emerald-800 text-base sm:text-lg md:text-xl">
                  {Math.ceil((new Date(savedData.endDate) - new Date(savedData.startDate)) / (1000 * 60 * 60 * 24)) + 1} days
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl">
                <div className="text-xs sm:text-sm text-emerald-600 mb-1">Flow Level</div>
                <div className="font-bold text-emerald-800 text-base sm:text-lg md:text-xl capitalize">
                  {savedData.flowLevel}
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl">
                <div className="text-xs sm:text-sm text-emerald-600 mb-1">Symptoms</div>
                <div className="font-bold text-emerald-800 text-base sm:text-lg md:text-xl">
                  {savedData.symptoms.length}
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl">
                <div className="text-xs sm:text-sm text-emerald-600 mb-1">Mood</div>
                <div className="font-bold text-emerald-800 text-base sm:text-lg md:text-xl capitalize truncate">
                  {savedData.mood.replace('-', ' ')}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CycleForm;
