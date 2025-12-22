// AnimatedBackground.jsx

import React, { useState, useEffect, useMemo, useRef } from 'react';

export default function AnimatedBackground({ mousePosition }) {
  const [stars, setStars] = useState([]);
  const backgroundRef = useRef(null);
  const rafId = useRef(null);
  
  // Test Snow
  const testSnowMonth = false;

  // JSON
  const monthlyColors = {
    1: { name: "January", colorName: "Ice Blue", hex: "#A3D2F2" },
    2: { name: "February", colorName: "Lavender", hex: "#C3B1E1" },
    3: { name: "March", colorName: "Spring Green", hex: "#A8E6A1" },
    4: { name: "April", colorName: "Daffodil Yellow", hex: "#F7E35D" },
    5: { name: "May", colorName: "Blossom Pink", hex: "#F7C1D9" },
    6: { name: "June", colorName: "Sunny Yellow", hex: "#FFD54F" },
    7: { name: "July", colorName: "Sky Blue", hex: "#4FC3F7" },
    8: { name: "August", colorName: "Golden Orange", hex: "#FFB74D" },
    9: { name: "September", colorName: "Wine Red", hex: "#B44C43" },
    10: { name: "October", colorName: "Pumpkin Orange", hex: "#FF7043" },
    11: { name: "November", colorName: "Foggy Grey", hex: "#B0BEC5" },
    12: { name: "December", colorName: "Pine Green", hex: "#388E3C" }
  };

  const getCurrentMonthColor = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentMonthData = monthlyColors[currentMonth];
    console.log(`Current Month: ${currentMonthData.name}`);
    return currentMonthData.hex;
  };

  const generateStars = useMemo(() => {
    const currentColor = getCurrentMonthColor();
    const currentMonth = new Date().getMonth() + 1;
    const isSnowMonth = testSnowMonth || currentMonth === 1 || currentMonth === 12;
    
    return [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: isSnowMonth ? Math.random() * 20 - 10 : Math.random() * 100,
      size: Math.random() * 5 + 3,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      direction: Math.random() > 0.5 ? 1 : -1,
      color: isSnowMonth ? '#FFFFFF' : currentColor,
      isSnow: isSnowMonth
    }));
  }, [testSnowMonth]);

  useEffect(() => {
    // Clear existing stars
    setStars([]);
    
    const timeout = setTimeout(() => {
      const currentColor = getCurrentMonthColor();
      const currentMonth = new Date().getMonth() + 1;
      const isSnowMonth = testSnowMonth || currentMonth === 1 || currentMonth === 12;
      
      const newStars = [...Array(30)].map((_, i) => ({
        id: i + Date.now(),
        x: Math.random() * 100,
        y: isSnowMonth ? Math.random() * 20 - 20 : Math.random() * 100,
        size: Math.random() * 5 + 3,
        duration: Math.random() * 10 + 10,
        delay: isSnowMonth ? Math.random() * 8 : Math.random() * 15,
        direction: Math.random() > 0.5 ? 1 : -1,
        color: isSnowMonth ? '#FFFFFF' : currentColor,
        isSnow: isSnowMonth
      }));
      
      setStars(newStars);
    }, 250);
    
    return () => clearTimeout(timeout);
  }, [testSnowMonth]);

  useEffect(() => {
    if (backgroundRef.current) {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      rafId.current = requestAnimationFrame(() => {
        if (backgroundRef.current) {
          backgroundRef.current.style.background = `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`;
        }
      });
    }
    
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      <style>{`
        @keyframes floatStar {
          0% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0; /* Starte unsichtbar */
          }
          10% { 
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg);
            opacity: 0.9;
          }
          50% { 
            transform: translateY(0px) translateX(-15px) rotate(180deg);
            opacity: 0.5;
          }
          75% { 
            transform: translateY(15px) translateX(5px) rotate(270deg);
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
            transform: translateY(-20vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          5% { 
            opacity: 0.8;
          }
          25% { 
            transform: translateY(30vh) translateX(-10px) rotate(90deg);
            opacity: 1;
          }
          50% { 
            transform: translateY(60vh) translateX(15px) rotate(180deg);
            opacity: 0.9;
          }
          75% { 
            transform: translateY(90vh) translateX(-5px) rotate(270deg);
            opacity: 0.7;
          }
          95% { 
            opacity: 0.2;
          }
          100% { 
            transform: translateY(120vh) translateX(0px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      <div 
        ref={backgroundRef}
        className="absolute inset-0 opacity-10 will-change-auto"
      />
      
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
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full will-change-transform"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: star.isSnow 
                ? `0 0 ${star.size * 3}px rgba(255,255,255,0.6), 0 0 ${star.size * 6}px rgba(255,255,255,0.3)`
                : `0 0 ${star.size * 2}px ${star.color}40`,
              animation: star.isSnow 
                ? `snowfall ${star.duration}s infinite linear`
                : `floatStar ${star.duration}s infinite ease-in-out`,
              animationDelay: `${star.delay}s`,
              '--float-direction': star.direction
            }}
          />
        ))}
      </div>
    </>
  );
}