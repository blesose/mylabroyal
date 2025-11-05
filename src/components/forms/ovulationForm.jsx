// src/components/Ovulation/OvulationForm.jsx
import React, { useState } from 'react';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';

const OvulationForm = () => {
  const { dispatch, state } = useApp();
  const [formData, setFormData] = useState({
    cycleStart: '',
    cycleLength: 28,
    notes: ''
  });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch({ type: 'SET_LOADING', payload: true });

//       const user = JSON.parse(localStorage.getItem('user'));
//       const ovulationData = {
//         userId: user._id,
//         cycleStart: formData.cycleStart,
//         cycleLength: parseInt(formData.cycleLength),
//         notes: formData.notes
//       };

//       console.log('Sending ovulation data:', ovulationData);

//       const result = await apiService.createOvulationEntry(ovulationData);
      
//       if (result.success) {
//         alert('Ovulation data logged successfully!');
//         setFormData({
//           cycleStart: '',
//           cycleLength: 28,
//           notes: ''
//         });

//         // Show predictions if available
//         if (result.data.prediction) {
//           const pred = result.data.prediction;
//           console.log('Ovulation Prediction:', pred);
//         }
//       }
//     } catch (error) {
//       console.error('Error logging ovulation data:', error);
//       const errorMessage = error.response?.data?.message || 'Error logging ovulation data';
//       alert(errorMessage);
//     } finally {
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch({ type: 'SET_LOADING', payload: true });

    const user = JSON.parse(localStorage.getItem('user'));
    const ovulationData = {
      userId: user._id,
      cycleStart: formData.cycleStart,
      cycleLength: parseInt(formData.cycleLength),
      notes: formData.notes
    };

    const response = await apiService.createOvulationEntry(ovulationData);
    console.log('Ovulation saved:', response);

    dispatch({ type: 'SET_SUCCESS', payload: 'Ovulation data saved successfully!' });
  } catch (error) {
    console.error('Error saving ovulation data:', error);
    dispatch({ type: 'SET_ERROR', payload: 'Failed to save ovulation data' });
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ovulation Tracking</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cycle Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cycle Start Date *
            </label>
            <input
              type="date"
              required
              value={formData.cycleStart}
              onChange={(e) => setFormData({ ...formData, cycleStart: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Cycle Length */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cycle Length (days)
            </label>
            <input
              type="number"
              min="20"
              max="40"
              value={formData.cycleLength}
              onChange={(e) => setFormData({ ...formData, cycleLength: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="28"
            />
            <p className="text-xs text-gray-500 mt-1">Typical range: 21-35 days</p>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Symptoms & Notes (optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Any ovulation symptoms like cervical mucus changes, mittelschmerz (ovulation pain), libido changes, or basal body temperature..."
          />
        </div>

        {/* Information Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">💡 About Ovulation Tracking</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Ovulation typically occurs 12-16 days before your next period</li>
            <li>• Fertile window is usually 5 days before ovulation through ovulation day</li>
            <li>• Track symptoms like egg-white cervical mucus for better predictions</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={state.loading}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-lg font-semibold hover-lift transition-all duration-300 disabled:opacity-50"
        >
          {state.loading ? 'Logging Data...' : 'Log Ovulation Data'}
        </button>
      </form>
    </div>
  );
};

export default OvulationForm;