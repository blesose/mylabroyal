// import React from 'react';
// const Education = () => {
//   const sleepStages = [
//     {
//       stage: 'N1 (Light Sleep)',
//       duration: '1-5 minutes',
//       description: 'Transition between wakefulness and sleep',
//       benefits: 'Muscle relaxation, slowed heartbeat'
//     },
//     {
//       stage: 'N2 (Light Sleep)',
//       duration: '10-60 minutes',
//       description: 'Body temperature drops, brain waves slow',
//       benefits: 'Memory consolidation, learning'
//     },
//     {
//       stage: 'N3 (Deep Sleep)',
//       duration: '20-40 minutes',
//       description: 'Slow-wave sleep, difficult to awaken',
//       benefits: 'Tissue repair, growth hormone release'
//     },
//     {
//       stage: 'REM Sleep',
//       duration: '10-60 minutes',
//       description: 'Rapid eye movement, brain activity increases',
//       benefits: 'Dreaming, emotional processing'
//     }
//   ];

//   const sleepDisorders = [
//     {
//       name: 'Insomnia',
//       symptoms: 'Difficulty falling/staying asleep',
//       impact: 'Daytime fatigue, mood disturbances',
//       treatment: 'Cognitive behavioral therapy, sleep hygiene'
//     },
//     {
//       name: 'Sleep Apnea',
//       symptoms: 'Loud snoring, gasping for air',
//       impact: 'High blood pressure, heart problems',
//       treatment: 'CPAP machine, lifestyle changes'
//     },
//     {
//       name: 'Restless Legs',
//       symptoms: 'Urge to move legs, uncomfortable sensations',
//       impact: 'Sleep disruption, daytime sleepiness',
//       treatment: 'Medication, iron supplements'
//     },
//     {
//       name: 'Narcolepsy',
//       symptoms: 'Excessive daytime sleepiness, sleep attacks',
//       impact: 'Sudden sleep episodes, cataplexy',
//       treatment: 'Stimulants, scheduled naps'
//     }
//   ];

//   return (
//     <div className="p-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Sleep Education</h2>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//         <div className=" bg-white rounded-xl shadow-lg p-4">
//           <h3 className="text-2xl font-bold text-gray-800 mb-4">The Science of Sleep</h3>
//           <div className="prose text-gray-600">
//             <p className="mb-4">
//               Sleep is a complex biological process that affects every aspect of your health. 
//               During sleep, your body works to support healthy brain function and maintain physical health.
//             </p>
            
//             <h4 className="font-semibold text-gray-800 mt-6 mb-3">Why Sleep Matters:</h4>
//             <ul className="space-y-2 p-1">
//               <li>Brain function and emotional well-being</li>
//               <li>Physical health and disease prevention</li>
//               <li>Safety and performance in daily activities</li>
//               <li>Growth and development in children/teens</li>
//             </ul>
//           </div>
//         </div>

