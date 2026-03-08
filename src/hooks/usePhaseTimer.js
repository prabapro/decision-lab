// src/hooks/usePhaseTimer.js

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';
import { PHASE_DURATIONS, PHASE_META } from '@config/constants';

/**
 * Manages the three-phase countdown timer for each scenario.
 *
 * Phase 1 (90s): Player reads the case narrative.
 * Phase 2 (30s): Player selects up to 3 intel items.
 * Phase 3 (25s): Player locks in their decision.
 *
 * When phase 3 expires, `onPhaseComplete` is fired.
 */
export function usePhaseTimer({ onPhaseComplete, enabled = true }) {
  const [phase, setPhase] = useState(1);
  const [timeLeft, setTimeLeft] = useState(PHASE_DURATIONS[1]);

  // Refs used to avoid stale closures inside timer callbacks
  const phaseRef = useRef(1);
  const onCompleteRef = useRef(onPhaseComplete);

  // Keep callback ref current on every render without triggering effects
  useLayoutEffect(() => {
    onCompleteRef.current = onPhaseComplete;
  });

  /**
   * Advances to the next phase, or fires the completion callback on phase 3 end.
   * Stable identity (empty deps) — safe to use in timer effects.
   */
  const goToNextPhase = useCallback(() => {
    const next = phaseRef.current + 1;
    if (next > 3) {
      onCompleteRef.current?.();
    } else {
      phaseRef.current = next;
      setPhase(next);
      setTimeLeft(PHASE_DURATIONS[next]);
    }
  }, []);

  /**
   * Resets timer back to Phase 1. Call this when loading a new scenario.
   */
  const reset = useCallback(() => {
    phaseRef.current = 1;
    setPhase(1);
    setTimeLeft(PHASE_DURATIONS[1]);
  }, []);

  // Tick down once per second
  useEffect(() => {
    if (!enabled || timeLeft <= 0) return;

    const id = setTimeout(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearTimeout(id);
  }, [timeLeft, enabled]);

  // When timeLeft hits 0, advance the phase
  useEffect(() => {
    if (timeLeft === 0 && enabled) {
      goToNextPhase();
    }
  }, [timeLeft, enabled, goToNextPhase]);

  return {
    phase,
    timeLeft,
    progress: timeLeft === 0 ? 0 : (timeLeft / PHASE_DURATIONS[phase]) * 100,
    isPhase1: phase === 1,
    isPhase2: phase === 2,
    isPhase3: phase === 3,
    goToNextPhase,
    reset,
    PHASE_META,
    PHASE_DURATIONS,
  };
}
