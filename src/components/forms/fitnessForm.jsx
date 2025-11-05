// // // src/components/Fitness/FitnessForm.jsx
// // import React, { useState } from 'react';
// // import { apiService } from '../../services/api';
// // import { useApp } from '../../contexts/AppContext';

// // const FitnessForm = () => {
// //   const { dispatch, state } = useApp();
// //   const [formData, setFormData] = useState({
// //     activityType: '',
// //     duration: '',
// //     intensity: 'medium',
// //     caloriesBurned: '',
// //     distance: '',
// //     notes: '',
// //     goal: 'general_fitness'
// //   });

// //   const activityTypes = [
// //     'Running', 'Walking', 'Cycling', 'Swimming', 'Weight Training',
// //     'Yoga', 'Pilates', 'HIIT', 'Dancing', 'Sports', 'Other'
// //   ];

// //   const goals = [
// //     { value: 'weight_loss', label: 'Weight Loss' },
// //     { value: 'muscle_gain', label: 'Muscle Gain' },
// //     { value: 'general_fitness', label: 'General Fitness' },
// //     { value: 'endurance', label: 'Endurance' },
// //     { value: 'flexibility', label: 'Flexibility' }
// //   ];

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       dispatch({ type: 'SET_LOADING', payload: true });

// //       const fitnessData = {
// //         activityType: formData.activityType,
// //         duration: parseInt(formData.duration),
// //         intensity: formData.intensity,
// //         caloriesBurned: formData.caloriesBurned ? parseInt(formData.caloriesBurned) : undefined,
// //         distance: formData.distance ? parseFloat(formData.distance) : undefined,
// //         notes: formData.notes,
// //         goal: formData.goal
// //       };

// //       console.log('Sending fitness data:', fitnessData);

// //       const result = await apiService.createFitness(fitnessData);
      
// //       if (result.success) {
// //         dispatch({ type: 'ADD_FITNESS_DATA', payload: result.data });
// //         alert('Fitness activity logged successfully!');
// //         setFormData({
// //           activityType: '',
// //           duration: '',
// //           intensity: 'medium',
// //           caloriesBurned: '',
// //           distance: '',
// //           notes: '',
// //           goal: 'general_fitness'
// //         });
// //       }
// //     } catch (error) {
// //       console.error('Error logging fitness activity:', error);
// //       const errorMessage = error.response?.data?.message || 'Error logging fitness activity';
// //       alert(errorMessage);
// //     } finally {
// //       dispatch({ type: 'SET_LOADING', payload: false });
// //     }
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
// //       <h2 className="text-2xl font-bold text-gray-800 mb-6">Log Fitness Activity</h2>
      
