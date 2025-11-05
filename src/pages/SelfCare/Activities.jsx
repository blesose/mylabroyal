import React, { useState } from 'react';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';

const Activities = () => {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    activity: '',
    duration: '',
    moodBefore: '',
    moodAfter: '',
    notes: ''
  });

  const selfCareCategories = {
    'Mental': ['meditation', 'journaling', 'reading', 'therapy', 'mindfulness'],
    'Physical': ['yoga', 'walking', 'exercise', 'stretching', 'massage'],
    'Emotional': ['music', 'art', 'dancing', 'crying', 'laughing'],
    'Social': ['calling friends', 'family time', 'community service', 'group activities'],
    'Spiritual': ['prayer', 'nature time', 'volunteering', 'reflection'],
    'Creative': ['painting', 'writing', 'crafting', 'cooking', 'gardening']
  };

  const moodOptions = ['anxious', 'stressed', 'overwhelmed', 'neutral', 'calm', 'content', 'happy', 'energetic'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const result = await apiService.addSelfCare({
        ...formData,
        duration: parseInt(formData.duration)
      });
      alert('Self-care activity logged successfully!');
      setFormData({
        activity: '',
        duration: '',
        moodBefore: '',
        moodAfter: '',
        notes: ''
      });
    } catch (error) {
      alert('Error logging self-care activity');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getMoodImprovement = () => {
    if (!formData.moodBefore || !formData.moodAfter) return null;
    
    const beforeIndex = moodOptions.indexOf(formData.moodBefore);
    const afterIndex = moodOptions.indexOf(formData.moodAfter);
    
    if (afterIndex > beforeIndex) {
      return { improved: true, level: afterIndex - beforeIndex };
    } else if (afterIndex < beforeIndex) {
      return { improved: false, level: beforeIndex - afterIndex };
    }
    return { improved: null, level: 0 };
  };

  const moodImprovement = getMoodImprovement();

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Self Care Activities</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Log Self Care Activity</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Type
                </label>
                <select
                  value={formData.activity}
                  onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Select activity</option>
                  {Object.entries(selfCareCategories).map(([category, activities]) => (
                    <optgroup key={category} label={category}>
                      {activities.map(activity => (
                        <option key={activity} value={activity}>
                          {activity.charAt(0).toUpperCase() + activity.slice(1)}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mood Before
                  </label>
                  <select
                    value={formData.moodBefore}
                    onChange={(e) => setFormData({ ...formData, moodBefore: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select mood</option>
                    {moodOptions.map(mood => (
                      <option key={mood} value={mood}>
                        {mood.charAt(0).toUpperCase() + mood.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mood After
                  </label>
                  <select
                    value={formData.moodAfter}
                    onChange={(e) => setFormData({ ...formData, moodAfter: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select mood</option>
                    {moodOptions.map(mood => (
                      <option key={mood} value={mood}>
                        {mood.charAt(0).toUpperCase() + mood.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {moodImprovement && (
                <div className={`p-3 rounded-lg text-center ${
                  moodImprovement.improved 
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : moodImprovement.improved === false
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}>
                  {moodImprovement.improved ? (
                    <span>🎉 Mood improved by {moodImprovement.level} levels!</span>
                  ) : moodImprovement.improved === false ? (
                    <span>😔 Mood decreased by {moodImprovement.level} levels</span>
                  ) : (
                    <span>➡️ Mood remained the same</span>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="How did this activity make you feel? Any insights?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-semibold hover-lift transition-all duration-300"
              >
                Log Self Care Activity
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Self Care Ideas by Category</h3>
            <div className="space-y-4">
              {Object.entries(selfCareCategories).map(([category, activities]) => (
                <div key={category} className="border-2 border-gray-100 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-600 mb-2">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {activities.map(activity => (
                      <span
                        key={activity}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm cursor-pointer hover:bg-purple-200 transition-colors"
                        onClick={() => setFormData(prev => ({ ...prev, activity }))}
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-pink-50 rounded-2xl p-6 border-2 border-pink-200">
            <h3 className="text-xl font-semibold text-pink-800 mb-3">Quick Self Care Ideas</h3>
            <ul className="space-y-2 text-pink-700">
              <li>• 5-minute breathing exercise</li>
              <li>• Stretch for 10 minutes</li>
              <li>• Listen to favorite music</li>
              <li>• Drink a glass of water</li>
              <li>• Write down 3 things you're grateful for</li>
              <li>• Step outside for fresh air</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
