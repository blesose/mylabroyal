// // // import React from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { Crown, Users, MessageCircle, Heart, Star, Award, Sparkles, ArrowRight, Trophy, Target } from 'lucide-react';

// // // const CommunityIntro = () => {
// // //   const communityFeatures = [
// // //     {
// // //       icon: Users,
// // //       title: 'Elite Connections',
// // //       description: 'Connect with verified members who understand your royal wellness journey',
// // //       count: '10K+ Members',
// // //       gradient: 'from-neon-mint to-emerald'
// // //     },
// // //     {
// // //       icon: MessageCircle,
// // //       title: 'Royal Discussions',
// // //       description: 'Engage in premium conversations with health experts and peers',
// // //       count: '50K+ Posts',
// // //       gradient: 'from-cyan-blue to-neon-mint'
// // //     },
// // //     {
// // //       icon: Heart,
// // //       title: 'Support System',
// // //       description: 'Receive and give support in our caring royal community',
// // //       count: '98% Satisfaction',
// // //       gradient: 'from-emerald to-cyan-blue'
// // //     },
// // //     {
// // //       icon: Award,
// // //       title: 'Achievements',
// // //       description: 'Unlock royal badges and celebrate wellness milestones',
// // //       count: '100+ Badges',
// // //       gradient: 'from-neon-mint to-cyan-blue'
// // //     }
// // //   ];

// // //   const testimonials = [
// // //     {
// // //       name: "Queen Sophia",
// // //       role: "Wellness Enthusiast",
// // //       avatar: "👑",
// // //       content: "MyLab Royal transformed my health journey! The community support feels like having royal physicians and friends available 24/7.",
// // //       rating: 5,
// // //       stats: { joined: "8 months", progress: "95%", streak: "67 days" },
// // //       premium: true
// // //     },
// // //     {
// // //       name: "Lord Alexander",
// // //       role: "Fitness Professional",
// // //       avatar: "⚔️",
// // //       content: "The men's health community is exceptional. Finally, a platform where elite wellness meets genuine support and royal treatment.",
// // //       rating: 5,
// // //       stats: { joined: "6 months", progress: "92%", streak: "45 days" },
// // //       premium: false
// // //     }
// // //   ];

// // //   return (
// // //     <section className="relative py-24 bg-deep-navy overflow-hidden">
// // //       {/* Enhanced Background Elements */}
// // //       <div className="absolute inset-0 overflow-hidden">
// // //         <div className="absolute -top-24 -right-24 w-96 h-96 bg-neon-mint/10 rounded-full blur-3xl animate-float"></div>
// // //         <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-emerald/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
// // //         <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-cyan-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
// // //         {/* Geometric Patterns */}
// // //         <div className="absolute top-20 right-20 w-8 h-8 border-2 border-neon-mint/30 rotate-45 animate-pulse"></div>
// // //         <div className="absolute bottom-40 left-20 w-6 h-6 border border-emerald/40 rounded-full"></div>
// // //         <div className="absolute top-1/2 right-40 w-4 h-4 bg-cyan-blue/50 rounded-full"></div>
// // //       </div>
      
// // //       <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
// // //         {/* Enhanced Section Header */}
// // //         <div className="text-center mb-20">
// // //           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-neon-mint to-emerald rounded-3xl mb-6 shadow-glow animate-pulse">
// // //             <Crown className="w-8 h-8 text-deep-navy" />
// // //             <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-neon-mint animate-ping" />
// // //           </div>
// // //           <h2 className="text-5xl md:text-6xl font-bold mb-6 text-mist-gray">
// // //             Join Our <span className="text-gradient bg-gradient-to-r from-neon-mint to-emerald">Royal Community</span>
// // //           </h2>
// // //           <p className="text-xl md:text-2xl text-mist-gray/80 max-w-4xl mx-auto leading-relaxed">
// // //             Step into an exclusive sanctuary where extraordinary individuals share, support, and soar together on their wellness journeys
// // //           </p>
// // //         </div>

