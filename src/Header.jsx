import React from 'react';

export default function Header({ isVisible }) {
  return (
    <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h1 className="text-7xl md:text-9xl font-bold tracking-wider text-white mb-8">
        GHOST143
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide mb-12">
        Junior Developer
      </p>
    </div>
  );
}