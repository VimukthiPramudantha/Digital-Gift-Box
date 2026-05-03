import React, { useState, useRef, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Mail, Music, Heart } from 'lucide-react';
import gsap from 'gsap';

const GiftBox = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dashboardRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        dashboardRef.current.querySelectorAll('.panel-card'),
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  const panels = [
    { id: 'letter', title: 'The Letter', icon: <Mail size={32} />, color: '#ff85a1', desc: 'A small message for you' },
    { id: 'music', title: 'Our Song', icon: <Music size={32} />, color: '#a78bfa', desc: 'Something to listen to' },
    { id: 'memories', title: 'Memories', icon: <Heart size={32} />, color: '#ffbdad', desc: 'Reasons why I like you' }
  ];

  if (isOpen) {
    return (
      <div className="section-container" ref={dashboardRef}>
        <h1 className="glow-text" style={{ marginBottom: '3rem', fontSize: '2.5rem' }}>Select a Present</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%', maxWidth: '900px' }}>
          {panels.map((panel) => (
            <div 
              key={panel.id}
              className="glass-card panel-card"
              style={{ 
                cursor: 'pointer', 
                transition: 'transform 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                padding: '3rem 2rem'
              }}
              onClick={() => onSelect(panel.id)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ color: panel.color, marginBottom: '1rem' }}>{panel.icon}</div>
              <h2 style={{ fontSize: '1.8rem' }}>{panel.title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{panel.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="section-container">
      <div className="float-anim" style={{ width: '300px', height: '300px', margin: '0 auto' }}>
        <DotLottieReact
          src="https://lottie.host/5ad057a1-c90a-471a-8c90-0f8174548450/q0nS614Z16.lottie"
          loop
          autoplay
        />
      </div>
      <div className="glass-card" style={{ marginTop: '2rem' }}>
        <h1 className="glow-text" style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>For You...</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          I made something small for you. I hope it makes you smile.
        </p>
        <button className="btn-primary" onClick={handleOpen}>
          Open it
        </button>
      </div>
    </div>
  );
};

export default GiftBox;