//         <div className="bg-blue-50 rounded-2xl p-2 border-2 border-blue-200">
//           <h3 className="text-2xl font-bold text-blue-800 mb-4">Sleep Stages Cycle</h3>
//           <div className="space-y-4">
//             {sleepStages.map((stage, index) => (
//               <div key={index} className="bg-white rounded-lg p-4">
//                 <div className="flex justify-between items-start mb-2">
//                   <h4 className="font-semibold text-gray-800">{stage.stage}</h4>
//                   <span className="text-blue-600 text-sm font-medium">{stage.duration}</span>
//                 </div>
//                 <p className="text-gray-600 text-sm mb-2">{stage.description}</p>
//                 <p className="text-green-600 text-sm">{stage.benefits}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//         <h3 className="text-2xl font-bold text-gray-800 mb-6">Common Sleep Disorders</h3>
//         <div className="text-charcoal-grey grid grid-cols-1 md:grid-cols-2 gap-6">
//           {sleepDisorders.map((disorder, index) => (
//             <div key={index} className="border-2 border-gray-200 rounded-xl p-4 hover-lift transition-all duration-300">
//               <h4 className="font-semibold text-red-600 mb-2">{disorder.name}</h4>
//               <div className="space-y-2 text-sm">
//                 <p><strong>Symptoms:</strong> {disorder.symptoms}</p>
//                 <p><strong>Impact:</strong> {disorder.impact}</p>
//                 <p><strong>Treatment:</strong> {disorder.treatment}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
//           <h3 className="text-xl font-semibold text-green-800 mb-4">Sleep Hygiene Tips</h3>
//           <ul className="space-y-3 text-green-700">
//             <li className="flex items-start space-x-2">
//               <span className="text-green-500 mt-1">•</span>
//               <span>Stick to a consistent sleep schedule, even on weekends</span>
//             </li>
//             <li className="flex items-start space-x-2">
//               <span className="text-green-500 mt-1">•</span>
//               <span>Create a relaxing bedtime routine (reading, meditation)</span>
//             </li>
//             <li className="flex items-start space-x-2">
//               <span className="text-green-500 mt-1">•</span>
//               <span>Keep your bedroom cool, dark, and quiet</span>
//             </li>
//             <li className="flex items-start space-x-2">
//               <span className="text-green-500 mt-1">•</span>
//               <span>Avoid large meals, caffeine, and alcohol before bedtime</span>
//             </li>
//             <li className="flex items-start space-x-2">
//               <span className="text-green-500 mt-1">•</span>
//               <span>Get regular exercise, but not too close to bedtime</span>
//             </li>
//           </ul>
//         </div>

//         <div className="bg-purple-50 rounded-xl p-2 border-2 border-purple-200">
//           <h3 className="text-xl font-semibold text-purple-800 mb-4">Sleep & Health Connection</h3>
//           <div className="space-y-3 text-purple-700">
//             <p><strong>Immune System:</strong> Sleep helps fight infections</p>
//             <p><strong>Metabolism:</strong> Affects weight management and diabetes risk</p>
//             <p><strong>Mental Health:</strong> Crucial for emotional regulation</p>
//             <p><strong>Cardiovascular:</strong> Impacts blood pressure and heart health</p>
//             <p><strong>Cognitive:</strong> Essential for memory and learning</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Education;


import React, { useState } from 'react';
import { 
  BookOpen, Brain, Heart, Moon, 
  ChevronDown, ChevronUp, Activity,
  Zap, Clock, Droplet, TrendingUp
} from 'lucide-react';

