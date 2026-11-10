import React from 'react';
import { SEO } from '../components/common/SEO';
import { Hero } from '../components/home/Hero';
import { BrandIntroduction } from '../components/home/BrandIntroduction';
import { SelectedWork } from '../components/home/SelectedWork';
import WhyAGAds from '../components/home/WhyAGAds';
import { FinalCTA } from '../components/home/FinalCTA';
import { ResultsProof } from '../components/home/ResultsProof';
import { Marquee } from '../components/sections/Marquee';
import { ServicesPopup } from '../components/home/ServicesPopup';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full bg-white text-text-primary">
      <SEO
        title="One Brand. Every Channel. Real Growth"
        description="AG ADS is a premier marketing and advertising agency in Puducherry and Chennai connecting digital advertising with commanding outdoor media."
        canonicalPath="/"
      />
      <Hero />
      <Marquee />
      <BrandIntroduction />
      <ResultsProof />
      <SelectedWork />
      <WhyAGAds />
      <FinalCTA />
      <ServicesPopup />
    </div>
  );
};
