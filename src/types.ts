export type ProjectCategory = 'all' | 'web' | 'mobile' | 'creative';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'web' | 'mobile' | 'creative';
  categoryLabel: string;
  description: string;
  detailedCaseStudy: {
    overview: string;
    challenge: string;
    solution: string;
    keyDeliverables: string[];
    architecture: string[];
  };
  technologies: string[];
  image: string;
  liveDemoUrl: string;
  githubUrl?: string;
  featuredYear: string;
  role: string;
}

export interface SkillGroup {
  category: string;
  skills: {
    name: string;
    level: string;
    description: string;
  }[];
}

export interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  summary: string;
  details: string[];
  deliverables: string[];
}
