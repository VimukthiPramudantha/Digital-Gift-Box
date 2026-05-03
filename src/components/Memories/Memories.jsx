import React from 'react';
import { Camera } from 'lucide-react';

const Memories = ({ onNext }) => {
  return (
    <div className="section-container">
      <div className="glass-card">
        <Camera size={48} style={{ color: 'var(--primary)', marginBottom: '1.5rem' }} />
        <h2 className="glow-text" style={{ marginBottom: '1rem' }}>A favorite moment</h2>
        <p style={{ fontStyle: 'italic', fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '2rem' }}>
          "My favorite moment so far: talking with you late at night. It feels effortless."
        </p>
        <button className="btn-primary" onClick={onNext}>
          Keep going
        </button>
      </div>
    </div>
  );
};

export default Memories;
