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
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { RotateCcw, Trophy } from 'lucide-react';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatPill({ label, value }) {
  return (
    <div className="flex flex-col items-center px-5 py-3 rounded-xl bg-muted/40 border border-border/40 font-game min-w-18">
      <span className="text-xl font-bold text-foreground">{value}</span>
      <span className="text-[10px] tracking-widest uppercase text-muted-foreground mt-0.5">
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
    totalScore,
    scenarioCount: scenarios.length,
  });

  const handleReset = () => {
    resetGame();
    navigate('/', { replace: true });
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl font-game">
      {/* ── Aura / Identity card ─────────────────────────────────────────── */}
      <Card className="mb-6 shadow-lg border-game-accent/20 bg-game-accent/5">
        <CardContent className="p-8 sm:p-10 text-center space-y-4">
          {/* Eyebrow */}
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold">
            Your Leadership Aura
          </p>

          {/* Aura name */}
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-game-accent">
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

          {/* Divider */}
          <div className="h-px bg-border/40 my-2" />

          {/* Narrative */}
          <p className="text-sm leading-[1.9] whitespace-pre-line text-foreground/70 text-left">
            {narrative}
          </p>
        </CardContent>
      </Card>

      {/* ── Stats row ───────────────────────────────────────────────────── */}
      <div className="flex justify-center gap-3 mb-6">
        <StatPill label="Score" value={totalScore} />
        <StatPill label="Stress" value={systemStress} />
        <StatPill label="Months" value={decisionLog.length} />
      </div>

      {/* ── Scoreboard card ──────────────────────────────────────────────── */}
      <Card className="mb-6 border-border/40 shadow-sm">
        <CardContent className="p-5 sm:p-6">
          <p className="text-xs tracking-widest uppercase text-muted-foreground/60 mb-3 font-semibold font-game">
            Final Scoreboard
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              {teamName}
            </span>
            <span className="text-muted-foreground text-sm">
              — {totalScore} pts
            </span>
          </div>
        </CardContent>
      </Card>

      {/* ── Play again / Reset ───────────────────────────────────────────── */}
      <div className="flex justify-center">
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
    </div>
  );
}
