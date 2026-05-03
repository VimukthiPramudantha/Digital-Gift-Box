import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import GiftBox from './components/GiftBox/GiftBox';
import Letter from './components/Letter/Letter';
import Music from './components/Music/Music';
import Memories from './components/Memories/Memories';

// Audio imports
import fromTheStart from './assets/Songs/Laufey - From The Start.mp3';
import loveMeNot from './assets/Songs/Ravyn Lenae - Love Me Not.mp3';

import './App.css';

function App() {
  const [view, setView] = useState('gift'); // gift, letter, music, memories
  const containerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playAudio = (src) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.play().catch(e => console.log("Audio play blocked by browser", e));
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  const navigateTo = (newView) => {
    const tl = gsap.timeline();
    tl.to(containerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      onComplete: () => {
        setView(newView);
        
        // Handle audio logic
        if (newView === 'letter') {
          playAudio(fromTheStart);
        } else if (newView === 'music') {
          playAudio(loveMeNot);
        } else {
          stopAudio();
        }

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
      <div className="decor-circle" style={{ top: '10%', left: '5%', width: '150px', height: '150px', background: 'var(--primary)', opacity: 0.1 }}></div>
      <div className="decor-circle" style={{ bottom: '15%', right: '10%', width: '250px', height: '250px', background: 'var(--secondary)', opacity: 0.08 }}></div>
      <div className="decor-circle" style={{ top: '40%', right: '20%', width: '100px', height: '100px', background: 'var(--primary)', opacity: 0.05 }}></div>
      
      <main ref={containerRef}>
        {view === 'gift' && <GiftBox onSelect={(id) => navigateTo(id)} />}
        {view === 'letter' && <Letter onBack={() => navigateTo('gift')} />}
        {view === 'music' && <Music onBack={() => navigateTo('gift')} />}
        {view === 'memories' && <Memories onBack={() => navigateTo('gift')} />}
      </main>

      <footer style={{ position: 'fixed', bottom: '20px', fontSize: '0.8rem', color: 'var(--text-muted)', opacity: 0.5, zIndex: 10 }}>
        Made with ❤️ for you
      </footer>
    </div>
  );
}

export default App;
