import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import BackButton from '../Common/BackButton';
import backgroundImage from '../../assets/background/babe.jpeg';

const Letter = ({ onBack }) => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(bgRef.current, 
      { opacity: 0 },
      { opacity: 0.4, duration: 1.5, ease: 'power2.inOut' }
    );

    gsap.fromTo(
      containerRef.current.querySelectorAll('.animate-text'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.6, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="section-container" style={{ position: 'relative', overflow: 'hidden', width: '100vw', height: '100vh' }}>
      <div 
        ref={bgRef}
        className="section-bg"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      <div className="section-overlay"></div>

      <BackButton onClick={onBack} />
      
      <div ref={containerRef} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="glass-card" style={{ padding: '3.5rem 2.5rem', maxWidth: '600px', background: 'rgba(0, 0, 0, 0.65)' }}>
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
    </div>
  );
};

export default Letter;
