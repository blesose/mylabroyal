import React, { useState } from 'react';
import FitnessForm from '../../components/forms/fitnessForm';
import NutritionForm from '../../components/forms/nutritionForm';

const FitnessNutrition = () => {
  const [activeTab, setActiveTab] = useState('fitness');

  const tabs = [
    { id: 'fitness', name: 'Fitness Tracker' },
    { id: 'nutrition', name: 'Nutrition Tracker' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1E9] py-10 ">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B132B] mb-4">
            Fitness & Nutrition
          </h1>
          <p className="text-lg text-[#688F48]">
            Track your workouts and meals to stay in balance.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md p-2 mb-8 flex justify-between gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#688F48] text-white shadow-lg'
                  : 'text-[#0B132B] hover:bg-[#B1D182] hover:text-white'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          {activeTab === 'fitness' ? <FitnessForm /> : <NutritionForm />}
        </div>
      </div>
    </div>
  );
};

export default FitnessNutrition;