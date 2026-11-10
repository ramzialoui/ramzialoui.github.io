import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { soundFx } from '../utils/sound';
import { formatTunisTime } from '../utils/portfolio';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [tunisTime, setTunisTime] = useState(formatTunisTime());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Update Tunis live clock every second
    const timeInterval = setInterval(() => {
      setTunisTime(formatTunisTime());
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
    };
  }, []);

  const toggleSound = () => {
    const nextState = !isAudioActive;
    setIsAudioActive(nextState);
    soundFx.setEnabled(nextState);
    if (nextState) {
      soundFx.playClick();
    }
  };

  const navLinks = [
    { label: 'Work', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/85 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 text-lg md:text-xl font-display font-black tracking-tighter text-[#F5F3EF] hover:text-[#C7FF41] transition-colors whitespace-nowrap shrink-0 group"
            onClick={() => soundFx.playClick()}
          >
            <span className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center font-mono text-sm text-[#C7FF41] group-hover:border-[#C7FF41]/40 transition-colors">
              RA
            </span>
            <span className="tracking-tight text-sm font-semibold hidden sm:inline">
              Ramzi Aloui
            </span>
          </a>

          {/* Zone 2: 4–5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#858585]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#F5F3EF] transition-colors relative py-1 whitespace-nowrap shrink-0 group"
                onClick={() => soundFx.playClick()}
                onMouseEnter={() => soundFx.playHover()}
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C7FF41] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + sound toggle + time indicator */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Subtle live clock indicator (desktop) */}
            <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-[#858585] border-r border-white/10 pr-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF41] animate-pulse" />
              <span>TUNIS {tunisTime}</span>
            </div>

            {/* Tactile Audio SFX toggle */}
            <button
              onClick={toggleSound}
              type="button"
              className={`p-2 rounded-lg border text-xs transition-all ${
                isAudioActive
                  ? 'border-[#C7FF41]/40 bg-[#C7FF41]/10 text-[#C7FF41]'
                  : 'border-white/10 bg-white/[0.02] text-[#858585] hover:text-[#F5F3EF]'
              }`}
              title={isAudioActive ? 'Mute micro-interaction audio' : 'Enable tactile micro-interaction audio'}
              aria-label={isAudioActive ? 'Mute sound' : 'Enable sound'}
            >
              {isAudioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Primary Action Button (Desktop & Tablet) */}
            <a
              href="#contact"
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="hidden sm:inline-flex px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-[#080808] bg-[#C7FF41] hover:bg-[#d5ff6a] rounded-lg transition-transform active:scale-95 duration-150 whitespace-nowrap shrink-0 shadow-[0_0_20px_rgba(199,255,65,0.25)]"
            >
              Let's Talk
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded-lg border border-white/10 text-[#F5F3EF] hover:border-white/30 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#080808]/95 backdrop-blur-2xl pt-28 px-8 flex flex-col justify-between pb-12 md:hidden">
          <nav className="flex flex-col gap-6 text-2xl font-display font-bold">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  soundFx.playClick();
                }}
                className="text-[#858585] hover:text-[#C7FF41] transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-zinc-600">0{navLinks.indexOf(link) + 1}</span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-6 border-t border-white/10 pt-6">
            <a
              href="#contact"
              onClick={() => {
                setMobileMenuOpen(false);
                soundFx.playClick();
              }}
              className="w-full py-4 text-center rounded-xl bg-[#C7FF41] text-[#080808] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(199,255,65,0.2)]"
            >
              Initiate Project / Let's Talk
            </a>

            <div className="flex flex-col gap-2 font-mono text-xs text-[#858585]">
              <div className="flex items-center justify-between">
                <span>LOCATION</span>
                <span className="text-[#F5F3EF]">Tunisia · Worldwide</span>
              </div>
              <div className="flex items-center justify-between">
                <span>LOCAL TIME</span>
                <span className="text-[#C7FF41]">{tunisTime} CET</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
