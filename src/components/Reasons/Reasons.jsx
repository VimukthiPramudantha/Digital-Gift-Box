import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Heart } from 'lucide-react';

const Reasons = ({ onNext }) => {
  const reasons = [
    "You're easy to talk to",
    "You make normal conversations fun",
    "I like your vibe",
    "Your laugh is contagious"
  ];

  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.7)' }
    );
  }, []);

  return (
    <div className="section-container">
      <h2 className="glow-text" style={{ marginBottom: '2rem' }}>A few reasons...</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
        {reasons.map((reason, index) => (
          <div 
            key={index}
            ref={el => cardsRef.current[index] = el}
            className="glass-card" 
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <Heart size={20} fill="var(--primary)" color="var(--primary)" style={{ marginBottom: '0.5rem' }} />
            <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>{reason}</p>
          </div>
        ))}
      </div>
      <button className="btn-primary" onClick={onNext}>
        Almost there...
      </button>
    </div>
  );
};

export default Reasons;
