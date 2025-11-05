// import React, { useState } from 'react';
// import { apiService } from '../../services/api';
// import { useApp } from '../../contexts/AppContext';

// const CreatePost = () => {
//   const { dispatch } = useApp();
//   const [formData, setFormData] = useState({
//     author: '',
//     content: '',
//     category: 'general',
//     tags: []
//   });

//   const categories = [
//     { value: 'general', label: 'General Discussion' },
//     { value: 'support', label: 'Support & Encouragement' },
//     { value: 'question', label: 'Questions & Advice' },
//     { value: 'achievement', label: 'Celebrations & Wins' },
//     { value: 'tips', label: 'Tips & Strategies' },
//     { value: 'challenge', label: 'Challenges & Struggles' }
//   ];

//   const commonTags = [
//     'cycle-tracking', 'sleep', 'nutrition', 'exercise', 'mental-health',
//     'pregnancy', 'mens-health', 'self-care', 'community', 'progress'
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch({ type: 'SET_LOADING', payload: true });
//       const result = await apiService.createPost(formData);
//       dispatch({ type: 'ADD_COMMUNITY_POST', payload: result });
//       alert('Post created successfully!');
//       setFormData({
//         author: '',
//         content: '',
//         category: 'general',
//         tags: []
//       });
//     } catch (error) {
//       alert('Error creating post');
//     } finally {
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };

//   const toggleTag = (tag) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.includes(tag)
//         ? prev.tags.filter(t => t !== tag)
//         : [...prev.tags, tag]
//     }));
//   };

//   return (
//     <div className="p-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Community Post</h2>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.author}
//                   onChange={(e) => setFormData({ ...formData, author: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-blue focus:border-transparent"
//                   placeholder="Enter your name or username"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Category
//                 </label>
//                 <select
//                   value={formData.category}
//                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-blue focus:border-transparent"
//                 >
//                   {categories.map(category => (
//                     <option key={category.value} value={category.value}>
//                       {category.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Post Content
//                 </label>
//                 <textarea
//                   required
//                   value={formData.content}
//                   onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                   rows="8"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-blue focus:border-transparent resize-none"
//                   placeholder="Share your experiences, ask questions, offer support, or celebrate wins with the community..."
//                 />
//                 <div className="text-sm text-gray-500 mt-1">
//                   {formData.content.length}/2000 characters
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Tags (optional)
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {commonTags.map(tag => (
//                     <button
//                       key={tag}
//                       type="button"
//                       onClick={() => toggleTag(tag)}
//                       className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
//                         formData.tags.includes(tag)
//                           ? 'bg-sky-blue text-white'
//                           : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                       }`}
//                     >
//                       {tag}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex space-x-4">
//                 <button
//                   type="submit"
//                   className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover-lift transition-all duration-300 flex-1"
//                 >
//                   Publish Post
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setFormData({
//                     author: '',
//                     content: '',
//                     category: 'general',
//                     tags: []
//                   })}
//                   className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
//                 >
//                   Clear
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
//             <h3 className="text-xl font-semibold text-blue-800 mb-4">Community Guidelines</h3>
//             <ul className="space-y-3 text-blue-700 text-sm">
//               <li className="flex items-start space-x-2">
//                 <span className="text-blue-500 mt-1">✓</span>
//                 <span>Be respectful and kind to all members</span>
//               </li>
//               <li className="flex items-start space-x-2">
//                 <span className="text-blue-500 mt-1">✓</span>
//                 <span>Share experiences, not medical advice</span>
//               </li>
//               <li className="flex items-start space-x-2">
//                 <span className="text-blue-500 mt-1">✓</span>
//                 <span>Maintain privacy - no personal information</span>
//               </li>
//               <li className="flex items-start space-x-2">
//                 <span className="text-blue-500 mt-1">✓</span>
//                 <span>Use appropriate categories and tags</span>
//               </li>
//               <li className="flex items-start space-x-2">
//                 <span className="text-blue-500 mt-1">✓</span>
//                 <span>Report any inappropriate content</span>
//               </li>
//             </ul>
//           </div>

//           <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
//             <h3 className="text-xl font-semibold text-purple-800 mb-4">Posting Tips</h3>
//             <ul className="space-y-3 text-purple-700 text-sm">
//               <li className="flex items-start space-x-2">
//                 <span className="text-purple-500 mt-1">💡</span>
//                 <span>Be specific about your experiences</span>
//               </li>
//               <li className="flex items-start space-x-2">
//                 <span className="text-purple-500 mt-1">💡</span>
//                 <span>Ask clear, focused questions</span>
//               </li>
//               <li className="flex items-start space-x-2">
//                 <span className="text-purple-500 mt-1">💡</span>
//                 <span>Use tags to help others find your post</span>
//               </li>
//               <li className="flex items-start space-x-2">
//                 <span className="text-purple-500 mt-1">💡</span>
//                 <span>Engage with comments on your posts</span>
//               </li>
//               <li className="flex items-start space-x-2">
//                 <span className="text-purple-500 mt-1">💡</span>
//                 <span>Celebrate others' successes too!</span>
//               </li>
//             </ul>
//           </div>

//           <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
//             <h3 className="text-xl font-semibold text-green-800 mb-4">What Makes a Great Post?</h3>
//             <div className="space-y-3 text-green-700 text-sm">
//               <div className="bg-white rounded-lg p-3">
//                 <h4 className="font-semibold text-green-600 mb-1">✅ Do:</h4>
//                 <ul className="space-y-1">
//                   <li>• Share personal experiences</li>
//                   <li>• Ask for specific advice</li>
//                   <li>• Offer encouragement</li>
//                   <li>• Celebrate milestones</li>
//                 </ul>
//               </div>
//               <div className="bg-white rounded-lg p-3">
//                 <h4 className="font-semibold text-red-600 mb-1">❌ Don't:</h4>
//                 <ul className="space-y-1">
//                   <li>• Give medical diagnoses</li>
//                   <li>• Share false information</li>
//                   <li>• Use offensive language</li>
//                   <li>• Spam or self-promote</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;
