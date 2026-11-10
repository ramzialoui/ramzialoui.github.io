import { Project, ProjectCategory, SkillGroup } from '../types';

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

/**
 * Filter projects based on selected category tab
 */
export function filterProjects(projects: Project[], category: ProjectCategory): Project[] {
  if (category === 'all') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}

/**
 * Computes Tunis local time (Africa/Tunis, UTC+1 standard time) formatted as 24h string
 */
export function formatTunisTime(date: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Tunis',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  } catch {
    // Fallback if timezone not supported in test environment
    const utcHours = date.getUTCHours();
    const tunisHour = (utcHours + 1) % 24;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(tunisHour)}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
  }
}

/**
 * Validates contact form inputs rigorously
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please provide your name (minimum 2 characters)';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  if (!data.projectType || data.projectType.trim().length === 0) {
    errors.projectType = 'Please select a project type';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please provide details about your idea (minimum 10 characters)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Computes total number of skills across all categories
 */
export function countTotalSkills(groups: SkillGroup[]): number {
  return groups.reduce((acc, group) => acc + group.skills.length, 0);
}
