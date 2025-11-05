import React, { useState } from 'react';
import { Crown, Venus, Mars, Heart, Moon, Activity, Users, Play, Sparkles, Star } from 'lucide-react';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'female-health',
      icon: Venus,
      title: "Royal Feminine Suite",
      subtitle: "Premium Women's Wellness",
      description: "Elite women's health tracking with AI-powered insights and personalized care for modern queens",
      features: ["Cycle Tracking", "AI Ovulation Predictions", "Pregnancy Excellence", "Hormonal Harmony"],
      gradient: "from-[#B1D182] to-[#688F48]",
      stats: { accuracy: "99%", users: "10K+", satisfaction: "98%" },
      badge: "Queen's Choice"
    },
    {
      id: 'male-health',
      icon: Mars,
      title: "Elite Masculine Suite",
      subtitle: "Premium Men's Wellness",
      description: "Advanced men's health monitoring with precision tracking and expert insights for modern kings",
      features: ["Prostate Excellence", "Testosterone Mastery", "Stress Management", "Fitness Royalty"],
      gradient: "from-[#B1D182] to-[#688F48]",
      stats: { accuracy: "97%", users: "8K+", satisfaction: "96%" },
      badge: "King's Selection"
    },
    {
      id: 'self-care',
      icon: Heart,
      title: "Royal Sanctuary",
      subtitle: "Premium Self-Care Experience",
      description: "Elevate your self-care routine with royal treatments and mindfulness practices",
      features: ["Meditation Royalty", "Mental Wellness", "Stress Relief", "Mindful Majesty"],
      gradient: "from-[#B1D182] to-[#688F48]",
      stats: { accuracy: "95%", users: "12K+", satisfaction: "99%" },
      badge: "Royal Retreat"
    },
    {
      id: 'sleep',
      icon: Moon,
      title: "Royal Sleep Suite",
      subtitle: "Premium Sleep Experience",
      description: "Transform your sleep with AI-powered analysis and premium recovery tracking",
      features: ["Sleep Quality", "Recovery Excellence", "Bedtime Optimization", "Sleep Coaching"],
      gradient: "from-[#B1D182] to-[#688F48]",
      stats: { accuracy: "96%", users: "9K+", satisfaction: "97%" },
      badge: "Dream Royalty"
    },
    {
      id: 'fitness',
      icon: Activity,
      title: "Royal Fitness & Nutrition",
      subtitle: "Elite Performance Tracking",
      description: "Achieve fitness goals with royal-grade tracking and nutrition planning",
      features: ["Workout Plans", "Nutrition Excellence", "Progress Analytics", "Goal Mastery"],
      gradient: "from-[#B1D182] to-[#688F48]",
      stats: { accuracy: "98%", users: "11K+", satisfaction: "96%" },
      badge: "Performance Elite"
    },
    {
      id: 'community',
      icon: Users,
      title: "Royal Community",
      subtitle: "Exclusive Member Network",
      description: "Connect with wellness royalty in our supportive, premium community",
      features: ["Expert Council", "Elite Challenges", "Success Stories", "Support Network"],
      gradient: "from-[#B1D182] to-[#688F48]",
      stats: { accuracy: "100%", users: "15K+", satisfaction: "99%" },
      badge: "Royal Circle"
    }
  ];

  const currentFeature = features[activeFeature];
  const IconComponent = currentFeature.icon;

  return (
    <section className="relative py-24 bg-[#F4F1E9] overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#B1D182]/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#688F48]/20 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-[#F4F1E9]/80 backdrop-blur-sm border border-[#B1D182]/40 rounded-2xl px-6 py-3 mb-6 shadow-lg">
            <Crown className="w-5 h-5 text-[#688F48]" />
            <span className="font-bold text-[#688F48] text-sm uppercase tracking-wider">Royal Features Suite</span>
            <Sparkles className="w-4 h-4 text-[#B1D182]" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#0B132B]">
            Premium <span className="bg-gradient-to-r from-[#B1D182] to-[#688F48] bg-clip-text text-transparent">Wellness Experiences</span>
          </h2>

          <p className="text-xl md:text-2xl text-[#0B132B]/80 max-w-4xl mx-auto leading-relaxed">
            Discover our exclusive health suites designed for <span className="font-semibold text-[#688F48]">royal treatment</span> and <span className="font-semibold text-[#B1D182]">exceptional results</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Feature Navigation */}
          <div className="xl:col-span-4 space-y-4">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              const isActive = activeFeature === index;

              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(index)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-500 group relative overflow-hidden ${
                    isActive
                      ? `bg-gradient-to-br ${feature.gradient} border-transparent text-white shadow-2xl transform scale-105`
                      : 'bg-[#F4F1E9]/80 border-[#B1D182]/40 text-[#0B132B] hover:border-[#688F48] hover:shadow-lg'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                  <div className="relative flex items-center space-x-4">
                    <div className={`p-3 rounded-xl transition-all duration-500 ${isActive ? 'bg-white/20 text-white' : `bg-gradient-to-br ${feature.gradient} text-white`}`}>
                      <FeatureIcon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#0B132B]'}`}>{feature.title}</h3>
                      <p className={`text-sm transition-colors duration-300 ${isActive ? 'text-white/80' : 'text-[#0B132B]/70'}`}>{feature.subtitle}</p>
                    </div>
                    {isActive && <Sparkles className="text-white animate-pulse" size={16} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feature Preview */}
          <div className="xl:col-span-8">
            <div className="relative bg-[#F4F1E9]/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-[#B1D182]/40 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="absolute -top-4 left-8 bg-gradient-to-br from-[#B1D182] to-[#688F48] text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-lg">
                {currentFeature.badge}
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${currentFeature.gradient} rounded-2xl flex items-center justify-center shadow-2xl`}>
                    <IconComponent className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-3xl text-[#0B132B]">{currentFeature.title}</h3>
                    <p className="text-[#688F48] font-semibold">{currentFeature.subtitle}</p>
                  </div>
                </div>
                <button className="group bg-gradient-to-r from-[#B1D182] to-[#688F48] text-[#0B132B] px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                  <Play size={16} />
                  <span>Explore Suite</span>
                </button>
              </div>

              <p className="text-[#0B132B]/80 text-lg leading-relaxed mb-8">{currentFeature.description}</p>

              {/* Features List & Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-xl text-[#0B132B] mb-4 flex items-center space-x-2">
                    <Star className="w-5 h-5 text-[#B1D182]" />
                    <span>Premium Features</span>
                  </h4>
                  <ul className="space-y-3">
                    {currentFeature.features.map((f, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#B1D182] to-[#688F48] rounded-full"></div>
                        <span className="text-[#0B132B]/80 font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {Object.entries(currentFeature.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-bold text-2xl bg-gradient-to-r from-[#B1D182] to-[#688F48] bg-clip-text text-transparent">{value}</div>
                        <div className="text-[#0B132B]/70 text-sm capitalize mt-1">{key.replace('_', ' ')}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Placeholder Dashboard Preview */}
                <div className="bg-[#0B132B]/80 rounded-2xl p-6 border-2 border-[#688F48]/40 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#B1D182] rounded-full"></div>
                      <div className="w-3 h-3 bg-[#688F48] rounded-full"></div>
                      <div className="w-3 h-3 bg-[#F4F1E9] rounded-full"></div>
                    </div>
                    <div className="text-[#B1D182] font-semibold text-sm">{currentFeature.title}</div>
                  </div>
                  <div className="h-32 bg-[#688F48]/20 rounded-lg flex items-end justify-around p-2">
                    {[40, 60, 75, 85, 70, 90, 95].map((height, index) => (
                      <div key={index} className="w-4 bg-gradient-to-t from-[#B1D182] to-[#688F48] rounded-t-lg" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Features = () => {
//   const features = [
//     {
//       icon: '🔍',
//       title: 'AI-Powered Insights',
//       description: 'Get personalized health insights and trends analysis from our advanced AI algorithms.',
//       color: 'from-blue-400 to-blue-600'
//     },
//     {
//       icon: '📱',
//       title: 'Easy Tracking',
//       description: 'Simple and intuitive interface to track all your health metrics in one place.',
//       color: 'from-green-400 to-green-600'
//     },
//     {
//       icon: '👥',
//       title: 'Supportive Community',
//       description: 'Connect with others, share experiences, and get support from people who understand.',
//       color: 'from-purple-400 to-purple-600'
//     },
//     {
//       icon: '📊',
//       title: 'Weekly Reports',
//       description: 'Comprehensive weekly reports showing your progress and areas for improvement.',
//       color: 'from-pink-400 to-pink-600'
//     }
//   ];

//   return (
//     <section className="py-20 bg-gradient-to-br from-soft-blue to-soft-pink">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//             Why Choose MyLab?
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Comprehensive health tracking with AI-powered insights and community support
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={feature.title}
//               className="bg-white rounded-2xl p-6 shadow-lg hover-lift transition-all duration-300"
//             >
//               <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl text-white mb-4`}>
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <Link
//             to="/female-health/cycle"
//             className="bg-gradient-to-r from-sky-blue to-light-pink text-white px-8 py-4 rounded-xl font-semibold text-lg hover-lift shadow-lg transition-all duration-300 inline-block"
//           >
//             Start Your Wellness Journey
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;
// Features.jsx - Enhanced with your color scheme
// import React, { useState } from 'react';
// import { Crown, Venus, Mars, Heart, Moon, Activity, Users, BarChart3, Play, Sparkles, ArrowRight, Star, Shield } from 'lucide-react';

// const Features = () => {
//   const [activeFeature, setActiveFeature] = useState(0);

//   const features = [
//     {
//       id: 'female-health',
//       icon: Venus,
//       title: "Royal Feminine Suite",
//       subtitle: "Premium Women's Wellness",
//       description: "Experience elite women's health tracking with AI-powered royal insights and personalized care designed for modern queens",
//       features: ["l Cycle Tracking", "AI Ovulation Predictions", "Pregnancy Excellence", "Hormonal Harmony"],
//       gradient: "from-pink-400 to-pink-600",
//       stats: { accuracy: "99%", users: "10K+", satisfaction: "98%" },
//       badge: "Queen's Choice"
//     },
//     {
//       id: 'male-health',
//       icon: Mars,
//       title: "Elite Masculine Suite",
//       subtitle: "Premium Men's Wellness",
//       description: "Advanced men's health monitoring with royal precision tracking and expert insights for modern kings",
//       features: ["Prostate Excellence", "Testosterone Mastery", "Stress Alchemy", "Fitness Royalty"],
//       gradient: "from-blue-500 to-blue-700",
//       stats: { accuracy: "97%", users: "8K+", satisfaction: "96%" },
//       badge: "King's Selection"
//     },
//     {
//       id: 'self-care',
//       icon: Heart,
//       title: "Royal Sanctuary",
//       subtitle: "Premium Self-Care Experience",
//       description: "Elevate your self-care routine with royal treatments and mindfulness practices fit for royalty",
//       features: ["Meditation Royalty", "Mental Wellness", "Stress Alchemy", "Mindful Majesty"],
//       gradient: "from-purple-500 to-purple-700",
//       stats: { accuracy: "95%", users: "12K+", satisfaction: "99%" },
//       badge: "Royal Retreat"
//     },
//     {
//       id: 'sleep',
//       icon: Moon,
//       title: "Royal Sleep Suite",
//       subtitle: "Premium Sleep Experience",
//       description: "Transform your sleep with AI-powered royal analysis and premium recovery tracking for optimal restoration",
//       features: ["Sleep Quality Royalty", "Recovery Excellence", "Bedtime Optimization", "Sleep Coaching"],
//       gradient: "from-indigo-500 to-indigo-700",
//       stats: { accuracy: "96%", users: "9K+", satisfaction: "97%" },
//       badge: "Dream Royalty"
//     },
//     {
//       id: 'fitness',
//       icon: Activity,
//       title: "Royal Fitness & Nutrition",
//       subtitle: "Elite Performance Tracking",
//       description: "Achieve your fitness goals with royal-grade tracking and nutrition planning designed for champions",
//       features: ["Workout Royalty", "Nutrition Excellence", "Progress Analytics", "Goal Mastery"],
//       gradient: "from-green-500 to-green-700",
//       stats: { accuracy: "98%", users: "11K+", satisfaction: "96%" },
//       badge: "Performance Elite"
//     },
//     {
//       id: 'community',
//       icon: Users,
//       title: "Royal Community",
//       subtitle: "Exclusive Member Network",
//       description: "Connect with wellness royalty in our premium, supportive community of like-minded elites",
//       features: ["Expert Royal Council", "Elite Challenges", "Success Stories", "Support Network"],
//       gradient: "from-pink-500 to-blue-500",
//       stats: { accuracy: "100%", users: "15K+", satisfaction: "99%" },
//       badge: "Royal Circle"
//     }
//   ];

//   const currentFeature = features[activeFeature];
//   const IconComponent = currentFeature.icon;

//   return (
//     <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50/20 to-pink-50/30 overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/10 to-pink-100/10"></div>
//         <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-200/20 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pink-200/20 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-20">
//           <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl px-6 py-3 mb-6 shadow-lg">
//             <Crown className="w-5 h-5 text-blue-600" />
//             <span className="font-bold text-blue-600 text-sm uppercase tracking-wider">
//               Royal Features Suite
//             </span>
//             <Sparkles className="w-4 h-4 text-pink-500" />
//           </div>
          
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
//             <span className="text-gray-800">Premium </span>
//             <span className="bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
//               Wellness Experiences
//             </span>
//           </h2>
          
//           <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
//             Discover our exclusive health suites designed for 
//             <span className="font-semibold text-blue-600"> royal treatment </span>
//             and
//             <span className="font-semibold text-pink-500"> exceptional results</span>
//           </p>
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
//           {/* Feature Navigation */}
//           <div className="xl:col-span-4 space-y-4">
//             {features.map((feature, index) => {
//               const FeatureIcon = feature.icon;
//               const isActive = activeFeature === index;
              
//               return (
//                 <button
//                   key={feature.id}
//                   onClick={() => setActiveFeature(index)}
//                   className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-500 group relative overflow-hidden ${
//                     isActive
//                       ? `bg-gradient-to-br ${feature.gradient} border-transparent text-white shadow-2xl transform scale-105`
//                       : 'bg-white/80 border-blue-200 text-gray-800 hover:border-pink-300 hover:shadow-xl'
//                   }`}
//                 >
//                   {/* Hover Shine */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
//                   <div className="relative flex items-center space-x-4">
//                     <div className={`p-3 rounded-xl transition-all duration-500 ${
//                       isActive 
//                         ? 'bg-white/20 text-white' 
//                         : `bg-gradient-to-br ${feature.gradient} text-white`
//                     }`}>
//                       <FeatureIcon size={24} />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className={`font-bold text-lg transition-colors duration-300 ${
//                         isActive ? 'text-white' : 'text-gray-800'
//                       }`}>
//                         {feature.title}
//                       </h3>
//                       <p className={`text-sm transition-colors duration-300 ${
//                         isActive ? 'text-white/80' : 'text-gray-600'
//                       }`}>
//                         {feature.subtitle}
//                       </p>
//                     </div>
//                     {isActive && (
//                       <Sparkles className="text-white animate-pulse" size={16} />
//                     )}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Feature Preview */}
//           <div className="xl:col-span-8">
//             <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/60 shadow-2xl hover:shadow-3xl transition-all duration-500">
//               {/* Premium Badge */}
//               <div className="absolute -top-4 left-8 bg-gradient-to-r from-blue-600 to-pink-500 text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-lg">
//                 {currentFeature.badge}
//               </div>

//               {/* Feature Header */}
//               <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
//                 <div className="flex items-center space-x-4">
//                   <div className={`w-16 h-16 bg-gradient-to-br ${currentFeature.gradient} rounded-2xl flex items-center justify-center shadow-2xl`}>
//                     <IconComponent className="text-white" size={28} />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-3xl text-gray-800">
//                       {currentFeature.title}
//                     </h3>
//                     <p className="text-blue-600 font-semibold">
//                       {currentFeature.subtitle}
//                     </p>
//                   </div>
//                 </div>
//                 <button className="group bg-gradient-to-r from-blue-600 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2">
//                   <Play size={16} />
//                   <span>Explore Suite</span>
//                 </button>
//               </div>

//               {/* Description */}
//               <p className="text-gray-600 text-lg leading-relaxed mb-8">
//                 {currentFeature.description}
//               </p>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {/* Features List */}
//                 <div>
//                   <h4 className="font-bold text-xl text-gray-800 mb-4 flex items-center space-x-2">
//                     <Star className="w-5 h-5 text-yellow-500" />
//                     <span>Premium Features</span>
//                   </h4>
//                   <ul className="space-y-3">
//                     {currentFeature.features.map((feature, index) => (
//                       <li key={index} className="flex items-center space-x-3 group">
//                         <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
//                         <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   {/* Stats */}
//                   <div className="grid grid-cols-3 gap-4 mt-8">
//                     {Object.entries(currentFeature.stats).map(([key, value]) => (
//                       <div key={key} className="text-center group">
//                         <div className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
//                           {value}
//                         </div>
//                         <div className="text-gray-600 text-sm capitalize mt-1">
//                           {key.replace('_', ' ')}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Dashboard Preview */}
//                 <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border-2 border-blue-300/30 shadow-2xl">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center space-x-2">
//                       <div className="w-3 h-3 bg-green-400 rounded-full"></div>
//                       <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
//                       <div className="w-3 h-3 bg-red-400 rounded-full"></div>
//                     </div>
//                     <div className="text-blue-300 font-semibold text-sm">
//                       {currentFeature.title}
//                     </div>
//                   </div>
                  
//                   {/* Progress Chart */}
//                   <div className="bg-gray-800/50 rounded-xl p-4 border border-blue-400/30 mb-4">
//                     <div className="text-blue-300 font-semibold mb-2">Weekly Royal Progress</div>
//                     <div className="h-32 bg-gradient-to-r from-blue-500/20 to-pink-500/20 rounded-lg flex items-end justify-around p-2">
//                       {[40, 60, 75, 85, 70, 90, 95].map((height, index) => (
//                         <div
//                           key={index}
//                           className="w-4 bg-gradient-to-t from-blue-400 to-pink-400 rounded-t-lg transition-all duration-500 hover:from-pink-400 hover:to-blue-400 cursor-pointer"
//                           style={{ height: `${height}%` }}
//                         ></div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Metrics Grid */}
//                   <div className="grid grid-cols-2 gap-3">
//                     {['Energy', 'Sleep', 'Mood', 'Activity'].map((metric) => (
//                       <div key={metric} className="bg-gray-700/50 rounded-lg p-3 text-center border border-blue-400/20 group hover:border-pink-400/30 transition-all duration-300">
//                         <div className="text-blue-300 text-sm font-semibold group-hover:text-pink-300 transition-colors duration-300">{metric}</div>
//                         <div className="text-white text-lg font-bold group-hover:scale-110 transition-transform duration-300">92%</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;