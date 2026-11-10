import { useState } from 'react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { Plus, Minus, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Process() {
  const [expandedStep, setExpandedStep] = useState<string>('01');

  return (
    <section id="process" className="py-24 md:py-36 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C7FF41] mb-2">
              <span>04</span>
              <span>·</span>
              <span>ENGINEERING METHODOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-[#F5F3EF]">
              Development Process
            </h2>
          </div>
          <p className="font-mono text-xs text-[#858585] max-w-sm">
            A PROVEN FOUR-PHASE DISCIPLINE TURNING AMBITIOUS VISIONS INTO MEASURABLE REALITY.
          </p>
        </div>

        {/* 4-Step Interactive Editorial Accordion */}
        <div className="space-y-4">
          {PROCESS_STEPS.map((step) => {
            const isExpanded = expandedStep === step.number;

            return (
              <div
                key={step.number}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-zinc-950/70 border-[#C7FF41]/40 shadow-[0_0_30px_rgba(199,255,65,0.06)]'
                    : 'bg-white/[0.01] border-white/5 hover:border-white/20'
                }`}
              >
                {/* Step Header Button */}
                <button
                  type="button"
                  onClick={() => {
                    setExpandedStep(isExpanded ? '' : step.number);
                    soundFx.playClick();
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-left cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                    <span
                      className={`font-mono text-2xl md:text-3xl font-black ${
                        isExpanded ? 'text-[#C7FF41]' : 'text-zinc-600'
                      }`}
                    >
                      {step.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                          PHASE // {step.phase}
                        </span>
                      </div>
                      <h3
                        className={`text-xl sm:text-2xl md:text-3xl font-display font-bold mt-1 transition-colors ${
                          isExpanded ? 'text-[#F5F3EF]' : 'text-zinc-300'
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ml-4 transition-colors ${
                      isExpanded
                        ? 'border-[#C7FF41] bg-[#C7FF41] text-[#080808]'
                        : 'border-white/10 text-zinc-400'
                    }`}
                  >
                    {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                {/* Collapsible Content */}
                {isExpanded && (
                  <div className="px-6 pb-8 md:px-8 md:pb-10 pt-2 border-t border-white/5 animate-fadeIn">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left: Summary */}
                      <div className="lg:col-span-5">
                        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-6">
                          {step.summary}
                        </p>

                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                          <div className="text-xs font-mono uppercase tracking-wider text-[#C7FF41] mb-2 flex items-center gap-2">
                            <ArrowRight size={14} />
                            <span>PHASE DELIVERABLES</span>
                          </div>
                          <div className="space-y-1.5">
                            {step.deliverables.map((item) => (
                              <div key={item} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                                <span className="w-1 h-1 rounded-full bg-[#C7FF41]" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Key Activities Checklist */}
                      <div className="lg:col-span-7 bg-black/40 p-6 rounded-xl border border-white/5">
                        <div className="text-xs font-mono uppercase tracking-wider text-[#858585] mb-4">
                          EXECUTION PROTOCOLS
                        </div>
                        <div className="space-y-3">
                          {step.details.map((detail) => (
                            <div key={detail} className="flex items-start gap-3">
                              <CheckCircle2 size={16} className="text-[#C7FF41] shrink-0 mt-0.5" />
                              <span className="text-sm text-zinc-300 leading-relaxed">
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
