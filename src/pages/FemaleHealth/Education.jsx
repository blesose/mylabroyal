// // import React from 'react';

// // const Education = () => {
// //   const topics = [
// //     {
// //       title: 'Menstrual Cycle Basics',
// //       content: 'Understanding the four phases of your menstrual cycle and what happens in each phase.',
// //       points: [
// //         'Menstrual Phase (Days 1-5)',
// //         'Follicular Phase (Days 1-13)',
// //         'Ovulation Phase (Day 14)',
// //         'Luteal Phase (Days 15-28)'
// //       ]
// //     },
// //     {
// //       title: 'Ovulation & Fertility',
// //       content: 'Learn about ovulation signs, fertile windows, and how to track your most fertile days.',
// //       points: [
// //         'Ovulation typically occurs 14 days before next period',
// //         'Fertile window is 5 days before ovulation',
// //         'Signs include cervical mucus changes and basal body temperature rise',
// //         'Tracking helps with conception and cycle awareness'
// //       ]
// //     },
// //     {
// //       title: 'Pregnancy Health',
// //       content: 'Essential information for a healthy pregnancy from conception to delivery.',
// //       points: [
// //         'Importance of prenatal care and vitamins',
// //         'Nutrition and exercise during pregnancy',
// //         'Common symptoms and when to seek help',
// //         'Preparing for labor and delivery'
// //       ]
// //     },
// //     {
// //       title: 'Cycle Health Indicators',
// //       content: 'What your cycle can tell you about your overall health and when to consult a doctor.',
// //       points: [
// //         'Regular cycles indicate hormonal balance',
// //         'Track changes in flow, duration, and symptoms',
// //         'Recognize signs of potential health issues',
// //         'Importance of annual gynecological exams'
// //       ]
// //     }
// //   ];

