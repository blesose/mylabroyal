// // src/components/Sleep/SleepForm.jsx
// import React, { useState } from 'react';
// import { apiService } from '../../services/api';
// import { useApp } from '../../contexts/AppContext';

// const SleepForm = () => {
//   const { dispatch, state } = useApp();
//   const [formData, setFormData] = useState({
//     sleepStart: '',
//     sleepEnd: '',
//     sleepQuality: 5,
//     notes: ''
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch({ type: 'SET_LOADING', payload: true });

//       // Prepare sleep data according to your backend schema
//       const sleepData = {
//         sleepStart: formData.sleepStart,
//         sleepEnd: formData.sleepEnd,
//         sleepQuality: parseInt(formData.sleepQuality),
//         notes: formData.notes
//         // userId will be added automatically from auth middleware
//       };

//       console.log('Sending sleep data to:', '/shealth/sleeprecovery/add-sleep');
//       console.log('Data:', sleepData);

//       const result = await apiService.addSleepRecord(sleepData);
      
//       if (result.success) {
//         dispatch({ type: 'ADD_SLEEP_DATA', payload: result.data });
//         alert('Sleep data recorded successfully!');
        
//         // Reset form
//         setFormData({ 
//           sleepStart: '', 
//           sleepEnd: '', 
//           sleepQuality: 5, 
//           notes: '' 
//         });

//         // Show AI tip if available
//         if (result.data.aiTip) {
//           console.log('AI Sleep Tip:', result.data.aiTip);
//           // You could show this in a toast notification
//         }
//       }
//     } catch (error) {
//       console.error('Error recording sleep:', error);
//       const errorMessage = error.response?.data?.message || 'Error recording sleep data';
//       alert(errorMessage);
//     } finally {
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };

//   const calculateDuration = () => {
//     if (!formData.sleepStart || !formData.sleepEnd) return '0 hours';
    
//     const start = new Date(`2000-01-01T${formData.sleepStart}`);
//     const end = new Date(`2000-01-01T${formData.sleepEnd}`);
    
//     let diff = (end - start) / (1000 * 60 * 60); // hours
//     if (diff < 0) diff += 24; // Handle overnight sleep
    
//     return `${diff.toFixed(1)} hours`;
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Log Sleep</h2>
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Sleep Start
//             </label>
//             <input
//               type="time"
//               required
//               value={formData.sleepStart}
//               onChange={(e) => setFormData({ ...formData, sleepStart: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Sleep End
//             </label>
//             <input
//               type="time"
//               required
//               value={formData.sleepEnd}
//               onChange={(e) => setFormData({ ...formData, sleepEnd: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {formData.sleepStart && formData.sleepEnd && (
//           <div className="bg-blue-50 rounded-lg p-3 text-center">
//             <p className="text-sm text-blue-700">
//               Sleep Duration: <strong>{calculateDuration()}</strong>
//             </p>
//           </div>
//         )}

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Sleep Quality: <span className="text-blue-600">{formData.sleepQuality}/10</span>
//           </label>
//           <input
//             type="range"
//             min="1"
//             max="10"
//             value={formData.sleepQuality}
//             onChange={(e) => setFormData({ ...formData, sleepQuality: e.target.value })}
//             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
//           />
//           <div className="flex justify-between text-xs text-gray-500 mt-1">
//             <span>Poor</span>
//             <span>Excellent</span>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Notes (Optional)
//           </label>
//           <textarea
//             value={formData.notes}
//             onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//             rows="3"
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="Any dreams, interruptions, or how you felt when you woke up..."
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={state.loading}
//           className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover-lift transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {state.loading ? 'Recording Sleep...' : 'Record Sleep'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SleepForm;
// // import React, { useState } from 'react';
// // import { apiService } from '../../services/api';
// // import { useApp } from '../../contexts/AppContext';

// // const SleepForm = () => {
// //   const { dispatch } = useApp();
// //   const [formData, setFormData] = useState({
// //     sleepDuration: '',
// //     quality: 'good',
// //     bedTime: '',
// //     wakeTime: '',
// //     dreams: '',
// //     interruptions: 0,
// //     sleepNotes: ''
// //   });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       dispatch({ type: 'SET_LOADING', payload: true });
// //       const result = await apiService.addSleepRecord({
// //         ...formData,
// //         sleepDuration: parseFloat(formData.sleepDuration),
// //         interruptions: parseInt(formData.interruptions)
// //       });
// //       dispatch({ type: 'ADD_SLEEP_DATA', payload: result });
      
// //       dispatch({ 
// //         type: 'SET_NOTIFICATION', 
// //         payload: {
// //           type: 'success',
// //           message: '🌙 Sleep data recorded! Your rest is being optimized.',
// //           duration: 4000
// //         }
// //       });
      
