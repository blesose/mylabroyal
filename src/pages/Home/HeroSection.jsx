// // HeroSection.jsx - Completely transformed
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Crown, Sparkles, Mars, Star, ArrowRight, Play, Shield, Zap } from 'lucide-react';

// const HeroSection = () => {
//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-pink-50/50">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-200/40 to-pink-200/40 rounded-full blur-3xl animate-float"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-200/30 to-blue-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-pink-100/20 rounded-full blur-3xl animate-pulse"></div>
//       </div>

//       {/* Floating Elements */}
//       <div className="absolute top-20 left-10 animate-bounce">
//         <div className="w-6 h-6 bg-blue-400/20 rounded-full"></div>
//       </div>
//       <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: '1s' }}>
//         <div className="w-4 h-4 bg-pink-400/30 rounded-full"></div>
//       </div>
//       <div className="absolute bottom-40 left-20 animate-bounce" style={{ animationDelay: '2s' }}>
//         <div className="w-8 h-8 bg-blue-300/20 rounded-full"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="text-center animate-fade-in">
//           {/* Premium Badge */}
//           <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl px-6 py-3 mb-8 shadow-lg">
//             <Crown className="w-5 h-5 text-blue-400" />
//             <span className="font-bold text-blue-400 text-sm uppercase tracking-wider">
//               Premium Wellness Experience
//             </span>
//             <Sparkles className="w-4 h-4 text-pink-300" />
//           </div>

//           {/* Main Heading */}
//           <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
//             <span className="block text-gray-800">Your Personal</span>
//             <span className="block bg-gradient-to-r from-blue-400 via-pink-300 to-blue-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
//               Royal Laboratory
//             </span>
//           </h1>
          
//           {/* Subheading */}
//           <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
//             Experience <span className="font-semibold text-blue-400">elite wellness tracking</span> with 
//             <span className="font-semibold text-pink-400"> royal precision</span> and 
//             <span className="font-semibold text-blue-400"> unparalleled elegance</span>
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
//             <Link
//               to="/register"
//               className="group relative bg-gradient-to-r from-blue-400 to-pink-300 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
//               <span className="relative flex items-center space-x-3">
//                 <Crown className="w-6 h-6" />
//                 <span>Start Royal Journey</span>
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//               </span>
//             </Link>
            
//             <button className="group flex items-center space-x-3 bg-white/80 backdrop-blur-sm border-2 border-blue-200 text-blue-400 px-8 py-5 rounded-2xl font-semibold text-lg hover:bg-white hover:border-blue-300 transition-all duration-300 hover:scale-105 shadow-lg">
//               <Play className="w-5 h-5" />
//               <span>Watch Royal Tour</span>
//             </button>
//           </div>

//           {/* Trust Badges */}
//           <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12">
//             <div className="flex items-center space-x-2 text-gray-600">
//               <Shield className="w-5 h-5 text-green-500" />
//               <span className="font-semibold">100% Secure & Private</span>
//             </div>
//             <div className="flex items-center space-x-2 text-gray-600">
//               <Zap className="w-5 h-5 text-yellow-500" />
//               <span className="font-semibold">AI-Powered Insights</span>
//             </div>
//             <div className="flex items-center space-x-2 text-gray-600">
//               <Star className="w-5 h-5 text-blue-400" />
//               <span className="font-semibold">4.9/5 Royal Rating</span>
//             </div>
//           </div>

//           {/* Feature Grid */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
//             {[
//               { 
//                 name: 'Female Health', 
//                 icon: '♀', 
//                 path: '/female-health', 
//                 gradient: 'from-pink-400 to-pink-600',
//                 description: 'Royal Cycle Care'
//               },
//               { 
//                 name: 'Men\'s Health', 
//                 icon: '♂', 
//                 path: '/men-health', 
//                 gradient: 'from-blue-400 to-blue-600',
//                 description: 'Elite Wellness'
//               },
//               { 
//                 name: 'Self Care', 
//                 icon: '💆', 
//                 path: '/self-care', 
//                 gradient: 'from-purple-400 to-purple-600',
//                 description: 'Royal Sanctuary'
//               },
//               { 
//                 name: 'Fitness & Nutrition', 
//                 icon: '💪', 
//                 path: '/fitness-nutrition', 
//                 gradient: 'from-green-400 to-green-600',
//                 description: 'Premium Performance'
//               }
//             ].map((feature, index) => (
//               <Link
//                 key={feature.name}
//                 to={feature.path}
//                 className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/50 hover:border-blue-200 transition-all duration-500 hover:scale-105 hover:shadow-2xl text-center"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 {/* Hover Effect */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
//                 <div className={`relative w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
//                   {feature.icon}
//                 </div>
                
