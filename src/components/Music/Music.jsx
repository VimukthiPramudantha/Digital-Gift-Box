import React from 'react';

const Music = ({ onNext }) => {
  return (
    <div className="section-container">
      <div className="glass-card">
        <h2 className="glow-text" style={{ marginBottom: '1.5rem' }}>This made me think of you</h2>
        <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem' }}>
          <iframe 
            style={{ borderRadius: '12px' }} 
            src="https://open.spotify.com/embed/track/4uLU6hMCjZqZ3Y1JRolFiZ?utm_source=generator&theme=0" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowFullScreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
          </iframe>
        </div>
        <button className="btn-primary" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Music;
