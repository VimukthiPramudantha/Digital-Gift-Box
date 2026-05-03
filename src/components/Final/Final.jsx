import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Final = () => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.to(textRef.current, {
      opacity: 1,
      duration: 3,
      ease: 'power1.inOut'
    });
  }, []);

  return (
    <div className="section-container">
      <div className="glass-card" style={{ padding: '4rem 2rem' }}>
        <h1 
          ref={textRef} 
          className="glow-text" 
          style={{ opacity: 0, fontSize: '3rem', fontStyle: 'italic' }}
        >
          "This is just the beginning..."
        </h1>
        <p style={{ marginTop: '2rem', color: 'var(--text-muted)' }}>
          Let's make more moments like this.
        </p>
      </div>
    </div>
  );
};

export default Final;
