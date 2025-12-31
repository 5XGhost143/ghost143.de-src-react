import React, { useState, useEffect, useMemo, useRef } from 'react';
import AppThemeSettings from './AppThemeSettings.json';

export default function AnimatedBackground({ mousePosition, winterEnabled, newYearEnabled }) {
  const [particles, setParticles] = useState([]);
  const [rockets, setRockets] = useState([]);
  const backgroundRef = useRef(null);
  const rafId = useRef(null);
  const rocketIntervalRef = useRef(null);
  const activeRocketsRef = useRef({ left: false, right: false });

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
    if (newYearEnabled) {
      let rocketId = 0;

      const launchRocket = () => {
        const colors = [
          ['#FFD700', '#FFA500', '#FF6B6B'],
          ['#4ECDC4', '#45B7D1', '#96CEB4'],
          ['#FF6B6B', '#C44569', '#F8B500'],
          ['#A8E6CF', '#DCEDC1', '#FFD3B6'],
          ['#FF85A2', '#FFA07A', '#FFB6C1'],
          ['#9D50BB', '#6E48AA', '#FF6B9D'],
          ['#00F260', '#0575E6', '#00D4FF'],
          ['#FF416C', '#FF4B2B', '#FFD54F']
        ];

        let side;
        if (!activeRocketsRef.current.left && !activeRocketsRef.current.right) {
          side = Math.random() > 0.5 ? 'left' : 'right';
        } else if (!activeRocketsRef.current.left) {
          side = 'left';
        } else if (!activeRocketsRef.current.right) {
          side = 'right';
        } else {
          return;
        }

        activeRocketsRef.current[side] = true;

        const xPosition = side === 'left' 
          ? Math.random() * 20 + 5
          : Math.random() * 20 + 75;

        const rocket = {
          id: rocketId++,
          x: xPosition,
          side: side,
          colors: colors[Math.floor(Math.random() * colors.length)],
          explosionHeight: Math.random() * 40 + 20,
          explosionSize: Math.random() * 0.5 + 0.8
        };

        setRockets(prev => [...prev, rocket]);

        setTimeout(() => {
          setRockets(prev => prev.filter(r => r.id !== rocket.id));
          activeRocketsRef.current[side] = false;
        }, 6000);
      };

      const interval = AppThemeSettings.newYearTheme.rocketIntensity === "high" ? 2000 :
        AppThemeSettings.newYearTheme.rocketIntensity === "medium" ? 3000 : 4000;

      rocketIntervalRef.current = setInterval(() => {
        launchRocket();
      }, interval);

      return () => {
        if (rocketIntervalRef.current) {
          clearInterval(rocketIntervalRef.current);
        }
        activeRocketsRef.current = { left: false, right: false };
      };
    } else {
      setRockets([]);
      activeRocketsRef.current = { left: false, right: false };
    }
  }, [newYearEnabled]);

  useEffect(() => {
    if (backgroundRef.current) {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      rafId.current = requestAnimationFrame(() => {
        if (backgroundRef.current) {
          const color = winterEnabled 
            ? '200, 230, 255' 
            : newYearEnabled 
            ? '80, 80, 90' 
            : '139, 92, 246';
          backgroundRef.current.style.background = `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(${color}, 0.15), transparent 80%)`;
        }
      });
    }
    
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [mousePosition.x, mousePosition.y, winterEnabled, newYearEnabled]);

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

        @keyframes rocketLaunch {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          70% {
            transform: translateY(calc(-1 * var(--explosion-height))) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(calc(-1 * var(--explosion-height))) scale(0);
            opacity: 0;
          }
        }

        @keyframes rocketTrail {
          0% {
            height: 0;
            opacity: 0.9;
          }
          55% {
            height: 180px;
            opacity: 0.7;
          }
          100% {
            height: 180px;
            opacity: 0;
          }
        }

        @keyframes sparkLineLong {
          0% {
            height: 0;
            opacity: 1;
          }
          100% {
            height: 200px;
            opacity: 0;
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

      {newYearEnabled && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              background: 'linear-gradient(180deg, rgba(50, 50, 60, 0.3) 0%, rgba(30, 30, 40, 0.5) 100%)'
            }}
          />
        </div>
      )}

      {!winterEnabled && !newYearEnabled && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.05) 50%, transparent 100%)',
              animationName: 'gridPulse',
              animationDuration: '4s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite'
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
                animationName: 'gridMove',
                animationDuration: '3s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite'
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
                animationName: 'snowfall',
                animationDuration: `${particle.duration}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationDelay: `${particle.delay}s`,
                '--snow-drift': `${particle.drift}px`,
                '--snow-opacity': particle.opacity,
                filter: `blur(${particle.blur}px)`
              }}
            />
          ))}
        </div>
      )}

      {newYearEnabled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {rockets.map((rocket) => (
            <div
              key={rocket.id}
              className="absolute"
              style={{
                left: `${rocket.x}%`,
                bottom: '0',
                '--explosion-height': `${rocket.explosionHeight}vh`
              }}
            >
              <div
                className="relative"
                style={{
                  animationName: 'rocketLaunch',
                  animationDuration: '2.2s',
                  animationTimingFunction: 'ease-out',
                  animationFillMode: 'forwards'
                }}
              >
                <div className="relative" style={{ width: '16px' }}>
                  <div
                    className="w-0 h-0 mx-auto"
                    style={{
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderBottom: `12px solid ${rocket.colors[0]}`,
                      filter: `drop-shadow(0 0 8px ${rocket.colors[0]})`
                    }}
                  />
                  
                  <div
                    className="w-full h-12 relative"
                    style={{
                      background: `linear-gradient(to bottom, ${rocket.colors[0]}, ${rocket.colors[1]})`,
                      boxShadow: `
                        0 0 15px ${rocket.colors[0]},
                        inset 0 0 10px rgba(255,255,255,0.3),
                        inset -2px 0 8px rgba(0,0,0,0.3)
                      `,
                      borderRadius: '0 0 4px 4px'
                    }}
                  >
                    <div
                      className="absolute top-6 left-0 w-full h-1"
                      style={{
                        background: `linear-gradient(to right, transparent, ${rocket.colors[2]}, transparent)`,
                        boxShadow: `0 0 6px ${rocket.colors[2]}`
                      }}
                    />
                  </div>
                  
                  <div
                    className="absolute bottom-0 -left-2"
                    style={{
                      width: '0',
                      height: '0',
                      borderTop: '12px solid transparent',
                      borderBottom: `12px solid ${rocket.colors[1]}`,
                      borderRight: `8px solid ${rocket.colors[1]}`,
                      filter: `drop-shadow(0 0 6px ${rocket.colors[1]})`
                    }}
                  />
                  
                  <div
                    className="absolute bottom-0 -right-2"
                    style={{
                      width: '0',
                      height: '0',
                      borderTop: '12px solid transparent',
                      borderBottom: `12px solid ${rocket.colors[1]}`,
                      borderLeft: `8px solid ${rocket.colors[1]}`,
                      filter: `drop-shadow(0 0 6px ${rocket.colors[1]})`
                    }}
                  />
                </div>
              </div>

              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3"
                style={{
                  background: `linear-gradient(to top, ${rocket.colors[1]}, ${rocket.colors[2]}, transparent)`,
                  filter: 'blur(4px)',
                  animationName: 'rocketTrail',
                  animationDuration: '2.2s',
                  animationTimingFunction: 'ease-out',
                  animationFillMode: 'forwards',
                  boxShadow: `0 0 20px ${rocket.colors[1]}`
                }}
              />

              <div
                className="absolute left-1/2 transform -translate-x-1/2"
                style={{
                  bottom: `${rocket.explosionHeight}vh`
                }}
              >
                {[...Array(24)].map((_, i) => {
                  const duration = 0.8 + Math.random() * 0.6;
                  return (
                    <div
                      key={i}
                      className="absolute left-1/2 top-1/2 w-0.5 origin-bottom"
                      style={{
                        transform: `translate(-50%, -100%) rotate(${i * 15}deg)`,
                        transformOrigin: 'bottom center'
                      }}
                    >
                      <div
                        className="w-full h-0"
                        style={{
                          background: `linear-gradient(to top, ${rocket.colors[i % 3]}, transparent)`,
                          boxShadow: `0 0 8px ${rocket.colors[i % 3]}, 0 0 15px ${rocket.colors[i % 3]}`,
                          animationName: 'sparkLineLong',
                          animationDuration: `${duration}s`,
                          animationTimingFunction: 'ease-out',
                          animationFillMode: 'forwards',
                          animationDelay: '1.54s',
                          filter: 'blur(0.5px)'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}