const Education = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const sleepStages = [
    { stage: 'N1 (Light Sleep)', duration: '1-5 min', description: 'Transition between wakefulness and sleep', benefits: 'Muscle relaxation, slowed heartbeat', color: 'from-blue-400 to-cyan-400' },
    { stage: 'N2 (Light Sleep)', duration: '10-60 min', description: 'Body temperature drops, brain waves slow', benefits: 'Memory consolidation, learning', color: 'from-cyan-400 to-teal-400' },
    { stage: 'N3 (Deep Sleep)', duration: '20-40 min', description: 'Slow-wave sleep, difficult to awaken', benefits: 'Tissue repair, growth hormone release', color: 'from-teal-400 to-green-400' },
    { stage: 'REM Sleep', duration: '10-60 min', description: 'Rapid eye movement, brain activity increases', benefits: 'Dreaming, emotional processing', color: 'from-purple-400 to-pink-400' }
  ];

  const sleepTips = [
    { title: 'Consistent Schedule', description: 'Go to bed and wake up at the same time every day', icon: Clock },
    { title: 'Create a Routine', description: 'Develop relaxing pre-sleep rituals like reading or meditation', icon: BookOpen },
    { title: 'Optimize Environment', description: 'Keep bedroom dark, quiet, and cool (65-68°F)', icon: Moon },
    { title: 'Limit Screen Time', description: 'Avoid blue light 1-2 hours before bed', icon: Activity }
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-8 w-8" />
          <h2 className="text-2xl font-bold">Sleep Education</h2>
        </div>
        <p className="text-indigo-100 text-sm">Learn about sleep science and improve your rest</p>
      </div>

      <div className="p-6 space-y-6">
        {/* The Science of Sleep */}
        <div className="border-b border-gray-200 pb-6">
          <button
            onClick={() => toggleSection('science')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-purple-500" />
              <h3 className="text-xl font-semibold text-gray-800">The Science of Sleep</h3>
            </div>
            {expandedSection === 'science' ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
          </button>
          
          {expandedSection === 'science' && (
            <div className="mt-4 space-y-4 animate-fadeIn">
              <p className="text-gray-600">
                Sleep is a complex biological process essential for physical health, cognitive function, and emotional well-being. 
                During sleep, your body performs critical maintenance and restoration tasks.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="font-semibold text-blue-800 mb-2">🧠 Brain Function</div>
                  <div className="text-sm text-blue-700">Sleep helps consolidate memories and clear brain toxins</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="font-semibold text-green-800 mb-2">💪 Physical Health</div>
                  <div className="text-sm text-green-700">Tissue repair, muscle growth, and immune system strengthening</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="font-semibold text-purple-800 mb-2">😊 Emotional Balance</div>
                  <div className="text-sm text-purple-700">Regulates mood and emotional responses</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <div className="font-semibold text-orange-800 mb-2">⚡ Energy Restoration</div>
                  <div className="text-sm text-orange-700">Recharges energy levels and metabolism</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sleep Stages */}
        <div className="border-b border-gray-200 pb-6">
          <button
            onClick={() => toggleSection('stages')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <Moon className="h-6 w-6 text-indigo-500" />
              <h3 className="text-xl font-semibold text-gray-800">Sleep Stages Cycle</h3>
            </div>
            {expandedSection === 'stages' ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
          </button>
          
          {expandedSection === 'stages' && (
            <div className="mt-4 space-y-3 animate-fadeIn">
              {sleepStages.map((stage, index) => (
                <div key={index} className={`bg-gradient-to-r ${stage.color} rounded-xl p-4 text-white`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg">{stage.stage}</h4>
                    <span className="text-sm bg-white/20 px-2 py-1 rounded-lg">{stage.duration}</span>
                  </div>
                  <p className="text-sm opacity-90 mb-2">{stage.description}</p>
                  <p className="text-sm font-medium">{stage.benefits}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sleep Tips */}
        <div className="border-b border-gray-200 pb-6">
          <button
            onClick={() => toggleSection('tips')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-800">Sleep Hygiene Tips</h3>
            </div>
            {expandedSection === 'tips' ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
          </button>
          
          {expandedSection === 'tips' && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
              {sleepTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Icon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{tip.title}</div>
                        <div className="text-sm text-gray-600">{tip.description}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sleep & Health Connection */}
        <div>
          <button
            onClick={() => toggleSection('health')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-red-500" />
              <h3 className="text-xl font-semibold text-gray-800">Sleep & Health Connection</h3>
            </div>
            {expandedSection === 'health' ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
          </button>
          
          {expandedSection === 'health' && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
                <div className="font-semibold text-red-800 mb-2">❤️ Cardiovascular Health</div>
                <div className="text-sm text-red-700">Poor sleep increases risk of heart disease and high blood pressure</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                <div className="font-semibold text-green-800 mb-2">🛡️ Immune Function</div>
                <div className="text-sm text-green-700">Sleep helps fight infections and reduces inflammation</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                <div className="font-semibold text-purple-800 mb-2">🧠 Mental Health</div>
                <div className="text-sm text-purple-700">Sleep deprivation linked to anxiety and depression</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                <div className="font-semibold text-blue-800 mb-2">⚖️ Weight Management</div>
                <div className="text-sm text-blue-700">Sleep regulates hunger hormones and metabolism</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Education;