// // //         {/* Enhanced Community Features Grid */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
// // //           {communityFeatures.map((feature, index) => {
// // //             const IconComponent = feature.icon;
// // //             return (
// // //               <div key={index} className="group relative">
// // //                 <div className="relative card hover glow bg-cyan-blue/5 border-cyan-blue/20 rounded-2xl p-6 h-full transform-gpu">
// // //                   {/* Feature Icon */}
// // //                   <div className="flex items-center space-x-4 mb-4">
// // //                     <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300`}>
// // //                       <IconComponent className="w-6 h-6 text-deep-navy" />
// // //                     </div>
// // //                     <div>
// // //                       <h3 className="font-bold text-mist-gray group-hover:text-neon-mint transition-colors duration-300">
// // //                         {feature.title}
// // //                       </h3>
// // //                       <p className="text-neon-mint font-semibold text-sm">{feature.count}</p>
// // //                     </div>
// // //                   </div>
                  
// // //                   {/* Description */}
// // //                   <p className="text-mist-gray/80 text-sm leading-relaxed group-hover:text-mist-gray transition-colors duration-300">
// // //                     {feature.description}
// // //                   </p>
                  
// // //                   {/* Hover Sparkle */}
// // //                   <Sparkles className="absolute bottom-4 right-4 w-4 h-4 text-neon-mint opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// // //                 </div>
// // //               </div>
// // //             );
// // //           })}
// // //         </div>

// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
// // //           {/* Left Side - Enhanced Main Feature Card */}
// // //           <div className="relative">
// // //             <div className="absolute -inset-4 bg-gradient-to-r from-neon-mint to-emerald rounded-3xl blur-xl opacity-20 animate-pulse"></div>
// // //             <div className="relative royal-card bg-gradient-to-br from-cyan-blue/10 to-neon-mint/5 rounded-2xl p-8 border border-cyan-blue/30">
// // //               <div className="flex items-center mb-8">
// // //                 <div className="w-12 h-12 bg-gradient-to-r from-neon-mint to-emerald rounded-2xl flex items-center justify-center mr-4 shadow-glow">
// // //                   <Sparkles className="w-6 h-6 text-deep-navy" />
// // //                 </div>
// // //                 <h3 className="text-3xl font-bold text-gradient">
// // //                   Royal Community Benefits
// // //                 </h3>
// // //               </div>
              
// // //               <ul className="space-y-5 text-lg">
// // //                 {[
// // //                   { icon: '💫', text: 'Connect with elite members who truly understand your royal journey' },
// // //                   { icon: '🌟', text: 'Share exclusive tips and transformative wellness experiences' },
// // //                   { icon: '⚡', text: 'Receive premium motivation and personalized royal support' },
// // //                   { icon: '🔮', text: 'Access cutting-edge community insights and royal wisdom' },
// // //                   { icon: '🎯', text: 'Participate in VIP group challenges and exclusive events' }
// // //                 ].map((item, index) => (
// // //                   <li key={index} className="flex items-start space-x-4 group hover:translate-x-2 transition-all duration-300 p-3 rounded-xl hover:bg-cyan-blue/10">
// // //                     <span className="text-2xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
// // //                       {item.icon}
// // //                     </span>
// // //                     <span className="text-mist-gray group-hover:text-neon-mint transition-colors duration-300 flex-1">
// // //                       {item.text}
// // //                     </span>
// // //                   </li>
// // //                 ))}
// // //               </ul>

