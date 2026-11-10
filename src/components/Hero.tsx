import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import { PORTFOLIO_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/sound';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 md:pt-40 pb-12 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C7FF41]/[0.035] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* Left column: Typographic hierarchy */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Location & Availability Badge */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-[#858585] mb-6 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C7FF41] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C7FF41]" />
            </span>
            <span className="text-zinc-300">{PORTFOLIO_INFO.location}</span>
            <span className="text-zinc-600">·</span>
            <span className="text-[#C7FF41] font-semibold">Q1/Q2 2026 Open</span>
          </div>

          {/* Oversized Editorial Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-[#F5F3EF] leading-[0.92] mb-6 text-balance">
            CRAFTING
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F3EF] via-[#F5F3EF] to-[#858585]">
              DIGITAL
            </span>
            <br />
            <span className="text-[#C7FF41] relative inline-block">
              EXPERIENCES.
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#C7FF41]/40 rounded-full" />
            </span>
          </h1>

          {/* Distinctive Statement Pill / Lead Kicker */}
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={14} className="text-[#C7FF41]" />
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-[#C7FF41] font-semibold">
              {PORTFOLIO_INFO.distinctiveStatement}
            </span>
          </div>

          {/* Supporting Lead Text */}
          <p className="text-base sm:text-lg md:text-xl text-[#858585] max-w-xl leading-relaxed mb-8">
            {PORTFOLIO_INFO.subtagline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="px-6 py-3.5 rounded-lg bg-[#F5F3EF] text-[#080808] font-semibold text-sm hover:bg-[#C7FF41] transition-all duration-200 flex items-center gap-2 group shadow-[0_4px_24px_rgba(255,255,255,0.1)] active:scale-95"
            >
              <span>Explore Selected Works</span>
              <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#about"
              onClick={() => soundFx.playClick()}
              onMouseEnter={() => soundFx.playHover()}
              className="px-6 py-3.5 rounded-lg border border-white/10 bg-white/[0.02] text-[#F5F3EF] font-medium text-sm hover:border-[#C7FF41]/50 hover:text-[#C7FF41] transition-all duration-200 flex items-center gap-2 group active:scale-95"
            >
              <span>Engineering Philosophy</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right column: Interactive 3D Geometry Canvas Container */}
        <div className="lg:col-span-5 relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
          {/* Subtle perimeter border and circular visual framing */}
          <div className="absolute inset-4 rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          <HeroCanvas />
        </div>
      </div>

      {/* Marquee Ticker Divider */}
      <div className="w-full border-y border-white/5 bg-black/40 py-3.5 overflow-hidden backdrop-blur-sm mt-12">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-zinc-500">
          <span>WEB DEVELOPMENT</span>
          <span className="text-[#C7FF41]">✦</span>
          <span>MOBILE APPLICATIONS</span>
          <span className="text-[#C7FF41]">✦</span>
          <span>CREATIVE INTERFACES</span>
          <span className="text-[#C7FF41]">✦</span>
          <span>REACT &amp; NEXT.JS</span>
          <span className="text-[#C7FF41]">✦</span>
          <span>REACT NATIVE &amp; EXPO</span>
          <span className="text-[#C7FF41]">✦</span>
          <span>SPATIAL &amp; WEBGL</span>
          <span className="text-[#C7FF41]">✦</span>
          <span>PERFORMANCE FIRST</span>
          <span className="text-[#C7FF41]">✦</span>
          <span>SWISS TYPOGRAPHY</span>
          <span className="text-[#C7FF41]">✦</span>
          {/* Repeat for seamless loop */}
          <span>WEB DEVELOPMENT</span>
          <span className="text-[#C7FF41]">✦</span>
          <span>MOBILE APPLICATIONS</span>
          <span className="text-[#C7FF41]">✦</span>
          <span>CREATIVE INTERFACES</span>
          <span className="text-[#C7FF41]">✦</span>
          <span>REACT &amp; NEXT.JS</span>
          <span className="text-[#C7FF41]">✦</span>
          <span>REACT NATIVE &amp; EXPO</span>
          <span className="text-[#C7FF41]">✦</span>
          <span>SPATIAL &amp; WEBGL</span>
          <span className="text-[#C7FF41]">✦</span>
          <span>PERFORMANCE FIRST</span>
          <span className="text-[#C7FF41]">✦</span>
          <span>SWISS TYPOGRAPHY</span>
          <span className="text-[#C7FF41]">✦</span>
        </div>
      </div>
    </section>
  );
}
