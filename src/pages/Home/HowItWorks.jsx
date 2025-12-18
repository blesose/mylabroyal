import React from 'react';
import { Crown, Target, Zap, Sparkles, ArrowRight, Star, Shield, Clock, Users, Award } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: Crown,
      title: 'Royal Onboarding',
      description: 'Kickstart your wellness journey with a personalized setup and elite welcome experience',
      features: ['Personalized Health Assessment', 'Premium Welcome Kit', 'Dedicated Wellness Coach'],
      gradient: 'from-[#B1D182] to-[#688F48]',
      duration: '5 min setup'
    },
    {
      number: '02',
      icon: Target,
      title: 'Precision Tracking',
      description: 'Monitor your health metrics with accuracy and royal-grade insights',
      features: ['AI-Powered Wellness Insights', 'Real-time Analytics', 'Predictive Health Alerts'],
      gradient: 'from-[#B1D182] to-[#688F48]',
      duration: '24/7 monitoring'
    },
    {
      number: '03',
      icon: Zap,
      title: 'Royal Insights',
      description: 'Receive tailored recommendations crafted by our elite AI system',
      features: ['Weekly Personalized Reports', 'Actionable Health Plans', 'Expert Guidance'],
      gradient: 'from-[#B1D182] to-[#688F48]',
      duration: 'Daily updates'
    },
    {
      number: '04',
      icon: Sparkles,
      title: 'Thrive Like Royalty',
      description: 'Achieve your wellness goals with continuous support and exclusive community access',
      features: ['Exclusive Community Support', 'Progress Celebrations', 'Continuous Optimization'],
      gradient: 'from-[#B1D182] to-[#688F48]',
      duration: 'Lifetime access'
    }
  ];

  return (
    <section className="relative py-24 bg-[#F4F1E9] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#B1D182]/10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#688F48]/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#B1D182]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-[#F4F1E9]/80 backdrop-blur-sm border border-[#B1D182]/40 rounded-2xl px-6 py-3 mb-6 shadow-lg">
            <Crown className="w-5 h-5 text-[#688F48]" />
            <span className="font-bold text-[#688F48] text-sm uppercase tracking-wider">
              The MyLab Process
            </span>
            <Sparkles className="w-4 h-4 text-[#B1D182]" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#0B132B]">
            Experience <span className="bg-gradient-to-r from-[#B1D182] to-[#688F48] bg-clip-text text-transparent">Royal Wellness</span>
          </h2>

          <p className="text-xl md:text-2xl text-[#0B132B]/80 max-w-4xl mx-auto leading-relaxed">
            Every step is designed to give you <span className="font-semibold text-[#688F48]">premium attention</span> 
            and <span className="font-semibold text-[#B1D182]">precision health insights</span> for a truly royal experience.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="group relative">
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden xl:block absolute top-20 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#B1D182]/50 to-[#688F48]/50 z-0 group-hover:from-[#B1D182] group-hover:to-[#688F48] transition-all duration-500"></div>
                )}

                <div className="relative bg-[#F4F1E9]/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-[#B1D182]/50 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-105 h-full">
                  {/* Step Number */}
                  <div className={`absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-2xl border-2 border-[#F4F1E9]/30`}>
                    <span className="font-bold text-white text-2xl">{step.number}</span>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute -top-3 -right-3 bg-[#F4F1E9]/90 backdrop-blur-sm border border-[#B1D182] rounded-2xl px-3 py-1">
                    <span className="text-[#688F48] text-sm font-semibold flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{step.duration}</span>
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6 pt-4">
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                      <IconComponent className="text-white" size={32} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <h3 className="font-bold text-2xl text-[#0B132B]">{step.title}</h3>
                    <p className="text-[#0B132B]/80 leading-relaxed">{step.description}</p>

                    {/* Features List */}
                    <ul className="space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center justify-center space-x-2 text-sm text-[#688F48] font-medium">
                          <div className="w-1.5 h-1.5 bg-[#B1D182] rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B1D182]/5 to-[#688F48]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Stats */}
        <div className="bg-[#F4F1E9]/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-[#B1D182]/50 shadow-2xl mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '10,000+', label: 'Royal Members', color: 'text-[#688F48]' },
              { icon: Star, value: '4.9/5', label: 'Royal Rating', color: 'text-[#B1D182]' },
              { icon: Award, value: '98%', label: 'Success Rate', color: 'text-[#688F48]' },
              { icon: Shield, value: '100%', label: 'Secure & Private', color: 'text-[#688F48]' }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-[#F4F1E9]/80 rounded-2xl flex items-center justify-center border-2 border-[#B1D182] group-hover:border-[#688F48] transition-all duration-300">
                      <IconComponent className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>
                  <div className={`font-bold text-3xl ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>{stat.value}</div>
                  <div className="text-[#0B132B]/80 font-semibold">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#B1D182] to-[#688F48] rounded-3xl p-8 border-2 border-[#F4F1E9]/20 shadow-2xl inline-block max-w-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="text-center lg:text-left">
                <h3 className="font-bold text-2xl text-white mb-2">Ready for Your Royal Journey?</h3>
                <p className="text-white/80">Join thousands experiencing elite wellness transformation</p>
              </div>

              <button className="group bg-white text-[#688F48] px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 flex items-center space-x-3">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
