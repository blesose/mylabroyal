import React from 'react';
import { Crown, Shield, Zap, Users, BarChart3, Heart, Sparkles, Award, Clock, Lock, Star, Target, ArrowRight } from 'lucide-react';

const WhyUseMyLab = () => {
  const features = [
    {
      icon: Crown,
      title: "Royal AI Insights",
      description: "Experience premium AI-powered health analysis that makes you feel like royalty with personalized recommendations",
      benefits: ["Predictive Health Analysis", "Personalized Recommendations", "Smart Trend Detection"],
      gradient: "from-[#B1D182] to-[#688F48]",
      stat: "99% Accuracy"
    },
    {
      icon: Shield,
      title: "Elite Privacy & Security",
      description: "Your health data is protected with military-grade encryption and uncompromising privacy standards",
      benefits: ["End-to-End Encryption", "Zero Data Sharing", "GDPR Compliant"],
      gradient: "from-[#B1D182] to-[#688F48]",
      stat: "100% Secure"
    },
    {
      icon: Zap,
      title: "Real-time Monitoring",
      description: "Instant insights and real-time tracking of your wellness journey with live updates and alerts",
      benefits: ["Live Health Metrics", "Instant Alerts", "Continuous Optimization"],
      gradient: "from-[#B1D182] to-[#688F48]",
      stat: "24/7 Updates"
    },
    {
      icon: Users,
      title: "Royal Community",
      description: "Connect with like-minded individuals in our exclusive wellness community of health enthusiasts",
      benefits: ["Expert Support", "Peer Motivation", "Group Challenges"],
      gradient: "from-[#B1D182] to-[#688F48]",
      stat: "10K+ Members"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep dive into your health data with beautiful, insightful visualizations and comprehensive reports",
      benefits: ["Custom Reports", "Progress Tracking", "Goal Setting"],
      gradient: "from-[#B1D182] to-[#688F48]",
      stat: "50+ Metrics"
    },
    {
      icon: Heart,
      title: "Holistic Wellness",
      description: "Comprehensive approach covering physical, mental, and emotional health for complete wellbeing",
      benefits: ["Mind-Body Connection", "Emotional Tracking", "Lifestyle Integration"],
      gradient: "from-[#B1D182] to-[#688F48]",
      stat: "360° Care"
    }
  ];

  const stats = [
    { icon: Award, value: "10,000+", label: "Royal Members", color: "text-[#688F48]" },
    { icon: Clock, value: "24/7", label: "Premium Support", color: "text-[#B1D182]" },
    { icon: Shield, value: "100%", label: "Secure & Private", color: "text-[#688F48]" },
    { icon: Star, value: "4.9/5", label: "Royal Rating", color: "text-[#688F48]" },
  ];

  return (
    <section className="relative py-24 bg-[#F4F1E9] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#B1D182]/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#688F48]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B1D182]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-[#F4F1E9]/80 backdrop-blur-sm border border-[#B1D182]/30 rounded-2xl px-6 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-[#688F48]" />
            <span className="font-bold text-[#688F48] text-sm uppercase tracking-wider">
              Premium Excellence
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B132B] mb-6">
            Why Choose <span className="bg-gradient-to-r from-[#B1D182] to-[#688F48] bg-clip-text text-transparent">MyLab?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-[#0B132B]/80 max-w-4xl mx-auto leading-relaxed">
            Experience healthcare that treats you like royalty with features designed for 
            <span className="font-semibold text-[#688F48]"> exceptional results </span>
            and
            <span className="font-semibold text-[#B1D182]"> unparalleled comfort</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="group relative">
                <div className="relative bg-[#F4F1E9]/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-[#B1D182]/50 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-105 h-full">
                  {/* Stat Badge */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#B1D182] to-[#688F48] text-white px-3 py-1 rounded-2xl font-bold text-sm shadow-lg">
                    {feature.stat}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent className="text-white" size={28} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <h3 className="font-bold text-2xl text-[#0B132B]">{feature.title}</h3>
                    <p className="text-[#0B132B]/80 leading-relaxed">{feature.description}</p>

                    {/* Benefits List */}
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center justify-center space-x-2 text-sm text-[#688F48] font-medium">
                          <div className="w-1.5 h-1.5 bg-[#B1D182] rounded-full"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#B1D182]/5 to-[#688F48]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-[#F4F1E9]/80 backdrop-blur-xl rounded-3xl p-12 border-2 border-[#B1D182]/30 shadow-2xl mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-[#B1D182]/10 rounded-2xl flex items-center justify-center border-2 border-[#688F48]/30 group-hover:bg-[#B1D182]/20 transition-all duration-300">
                      <IconComponent className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>
                  <div className={`font-bold text-3xl ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-[#0B132B]/80 font-semibold">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#B1D182] to-[#688F48] rounded-3xl p-8 border-2 border-[#F4F1E9]/20 shadow-2xl inline-block max-w-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="text-center lg:text-left">
                <h3 className="font-bold text-2xl text-white mb-2">
                  Start Your Royal Journey Today
                </h3>
                <p className="text-white/80">
                  Join elite members transforming their health with premium care
                </p>
              </div>
              
              <button className="group bg-white text-[#688F48] px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 flex items-center space-x-3">
                <Crown className="w-5 h-5" />
                <span>Become Royal Member</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUseMyLab;