// //   return (
// //     <div className="p-8">
// //       <h2 className="text-3xl font-bold text-gray-800 mb-6">Female Health Education</h2>
// //       <p className="text-gray-600 mb-8 text-lg">
// //         Comprehensive information to help you understand and manage your reproductive health.
// //       </p>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //         {topics.map((topic, index) => (
// //           <div key={index} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200 hover-lift transition-all duration-300">
// //             <h3 className="text-xl font-semibold text-gray-800 mb-3">{topic.title}</h3>
// //             <p className="text-gray-600 mb-4">{topic.content}</p>
// //             <ul className="space-y-2">
// //               {topic.points.map((point, pointIndex) => (
// //                 <li key={pointIndex} className="flex items-start space-x-2">
// //                   <span className="text-pink-500 mt-1">•</span>
// //                   <span className="text-gray-700">{point}</span>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="mt-12 bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
// //         <h3 className="text-2xl font-bold text-blue-800 mb-4">When to Seek Medical Advice</h3>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div>
// //             <h4 className="font-semibold text-blue-700 mb-2">Cycle Concerns:</h4>
// //             <ul className="space-y-1 text-blue-600">
// //               <li>• Periods lasting longer than 7 days</li>
// //               <li>• Cycles shorter than 21 days or longer than 35 days</li>
// //               <li>• Severe pain that affects daily activities</li>
// //               <li>• Heavy bleeding requiring hourly pad changes</li>
// //             </ul>
// //           </div>
// //           <div>
// //             <h4 className="font-semibold text-blue-700 mb-2">Pregnancy Concerns:</h4>
// //             <ul className="space-y-1 text-blue-600">
// //               <li>• Vaginal bleeding or spotting</li>
// //               <li>• Severe abdominal pain</li>
// //               <li>• Decreased fetal movement</li>
// //               <li>• Signs of preterm labor</li>
// //             </ul>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Education;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Education = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚', count: 24 },
    { id: 'cycle', name: 'Cycle Health', icon: '📅', count: 8 },
    { id: 'fertility', name: 'Fertility', icon: '👶', count: 6 },
    { id: 'pregnancy', name: 'Pregnancy', icon: '🤰', count: 5 },
    { id: 'menopause', name: 'Menopause', icon: '🌅', count: 3 },
    { id: 'wellness', name: 'Wellness', icon: '💖', count: 7 }
  ];

  const articles = [
    {
      id: 1,
      title: 'Understanding Your Menstrual Cycle Phases',
      category: 'cycle',
      readTime: '8 min',
      difficulty: 'Beginner',
      icon: '📅',
      color: 'from-pink-500 to-rose-500',
      excerpt: 'Learn about the four phases of your menstrual cycle and how to optimize each phase for better health and productivity.',
      featured: true
    },
    {
      id: 2,
      title: 'Fertility Awareness Methods Explained',
      category: 'fertility',
      readTime: '12 min',
      difficulty: 'Intermediate',
      icon: '📊',
      color: 'from-purple-500 to-pink-500',
      excerpt: 'Comprehensive guide to fertility awareness methods including symptothermal tracking and cervical mucus observations.',
      featured: true
    },
    {
      id: 3,
      title: 'Nutrition for Hormonal Balance',
      category: 'wellness',
      readTime: '10 min',
      difficulty: 'Beginner',
      icon: '🍎',
      color: 'from-green-500 to-emerald-500',
      excerpt: 'Discover the key nutrients and foods that support hormonal balance throughout your menstrual cycle.',
      featured: false
    },
    {
      id: 4,
      title: 'Pregnancy Week-by-Week Guide',
      category: 'pregnancy',
      readTime: '15 min',
      difficulty: 'Beginner',
      icon: '🤰',
      color: 'from-rose-500 to-pink-500',
      excerpt: 'Complete guide to fetal development and maternal changes during each week of pregnancy.',
      featured: true
    },
    {
      id: 5,
      title: 'Managing PMS Symptoms Naturally',
      category: 'cycle',
      readTime: '6 min',
      difficulty: 'Beginner',
      icon: '💊',
      color: 'from-blue-500 to-cyan-500',
      excerpt: 'Natural remedies and lifestyle changes to manage premenstrual syndrome symptoms effectively.',
      featured: false
    },
    {
      id: 6,
      title: 'Perimenopause: What to Expect',
      category: 'menopause',
      readTime: '14 min',
      difficulty: 'Intermediate',
      icon: '🌅',
      color: 'from-orange-500 to-red-500',
      excerpt: 'Understanding the transition to menopause, common symptoms, and management strategies.',
      featured: false
    },
    {
      id: 7,
      title: 'Exercise and Your Cycle',
      category: 'wellness',
      readTime: '9 min',
      difficulty: 'Beginner',
      icon: '💪',
      color: 'from-yellow-500 to-orange-500',
      excerpt: 'How to adapt your exercise routine to different phases of your menstrual cycle for optimal results.',
      featured: false
    },
    {
      id: 8,
      title: 'Ovulation Tracking Masterclass',
      category: 'fertility',
      readTime: '11 min',
      difficulty: 'Advanced',
      icon: '🎯',
      color: 'from-indigo-500 to-blue-500',
      excerpt: 'Advanced techniques for accurate ovulation prediction and fertility window identification.',
      featured: true
    }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticles = articles.filter(article => article.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/20 to-blue-50/20">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-white via-pink-50/30 to-blue-50/30 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-200/30 to-rose-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl mb-8 shadow-2xl animate-glow">
              <span className="text-4xl text-white">📚</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              Royal Education
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
              Expert-curated knowledge to empower your feminine wellness journey with royal wisdom and precision
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="primary"
                size="xl"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-12"
                icon="🔍"
              >
                Search Topics
              </Button>
              <Button
                variant="secondary"
                size="xl"
                className="px-12"
                icon="📖"
              >
                Browse All
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      <section className="py-12 bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-semibold">{category.name}</span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Featured Royal Guides
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Essential reading for every woman's wellness journey, curated by our royal health experts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {featuredArticles.map((article) => (
              <Card key={article.id} hover glow className="group">
                <CardContent>
                  <div className={`w-16 h-16 bg-gradient-to-r ${article.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl text-white">{article.icon}</span>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {article.difficulty}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      ⏱️ {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                  <Button variant="ghost" className="w-full group-hover:bg-blue-50 group-hover:text-blue-600" icon="📖">
                    Read Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles Grid */}
      <section className="py-16 bg-gradient-to-br from-blue-50/30 to-cyan-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Royal Knowledge Library
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive collection of articles, guides, and resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div key={article.id} className="group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-white/60 backdrop-blur-sm h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${article.color} rounded-xl flex items-center justify-center text-white`}>
                      <span className="text-lg">{article.icon}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">{article.readTime}</span>
                      <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full mt-1">
                        {article.difficulty}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500 capitalize">
                      {article.category}
                    </span>
                    <Button variant="ghost" size="small" className="text-blue-600 hover:bg-blue-50" icon="👁️">
                      Read
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-white">🔍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">No articles found</h3>
              <p className="text-gray-600 mb-6">Try selecting a different category or search term</p>
              <Button 
                variant="primary" 
                onClick={() => setSelectedCategory('all')}
                icon="🔄"
              >
                Show All Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Expert Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                Royal Health Experts
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our content is carefully curated and reviewed by a team of royal health professionals, including gynecologists, nutritionists, and wellness coaches.
              </p>
              <div className="space-y-4">
                {[
                  { name: 'Dr. Sarah Chen', specialty: 'Gynecologist', icon: '👩‍⚕️' },
                  { name: 'Dr. Maria Rodriguez', specialty: 'Reproductive Endocrinologist', icon: '🔬' },
                  { name: 'Emily Watson, RD', specialty: 'Nutrition Specialist', icon: '🍎' },
                  { name: 'Dr. James Thompson', specialty: 'Mental Health Expert', icon: '🧠' }
                ].map((expert, index) => (
                  <div key={expert.name} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50/80 hover:bg-white transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white">
                      <span className="text-lg">{expert.icon}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{expert.name}</div>
                      <div className="text-sm text-gray-600">{expert.specialty}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
              <p className="text-blue-100 mb-6 text-lg">
                Get the latest royal health insights and articles delivered directly to your inbox.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Your royal email address..."
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50" icon="📬">
                  Subscribe to Royal Updates
                </Button>
              </div>
              <p className="text-blue-200 text-sm mt-4">
                Join 10,000+ royal members receiving exclusive health insights
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;