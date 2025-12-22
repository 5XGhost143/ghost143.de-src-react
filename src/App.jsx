// App.jsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './Header';
import LinkSection from './LinkSection';
import AnimatedBackground from './AnimatedBackground';
import MouseCursor from './MouseCursor';

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafId = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    setIsVisible(true);
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative cursor-none select-none" onContextMenu={(e) => e.preventDefault()}>
      <MouseCursor mousePosition={mousePosition} />
      <AnimatedBackground mousePosition={mousePosition} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <Header isVisible={isVisible} />
        <LinkSection isVisible={isVisible} />

        <div className={`absolute bottom-8 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-600 text-sm tracking-widest">
            • BUILT BY GHOST143 • POWERED BY REACT •
          </p>
        </div>
      </div>
    </div>
  );
}