// src/utils/scoreUtils.js

import { AURA_TIERS } from '@config/constants';

// ---------------------------------------------------------------------------
// Score colour tokens
// ---------------------------------------------------------------------------

/**
 * Returns a Tailwind text-colour class based on a given score.
 *
 * Thresholds:
 *   perfect (points === maxPoints) → score-perfect  (green)
 *   zero    (points === 0)         → destructive    (red)
 *   partial                        → score-partial  (orange)
 *
 * @param {number} points
 * @param {number} [maxPoints=10]
 * @returns {string} Tailwind class string
 */
export const getScoreTextColor = (points, maxPoints = 10) => {
  if (points === maxPoints) return 'text-score-perfect';
  if (points === 0) return 'text-destructive';
  return 'text-score-partial';
};

/**
 * Returns Tailwind border + text + bg classes for the score feedback badge.
 *
 * @param {number} points
 * @param {number} [maxPoints=10]
 * @returns {string} Tailwind class string
 */
export const getScoreBadgeColor = (points, maxPoints = 10) => {
  if (points === maxPoints)
    return 'border-score-perfect/40 text-score-perfect bg-score-perfect/5';
  if (points === 0)
    return 'border-destructive/40 text-destructive bg-destructive/5';
  return 'border-score-partial/40 text-score-partial bg-score-partial/5';
};

// ---------------------------------------------------------------------------
// Score feedback copy
// ---------------------------------------------------------------------------

/**
 * Returns a short contextual feedback string for a given score.
 *
 * @param {number} points
 * @param {number} [maxPoints=10]
 * @returns {string}
 */
export const getScoreFeedback = (points, maxPoints = 10) => {
  if (points === maxPoints) return 'Strategically brilliant.';
  if (points >= 7) return 'Strong decision — a better path exists.';
  if (points > 0) return 'You improved, but there was a better path.';
  return 'Warning: this decision is alarming.';
};

// ---------------------------------------------------------------------------
// Aura tier lookup
// ---------------------------------------------------------------------------

/**
 * Returns the aura tier object for a given total score.
 * Falls back to the last tier (lowest) if nothing matches.
 *
 * @param {number} totalScore
 * @returns {{ min: number, name: string, tone: string }}
 */
export const getAuraTier = (totalScore) =>
  AURA_TIERS.find((t) => totalScore >= t.min) ??
  AURA_TIERS[AURA_TIERS.length - 1];

// ---------------------------------------------------------------------------
// Leadership profile
// ---------------------------------------------------------------------------

/**
 * Derives a leadership identity label from the full decision log.
 *
 * @param {Array<{ time: string, ethics: string, reality: string }>} decisionLog
 * @param {number} totalScore
 * @param {number} systemStress
 * @returns {string}
 */
export const generateLeadershipProfile = (
  decisionLog,
  totalScore,
  systemStress,
) => {
  let early = 0,
    delay = 0,
    ethical = 0,
    pragmatic = 0;

  decisionLog.forEach((d) => {
    if (d.time === 'early') early++;
    if (d.time === 'delay') delay++;
    if (d.ethics === 'high') ethical++;
    if (d.reality === 'pragmatic') pragmatic++;
  });

  if (early >= 6 && pragmatic >= 6 && totalScore >= 85)
    return 'Visionary Stabilizer';
  if (delay >= 6 && ethical >= 4) return 'Reactive Humanitarian';
  if (ethical >= 7 && pragmatic < 4) return 'Ethical Idealist';
  if (systemStress >= 14) return 'Systemic Risk Architect';
  if (totalScore < 35) return 'Collapse Engineer';
  return 'Strategic Realist';
};

// ---------------------------------------------------------------------------
// Narrative builder
// ---------------------------------------------------------------------------

/**
 * Builds the multi-line narrative paragraph shown on the Results page.
 *
 * @param {{ aura: object, systemStress: number, regretCount: number, redemptionCount: number, totalScore: number, scenarioCount: number }} opts
 * @returns {string}
 */
export const buildNarrative = ({
  aura,
  systemStress,
  regretCount,
  redemptionCount,
  totalScore,
  scenarioCount,
}) => {
  let text = aura.tone;

  if (systemStress >= 10) {
    text +=
      '\n\nYour repeated delays and ideological decisions created hidden instability that nearly collapsed the system.';
  }
  if (regretCount >= 4) {
    text +=
      '\n\nYou repeatedly chose denial or delay when early action was required.';
  }
  if (redemptionCount >= 5) {
    text +=
      '\n\nYou demonstrated redemption by correcting early mistakes through decisive late leadership.';
  }

  text += `\n\nFinal System Stress: ${systemStress}\nTotal Score: ${totalScore} / ${scenarioCount * 10}`;
  return text;
};
