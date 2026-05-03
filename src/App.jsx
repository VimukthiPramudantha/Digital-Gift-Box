import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import GiftBox from './components/GiftBox/GiftBox';
import Letter from './components/Letter/Letter';
import Music from './components/Music/Music';
import Memories from './components/Memories/Memories';
import Loading from './components/Common/Loading';

import fromTheStart from './assets/Songs/Laufey - From The Start.mp3';
import loveMeNot from './assets/Songs/Ravyn Lenae - Love Me Not.mp3';

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('gift');
  const containerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playAudio = (src, targetVolume = 0.2) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0;
    audioRef.current.play()
      .then(() => {
        gsap.to(audioRef.current, { volume: targetVolume, duration: 2, ease: 'power1.inOut' });
      })
      .catch(e => console.log("Audio play blocked by browser", e));
  };

  const stopAudio = () => {
    if (audioRef.current) {
      const currentAudio = audioRef.current;
      gsap.to(currentAudio, { 
        volume: 0, 
        duration: 1, 
        onComplete: () => {
          currentAudio.pause();
          if (audioRef.current === currentAudio) {
            audioRef.current = null;
          }
        } 
      });
    }
  };

  const navigateTo = (newView) => {
    setIsLoading(true);
    
    // Switch view after a small delay while loading is visible
    setTimeout(() => {
      setView(newView);
      
      if (newView === 'letter') {
        playAudio(fromTheStart, 0.15);
      } else if (newView === 'music') {
        playAudio(loveMeNot, 0.4);
      } else {
        stopAudio();
      }

      // Hide loader after a bit more time to feel natural
      setTimeout(() => {
        setIsLoading(false);
        gsap.fromTo(containerRef.current, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 }
        );
      }, 1500);
    }, 500);
  };

  return (
    <div className="app-container">
      {isLoading && <Loading />}
      
      <div className="decor-circle" style={{ top: '10%', left: '5%', width: '150px', height: '150px', background: 'var(--primary)', opacity: 0.1 }}></div>
      <div className="decor-circle" style={{ bottom: '15%', right: '10%', width: '250px', height: '250px', background: 'var(--secondary)', opacity: 0.08 }}></div>
      <div className="decor-circle" style={{ top: '40%', right: '20%', width: '100px', height: '100px', background: 'var(--primary)', opacity: 0.05 }}></div>
      
      <main ref={containerRef} style={{ opacity: isLoading ? 0 : 1 }}>
        {view === 'gift' && <GiftBox onSelect={(id) => navigateTo(id)} />}
        {view === 'letter' && <Letter onBack={() => navigateTo('gift')} />}
        {view === 'music' && <Music onBack={() => navigateTo('gift')} audioInstance={audioRef.current} />}
        {view === 'memories' && <Memories onBack={() => navigateTo('gift')} />}
      </main>

      <footer style={{ position: 'fixed', bottom: '20px', fontSize: '0.8rem', color: 'var(--text-muted)', opacity: 0.5, zIndex: 10 }}>
        Made with ❤️ for you
      </footer>
    </div>
  );
}

export default App;
