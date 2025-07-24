import React, { useState } from 'react';
import './assets/global.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import About from './components/About';
import ContactForm from './components/ContactForm';
import ResourceList from './components/ResourceList';
import SkipToContent from './components/SkipToContent';
import Seo from './components/Seo';
import Toast from './components/Toast';
import FlappyBird from './components/FlappyBird';

function App() {
  const [flappyBirdActive, setFlappyBirdActive] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

  React.useEffect(() => {
    setToast({ message: 'Welcome to the minimal app!', type: 'info' });
    const timer = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'none' }}>
      <Seo title="Gamistan" description="A modern, accessible, minimal React app." />
      <SkipToContent />
      <Header />
      <main id="main-content" style={{ flex: 1, background: 'none' }}>
        {flappyBirdActive ? (
          <FlappyBird onExit={() => setFlappyBirdActive(false)} />
        ) : (
          <>
            <Hero onGetStarted={() => setFlappyBirdActive(true)} />
            <About />
            <ResourceList />
            <ContactForm />
          </>
        )}
      </main>
      <Footer />
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;