// //       setFormData({ 
// //         sleepDuration: '', 
// //         quality: 'good', 
// //         bedTime: '', 
// //         wakeTime: '', 
// //         dreams: '', 
// //         interruptions: 0, 
// //         sleepNotes: '' 
// //       });
// //     } catch (error) {
// //       dispatch({ 
// //         type: 'SET_NOTIFICATION', 
// //         payload: {
// //           type: 'error',
// //           message: 'Unable to record sleep data. Please try again.',
// //           duration: 5000
// //         }
// //       });
// //     } finally {
// //       dispatch({ type: 'SET_LOADING', payload: false });
// //     }
// //   };

// //   const qualityOptions = [
// //     { value: 'poor', label: 'Restless', emoji: '😫', color: 'from-red-500 to-pink-500' },
// //     { value: 'fair', label: 'Light', emoji: '😴', color: 'from-orange-500 to-yellow-500' },
// //     { value: 'good', label: 'Peaceful', emoji: '😊', color: 'from-green-500 to-emerald-500' },
// //     { value: 'excellent', label: 'Deep', emoji: '😌', color: 'from-blue-500 to-cyan-500' }
// //   ];

// //   return (
// //     <div className="max-w-2xl mx-auto">
// //       {/* Header */}
// //       <div className="text-center mb-8">
// //         <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
// //           <span className="text-3xl text-white">🌌</span>
// //         </div>
// //         <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-3">
// //           Celestial Sleep Tracker
// //         </h2>
// //         <p className="text-gray-600 text-lg">
// //           Document your journey through the stars with precision and grace
// //         </p>
// //       </div>

// //       <form onSubmit={handleSubmit} className="space-y-8">
// //         {/* Sleep Duration */}
// //         <div className="relative">
// //           <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
// //             <span className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center mr-3 text-white text-sm">1</span>
// //             Stellar Sleep Duration
// //           </label>
// //           <div className="relative">
// //             <input
// //               type="number"
// //               step="0.1"
// //               min="0"
// //               max="24"
// //               required
// //               value={formData.sleepDuration}
// //               onChange={(e) => setFormData({ ...formData, sleepDuration: e.target.value })}
// //               className="w-full px-6 py-4 bg-white/80 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-lg shadow-lg backdrop-blur-sm"
// //               placeholder="e.g., 7.5 hours of celestial rest"
// //             />
// //             <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
// //               hours
// //             </div>
// //           </div>
// //         </div>

// //         {/* Sleep Quality */}
// //         <div>
// //           <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
// //             <span className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center mr-3 text-white text-sm">2</span>
// //             Dream Quality Level
// //           </label>
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //             {qualityOptions.map(option => (
// //               <button
// //                 key={option.value}
// //                 type="button"
// //                 onClick={() => setFormData({ ...formData, quality: option.value })}
// //                 className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
// //                   formData.quality === option.value
// //                     ? `border-blue-500 bg-gradient-to-r ${option.color} text-white shadow-xl`
// //                     : 'border-gray-200 bg-white/80 hover:border-blue-300 text-gray-700'
// //                 }`}
// //               >
// //                 <div className="text-2xl mb-2">{option.emoji}</div>
// //                 <div className="text-sm font-medium">{option.label}</div>
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Time Tracking */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div>
// //             <label className="block text-sm font-semibold text-gray-700 mb-2">
// //               🌙 Bedtime
// //             </label>
// //             <input
// //               type="time"
// //               value={formData.bedTime}
// //               onChange={(e) => setFormData({ ...formData, bedTime: e.target.value })}
// //               className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-semibold text-gray-700 mb-2">
// //               ☀️ Wake Time
// //             </label>
// //             <input
// //               type="time"
// //               value={formData.wakeTime}
// //               onChange={(e) => setFormData({ ...formData, wakeTime: e.target.value })}
// //               className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
// //             />
// //           </div>
// //         </div>

// //         {/* Additional Metrics */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div>
// //             <label className="block text-sm font-semibold text-gray-700 mb-2">
// //               🌊 Dream Recall
// //             </label>
// //             <select
// //               value={formData.dreams}
// //               onChange={(e) => setFormData({ ...formData, dreams: e.target.value })}
// //               className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
// //             >
// //               <option value="">Select dream clarity</option>
// //               <option value="vivid">Vivid & Memorable</option>
// //               <option value="fragmented">Fragmented Pieces</option>
// //               <option value="none">No Recall</option>
// //               <option value="lucid">Lucid Dream</option>
// //             </select>
// //           </div>
// //           <div>
// //             <label className="block text-sm font-semibold text-gray-700 mb-2">
// //               ⚡ Interruptions
// //             </label>
// //             <input
// //               type="number"
// //               min="0"
// //               max="20"
// //               value={formData.interruptions}
// //               onChange={(e) => setFormData({ ...formData, interruptions: parseInt(e.target.value) || 0 })}
// //               className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
// //               placeholder="Number of wake-ups"
// //             />
// //           </div>
// //         </div>

