import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import gsap from 'gsap';

const HeartBackground = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const newHeart = {
        id,
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        size: Math.random() * 20 + 10,
        duration: Math.random() * 2 + 1
      };

      setHearts(prev => [...prev, newHeart]);

      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== id));
      }, 3000);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {hearts.map(heart => (
        <HeartItem key={heart.id} heart={heart} />
      ))}
    </div>
  );
};

const HeartItem = ({ heart }) => {
  const heartRef = React.useRef(null);

  useEffect(() => {
    gsap.fromTo(heartRef.current,
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 0.6, 
        duration: 0.5, 
        ease: 'back.out(2)',
        onComplete: () => {
          gsap.to(heartRef.current, {
            y: -50,
            opacity: 0,
            duration: 1.5,
            ease: 'power1.in'
          });
        }
      }
    );
  }, []);

  return (
    <div 
      ref={heartRef}
      style={{ 
        position: 'absolute', 
        left: heart.left, 
        top: heart.top,
        color: 'var(--primary)',
      }}
    >
      <Heart size={heart.size} fill="var(--primary)" />
    </div>
  );
};

export default HeartBackground;
