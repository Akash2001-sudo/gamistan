import React, { useEffect, useState } from 'react';
import './Hero.css';

const GAMISTAN_COLORS = [
  '#FF5E5B', // G
  '#FFAA5E', // a
  '#FFD65E', // m
  '#8AFF5E', // i
  '#5EFFB0', // s
  '#5ECFFF', // t
  '#5E7CFF', // a
  '#B05EFF', // n
];

const GamistanAnimated: React.FC = () => {
  const word = 'Gamistan';
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount((c) => (c < word.length ? c + 1 : 0));
    }, 220);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="gamistan-animated" style={{ fontStyle: 'italic', fontWeight: 700, fontSize: '2.2rem', letterSpacing: '1px', fontFamily: 'inherit' }}>
      {word.split('').map((char, i) => (
        <span key={i} style={{ color: GAMISTAN_COLORS[i % GAMISTAN_COLORS.length], opacity: i < visibleCount ? 1 : 0, transition: 'opacity 0.2s' }}>{char}</span>
      ))}
    </span>
  );
};

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => (
  <section className="hero">
    <div className="hero-content">
      <h1>Welcome to <GamistanAnimated /></h1>
      <p>Your modern, beautiful, and accessible React app starter.</p>
      <button className="hero-btn" onClick={onGetStarted} aria-label="Get Started with Flappy Bird Game">
        Get Started
      </button>
    </div>
  </section>
);

export default Hero;
