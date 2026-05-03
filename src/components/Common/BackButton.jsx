import React from 'react';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="btn-primary"
      style={{ 
        position: 'fixed', 
        top: '20px', 
        left: '20px', 
        padding: '0.6rem 1.2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.9rem',
        zIndex: 100
      }}
    >
      <ArrowLeft size={18} />
      Back
    </button>
  );
};

export default BackButton;