//                 <h3 className="relative font-bold text-gray-800 text-lg mb-2">{feature.name}</h3>
//                 <p className="relative text-blue-600 text-sm font-semibold">{feature.description}</p>
                
//                 {/* Shine Effect */}
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//         <div className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center">
//           <div className="w-1 h-3 bg-blue-400 rounded-full mt-2"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   Crown, 
//   Sparkles, 
//   Heart, 
//   Star, 
//   ArrowRight, 
//   Play, 
//   Shield, 
//   Zap, 
//   Flower2, 
//   Dumbbell, 
//   Flower 
// } from 'lucide-react';

// const HeroSection = () => {
//   const features = [
//     { 
//       name: 'Female Health', 
//       icon: <Flower2 className="w-7 h-7" />, 
//       path: '/female-health', 
//       gradient: 'from-pink-400 to-pink-600',
//       description: 'Royal Cycle Care'
//     },
//     { 
//       name: "Men's Health", 
//       icon: <Heart className="w-7 h-7" />, 
//       path: '/men-health', 
//       gradient: 'from-blue-400 to-blue-600',
//       description: 'Elite Wellness'
//     },
//     { 
//       name: 'Self Care', 
//       icon: <Flower className="w-7 h-7" />, 
//       path: '/self-care', 
//       gradient: 'from-purple-400 to-purple-600',
//       description: 'Royal Sanctuary'
//     },
//     { 
//       name: 'Fitness & Nutrition', 
//       icon: <Dumbbell className="w-7 h-7" />, 
//       path: '/fitness-nutrition', 
//       gradient: 'from-green-400 to-green-600',
//       description: 'Premium Performance'
//     }
//   ];

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-pink-50/50">
//       {/* Background Glow */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-200/40 to-pink-200/40 rounded-full blur-3xl animate-float"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-200/30 to-blue-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-pink-100/20 rounded-full blur-3xl animate-pulse"></div>
//       </div>

//       {/* Floating Particles */}
//       <div className="absolute top-20 left-10 animate-bounce">
//         <div className="w-6 h-6 bg-blue-400/20 rounded-full"></div>
//       </div>
//       <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: '1s' }}>
//         <div className="w-4 h-4 bg-pink-400/30 rounded-full"></div>
//       </div>
//       <div className="absolute bottom-40 left-20 animate-bounce" style={{ animationDelay: '2s' }}>
//         <div className="w-8 h-8 bg-blue-300/20 rounded-full"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center animate-fade-in">
//         {/* Badge */}
//         <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl px-6 py-3 mb-8 shadow-lg">
//           <Crown className="w-5 h-5 text-blue-400" />
//           <span className="font-bold text-blue-400 text-sm uppercase tracking-wider">
//             Premium Wellness Experience
//           </span>
//           <Sparkles className="w-4 h-4 text-pink-300" />
//         </div>

//         {/* Heading */}
//         <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
//           <span className="block text-gray-800">Your Personal</span>
//           <span className="block bg-gradient-to-r from-blue-400 via-pink-300 to-blue-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
//             Royal Laboratory
//           </span>
//         </h1>

//         {/* Subheading */}
//         <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
//           Experience <span className="font-semibold text-blue-400">elite wellness tracking</span> with 
//           <span className="font-semibold text-pink-400"> royal precision</span> and 
//           <span className="font-semibold text-blue-400"> unparalleled elegance</span>.
//         </p>

//         {/* CTA Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
//           <Link
//             to="/register"
//             className="group relative bg-gradient-to-r from-blue-400 to-pink-300 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
//             <span className="relative flex items-center space-x-3">
//               <Crown className="w-6 h-6" />
//               <span>Start Royal Journey</span>
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//             </span>
//           </Link>
          
//           <button className="group flex items-center space-x-3 bg-white/80 backdrop-blur-sm border-2 border-blue-200 text-blue-400 px-8 py-5 rounded-2xl font-semibold text-lg hover:bg-white hover:border-blue-300 transition-all duration-300 hover:scale-105 shadow-lg">
//             <Play className="w-5 h-5" />
//             <span>Watch Royal Tour</span>
//           </button>
//         </div>

//         {/* Trust Badges */}
//         <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12">
//           <div className="flex items-center space-x-2 text-gray-600">
//             <Shield className="w-5 h-5 text-green-500" />
//             <span className="font-semibold">100% Secure & Private</span>
//           </div>
//           <div className="flex items-center space-x-2 text-gray-600">
//             <Zap className="w-5 h-5 text-yellow-500" />
//             <span className="font-semibold">AI-Powered Insights</span>
//           </div>
//           <div className="flex items-center space-x-2 text-gray-600">
//             <Star className="w-5 h-5 text-blue-400" />
//             <span className="font-semibold">4.9/5 Royal Rating</span>
//           </div>
//         </div>

