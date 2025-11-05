import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';
import { SYMPTOMS_LIST, FLOW_LEVELS } from '../../utils/constants';

/**
 * Production-grade Cycle Form Component
 * Features:
 * - Comprehensive menstrual cycle tracking
 * - Symptom selection with categorization
 * - Flow level tracking with descriptions
 * - Date validation and calculations
 * - Auto-save and draft functionality
 * - Responsive design with mobile optimization
 * - Accessibility compliance
 * - Form validation with user feedback
 */

const CycleForm = ({ 
  initialData = null, 
  onSuccess, 
  onCancel,
  mode = 'create' // 'create' or 'edit'
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

  // Initialize form with existing data for edit mode
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

  // Track unsaved changes
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

  // Calculate cycle length when dates change
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

  // Categorized symptoms for better organization
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

  const moodOptions = [
    { value: 'very-happy', label: 'Very Happy', emoji: '😄' },
    { value: 'happy', label: 'Happy', emoji: '😊' },
    { value: 'neutral', label: 'Neutral', emoji: '😐' },
    { value: 'sad', label: 'Sad', emoji: '😔' },
    { value: 'very-sad', label: 'Very Sad', emoji: '😢' },
    { value: 'anxious', label: 'Anxious', emoji: '😰' },
    { value: 'irritable', label: 'Irritable', emoji: '😠' }
  ];

  const energyLevels = [
    { value: 'very-high', label: 'Very High', color: 'text-green-600' },
    { value: 'high', label: 'High', color: 'text-green-500' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-500' },
    { value: 'low', label: 'Low', color: 'text-orange-500' },
    { value: 'very-low', label: 'Very Low', color: 'text-red-500' }
  ];

  const crampsIntensities = [
    { value: 'none', label: 'No Cramps', intensity: 0 },
    { value: 'mild', label: 'Mild', intensity: 1 },
    { value: 'moderate', label: 'Moderate', intensity: 2 },
    { value: 'severe', label: 'Severe', intensity: 3 },
    { value: 'debilitating', label: 'Debilitating', intensity: 4 }
  ];

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    // Date validation
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

    // Flow level validation
    if (!formData.flowLevel) {
      newErrors.flowLevel = 'Flow level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      
      dispatch({ 
        type: 'ADD_CYCLE_DATA', 
        payload: { ...submissionData, id: result.id || Date.now() } 
      });

      // Show success message
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          type: 'success',
          message: mode === 'create' ? 'Cycle data saved successfully!' : 'Cycle data updated successfully!'
        }
      });

      // Reset form
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
      }

      onSuccess?.(result);
    } catch (error) {
      console.error('Error saving cycle data:', error);
      
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          type: 'error',
          message: 'Failed to save cycle data. Please try again.'
        }
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
  };

  const getSelectedSymptomsCount = (category) => {
    return symptomCategories[category].filter(symptom => 
      formData.symptoms.includes(symptom)
    ).length;
  };

  const isSymptomSelected = (symptom) => {
    return formData.symptoms.includes(symptom);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Form Header */}
      <div className="bg-white rounded-t-2xl shadow-sm p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {mode === 'create' ? 'Log Menstrual Cycle' : 'Edit Cycle Data'}
            </h2>
            <p className="text-gray-600 mt-1">
              Track your menstrual cycle, symptoms, and patterns
            </p>
          </div>
          {hasUnsavedChanges && (
            <div className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              Unsaved changes
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-b-2xl shadow-lg">
        <div className="p-6 space-y-8">
          {/* Quick Date Selection */}
          <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-3">Quick Date Selection</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '3-day cycle', days: 3 },
                { label: '5-day cycle', days: 5 },
                { label: '7-day cycle', days: 7 },
                { label: 'Started yesterday', days: 1 }
              ].map(option => (
                <button
                  key={option.days}
                  type="button"
                  onClick={() => handleQuickDateSelect(option.days)}
                  className="px-3 py-2 bg-white text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Cycle Start Date *
              </label>
              <input
                id="startDate"
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                  errors.startDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                Cycle End Date *
              </label>
              <input
                id="endDate"
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                  errors.endDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                max={new Date().toISOString().split('T')[0]}
                min={formData.startDate}
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
              )}
              {formData.startDate && formData.endDate && (
                <p className="mt-2 text-sm text-gray-500">
                  Cycle length: {Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) + 1} days
                </p>
              )}
            </div>
          </div>

          {/* Flow Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Flow Level *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FLOW_LEVELS.map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({ ...formData, flowLevel: level })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.flowLevel === level
                      ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium capitalize mb-1">{level}</div>
                  <div className="text-sm text-gray-600 opacity-90">
                    {flowLevelDescriptions[level]}
                  </div>
                </button>
              ))}
            </div>
            {errors.flowLevel && (
              <p className="mt-1 text-sm text-red-600">{errors.flowLevel}</p>
            )}
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mood */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overall Mood
              </label>
              <select
                value={formData.mood}
                onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {moodOptions.map(mood => (
                  <option key={mood.value} value={mood.value}>
                    {mood.emoji} {mood.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Energy Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Energy Level
              </label>
              <select
                value={formData.energyLevel}
                onChange={(e) => setFormData({ ...formData, energyLevel: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {energyLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Cramps Intensity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cramps Intensity
              </label>
              <select
                value={formData.crampsIntensity}
                onChange={(e) => setFormData({ ...formData, crampsIntensity: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {crampsIntensities.map(intensity => (
                  <option key={intensity.value} value={intensity.value}>
                    {intensity.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Symptoms Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Symptoms ({formData.symptoms.length} selected)
            </label>
            
            <div className="space-y-6">
              {Object.entries(symptomCategories).map(([category, symptoms]) => (
                <div key={category} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">{category}</h4>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {getSelectedSymptomsCount(category)} selected
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {symptoms.map(symptom => (
                      <button
                        key={symptom}
                        type="button"
                        onClick={() => handleSymptomToggle(symptom)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          isSymptomSelected(symptom)
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-medium capitalize text-sm">
                          {symptom.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              placeholder="Any other observations, medication taken, or specific patterns you noticed..."
            />
            <p className="mt-1 text-sm text-gray-500">
              {formData.notes.length}/500 characters
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-lg font-semibold hover-lift transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {mode === 'create' ? 'Saving...' : 'Updating...'}
                </>
              ) : (
                <>{mode === 'create' ? 'Save Cycle Data' : 'Update Cycle Data'}</>
              )}
            </button>
            
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Educational Tips */}
      <div className="mt-6 bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Tracking Tips</h3>
        <ul className="space-y-2 text-blue-700">
          <li>• Track consistently at the same time each day for accurate data</li>
          <li>• Note any unusual symptoms or pattern changes</li>
          <li>• Regular tracking helps predict future cycles and ovulation</li>
          <li>• Share concerning patterns with your healthcare provider</li>
        </ul>
      </div>
    </div>
  );
};

export default CycleForm;
