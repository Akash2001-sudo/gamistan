import React, { useState } from 'react';
import './assets/global.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import About from './components/About';
import ContactForm from './components/ContactForm';
import SkipToContent from './components/SkipToContent';
import Seo from './components/Seo';
import Toast from './components/Toast';
import FlappyBird from './components/FlappyBird';
import GamesSection from './components/GamesSection';

function App() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [showGames, setShowGames] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

  React.useEffect(() => {
    setToast({ message: 'Welcome to the minimal app!', type: 'info' });
    const timer = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(timer);
  }, []);

  let mainContent;
  if (activeGame === 'flappy') {
    mainContent = <FlappyBird onExit={() => { setActiveGame(null); setShowGames(true); }} />;
  } else if (showGames) {
    mainContent = <GamesSection onSelectGame={(game) => setActiveGame(game)} />;
  } else {
    mainContent = (
      <>
        <Hero onGetStarted={() => setShowGames(true)} />
        <About />
        <ContactForm />
      </>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'none' }}>
      <Seo title="Gamistan" description="A modern, accessible, minimal React app." />
      <SkipToContent />
      <Header />
      <main id="main-content" style={{ flex: 1, background: 'none' }}>
        {mainContent}
      </main>
      <Footer />
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;
