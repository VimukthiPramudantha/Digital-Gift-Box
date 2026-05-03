import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import BackButton from '../Common/BackButton';

const Letter = ({ onBack }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current.querySelectorAll('.animate-text'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.6, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="section-container" ref={containerRef}>
      <BackButton onClick={onBack} />
      <div className="glass-card" style={{ padding: '3rem 2.5rem', maxWidth: '600px' }}>
        <p className="animate-text" style={{ fontSize: '1.4rem', lineHeight: '1.8', marginBottom: '2rem', fontStyle: 'italic' }}>
          "We just met... but I like talking to you more than I expected."
        </p>
        <p className="animate-text" style={{ fontSize: '1.4rem', lineHeight: '1.8', marginBottom: '2rem', fontStyle: 'italic' }}>
          "You have this way of making everything feel easy. So I made this little thing just to show you I'm thinking of you."
        </p>
        <p className="animate-text" style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: '600', marginTop: '2rem' }}>
          — Your favorite person (maybe?)
        </p>
      </div>
    </div>
  );
};

export default Letter;
