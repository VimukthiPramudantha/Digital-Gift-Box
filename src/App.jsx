import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import GiftBox from './components/GiftBox/GiftBox';
import Letter from './components/Letter/Letter';
import Music from './components/Music/Music';
import Memories from './components/Memories/Memories';
import Reasons from './components/Reasons/Reasons';
import Final from './components/Final/Final';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const containerRef = useRef(null);

  const nextStep = () => {
    const tl = gsap.timeline();
    tl.to(containerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      onComplete: () => {
        setStep((prev) => prev + 1);
        gsap.fromTo(containerRef.current, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 }
        );
      }
    });
  };

  return (
    <div className="app-container">
      {/* Decorative floating elements */}
      <div className="decor-circle" style={{ top: '10%', left: '5%', width: '100px', height: '100px', background: 'var(--primary)', opacity: 0.1 }}></div>
      <div className="decor-circle" style={{ bottom: '15%', right: '10%', width: '150px', height: '150px', background: 'var(--secondary)', opacity: 0.1 }}></div>
      
      <main ref={containerRef}>
        {step === 1 && <GiftBox onOpen={nextStep} />}
        {step === 2 && <Letter onNext={nextStep} />}
        {step === 3 && <Music onNext={nextStep} />}
        {step === 4 && <Memories onNext={nextStep} />}
        {step === 5 && <Reasons onNext={nextStep} />}
        {step === 6 && <Final />}
      </main>

      <footer style={{ position: 'fixed', bottom: '20px', fontSize: '0.8rem', color: 'var(--text-muted)', opacity: 0.5 }}>
        Made with ❤️ for you
      </footer>
    </div>
  );
}

export default App;
