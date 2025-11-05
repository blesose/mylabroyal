import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

const LabInsights = () => {
  const [weeklyReport, setWeeklyReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const downloadWeeklyReport = async () => {
    setLoading(true);
    try {
      const blob = await apiService.getWeeklyReport();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'mylab-weekly-report.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      alert('Weekly report downloaded successfully!');
    } catch (error) {
      alert('No weekly report available yet. Continue tracking to generate insights.');
    } finally {
      setLoading(false);
    }
  };

  // Sample dashboard data
  const dashboardData = {
    overallHealth: 85,
    sleepQuality: 78,
    activityLevel: 92,
    nutritionScore: 81,
    moodTrend: 'improving',
    weeklyComparison: '+12%',
    insights: [
      'Your sleep consistency has improved by 15% this week',
      'Great job maintaining your exercise routine',
      'Consider increasing water intake based on activity levels',
      'Mood tracking shows positive trend - keep it up!'
    ],
    recommendations: [
      'Aim for 30 minutes of moderate activity daily',
      'Try to maintain consistent sleep schedule',
      'Include more leafy greens in your meals',
      'Practice mindfulness for stress management'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Lab Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your personalized health dashboard with AI-powered insights and weekly reports
          </p>
        </div>

        {/* Download Report Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Weekly Health Report</h2>
              <p className="text-gray-600">Download your comprehensive weekly health analysis</p>
            </div>
            <button
              onClick={downloadWeeklyReport}
              disabled={loading}
              className="bg-gradient-to-r from-sky-blue to-light-pink text-white px-8 py-4 rounded-lg font-semibold hover-lift transition-all duration-300 disabled:opacity-50 mt-4 md:mt-0"
            >
              {loading ? 'Generating Report...' : 'Download Weekly Report'}
            </button>
          </div>
        </div>

        {/* Health Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Overall Health', score: dashboardData.overallHealth, color: 'green' },
            { label: 'Sleep Quality', score: dashboardData.sleepQuality, color: 'blue' },
            { label: 'Activity Level', score: dashboardData.activityLevel, color: 'purple' },
            { label: 'Nutrition Score', score: dashboardData.nutritionScore, color: 'orange' }
          ].map((metric, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className={`text-2xl font-bold text-${metric.color}-600 mb-2`}>
                {metric.score}%
              </div>
              <div className="text-gray-600">{metric.label}</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div 
                  className={`bg-${metric.color}-500 h-2 rounded-full`}
                  style={{ width: `${metric.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Insights */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">AI-Powered Insights</h2>
            <div className="space-y-4">
              {dashboardData.insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <span className="text-blue-500 text-lg">💡</span>
                  <p className="text-gray-700">{insight}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <div className="flex items-center space-x-3">
                <span className="text-green-500 text-xl">📈</span>
                <div>
                  <h3 className="font-semibold text-green-800">Weekly Progress</h3>
                  <p className="text-green-700">Your health metrics improved by {dashboardData.weeklyComparison} this week!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Personalized Recommendations */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Personalized Recommendations</h2>
            <div className="space-y-4">
              {dashboardData.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                  <span className="text-purple-500 text-lg">⭐</span>
                  <p className="text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">Mood Trend Analysis</h3>
              <p className="text-yellow-700">
                Your mood tracking shows an {dashboardData.moodTrend} trend. 
                {dashboardData.moodTrend === 'improving' 
                  ? ' Continue your current self-care practices!' 
                  : ' Consider trying some relaxation techniques.'}
              </p>
            </div>
          </div>
        </div>

        {/* Data Visualization Placeholder */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Health Trends</h2>
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">Interactive charts and graphs will appear here</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-200 h-32 rounded-lg flex items-center justify-center">
                <span className="text-blue-700">Sleep Pattern Chart</span>
              </div>
              <div className="bg-green-200 h-32 rounded-lg flex items-center justify-center">
                <span className="text-green-700">Activity Timeline</span>
              </div>
              <div className="bg-purple-200 h-32 rounded-lg flex items-center justify-center">
                <span className="text-purple-700">Mood Correlation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabInsights;
