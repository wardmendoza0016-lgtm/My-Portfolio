import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

function App() {
  return (
    <div className="bg-slate-900 min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
	      <Projects />
        <Skills />
        <Contact />
      </main>
      
      {/* Simple Footer */}
      <footer className="bg-slate-950 py-8 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Edward Mendoza. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;