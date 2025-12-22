import React, { useRef, useEffect } from 'react';

export default function MouseCursor({ mousePosition, isClicking }) {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${mousePosition.x - 12}px, ${mousePosition.y - 12}px, 0) ${isClicking ? 'scale(0.8)' : 'scale(1)'}`;
    }
    if (trailRef.current) {
      trailRef.current.style.transform = `translate3d(${mousePosition.x - 20}px, ${mousePosition.y - 20}px, 0) ${isClicking ? 'scale(1.5)' : 'scale(1)'}`;
    }
  }, [mousePosition.x, mousePosition.y, isClicking]);

  return (
    <>
      <style>{`
        @keyframes cursorPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes trailPulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
      `}</style>

      <div 
        ref={trailRef}
        className="fixed w-10 h-10 pointer-events-none z-50 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(236, 72, 153, 0.3) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(12px)',
          transition: 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          animation: 'trailPulse 2s ease-in-out infinite',
        }}
      />

      <div 
        ref={cursorRef}
        className="fixed w-6 h-6 pointer-events-none z-50 will-change-transform"
        style={{
          transition: 'transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        <div className="relative w-full h-full">
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(236, 72, 153, 0.9))',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(236, 72, 153, 0.4)',
              animation: 'cursorPulse 2s ease-in-out infinite',
            }}
          />
          
          <div 
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.8)',
              animation: 'rotate 3s linear infinite, cursorPulse 2s ease-in-out infinite',
              borderStyle: 'dashed',
            }}
          />

          <div 
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
            style={{
              transform: 'translate(-50%, -50%)',
              background: 'white',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
            }}
          />

          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
              filter: 'blur(4px)',
            }}
          />
        </div>
      </div>
    </>
  );
}