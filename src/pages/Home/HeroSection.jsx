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
