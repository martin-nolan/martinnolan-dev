import type { CaseStudy } from './types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'synthetic-call-testing',
    title: 'Synthetic testing / orchestration system for conversational AI',
    label: 'Voice-agent testing',
    summary:
      'A platform for setting up voice agents, combining scenarios with behaviours, running synthetic calls, and reviewing what happened.',
    problem:
      'Voice-agent testing depended on manual setup, one-off calls, and subjective review. Teams needed a way to cover different customer situations and inspect the evidence afterwards.',
    ownership:
      'Owned the product flow, call orchestration shape, configuration patterns, run visibility, and the evaluation surfaces. Worked across the frontend and backend contract.',
    decisions: [
      'Made scenarios and behaviours explicit inputs instead of hidden setup knowledge.',
      'Kept dispatch, run groups, run items, and results backend-owned so execution history was durable.',
      'Put transcripts, audio, metadata, and evaluation context into the results view instead of reducing everything to pass/fail.',
    ],
    tradeoffs: [
      'More configuration up front, but much less repeat effort once a test matrix exists.',
      'A denser operational interface, but clearer setup, run control, and evidence for review.',
    ],
    outcome:
      'Made voice-agent test runs easier to repeat, inspect, and compare across scenario and behaviour combinations.',
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
      'An authenticated research workspace for audience exploration, conversational studies, video testing, jobs, traces, and support surfaces.',
    problem:
      'Research and video testing work was hard to repeat because audience context, prompts, jobs, results, and supporting evidence lived across too many disconnected steps.',
    ownership:
      'Worked across the product and implementation: Next.js shell, authenticated BFF routes, workflow UI, state providers, support surfaces, and evaluation-facing metadata.',
    decisions: [
      'Kept the interface organised around the work users were doing: cohorts, questions, campaigns, jobs, traces, and video analysis.',
      'Surfaced evidence through structured metadata, conversation history, and evaluation context.',
    ],
    tradeoffs: [
      'More product surface area, but a clearer workflow for internal users and stakeholders.',
      'Less focus on novelty, more focus on making the work traceable and supportable.',
    ],
    outcome:
      'Gave research and video-testing work a clearer shape: audience setup, job visibility, and outputs people could review.',
    proofPoints: [
      'Authenticated Next.js shell',
      'Cohorts and personas',
      'Campaign and video workflows',
    ],
    featured: true,
  },
  {
    id: 'genai-system-decommissioning',
    title: 'Safe decommissioning of a GenAI system',
    label: 'Service decommissioning',
    summary:
      'Authored and drove a staged plan to retire parts of an internal multi-app GenAI system, closing unused access and reducing running cost without breaking live use or losing data.',
    problem:
      'An earlier GenAI system needed parts of its access and infrastructure retired. The risk was not the teardown itself; it was closing the right things while other teams still depended on shared infrastructure.',
    ownership:
      'Authored and drove the access-closure plan, made the first reversible closure and related code changes, and coordinated identity and access-group changes with the platform owners.',
    decisions: [
      'Reversible before destructive: close access and runtime config first, tear down infrastructure later.',
      'Captured the current routes, services, config, and access before changing anything.',
      'Used live deployed config as the source of truth and the repo as implementation evidence.',
      'Never removed data, secrets, or service accounts without owner, retention, and rollback approval.',
    ],
    tradeoffs: [
      'A slower, staged closure rather than a fast teardown — chosen to avoid irreversible mistakes on shared infrastructure.',
      'Left config untouched where access was already controlled elsewhere, to avoid risk for no benefit.',
    ],
    proofPoints: [
      'reversible access closure',
      'staged teardown',
      'runtime config',
      'cost reduction',
    ],
    featured: true,
  },
  {
    id: 'digital-twin-research-panels',
    title: 'Digital-twin research panels',
    label: 'Research workflows',
    summary:
      'An application for putting questions to defined audiences represented as reusable persona "twins", then using a moderator to combine their responses.',
    problem:
      'Stakeholders wanted reactions from defined audiences without standing up live focus groups each time. The challenge was keeping the persona responses separate, then turning them into one usable answer.',
    ownership:
      'Worked across the application and backend orchestration layer: the moderator service and the interfaces around it, alongside a separate data-science team who modelled the personas.',
    decisions: [
      "Kept each persona's context isolated, with its own prompt and retrieval domain.",
      'Used a moderator to fan out parallel calls per persona and aggregate the responses into one answer.',
      'Logged questions and responses for review and auditability.',
    ],
    tradeoffs: [
      'More calls per question, in exchange for answer fidelity and clean persona separation.',
      'A stateless session model for the proof of concept — simpler to reason about, at the cost of cross-session memory.',
    ],
    proofPoints: [
      'persona panels',
      'moderator orchestration',
      'parallel persona calls',
      'per-persona retrieval',
    ],
    featured: true,
  },
];
