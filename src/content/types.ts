export type ProfileLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  role: string;
  headline: string;
  summary: string;
  links: {
    github: ProfileLink;
    linkedin: ProfileLink;
    email: ProfileLink;
  };
  proofStrip: Array<{
    value: string;
    label: string;
    detail: string;
  }>;
  capabilityPillars: Array<{
    title: string;
    description: string;
  }>;
};

export type CaseStudy = {
  id: string;
  title: string;
  label: string;
  summary: string;
  problem: string;
  ownership: string;
  decisions: string[];
  tradeoffs: string[];
  outcome: string;
  proofPoints: string[];
  featured?: boolean;
};

export type SupportingSystem = {
  title: string;
  label: string;
  summary: string;
  signals: string[];
};

export type Harness = {
  plainEnglish: string;
  principle: string;
  summary: string;
  repoEvidence: string;
  flow: string[];
  guidanceLayers: string[];
  selfHealTriggers: string[];
  reviewReadiness: string[];
};

export type DemoSurface = {
  id: string;
  name: string;
  kicker: string;
  summary: string;
  framing: string;
};

export type WritingEntry = {
  title: string;
  summary: string;
  note: string;
};
