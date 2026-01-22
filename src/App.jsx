import React, { useState, useEffect } from 'react';
import Header from './Header';
import LinkSection from './LinkSection';

export default function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className="min-h-screen bg-neutral-900 text-white overflow-hidden relative select-none" 
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <Header isVisible={isVisible} />
        <LinkSection isVisible={isVisible} />
      </div>
    </div>
  );
}