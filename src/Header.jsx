import React from 'react';
import { FaSnowflake } from 'react-icons/fa';
import { GiFireworkRocket } from 'react-icons/gi';

export default function Header({ isVisible, winterEnabled, newYearEnabled }) {
  const getGradient = () => {
    if (winterEnabled) {
      return 'linear-gradient(to right, #64B5F6, #E3F2FD, #81D4FA)';
    } else if (newYearEnabled) {
      return 'linear-gradient(to right, #FFD700, #FF6B6B, #4ECDC4)';
    } else {
      return 'linear-gradient(to right, #c084fc, #ec4899, #22d3ee)';
    }
  };

  const getAnimation = () => {
    if (winterEnabled) {
      return 'winterShimmer 3s ease-in-out infinite';
    } else {
      return 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite';
    }
  };

  return (
    <div className={`text-center mb-8 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider relative px-4">
        <span 
          className="relative z-10 bg-clip-text text-transparent animate-pulse"
          style={{
            backgroundImage: getGradient(),
            backgroundSize: winterEnabled ? '200% auto' : '100% auto',
            animation: getAnimation()
          }}
        >
          GHOST143
        </span>
        <div 
          className="absolute inset-0 blur-3xl opacity-20 animate-pulse" 
          style={{
            background: getGradient()
          }}
        />
      </h1>
      
      <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mt-4 md:mt-6 font-light tracking-wide px-4">
        Junior Developer • 5X
      </p>
      
      {winterEnabled && (
        <div className="mt-4 flex items-center justify-center gap-2 text-blue-300 text-sm">
          <FaSnowflake className="animate-spin" style={{ animationDuration: '8s' }} />
          <span>Merry Christmas</span>
          <FaSnowflake className="animate-spin" style={{ animationDuration: '8s' }} />
        </div>
      )}

      {newYearEnabled && (
        <div className="mt-4 flex items-center justify-center gap-2 text-yellow-300 text-sm">
          <GiFireworkRocket className="animate-bounce" />
          <span>Happy New Year 2026</span>
          <GiFireworkRocket className="animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      )}
    </div>
  );
}