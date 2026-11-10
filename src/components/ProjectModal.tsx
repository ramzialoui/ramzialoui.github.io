import { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { soundFx } from '../utils/sound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Background click dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl bg-[#0F0F0F] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-10 my-auto">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[#C7FF41]">{project.categoryLabel}</span>
            <span className="text-zinc-600">·</span>
            <span className="text-[#858585]">{project.featuredYear}</span>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            type="button"
            className="p-1.5 rounded-lg border border-white/10 text-[#858585] hover:text-[#F5F3EF] hover:border-white/20 transition-colors"
            aria-label="Close project modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
          {/* Project Title & Subtitle */}
          <div className="mb-6">
            <h3 id="modal-project-title" className="text-2xl sm:text-4xl font-black font-display text-[#F5F3EF] mb-2">
              {project.title}
            </h3>
            <p className="text-base sm:text-lg text-[#858585]">
              {project.subtitle}
            </p>
          </div>

          {/* Full-width Image Preview Container */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 mb-8 aspect-video bg-zinc-950">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Case Study Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#C7FF41] mb-2 flex items-center gap-2">
                <Sparkles size={14} />
                <span>OVERVIEW &amp; MISSION</span>
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                {project.detailedCaseStudy.overview}
              </p>

              <h4 className="text-xs font-mono uppercase tracking-widest text-[#858585] mb-2">
                THE ENGINEERING CHALLENGE
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {project.detailedCaseStudy.challenge}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#C7FF41] mb-2 flex items-center gap-2">
                <Cpu size={14} />
                <span>TECHNICAL SOLUTION</span>
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                {project.detailedCaseStudy.solution}
              </p>

              <h4 className="text-xs font-mono uppercase tracking-widest text-[#858585] mb-2">
                KEY DELIVERABLES
              </h4>
              <ul className="space-y-2">
                {project.detailedCaseStudy.keyDeliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 size={14} className="text-[#C7FF41] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Architecture & Technologies Used */}
          <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono text-[#858585] uppercase mb-2">TECHNOLOGY STACK</div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-300">
                {project.technologies.map((tech, i) => (
                  <span key={tech}>
                    {tech}
                    {i < project.technologies.length - 1 && <span className="text-zinc-600 ml-2">/</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="px-4 py-2.5 rounded-lg border border-white/10 hover:border-white/30 text-xs font-mono text-[#F5F3EF] flex items-center gap-2 transition-colors"
                >
                  <Github size={14} />
                  <span>GitHub Repository</span>
                </a>
              )}
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-4 py-2.5 rounded-lg bg-[#C7FF41] hover:bg-[#d5ff6a] text-xs font-semibold text-[#080808] flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(199,255,65,0.2)]"
              >
                <span>Live Project Experience</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
