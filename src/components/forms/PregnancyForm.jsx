import React, { useState } from 'react';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';

const PregnancyForm = () => {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    week: '',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const result = await apiService.createPregnancy({
        ...formData,
        week: parseInt(formData.week)
      });
      alert('Pregnancy data logged successfully!');
      setFormData({ week: '', notes: '' });
    } catch (error) {
      alert('Error logging pregnancy data');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Week
        </label>
        <input
          type="number"
          min="1"
          max="42"
          required
          value={formData.week}
          onChange={(e) => setFormData({ ...formData, week: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="Enter current pregnancy week"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes & Symptoms
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="How are you feeling this week? Any symptoms or notes..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-semibold hover-lift transition-all duration-300"
      >
        Log Pregnancy Progress
      </button>
    </form>
  );
};

export default PregnancyForm;
