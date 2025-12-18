import React, { useState } from 'react';
import CycleForm from '../../components/forms/CycleForm'; 
import OvulationForm from '../../components/forms/ovulationForm';
import PregnancyForm from '../../components/forms/PregnancyForm';
import Education from './Education';

const tabs = [
  { id: 'cycle', label: 'Menstrual Cycle' },
  { id: 'ovulation', label: 'Ovulation Tracker' },
  { id: 'pregnancy', label: 'Pregnancy Log' },
  { id: 'education', label: 'Education' }
];

const IndexFemaleHealth = () => {
  const [activeTab, setActiveTab] = useState('cycle');

  return (
    <div className="min-h-screen bg-[#F4F1E9] flex flex-col items-center px-4 py-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-[#2B463C] mb-6 text-center">
        Female Health Dashboard
      </h1>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-[#688F48] text-white shadow-md'
                : 'bg-white text-[#2B463C] border border-[#688F48] hover:bg-[#B1D182]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 transition-all duration-300">
        {activeTab === 'cycle' && <CycleForm />}
        {activeTab === 'ovulation' && <OvulationForm />}
        {activeTab === 'pregnancy' && <PregnancyForm />}
        {activeTab === 'education' && <Education />}
      </div>
    </div>
  );
};

export default IndexFemaleHealth;
