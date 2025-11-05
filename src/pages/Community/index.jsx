// import React, { useState, useEffect } from 'react';
// import { apiService } from '../../services/api';
// import { useApp } from '../../contexts/AppContext';

// const Community = () => {
//   const { state, dispatch } = useApp();
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [newPost, setNewPost] = useState({
//     author: '',
//     content: ''
//   });

//   useEffect(() => {
//     fetchCommunityPosts();
//   }, []);

//   const fetchCommunityPosts = async () => {
//     try {
//       const posts = await apiService.getCommunityPosts();
//       // In a real app, you would dispatch these to your state
//       console.log('Fetched posts:', posts);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };

//   const handleCreatePost = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch({ type: 'SET_LOADING', payload: true });
//       const result = await apiService.createPost(newPost);
//       dispatch({ type: 'ADD_COMMUNITY_POST', payload: result });
//       setNewPost({ author: '', content: '' });
//       setShowCreateForm(false);
//       alert('Post created successfully!');
//     } catch (error) {
//       alert('Error creating post');
//     } finally {
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };

//   // Sample posts for demonstration
//   const samplePosts = [
//     {
//       id: 1,
//       author: 'Sarah M.',
//       content: 'Just completed my 30-day cycle tracking! MyLab helped me understand my patterns so much better. Highly recommend sticking with it!',
//       timestamp: '2 hours ago',
//       likes: 15,
//       comments: 3
//     },
//     {
//       id: 2,
//       author: 'Mike T.',
//       content: 'The sleep tracking feature completely changed my routine. Going from 5 to 7.5 hours of sleep has made such a difference in my energy levels!',
//       timestamp: '5 hours ago',
//       likes: 8,
//       comments: 2
//     },
//     {
//       id: 3,
//       author: 'Dr. Jessica L.',
//       content: 'As a healthcare professional, I appreciate how MyLab empowers people to take control of their health data. The insights are genuinely helpful!',
//       timestamp: '1 day ago',
//       likes: 25,
//       comments: 7
//     },
//     {
//       id: 4,
//       author: 'Alex K.',
//       content: 'The community here is so supportive. Thanks everyone for sharing your experiences and tips!',
//       timestamp: '2 days ago',
//       likes: 12,
//       comments: 4
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-soft-blue to-soft-pink py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//             Community
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Connect, share experiences, and support each other on your wellness journeys
//           </p>
//         </div>

//         {/* Create Post Button */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//           <button
//             onClick={() => setShowCreateForm(!showCreateForm)}
//             className="w-full bg-gradient-to-r from-sky-blue to-light-pink text-white py-4 rounded-lg font-semibold hover-lift transition-all duration-300"
//           >
//             {showCreateForm ? 'Cancel' : 'Create New Post'}
//           </button>

//           {/* Create Post Form */}
//           {showCreateForm && (
//             <form onSubmit={handleCreatePost} className="mt-6 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={newPost.author}
//                   onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-blue focus:border-transparent"
//                   placeholder="Enter your name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   What's on your mind?
//                 </label>
//                 <textarea
//                   required
//                   value={newPost.content}
//                   onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//                   rows="4"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-blue focus:border-transparent"
//                   placeholder="Share your experiences, ask questions, or offer support..."
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover-lift transition-all duration-300"
//               >
//                 Post to Community
//               </button>
//             </form>
//           )}
//         </div>

//         {/* Community Posts */}
//         <div className="space-y-6">
//           {samplePosts.map(post => (
//             <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 hover-lift transition-all duration-300">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h3 className="font-semibold text-gray-800">{post.author}</h3>
//                   <p className="text-gray-500 text-sm">{post.timestamp}</p>
//                 </div>
//               </div>

//               <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

//               <div className="flex items-center space-x-6 text-gray-500">
//                 <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
//                   <span>❤️</span>
//                   <span>{post.likes}</span>
//                 </button>
//                 <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
//                   <span>💬</span>
//                   <span>{post.comments} comments</span>
//                 </button>
//                 <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
//                   <span>🔄</span>
//                   <span>Share</span>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Community Guidelines */}
//         <div className="bg-yellow-50 rounded-2xl p-6 mt-8 border-2 border-yellow-200">
//           <h3 className="text-xl font-semibold text-yellow-800 mb-4">Community Guidelines</h3>
//           <ul className="space-y-2 text-yellow-700">
//             <li>• Be respectful and supportive of all members</li>
//             <li>• Share experiences, not medical advice</li>
//             <li>• Maintain privacy - don't share personal information</li>
//             <li>• Report any inappropriate content</li>
//             <li>• Remember that everyone's journey is unique</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Community;
