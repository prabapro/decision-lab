// src/pages/Results.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@stores/useGameStore';
import { scenarios } from '@config/constants';
import {
  getAuraTier,
  generateLeadershipProfile,
  buildNarrative,
} from '@utils/scoreUtils';
import GameGuard from '@components/common/GameGuard';
import AnimatedBorderCard from '@components/common/AnimatedBorderCard';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { RotateCcw, Trophy, ShieldAlert } from 'lucide-react';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatTile({ label, value }) {
  return (
    <div className="flex flex-col items-center px-6 py-4 rounded-xl bg-muted/40 border border-border/40 font-game flex-1">
      <span className="text-2xl font-bold text-foreground">{value}</span>
      <span className="text-[10px] tracking-widest uppercase text-muted-foreground mt-1">
        {label}
      </span>
    </div>
  );
}

function ResetConfirm({ onConfirm, onCancel }) {
  return (
    <div className="space-y-4 font-game">
      <p className="text-sm text-muted-foreground text-center">
        This will erase all progress. Are you sure?
      </p>
      <div className="flex gap-3 justify-center">
        <Button
          variant="destructive"
          size="sm"
          onClick={onConfirm}
          className="gap-1.5 font-game">
          <RotateCcw className="w-3.5 h-3.5" />
          Yes, Reset
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="font-game">
          Cancel
        </Button>
      </div>
    </div>
  );
}

/**
 * Renders the narrative string as individual paragraphs, each preceded by
 * a small accent bullet. Empty lines in the whitespace-split are skipped
 * so the double-newlines in buildNarrative become natural visual gaps.
 */
function NarrativeBlock({ text }) {
  const paragraphs = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="border border-accent-foreground/20 rounded-lg bg-accent-foreground/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-accent-foreground/15 bg-accent-foreground/8">
        <ShieldAlert className="w-3.5 h-3.5 text-accent-foreground shrink-0" />
        <span className="text-[10px] font-black tracking-[0.25em] uppercase text-accent-foreground select-none">
          Leadership Assessment
        </span>
      </div>

      {/* Paragraphs */}
      <div className="px-5 py-5 space-y-3">
        {paragraphs.map((para, i) => (
          <p
            key={i}
            className="text-sm leading-relaxed text-foreground/70 flex gap-3">
            <span className="text-accent-foreground/50 mt-0.5 shrink-0 font-bold select-none text-xs">
              {String(i + 1).padStart(2, '0')}
            </span>
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
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
    totalScore,
    decisionLog,
    systemStress,
    regretCount,
    redemptionCount,
    resetGame,
  } = useGameStore();

  const [confirmReset, setConfirmReset] = useState(false);

  const scenarioCount = scenarios.length;
  const aura = getAuraTier(totalScore);
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
  });

  const handleReset = () => {
    resetGame();
    navigate('/', { replace: true });
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 font-game">
      <AnimatedBorderCard
        className="w-full max-w-6xl shadow-2xl"
        innerClassName="p-8 sm:p-12 space-y-8">
        {/* ── Aura / Identity ──────────────────────────────────────────── */}
        <div className="text-center space-y-4">
          {/* Eyebrow */}
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold">
            Leadership Aura
          </p>

          {/* Aura name */}
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-game-accent">
            {aura.name}
          </h2>

          {/* Identity badge */}
          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="border-game-accent/30 text-game-accent bg-game-accent/10 text-xs tracking-widest uppercase font-semibold font-game px-4 py-1">
              <Trophy className="w-3 h-3 mr-1.5" />
              {identity}
            </Badge>
          </div>
        </div>

        {/* ── Stats row ────────────────────────────────────────────────── */}
        <div className="flex gap-3">
          <StatTile
            label="Score"
            value={`${totalScore} / ${scenarioCount * 10}`}
          />
          <StatTile label="Sys. Stress" value={systemStress} />
          <StatTile label="Months" value={decisionLog.length} />
        </div>

        {/* ── Divider ──────────────────────────────────────────────────── */}
        <div className="h-px bg-border/40" />

        {/* ── Narrative ────────────────────────────────────────────────── */}
        <NarrativeBlock text={narrative} />

        {/* ── Play again / Reset ───────────────────────────────────────── */}
        <div className="flex justify-center pt-2">
          {confirmReset ? (
            <ResetConfirm
              onConfirm={handleReset}
              onCancel={() => setConfirmReset(false)}
            />
          ) : (
            <Button
              size="lg"
              onClick={() => setConfirmReset(true)}
              className="gap-2 font-semibold tracking-widest uppercase text-sm font-game px-10">
              <RotateCcw className="w-4 h-4" />
              Play Again
            </Button>
          )}
        </div>
      </AnimatedBorderCard>
    </div>
  );
}
