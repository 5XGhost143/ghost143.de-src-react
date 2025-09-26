// MouseCursor.jsx

import React from 'react';

export default function MouseCursor({ mousePosition }) {
  return (
    <div 
      className="absolute w-8 h-8 pointer-events-none z-50 transition-all duration-100 ease-out"
      style={{
        left: mousePosition.x - 16,
        top: mousePosition.y - 16,
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(236, 72, 153, 0.6) 50%, transparent 100%)',
        borderRadius: '50%',
        filter: 'blur(8px)',
        transform: 'scale(1.2)',
      }}
    />
  );
}