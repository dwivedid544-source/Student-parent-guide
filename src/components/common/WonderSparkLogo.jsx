import React from 'react';
import { LifeVerseLogo } from './LifeVerseLogo';

// Backward-compatible export replacing all legacy WonderSpark references with LifeVerse AI
export const WonderSparkLogo = ({ size = 'md', className = '' }) => {
  return <LifeVerseLogo size={size} className={className} />;
};

export default WonderSparkLogo;