// // //               {/* Achievement Badges Preview */}
// // //               <div className="mt-8 pt-6 border-t border-cyan-blue/20">
// // //                 <div className="flex items-center space-x-2 mb-4">
// // //                   <Trophy className="w-5 h-5 text-emerald" />
// // //                   <span className="text-mist-gray font-semibold">Recent Community Achievements</span>
// // //                 </div>
// // //                 <div className="flex flex-wrap gap-2">
// // //                   {['Wellness Warrior', 'Sleep Master', 'Cycle Expert', 'Fitness Pro'].map((badge, index) => (
// // //                     <span key={index} className="px-3 py-1 bg-emerald/20 text-emerald text-xs rounded-full border border-emerald/30">
// // //                       {badge}
// // //                     </span>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Right Side - Enhanced Testimonials & CTA */}
// // //           <div className="space-y-8">
// // //             {testimonials.map((testimonial, index) => (
// // //               <div 
// // //                 key={index}
// // //                 className={`relative card hover ${testimonial.premium ? 'royal-card' : ''} rounded-2xl p-8 border-cyan-blue/20 transform-gpu`}
// // //               >
// // //                 {testimonial.premium && (
// // //                   <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-neon-mint to-emerald rounded-full flex items-center justify-center shadow-glow">
// // //                     <Crown className="w-3 h-3 text-deep-navy" />
// // //                   </div>
// // //                 )}
                
// // //                 <div className="flex items-start space-x-4">
// // //                   <div className={`w-14 h-14 bg-gradient-to-r ${testimonial.premium ? 'from-neon-mint to-emerald' : 'from-cyan-blue to-cyan-blue/80'} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
// // //                     {testimonial.avatar}
// // //                   </div>
// // //                   <div className="flex-1">
// // //                     <div className="flex items-center justify-between mb-3">
// // //                       <div>
// // //                         <h4 className="font-bold text-mist-gray text-lg">
// // //                           {testimonial.name}
// // //                         </h4>
// // //                         <p className="text-neon-mint font-semibold text-sm">
// // //                           {testimonial.role}
// // //                         </p>
// // //                       </div>
// // //                       <div className="flex items-center space-x-1">
// // //                         {[...Array(testimonial.rating)].map((_, i) => (
// // //                           <Star key={i} className="w-4 h-4 text-emerald fill-current" />
// // //                         ))}
// // //                       </div>
// // //                     </div>
// // //                     <p className="text-mist-gray/80 leading-relaxed mb-4">
// // //                       {testimonial.content}
// // //                     </p>
// // //                     <div className="flex items-center justify-between pt-4 border-t border-cyan-blue/20">
// // //                       {Object.entries(testimonial.stats).map(([key, value]) => (
// // //                         <div key={key} className="text-center">
// // //                           <div className="font-bold text-neon-mint text-sm">
// // //                             {value}
// // //                           </div>
// // //                           <div className="text-mist-gray/60 text-xs capitalize">
// // //                             {key}
// // //                           </div>
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             ))}

// // //             {/* Enhanced CTA Section */}
// // //             <div className="text-center pt-8">
// // //               <Link
// // //                 to="/community"
// // //                 className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold btn-primary rounded-2xl shadow-glow hover:shadow-glow-lg overflow-hidden"
// // //               >
// // //                 {/* Animated Background */}
// // //                 <div className="absolute inset-0 bg-gradient-to-r from-neon-mint/0 via-neon-mint/10 to-neon-mint/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
// // //                 <span className="relative flex items-center space-x-3">
// // //                   <Crown className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
// // //                   <span>Join Royal Community</span>
// // //                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
// // //                 </span>
// // //               </Link>
              
