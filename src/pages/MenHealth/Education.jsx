// import React, { useState } from 'react';
// import Button from '../../components/ui/Button';
// import Card, { CardContent } from '../../components/ui/Card';

// const Education = () => {
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   const categories = [
//     { id: 'all', name: 'All Topics', icon: '📚', count: 32 },
//     { id: 'fitness', name: 'Fitness', icon: '💪', count: 8 },
//     { id: 'nutrition', name: 'Nutrition', icon: '🍎', count: 6 },
//     { id: 'mental', name: 'Mental Health', icon: '🧠', count: 5 },
//     { id: 'hormonal', name: 'Hormonal Health', icon: '⚡', count: 4 },
//     { id: 'preventive', name: 'Preventive Care', icon: '🛡️', count: 7 },
//   ];

//   const articles = [
//     {
//       id: 1,
//       title: 'Testosterone Optimization: Science-Backed Strategies',
//       category: 'hormonal',
//       readTime: '12 min',
//       difficulty: 'Intermediate',
//       icon: '⚡',
//       color: 'from-vibrant-teal to-electric-blue',
//       excerpt: 'Guide to naturally optimizing testosterone levels through lifestyle, nutrition, and exercise.',
//       featured: true,
//     },
//     {
//       id: 2,
//       title: 'Strength Training Fundamentals for Men',
//       category: 'fitness',
//       readTime: '15 min',
//       difficulty: 'Beginner',
//       icon: '💪',
//       color: 'from-electric-blue to-vibrant-teal',
//       excerpt: 'Master the basics of strength training with proper form, programming, and progression techniques.',
//       featured: true,
//     },
//     // ... other articles
//   ];

//   const filteredArticles = selectedCategory === 'all'
//     ? articles
//     : articles.filter(article => article.category === selectedCategory);

//   const featuredArticles = articles.filter(article => article.featured);

//   return (
//     <div className="min-h-screen bg-midnight-blue/5 py-12">
//       {/* Categories */}
//       <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide max-w-7xl mx-auto px-4 sm:px-6">
//         {categories.map(category => (
//           <button
//             key={category.id}
//             onClick={() => setSelectedCategory(category.id)}
//             className={`flex items-center gap-3 px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 font-semibold ${
//               selectedCategory === category.id
//                 ? 'bg-gradient-health text-off-white shadow-lg'
//                 : 'bg-off-white text-charcoal-grey hover:bg-soft-mint/40'
//             }`}
//           >
//             <span className="text-lg">{category.icon}</span>
//             {category.name}
//             <span className={`text-sm px-2 py-1 rounded-full ${
//               selectedCategory === category.id
//                 ? 'bg-off-white/20 text-off-white'
//                 : 'bg-soft-mint/40 text-charcoal-grey'
//             }`}>{category.count}</span>
//           </button>
//         ))}
//       </div>

//       {/* Featured Articles */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
//         <h2 className="text-3xl font-display font-bold text-midnight-blue mb-6">
//           Featured Guides
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {featuredArticles.map(article => (
//             <Card key={article.id} className="group hover:shadow-medium transition-all duration-300">
//               <CardContent>
//                 <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-r ${article.color} text-off-white`}>
//                   <span className="text-2xl">{article.icon}</span>
//                 </div>
//                 <h3 className="text-xl font-semibold text-midnight-blue mb-2">{article.title}</h3>
//                 <p className="text-charcoal-grey text-sm mb-4">{article.excerpt}</p>
//                 <Button variant="primary" className="w-full bg-gradient-health hover:opacity-90" icon="📖">
//                   Read Article
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* All Articles */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
//         <h2 className="text-3xl font-display font-bold text-midnight-blue mb-6">
//           Royal Knowledge Library
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredArticles.map(article => (
//             <div key={article.id} className="bg-off-white rounded-4xl p-6 shadow-soft hover:shadow-medium transition-all duration-300">
//               <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 bg-gradient-to-r ${article.color} text-off-white`}>
//                 <span className="text-lg">{article.icon}</span>
//               </div>
//               <h3 className="text-xl font-semibold text-midnight-blue mb-2">{article.title}</h3>
//               <p className="text-charcoal-grey text-sm mb-4">{article.excerpt}</p>
//               <Button variant="secondary" className="w-full bg-soft-mint hover:bg-vibrant-teal text-midnight-blue" icon="👁️">
//                 Read
//               </Button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Education;

// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
// // import Button from '../../components/ui/Button';

// // const Education = () => {
// //   const [selectedCategory, setSelectedCategory] = useState('all');

// //   const categories = [
// //     { id: 'all', name: 'All Topics', icon: '📚', count: 32 },
// //     { id: 'fitness', name: 'Fitness', icon: '💪', count: 8 },
// //     { id: 'nutrition', name: 'Nutrition', icon: '🍎', count: 6 },
// //     { id: 'mental', name: 'Mental Health', icon: '🧠', count: 5 },
// //     { id: 'hormonal', name: 'Hormonal Health', icon: '⚡', count: 4 },
// //     { id: 'preventive', name: 'Preventive Care', icon: '🛡️', count: 7 }
// //   ];

// //   const articles = [
// //     {
// //       id: 1,
// //       title: 'Testosterone Optimization: Science-Backed Strategies',
// //       category: 'hormonal',
// //       readTime: '12 min',
// //       difficulty: 'Intermediate',
// //       icon: '⚡',
// //       color: 'from-orange-500 to-red-500',
// //       excerpt: 'Comprehensive guide to naturally optimizing testosterone levels through lifestyle, nutrition, and exercise.',
// //       featured: true
// //     },
// //     {
// //       id: 2,
// //       title: 'Strength Training Fundamentals for Men',
// //       category: 'fitness',
// //       readTime: '15 min',
// //       difficulty: 'Beginner',
// //       icon: '💪',
// //       color: 'from-green-500 to-emerald-500',
// //       excerpt: 'Master the basics of strength training with proper form, programming, and progression techniques.',
// //       featured: true
// //     },
// //     {
// //       id: 3,
// //       title: 'Nutrition for Muscle Growth and Recovery',
// //       category: 'nutrition',
// //       readTime: '10 min',
// //       difficulty: 'Beginner',
// //       icon: '🍎',
// //       color: 'from-blue-500 to-cyan-500',
// //       excerpt: 'Optimal nutrition strategies to support muscle growth, enhance recovery, and improve performance.',
// //       featured: false
// //     },
// //     {
// //       id: 4,
// //       title: 'Stress Management for High-Performance Men',
// //       category: 'mental',
// //       readTime: '8 min',
// //       difficulty: 'Beginner',
// //       icon: '🧠',
// //       color: 'from-purple-500 to-pink-500',
// //       excerpt: 'Effective techniques to manage stress and maintain mental clarity in demanding environments.',
// //       featured: true
// //     },
// //     {
// //       id: 5,
// //       title: 'Heart Health: Prevention and Monitoring',
// //       category: 'preventive',
// //       readTime: '14 min',
// //       difficulty: 'Intermediate',
// //       icon: '❤️',
// //       color: 'from-red-500 to-pink-500',
// //       excerpt: 'Comprehensive guide to cardiovascular health, risk factors, and preventive measures for men.',
// //       featured: false
// //     },
// //     {
// //       id: 6,
// //       title: 'Sleep Optimization for Peak Performance',
// //       category: 'fitness',
// //       readTime: '9 min',
// //       difficulty: 'Beginner',
// //       icon: '😴',
// //       color: 'from-indigo-500 to-blue-500',
// //       excerpt: 'How to optimize your sleep for better recovery, hormone balance, and cognitive function.',
// //       featured: false
// //     },
// //     {
// //       id: 7,
// //       title: 'Prostate Health: What Every Man Should Know',
// //       category: 'preventive',
// //       readTime: '11 min',
// //       difficulty: 'Intermediate',
// //       icon: '🛡️',
// //       color: 'from-teal-500 to-green-500',
// //       excerpt: 'Essential information about prostate health, screening, and preventive lifestyle choices.',
// //       featured: false
// //     },
// //     {
// //       id: 8,
// //       title: 'Mental Resilience Building Strategies',
// //       category: 'mental',
// //       readTime: '13 min',
// //       difficulty: 'Advanced',
// //       icon: '🎯',
// //       color: 'from-yellow-500 to-orange-500',
// //       excerpt: 'Advanced techniques to build mental toughness and resilience in challenging situations.',
// //       featured: true
// //     }
// //   ];

// //   const filteredArticles = selectedCategory === 'all' 
// //     ? articles 
// //     : articles.filter(article => article.category === selectedCategory);

// //   const featuredArticles = articles.filter(article => article.featured);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-cyan-50/20">
// //       {/* Hero Section */}
// //       <section className="relative py-16 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/30 overflow-hidden">
// //         <div className="absolute inset-0 overflow-hidden">
// //           <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl animate-float"></div>
// //           <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-indigo-200/30 to-blue-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
// //         </div>

// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
// //           <div className="text-center">
// //             <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl mb-8 shadow-2xl animate-glow">
// //               <span className="text-4xl text-white">📚</span>
// //             </div>
// //             <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
// //               Royal Men's Health Education
// //             </h1>
// //             <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
// //               Expert-curated knowledge to optimize your performance, vitality, and longevity
// //             </p>
// //             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
// //               <Button
// //                 variant="primary"
// //                 size="xl"
// //                 className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-12"
// //                 icon="🔍"
// //               >
// //                 Search Topics
// //               </Button>
// //               <Button
// //                 variant="secondary"
// //                 size="xl"
// //                 className="px-12"
// //                 icon="📖"
// //               >
// //                 Browse All
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Categories Navigation */}
// //       <section className="py-12 bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
// //             {categories.map((category) => (
// //               <button
// //                 key={category.id}
// //                 onClick={() => setSelectedCategory(category.id)}
// //                 className={`flex items-center space-x-3 px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 min-w-max ${
// //                   selectedCategory === category.id
// //                     ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
// //                     : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
// //                 }`}
// //               >
// //                 <span className="text-lg">{category.icon}</span>
// //                 <span className="font-semibold">{category.name}</span>
// //                 <span className={`text-sm px-2 py-1 rounded-full ${
// //                   selectedCategory === category.id
// //                     ? 'bg-white/20 text-white'
// //                     : 'bg-gray-100 text-gray-600'
// //                 }`}>
// //                   {category.count}
// //                 </span>
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Featured Articles */}
// //       <section className="py-16">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-12">
// //             <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
// //               Featured Royal Guides
// //             </h2>
// //             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
// //               Essential reading for every man's health journey, curated by royal health experts
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
// //             {featuredArticles.map((article) => (
// //               <Card key={article.id} hover glow className="group">
// //                 <CardContent>
// //                   <div className={`w-16 h-16 bg-gradient-to-r ${article.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
// //                     <span className="text-2xl text-white">{article.icon}</span>
// //                   </div>
// //                   <div className="flex items-center space-x-4 mb-4">
// //                     <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
// //                       {article.difficulty}
// //                     </span>
// //                     <span className="text-sm text-gray-500 flex items-center">
// //                       ⏱️ {article.readTime}
// //                     </span>
// //                   </div>
// //                   <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
// //                     {article.title}
// //                   </h3>
// //                   <p className="text-gray-600 leading-relaxed mb-6">
// //                     {article.excerpt}
// //                   </p>
// //                   <Button variant="ghost" className="w-full group-hover:bg-blue-50 group-hover:text-blue-600" icon="📖">
// //                     Read Article
// //                   </Button>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* All Articles Grid */}
// //       <section className="py-16 bg-gradient-to-br from-blue-50/30 to-cyan-50/30">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-12">
// //             <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
// //               Royal Knowledge Library
// //             </h2>
// //             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
// //               Explore our comprehensive collection of men's health articles and resources
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {filteredArticles.map((article) => (
// //               <div key={article.id} className="group">
// //                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-white/60 backdrop-blur-sm h-full flex flex-col">
// //                   <div className="flex items-start justify-between mb-4">
// //                     <div className={`w-12 h-12 bg-gradient-to-r ${article.color} rounded-xl flex items-center justify-center text-white`}>
// //                       <span className="text-lg">{article.icon}</span>
// //                     </div>
// //                     <div className="text-right">
// //                       <span className="text-sm text-gray-500">{article.readTime}</span>
// //                       <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full mt-1">
// //                         {article.difficulty}
// //                       </div>
// //                     </div>
// //                   </div>
                  
// //                   <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
// //                     {article.title}
// //                   </h3>
                  
// //                   <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
// //                     {article.excerpt}
// //                   </p>
                  
// //                   <div className="flex items-center justify-between pt-4 border-t border-gray-100">
// //                     <span className="text-xs text-gray-500 capitalize">
// //                       {article.category}
// //                     </span>
// //                     <Button variant="ghost" size="small" className="text-blue-600 hover:bg-blue-50" icon="👁️">
// //                       Read
// //                     </Button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {filteredArticles.length === 0 && (
// //             <div className="text-center py-12">
// //               <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
// //                 <span className="text-3xl text-white">🔍</span>
// //               </div>
// //               <h3 className="text-2xl font-bold text-gray-700 mb-3">No articles found</h3>
// //               <p className="text-gray-600 mb-6">Try selecting a different category or search term</p>
// //               <Button 
// //                 variant="primary" 
// //                 onClick={() => setSelectedCategory('all')}
// //                 icon="🔄"
// //               >
// //                 Show All Articles
// //               </Button>
// //             </div>
// //           )}
// //         </div>
// //       </section>

// //       {/* Expert Section */}
// //       <section className="py-20 bg-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
// //             <div>
// //               <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
// //                 Royal Health Experts
// //               </h2>
// //               <p className="text-xl text-gray-600 mb-8 leading-relaxed">
// //                 Our content is carefully curated and reviewed by a team of royal health professionals, including urologists, sports medicine specialists, nutritionists, and mental health experts.
// //               </p>
// //               <div className="space-y-4">
// //                 {[
// //                   { name: 'Dr. Michael Chen', specialty: 'Sports Medicine', icon: '💪' },
// //                   { name: 'Dr. James Rodriguez', specialty: 'Urology', icon: '🩺' },
// //                   { name: 'David Wilson, RD', specialty: 'Men\'s Nutrition', icon: '🍎' },
// //                   { name: 'Dr. Sarah Thompson', specialty: 'Mental Health', icon: '🧠' }
// //                 ].map((expert, index) => (
// //                   <div key={expert.name} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50/80 hover:bg-white transition-all duration-300">
// //                     <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white">
// //                       <span className="text-lg">{expert.icon}</span>
// //                     </div>
// //                     <div>
// //                       <div className="font-semibold text-gray-800">{expert.name}</div>
// //                       <div className="text-sm text-gray-600">{expert.specialty}</div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white">
// //               <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
// //               <p className="text-blue-100 mb-6 text-lg">
// //                 Get the latest royal men's health insights and articles delivered directly to your inbox.
// //               </p>
// //               <div className="space-y-4">
// //                 <input
// //                   type="email"
// //                   placeholder="Your royal email address..."
// //                   className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
// //                 />
// //                 <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50" icon="📬">
// //                   Subscribe to Royal Updates
// //                 </Button>
// //               </div>
// //               <p className="text-blue-200 text-sm mt-4">
// //                 Join 15,000+ royal members receiving exclusive health insights
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Education;