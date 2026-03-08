// src/pages/Results.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@stores/useGameStore';
import { AURA_TIERS } from '@config/constants';
import { scenarios } from '@data/scenarios';
import GameGuard from '@components/common/GameGuard';

// ---------------------------------------------------------------------------
// Helpers (ported from original script.js)
// ---------------------------------------------------------------------------

function generateLeadershipProfile(decisionLog, totalScore, systemStress) {
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
}

function buildNarrative({
  aura,
  systemStress,
  regretCount,
  redemptionCount,
  totalScore,
}) {
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

  text += `\n\nFinal System Stress: ${systemStress}\nTotal Score: ${totalScore} / ${scenarios.length * 10}`;
  return text;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatPill({ label, value }) {
  return (
    <div
      className="flex flex-col items-center px-6 py-3 rounded-2xl"
      style={{ background: 'rgba(255,255,255,0.06)' }}>
      <span className="text-xl font-bold">{value}</span>
      <span className="text-xs tracking-widest uppercase opacity-50 mt-1">
        {label}
      </span>
    </div>
  );
}

function ResetConfirm({ onConfirm, onCancel }) {
  return (
    <div className="space-y-3">
      <p className="text-sm opacity-60">
        This will erase all progress. Are you sure?
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={onConfirm}
          className="px-6 py-2 rounded-full text-sm font-medium text-white transition-all"
          style={{ background: '#dc2626' }}>
          Yes, Reset
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-2 rounded-full text-sm font-medium transition-all"
          style={{ background: 'rgba(255,255,255,0.1)', color: '#e8ebff' }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page (wrapped in GameGuard)
// ---------------------------------------------------------------------------

export default function Results() {
  return (
    <GameGuard
      requiredStatus="ended"
      redirectMap={{ playing: '/play', idle: '/' }}>
      <ResultsContent />
    </GameGuard>
  );
}

function ResultsContent() {
  const navigate = useNavigate();
  const {
    teamName,
    totalScore,
    decisionLog,
    systemStress,
    regretCount,
    redemptionCount,
    resetGame,
  } = useGameStore();

  const [confirmReset, setConfirmReset] = useState(false);

  const aura =
    AURA_TIERS.find((t) => totalScore >= t.min) ??
    AURA_TIERS[AURA_TIERS.length - 1];
  const identity = generateLeadershipProfile(
    decisionLog,
    totalScore,
    systemStress,
  );
  const narrative = buildNarrative({
    aura,
    systemStress,
    regretCount,
    redemptionCount,
    totalScore,
  });

  const handleReset = () => {
    resetGame();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div
        className="max-w-2xl mx-auto text-center rounded-[42px] px-10 py-14"
        style={{
          backdropFilter: 'blur(24px)',
          background:
            'linear-gradient(135deg, rgba(120,100,255,0.28), rgba(255,200,120,0.18))',
          boxShadow: '0 0 70px rgba(255,200,120,0.30)',
        }}>
        {/* Aura title */}
        <p className="text-xs tracking-widest uppercase opacity-50 mb-4">
          Your Leadership Aura
        </p>
        <h2
          className="text-3xl sm:text-4xl font-black tracking-widest mb-3"
          style={{
            color: '#ffd36b',
            textShadow: '0 0 28px rgba(255,200,100,0.65)',
            letterSpacing: '0.12em',
          }}>
          {aura.name}
        </h2>

        {/* Identity */}
        <p className="text-xl font-semibold tracking-widest mb-8 opacity-90">
          {identity}
        </p>

        {/* Narrative */}
        <p className="text-sm leading-[1.85] whitespace-pre-line text-[#e8ebff]/75 mb-8 text-left">
          {narrative}
        </p>

        {/* Stats row */}
        <div className="flex justify-center gap-4 mb-8">
          <StatPill label="Score" value={totalScore} />
          <StatPill label="Stress" value={systemStress} />
          <StatPill label="Months" value={decisionLog.length} />
        </div>

        {/* Scoreboard */}
        <div
          className="rounded-2xl px-6 py-5 mb-8 text-left"
          style={{ background: 'rgba(255,255,255,0.05)' }}>
          <p className="text-xs tracking-widest uppercase opacity-40 mb-3">
            Final Scoreboard
          </p>
          <p className="text-lg font-bold">
            {teamName}
            <span className="opacity-60 font-normal ml-2">
              — {totalScore} pts
            </span>
          </p>
        </div>

        {/* Play again / reset */}
        {confirmReset ? (
          <ResetConfirm
            onConfirm={handleReset}
            onCancel={() => setConfirmReset(false)}
          />
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="px-10 py-3 rounded-full font-semibold tracking-wide text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #6f78ff, #c08bff)',
              boxShadow: '0 0 14px rgba(160,160,255,0.35)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 0 22px rgba(190,190,255,0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow =
                '0 0 14px rgba(160,160,255,0.35)';
            }}>
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}
