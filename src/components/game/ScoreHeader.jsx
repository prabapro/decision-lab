// src/components/game/ScoreHeader.jsx

import { Badge } from '@components/ui/badge';
import { cn } from '@/lib/utils';
import {
  getScoreTextColor,
  getScoreBadgeColor,
  getScoreFeedback,
} from '@utils/scoreUtils';

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
  return (
    <div className="text-center space-y-3 py-2 font-game">
      {/* Points */}
      <div
        className={cn(
          'text-6xl sm:text-7xl font-black tracking-tight',
          getScoreTextColor(points, maxPoints),
        )}>
        +{points}
      </div>

      {/* Feedback badge */}
      <div className="flex justify-center">
        <Badge
          variant="outline"
          className={cn(
            'text-xs tracking-widest uppercase font-semibold font-game px-4 py-1',
            getScoreBadgeColor(points, maxPoints),
          )}>
          {getScoreFeedback(points, maxPoints)}
        </Badge>
      </div>
    </div>
  );
}