// // //               {/* Stats Row */}
// // //               <div className="flex justify-center items-center space-x-8 mt-6 text-mist-gray/80">
// // //                 <div className="text-center">
// // //                   <div className="text-2xl font-bold text-neon-mint">10K+</div>
// // //                   <div className="text-sm">Elite Members</div>
// // //                 </div>
// // //                 <div className="w-1 h-8 bg-cyan-blue/30 rounded-full"></div>
// // //                 <div className="text-center">
// // //                   <div className="text-2xl font-bold text-emerald">98%</div>
// // //                   <div className="text-sm">Satisfaction</div>
// // //                 </div>
// // //                 <div className="w-1 h-8 bg-cyan-blue/30 rounded-full"></div>
// // //                 <div className="text-center">
// // //                   <div className="text-2xl font-bold text-cyan-blue">24/7</div>
// // //                   <div className="text-sm">Royal Support</div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default CommunityIntro;
// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // const CommunityIntro = () => {
// //   return (
// //     <section className="relative py-24 bg-gradient-to-br from-slate-50 via-soft-pink/20 to-sky-blue/20 overflow-hidden">
// //       {/* Animated Background Elements */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-r from-sky-blue/20 to-light-pink/20 rounded-full blur-3xl animate-float"></div>
// //         <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-light-pink/30 to-sky-blue/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
// //       </div>
      
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
// //         <div className="text-center mb-16">
// //           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-sky-blue to-light-pink rounded-3xl mb-6 shadow-lg animate-glow">
// //             <span className="text-3xl text-white">👑</span>
// //           </div>
// //           <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-regal-blue to-royal-pink bg-clip-text text-transparent mb-6">
// //             Join Our Royal Community
// //           </h2>
// //           <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
// //             Step into an exclusive sanctuary where extraordinary women share, support, and soar together on their wellness journeys
// //           </p>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
// //           {/* Left Side - Feature Card */}
// //           <div className="relative">
// //             <div className="absolute -inset-4 bg-gradient-to-r from-sky-blue to-light-pink rounded-3xl blur-lg opacity-30 animate-glow"></div>
// //             <div className="relative bg-gradient-to-br from-white to-slate-50/80 rounded-2xl p-10 shadow-2xl border border-white/60 backdrop-blur-sm">
// //               <div className="flex items-center mb-6">
// //                 <div className="w-12 h-12 bg-gradient-to-r from-sky-blue to-light-pink rounded-2xl flex items-center justify-center mr-4">
// //                   <span className="text-xl text-white">✨</span>
// //                 </div>
// //                 <h3 className="text-3xl font-bold bg-gradient-to-r from-regal-blue to-royal-pink bg-clip-text text-transparent">
// //                   Royal Benefits
// //                 </h3>
// //               </div>
              
// //               <ul className="space-y-4 text-lg">
// //                 {[
// //                   { icon: '💫', text: 'Connect with elite members who truly understand your journey' },
// //                   { icon: '🌟', text: 'Share exclusive tips and transformative experiences' },
// //                   { icon: '⚡', text: 'Receive premium motivation and personalized support' },
// //                   { icon: '🔮', text: 'Access cutting-edge community insights and wisdom' },
// //                   { icon: '🎯', text: 'Participate in VIP group challenges and events' }
// //                 ].map((item, index) => (
// //                   <li key={index} className="flex items-start space-x-4 group hover:translate-x-2 transition-transform duration-300">
// //                     <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
// //                     <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 flex-1">{item.text}</span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           </div>

// //           {/* Right Side - Testimonials & CTA */}
// //           <div className="space-y-8">
// //             {[
// //               {
// //                 icon: '💖',
// //                 title: 'Royal Testimonials',
// //                 content: '"MyLab transformed my understanding of cycle patterns and connected me with incredible women on similar journeys. The community support has been life-changing!"',
// //                 author: '— Sophia R., Elite Member'
// //               },
// //               {
// //                 icon: '👑',
// //                 title: 'Expert Royal Council',
// //                 content: 'Our community features top health professionals who provide exclusive insights and personalized answers to your most pressing questions.',
// //                 highlight: true
// //               }
// //             ].map((card, index) => (
// //               <div 
// //                 key={index}
// //                 className={`relative rounded-2xl p-8 shadow-xl backdrop-blur-sm transition-all duration-500 hover:scale-105 ${
// //                   card.highlight 
// //                     ? 'bg-gradient-to-br from-regal-blue/10 to-royal-pink/10 border-2 border-regal-blue/20' 
// //                     : 'bg-white/80 border border-white/60'
// //                 }`}
// //               >
// //                 <div className="flex items-start space-x-4">
// //                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
// //                     card.highlight ? 'bg-gradient-to-r from-regal-blue to-royal-pink' : 'bg-gradient-to-r from-sky-blue to-light-pink'
// //                   }`}>
// //                     <span className="text-white">{card.icon}</span>
// //                   </div>
// //                   <div className="flex-1">
// //                     <h4 className={`font-bold text-xl mb-3 ${
// //                       card.highlight ? 'text-regal-blue' : 'text-gray-800'
// //                     }`}>
// //                       {card.title}
// //                     </h4>
// //                     <p className={`text-lg leading-relaxed ${
// //                       card.highlight ? 'text-gray-700' : 'text-gray-600 italic'
// //                     }`}>
// //                       {card.content}
// //                     </p>
// //                     {card.author && (
// //                       <p className="text-regal-blue font-semibold mt-3">{card.author}</p>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}

