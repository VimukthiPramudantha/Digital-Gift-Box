import React, { useEffect, useRef, useState } from 'react';
import BackButton from '../Common/BackButton';
import gsap from 'gsap';
import backgroundImage from '../../assets/background/songBK.jpg';

const Music = ({ onBack, audioInstance }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const lyricsRef = useRef(null);
  const lineRefs = useRef([]);
  const bgRef = useRef(null);

  const lrcText = `
[00:16.88] See, right now, I need you, I'll meet you somewhere now
[00:21.10] You up now? I see you, I get you, take care now
[00:25.45] Slow down, be cool, I miss you, come here now
[00:29.54] It's yours now, keep it, I'll hold on until now
[00:33.75] I need you right now, once I leave you, I'm strung out
[00:37.77] If I get you, I'm slowly breaking down
[00:41.97] And, oh, it's hard to see you, but I wish you were right here
[00:46.34] Oh, it's hard to leave you when I get you everywhere
[00:50.57] All this time I'm thinking we could never be a pair
[00:54.87] Oh, no, I don't need you, but I miss you, come here
[00:58.78] And, oh, it's hard to see you, but I wish you were right here
[01:03.23] Oh, it's hard to leave you when I get you everywhere
[01:07.43] All this time I'm thinking I'm strong enough to sink it
[01:11.59] Oh, no, I don't need you, but I miss you, come here
[01:15.56] He love me not, he loves me
[01:17.92] He holds me tight, then lets me go
[01:20.07] He love me not, he loves me
[01:22.12] He holds me tight, then lets me go
[01:24.66] Soon as you leave me, we always lose connection
[01:29.00] It's getting messy, I fiend for your affection
[01:33.77] Don't loosen your grip, got a hold on me
[01:37.13] Now, forever, let's get back together
[01:42.76] Lord, take it so far away
[01:46.46] I pray that, God, we don't break
[01:50.61] I want you to take me up and down
[01:54.99] And 'round and 'round again
[01:57.73] And, oh, it's hard to see you, but I wish you were right here
[02:02.12] Oh, it's hard to leave you when I get you everywhere
[02:06.37] All this time I'm thinking we could never be a pair
[02:10.62] Oh, no, I don't need you, but I miss you, come here
[02:14.53] And, oh, it's hard to see you, but I wish you were right here
[02:19.04] Oh, it's hard to leave you when I get you everywhere
[02:23.23] All this time I'm thinking I'm strong enough to sink it
[02:27.59] Oh, no, I don't need you, but I miss you, come here
[02:31.39] He love me not, he loves me
[02:33.79] He holds me tight, then lets me go
[02:35.86] He love me not, he loves me
[02:38.06] He holds me tight, then lets me go
[02:40.03] He love me not, he loves me
[02:42.14] He holds me tight, then lets me go
[02:44.24] He love me not, he loves me
[02:46.32] He holds me tight, then lets me go
[02:49.07] You gotta say that you're sorry at the end of the night
[02:53.78] Wake up in the morning, everything's alright
[02:57.70] At the end of the story, you're holding me tight
[03:02.24] I don't need to worry, am I out of my mind?
[03:05.20] And, oh, it's hard to see you, but I wish you were right here (I'm losing my mind)
[03:09.57] Oh, it's hard to leave you when I get you everywhere
[03:13.76] All this time I'm thinking I'm strong enough to sink it
[03:17.97] Oh, no, I don't need you, but I miss you, come here
  `;

  const parseLRC = (lrc) => {
    const lines = lrc.split('\n');
    const result = [];
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2})\]/;

    lines.forEach(line => {
      const match = timeRegex.exec(line);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const ms = parseInt(match[3]);
        const time = minutes * 60 + seconds + ms / 100;
        const text = line.replace(timeRegex, '').trim();
        if (text) result.push({ time, text });
      }
    });
    return result;
  };

  const parsedLyrics = parseLRC(lrcText);

  useEffect(() => {
    gsap.fromTo(bgRef.current, 
      { opacity: 0 },
      { opacity: 0.4, duration: 1.5, ease: 'power2.inOut' }
    );

    if (!audioInstance) return;

    const updateLyrics = () => {
      const currentTime = audioInstance.currentTime;
      const index = parsedLyrics.findIndex((lyric, i) => {
        return currentTime >= lyric.time && (!parsedLyrics[i + 1] || currentTime < parsedLyrics[i + 1].time);
      });

      if (index !== -1 && index !== currentLine) {
        setCurrentLine(index);
        
        if (lineRefs.current[index]) {
          lineRefs.current[index].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    };

    audioInstance.addEventListener('timeupdate', updateLyrics);
    return () => audioInstance.removeEventListener('timeupdate', updateLyrics);
  }, [audioInstance, parsedLyrics, currentLine]);

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
        <div className="glass-card" style={{ width: '90%', maxWidth: '700px', height: '70vh', display: 'flex', flexDirection: 'column', background: 'rgba(0, 0, 0, 0.65)' }}>
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
              padding: '2rem 1rem',
              textAlign: 'center',
              maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              scrollBehavior: 'smooth'
            }}
          >
            {parsedLyrics.map((line, index) => (
              <p 
                key={index} 
                ref={el => lineRefs.current[index] = el}
                style={{ 
                  margin: '2rem 0', 
                  fontSize: index === currentLine ? '1.5rem' : '1.1rem',
                  color: index === currentLine ? 'var(--primary)' : 'var(--text-muted)',
                  fontWeight: index === currentLine ? '700' : '400',
                  transition: 'all 0.4s ease',
                  opacity: index === currentLine ? 1 : 0.4,
                  textShadow: index === currentLine ? '0 0 10px var(--primary-glow)' : 'none',
                  transform: index === currentLine ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                {line.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
