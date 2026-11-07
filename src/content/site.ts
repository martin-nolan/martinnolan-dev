// All copy for the site. ==text== marks a phrase for the highlighter.

export const site = {
  name: 'Martin Nolan',
  kicker: 'AI engineer / Sky / Livingston',
  intro:
    'I build AI products end to end, and the ==foundations that help teams build reliably== with coding agents.',
  url: 'https://martinnolan-dev.netlify.app',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/martinnolan0110' },
    { label: 'GitHub', href: 'https://github.com/martin-nolan' },
    { label: 'Email', href: 'mailto:martinnolan_1@hotmail.co.uk' },
  ],
} as const;

export const figures = {
  rings:
    'The model is the smallest part. The agent runs its loop inside the harness, and the people using the product sit around all of it.',
  thread:
    'Two threads through the work: useful products, and better foundations for building them.',
  harness:
    'The harness around the agent, and who decides at the gate. Autonomy is earned one type of work at a time, and taken back if results slip.',
  measured:
    'One matched task, before and after the reset. One run, so a signal rather than a benchmark.',
  template: 'One command, a product repository with the foundations already in place.',
} as const;

export const product = {
  pull: 'I care about the product as much as the code.',
  text: 'Before I write much, I want to know who it’s for and ==what it should do when the model is wrong==. Those questions shape the interface, the checks and where a person needs to make the call. My work keeps coming back to the same two threads: product and developer experience.',
  naming:
    'I care about what we call things, too. I’ve named a few of the things we’ve built, and ==the names stuck==.',
} as const;

export const harness = {
  pull: 'A coding agent is only as good as the repository it works in.',
  text: 'When I reset ours, I cut the guidance right back and put ==checks behind what was left==, so the rules are enforced rather than just written down. Today a person approves each step. The aim is for an agent to earn more room one type of work at a time, with evidence, and lose it again if the results slip.',
  trial:
    'I didn’t start here. My first attempt was a team of specialist agents with an orchestrator handing work between them. Most runs were short and fine, but ==a few never settled==, and those few drove most of the cost. One agent in a stricter repository did the same task with far less.',
  words: [
    { term: 'Context engineering', text: 'What the model sees, and when.' },
    { term: 'Loop engineering', text: 'The agent’s steps, budget, stopping point and recovery.' },
    { term: 'Harness engineering', text: 'Everything in the repo around the loop.' },
    { term: 'Evals', text: 'Knowing it still works after you change something.' },
  ],
} as const;

export const template = {
  pull: 'The best setup is the one you don’t have to do.',
  text: 'The template generates a new product repository with sign-in, sessions, database roles, an API contract, an agent runtime with guardrails, deployment and the harness already in. Foundations that took weeks on the first product now ==generate and pass their checks in minutes==. When a product finds a better way of doing something, it goes back into the template.',
} as const;