// //             {/* CTA Button */}
// //             <div className="text-center pt-6">
// //               <Link
// //                 to="/community"
// //                 className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white bg-gradient-to-r from-regal-blue to-royal-pink rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:from-royal-pink hover:to-regal-blue overflow-hidden"
// //               >
// //                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
// //                 <span className="relative flex items-center space-x-3">
// //                   <span>Become Royal Member</span>
// //                   <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
// //                 </span>
// //               </Link>
// //               <p className="text-gray-600 mt-4 text-sm">
// //                 Join 10,000+ elite members in our exclusive community
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default CommunityIntro;
// // CommunityIntro.jsx - Enhanced Version
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Crown, Users, MessageCircle, Heart, Star, Award, Sparkles, ArrowRight } from 'lucide-react';

// const CommunityIntro = () => {
//   const communityFeatures = [
//     {
//       icon: Users,
//       title: 'Elite Connections',
//       description: 'Connect with verified members who understand your royal wellness journey',
//       count: '10K+ Members'
//     },
//     {
//       icon: MessageCircle,
//       title: 'Royal Discussions',
//       description: 'Engage in premium conversations with health experts and peers',
//       count: '50K+ Posts'
//     },
//     {
//       icon: Heart,
//       title: 'Support System',
//       description: 'Receive and give support in our caring royal community',
//       count: '98% Satisfaction'
//     },
//     {
//       icon: Award,
//       title: 'Achievements',
//       description: 'Unlock royal badges and celebrate wellness milestones',
//       count: '100+ Badges'
//     }
//   ];

//   const testimonials = [
//     {
//       name: "Queen Sophia",
//       role: "Wellness Enthusiast",
//       avatar: "👑",
//       content: "MyLab Royal transformed my health journey! The community support feels like having royal physicians and friends available 24/7.",
//       rating: 5,
//       stats: { joined: "8 months", progress: "95%", streak: "67 days" }
//     },
//     {
//       name: "Lord Alexander",
//       role: "Fitness Professional",
//       avatar: "⚔️",
//       content: "The men's health community is exceptional. Finally, a platform where elite wellness meets genuine support and royal treatment.",
//       rating: 5,
//       stats: { joined: "6 months", progress: "92%", streak: "45 days" }
//     }
//   ];

//   return (
//     <section className="relative py-24 bg-gradient-to-br from-white via-blue-50/30 to-pink-50/50 overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
//         <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
//       </div>
      
//       <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-pink-500 rounded-3xl mb-6 shadow-2xl animate-glow">
//             <Crown className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-5xl md:text-6xl font-bold mb-6">
//             Join Our <span className="bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">Royal Community</span>
//           </h2>
//           <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
//             Step into an exclusive sanctuary where extraordinary individuals share, support, and soar together on their wellness journeys
//           </p>
//         </div>

