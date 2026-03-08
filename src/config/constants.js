// src/config/constants.js

import data from '@data/scenarios.yaml';

// ---------------------------------------------------------------------------
// Scenarios — sourced from src/data/scenarios.yaml
// ---------------------------------------------------------------------------

export const scenarios = data.scenarios;

// ---------------------------------------------------------------------------
// Phase Timer — used in usePhaseTimer.js and consumed via hook in Play.jsx
// ---------------------------------------------------------------------------

export const PHASE_DURATIONS = {
  1: 90, // Read Case - Default: 90 seconds
  2: 30, // Gather Intel - Default: 30 seconds
  3: 25, // Decide Now - Default: 25 seconds
};

export const PHASE_META = {
  1: { emoji: '📖', label: 'Read Case' },
  2: { emoji: '🧠', label: 'Gather Intel' },
  3: { emoji: '⚡', label: 'Decide Now' },
};

// ---------------------------------------------------------------------------
// Aura Tiers — used in Results.jsx to map total score to a leadership label
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// High Impact Months — used in useGameStore to apply stress multipliers
// ---------------------------------------------------------------------------

export const HIGH_IMPACT_MONTHS = [2, 3, 4, 10, 11, 12];

// ---------------------------------------------------------------------------
// Initial Game State — used in useGameStore as the reset/start baseline
// ---------------------------------------------------------------------------

export const INITIAL_GAME_STATE = {
  teamName: '',
  currentMonth: 1,
  totalScore: 0,
  decisionLog: [],
  systemStress: 0,
  regretCount: 0,
  redemptionCount: 0,
  gameStatus: 'idle', // 'idle' | 'playing' | 'ended'
  pendingReveal: false,
};

// ---------------------------------------------------------------------------
// Intro Lines — used in Home.jsx for the welcome screen copy
// ---------------------------------------------------------------------------

export const INTRO_LINES = [
  'You are about to enter a high-stakes decision laboratory.',
  'Over 12 months, your team will face real leadership crises drawn from history.',
  'You will not be given hindsight. You will not be given perfect information.',
  'Only after each decision will you discover what really happened.',
];
