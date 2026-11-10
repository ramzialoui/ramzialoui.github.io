import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProjects, formatTunisTime, validateContactForm, countTotalSkills } from './portfolio';
import { Project, SkillGroup } from '../types';

const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'Alpha Web',
    subtitle: 'Web app',
    category: 'web',
    categoryLabel: 'Web',
    description: 'Test',
    detailedCaseStudy: { overview: '', challenge: '', solution: '', keyDeliverables: [], architecture: [] },
    technologies: ['React'],
    image: '/test.jpg',
    liveDemoUrl: '#',
    featuredYear: '2026',
    role: 'Dev',
  },
  {
    id: 'p2',
    title: 'Beta Mobile',
    subtitle: 'Mobile app',
    category: 'mobile',
    categoryLabel: 'Mobile',
    description: 'Test',
    detailedCaseStudy: { overview: '', challenge: '', solution: '', keyDeliverables: [], architecture: [] },
    technologies: ['React Native'],
    image: '/test2.jpg',
    liveDemoUrl: '#',
    featuredYear: '2026',
    role: 'Dev',
  },
  {
    id: 'p3',
    title: 'Gamma Creative',
    subtitle: 'Creative WebGL',
    category: 'creative',
    categoryLabel: 'Creative',
    description: 'Test',
    detailedCaseStudy: { overview: '', challenge: '', solution: '', keyDeliverables: [], architecture: [] },
    technologies: ['WebGL'],
    image: '/test3.jpg',
    liveDemoUrl: '#',
    featuredYear: '2025',
    role: 'Dev',
  },
];

test('filterProjects returns all projects when category is all', () => {
  const result = filterProjects(mockProjects, 'all');
  assert.equal(result.length, 3);
});

test('filterProjects filters properly by web, mobile, and creative', () => {
  assert.equal(filterProjects(mockProjects, 'web').length, 1);
  assert.equal(filterProjects(mockProjects, 'web')[0].id, 'p1');

  assert.equal(filterProjects(mockProjects, 'mobile').length, 1);
  assert.equal(filterProjects(mockProjects, 'mobile')[0].id, 'p2');

  assert.equal(filterProjects(mockProjects, 'creative').length, 1);
  assert.equal(filterProjects(mockProjects, 'creative')[0].id, 'p3');
});

test('formatTunisTime returns a formatted time string', () => {
  const testDate = new Date('2026-11-09T12:30:45Z');
  const formatted = formatTunisTime(testDate);
  assert.match(formatted, /^\d{2}:\d{2}:\d{2}$/);
});

test('validateContactForm correctly validates valid and invalid form submissions', () => {
  const invalidResult = validateContactForm({
    name: '',
    email: 'invalid-email',
    projectType: '',
    message: 'short',
  });
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.name);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.projectType);
  assert.ok(invalidResult.errors.message);

  const validResult = validateContactForm({
    name: 'Sarah Connor',
    email: 'sarah@skynet.com',
    projectType: 'Web Application',
    message: 'We are looking to develop an interactive web platform with high performance and 3D graphics.',
  });
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('countTotalSkills calculates sum of skills accurately', () => {
  const mockGroups: SkillGroup[] = [
    {
      category: 'Frontend',
      skills: [
        { name: 'HTML5', level: 'Expert', description: '' },
        { name: 'CSS3', level: 'Expert', description: '' },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 'Advanced', description: '' },
      ],
    },
  ];
  assert.equal(countTotalSkills(mockGroups), 3);
});