//         {/* Community Features Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//           {communityFeatures.map((feature, index) => {
//             const IconComponent = feature.icon;
//             return (
//               <div key={index} className="group relative">
//                 <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full">
//                   <div className="flex items-center space-x-4 mb-4">
//                     <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
//                       <IconComponent className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-gray-800">{feature.title}</h3>
//                       <p className="text-blue-600 font-semibold text-sm">{feature.count}</p>
//                     </div>
//                   </div>
//                   <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  
//                   {/* Hover Effect */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
//           {/* Left Side - Main Feature Card */}
//           <div className="relative">
//             <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-pink-500 rounded-3xl blur-lg opacity-30 animate-glow"></div>
//             <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 border-white/60">
//               <div className="flex items-center mb-6">
//                 <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
//                   <Sparkles className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
//                   Royal Community Benefits
//                 </h3>
//               </div>
              
//               <ul className="space-y-4 text-lg">
//                 {[
//                   { icon: '💫', text: 'Connect with elite members who truly understand your royal journey' },
//                   { icon: '🌟', text: 'Share exclusive tips and transformative wellness experiences' },
//                   { icon: '⚡', text: 'Receive premium motivation and personalized royal support' },
//                   { icon: '🔮', text: 'Access cutting-edge community insights and royal wisdom' },
//                   { icon: '🎯', text: 'Participate in VIP group challenges and exclusive events' }
//                 ].map((item, index) => (
//                   <li key={index} className="flex items-start space-x-4 group hover:translate-x-2 transition-transform duration-300">
//                     <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
//                     <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 flex-1">{item.text}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Right Side - Testimonials & CTA */}
//           <div className="space-y-8">
//             {testimonials.map((testimonial, index) => (
//               <div 
//                 key={index}
//                 className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-white/60 transition-all duration-500 hover:scale-105"
//               >
//                 <div className="flex items-start space-x-4">
//                   <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-pink-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
//                     {testimonial.avatar}
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between mb-3">
//                       <div>
//                         <h4 className="font-bold text-gray-800 text-lg">
//                           {testimonial.name}
//                         </h4>
//                         <p className="text-blue-600 font-semibold text-sm">
//                           {testimonial.role}
//                         </p>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         {[...Array(testimonial.rating)].map((_, i) => (
//                           <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
//                         ))}
//                       </div>
//                     </div>
//                     <p className="text-gray-600 leading-relaxed mb-4">
//                       {testimonial.content}
//                     </p>
//                     <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//                       {Object.entries(testimonial.stats).map(([key, value]) => (
//                         <div key={key} className="text-center">
//                           <div className="font-bold text-blue-600 text-sm">
//                             {value}
//                           </div>
//                           <div className="text-gray-500 text-xs capitalize">
//                             {key}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* CTA Section */}
//             <div className="text-center pt-6">
//               <Link
//                 to="/community"
//                 className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-pink-500 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
//                 <span className="relative flex items-center space-x-3">
//                   <Crown className="w-6 h-6" />
//                   <span>Join Royal Community</span>
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//                 </span>
//               </Link>
//               <p className="text-gray-600 mt-4 text-sm">
//                 Join 10,000+ elite members in our exclusive royal wellness community
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CommunityIntro;
import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Users, MessageCircle, Heart, Star, Award, Sparkles, ArrowRight } from 'lucide-react';

