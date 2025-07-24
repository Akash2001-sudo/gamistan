import React from 'react';
import './Footer.css';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-content">
      <span>© {new Date().getFullYear()} MyApp. All rights reserved.</span>
      <div className="footer-links">
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a>
        <a href="mailto:contact@myapp.com" aria-label="Email">Contact</a>
      </div>
    </div>
  </footer>
);

export default Footer;
