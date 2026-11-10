import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Check if ?autostart=1 is present
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autostart') === '1') {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFading(true), 150);
          setTimeout(() => onComplete(), 700);
          return 100;
        }
        const increment = Math.floor(Math.random() * 14) + 6;
        return Math.min(100, prev + increment);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-14 bg-[#080808] text-[#F5F3EF] transition-all duration-700 ease-in-out ${
        isFading ? 'opacity-0 pointer-events-none translate-y-[-10px]' : 'opacity-100'
      }`}
      aria-label="Loading portfolio experience"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs tracking-widest uppercase text-[#858585]">
        <span className="font-mono text-zinc-400">RAMZI ALOUI · PORTFOLIO</span>
        <span className="font-mono text-[#C7FF41]">2026 EDITION</span>
      </div>

      {/* Central Emblem & Typography */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="relative flex items-center justify-center w-28 h-28 md:w-36 md:h-36 mb-6">
          {/* Subtle rotating circular border */}
          <div className="absolute inset-0 rounded-full border border-zinc-800 animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-1 rounded-full border border-dashed border-[#C7FF41]/20 animate-[spin_15s_linear_infinite_reverse]" />
          <span className="text-4xl md:text-5xl font-black font-display tracking-tighter text-[#F5F3EF] select-none">
            R<span className="text-[#C7FF41]">A</span>
          </span>
        </div>

        <p className="text-xs md:text-sm font-mono tracking-widest uppercase text-[#858585] mb-2">
          CREATIVE WEB &amp; MOBILE DEVELOPER
        </p>
        <p className="text-[11px] font-mono text-zinc-600">
          DESIGN MINDED · CODE DRIVEN
        </p>
      </div>

      {/* Bottom Progress Bar & Percentage */}
      <div className="w-full max-w-xl mx-auto">
        <div className="flex justify-between items-baseline mb-2 font-mono text-xs text-[#858585]">
          <span>INITIALIZING INTERACTIVE SPACE</span>
          <span className="text-[#C7FF41] tabular-nums font-semibold">{progress}%</span>
        </div>
        <div className="w-full h-[2px] bg-zinc-900 overflow-hidden rounded-full">
          <div
            className="h-full bg-[#C7FF41] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