const CommunityIntro = () => {
  const communityFeatures = [
    {
      icon: Users,
      title: 'Elite Connections',
      description: 'Connect with verified members who understand your wellness journey',
      count: '10K+ Members'
    },
    {
      icon: MessageCircle,
      title: 'Insightful Discussions',
      description: 'Engage in meaningful conversations with health experts and peers',
      count: '50K+ Posts'
    },
    {
      icon: Heart,
      title: 'Supportive Network',
      description: 'Receive and give support in our caring wellness community',
      count: '98% Satisfaction'
    },
    {
      icon: Award,
      title: 'Achievements',
      description: 'Unlock badges and celebrate your progress milestones',
      count: '100+ Badges'
    }
  ];

  const testimonials = [
    {
      name: "Sophia Grace",
      role: "Wellness Enthusiast",
      avatar: "🌿",
      content: "MyLab transformed my health journey! The community support feels like having friends and experts by your side 24/7.",
      rating: 5,
      stats: { joined: "8 months", progress: "95%", streak: "67 days" }
    },
    {
      name: "Alexander Finn",
      role: "Fitness Professional",
      avatar: "💪",
      content: "The wellness community is outstanding. A space where motivation meets compassion and growth.",
      rating: 5,
      stats: { joined: "6 months", progress: "92%", streak: "45 days" }
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-[#F4F1E9] via-[#B1D182]/20 to-[#688F48]/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#B1D182]/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#688F48]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#B1D182] to-[#688F48] rounded-3xl mb-6 shadow-2xl animate-glow">
            <Crown className="w-8 h-8 text-[#0B132B]" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-[#0B132B]">
            Join Our <span className="bg-gradient-to-r from-[#B1D182] to-[#688F48] bg-clip-text text-transparent">Wellness Community</span>
          </h2>
          <p className="text-xl md:text-2xl text-[#2B463C]/80 max-w-4xl mx-auto leading-relaxed">
            Step into a sanctuary where extraordinary individuals share, support, and grow together on their wellness journeys.
          </p>
        </div>

        {/* Community Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {communityFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="group relative">
                <div className="relative bg-[#F4F1E9]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#B1D182]/30 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#B1D182] to-[#688F48] rounded-2xl flex items-center justify-center shadow-md">
                      <IconComponent className="w-6 h-6 text-[#0B132B]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0B132B]">{feature.title}</h3>
                      <p className="text-[#688F48] font-semibold text-sm">{feature.count}</p>
                    </div>
                  </div>
                  <p className="text-[#2B463C]/80 text-sm leading-relaxed">{feature.description}</p>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B1D182]/5 to-[#688F48]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Main Feature Card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#B1D182] to-[#688F48] rounded-3xl blur-lg opacity-30 animate-glow"></div>
            <div className="relative bg-[#F4F1E9]/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-[#B1D182]/30">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-[#B1D182] to-[#688F48] rounded-2xl flex items-center justify-center mr-4 shadow-md">
                  <Sparkles className="w-6 h-6 text-[#0B132B]" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-[#B1D182] to-[#688F48] bg-clip-text text-transparent">
                  Community Benefits
                </h3>
              </div>
              
              <ul className="space-y-4 text-lg">
                {[
                  { icon: '💫', text: 'Connect with members who inspire your wellness path' },
                  { icon: '🌿', text: 'Share helpful tips and uplifting stories' },
                  { icon: '⚡', text: 'Stay motivated through personalized encouragement' },
                  { icon: '🪶', text: 'Access valuable insights and expert guidance' },
                  { icon: '🎯', text: 'Join group challenges and celebrate wins' }
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-4 group hover:translate-x-2 transition-transform duration-300">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                    <span className="text-[#2B463C]/90 group-hover:text-[#0B132B] transition-colors duration-300 flex-1">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side - Testimonials & CTA */}
          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="relative bg-[#F4F1E9]/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#B1D182]/30 transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-[#B1D182] to-[#688F48] rounded-2xl flex items-center justify-center text-2xl shadow-md">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-[#0B132B] text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-[#688F48] font-semibold text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-[#B1D182] fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[#2B463C]/80 leading-relaxed mb-4">
                      {testimonial.content}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#688F48]/20">
                      {Object.entries(testimonial.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="font-bold text-[#688F48] text-sm">
                            {value}
                          </div>
                          <div className="text-[#2B463C]/70 text-xs capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA Section */}
            <div className="text-center pt-6">
              <Link
                to="/community"
                className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-[#0B132B] bg-gradient-to-r from-[#B1D182] to-[#688F48] rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative flex items-center space-x-3">
                  <Crown className="w-6 h-6" />
                  <span>Join the Community</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              <p className="text-[#2B463C]/70 mt-4 text-sm">
                Join 10,000+ members building a culture of wellness and balance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityIntro;