//         {/* Feature Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
//           {features.map((feature, index) => (
//             <Link
//               key={feature.name}
//               to={feature.path}
//               className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/50 hover:border-blue-200 transition-all duration-500 hover:scale-105 hover:shadow-2xl text-center"
//               style={{ animationDelay: `${index * 0.1}s ` }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               <div className={ `relative w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 `}>
//                 {feature.icon}
//               </div>
//               <h3 className="relative font-bold text-gray-800 text-lg mb-2">{feature.name}</h3>
//               <p className="relative text-blue-600 text-sm font-semibold">{feature.description}</p>
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//         <div className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center">
//           <div className="w-1 h-3 bg-blue-400 rounded-full mt-2"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, 
  Sparkles, 
  Heart, 
  Star, 
  ArrowRight, 
  Play, 
  Shield, 
  Zap, 
  Flower2, 
  Dumbbell, 
  Flower 
} from 'lucide-react';

const HeroSection = () => {
  const features = [
    { 
      name: 'Female Health', 
      icon: <Flower2 className="w-7 h-7" />, 
      path: '/female-health', 
      gradient: 'from-[#B1D182] to-[#688F48]',
      description: 'Elite Cycle Care'
    },
    { 
      name: "Men's Health", 
      icon: <Heart className="w-7 h-7" />, 
      path: '/men-health', 
      gradient: 'from-[#B1D182] to-[#688F48]',
      description: 'Precision Wellness'
    },
    { 
      name: 'Self Care', 
      icon: <Flower className="w-7 h-7" />, 
      path: '/self-care', 
      gradient: 'from-[#B1D182] to-[#688F48]',
      description: 'Royal Sanctuary'
    },
    { 
      name: 'Fitness & Nutrition', 
      icon: <Dumbbell className="w-7 h-7" />, 
      path: '/fitness-nutrition', 
      gradient: 'from-[#B1D182] to-[#688F48]',
      description: 'Premium Performance'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F4F1E9]">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#B1D182]/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#688F48]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B1D182]/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-[#F4F1E9]/80 backdrop-blur-sm border border-[#B1D182]/40 rounded-2xl px-6 py-3 mb-8 shadow-lg">
          <Crown className="w-5 h-5 text-[#688F48]" />
          <span className="font-bold text-[#688F48] text-sm uppercase tracking-wider">
            Premium Wellness Lab
          </span>
          <Sparkles className="w-4 h-4 text-[#B1D182]" />
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-[#0B132B]">
          <span className="block">Your Personal</span>
          <span className="block bg-gradient-to-r from-[#B1D182] to-[#688F48] bg-clip-text text-transparent">
            Royal Wellness Laboratory
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl lg:text-3xl text-[#0B132B]/80 mb-12 max-w-3xl mx-auto leading-relaxed">
          Unlock <span className="font-semibold text-[#688F48]">elite health insights</span>, 
          experience <span className="font-semibold text-[#B1D182]">precision tracking</span>, and 
          enjoy a <span className="font-semibold text-[#688F48]">royal wellness journey</span> like no other.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link
            to="/register"
            className="group relative bg-gradient-to-r from-[#B1D182] to-[#688F48] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span className="relative flex items-center space-x-3">
              <Crown className="w-6 h-6" />
              <span>Start Your Royal Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
          
          <button className="group flex items-center space-x-3 bg-[#F4F1E9]/80 backdrop-blur-sm border-2 border-[#B1D182] text-[#688F48] px-8 py-5 rounded-2xl font-semibold text-lg hover:bg-[#F4F1E9] hover:border-[#688F48] transition-all duration-300 hover:scale-105 shadow-lg">
            <Play className="w-5 h-5" />
            <span>Watch the Royal Tour</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-10 mb-12 text-[#0B132B]/80">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-[#688F48]" />
            <span className="font-semibold">100% Secure & Private</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-[#B1D182]" />
            <span className="font-semibold">AI-Powered Insights</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-[#688F48]" />
            <span className="font-semibold">4.9/5 Royal Rating</span>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Link
              key={feature.name}
              to={feature.path}
              className="group relative bg-[#F4F1E9]/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#B1D182]/50 hover:border-[#688F48] transition-all duration-500 hover:scale-105 hover:shadow-2xl text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`relative w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="relative font-bold text-[#0B132B] text-lg mb-2">{feature.name}</h3>
              <p className="relative text-[#688F48] text-sm font-semibold">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#688F48] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#B1D182] rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
