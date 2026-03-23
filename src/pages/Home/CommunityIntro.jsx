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
