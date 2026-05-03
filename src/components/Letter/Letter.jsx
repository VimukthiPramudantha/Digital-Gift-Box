import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Letter = ({ onNext }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current.querySelectorAll('.animate-text'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.5, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="section-container" ref={containerRef}>
      <div className="glass-card">
        <p className="animate-text" style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          "We just met... but I like talking to you more than I expected."
        </p>
        <p className="animate-text" style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
          So I made this little thing for you.
        </p>
        <button className="btn-primary animate-text" onClick={onNext}>
          See more
        </button>
      </div>
    </div>
  );
};

export default Letter;