// //       <form onSubmit={handleSubmit} className="space-y-6">
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {/* Activity Type */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Activity Type *
// //             </label>
// //             <select
// //               required
// //               value={formData.activityType}
// //               onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //             >
// //               <option value="">Select Activity</option>
// //               {activityTypes.map(type => (
// //                 <option key={type} value={type}>{type}</option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* Duration */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Duration (minutes) *
// //             </label>
// //             <input
// //               type="number"
// //               required
// //               min="1"
// //               value={formData.duration}
// //               onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //               placeholder="30"
// //             />
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {/* Intensity */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Intensity
// //             </label>
// //             <select
// //               value={formData.intensity}
// //               onChange={(e) => setFormData({ ...formData, intensity: e.target.value })}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //             >
// //               <option value="low">Low</option>
// //               <option value="medium">Medium</option>
// //               <option value="high">High</option>
// //             </select>
// //           </div>

// //           {/* Goal */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Fitness Goal
// //             </label>
// //             <select
// //               value={formData.goal}
// //               onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //             >
// //               {goals.map(goal => (
// //                 <option key={goal.value} value={goal.value}>{goal.label}</option>
// //               ))}
// //             </select>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {/* Calories Burned */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Calories Burned (optional)
// //             </label>
// //             <input
// //               type="number"
// //               min="0"
// //               value={formData.caloriesBurned}
// //               onChange={(e) => setFormData({ ...formData, caloriesBurned: e.target.value })}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //               placeholder="300"
// //             />
// //           </div>

// //           {/* Distance */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Distance (km, optional)
// //             </label>
// //             <input
// //               type="number"
// //               step="0.1"
// //               min="0"
// //               value={formData.distance}
// //               onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //               placeholder="5.2"
// //             />
// //           </div>
// //         </div>

// //         {/* Notes */}
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Notes (optional)
// //           </label>
// //           <textarea
// //             value={formData.notes}
// //             onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
// //             rows="3"
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //             placeholder="How did you feel? Any achievements or challenges?"
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           disabled={state.loading}
// //           className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold hover-lift transition-all duration-300 disabled:opacity-50"
// //         >
// //           {state.loading ? 'Logging Activity...' : 'Log Fitness Activity'}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default FitnessForm;
// import React, { useState, useEffect } from "react";

// const FitnessForm = () => {
//   const [exercises, setExercises] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     duration: "",
//     calories: "",
//   });
//   const [editIndex, setEditIndex] = useState(null);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("fitnessData")) || [];
//     setExercises(stored);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("fitnessData", JSON.stringify(exercises));
//   }, [exercises]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.duration || !formData.calories) return;

//     if (editIndex !== null) {
//       const updated = exercises.map((ex, i) =>
//         i === editIndex ? formData : ex
//       );
//       setExercises(updated);
//       setEditIndex(null);
//     } else {
//       setExercises([...exercises, formData]);
//     }

//     setFormData({ name: "", duration: "", calories: "" });
//   };

//   const handleEdit = (index) => {
//     setFormData(exercises[index]);
//     setEditIndex(index);
//   };

//   const handleDelete = (index) => {
//     const filtered = exercises.filter((_, i) => i !== index);
//     setExercises(filtered);
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Fitness Log</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           type="text"
//           placeholder="Exercise Name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           className="w-full p-2 rounded bg-[#B1D182] text-[#0B132B]"
//         />
//         <input
//           type="text"
//           placeholder="Duration (min)"
//           value={formData.duration}
//           onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//           className="w-full p-2 rounded bg-[#B1D182] text-[#0B132B]"
//         />
//         <input
//           type="number"
//           placeholder="Calories Burned"
//           value={formData.calories}
//           onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
//           className="w-full p-2 rounded bg-[#B1D182] text-[#0B132B]"
//         />
//         <button
//           type="submit"
//           className="bg-[#688F48] w-full p-2 rounded text-white font-medium"
//         >
//           {editIndex !== null ? "Update" : "Add"}
//         </button>
//       </form>

//       <ul className="mt-5 space-y-2">
//         {exercises.map((ex, i) => (
//           <li
//             key={i}
//             className="flex justify-between bg-[#3A506B] p-3 rounded-lg"
//           >
//             <span>
//               {ex.name} — {ex.duration} mins — {ex.calories} cal
//             </span>
//             <div className="space-x-2">
//               <button
//                 onClick={() => handleEdit(i)}
//                 className="bg-[#B1D182] text-[#0B132B] px-2 py-1 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(i)}
//                 className="bg-red-500 px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FitnessForm;
import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FitnessForm = () => {
  const [fitnessData, setFitnessData] = useState([]);
  const [form, setForm] = useState({
    activity: '',
    duration: '',
    caloriesBurned: '',
    date: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFitness = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllFitness();
      setFitnessData(data);
    } catch {
      toast.error('Failed to load fitness records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFitness();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiService.updateFitness(editingId, form);
        toast.success('Activity updated successfully');
      } else {
        await apiService.createFitness(form);
        toast.success('Activity added successfully');
      }
      setForm({ activity: '', duration: '', caloriesBurned: '', date: '' });
      setEditingId(null);
      fetchFitness();
    } catch {
      toast.error('Error saving activity');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await apiService.deleteFitness(id);
      toast.success('Activity deleted successfully');
      fetchFitness();
    } catch {
      toast.error('Error deleting record');
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item._id);
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-2xl font-bold mb-4 text-[#0B132B]">Fitness Tracker</h2>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Activity"
          value={form.activity}
          onChange={(e) => setForm({ ...form, activity: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Duration (mins)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Calories Burned"
          value={form.caloriesBurned}
          onChange={(e) => setForm({ ...form, caloriesBurned: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="col-span-full bg-[#688F48] text-white py-2 rounded-lg font-semibold hover:bg-[#2B463C]"
        >
          {editingId ? 'Update Activity' : 'Add Activity'}
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-4">
          {fitnessData.map((item) => (
            <div
              key={item._id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-[#0B132B]">{item.activity}</p>
                <p className="text-sm text-gray-600">
                  {item.duration} mins | {item.caloriesBurned} kcal | {item.date}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FitnessForm;

