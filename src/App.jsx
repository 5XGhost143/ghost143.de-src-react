import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './Header';
import LinkSection from './LinkSection';
import AnimatedBackground from './AnimatedBackground';
import MouseCursor from './MouseCursor';

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
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
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative select-none" 
         style={{ cursor: isMobile ? 'auto' : 'none' }}
         onContextMenu={(e) => e.preventDefault()}>
      {!isMobile && <MouseCursor mousePosition={mousePosition} />}
      <AnimatedBackground mousePosition={mousePosition} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <Header isVisible={isVisible} />
        <LinkSection isVisible={isVisible} isMobile={isMobile} />

        <div className={`absolute bottom-4 md:bottom-8 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} px-4`}>
          <p className="text-gray-600 text-xs md:text-sm tracking-widest">
            • BUILT BY GHOST143 • POWERED BY REACT •
          </p>
        </div>
      </div>
    </div>
  );
}