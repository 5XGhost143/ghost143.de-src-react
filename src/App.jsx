import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './Header';
import LinkSection from './LinkSection';
import AnimatedBackground from './AnimatedBackground';
import MouseCursor from './MouseCursor';
import AppThemeSettings from './AppThemeSettings.json';

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const winterEnabled = AppThemeSettings.winterTheme.enabled;
  const rafId = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    
    const checkMobile = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isTablet = /iPad|Android/i.test(navigator.userAgent);
      setIsMobile(hasTouch || isTablet);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);

  return (
    <div 
      className="min-h-screen text-white overflow-hidden relative select-none transition-colors duration-1000" 
      style={{ 
        cursor: isMobile ? 'auto' : 'none',
        backgroundColor: winterEnabled ? '#0a1929' : '#000000'
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {!isMobile && <MouseCursor mousePosition={mousePosition} isClicking={isClicking} winterEnabled={winterEnabled} />}
      <AnimatedBackground mousePosition={mousePosition} winterEnabled={winterEnabled} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <Header isVisible={isVisible} winterEnabled={winterEnabled} />
        <LinkSection isVisible={isVisible} isMobile={isMobile} winterEnabled={winterEnabled} />

        <div className={`absolute bottom-4 md:bottom-8 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} px-4`}>
          <p className="text-gray-600 text-xs md:text-sm tracking-widest">
            • BUILT BY GHOST143 • POWERED BY REACT •
          </p>
        </div>
      </div>
    </div>
  );
}