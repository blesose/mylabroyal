import React from 'react';

const Education = () => {
  const sleepStages = [
    {
      stage: 'N1 (Light Sleep)',
      duration: '1-5 minutes',
      description: 'Transition between wakefulness and sleep',
      benefits: 'Muscle relaxation, slowed heartbeat'
    },
    {
      stage: 'N2 (Light Sleep)',
      duration: '10-60 minutes',
      description: 'Body temperature drops, brain waves slow',
      benefits: 'Memory consolidation, learning'
    },
    {
      stage: 'N3 (Deep Sleep)',
      duration: '20-40 minutes',
      description: 'Slow-wave sleep, difficult to awaken',
      benefits: 'Tissue repair, growth hormone release'
    },
    {
      stage: 'REM Sleep',
      duration: '10-60 minutes',
      description: 'Rapid eye movement, brain activity increases',
      benefits: 'Dreaming, emotional processing'
    }
  ];

  const sleepDisorders = [
    {
      name: 'Insomnia',
      symptoms: 'Difficulty falling/staying asleep',
      impact: 'Daytime fatigue, mood disturbances',
      treatment: 'Cognitive behavioral therapy, sleep hygiene'
    },
    {
      name: 'Sleep Apnea',
      symptoms: 'Loud snoring, gasping for air',
      impact: 'High blood pressure, heart problems',
      treatment: 'CPAP machine, lifestyle changes'
    },
    {
      name: 'Restless Legs',
      symptoms: 'Urge to move legs, uncomfortable sensations',
      impact: 'Sleep disruption, daytime sleepiness',
      treatment: 'Medication, iron supplements'
    },
    {
      name: 'Narcolepsy',
      symptoms: 'Excessive daytime sleepiness, sleep attacks',
      impact: 'Sudden sleep episodes, cataplexy',
      treatment: 'Stimulants, scheduled naps'
    }
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Sleep Education</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">The Science of Sleep</h3>
          <div className="prose text-gray-600">
            <p className="mb-4">
              Sleep is a complex biological process that affects every aspect of your health. 
              During sleep, your body works to support healthy brain function and maintain physical health.
            </p>
            
            <h4 className="font-semibold text-gray-800 mt-6 mb-3">Why Sleep Matters:</h4>
            <ul className="space-y-2">
              <li>• Brain function and emotional well-being</li>
              <li>• Physical health and disease prevention</li>
              <li>• Safety and performance in daily activities</li>
              <li>• Growth and development in children/teens</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Sleep Stages Cycle</h3>
          <div className="space-y-4">
            {sleepStages.map((stage, index) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">{stage.stage}</h4>
                  <span className="text-blue-600 text-sm font-medium">{stage.duration}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{stage.description}</p>
                <p className="text-green-600 text-sm">{stage.benefits}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Common Sleep Disorders</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sleepDisorders.map((disorder, index) => (
            <div key={index} className="border-2 border-gray-200 rounded-xl p-4 hover-lift transition-all duration-300">
              <h4 className="font-semibold text-red-600 mb-2">{disorder.name}</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Symptoms:</strong> {disorder.symptoms}</p>
                <p><strong>Impact:</strong> {disorder.impact}</p>
                <p><strong>Treatment:</strong> {disorder.treatment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
          <h3 className="text-xl font-semibold text-green-800 mb-4">Sleep Hygiene Tips</h3>
          <ul className="space-y-3 text-green-700">
            <li className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Stick to a consistent sleep schedule, even on weekends</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Create a relaxing bedtime routine (reading, meditation)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Keep your bedroom cool, dark, and quiet</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Avoid large meals, caffeine, and alcohol before bedtime</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Get regular exercise, but not too close to bedtime</span>
            </li>
          </ul>
        </div>

        <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
          <h3 className="text-xl font-semibold text-purple-800 mb-4">Sleep & Health Connection</h3>
          <div className="space-y-3 text-purple-700">
            <p><strong>Immune System:</strong> Sleep helps fight infections</p>
            <p><strong>Metabolism:</strong> Affects weight management and diabetes risk</p>
            <p><strong>Mental Health:</strong> Crucial for emotional regulation</p>
            <p><strong>Cardiovascular:</strong> Impacts blood pressure and heart health</p>
            <p><strong>Cognitive:</strong> Essential for memory and learning</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;