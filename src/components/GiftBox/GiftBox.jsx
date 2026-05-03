import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const GiftBox = ({ onOpen }) => {
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
        <h1 className="glow-text" style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>
          For You...
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          I made something small for you. I hope it makes you smile.
        </p>
        <button className="btn-primary" onClick={onOpen}>
          Open it
        </button>
      </div>
    </div>
  );
};

export default GiftBox;
