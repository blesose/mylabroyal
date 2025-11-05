// import React from 'react';

// const Education = () => {
//   const selfCareTypes = [
//     {
//       type: 'Physical Self-Care',
//       description: 'Activities that improve physical health and well-being',
//       examples: [
//         'Regular exercise and movement',
//         'Balanced nutrition and hydration',
//         'Adequate sleep and rest',
//         'Medical check-ups and healthcare',
//         'Personal hygiene and grooming'
//       ],
//       benefits: [
//         'Increased energy levels',
//         'Better physical health',
//         'Improved sleep quality',
//         'Reduced risk of illness'
//       ]
//     },
//     {
//       type: 'Emotional Self-Care',
//       description: 'Activities that help connect with and process emotions',
//       examples: [
//         'Therapy or counseling',
//         'Journaling and reflection',
//         'Mindfulness practices',
//         'Setting healthy boundaries',
//         'Positive self-talk'
//       ],
//       benefits: [
//         'Better emotional regulation',
//         'Increased self-awareness',
//         'Improved relationships',
//         'Reduced anxiety and stress'
//       ]
//     },
//     {
//       type: 'Mental Self-Care',
//       description: 'Activities that stimulate and nurture the mind',
//       examples: [
//         'Learning new skills',
//         'Reading and education',
//         'Creative pursuits',
//         'Puzzles and brain games',
//         'Time management'
//       ],
//       benefits: [
//         'Improved focus and concentration',
//         'Enhanced problem-solving',
//         'Reduced mental fatigue',
//         'Continuous personal growth'
//       ]
//     },
//     {
//       type: 'Social Self-Care',
//       description: 'Activities that nurture relationships and social connections',
//       examples: [
//         'Quality time with loved ones',
//         'Joining communities or groups',
//         'Setting social boundaries',
//         'Asking for help when needed',
//         'Healthy communication'
//       ],
//       benefits: [
//         'Stronger support system',
//         'Reduced loneliness',
//         'Improved communication skills',
//         'Sense of belonging'
//       ]
//     }
//   ];

//   const selfCareMyths = [
//     {
//       myth: 'Self-care is selfish',
//       truth: 'Self-care allows you to show up better for others. You cannot pour from an empty cup.'
//     },
//     {
//       myth: 'Self-care requires money',
//       truth: 'Many effective self-care practices are free: walking, meditation, journaling, deep breathing.'
//     },
//     {
//       myth: 'Self-care is only for women',
//       truth: 'Everyone benefits from self-care regardless of gender. Mental health matters for all.'
//     },
//     {
//       myth: 'Self-care takes too much time',
//       truth: 'Even 5-10 minutes of intentional self-care can make a significant difference.'
//     }
//   ];

//   return (
//     <div className="p-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Self Care Education</h2>
      
//       <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//         <h3 className="text-2xl font-bold text-gray-800 mb-4">What is Self-Care?</h3>
//         <div className="prose text-gray-600 max-w-none">
//           <p className="mb-4 text-lg">
//             Self-care is the practice of taking action to preserve or improve one's own health. 
//             It involves taking responsibility for your own well-being and happiness, particularly during periods of stress.
//           </p>
          
//           <p className="mb-4">
//             Effective self-care should be:
//           </p>
//           <ul className="list-disc list-inside space-y-2 mb-4">
//             <li><strong>Intentional:</strong> Done with purpose and awareness</li>
//             <li><strong>Regular:</strong> Incorporated into daily or weekly routines</li>
//             <li><strong>Personalized:</strong> Tailored to your unique needs and preferences</li>
//             <li><strong>Holistic:</strong> Addressing multiple aspects of well-being</li>
//           </ul>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//         {selfCareTypes.map((careType, index) => (
//           <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover-lift transition-all duration-300">
//             <h3 className="text-xl font-semibold text-purple-800 mb-3">{careType.type}</h3>
//             <p className="text-gray-600 mb-4">{careType.description}</p>
            
