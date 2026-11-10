import { useState } from 'react';
import { SKILL_GROUPS } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { Code2, Smartphone, Server, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Skills() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [selectedSkillName, setSelectedSkillName] = useState<string | null>(null);

  const categoryIcons = [Code2, Server, Smartphone, Wrench];

  const currentGroup = SKILL_GROUPS[activeCategoryIndex];

  return (
    <section id="skills" className="py-24 md:py-36 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C7FF41] mb-2">
              <span>03</span>
              <span>·</span>
              <span>TECHNICAL MASTERY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-[#F5F3EF]">
              Skills &amp; Expertise
            </h2>
          </div>
          <p className="font-mono text-xs text-[#858585] max-w-sm">
            DISCIPLINED TOOLCHAINS FOR MODERN HIGH-PERFORMANCE WEB AND MOBILE PLATFORMS.
          </p>
        </div>

        {/* 4-Category Switcher Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {SKILL_GROUPS.map((group, idx) => {
            const Icon = categoryIcons[idx] || Code2;
            const isActive = activeCategoryIndex === idx;

            return (
              <button
                key={group.category}
                type="button"
                onClick={() => {
                  setActiveCategoryIndex(idx);
                  setSelectedSkillName(null);
                  soundFx.playClick();
                }}
                onMouseEnter={() => soundFx.playHover()}
                className={`p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white/[0.04] border-[#C7FF41] text-[#F5F3EF] shadow-[0_0_20px_rgba(199,255,65,0.1)]'
                    : 'bg-white/[0.01] border-white/5 text-[#858585] hover:border-white/20 hover:text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon
                    size={20}
                    className={isActive ? 'text-[#C7FF41]' : 'text-zinc-600'}
                  />
                  <span className="font-mono text-[11px] text-zinc-600">
                    0{idx + 1}
                  </span>
                </div>
                <div
                  className={`text-sm md:text-base font-display font-bold ${
                    isActive ? 'text-[#C7FF41]' : 'text-[#F5F3EF]'
                  }`}
                >
                  {group.category}
                </div>
                <div className="text-xs font-mono text-zinc-500 mt-1">
                  {group.skills.length} Technologies
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Interactive Skill Cards Grid (Anti-boring progress bars) */}
        <div className="p-8 md:p-10 rounded-2xl border border-white/10 bg-zinc-950/40 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="text-[#C7FF41]" />
              <h3 className="text-lg md:text-xl font-display font-bold text-[#F5F3EF]">
                {currentGroup.category} Architecture
              </h3>
            </div>
            <div className="text-xs font-mono text-[#858585]">
              CLICK ANY TECHNOLOGY FOR ARCHITECTURAL SPEC
            </div>
          </div>

          {/* Grid of skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentGroup.skills.map((skill) => {
              const isSelected = selectedSkillName === skill.name;

              return (
                <div
                  key={skill.name}
                  onClick={() => {
                    setSelectedSkillName(isSelected ? null : skill.name);
                    soundFx.playClick();
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer group ${
                    isSelected
                      ? 'bg-[#C7FF41]/10 border-[#C7FF41] shadow-[0_0_20px_rgba(199,255,65,0.15)]'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-bold font-display text-[#F5F3EF] group-hover:text-[#C7FF41] transition-colors">
                      {skill.name}
                    </span>
                    <span
                      className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-[#C7FF41] text-[#080808] font-bold'
                          : 'bg-white/5 text-zinc-400'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  <p className="text-xs text-[#858585] leading-relaxed">
                    {skill.description}
                  </p>

                  {isSelected && (
                    <div className="mt-4 pt-3 border-t border-[#C7FF41]/20 flex items-center gap-2 text-xs font-mono text-[#C7FF41]">
                      <CheckCircle2 size={13} />
                      <span>Production Verified in Client Projects</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Editable Confirmation Note as requested by prompt */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
            <span>RAMZI ALOUI · CERTIFIED PRODUCTION STACK</span>
            <span className="text-zinc-600">STRICT TYPES · WCAG ACCESSIBLE · ZERO VENDOR LOCK-IN</span>
          </div>
        </div>
      </div>
    </section>
  );
}
