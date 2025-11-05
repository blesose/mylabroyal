// self-care/Mindfulness.jsx
import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Mindfulness = () => {
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    activityType: 'meditation',
    duration: '',
    moodBefore: 'neutral',
    moodAfter: 'neutral',
    focusArea: 'breath',
    notes: ''
  });

  const mindfulnessActivities = [
    { value: 'meditation', label: 'Meditation', icon: '🧘', color: 'from-purple-500 to-pink-500' },
    { value: 'breathing', label: 'Breathing', icon: '🌬️', color: 'from-blue-500 to-cyan-500' },
    { value: 'gratitude', label: 'Gratitude', icon: '🙏', color: 'from-yellow-500 to-orange-500' },
    { value: 'journaling', label: 'Journaling', icon: '📖', color: 'from-green-500 to-emerald-500' },
    { value: 'body-scan', label: 'Body Scan', icon: '👁️', color: 'from-indigo-500 to-blue-500' },
    { value: 'visualization', label: 'Visualization', icon: '🌈', color: 'from-pink-500 to-rose-500' }
  ];

  const focusAreas = [
    'Breath', 'Body Sensations', 'Emotions', 'Thoughts', 'Sounds', 'Visual'
  ];

  const moodOptions = [
    { value: 'stressed', emoji: '😫', label: 'Stressed' },
    { value: 'anxious', emoji: '😰', label: 'Anxious' },
    { value: 'neutral', emoji: '😐', label: 'Neutral' },
    { value: 'calm', emoji: '😌', label: 'Calm' },
    { value: 'peaceful', emoji: '🕊️', label: 'Peaceful' },
    { value: 'joyful', emoji: '😊', label: 'Joyful' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implementation would go here
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        id: Date.now(),
        type: 'success',
        message: 'Mindfulness practice recorded with royal presence! 🧘',
        duration: 5000
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
          <span className="text-3xl text-white">🧘</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Royal Mindfulness
        </h1>
        <p className="text-gray-600 text-lg">
          Cultivate inner peace and presence with royal grace
        </p>
      </div>

      <Card hover glow>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Activity Type */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 text-white text-sm">1</span>
                Mindfulness Practice
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mindfulnessActivities.map(activity => (
                  <button
                    key={activity.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, activityType: activity.value })}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 text-center ${
                      formData.activityType === activity.value
                        ? `border-purple-500 bg-gradient-to-r ${activity.color} text-white shadow-xl`
                        : 'border-gray-200 bg-white/80 text-gray-700 hover:border-purple-300 hover:shadow-lg'
                    }`}
                  >
                    <div className="text-2xl mb-2">{activity.icon}</div>
                    <div className="font-medium text-sm">{activity.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration & Focus */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300"
                  placeholder="e.g., 10"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Primary Focus
                </label>
                <select
                  value={formData.focusArea}
                  onChange={(e) => setFormData({ ...formData, focusArea: e.target.value })}
                  className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300"
                >
                  {focusAreas.map(area => (
                    <option key={area} value={area.toLowerCase()}>{area}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mood Comparison */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 text-white text-sm">2</span>
                Mood Journey
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                    Before Practice
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {moodOptions.map(mood => (
                      <button
                        key={`before-${mood.value}`}
                        type="button"
                        onClick={() => setFormData({ ...formData, moodBefore: mood.value })}
                        className={`p-2 rounded-xl border-2 transition-all duration-300 ${
                          formData.moodBefore === mood.value
                            ? 'border-purple-500 bg-purple-500/10 shadow-md'
                            : 'border-gray-200 bg-white/80 hover:border-purple-300'
                        }`}
                      >
                        <div className="text-lg">{mood.emoji}</div>
                        <div className="text-xs text-gray-700">{mood.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                    After Practice
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {moodOptions.map(mood => (
                      <button
                        key={`after-${mood.value}`}
                        type="button"
                        onClick={() => setFormData({ ...formData, moodAfter: mood.value })}
                        className={`p-2 rounded-xl border-2 transition-all duration-300 ${
                          formData.moodAfter === mood.value
                            ? 'border-purple-500 bg-purple-500/10 shadow-md'
                            : 'border-gray-200 bg-white/80 hover:border-purple-300'
                        }`}
                      >
                        <div className="text-lg">{mood.emoji}</div>
                        <div className="text-xs text-gray-700">{mood.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 text-white text-sm">3</span>
                Royal Reflections
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows="4"
                className="w-full px-6 py-4 bg-white/80 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300 text-lg resize-none"
                placeholder="Reflect on your experience, insights gained, or any challenges encountered..."
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              className="w-full"
              icon="🧘"
            >
              Complete Royal Practice
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Mindfulness;