//             <div className="mb-4">
//               <h4 className="font-semibold text-gray-700 mb-2">Examples:</h4>
//               <ul className="space-y-1 text-sm">
//                 {careType.examples.map((example, idx) => (
//                   <li key={idx} className="flex items-start space-x-2">
//                     <span className="text-purple-500 mt-1">•</span>
//                     <span className="text-gray-700">{example}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold text-gray-700 mb-2">Benefits:</h4>
//               <ul className="space-y-1 text-sm">
//                 {careType.benefits.map((benefit, idx) => (
//                   <li key={idx} className="flex items-start space-x-2">
//                     <span className="text-green-500 mt-1">✓</span>
//                     <span className="text-gray-700">{benefit}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200 mb-8">
//         <h3 className="text-2xl font-bold text-yellow-800 mb-6">Self-Care Myths vs Truths</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {selfCareMyths.map((item, index) => (
//             <div key={index} className="bg-white rounded-lg p-4">
//               <div className="mb-3">
//                 <h4 className="font-semibold text-red-600 mb-1">Myth: {item.myth}</h4>
//                 <p className="text-red-500 text-sm line-through">{item.myth}</p>
//               </div>
//               <div>
//                 <h4 className="font-semibold text-green-600 mb-1">Truth:</h4>
//                 <p className="text-green-700">{item.truth}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
//           <h3 className="text-xl font-semibold text-blue-800 mb-4">Creating a Self-Care Plan</h3>
//           <ol className="space-y-3 text-blue-700">
//             <li className="flex items-start space-x-2">
//               <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
//               <span>Assess your current self-care practices</span>
//             </li>
//             <li className="flex items-start space-x-2">
//               <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
//               <span>Identify areas needing more attention</span>
//             </li>
//             <li className="flex items-start space-x-2">
//               <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
//               <span>Set realistic self-care goals</span>
//             </li>
//             <li className="flex items-start space-x-2">
//               <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
//               <span>Schedule self-care activities</span>
//             </li>
//             <li className="flex items-start space-x-2">
//               <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
//               <span>Regularly evaluate and adjust your plan</span>
//             </li>
//           </ol>
//         </div>

//         <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
//           <h3 className="text-xl font-semibold text-green-800 mb-4">When to Seek Professional Help</h3>
//           <ul className="space-y-2 text-green-700">
//             <li className="flex items-start space-x-2">
//               <span className="text-green-500 mt-1">•</span>
//               <span>Persistent feelings of sadness or hopelessness</span>
//             </li>
//             <li className="flex items-start space-x-2">
//               <span className="text-green-500 mt-1">•</span>
//               <span>Difficulty functioning in daily life</span>
//             </li>
//             <li className="flex items-start space-x-2">
//               <span className="text-green-500 mt-1">•</span>
//               <span>Substance abuse or addictive behaviors</span>
//             </li>
//             <li className="flex items-start space-x-2">
//               <span className="text-green-500 mt-1">•</span>
//               <span>Thoughts of self-harm or suicide</span>
//             </li>
//             <li className="flex items-start space-x-2">
//               <span className="text-green-500 mt-1">•</span>
//               <span>Severe anxiety or panic attacks</span>
//             </li>
//           </ul>
//           <div className="mt-4 p-3 bg-white rounded-lg">
//             <p className="text-green-600 text-sm">
//               <strong>Remember:</strong> Seeking professional help is a form of self-care. 
//               Therapists, counselors, and doctors are trained to help you develop effective coping strategies.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Education;
import React from "react";

const Education = () => {
  return (
    <div className="p-6 bg-[#0B132B] text-[#F4F1E9] min-h-screen">
      <h1 className="text-3xl font-bold text-[#5BC0BE] mb-4">
        Self Care Education
      </h1>
      <p className="text-lg text-[#F4F1E9]/90 leading-relaxed">
        Self-care is essential for maintaining physical, emotional, and mental
        well-being. It can include rest, nutrition, relaxation, and reflection.
      </p>

      <ul className="mt-6 space-y-3 text-[#F4F1E9]/80">
        <li>🧘 Practice mindfulness and meditation daily.</li>
        <li>🥗 Eat balanced meals and stay hydrated.</li>
        <li>💤 Maintain a consistent sleep schedule.</li>
        <li>📓 Journal your thoughts and progress.</li>
        <li>💬 Reach out for support when needed.</li>
      </ul>
    </div>
  );
};

export default Education;



