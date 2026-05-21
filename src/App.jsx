import { useState, useCallback } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

function App() {
  const [loading, setLoading] = useState(true);

  // Called by Preloader when its exit animation finishes
  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen font-sans">

      {/* Preloader — unmounts after animation */}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main site — rendered underneath (becomes visible as preloader fades) */}
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <footer className="bg-[#080808] py-8 text-center text-gray-600 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} Edward Mendoza. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;