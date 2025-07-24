import React, { useState, useEffect } from 'react';
import './ThemeSwitcher.css';

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button
      className="theme-switcher"
      aria-label="Toggle light/dark mode"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default ThemeSwitcher;
