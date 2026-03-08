// src/components/game/ScoreHeader.jsx

import { Badge } from '@components/ui/badge';
import { cn } from '@/lib/utils';

/**
 * Score display rendered at the top of the Reveal page.
 * Shows the earned points in a large typographic treatment plus a
 * short contextual feedback badge.
 *
 * Props:
 *   points     — points earned for this decision (0–10)
 *   maxPoints  — maximum points possible (default 10)
 */
export default function ScoreHeader({ points, maxPoints = 10 }) {
  const isBrilliant = points === maxPoints;
  const isBad = points === 0;

  const feedback = isBrilliant
    ? 'Strategically brilliant.'
    : points >= 7
      ? 'Strong decision — a better path exists.'
      : points > 0
        ? 'You improved, but there was a better path.'
        : 'Warning: this decision is alarming.';

  return (
    <div className="text-center space-y-3 py-2 font-game">
      {/* Points */}
      <div
        className={cn(
          'text-6xl sm:text-7xl font-black tracking-tight',
          isBrilliant
            ? 'text-game-accent'
            : isBad
              ? 'text-destructive'
              : 'text-primary',
        )}>
        +{points}
      </div>

      {/* Feedback badge */}
      <div className="flex justify-center">
        <Badge
          variant="outline"
          className={cn(
            'text-xs tracking-widest uppercase font-semibold font-game px-4 py-1',
            isBrilliant
              ? 'border-game-accent/40 text-game-accent bg-game-accent/5'
              : isBad
                ? 'border-destructive/40 text-destructive bg-destructive/5'
                : 'border-border text-muted-foreground',
          )}>
          {feedback}
        </Badge>
      </div>
    </div>
  );
}
