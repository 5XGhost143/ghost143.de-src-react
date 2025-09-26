// AnimatedBackground.jsx

import React, { useState, useEffect } from 'react';

export default function AnimatedBackground({ mousePosition }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      return [...Array(30)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
        direction: Math.random() > 0.5 ? 1 : -1
      }));
    };
    
    setStars(generateStars());
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes floatStar {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.2;
          }
          25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(0px) translateX(-15px) rotate(180deg);
            opacity: 0.4;
          }
          75% { 
            transform: translateY(15px) translateX(5px) rotate(270deg);
            opacity: 0.6;
          }
        }
      `}</style>

      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`
        }}
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
            className="absolute bg-white rounded-full opacity-40"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `floatStar ${star.duration}s infinite ease-in-out`,
              animationDelay: `${star.delay}s`,
              '--float-direction': star.direction
            }}
          />
        ))}
      </div>
    </>
  );
}