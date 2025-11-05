import React from 'react';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import Features from './Features';
import WhyUseMyLab from './WhyUseMyLab';
import CommunityIntro from './CommunityIntro';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
     <WhyUseMyLab />
      <Features />
      <CommunityIntro />
    </div>
  );
};

export default Home;