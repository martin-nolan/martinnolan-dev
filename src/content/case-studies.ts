import type { CaseStudy } from './types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'synthetic-call-testing',
    title: 'Synthetic testing / orchestration system for conversational AI',
    label: 'Voice-agent testing',
    summary:
      'A platform for configuring voice agents, building scenario and behaviour test matrices, running synthetic calls, and reviewing results.',
    problem:
      'Voice-agent testing depended on manual setup, one-off calls, and subjective review. Teams needed a repeatable way to test different customer situations and inspect what happened afterwards.',
    ownership:
      'Owned workflow design, product UX, configuration patterns, run visibility, and evaluation design. Worked across the frontend and backend contract.',
    decisions: [
      'Made scenarios and behaviours explicit inputs instead of hidden setup knowledge.',
      'Kept dispatch, run groups, run items, and results backend-owned so execution history was durable.',
      'Designed results around transcripts, audio, metadata, and evaluation context instead of a simple pass/fail view.',
    ],
    tradeoffs: [
      'More configuration up front, but much less repeat effort once a test matrix exists.',
      'A denser operational interface, but clearer setup, run control, and evidence for review.',
    ],
    outcome:
      'Made voice-agent test runs repeatable, inspectable, and easier to evaluate across scenario and behaviour combinations.',
    proofPoints: [
      'Configurable agents',
      'Scenario and behaviour injection',
      'Backend-owned run history',
      'Runtime evaluation',
    ],
    featured: true,
  },
  {
    id: 'research-platform',
    title: 'AI research platform for conversational workflows',
    label: 'Research workflows',
    summary:
      'An authenticated research workspace for audience exploration, LLM-driven studies, video testing, jobs, traces, and support surfaces. Used by internal teams and stakeholders.',
    problem:
      'Research and video testing work was hard to repeat because audience context, prompts, jobs, results, and supporting evidence lived across too many disconnected steps.',
    ownership:
      'Worked across product and implementation: Next.js shell, authenticated BFF routes, workflow UI, state providers, support surfaces, and evaluation-facing metadata.',
    decisions: [
      'Kept the interface organised around the work users were doing: cohorts, questions, campaigns, jobs, traces, and video analysis.',
      'Surfaced evidence through structured metadata, conversation history, and evaluation context.',
    ],
    tradeoffs: [
      'More product surface area, but a clearer workflow for internal users and stakeholders.',
      'Less focus on novelty, more focus on repeatability, traceability, and supportability.',
    ],
    outcome:
      'Made research and video-testing work more structured: clearer audience exploration, better job visibility, and reviewable outputs.',
    proofPoints: [
      'Authenticated Next.js shell',
      'Cohorts and personas',
      'Campaign and video workflows',
    ],
    featured: true,
  },
];
