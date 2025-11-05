import React, { useState } from "react";
import { toast } from "react-toastify";

const SelfForm = ({ onSubmit, existingData }) => {
  const [formData, setFormData] = useState(
    existingData || { title: "", description: "", category: "", date: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-2xl shadow-lg bg-[#1C2541] text-[#F4F1E9] max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4 text-[#5BC0BE]">
        {existingData ? "Update Self Care Activity" : "Add New Self Care"}
      </h2>

      <label className="block mb-2 text-sm">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 rounded bg-[#3A506B] text-[#F4F1E9] mb-4"
      />

      <label className="block mb-2 text-sm">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 rounded bg-[#3A506B] text-[#F4F1E9] mb-4"
      />

      <label className="block mb-2 text-sm">Category</label>
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 rounded bg-[#3A506B] text-[#F4F1E9] mb-4"
      />

      <label className="block mb-2 text-sm">Date</label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 rounded bg-[#3A506B] text-[#F4F1E9] mb-6"
      />

      <button
        type="submit"
        className="w-full py-2 bg-[#5BC0BE] text-[#0B132B] font-semibold rounded hover:opacity-90"
      >
        {existingData ? "Update Activity" : "Add Activity"}
      </button>
    </form>
  );
};

export default SelfForm;

// import React, { useState } from 'react';
// import { apiService } from '../../services/api';
// import { useApp } from '../../contexts/AppContext';

// const SelfForm = () => {
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
//       await apiService.addSelfCare({
//         ...formData,
//         duration: parseInt(formData.duration)
//       });
//       alert('✅ Self-care activity logged successfully!');
//       setFormData({ activity: '', duration: '', moodBefore: '', moodAfter: '' });
//     } catch (error) {
//       alert('❌ Error logging self-care activity');
//     } finally {
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };

//   return (
//     <div className="p-8 bg-[#F5F5F5] rounded-2xl">
//       <h2 className="text-2xl font-bold text-[#0D1B2A] mb-6">Log a Self-Care Activity</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-[#2E3A59] mb-2">Activity</label>
//           <select
//             value={formData.activity}
//             onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ABC9C]"
//             required
//           >
//             <option value="">Select activity</option>
//             {selfCareActivities.map((activity) => (
//               <option key={activity} value={activity}>{activity}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-[#2E3A59] mb-2">Duration (minutes)</label>
//           <input
//             type="number"
//             min="1"
//             value={formData.duration}
//             onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ABC9C]"
//             placeholder="e.g. 20"
//             required
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-[#2E3A59] mb-2">Mood Before</label>
//             <select
//               value={formData.moodBefore}
//               onChange={(e) => setFormData({ ...formData, moodBefore: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ABC9C]"
//               required
//             >
//               <option value="">Select mood</option>
//               {moodOptions.map((mood) => (
//                 <option key={mood} value={mood}>{mood}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-[#2E3A59] mb-2">Mood After</label>
//             <select
//               value={formData.moodAfter}
//               onChange={(e) => setFormData({ ...formData, moodAfter: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1ABC9C]"
//               required
//             >
//               <option value="">Select mood</option>
//               {moodOptions.map((mood) => (
//                 <option key={mood} value={mood}>{mood}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-[#1ABC9C] text-white py-3 rounded-lg font-semibold hover:bg-[#2979FF] transition-all duration-300"
//         >
//           Log Activity
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SelfForm;

