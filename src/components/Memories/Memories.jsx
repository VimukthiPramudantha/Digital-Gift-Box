import React, { useEffect, useRef } from 'react';
import BackButton from '../Common/BackButton';
import { Camera, Heart } from 'lucide-react';
import gsap from 'gsap';

const Memories = ({ onBack }) => {
  const containerRef = useRef(null);
  
  const reasons = [
    "You're easy to talk to",
    "You make normal conversations fun",
    "I like your vibe",
    "Your laugh is contagious"
  ];

  useEffect(() => {
    gsap.fromTo(
      containerRef.current.querySelectorAll('.animate-item'),
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'back.out(1.2)' }
    );
  }, []);

  return (
    <div className="section-container" ref={containerRef} style={{ maxWidth: '900px' }}>
      <BackButton onClick={onBack} />
      
      <div className="animate-item glass-card" style={{ marginBottom: '3rem', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <Camera size={32} color="var(--primary)" />
          <h2 className="glow-text">A Favorite Moment</h2>
        </div>
        <p style={{ fontStyle: 'italic', fontSize: '1.4rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
          "My favorite moment so far: talking with you late at night. Everything else just fades away."
        </p>
      </div>

      <h2 className="animate-item glow-text" style={{ marginBottom: '2rem' }}>Reasons I Like You</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', width: '100%' }}>
        {reasons.map((reason, index) => (
          <div 
            key={index}
            className="animate-item glass-card" 
            style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
          >
            <Heart size={24} fill="var(--primary)" color="var(--primary)" />
            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>{reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memories;
