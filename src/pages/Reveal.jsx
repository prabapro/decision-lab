// src/pages/Reveal.jsx

import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@stores/useGameStore';
import { scenarios } from '@config/constants';
import GameGuard from '@components/common/GameGuard';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import ScoreHeader from '@components/game/ScoreHeader';
import { ArrowRight, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Reveal section config — order and display metadata for each reveal block
// ---------------------------------------------------------------------------

const REVEAL_SECTIONS = [
  { key: 'outcome', title: 'Outcome of Your Decision', delay: '0.3s' },
  {
    key: 'realStory',
    title: 'What Really Happened',
    delay: '0.6s',
    highlight: true,
  },
  { key: 'comparison', title: 'Your Decision vs Reality', delay: '0.9s' },
  { key: 'scoring', title: 'Why This Was Scored This Way', delay: '1.2s' },
  { key: 'context', title: 'Historical Context', delay: '1.5s' },
  { key: 'lesson', title: 'Leadership Lesson', delay: '1.8s' },
];

// ---------------------------------------------------------------------------
// Main page (wrapped in GameGuard)
// ---------------------------------------------------------------------------

export default function Reveal() {
  return (
    <GameGuard requiredStatus={['playing', 'ended']}>
      <RevealContent />
    </GameGuard>
  );
}

function RevealContent() {
  const navigate = useNavigate();
  const { currentMonth, decisionLog, advanceMonth } = useGameStore();
  const scenario = scenarios[currentMonth - 1];
  const lastDecision = decisionLog[decisionLog.length - 1];
  const points = lastDecision?.points ?? 0;
  const isLastMonth = currentMonth >= scenarios.length;

  const handleNext = () => {
    const newStatus = advanceMonth(scenarios.length);
    navigate(newStatus === 'ended' ? '/results' : '/play');
  };

  if (!scenario) return null;

  return (
    <>
      <style>{`
        @keyframes revealIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .reveal-card { animation: revealIn 0.6s ease both; }
      `}</style>

      <div className="container mx-auto px-4 py-8 max-w-3xl font-game">
        {/* Score header card */}
        <Card
          className="mb-6 shadow-md border-border/50 reveal-card"
          style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6 sm:p-8">
            <ScoreHeader points={points} />
          </CardContent>
        </Card>

        {/* Reveal section cards */}
        <div className="space-y-3 mb-8">
          {REVEAL_SECTIONS.map(({ key, title, delay, highlight }) => (
            <Card
              key={key}
              className={cn(
                'reveal-card border-border/40 shadow-sm',
                highlight && 'border-game-accent/25 bg-game-accent/5',
              )}
              style={{ animationDelay: delay }}>
              <CardContent className="p-5">
                {/* Section label — game-label token */}
                <p
                  className={cn(
                    'game-label mb-3',
                    highlight ? 'text-game-accent' : 'text-game-accent',
                  )}>
                  {title}
                </p>
                {/* Section body — game-narrative token (text-base leading-[1.9]) */}
                <p
                  className={cn(
                    'game-narrative',
                    highlight
                      ? 'text-game-accent font-semibold'
                      : 'text-foreground/80',
                  )}>
                  {scenario.reveal[key]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next button */}
        <div
          className="flex justify-center reveal-card"
          style={{ animationDelay: '2.1s' }}>
          <Button
            size="lg"
            onClick={handleNext}
            className="gap-2 font-semibold tracking-widest uppercase text-sm font-game px-8">
            {isLastMonth ? (
              <>
                <Flag className="w-4 h-4" />
                See Final Results
              </>
            ) : (
              <>
                Next Scenario
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
