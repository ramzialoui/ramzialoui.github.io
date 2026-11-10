import { useState } from 'react';
import { PORTFOLIO_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { CheckCircle2, Terminal, Layers, Zap } from 'lucide-react';

export default function About() {
  const [activePrincipleIndex, setActivePrincipleIndex] = useState(0);

  const principleIcons = [Layers, Terminal, Zap];

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C7FF41] mb-2">
              <span>01</span>
              <span>·</span>
              <span>ABOUT THE DEVELOPER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-[#F5F3EF]">
              {PORTFOLIO_INFO.aboutHeadline}
            </h2>
          </div>
          <p className="font-mono text-xs text-[#858585] max-w-xs">
            COMBINING RIGOROUS ENGINEERING WITH REFINED ARTISTIC INTUITION.
          </p>
        </div>

        {/* Editorial Layout: Left Photo + Right Narrative & Interactive Principles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait & Credibility Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 group bg-zinc-900/60 aspect-square sm:aspect-[4/5]">
              <img
                src={PORTFOLIO_INFO.portraitImage}
                alt="Ramzi Aloui - Web & Mobile Developer"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />

              {/* Monogram tag */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-zinc-300">
                RAMZI ALOUI <span className="text-[#C7FF41]">/ ARCHIVE</span>
              </div>

              {/* Bottom bio info banner */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-[#858585]">DISCIPLINE</span>
                  <span className="text-[#C7FF41]">FULL-STACK &amp; MOBILE</span>
                </div>
                <div className="text-sm font-semibold text-[#F5F3EF]">
                  Interactive Experiences &amp; Scalable Architecture
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative + Interactive Three Principles */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-normal leading-relaxed mb-10 text-pretty">
              {PORTFOLIO_INFO.aboutContent}
            </p>

            <div className="border-t border-white/10 pt-8 mb-8">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#858585] mb-6">
                PROFESSIONAL APPROACH · THREE CORE PRINCIPLES
              </h3>

              <div className="flex flex-col gap-4">
                {PORTFOLIO_INFO.principles.map((principle, idx) => {
                  const Icon = principleIcons[idx] || CheckCircle2;
                  const isActive = activePrincipleIndex === idx;

                  return (
                    <button
                      key={principle.title}
                      type="button"
                      onClick={() => {
                        setActivePrincipleIndex(idx);
                        soundFx.playClick();
                      }}
                      onMouseEnter={() => soundFx.playHover()}
                      className={`text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-white/[0.04] border-[#C7FF41]/40 shadow-[0_0_20px_rgba(199,255,65,0.06)]'
                          : 'bg-transparent border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                              isActive
                                ? 'bg-[#C7FF41] text-[#080808]'
                                : 'bg-white/5 text-zinc-400'
                            }`}
                          >
                            0{idx + 1}
                          </span>
                          <span
                            className={`text-lg md:text-xl font-display font-bold transition-colors ${
                              isActive ? 'text-[#C7FF41]' : 'text-[#F5F3EF]'
                            }`}
                          >
                            {principle.title}
                          </span>
                        </div>
                        <Icon
                          size={18}
                          className={`mt-1 transition-colors ${
                            isActive ? 'text-[#C7FF41]' : 'text-zinc-600'
                          }`}
                        />
                      </div>

                      {isActive && (
                        <p className="mt-3 pl-10 text-sm text-[#858585] leading-relaxed transition-opacity duration-300 animate-fadeIn">
                          {principle.desc}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick stats / summary metric strip */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
              <div>
                <div className="text-2xl sm:text-3xl font-display font-black text-[#F5F3EF] tabular-nums">
                  100<span className="text-[#C7FF41]">%</span>
                </div>
                <div className="text-xs font-mono text-[#858585] uppercase">Type Safety</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-black text-[#F5F3EF] tabular-nums">
                  60<span className="text-[#C7FF41]">FPS</span>
                </div>
                <div className="text-xs font-mono text-[#858585] uppercase">Fluid Motion</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-black text-[#F5F3EF] tabular-nums">
                  &lt;50<span className="text-[#C7FF41]">ms</span>
                </div>
                <div className="text-xs font-mono text-[#858585] uppercase">Input Latency</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
