import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NutritionForm = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [form, setForm] = useState({
    meal: '',
    calories: '',
    protein: '',
    carbs: '',
    date: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNutrition = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllNutrition();
      setNutritionData(data);
    } catch {
      toast.error('Failed to load nutrition records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNutrition();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiService.updateNutrition(editingId, form);
        toast.success('Meal updated successfully');
      } else {
        await apiService.createNutrition(form);
        toast.success('Meal added successfully');
      }
      setForm({ meal: '', calories: '', protein: '', carbs: '', date: '' });
      setEditingId(null);
      fetchNutrition();
    } catch {
      toast.error('Error saving meal');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await apiService.deleteNutrition(id);
      toast.success('Meal deleted successfully');
      fetchNutrition();
    } catch {
      toast.error('Error deleting meal');
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item._id);
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-2xl font-bold mb-4 text-[#0B132B]">Nutrition Tracker</h2>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Meal"
          value={form.meal}
          onChange={(e) => setForm({ ...form, meal: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Calories"
          value={form.calories}
          onChange={(e) => setForm({ ...form, calories: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Protein (g)"
          value={form.protein}
          onChange={(e) => setForm({ ...form, protein: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Carbs (g)"
          value={form.carbs}
          onChange={(e) => setForm({ ...form, carbs: e.target.value })}
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
          {editingId ? 'Update Meal' : 'Add Meal'}
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-4">
          {nutritionData.map((item) => (
            <div
              key={item._id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-[#0B132B]">{item.meal}</p>
                <p className="text-sm text-gray-600">
                  {item.calories} kcal | {item.protein}g protein | {item.carbs}g carbs | {item.date}
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

export default NutritionForm;

// // // src/components/Nutrition/NutritionForm.jsx
// // import React, { useState } from 'react';
// // import { apiService } from '../../services/api';
// // import { useApp } from '../../contexts/AppContext';

// // const NutritionForm = () => {
// //   const { dispatch, state } = useApp();
// //   const [formData, setFormData] = useState({
// //     mealType: 'breakfast',
// //     foodItems: '',
// //     calories: '',
// //     protein: '',
// //     carbs: '',
// //     fats: '',
// //     waterIntake: '',
// //     notes: ''
// //   });

// //   const mealTypes = [
// //     { value: 'breakfast', label: 'Breakfast' },
// //     { value: 'lunch', label: 'Lunch' },
// //     { value: 'dinner', label: 'Dinner' },
// //     { value: 'snack', label: 'Snack' },
// //     { value: 'pre_workout', label: 'Pre-Workout' },
// //     { value: 'post_workout', label: 'Post-Workout' }
// //   ];

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       dispatch({ type: 'SET_LOADING', payload: true });

// //       const nutritionData = {
// //         mealType: formData.mealType,
// //         foodItems: formData.foodItems,
// //         calories: formData.calories ? parseInt(formData.calories) : undefined,
// //         protein: formData.protein ? parseFloat(formData.protein) : undefined,
// //         carbs: formData.carbs ? parseFloat(formData.carbs) : undefined,
// //         fats: formData.fats ? parseFloat(formData.fats) : undefined,
// //         waterIntake: formData.waterIntake ? parseFloat(formData.waterIntake) : undefined,
// //         notes: formData.notes
// //       };

// //       console.log('Sending nutrition data:', nutritionData);

// //       const result = await apiService.createNutrition(nutritionData);
      
// //       if (result.success) {
// //         dispatch({ type: 'ADD_NUTRITION_DATA', payload: result.data });
// //         alert('Nutrition record created successfully!');
// //         setFormData({
// //           mealType: 'breakfast',
// //           foodItems: '',
// //           calories: '',
// //           protein: '',
// //           carbs: '',
// //           fats: '',
// //           waterIntake: '',
// //           notes: ''
// //         });
// //       }
// //     } catch (error) {
// //       console.error('Error creating nutrition record:', error);
// //       const errorMessage = error.response?.data?.message || 'Error creating nutrition record';
// //       alert(errorMessage);
// //     } finally {
// //       dispatch({ type: 'SET_LOADING', payload: false });
// //     }
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6">
// //       <h2 className="text-2xl font-bold text-gray-800 mb-6">Log Nutrition</h2>
      
// //       <form onSubmit={handleSubmit} className="space-y-6">
// //         {/* Meal Type */}
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Meal Type
// //           </label>
// //           <select
// //             value={formData.mealType}
// //             onChange={(e) => setFormData({ ...formData, mealType: e.target.value })}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //           >
// //             {mealTypes.map(meal => (
// //               <option key={meal.value} value={meal.value}>{meal.label}</option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Food Items */}
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Food Items *
// //           </label>
// //           <textarea
// //             required
// //             value={formData.foodItems}
// //             onChange={(e) => setFormData({ ...formData, foodItems: e.target.value })}
// //             rows="3"
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //             placeholder="List the foods you ate (e.g., Oatmeal with berries, 2 eggs, 1 banana...)"
// //           />
// //         </div>

// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //           {/* Calories */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Calories
// //             </label>
// //             <input
// //               type="number"
// //               min="0"
// //               value={formData.calories}
// //               onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //               placeholder="450"
// //             />
// //           </div>

// //           {/* Protein */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Protein (g)
// //             </label>
// //             <input
// //               type="number"
// //               step="0.1"
// //               min="0"
// //               value={formData.protein}
// //               onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //               placeholder="25"
// //             />
// //           </div>

// //           {/* Carbs */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Carbs (g)
// //             </label>
// //             <input
// //               type="number"
// //               step="0.1"
// //               min="0"
// //               value={formData.carbs}
// //               onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //               placeholder="60"
// //             />
// //           </div>

// //           {/* Fats */}
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Fats (g)
// //             </label>
// //             <input
// //               type="number"
// //               step="0.1"
// //               min="0"
// //               value={formData.fats}
// //               onChange={(e) => setFormData({ ...formData, fats: e.target.value })}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //               placeholder="15"
// //             />
// //           </div>
// //         </div>

// //         {/* Water Intake */}
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700 mb-2">
// //             Water Intake (liters, optional)
// //           </label>
// //           <input
// //             type="number"
// //             step="0.1"
// //             min="0"
// //             max="10"
// //             value={formData.waterIntake}
// //             onChange={(e) => setFormData({ ...formData, waterIntake: e.target.value })}
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //             placeholder="2.5"
// //           />
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
// //             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //             placeholder="How did this meal make you feel? Any cravings or observations?"
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           disabled={state.loading}
// //           className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-lg font-semibold hover-lift transition-all duration-300 disabled:opacity-50"
// //         >
// //           {state.loading ? 'Saving Nutrition...' : 'Save Nutrition Record'}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default NutritionForm;
// import React, { useState, useEffect } from "react";

// const NutritionForm = () => {
//   const [meals, setMeals] = useState([]);
//   const [formData, setFormData] = useState({
//     food: "",
//     calories: "",
//     date: "",
//   });
//   const [editIndex, setEditIndex] = useState(null);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("nutritionData")) || [];
//     setMeals(stored);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("nutritionData", JSON.stringify(meals));
//   }, [meals]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.food || !formData.calories || !formData.date) return;

//     if (editIndex !== null) {
//       const updated = meals.map((meal, i) =>
//         i === editIndex ? formData : meal
//       );
//       setMeals(updated);
//       setEditIndex(null);
//     } else {
//       setMeals([...meals, formData]);
//     }

//     setFormData({ food: "", calories: "", date: "" });
//   };

//   const handleEdit = (index) => {
//     setFormData(meals[index]);
//     setEditIndex(index);
//   };

//   const handleDelete = (index) => {
//     const filtered = meals.filter((_, i) => i !== index);
//     setMeals(filtered);
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Nutrition Log</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           type="text"
//           placeholder="Food"
//           value={formData.food}
//           onChange={(e) => setFormData({ ...formData, food: e.target.value })}
//           className="w-full p-2 rounded bg-[#B1D182] text-[#0B132B]"
//         />
//         <input
//           type="number"
//           placeholder="Calories"
//           value={formData.calories}
//           onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
//           className="w-full p-2 rounded bg-[#B1D182] text-[#0B132B]"
//         />
//         <input
//           type="date"
//           value={formData.date}
//           onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
//         {meals.map((meal, i) => (
//           <li
//             key={i}
//             className="flex justify-between bg-[#3A506B] p-3 rounded-lg"
//           >
//             <span>
//               {meal.food} — {meal.calories} cal — {meal.date}
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

// export default NutritionForm;
