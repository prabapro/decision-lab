// src/components/game/IntelSection.jsx

import { Badge } from '@components/ui/badge';
import { cn } from '@/lib/utils';

/**
 * Intelligence gathering panel shown during Phase 2 and 3.
 * Players can reveal up to 3 out of 5 intel items before making their decision.
 *
 * Props:
 *   intel         — array of { headline, body } objects from the scenario
 *   intelRevealed — array of already-revealed intel items
 *   onReveal      — callback(item) called when a player clicks an unrevealed item
 */
export default function IntelSection({ intel, intelRevealed, onReveal }) {
  const usedCount = intelRevealed.length;
  const isMaxed = usedCount >= 3;

  return (
    <div className="space-y-4 font-game">
      {/* Header row — game-label token */}
      <div className="flex items-center justify-between">
        <p className="game-label text-game-accent">Intelligence Briefing</p>
        {/* game-badge-text token */}
        <Badge
          variant="outline"
          className="game-badge-text font-game border-game-accent/30 text-game-accent">
          {3 - usedCount} of 3 remaining
        </Badge>
      </div>

      {/* Intel toggle buttons — bumped from text-xs to text-sm */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
              className={cn(
                'px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all duration-200 border font-game',
                isRevealed
                  ? 'bg-game-accent/10 border-game-accent/30 text-game-accent cursor-default'
                  : canClick
                    ? 'bg-card border-border/50 text-foreground hover:bg-accent hover:border-border active:scale-[0.98]'
                    : 'bg-muted/20 border-border/20 text-muted-foreground/40 cursor-not-allowed',
              )}>
              {item.headline}
            </button>
          );
        })}
      </div>

      {/* Revealed intel content — game-body token (text-base leading-relaxed) */}
      {intelRevealed.length > 0 && (
        <div className="space-y-2.5 pt-1 border-t border-border/30">
          {intelRevealed.map((item, i) => (
            <div key={i} className="flex gap-2.5 game-body text-foreground/80">
              <span className="text-game-accent mt-0.5 shrink-0 font-bold">
                •
              </span>
              <span>{item.body}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
