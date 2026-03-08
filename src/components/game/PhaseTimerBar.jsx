// src/components/game/PhaseTimerBar.jsx

import { cn } from '@/lib/utils';
import { PHASE_META } from '@config/constants';

/**
 * Horizontal phase timer bar.
 * Displays the current phase emoji+label, an animated progress track, and the live countdown.
 * Rendered inside GameHeader via the useGameUIStore activeTimer state.
 *
 * Props:
 *   phase     — current phase number (1 | 2 | 3)
 *   timeLeft  — seconds remaining in the current phase
 *   progress  — 0–100 percentage of time elapsed in the current phase
 */
export default function PhaseTimerBar({ phase, timeLeft, progress }) {
  const isUrgent = timeLeft <= 10 && timeLeft > 0;
  const meta = PHASE_META[phase];

  const trackColor = isUrgent
    ? 'bg-destructive'
    : phase === 3
      ? 'bg-game-accent'
      : 'bg-primary';

  return (
    <div className="flex items-center gap-3 font-game">
      {/* Phase label */}
      <span
        className={cn(
          'text-xs tracking-widest uppercase whitespace-nowrap font-semibold shrink-0',
          isUrgent ? 'text-destructive' : 'text-muted-foreground',
        )}>
        {meta.emoji} <span className="hidden sm:inline">{meta.label}</span>
      </span>

      {/* Progress track */}
      <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
        <div
          className={cn('h-full rounded-full', trackColor)}
          style={{
            width: `${progress}%`,
            transition: 'width 1s linear, background-color 0.3s ease',
          }}
        />
      </div>

      {/* Countdown */}
      <span
        className={cn(
          'text-xs font-mono w-8 text-right tabular-nums font-semibold shrink-0',
          isUrgent ? 'text-destructive' : 'text-muted-foreground',
        )}>
        {timeLeft}s
      </span>
    </div>
  );
}
