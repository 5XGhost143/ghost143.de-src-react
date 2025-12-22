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
        blur: Math.random() * 2,
        isSnow: true
      }));
    } else {
      return [];
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

        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100px);
          }
        }

        @keyframes gridPulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
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

      {!winterEnabled && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
              animation: 'gridPulse 4s ease-in-out infinite'
            }}
          />
          
          <div 
            className="absolute bottom-0 left-1/2 w-[200%] h-[200%]"
            style={{
              transform: 'translateX(-50%) perspective(1000px) rotateX(60deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `
                  linear-gradient(rgba(139, 92, 246, 0.4) 2px, transparent 2px),
                  linear-gradient(90deg, rgba(139, 92, 246, 0.4) 2px, transparent 2px),
                  linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
                filter: 'blur(0.5px)',
                boxShadow: `
                  0 0 100px rgba(139, 92, 246, 0.3),
                  0 0 200px rgba(236, 72, 153, 0.2)
                `,
                animation: 'gridMove 3s linear infinite'
              }}
            />
          </div>

          <div 
            className="absolute top-0 left-0 w-full h-40"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, transparent 100%)',
              pointerEvents: 'none'
            }}
          />
        </div>
      )}

      {winterEnabled && (
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
                backgroundColor: '#FFFFFF',
                boxShadow: `0 0 ${particle.size * 3}px rgba(255,255,255,0.8), 0 0 ${particle.size * 6}px rgba(200,230,255,0.4)`,
                animation: `snowfall ${particle.duration}s infinite linear`,
                animationDelay: `${particle.delay}s`,
                '--snow-drift': `${particle.drift}px`,
                '--snow-opacity': particle.opacity,
                filter: `blur(${particle.blur}px)`
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}