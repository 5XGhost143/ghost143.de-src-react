import React, { useState, useEffect, useMemo, useRef } from 'react';
import AppThemeSettings from './AppThemeSettings.json';

export default function AnimatedBackground({ mousePosition, winterEnabled }) {
  const [particles, setParticles] = useState([]);
  const backgroundRef = useRef(null);
  const rafId = useRef(null);

  const generateParticles = useMemo(() => {
    if (winterEnabled) {
      const intensity = AppThemeSettings.winterTheme.snowIntensity;
      const count = intensity === "high" ? 50 : intensity === "medium" ? 35 : 20;
      
      return [...Array(count)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * -20,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 8 + 12,
        delay: Math.random() * 10,
        drift: (Math.random() - 0.5) * 30,
        opacity: Math.random() * 0.6 + 0.4,
        blur: Math.random() * 2
      }));
    } else {
      return [...Array(25)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        direction: Math.random() > 0.5 ? 1 : -1
      }));
    }
  }, [winterEnabled]);

  useEffect(() => {
    setParticles([]);
    const timeout = setTimeout(() => {
      setParticles(generateParticles);
    }, 100);
    return () => clearTimeout(timeout);
  }, [generateParticles]);

  useEffect(() => {
    if (backgroundRef.current) {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      rafId.current = requestAnimationFrame(() => {
        if (backgroundRef.current) {
          const color = winterEnabled ? '200, 230, 255' : '139, 92, 246';
          backgroundRef.current.style.background = `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(${color}, 0.15), transparent 80%)`;
        }
      });
    }
    
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [mousePosition.x, mousePosition.y, winterEnabled]);

  return (
    <>
      <style>{`
        @keyframes floatStar {
          0% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% { 
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-15px) translateX(10px) rotate(180deg);
            opacity: 0.7;
          }
          90% { 
            opacity: 0.3;
          }
          100% { 
            transform: translateY(0px) translateX(0px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes snowfall {
          0% { 
            transform: translateY(-10vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% { 
            opacity: var(--snow-opacity);
          }
          100% { 
            transform: translateY(110vh) translateX(var(--snow-drift)) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes winterShimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>

      <div 
        ref={backgroundRef}
        className="absolute inset-0 opacity-10 will-change-auto transition-all duration-1000"
      />
      
      {winterEnabled && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              background: 'linear-gradient(180deg, rgba(227, 242, 253, 0.1) 0%, transparent 100%)'
            }}
          />
        </div>
      )}

      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full will-change-transform"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: winterEnabled ? '#FFFFFF' : '#8B5CF6',
              boxShadow: winterEnabled 
                ? `0 0 ${particle.size * 3}px rgba(255,255,255,0.8), 0 0 ${particle.size * 6}px rgba(200,230,255,0.4)`
                : `0 0 ${particle.size * 2}px #8B5CF640`,
              animation: winterEnabled 
                ? `snowfall ${particle.duration}s infinite linear`
                : `floatStar ${particle.duration}s infinite ease-in-out`,
              animationDelay: `${particle.delay}s`,
              '--snow-drift': `${particle.drift}px`,
              '--snow-opacity': particle.opacity,
              filter: winterEnabled ? `blur(${particle.blur}px)` : 'none'
            }}
          />
        ))}
      </div>
    </>
  );
}