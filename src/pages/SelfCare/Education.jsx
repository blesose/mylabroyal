import React from 'react';
const Education = () => {
  const selfCareTypes = [
    {
      type: 'Physical Self-Care',
      description: 'Actions that maintain or improve your physical health.',
      examples: [
        'Exercise regularly (yoga, gym, walking)',
        'Eat balanced meals and stay hydrated',
        'Get enough quality sleep',
        'Attend regular medical check-ups',
        'Maintain personal hygiene and grooming'
      ],
      benefits: [
        'Increased energy and vitality',
        'Stronger immunity',
        'Better sleep and recovery',
        'Reduced risk of illness or injury'
      ]
    },
    {
      type: 'Emotional Self-Care',
      description: 'Ways to process and manage emotions effectively.',
      examples: [
        'Journaling and self-reflection',
        'Therapy or counseling',
        'Meditation and mindfulness',
        'Setting healthy boundaries',
        'Positive affirmations and self-talk'
      ],
      benefits: [
        'Better emotional regulation',
        'Reduced stress and anxiety',
        'Increased resilience',
        'Stronger relationships'
      ]
    },
    {
      type: 'Mental Self-Care',
      description: 'Activities that stimulate and nurture your mind.',
      examples: [
        'Learning new skills or hobbies',
        'Reading and educational activities',
        'Brain games and puzzles',
        'Creative projects (painting, music, writing)',
        'Time management and planning'
      ],
      benefits: [
        'Improved focus and concentration',
        'Enhanced problem-solving skills',
        'Reduced mental fatigue',
        'Continuous personal growth'
      ]
    },
    {
      type: 'Social Self-Care',
      description: 'Actions that nurture your relationships and community.',
      examples: [
        'Spending quality time with friends/family',
        'Joining clubs or support groups',
        'Healthy communication and active listening',
        'Seeking help when needed',
        'Networking and community involvement'
      ],
      benefits: [
        'Stronger support system',
        'Reduced loneliness',
        'Better communication skills',
        'Sense of belonging and connection'
      ]
    },
    {
      type: 'Spiritual Self-Care',
      description: 'Practices that foster inner peace and purpose.',
      examples: [
        'Meditation or prayer',
        'Mindful walks in nature',
        'Reflecting on values and purpose',
        'Gratitude journaling',
        'Acts of kindness and service'
      ],
      benefits: [
        'Inner peace and calm',
        'Better stress management',
        'Stronger sense of purpose',
        'Improved overall well-being'
      ]
    }
  ];

  const selfCareMyths = [
    {
      myth: 'Self-care is selfish',
      truth: 'Self-care allows you to show up fully for yourself and others.'
    },
    {
      myth: 'Self-care requires a lot of money',
      truth: 'Simple actions like walking, journaling, or meditation are free.'
    },
    {
      myth: 'Self-care is only for women',
      truth: 'Everyone benefits from self-care, regardless of gender.'
    },
    {
      myth: 'Self-care takes hours each day',
      truth: 'Even 5-10 minutes of focused self-care makes a difference.'
    }
  ];

  const selfCareTips = [
    'Start small and build habits gradually.',
    'Listen to your body and mind’s needs.',
    'Be consistent but flexible with routines.',
    'Reflect weekly on what works and adjust.',
    'Celebrate small victories in self-care.'
  ];

  return (
    <div className="p-8 bg-[#B1D182] text-[#F4F1E9] min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-[#5BC0BE] mb-6">Self Care Education</h1>
      
      {/* Introduction */}
      <div className="bg-[#688F48] p-6 rounded-2xl shadow-lg mb-8">
        <p className="text-lg text-[#F4F1E9]/90 leading-relaxed">
          Self-care is essential for maintaining physical, emotional, mental, and spiritual well-being. 
          It involves intentional practices that support your overall health and resilience.
        </p>
      </div>

      {/* Self-Care Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {selfCareTypes.map((type, idx) => (
          <div key={idx} className="bg-[#688F48] p-6 rounded-2xl border-2 border-[#5BC0BE] hover:shadow-lg transition-all">
            <h2 className="text-xl font-semibold text-[#5BC0BE] mb-2">{type.type}</h2>
            <p className="text-[#F4F1E9]/90 mb-3">{type.description}</p>
            <h3 className="font-semibold text-[#E71D36] mb-1">Examples:</h3>
            <ul className="list-disc list-inside text-[#F4F1E9]/80 mb-2">
              {type.examples.map((ex, i) => (
                <li key={i}>{ex}</li>
              ))}
            </ul>
            <h3 className="font-semibold text-[#06D6A0] mb-1">Benefits:</h3>
            <ul className="list-disc list-inside text-[#F4F1E9]/80">
              {type.benefits.map((bf, i) => (
                <li key={i}>{bf}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Myths vs Truths */}
      <div className="bg-#688F48] p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-[#FF9F1C] mb-4">Self-Care Myths vs Truths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selfCareMyths.map((item, idx) => (
            <div key={idx} className="bg-[#0B132B]/70 p-4 rounded-lg border-2 border-[#FF9F1C]">
              <p className="text-red-500 line-through">Myth: {item.myth}</p>
              <p className="text-green-400 mt-1">Truth: {item.truth}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Practical Tips */}
      <div className="bg-[#688F48] p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-[#06D6A0] mb-4">Practical Self-Care Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-[#F4F1E9]/80">
          {selfCareTips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Planning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#688F48] p-6 rounded-2xl border-2 border-[#5BC0BE]">
          <h2 className="text-xl font-semibold text-[#5BC0BE] mb-3">Create a Self-Care Plan</h2>
          <ol className="list-decimal list-inside space-y-2 text-[#F4F1E9]/80">
            <li>Assess your current self-care habits</li>
            <li>Identify areas that need attention</li>
            <li>Set achievable goals</li>
            <li>Schedule activities into your routine</li>
            <li>Reflect and adjust regularly</li>
          </ol>
        </div>

        <div className="bg-[#688F48] p-6 rounded-2xl border-2 border-[#FF9F1C]">
          <h2 className="text-xl font-semibold text-[#FF9F1C] mb-3">When to Seek Professional Help</h2>
          <ul className="list-disc list-inside space-y-2 text-[#F4F1E9]/80">
            <li>Persistent sadness, anxiety, or stress</li>
            <li>Difficulty managing daily tasks</li>
            <li>Thoughts of self-harm or harmful behaviors</li>
            <li>Severe sleep or appetite disturbances</li>
            <li>Substance abuse concerns</li>
          </ul>
          <p className="mt-3 text-[#06D6A0]/90 text-sm">
            Seeking professional guidance is a proactive part of self-care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Education;
