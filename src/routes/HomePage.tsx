import React from 'react';
import { Hero } from '../components/home/Hero';
import { BrandIntroduction } from '../components/home/BrandIntroduction';
import { SelectedWork } from '../components/home/SelectedWork';
import WhyAGAds from '../components/home/WhyAGAds';
import { FinalCTA } from '../components/home/FinalCTA';
import { ResultsProof } from '../components/home/ResultsProof';
import { Marquee } from '../components/sections/Marquee';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full bg-white text-text-primary">
      <Hero />
      <Marquee />
      <BrandIntroduction />
      <ResultsProof />
      <SelectedWork />
      <WhyAGAds />
      <FinalCTA />
    </div>
  );
};