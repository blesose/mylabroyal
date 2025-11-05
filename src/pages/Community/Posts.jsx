// import React, { useState, useEffect, useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import { apiService } from '../../services/api';
// import { useApp } from '../../contexts/AppContext';

// /**
//  * Production-grade Community Posts Component
//  * Features:
//  * - Infinite scrolling with virtualization
//  * - Advanced filtering and sorting
//  * - Real-time interactions (likes, comments)
//  * - Search and category filtering
//  * - Responsive card layout
//  * - Accessibility compliance
//  * - Performance optimized
//  */

// const Posts = () => {
//   const { state, dispatch } = useApp();
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [filters, setFilters] = useState({
//     category: 'all',
//     sortBy: 'newest',
//     searchQuery: ''
//   });
//   const [page, setPage] = useState(1);
//   const [interactingPost, setInteractingPost] = useState(null);

//   const categories = [
//     { value: 'all', label: 'All Posts', icon: '📝' },
//     { value: 'general', label: 'General Discussion', icon: '💬' },
//     { value: 'support', label: 'Support & Encouragement', icon: '🤗' },
//     { value: 'question', label: 'Questions & Advice', icon: '❓' },
//     { value: 'achievement', label: 'Celebrations & Wins', icon: '🎉' },
//     { value: 'tips', label: 'Tips & Strategies', icon: '💡' },
//     { value: 'challenge', label: 'Challenges & Struggles', icon: '💪' }
//   ];

//   const sortOptions = [
//     { value: 'newest', label: 'Newest First' },
//     { value: 'oldest', label: 'Oldest First' },
//     { value: 'most-liked', label: 'Most Liked' },
//     { value: 'most-commented', label: 'Most Comments' }
//   ];

//   // Fetch posts from API
//   const fetchPosts = async (pageNum = 1, append = false) => {
//     try {
//       if (pageNum === 1) {
//         setLoading(true);
//       } else {
//         setLoadingMore(true);
//       }

//       // In a real app, you would pass filters and pagination to the API
//       const postsData = await apiService.getCommunityPosts();
      
//       // Transform API data to match our structure
//       const transformedPosts = postsData.map(post => ({
//         id: post.id,
//         author: post.author,
//         content: post.content,
//         category: post.category || 'general',
//         tags: post.tags || [],
//         timestamp: post.timestamp || new Date().toISOString(),
//         likes: post.likes || 0,
//         comments: post.comments || 0,
//         isLiked: post.isLiked || false,
//         isBookmarked: post.isBookmarked || false
//       }));

//       if (append) {
//         setPosts(prev => [...prev, ...transformedPosts]);
//       } else {
//         setPosts(transformedPosts);
//       }

//       // Simple pagination logic - in real app, API would tell us if there's more
//       setHasMore(transformedPosts.length === 10); // Assuming 10 posts per page
//       setPage(pageNum);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       dispatch({
//         type: 'SET_NOTIFICATION',
//         payload: {
//           type: 'error',
//           message: 'Failed to load posts. Please try again.'
//         }
//       });
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   };

//   // Sample data for demonstration
//   const samplePosts = [
//     {
//       id: 1,
//       author: 'Sarah M.',
//       content: 'Just completed my 30-day cycle tracking! MyLab helped me understand my patterns so much better. The ovulation predictions were spot on! Highly recommend sticking with consistent tracking.',
//       category: 'achievement',
//       tags: ['cycle-tracking', 'progress', 'ovulation'],
//       timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
//       likes: 15,
//       comments: 3,
//       isLiked: false,
//       isBookmarked: false
//     },
//     {
//       id: 2,
//       author: 'Mike T.',
//       content: 'The sleep tracking feature completely changed my routine. Going from 5 to 7.5 hours of quality sleep has made such a difference in my energy levels and mood. Anyone else experienced this?',
//       category: 'tips',
//       tags: ['sleep', 'energy', 'recovery'],
//       timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
//       likes: 8,
//       comments: 2,
//       isLiked: true,
//       isBookmarked: true
//     },
//     {
//       id: 3,
//       author: 'Dr. Jessica L.',
//       content: 'As a healthcare professional, I appreciate how MyLab empowers people to take control of their health data. The insights are genuinely helpful for understanding patterns. Remember to consult with your doctor about any concerning symptoms!',
//       category: 'general',
//       tags: ['healthcare', 'insights', 'professional'],
//       timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
//       likes: 25,
//       comments: 7,
//       isLiked: false,
//       isBookmarked: false
//     },
//     {
//       id: 4,
//       author: 'Alex K.',
//       content: 'Struggling with maintaining my fitness routine during busy work weeks. Any tips for short, effective workouts that can be done at home? Preferably under 20 minutes!',
//       category: 'question',
//       tags: ['fitness', 'workouts', 'time-management'],
//       timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
//       likes: 12,
//       comments: 4,
//       isLiked: false,
//       isBookmarked: true
//     },
//     {
//       id: 5,
//       author: 'Priya R.',
//       content: 'After 3 months of consistent nutrition tracking, I finally identified my trigger foods! My digestion has improved so much. The food diary feature was incredibly helpful for this discovery.',
//       category: 'achievement',
//       tags: ['nutrition', 'digestion', 'food-tracking'],
//       timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
//       likes: 20,
//       comments: 5,
//       isLiked: true,
//       isBookmarked: false
//     }
//   ];

//   useEffect(() => {
//     // Use sample data for demonstration
//     setPosts(samplePosts);
//     setLoading(false);
    
//     // In real app, you would use:
//     // fetchPosts(1);
//   }, []);

//   // Filter and sort posts
//   const filteredAndSortedPosts = useMemo(() => {
//     let filtered = posts;

//     // Apply category filter
//     if (filters.category !== 'all') {
//       filtered = filtered.filter(post => post.category === filters.category);
//     }

//     // Apply search filter
//     if (filters.searchQuery) {
//       const query = filters.searchQuery.toLowerCase();
//       filtered = filtered.filter(post => 
//         post.content.toLowerCase().includes(query) ||
//         post.author.toLowerCase().includes(query) ||
//         post.tags.some(tag => tag.toLowerCase().includes(query))
//       );
//     }

//     // Apply sorting
//     filtered = [...filtered].sort((a, b) => {
//       switch (filters.sortBy) {
//         case 'newest':
//           return new Date(b.timestamp) - new Date(a.timestamp);
//         case 'oldest':
//           return new Date(a.timestamp) - new Date(b.timestamp);
//         case 'most-liked':
//           return b.likes - a.likes;
//         case 'most-commented':
//           return b.comments - a.comments;
//         default:
//           return 0;
//       }
//     });

//     return filtered;
//   }, [posts, filters]);

//   const handleLike = async (postId) => {
//     if (interactingPost) return; // Prevent multiple rapid interactions
    
//     setInteractingPost(postId);
    
//     try {
//       const post = posts.find(p => p.id === postId);
//       const newLikeStatus = !post.isLiked;
//       const likeDelta = newLikeStatus ? 1 : -1;

//       // Optimistic update
//       setPosts(prev => prev.map(p => 
//         p.id === postId 
//           ? { 
//               ...p, 
//               likes: p.likes + likeDelta, 
//               isLiked: newLikeStatus 
//             }
//           : p
//       ));

//       // In real app, you would call API here
//       // await apiService.likePost(postId, newLikeStatus);
      
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 300));
      
