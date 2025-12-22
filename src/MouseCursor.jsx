// MouseCursor.jsx 

import React, { useRef, useEffect } from 'react';

export default function MouseCursor({ mousePosition }) {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${mousePosition.x - 16}px, ${mousePosition.y - 16}px, 0) scale(1.2)`;
    }
  }, [mousePosition.x, mousePosition.y]);

  return (
    <div 
      ref={cursorRef}
      className="fixed w-8 h-8 pointer-events-none z-50 will-change-transform"
      style={{
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(236, 72, 153, 0.6) 50%, transparent 100%)',
        borderRadius: '50%',
        filter: 'blur(8px)',
      }}
    />
  );
}