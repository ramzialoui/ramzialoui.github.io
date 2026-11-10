import { useState } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#080808] text-[#F5F3EF] selection:bg-[#C7FF41] selection:text-[#080808] overflow-x-hidden">
      {/* Cinematic Custom Cursor (desktop only) */}
      <CustomCursor />

      {/* RA Monogram Editorial Preloader */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Main Experience Layout */}
      <div
        className={`transition-opacity duration-700 ${
          preloaderDone ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Navbar />

        <main id="main-content">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Process />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}
