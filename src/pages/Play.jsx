// src/pages/Play.jsx

import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@stores/useGameStore';
import { usePhaseTimer } from '@hooks/usePhaseTimer';
import { scenarios } from '@config/constants';
import GameGuard from '@components/common/GameGuard';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TimerBar({ progress, timeLeft, phase, PHASE_META }) {
  const isUrgent = timeLeft <= 10 && timeLeft > 0;
  const barColor = isUrgent ? '#ef4444' : phase === 3 ? '#ffd36b' : '#6f78ff';

  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-xs tracking-widest opacity-70 whitespace-nowrap uppercase">
        {PHASE_META[phase].emoji} {PHASE_META[phase].label}
      </span>
      <div
        className="flex-1 h-0.75 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.1)' }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: barColor,
            transition: 'width 1s linear, background 0.3s ease',
          }}
        />
      </div>
      <span
        className="text-xs font-mono w-8 text-right tabular-nums"
        style={{ color: isUrgent ? '#ef4444' : 'rgba(255,255,255,0.6)' }}>
        {timeLeft}s
      </span>
    </div>
  );
}

function IntelSection({ intel, intelRevealed, onReveal }) {
  const usedCount = intelRevealed.length;
  const isMaxed = usedCount >= 3;

  return (
    <div
      className="mt-8 pt-6"
      style={{ borderTop: '1px solid rgba(180,180,255,0.15)' }}>
      <p
        className="text-xs tracking-widest uppercase mb-4"
        style={{ color: '#ffd36b' }}>
        Additional Intelligence — Choose {3 - usedCount} more
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        {intel.map((item, i) => {
          const isRevealed = intelRevealed.some(
            (r) => r.headline === item.headline,
          );
          const canClick = !isRevealed && !isMaxed;

          return (
            <button
              key={i}
              disabled={!canClick}
              onClick={() => canClick && onReveal(item)}
              className="px-4 py-2 rounded-2xl text-sm transition-all duration-200 text-left"
              style={{
                background: isRevealed
                  ? 'rgba(255,211,107,0.08)'
                  : 'rgba(255,255,255,0.07)',
                border: `1px solid ${isRevealed ? 'rgba(255,211,107,0.25)' : 'rgba(180,180,255,0.2)'}`,
                color: isRevealed ? '#ffd36b' : '#e8ebff',
                opacity: !canClick && !isRevealed ? 0.35 : 1,
                cursor: canClick ? 'pointer' : 'default',
              }}>
              {item.headline}
            </button>
          );
        })}
      </div>

      {intelRevealed.length > 0 && (
        <div className="space-y-2">
          {intelRevealed.map((item, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed"
              style={{ color: '#d6daff' }}>
              <span style={{ color: '#ffd36b' }}>•</span> {item.body}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function OptionsSection({ options, selectedOption, onSelect }) {
  return (
    <div
      className="mt-8 pt-6"
      style={{ borderTop: '1px solid rgba(180,180,255,0.15)' }}>
      <p className="text-xs tracking-widest uppercase mb-4 opacity-60">
        Select your decision
      </p>
      {options.map((opt, i) => {
        const isSelected = selectedOption === i;
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className="block w-full text-left px-6 py-5 rounded-2xl mb-3 transition-all duration-200"
            style={{
              background: isSelected
                ? 'linear-gradient(135deg, #ffd36b, #ff9f43)'
                : 'rgba(255,255,255,0.07)',
              border: `1px solid ${isSelected ? 'transparent' : 'rgba(180,180,255,0.2)'}`,
              color: isSelected ? '#1a1405' : '#e8ebff',
              boxShadow: isSelected ? '0 0 20px rgba(255,180,80,0.45)' : 'none',
              transform: isSelected ? 'translateY(-1px)' : 'none',
            }}>
            {opt.text}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Resume dialog — shown before timer starts on every scenario load.
// On a fresh session this acts as a "ready?" gate.
// On a browser-reopen mid-scenario it warns the user they're resuming.
// ---------------------------------------------------------------------------

function ResumeDialog({ month, total, teamName, isResuming, onStart }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{
        background: 'rgba(5, 7, 19, 0.85)',
        backdropFilter: 'blur(8px)',
      }}>
      <div
        className="w-full max-w-md text-center rounded-[28px] px-10 py-12"
        style={{
          background:
            'linear-gradient(135deg, rgba(80,90,255,0.28), rgba(120,80,255,0.18))',
          boxShadow: '0 0 60px rgba(120,120,255,0.3)',
          border: '1px solid rgba(180,180,255,0.15)',
        }}>
        {isResuming && (
          <p
            className="text-xs tracking-widest uppercase mb-4 px-3 py-1 rounded-full inline-block"
            style={{ background: 'rgba(255,211,107,0.15)', color: '#ffd36b' }}>
            ⚠ Session Restored
          </p>
        )}

        <h2 className="text-2xl font-black tracking-widest mb-2">
          Scenario {month}{' '}
          <span className="opacity-40 font-normal text-base">/ {total}</span>
        </h2>

        <p className="text-sm opacity-50 mb-8">
          {isResuming
            ? `Welcome back, ${teamName}. Your progress has been restored. The timer will start when you're ready.`
            : `The timer starts the moment you begin. Make sure your team is ready.`}
        </p>

        <button
          onClick={onStart}
          className="px-12 py-3 rounded-full font-semibold tracking-widest text-white uppercase text-sm transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #6f78ff, #c08bff)',
            boxShadow: '0 0 14px rgba(160,160,255,0.35)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0 22px rgba(190,190,255,0.55)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '0 0 14px rgba(160,160,255,0.35)';
          }}>
          {isResuming ? 'Resume' : 'Begin'}
        </button>
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
  const scenario = scenarios[currentMonth - 1];

  // --- Resume state detection ---
  // Three cases, resolved once on mount:
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

  // timerEnabled starts true only for fresh games; otherwise blocked until dialog dismissed
  const [timerEnabled, setTimerEnabled] = useState(dialogMode === 'none');
  const [selectedOption, setSelectedOption] = useState(null);
  const [intelRevealed, setIntelRevealed] = useState([]);

  // Guard: if pendingReveal is already true when Play mounts, the user closed
  // the tab after the timer fired but before clicking "Proceed". Send them
  // straight back to the reveal for this month.
  useEffect(() => {
    if (pendingReveal) {
      navigate('/reveal', { replace: true });
    }
  }, [pendingReveal, navigate]);

  // Guard: prevent recordDecision from firing more than once per scenario
  // (React StrictMode double-invokes effects in development)
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
    // Block double-fire from StrictMode or any other re-invoke
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

  const {
    phase,
    timeLeft,
    progress,
    isPhase2,
    isPhase3,
    PHASE_META,
    PHASE_DURATIONS,
  } = usePhaseTimer({
    onPhaseComplete: handlePhaseComplete,
    enabled: timerEnabled,
  });

  const handleStart = () => {
    try {
      sessionStorage.setItem('decision-lab-session', '1');
    } catch {
      /* ignore */
    }
    setTimerEnabled(true);
  };

  if (!scenario || pendingReveal) return null;

  return (
    <div className="min-h-screen py-10 px-4">
      {/* Resume / ready dialog — only shown when dialogMode is not 'none' */}
      {!timerEnabled && dialogMode !== 'none' && (
        <ResumeDialog
          month={currentMonth}
          total={scenarios.length}
          teamName={teamName}
          isResuming={dialogMode === 'resuming'}
          onStart={handleStart}
        />
      )}

      <div
        className="max-w-3xl mx-auto rounded-[34px] px-8 py-10"
        style={{
          backdropFilter: 'blur(18px)',
          background:
            'linear-gradient(135deg, rgba(80,90,255,0.20), rgba(120,80,255,0.12))',
          boxShadow: '0 0 40px rgba(120,120,255,0.18)',
        }}>
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5 text-xs tracking-widest opacity-60 uppercase">
          <span>{teamName}</span>
          <span>
            Scenario {currentMonth} / {scenarios.length}
          </span>
        </div>

        {/* Timer */}
        <TimerBar
          progress={progress}
          timeLeft={timeLeft}
          phase={phase}
          PHASE_META={PHASE_META}
        />

        {/* Phase label */}
        <p className="text-xs tracking-widest uppercase opacity-40 mb-5">
          {phase === 1 &&
            `Phase 1 of 3 — Read the case (${PHASE_DURATIONS[1]}s)`}
          {phase === 2 &&
            `Phase 2 of 3 — Gather intel (${PHASE_DURATIONS[2]}s)`}
          {phase === 3 &&
            `Phase 3 of 3 — Make your decision (${PHASE_DURATIONS[3]}s)`}
        </p>

        {/* Month title */}
        <h2
          className="text-2xl font-bold mb-6"
          style={{ letterSpacing: '0.05em' }}>
          {scenario.title}
        </h2>

        {/* Narrative */}
        <div className="leading-[1.8] whitespace-pre-line text-[#e8ebff]/85 text-sm sm:text-base">
          {scenario.narrative}
        </div>

        {/* Intel section — visible in phase 2 and 3 */}
        {(isPhase2 || isPhase3) && (
          <IntelSection
            intel={scenario.intel}
            intelRevealed={intelRevealed}
            onReveal={handleRevealIntel}
          />
        )}

        {/* Options — visible in phase 3 only */}
        {isPhase3 && (
          <OptionsSection
            options={scenario.options}
            selectedOption={selectedOption}
            onSelect={handleSelectOption}
          />
        )}

        {/* Footer watermark */}
        <p className="text-center text-xs tracking-widest opacity-15 mt-10">
          {teamName}
        </p>
      </div>
    </div>
  );
}
