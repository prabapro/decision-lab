// src/data/scenarios.js

export const AURA_TIERS = [
  {
    min: 110,
    name: 'AURA OF LEGEND',
    tone: 'You led through collapse-level pressure and stabilized a failing system.',
  },
  {
    min: 90,
    name: 'AURA OF MASTERY',
    tone: 'You absorbed pain early and preserved long-term stability.',
  },
  {
    min: 70,
    name: 'AURA OF VISION',
    tone: 'You balanced ethics and realism under pressure.',
  },
  {
    min: 50,
    name: 'AURA OF PRAGMATISM',
    tone: 'You avoided catastrophe but paid avoidable costs.',
  },
  {
    min: 30,
    name: 'AURA OF SURVIVAL',
    tone: 'You barely kept the system alive.',
  },
  {
    min: 0,
    name: 'AURA OF COLLAPSE',
    tone: 'You repeated denial, delay, and ideological errors.',
  },
];

export const HIGH_IMPACT_MONTHS = [2, 3, 4, 10, 11, 12];

export const scenarios = [
  {
    month: 1,
    title: 'Month 1 — The Ethical Shortcut',
    narrative: `You are part of the executive leadership team of a fast-growing global software company.

Your flagship product handles sensitive personal data for millions of users.

Three weeks ago, a senior engineer escalated a critical vulnerability:

• Attackers could access user databases
• The exploit leaves almost no trace
• A full patch will take 8–12 weeks

Your legal counsel warns:
"If we disclose now, we invite lawsuits and regulatory scrutiny."

Your PR team argues:
"We should fix it quietly first, then disclose later."

Your security team counters:
"Attackers are actively scanning for this vulnerability."

A junior engineer hints that whistleblowers may go public.

Nothing has leaked yet.

What do you do?`,
    intel: [
      {
        headline: 'Noise',
        body: 'External actors are already probing your servers for this exact vulnerability pattern.',
      },
      {
        headline: 'Compliance',
        body: 'Regulators in two countries are monitoring unusual network traffic from your platform.',
      },
      {
        headline: 'Emails',
        body: 'Internal emails show leadership knew about this flaw three weeks ago.',
      },
      {
        headline: 'Markets',
        body: 'Investors remain completely unaware of the issue.',
      },
      {
        headline: 'History',
        body: 'A competitor collapsed after hiding a similar breach five years ago.',
      },
    ],
    options: [
      {
        text: 'Publicly disclose the vulnerability immediately and halt all new user sign-ups.',
        meta: {
          points: 6,
          risk: 'cautious',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Quietly fix the flaw while preparing a timed public disclosure.',
        meta: {
          points: 10,
          risk: 'moderate',
          ethics: 'high',
          time: 'early',
          reality: 'pragmatic',
        },
      },
      {
        text: 'Delay disclosure and manage leaks internally.',
        meta: {
          points: 3,
          risk: 'bold',
          ethics: 'low',
          time: 'delay',
          reality: 'ideological',
        },
      },
      {
        text: 'Ignore the flaw to avoid panic.',
        meta: {
          points: 0,
          risk: 'bold',
          ethics: 'low',
          time: 'delay',
          reality: 'ideological',
        },
      },
    ],
    reveal: {
      outcome: `You balanced transparency with operational realism.

You quietly contained the vulnerability while preparing regulators and customers for a controlled disclosure.

Short-term:
• No public panic
• No mass exploitation
• No uncontrolled leaks

Long-term:
• Legal exposure was minimized
• Trust erosion was limited
• The breach never became catastrophic

You avoided both denial and premature chaos.`,
      realStory: `This scenario was based on multiple delayed-disclosure breach cases, including Equifax (2017).

Equifax delayed patching and disclosure.

Attackers exfiltrated data of 147 million people.

Regulatory fines exceeded $700 million.

Leadership credibility collapsed.

The breach became a textbook example of governance failure.`,
      comparison: `You contained the vulnerability before disclosure.

Equifax delayed until after catastrophic damage.

Where you improved:
• Prevented mass exploitation
• Controlled regulatory timing

Where reality failed:
• Ignored technical warnings
• Delayed accountability`,
      scoring: `Timed containment scored highest because:

• It prevents uncontrolled harm
• Preserves legal positioning
• Avoids panic while not denying reality

Immediate disclosure without containment was ethically sound but operationally weak.`,
      context: `Delayed disclosure consistently worsens outcomes.

But reckless transparency also creates chaos.`,
      lesson: `Leadership lesson:
Ethics must be paired with execution.`,
    },
  },

  // Add remaining 11 scenarios here following the same structure...
];
