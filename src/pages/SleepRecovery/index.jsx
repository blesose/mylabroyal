// import React from 'react';
// import SleepForm from '../../components/forms/SleepForm';

// const SleepRecovery = () => {
//   const sleepTips = [
//     'Maintain consistent sleep schedule',
//     'Create relaxing bedtime routine',
//     'Keep bedroom cool and dark',
//     'Avoid caffeine and heavy meals before bed',
//     'Limit screen time 1 hour before sleep'
//   ];

//   const sleepBenefits = [
//     { benefit: 'Memory Consolidation', description: 'Sleep helps solidify memories and learning' },
//     { benefit: 'Muscle Repair', description: 'Growth hormone released during deep sleep' },
//     { benefit: 'Immune Function', description: 'Adequate sleep strengthens immune system' },
//     { benefit: 'Mood Regulation', description: 'Sleep affects emotional stability and mental health' }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//             Sleep Recovery
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Track your sleep patterns and discover ways to improve sleep quality for better health and recovery
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Sleep Log Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">Sleep Tracker</h2>
//               <SleepForm />
//             </div>

//             {/* Sleep Benefits */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Sleep Matters</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {sleepBenefits.map((item, index) => (
//                   <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200">
//                     <h3 className="font-semibold text-blue-800 mb-2">{item.benefit}</h3>
//                     <p className="text-blue-700 text-sm">{item.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Sleep Tips & Education */}
//           <div className="space-y-6">
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">Sleep Improvement Tips</h3>
//               <ul className="space-y-3">
//                 {sleepTips.map((tip, index) => (
//                   <li key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
//                     <span className="text-blue-500 mt-1">•</span>
//                     <span className="text-gray-700">{tip}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
//               <h3 className="text-lg font-semibold text-purple-800 mb-3">Sleep Stages</h3>
//               <div className="space-y-2 text-purple-700">
//                 <p><strong>Light Sleep:</strong> 50-60% of night - Body begins to relax</p>
//                 <p><strong>Deep Sleep:</strong> 10-25% of night - Physical restoration</p>
//                 <p><strong>REM Sleep:</strong> 20-25% of night - Mental restoration</p>
//               </div>
//             </div>

//             <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
//               <h3 className="text-lg font-semibold text-green-800 mb-3">Recommended Sleep</h3>
//               <ul className="space-y-2 text-green-700">
//                 <li>• Adults: 7-9 hours</li>
//                 <li>• Consistent bed and wake times</li>
//                 <li>• 20-30 min naps if needed</li>
//                 <li>• Quality over quantity</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SleepRecovery;
// src/pages/Sleep/SleepRecovery.jsx
// src/pages/SleepRecovery.jsx
import React, { useState, useEffect } from 'react';
import SleepForm from '../../components/forms/SleepForm';
import Education from './Education';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';

const SleepRecovery = () => {
  const { state, dispatch } = useApp();
  const [sleepRecords, setSleepRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);

  // Sleep Tips & Benefits
  const sleepTips = [
    'Maintain consistent sleep schedule',
    'Create relaxing bedtime routine',
    'Keep bedroom cool and dark',
    'Avoid caffeine and heavy meals before bed',
    'Limit screen time 1 hour before sleep',
  ];

  const sleepBenefits = [
    { benefit: 'Memory Consolidation', description: 'Sleep helps solidify memories and learning' },
    { benefit: 'Muscle Repair', description: 'Growth hormone released during deep sleep' },
    { benefit: 'Immune Function', description: 'Adequate sleep strengthens immune system' },
    { benefit: 'Mood Regulation', description: 'Sleep affects emotional stability and mental health' },
  ];

  // Fetch Sleep History
  const fetchHistory = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const result = await apiService.getSleepHistory();
      if (result.success) setSleepRecords(result.data);
    } catch (error) {
      console.error('Error fetching sleep history:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Delete record
  const handleDelete = async (recordId) => {
    if (!window.confirm('Are you sure you want to delete this sleep record?')) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const result = await apiService.deleteSleepRecord(recordId);
      if (result.success) {
        setSleepRecords((prev) => prev.filter((rec) => rec._id !== recordId));
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleSaved = () => {
    fetchHistory();
    setEditingRecord(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Sleep Recovery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your sleep patterns, view history, and learn how to improve sleep quality for better health.
          </p>
        </div>

        {/* Left Column: Form + History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Sleep Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Sleep Tracker</h2>
              <SleepForm editingRecord={editingRecord} onSaved={handleSaved} />
            </div>

            {/* Sleep History Table */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Sleep History</h2>
              {sleepRecords.length === 0 ? (
                <p className="text-gray-600">No sleep records found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-700">Start</th>
                        <th className="px-4 py-2 text-left text-gray-700">End</th>
                        <th className="px-4 py-2 text-left text-gray-700">Duration</th>
                        <th className="px-4 py-2 text-left text-gray-700">Quality</th>
                        <th className="px-4 py-2 text-left text-gray-700">Notes</th>
                        <th className="px-4 py-2 text-left text-gray-700">AI Tip</th>
                        <th className="px-4 py-2 text-left text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {sleepRecords.map((record) => {
                        const start = new Date(`2000-01-01T${record.sleepStart}`);
                        const end = new Date(`2000-01-01T${record.sleepEnd}`);
                        let duration = (end - start) / (1000 * 60 * 60);
                        if (duration < 0) duration += 24;
                        duration = duration.toFixed(1);

                        return (
                          <tr key={record._id}>
                            <td className="px-4 py-2">{record.sleepStart}</td>
                            <td className="px-4 py-2">{record.sleepEnd}</td>
                            <td className="px-4 py-2">{duration} hrs</td>
                            <td className="px-4 py-2">{record.sleepQuality}/10</td>
                            <td className="px-4 py-2">{record.notes || '-'}</td>
                            <td className="px-4 py-2 text-green-600">{record.aiTip || '-'}</td>
                            <td className="px-4 py-2 space-x-2">
                              <button
                                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                onClick={() => setEditingRecord(record)}
                              >
                                Edit
                              </button>
                              <button
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                onClick={() => handleDelete(record._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Tips + Education */}
          <div className="space-y-6">
            {/* Sleep Improvement Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Sleep Improvement Tips</h3>
              <ul className="space-y-3">
                {sleepTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sleep Benefits */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Sleep Matters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sleepBenefits.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200"
                  >
                    <h4 className="font-semibold text-blue-800 mb-2">{item.benefit}</h4>
                    <p className="text-blue-700 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sleep Education Component */}
            <Education />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepRecovery;
