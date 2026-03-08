// src/components/game/GameHeader.jsx

import { Link } from 'react-router-dom';
import { useGameStore } from '@stores/useGameStore';
import { useGameUIStore } from '@stores/useGameUIStore';
import { scenarios } from '@config/constants';
import { Badge } from '@components/ui/badge';
import { ThemeToggle } from '@components/ui/theme-toggle';
import PhaseTimerBar from './PhaseTimerBar';
import { cn } from '@/lib/utils';

/**
 * Sticky header rendered inside GameLayout for all game routes.
 *
 * — Always shows: logo link, team name (when set), scenario counter
 * — Conditionally shows: Live/Complete status badge, phase timer bar
 *
 * The timer bar appears only when Play.jsx has written an activeTimer
 * to useGameUIStore. It auto-clears when Play.jsx unmounts.
 */
export default function GameHeader() {
  const { teamName, currentMonth, gameStatus } = useGameStore();
  const { activeTimer } = useGameUIStore();

  const showScenarioInfo = gameStatus !== 'idle';

  return (
    <header
      className={cn(
        'sticky top-0 z-40 font-game',
        'border-b border-border/40',
        'bg-background/80 backdrop-blur-md',
        'supports-backdrop-filter:bg-background/60',
      )}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* ── Main row ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Left: logo */}
          <Link
            to="/"
            className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-200 shrink-0"
            aria-label="The Decision Lab — Home">
            <img
              src="/images/decision-lab.svg"
              alt="The Decision Lab Logo"
              className="h-7 w-auto"
            />
          </Link>

          {/* Center: team + scenario */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 justify-center">
            {teamName && (
              <span className="font-semibold text-sm text-foreground truncate max-w-30 sm:max-w-xs">
                {teamName}
              </span>
            )}

            {teamName && showScenarioInfo && (
              <span className="text-border/60 shrink-0 hidden sm:inline">
                ·
              </span>
            )}

            {showScenarioInfo && (
              <span className="text-xs text-muted-foreground whitespace-nowrap font-medium shrink-0">
                Scenario{' '}
                <span className="text-foreground font-semibold">
                  {currentMonth}
                </span>
                <span className="text-muted-foreground/40">
                  {' '}
                  / {scenarios.length}
                </span>
              </span>
            )}
          </div>

          {/* Right: status badge + theme toggle */}
          <div className="shrink-0 flex items-center gap-2">
            {gameStatus === 'playing' && (
              <Badge
                variant="outline"
                className="text-[10px] tracking-widest uppercase font-semibold border-primary/30 text-primary font-game hidden sm:inline-flex">
                Live
              </Badge>
            )}
            {gameStatus === 'ended' && (
              <Badge
                variant="outline"
                className="text-[10px] tracking-widest uppercase font-semibold border-game-accent/40 text-game-accent font-game hidden sm:inline-flex">
                Complete
              </Badge>
            )}
            <ThemeToggle />
          </div>
        </div>

        {/* ── Timer row (Play page only) ────────────────────────── */}
        {activeTimer && (
          <div className="pb-2.5">
            <PhaseTimerBar {...activeTimer} />
          </div>
        )}
      </div>
    </header>
  );
}
