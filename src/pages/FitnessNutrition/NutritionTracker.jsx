// import React, { useState } from 'react';
// import { apiService } from '../../services/api';
// import { useApp } from '../../contexts/AppContext';

// const NutritionTracker = () => {
//   const { dispatch } = useApp();
//   const [formData, setFormData] = useState({
//     mealType: '',
//     calories: '',
//     foodItems: '',
//     protein: '',
//     carbs: '',
//     fat: '',
//     waterIntake: '',
//     notes: ''
//   });

//   const mealTypes = [
//     { value: 'breakfast', label: 'Breakfast', icon: '🍳' },
//     { value: 'morning-snack', label: 'Morning Snack', icon: '🥨' },
//     { value: 'lunch', label: 'Lunch', icon: '🥗' },
//     { value: 'afternoon-snack', label: 'Afternoon Snack', icon: '🍎' },
//     { value: 'dinner', label: 'Dinner', icon: '🍲' },
//     { value: 'evening-snack', label: 'Evening Snack', icon: '🥛' }
//   ];

//   const commonFoods = {
//     'Proteins': ['chicken breast', 'salmon', 'eggs', 'tofu', 'greek yogurt', 'lentils'],
//     'Carbs': ['brown rice', 'quinoa', 'sweet potato', 'oats', 'whole wheat bread', 'pasta'],
//     'Vegetables': ['broccoli', 'spinach', 'carrots', 'bell peppers', 'kale', 'cauliflower'],
//     'Fruits': ['apple', 'banana', 'berries', 'orange', 'avocado', 'grapes'],
//     'Fats': ['olive oil', 'nuts', 'seeds', 'avocado', 'cheese', 'dark chocolate']
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch({ type: 'SET_LOADING', payload: true });
//       const result = await apiService.addFitnessNutrition({
//         mealType: formData.mealType,
//         calories: parseInt(formData.calories),
//         activity: 'meal',
//         duration: 0
//       });
//       alert('Nutrition data logged successfully!');
//       setFormData({
//         mealType: '',
//         calories: '',
//         foodItems: '',
//         protein: '',
//         carbs: '',
//         fat: '',
//         waterIntake: '',
//         notes: ''
//       });
//     } catch (error) {
//       alert('Error logging nutrition data');
//     } finally {
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };

//   const addFoodItem = (food) => {
//     setFormData(prev => ({
//       ...prev,
//       foodItems: prev.foodItems ? `${prev.foodItems}, ${food}` : food
//     }));
//   };

//   const dailyGoals = {
//     calories: '2000-2500 (varies by individual)',
//     protein: '46-56 grams',
//     carbs: '225-325 grams',
//     fat: '44-78 grams',
//     water: '8-10 glasses (2-2.5L)'
//   };

//   return (
//     <div className="p-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Nutrition Tracker</h2>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Log Meal</h3>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Meal Type
//                 </label>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                   {mealTypes.map(meal => (
//                     <button
//                       key={meal.value}
//                       type="button"
//                       onClick={() => setFormData({ ...formData, mealType: meal.value })}
//                       className={`p-3 rounded-lg border-2 text-center transition-all ${
//                         formData.mealType === meal.value
//                           ? 'border-blue-500 bg-blue-50 text-blue-700'
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       <div className="text-lg mb-1">{meal.icon}</div>
//                       <div className="text-sm font-medium">{meal.label}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Food Items
//                 </label>
//                 <textarea
//                   value={formData.foodItems}
//                   onChange={(e) => setFormData({ ...formData, foodItems: e.target.value })}
//                   rows="3"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="List the main food items consumed..."
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Calories
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     required
//                     value={formData.calories}
//                     onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., 450"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Protein (g)
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     step="0.1"
//                     value={formData.protein}
//                     onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., 25"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Carbs (g)
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     step="0.1"
//                     value={formData.carbs}
//                     onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., 60"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Fat (g)
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     step="0.1"
//                     value={formData.fat}
//                     onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="e.g., 15"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Water Intake (glasses)
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   max="20"
//                   value={formData.waterIntake}
//                   onChange={(e) => setFormData({ ...formData, waterIntake: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="e.g., 6"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Notes (optional)
//                 </label>
//                 <textarea
//                   value={formData.notes}
//                   onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
//                   rows="2"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="How did this meal make you feel? Any cravings or aversions?"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover-lift transition-all duration-300"
//               >
//                 Log Meal
//               </button>
//             </form>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Add Foods</h3>
//             <div className="space-y-4">
//               {Object.entries(commonFoods).map(([category, foods]) => (
//                 <div key={category} className="border-2 border-gray-100 rounded-lg p-3">
//                   <h4 className="font-semibold text-gray-700 mb-2">{category}</h4>
//                   <div className="flex flex-wrap gap-1">
//                     {foods.map(food => (
//                       <button
//                         key={food}
//                         type="button"
//                         onClick={() => addFoodItem(food)}
//                         className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
//                       >
//                         {food}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
//             <h3 className="text-xl font-semibold text-green-800 mb-4">Daily Nutrition Goals</h3>
//             <div className="space-y-3">
//               {Object.entries(dailyGoals).map(([nutrient, goal]) => (
//                 <div key={nutrient} className="flex justify-between items-center p-2 bg-white rounded">
//                   <span className="font-medium text-green-700 capitalize">{nutrient}:</span>
//                   <span className="text-green-600 text-sm">{goal}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200">
//             <h3 className="text-xl font-semibold text-yellow-800 mb-3">Healthy Eating Tips</h3>
//             <ul className="space-y-2 text-yellow-700 text-sm">
//               <li>• Eat colorful fruits and vegetables</li>
//               <li>• Choose whole grains over refined</li>
//               <li>• Include lean protein sources</li>
//               <li>• Stay hydrated throughout day</li>
//               <li>• Practice mindful eating</li>
//               <li>• Limit processed foods</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NutritionTracker;