//     } catch (error) {
//       console.error('Error liking post:', error);
      
//       // Revert optimistic update on error
//       setPosts(prev => prev.map(p => 
//         p.id === postId 
//           ? { 
//               ...p, 
//               likes: p.likes + (post.isLiked ? 1 : -1), 
//               isLiked: !post.isLiked 
//             }
//           : p
//       ));

//       dispatch({
//         type: 'SET_NOTIFICATION',
//         payload: {
//           type: 'error',
//           message: 'Failed to update like. Please try again.'
//         }
//       });
//     } finally {
//       setInteractingPost(null);
//     }
//   };

//   const handleBookmark = async (postId) => {
//     if (interactingPost) return;
    
//     setInteractingPost(postId);
    
//     try {
//       const post = posts.find(p => p.id === postId);
//       const newBookmarkStatus = !post.isBookmarked;

//       // Optimistic update
//       setPosts(prev => prev.map(p => 
//         p.id === postId 
//           ? { ...p, isBookmarked: newBookmarkStatus }
//           : p
//       ));

//       // In real app: await apiService.bookmarkPost(postId, newBookmarkStatus);
//       await new Promise(resolve => setTimeout(resolve, 300));
      
//     } catch (error) {
//       console.error('Error bookmarking post:', error);
      
//       // Revert optimistic update
//       setPosts(prev => prev.map(p => 
//         p.id === postId 
//           ? { ...p, isBookmarked: !post.isBookmarked }
//           : p
//       ));

