// src/pages/Play.jsx

import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@stores/useGameStore';
import { useGameUIStore } from '@stores/useGameUIStore';
import { usePhaseTimer } from '@hooks/usePhaseTimer';
import { scenarios } from '@config/constants';
import GameGuard from '@components/common/GameGuard';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import ResumeDialog from '@components/game/ResumeDialog';
import IntelSection from '@components/game/IntelSection';
import OptionsSection from '@components/game/OptionsSection';
import { Clock } from 'lucide-react';

// ---------------------------------------------------------------------------
// Phase 1 placeholder — shown on lg+ while Intel/Options haven't unlocked yet
// ---------------------------------------------------------------------------

function Phase1Placeholder() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center min-h-56 rounded-xl border border-dashed border-border/30 bg-muted/10 text-center p-8 space-y-3 font-game">
      <div className="w-10 h-10 rounded-full bg-muted/40 flex items-center justify-center">
        <Clock className="w-5 h-5 text-muted-foreground/40" />
      </div>
      <div className="space-y-1">
        {/* game-label token */}
        <p className="game-label text-muted-foreground/40">
          Intel &amp; Decisions
        </p>
        <p className="text-sm text-muted-foreground/30">Unlocks in Phase 2</p>
      </div>
      {/* Skeleton preview rows */}
      <div className="w-full max-w-50 space-y-2 opacity-20 pt-2">
        {[3, 4, 2].map((w, i) => (
          <div
            key={i}
            className="h-2 bg-muted rounded-full"
            style={{ width: `${w * 20}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page (wrapped in GameGuard)
// ---------------------------------------------------------------------------

export default function Play() {
  const currentMonth = useGameStore((s) => s.currentMonth);
  return (
    <GameGuard
      requiredStatus="playing"
      redirectMap={{ ended: '/results', idle: '/' }}>
      {/* key=currentMonth forces a full remount on each new scenario,
          so all useState initializers re-run correctly — no manual reset needed */}
      <PlayContent key={currentMonth} />
    </GameGuard>
  );
}

function PlayContent() {
  const navigate = useNavigate();
  const { currentMonth, teamName, recordDecision, pendingReveal } =
    useGameStore();
  const { setActiveTimer, clearActiveTimer } = useGameUIStore();
  const scenario = scenarios[currentMonth - 1];

  // ── Resume state detection ───────────────────────────────────────────────
  const dialogMode = (() => {
    try {
      return sessionStorage.getItem('decision-lab-session')
        ? 'ready'
        : 'resuming';
    } catch {
      return 'resuming';
    }
  })();

  const [timerEnabled, setTimerEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [intelRevealed, setIntelRevealed] = useState([]);

  useEffect(() => {
    if (pendingReveal) {
      navigate('/reveal', { replace: true });
    }
  }, [pendingReveal, navigate]);

  const hasDecided = useRef(false);
  const selectedOptionRef = useRef(null);

  const handleSelectOption = (index) => {
    setSelectedOption(index);
    selectedOptionRef.current = index;
  };

  const handleRevealIntel = (item) => {
    setIntelRevealed((prev) => [...prev, item]);
  };

  const handlePhaseComplete = useCallback(() => {
    if (hasDecided.current) return;
    hasDecided.current = true;

    const idx = selectedOptionRef.current;
    const meta =
      idx !== null
        ? scenario.options[idx].meta
        : {
            points: 0,
            risk: 'cautious',
            ethics: 'low',
            time: 'delay',
            reality: 'ideological',
          };

    recordDecision(currentMonth, idx, meta);
    navigate('/reveal');
  }, [scenario, currentMonth, recordDecision, navigate]);

  const { phase, timeLeft, progress, isPhase2, isPhase3, PHASE_DURATIONS } =
    usePhaseTimer({
      onPhaseComplete: handlePhaseComplete,
      enabled: timerEnabled,
    });

  useEffect(() => {
    if (timerEnabled && !pendingReveal) {
      setActiveTimer({ phase, timeLeft, progress });
    } else {
      clearActiveTimer();
    }
  }, [
    phase,
    timeLeft,
    progress,
    timerEnabled,
    pendingReveal,
    setActiveTimer,
    clearActiveTimer,
  ]);

  useEffect(() => {
    return () => clearActiveTimer();
  }, [clearActiveTimer]);

  const handleStart = () => {
    try {
      sessionStorage.setItem('decision-lab-session', '1');
    } catch {
      /* ignore */
    }
    setTimerEnabled(true);
  };

  if (!scenario || pendingReveal) return null;

  // Phase label text
  const phaseLabel =
    phase === 1
      ? `Phase 1 of 3 — Read the case (${PHASE_DURATIONS[1]}s)`
      : phase === 2
        ? `Phase 2 of 3 — Gather intel (${PHASE_DURATIONS[2]}s)`
        : `Phase 3 of 3 — Make your decision (${PHASE_DURATIONS[3]}s)`;

  return (
    <div className="container mx-auto px-4 py-6 font-game">
      {/* ── Resume / ready dialog ────────────────────────────────────────── */}
      {!timerEnabled && (
        <ResumeDialog
          month={currentMonth}
          total={scenarios.length}
          teamName={teamName}
          isResuming={dialogMode === 'resuming'}
          onStart={handleStart}
        />
      )}

      {/* ── Phase label row — game-label token ──────────────────────────── */}
      <div className="flex items-center gap-3 mb-5">
        <p className="game-label text-muted-foreground/60">{phaseLabel}</p>
        {(isPhase2 || isPhase3) && (
          <Badge
            variant="outline"
            className={
              isPhase3
                ? 'game-badge-text border-game-accent/40 text-game-accent font-game'
                : 'game-badge-text border-primary/30 text-primary font-game'
            }>
            {isPhase3 ? '⚡ Decide Now' : '🧠 Gather Intel'}
          </Badge>
        )}
      </div>

      {/* ── Two-column grid ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
        {/* Left column: Scenario narrative — sticky on large screens */}
        <Card className="lg:sticky lg:top-14.25 border-border/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold tracking-tight text-foreground font-game leading-snug">
              {scenario.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* game-narrative token (text-base leading-[1.9] whitespace-pre-line) */}
            <div className="game-narrative text-foreground/80 font-game">
              {scenario.narrative}
            </div>
          </CardContent>
        </Card>

        {/* Right column: Intel (phase 2+) → Options (phase 3) */}
        <div className="space-y-4">
          {!isPhase2 && !isPhase3 && <Phase1Placeholder />}

          {(isPhase2 || isPhase3) && (
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-5">
                <IntelSection
                  intel={scenario.intel}
                  intelRevealed={intelRevealed}
                  onReveal={handleRevealIntel}
                />
              </CardContent>
            </Card>
          )}

          {isPhase3 && (
            <Card className="border-primary/20 shadow-sm bg-primary/2">
              <CardContent className="p-5">
                <OptionsSection
                  options={scenario.options}
                  selectedOption={selectedOption}
                  onSelect={handleSelectOption}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
