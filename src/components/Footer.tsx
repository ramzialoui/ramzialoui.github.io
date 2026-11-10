import { ArrowUp } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function Footer() {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="border-t border-white/10 bg-black/80 py-16 text-[#858585] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Monogram and Statement */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center font-display font-black text-sm text-[#C7FF41]">
            RA
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#F5F3EF]">
              DESIGNED WITH PURPOSE. BUILT WITH PASSION.
            </div>
            <div className="font-mono text-[11px] text-zinc-600 mt-0.5">
              &copy; 2026 RAMZI ALOUI · ALL RIGHTS RESERVED
            </div>
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          type="button"
          onMouseEnter={() => soundFx.playHover()}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10 hover:border-[#C7FF41]/40 hover:text-[#C7FF41] bg-white/[0.02] font-mono text-xs uppercase tracking-wider transition-all cursor-pointer group"
          aria-label="Back to top of page"
        >
          <span>BACK TO TOP</span>
          <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