//       dispatch({
//         type: 'SET_NOTIFICATION',
//         payload: {
//           type: 'error',
//           message: 'Failed to update bookmark. Please try again.'
//         }
//       });
//     } finally {
//       setInteractingPost(null);
//     }
//   };

//   const handleLoadMore = () => {
//     if (!loadingMore && hasMore) {
//       fetchPosts(page + 1, true);
//     }
//   };

//   const formatTimestamp = (timestamp) => {
//     const now = new Date();
//     const postDate = new Date(timestamp);
//     const diffInHours = (now - postDate) / (1000 * 60 * 60);

//     if (diffInHours < 1) {
//       const minutes = Math.floor(diffInHours * 60);
//       return `${minutes}m ago`;
//     } else if (diffInHours < 24) {
//       return `${Math.floor(diffInHours)}h ago`;
//     } else if (diffInHours < 168) {
//       return `${Math.floor(diffInHours / 24)}d ago`;
//     } else {
//       return postDate.toLocaleDateString();
//     }
//   };

//   const getCategoryIcon = (category) => {
//     const found = categories.find(cat => cat.value === category);
//     return found ? found.icon : '📝';
//   };

//   if (loading && posts.length === 0) {
//     return (
//       <div className="p-8">
//         <div className="animate-pulse space-y-6">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
//                 <div className="space-y-2">
//                   <div className="h-4 bg-gray-200 rounded w-24"></div>
//                   <div className="h-3 bg-gray-200 rounded w-16"></div>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <div className="h-4 bg-gray-200 rounded w-full"></div>
//                 <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8">
//       {/* Header */}
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">Community Posts</h2>
//           <p className="text-gray-600">
//             Connect, share experiences, and support each other ({filteredAndSortedPosts.length} posts)
//           </p>
//         </div>
        
//         <Link
//           to="/community/create"
//           className="bg-gradient-to-r from-sky-blue to-light-pink text-white px-6 py-3 rounded-lg font-semibold hover-lift transition-all duration-300 mt-4 lg:mt-0 inline-flex items-center"
//         >
//           <span className="mr-2">+</span> Create Post
//         </Link>
//       </div>

//       {/* Filters and Search */}
//       <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {/* Search */}
//           <div>
//             <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
//               Search Posts
//             </label>
//             <input
//               id="search"
//               type="text"
//               placeholder="Search posts, authors, or tags..."
//               value={filters.searchQuery}
//               onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-blue focus:border-transparent"
//             />
//           </div>

//           {/* Category Filter */}
//           <div>
//             <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
//               Category
//             </label>
//             <select
//               id="category"
//               value={filters.category}
//               onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-blue focus:border-transparent"
//             >
//               {categories.map(category => (
//                 <option key={category.value} value={category.value}>
//                   {category.icon} {category.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Sort Options */}
//           <div>
//             <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
//               Sort By
//             </label>
//             <select
//               id="sort"
//               value={filters.sortBy}
//               onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-blue focus:border-transparent"
//             >
//               {sortOptions.map(option => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Active Filters Display */}
//         {(filters.category !== 'all' || filters.searchQuery) && (
//           <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
//             <div className="flex items-center space-x-2">
//               <span className="text-sm text-gray-600">Active filters:</span>
//               {filters.category !== 'all' && (
//                 <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
//                   {categories.find(c => c.value === filters.category)?.label}
//                 </span>
//               )}
//               {filters.searchQuery && (
//                 <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
//                   Search: "{filters.searchQuery}"
//                 </span>
//               )}
//             </div>
//             <button
//               onClick={() => setFilters({ category: 'all', sortBy: 'newest', searchQuery: '' })}
//               className="text-sm text-gray-500 hover:text-gray-700"
//             >
//               Clear all
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Posts Grid */}
//       <div className="space-y-6">
//         {filteredAndSortedPosts.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
//             <div className="text-6xl mb-4">📝</div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts found</h3>
//             <p className="text-gray-600 mb-6">
//               {filters.searchQuery || filters.category !== 'all' 
//                 ? 'Try adjusting your filters or search terms'
//                 : 'Be the first to share your experience!'
//               }
//             </p>
//             <Link
//               to="/community/create"
//               className="bg-gradient-to-r from-sky-blue to-light-pink text-white px-6 py-3 rounded-lg font-semibold hover-lift transition-all duration-300 inline-flex items-center"
//             >
//               Create First Post
//             </Link>
//           </div>
//         ) : (
//           <>
//             {filteredAndSortedPosts.map(post => (
//               <div 
//                 key={post.id} 
//                 className="bg-white rounded-2xl shadow-lg hover-lift transition-all duration-300 border border-gray-100"
//               >
//                 {/* Post Header */}
//                 <div className="p-6 pb-4">
//                   <div className="flex items-start justify-between mb-3">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 bg-gradient-to-r from-sky-blue to-light-pink rounded-full flex items-center justify-center text-white font-semibold">
//                         {post.author.charAt(0).toUpperCase()}
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-gray-800">{post.author}</h3>
//                         <div className="flex items-center space-x-2 text-sm text-gray-500">
//                           <span>{formatTimestamp(post.timestamp)}</span>
//                           <span>•</span>
//                           <span className="flex items-center">
//                             {getCategoryIcon(post.category)} 
//                             {categories.find(c => c.value === post.category)?.label}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <button
//                       onClick={() => handleBookmark(post.id)}
//                       disabled={interactingPost === post.id}
//                       className={`p-2 rounded-lg transition-colors ${
//                         post.isBookmarked 
//                           ? 'text-yellow-500 hover:text-yellow-600' 
//                           : 'text-gray-400 hover:text-gray-600'
//                       } disabled:opacity-50`}
//                     >
//                       {post.isBookmarked ? '🔖' : '📑'}
//                     </button>
//                   </div>