// //         {/* Sleep Notes */}
// //         <div>
// //           <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
// //             <span className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center mr-3 text-white text-sm">3</span>
// //             Cosmic Sleep Notes
// //           </label>
// //           <textarea
// //             value={formData.sleepNotes}
// //             onChange={(e) => setFormData({ ...formData, sleepNotes: e.target.value })}
// //             rows="4"
// //             className="w-full px-6 py-4 bg-white/80 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-lg shadow-lg backdrop-blur-sm resize-none"
// //             placeholder="Note any observations about your sleep environment, pre-sleep routine, or how you feel upon waking..."
// //           />
// //         </div>

// //         {/* Submit Button */}
// //         <button
// //           type="submit"
// //           disabled={!formData.sleepDuration}
// //           className="w-full group relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
// //         >
// //           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
// //           <span className="relative flex items-center justify-center space-x-3">
// //             <span>🌠 Record Celestial Sleep</span>
// //             <span className="group-hover:scale-110 transition-transform duration-300">⭐</span>
// //           </span>
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default SleepForm;
// src/components/Sleep/SleepForm.jsx
import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { useApp } from '../../contexts/AppContext';

const SleepForm = ({ editingRecord, onSaved }) => {
  const { dispatch, state } = useApp();
  const [formData, setFormData] = useState({
    sleepStart: '',
    sleepEnd: '',
    sleepQuality: 5,
    notes: ''
  });

  // If editingRecord changes, pre-fill the form
  useEffect(() => {
    if (editingRecord) {
      setFormData({
        sleepStart: editingRecord.sleepStart || '',
        sleepEnd: editingRecord.sleepEnd || '',
        sleepQuality: editingRecord.sleepQuality || 5,
        notes: editingRecord.notes || ''
      });
    }
  }, [editingRecord]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const sleepData = {
        sleepStart: formData.sleepStart,
        sleepEnd: formData.sleepEnd,
        sleepQuality: parseInt(formData.sleepQuality),
        notes: formData.notes
      };

      let result;
      if (editingRecord) {
        // Update existing record
        result = await apiService.updateSleepRecord(editingRecord._id, sleepData);
      } else {
        // Create new record
        result = await apiService.addSleepRecord(sleepData);
      }

      if (result.success) {
        dispatch({ type: editingRecord ? 'UPDATE_SLEEP_DATA' : 'ADD_SLEEP_DATA', payload: result.data });
        alert(editingRecord ? 'Sleep record updated!' : 'Sleep record added!');
        
        // Reset form if creating new
        if (!editingRecord) {
          setFormData({ sleepStart: '', sleepEnd: '', sleepQuality: 5, notes: '' });
        }

        // Show AI tip if available
        if (result.data.aiTip) {
          console.log('AI Sleep Tip:', result.data.aiTip);
          // Optionally show a toast notification
        }

        // Callback to parent (SleepHistory) to refresh table / clear editing state
        if (onSaved) onSaved();
      }
    } catch (error) {
      console.error('Error saving sleep record:', error);
      const errorMessage = error.response?.data?.message || 'Error saving sleep data';
      alert(errorMessage);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const calculateDuration = () => {
    if (!formData.sleepStart || !formData.sleepEnd) return '0 hours';
    
    const start = new Date(`2000-01-01T${formData.sleepStart}`);
    const end = new Date(`2000-01-01T${formData.sleepEnd}`);
    
    let diff = (end - start) / (1000 * 60 * 60); // hours
    if (diff < 0) diff += 24; // Handle overnight sleep
    
    return `${diff.toFixed(1)} hours`;
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editingRecord ? 'Edit Sleep Record' : 'Log Sleep'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sleep Start
            </label>
            <input
              type="time"
              required
              value={formData.sleepStart}
              onChange={(e) => setFormData({ ...formData, sleepStart: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sleep End
            </label>
            <input
              type="time"
              required
              value={formData.sleepEnd}
              onChange={(e) => setFormData({ ...formData, sleepEnd: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {formData.sleepStart && formData.sleepEnd && (
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-sm text-blue-700">
              Sleep Duration: <strong>{calculateDuration()}</strong>
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sleep Quality: <span className="text-blue-600">{formData.sleepQuality}/10</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={formData.sleepQuality}
            onChange={(e) => setFormData({ ...formData, sleepQuality: e.target.value })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any dreams, interruptions, or how you felt when you woke up..."
          />
        </div>

        <button
          type="submit"
          disabled={state.loading}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover-lift transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state.loading ? (editingRecord ? 'Updating...' : 'Recording...') : (editingRecord ? 'Update Record' : 'Record Sleep')}
        </button>
      </form>
    </div>
  );
};

export default SleepForm;
