// Header.jsx

import React from 'react';

export default function Header({ isVisible }) {
  return (
    <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h1 className="text-8xl md:text-9xl font-bold tracking-wider relative">
        <span className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
          GHOST143
        </span>
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 opacity-20 animate-pulse" />
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-400 mt-6 font-light tracking-wide">
        Junior Developer • 5X
      </p>
    </div>
  );
}