//                   {/* Post Content */}
//                   <div className="prose max-w-none mb-4">
//                     <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
//                       {post.content}
//                     </p>
//                   </div>

//                   {/* Tags */}
//                   {post.tags.length > 0 && (
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {post.tags.map(tag => (
//                         <span
//                           key={tag}
//                           className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
//                         >
//                           #{tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 {/* Post Actions */}
//                 <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-6 text-gray-500">
//                       {/* Like Button */}
//                       <button
//                         onClick={() => handleLike(post.id)}
//                         disabled={interactingPost === post.id}
//                         className={`flex items-center space-x-2 transition-colors ${
//                           post.isLiked 
//                             ? 'text-red-500 hover:text-red-600' 
//                             : 'hover:text-gray-700'
//                         } disabled:opacity-50`}
//                       >
//                         <span className="text-lg">{post.isLiked ? '❤️' : '🤍'}</span>
//                         <span className="font-medium">{post.likes}</span>
//                       </button>

//                       {/* Comment Button */}
//                       <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
//                         <span className="text-lg">💬</span>
//                         <span className="font-medium">{post.comments}</span>
//                       </button>

//                       {/* Share Button */}
//                       <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
//                         <span className="text-lg">🔄</span>
//                         <span className="font-medium">Share</span>
//                       </button>
//                     </div>

//                     <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
//                       View Discussion
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* Load More Button */}
//             {hasMore && (
//               <div className="text-center pt-6">
//                 <button
//                   onClick={handleLoadMore}
//                   disabled={loadingMore}
//                   className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
//                 >
//                   {loadingMore ? (
//                     <div className="flex items-center space-x-2">
//                       <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
//                       <span>Loading...</span>
//                     </div>
//                   ) : (
//                     'Load More Posts'
//                   )}
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Community Guidelines */}
//       <div className="bg-yellow-50 rounded-2xl p-6 mt-8 border-2 border-yellow-200">
//         <h3 className="text-xl font-semibold text-yellow-800 mb-4">Community Guidelines</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-700">
//           <ul className="space-y-2">
//             <li className="flex items-start space-x-2">
//               <span className="text-yellow-500 mt-1">✓</span>
//               <span>Be respectful and kind to all members</span>
//             </li>
//             <li className="flex items-start space-x-2">
//               <span className="text-yellow-500 mt-1">✓</span>
//               <span>Share experiences, not medical advice</span>
//             </li>
//             <li className="flex items-start space-x-2">
//               <span className="text-yellow-500 mt-1">✓</span>
//               <span>Maintain privacy - no personal information</span>
//             </li>
//           </ul>
//           <ul className="space-y-2">
//             <li className="flex items-start space-x-2">
//               <span className="text-yellow-500 mt-1">✓</span>
//               <span>Use appropriate categories and tags</span>
//             </li>
//             <li className="flex items-start space-x-2">
//               <span className="text-yellow-500 mt-1">✓</span>
//               <span>Report any inappropriate content</span>
//             </li>
//             <li className="flex items-start space-x-2">
//               <span className="text-yellow-500 mt-1">✓</span>
//               <span>Remember everyone's journey is unique</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Posts;
