import React, { useEffect, useRef } from 'react';
import BackButton from '../Common/BackButton';
import gsap from 'gsap';

const Music = ({ onBack }) => {
  const lyricsRef = useRef(null);
  
  const lyrics = [
    "See, right now, I need you, I'll meet you somewhere now",
    "You up now, I see you, I get you, take care now",
    "Slow down, be cool, I miss you, come here now",
    "It's yours now, keep it, I'll hold out until now",
    "I need you right now, once I leave you I'm strung out",
    "If I get you, I'm slowly breaking down",
    "",
    "[Chorus]",
    "And, oh, it's hard to see you, but I wish you were right here",
    "Oh, it's hard to leave you when I get you everywhere",
    "All this time I'm thinking we could never be a pair",
    "Oh, no, I don't need you, but I miss you, come here",
    "And, oh, it's hard to see you, but I wish you were right here",
    "Oh, it's hard to leave you when I get you everywhere",
    "All this time I'm thinking I'm strong enough to sink it",
    "Oh, no, I don't need you, but I miss you",
    "",
    "[Bridge]",
    "He loves me, he loves me, he holds me tight then lets me go",
    "He loves me, he loves me, he holds me tight then lets me go",
    "He loves me, he loves me, he holds me tight then lets me go",
    "He love me not, he loves me, he holds me tight then lets me go",
    "",
    "Soon as you leave me we always lose connection",
    "It's getting messy, I feel your affection",
    "Don't loosen your grip, got a hold on me now",
    "Forever let's get back together, Lord, take it",
    "So far away, I don't wait",
    "I want you to take me up and down around again",
    "And it's hard to say, but I wish you were here",
    "Oh, it's hard to leave you when I get you everywhere",
    "",
    "[Outro]",
    "You got to say that you're sorry at the end of the night",
    "Wake up in the morning, everything's all right",
    "At the end of the story, you're holding me tight"
  ];

  useEffect(() => {
    const lines = lyricsRef.current.querySelectorAll('.lyric-line');
    gsap.fromTo(lines, 
      { opacity: 0.2, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power2.out' }
    );

    // Subtle scroll animation for lyrics
    gsap.to(lyricsRef.current, {
      scrollTop: lyricsRef.current.scrollHeight - lyricsRef.current.clientHeight,
      duration: 40,
      ease: 'none',
      delay: 5
    });
  }, []);

  return (
    <div className="section-container">
      <BackButton onClick={onBack} />
      <div className="glass-card" style={{ width: '100%', maxWidth: '700px', height: '80vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="glow-text" style={{ fontSize: '2rem' }}>Love Me Not</h2>
          <p style={{ color: 'var(--primary)' }}>Ravyn Lenae</p>
        </div>
        
        <div 
          ref={lyricsRef}
          className="lyrics-container"
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '1rem',
            textAlign: 'center',
            maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
          }}
        >
          {lyrics.map((line, index) => (
            <p 
              key={index} 
              className="lyric-line"
              style={{ 
                margin: '1.5rem 0', 
                fontSize: line.startsWith('[') ? '0.9rem' : '1.2rem',
                color: line.startsWith('[') ? 'var(--text-muted)' : 'var(--text-main)',
                fontWeight: line.startsWith('[') ? '400' : '500',
                opacity: 0.8
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Music;
