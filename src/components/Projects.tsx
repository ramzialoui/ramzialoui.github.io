import { useState } from 'react';
import { ArrowUpRight, Github, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { filterProjects } from '../utils/portfolio';
import { soundFx } from '../utils/sound';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = filterProjects(PROJECTS, selectedCategory);

  const filterTabs: { label: string; value: ProjectCategory }[] = [
    { label: 'All Works', value: 'all' },
    { label: 'Web Development', value: 'web' },
    { label: 'Mobile Apps', value: 'mobile' },
    { label: 'Creative Engineering', value: 'creative' },
  ];

  return (
    <section id="projects" className="py-24 md:py-36 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header & Segmented Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C7FF41] mb-2">
              <span>02</span>
              <span>·</span>
              <span>CURATED SELECTION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-[#F5F3EF]">
              Selected Works
            </h2>
          </div>

          {/* Interactive Filter Tabs (Functional segmented controls) */}
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-xl overflow-x-auto max-w-full">
            {filterTabs.map((tab) => {
              const isActive = selectedCategory === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(tab.value);
                    soundFx.playClick();
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`px-3.5 py-1.5 text-xs font-mono tracking-wide rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#C7FF41] text-[#080808] font-semibold shadow-[0_0_12px_rgba(199,255,65,0.2)]'
                      : 'text-[#858585] hover:text-[#F5F3EF] hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards (Alternating Immersive Layout) */}
        <div className="space-y-24 md:space-y-36">
          {filteredProjects.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <article
                key={project.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Media Preview Container */}
                <div
                  className={`lg:col-span-7 group cursor-pointer ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                  onClick={() => {
                    setActiveModalProject(project);
                    soundFx.playClick();
                  }}
                >
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/70 shadow-2xl transition-all duration-500 group-hover:border-[#C7FF41]/40 group-hover:shadow-[0_0_40px_rgba(199,255,65,0.12)]">
                    {/* Aspect ratio frame */}
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                      {/* Interactive hover overlay pill */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="px-5 py-2.5 rounded-full bg-black/85 backdrop-blur-md border border-[#C7FF41] text-[#C7FF41] font-mono text-xs uppercase tracking-wider shadow-2xl">
                          VIEW CASE STUDY
                        </div>
                      </div>
                    </div>

                    {/* Quick status bar on card bottom */}
                    <div className="px-6 py-3.5 bg-black/60 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                      <span className="text-zinc-500 uppercase">{project.role}</span>
                      <span className="text-[#C7FF41]">{project.featuredYear}</span>
                    </div>
                  </div>
                </div>

                {/* Typography & Editorial Project Info */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  {/* Category text kicker (Zero-Pill rule: clean unboxed text) */}
                  <div className="flex items-center gap-2 text-xs font-mono text-[#858585] mb-3">
                    <span className="text-[#C7FF41]">{project.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>ARCHIVE {project.featuredYear}</span>
                  </div>

                  {/* Project Title */}
                  <h3
                    onClick={() => {
                      setActiveModalProject(project);
                      soundFx.playClick();
                    }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-[#F5F3EF] mb-3 hover:text-[#C7FF41] transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-base font-medium text-zinc-400 mb-4">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#858585] leading-relaxed mb-6 text-pretty">
                    {project.description}
                  </p>

                  {/* Technologies Used (Clean unboxed text with typographic separators) */}
                  <div className="border-t border-white/10 pt-4 mb-8">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                      TECH STACK
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-zinc-300">
                      {project.technologies.map((tech, i) => (
                        <span key={tech} className="inline-flex items-center">
                          <span>{tech}</span>
                          {i < project.technologies.length - 1 && (
                            <span className="text-zinc-600 ml-2.5">/</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links & CTA */}
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModalProject(project);
                        soundFx.playClick();
                      }}
                      onMouseEnter={() => soundFx.playHover()}
                      className="px-5 py-2.5 rounded-lg bg-[#C7FF41] text-[#080808] font-semibold text-xs uppercase tracking-wider hover:bg-[#d5ff6a] transition-all flex items-center gap-2 group cursor-pointer shadow-[0_0_15px_rgba(199,255,65,0.15)]"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight
                        size={15}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundFx.playClick()}
                        onMouseEnter={() => soundFx.playHover()}
                        className="p-2.5 rounded-lg border border-white/10 text-zinc-400 hover:text-[#F5F3EF] hover:border-white/30 transition-colors"
                        title="View GitHub Repository"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-24 p-8 rounded-2xl border border-white/5 bg-gradient-to-r from-white/[0.02] via-transparent to-white/[0.01] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Sparkles size={18} className="text-[#C7FF41]" />
            <div className="text-sm font-mono text-zinc-300">
              Have a bespoke web or mobile project requiring custom engineering?
            </div>
          </div>
          <a
            href="#contact"
            onClick={() => soundFx.playClick()}
            className="px-4 py-2 rounded-lg border border-[#C7FF41]/40 text-xs font-mono uppercase text-[#C7FF41] hover:bg-[#C7FF41]/10 transition-colors whitespace-nowrap"
          >
            Start a Conversation →
          </a>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
