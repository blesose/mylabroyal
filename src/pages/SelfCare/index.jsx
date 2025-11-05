import React, { useEffect, useState } from "react";
import SelfForm from "../../components/forms/selfcareForm";
import Education from "./Education"; // ✅ Added Import
import { toast } from "react-toastify";
import { apiService } from "../../services/api";

// const api = new ApiService();

const SelfCare = () => {
  const [activities, setActivities] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showEducation, setShowEducation] = useState(false); // ✅ toggle education view

  // Load activities from backend
  const loadActivities = async () => {
    try {
      const data = await apiService.fetchAllSelfCareActivities();
      setActivities(data);
    } catch (error) {
      toast.error("Failed to fetch self-care activities");
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  // Add new activity
  const handleAdd = async (formData) => {
    try {
      await apiService.addSelfCare(formData);
      toast.success("Self-care activity added!");
      loadActivities();
    } catch (error) {
      toast.error("Error adding activity");
    }
  };

  // Update existing activity
  const handleUpdate = async (id, updatedData) => {
    try {
      await apiService.updateSelfCare(id, updatedData);
      toast.success("Activity updated successfully");
      setEditing(null);
      loadActivities();
    } catch {
      toast.error("Failed to update");
    }
  };

  // Delete activity
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        await apiService.deleteSelfCare(id);
        toast.success("Activity deleted");
        loadActivities();
      } catch {
        toast.error("Failed to delete activity");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-[#F4F1E9] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#5BC0BE]">Self Care</h1>

        <button
          onClick={() => setShowEducation(!showEducation)}
          className="px-4 py-2 rounded bg-[#5BC0BE] text-[#0B132B] font-medium hover:opacity-90 transition-all"
        >
          {showEducation ? "Hide Education" : "Learn About Self Care"}
        </button>
      </div>

      {/* Toggle between Education and Form + Activities */}
      {showEducation ? (
        <Education />
      ) : (
        <>
          <SelfForm
            onSubmit={
              editing ? (data) => handleUpdate(editing._id, data) : handleAdd
            }
            existingData={editing}
          />

          <div className="mt-8 space-y-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div
                  key={activity._id}
                  className="p-4 bg-[#1C2541] rounded-lg flex justify-between items-start shadow"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-[#5BC0BE]">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-[#F4F1E9]/80">
                      {activity.description}
                    </p>
                    <p className="text-xs mt-1 text-[#F4F1E9]/60">
                      {activity.category} •{" "}
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditing(activity)}
                      className="px-3 py-1 bg-[#5BC0BE] text-[#0B132B] rounded hover:opacity-80"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(activity._id)}
                      className="px-3 py-1 bg-red-600 text-[#F4F1E9] rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-[#F4F1E9]/70">
                No self-care activities yet.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SelfCare;

// import React, { useState, useEffect } from 'react';
// import SelfForm from '../../components/forms/selfcareForm';
// import Education from './Education';
// import { apiService } from '../../services/api';

// const SelfCare = () => {
//   const [logs, setLogs] = useState([]);

//   const fetchLogs = async () => {
//     try {
//       const res = await apiService.fetchAllSelfCareActivities();
//       setLogs(res);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchLogs();
//   }, []);

//   const handleAddLog = (log) => {
//     setLogs((prev) => [log, ...prev]);
//   };

//   return (
//     <div className="min-h-screen bg-[#0B132B] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl md:text-5xl font-bold text-[#B1D182] mb-10 text-center">
//           Self Care Dashboard
//         </h1>

//         <div className="flex flex-col lg:flex-row gap-8">
//           <div className="flex-1 space-y-6">
//             <SelfForm onAdd={handleAddLog} />
//             <div className="bg-gradient-to-r from-[#2B463C] to-[#688F48] rounded-2xl shadow-lg p-6 text-[#F4F1E9]">
//               <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
//               {logs.length === 0 ? (
//                 <p className="text-[#B1D182]">No activities logged yet.</p>
//               ) : (
//                 <ul className="space-y-4">
//                   {logs.slice(0, 5).map((log) => (
//                     <li
//                       key={log.id}
//                       className="bg-[#F4F1E9] text-[#0B132B] rounded-xl p-4 shadow hover:shadow-lg transition-shadow duration-300"
//                     >
//                       <p className="font-semibold text-lg">{log.activity}</p>
//                       <p className="text-sm mt-1">
//                         Duration: {log.duration} min | Mood Before: {log.moodBefore} | Mood After: {log.moodAfter}
//                       </p>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>

//           <div className="flex-1">
//             <Education />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SelfCare;

// import React, { useState } from 'react';
// import { apiService } from '../../services/api';
// import { useApp } from '../../contexts/AppContext';

// const SelfCare = () => {
//   const { dispatch } = useApp();
//   const [formData, setFormData] = useState({
//     activity: '',
//     duration: '',
//     moodBefore: '',
//     moodAfter: ''
//   });

//   const selfCareActivities = [
//     'meditation', 'reading', 'walking', 'bathing', 'journaling',
//     'yoga', 'music', 'art', 'cooking', 'socializing'
//   ];

//   const moodOptions = ['anxious', 'stressed', 'neutral', 'calm', 'happy', 'energetic', 'tired'];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch({ type: 'SET_LOADING', payload: true });
//       const result = await apiService.addSelfCare({
//         ...formData,
//         duration: parseInt(formData.duration)
//       });
//       alert('Self-care activity logged successfully!');
//       setFormData({ activity: '', duration: '', moodBefore: '', moodAfter: '' });
//     } catch (error) {
//       alert('Error logging self-care activity');
//     } finally {
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };

//   const selfCareBenefits = [
//     {
//       title: 'Stress Reduction',
//       description: 'Regular self-care practices lower cortisol levels and reduce stress.',
//       icon: '🧘'
//     },
//     {
//       title: 'Improved Mood',
//       description: 'Self-care activities release endorphins and improve overall mood.',
//       icon: '😊'
//     },
//     {
//       title: 'Better Focus',
//       description: 'Taking breaks improves concentration and productivity.',
//       icon: '🎯'
//     },
//     {
//       title: 'Emotional Balance',
//       description: 'Self-care helps process emotions and maintain mental health.',
//       icon: '⚖️'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//             Self Care
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Nurture your mental and emotional well-being through intentional self-care practices
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Self Care Log Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">Self Care Activity Log</h2>
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Self Care Activity
//                   </label>
//                   <select
//                     value={formData.activity}
//                     onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     required
//                   >
//                     <option value="">Select activity</option>
//                     {selfCareActivities.map(activity => (
//                       <option key={activity} value={activity}>
//                         {activity.charAt(0).toUpperCase() + activity.slice(1)}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Duration (minutes)
//                   </label>
//                   <input
//                     type="number"
//                     min="1"
//                     required
//                     value={formData.duration}
//                     onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     placeholder="e.g., 20"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Mood Before
//                     </label>
//                     <select
//                       value={formData.moodBefore}
//                       onChange={(e) => setFormData({ ...formData, moodBefore: e.target.value })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       required
//                     >
//                       <option value="">Select mood</option>
//                       {moodOptions.map(mood => (
//                         <option key={mood} value={mood}>
//                           {mood.charAt(0).toUpperCase() + mood.slice(1)}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Mood After
//                     </label>
//                     <select
//                       value={formData.moodAfter}
//                       onChange={(e) => setFormData({ ...formData, moodAfter: e.target.value })}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       required
//                     >
//                       <option value="">Select mood</option>
//                       {moodOptions.map(mood => (
//                         <option key={mood} value={mood}>
//                           {mood.charAt(0).toUpperCase() + mood.slice(1)}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-semibold hover-lift transition-all duration-300"
//                 >
//                   Log Self Care Activity
//                 </button>
//               </form>
//             </div>

//             {/* Self Care Benefits */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">Benefits of Self Care</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {selfCareBenefits.map((benefit, index) => (
//                   <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
//                     <div className="text-2xl mb-2">{benefit.icon}</div>
//                     <h3 className="font-semibold text-purple-800 mb-2">{benefit.title}</h3>
//                     <p className="text-purple-700 text-sm">{benefit.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Self Care Tips & Ideas */}
//           <div className="space-y-6">
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">Self Care Ideas</h3>
//               <div className="space-y-3">
//                 {selfCareActivities.map((activity, index) => (
//                   <div key={index} className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
//                     <span className="text-pink-500">•</span>
//                     <span className="text-gray-700 capitalize">{activity}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
//               <h3 className="text-lg font-semibold text-blue-800 mb-3">Daily Self Care Routine</h3>
//               <ul className="space-y-2 text-blue-700">
//                 <li>• Morning meditation (5-10 min)</li>
//                 <li>• Hydration throughout day</li>
//                 <li>• Short breaks every 2 hours</li>
//                 <li>• Evening wind-down routine</li>
//                 <li>• Gratitude journaling</li>
//               </ul>
//             </div>

//             <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
//               <h3 className="text-lg font-semibold text-green-800 mb-3">Mindfulness Tips</h3>
//               <ul className="space-y-2 text-green-700">
//                 <li>• Practice deep breathing</li>
//                 <li>• Be present in the moment</li>
//                 <li>• Listen to your body</li>
//                 <li>• Set healthy boundaries</li>
//                 <li>• Practice self-compassion</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SelfCare;
