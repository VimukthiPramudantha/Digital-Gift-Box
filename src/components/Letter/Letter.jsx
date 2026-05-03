import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import BackButton from '../Common/BackButton';
import backgroundImage from '../../assets/background/babe.jpeg';

const Letter = ({ onBack }) => {
  const [subStep, setSubStep] = useState(0);
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  const sections = [
    {
      text: "I don’t even know what to call you sometimes… because “babe” clearly isn’t working 😂\n\nBut whatever I call you, I know one thing for sure, you’ve become someone I genuinely enjoy having in my life."
    },
    {
      text: "It’s kind of funny how this all started.\n\nI texted you, you ignored me, I unfollowed you… and then you came back at me like that.\n\nI don’t know why, but that moment stuck with me. Maybe because it was so real, so *you*.\n\nMost people try to impress, you didn’t, and I liked that more than anything."
    },
    {
      text: "Even though we haven’t met yet, talking to you feels easy.\n\nYou make me feel relaxed… happy in a way that’s simple but real.\n\nAnd your cuteness? Yeah, that definitely gets me every time."
    },
    {
      text: "You might not realize it, but the way you care, even in small ways, means a lot.\n\nIt’s rare to find someone who understands a little of what you’ve been through without needing a whole explanation.\n\nThat’s something I don’t take lightly."
    },
    {
      text: "I’m not here to rush anything or force something that isn’t ready yet.\n\nBut I’ll be honest… I like where this is going.\n\nAnd I’d love to keep getting to know you, step by step, naturally."
    },
    {
      text: "Maybe one day we’ll look back at how this started and laugh about it.\n\nFor now, I’m just glad it’s you I’m talking to.",
      final: "— Your favorite person (maybe?)"
    }
  ];

  useEffect(() => {
    gsap.fromTo(bgRef.current, 
      { opacity: 0 },
      { opacity: 0.4, duration: 1.5, ease: 'power2.inOut' }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, [subStep]);

  const handleNext = () => {
    if (subStep < sections.length - 1) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        onComplete: () => {
          setSubStep(subStep + 1);
        }
      });
    }
  };

  return (
    <div className="section-container" style={{ position: 'relative', overflow: 'hidden', width: '100vw', height: '100vh' }}>
      <div 
        ref={bgRef}
        className="section-bg"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      <div className="section-overlay"></div>

      <BackButton onClick={onBack} />
      
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div className="glass-card" style={{ padding: '3.5rem 2.5rem', maxWidth: '600px', background: 'rgba(0, 0, 0, 0.7)', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div ref={contentRef}>
            {sections[subStep].text.split('\n\n').map((paragraph, index) => (
              <p 
                key={index} 
                style={{ 
                  fontSize: '1.25rem', 
                  lineHeight: '1.7', 
                  marginBottom: '1.5rem', 
                  fontStyle: 'italic',
                  color: 'var(--text-main)'
                }}
              >
                {paragraph}
              </p>
            ))}
            
            {sections[subStep].final && (
              <p style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: '600', marginTop: '2rem' }}>
                {sections[subStep].final}
              </p>
            )}

            {subStep < sections.length - 1 && (
              <button 
                className="btn-primary" 
                onClick={handleNext}
                style={{ marginTop: '2rem', padding: '0.6rem 2rem', fontSize: '1rem' }}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem' }}>
          {sections.map((_, index) => (
            <div 
              key={index}
              style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: index === subStep ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Letter;
