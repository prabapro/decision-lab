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
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/40">
          Intel &amp; Decisions
        </p>
        <p className="text-xs text-muted-foreground/30">Unlocks in Phase 2</p>
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
  const { currentMonth, teamName, recordDecision, pendingReveal, decisionLog } =
    useGameStore();
  const { setActiveTimer, clearActiveTimer } = useGameUIStore();
  const scenario = scenarios[currentMonth - 1];

  // ── Resume state detection ───────────────────────────────────────────────
  // Three cases resolved once on mount:
  //   'none'     → fresh game month 1, no decisions yet → skip dialog, start immediately
  //   'ready'    → natural scenario-to-scenario navigation (sessionStorage key present)
  //   'resuming' → browser was closed and reopened mid-game (no sessionStorage key)
  const dialogMode = (() => {
    const isFreshStart = currentMonth === 1 && decisionLog.length === 0;
    if (isFreshStart) return 'none';
    try {
      return sessionStorage.getItem('decision-lab-session')
        ? 'ready'
        : 'resuming';
    } catch {
      return 'resuming';
    }
  })();

  // timerEnabled starts true only for fresh first-scenario games; blocked until dialog dismissed
  const [timerEnabled, setTimerEnabled] = useState(dialogMode === 'none');
  const [selectedOption, setSelectedOption] = useState(null);
  const [intelRevealed, setIntelRevealed] = useState([]);

  // Guard: if pendingReveal is already true when Play mounts, send straight to reveal
  useEffect(() => {
    if (pendingReveal) {
      navigate('/reveal', { replace: true });
    }
  }, [pendingReveal, navigate]);

  // Guard: prevent recordDecision from firing more than once per scenario
  const hasDecided = useRef(false);
  // Ref to avoid stale closure inside the timer callback
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

  // ── Sync timer state to GameHeader via useGameUIStore ───────────────────
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

  // Clear timer from header when this page unmounts (navigating away)
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

  const phaseLabel =
    phase === 1
      ? `Phase 1 of 3 — Read the case (${PHASE_DURATIONS[1]}s)`
      : phase === 2
        ? `Phase 2 of 3 — Gather intel (${PHASE_DURATIONS[2]}s)`
        : `Phase 3 of 3 — Make your decision (${PHASE_DURATIONS[3]}s)`;

  return (
    <div className="container mx-auto px-4 py-6 font-game">
      {/* ── Resume / ready dialog ────────────────────────────────────────── */}
      {!timerEnabled && dialogMode !== 'none' && (
        <ResumeDialog
          month={currentMonth}
          total={scenarios.length}
          teamName={teamName}
          isResuming={dialogMode === 'resuming'}
          onStart={handleStart}
        />
      )}

      {/* ── Phase label row ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-5">
        <p className="text-xs tracking-widest uppercase text-muted-foreground/60 font-medium">
          {phaseLabel}
        </p>
        {(isPhase2 || isPhase3) && (
          <Badge
            variant="outline"
            className={
              isPhase3
                ? 'border-game-accent/40 text-game-accent text-[10px] tracking-widest uppercase font-semibold font-game'
                : 'border-primary/30 text-primary text-[10px] tracking-widest uppercase font-semibold font-game'
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
            <div className="text-sm leading-[1.9] whitespace-pre-line text-foreground/80 font-game">
              {scenario.narrative}
            </div>
          </CardContent>
        </Card>

        {/* Right column: Intel (phase 2+) → Options (phase 3) */}
        <div className="space-y-4">
          {/* Phase 1 placeholder — desktop only, dims out once phase 2 starts */}
          {!isPhase2 && !isPhase3 && <Phase1Placeholder />}

          {/* Intel section — appears in phase 2 and stays visible in phase 3 */}
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

          {/* Options section — appears only in phase 3 */}
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

      {/* Footer watermark */}
      <p className="text-center text-xs tracking-widest text-muted-foreground/20 mt-10 font-game">
        {teamName}
      </p>
    </div>
  );
}
