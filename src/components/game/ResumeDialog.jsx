// src/components/game/ResumeDialog.jsx

import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Card, CardContent } from '@components/ui/card';
import { AlertTriangle, Play } from 'lucide-react';

/**
 * Full-screen backdrop dialog shown before the phase timer starts.
 *
 * Shown in two modes:
 *   isResuming=false → "ready?" gate on natural scenario-to-scenario navigation
 *   isResuming=true  → warns the player that a saved session has been restored
 *
 * Props:
 *   month       — current scenario number
 *   total       — total number of scenarios
 *   teamName    — player's team name (shown on resume)
 *   isResuming  — true when restoring from a closed browser session
 *   onStart     — callback when the player clicks Begin / Resume
 */
export default function ResumeDialog({
  month,
  total,
  teamName,
  isResuming,
  onStart,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/85 backdrop-blur-sm font-game">
      <Card className="w-full max-w-md shadow-2xl border-border/60">
        <CardContent className="p-10 text-center space-y-6">
          {/* Session restored warning */}
          {isResuming && (
            <div className="flex justify-center">
              <Badge
                variant="outline"
                className="gap-1.5 border-game-accent/40 text-game-accent bg-game-accent/5 text-xs tracking-widest uppercase font-semibold font-game">
                <AlertTriangle className="w-3 h-3" />
                Session Restored
              </Badge>
            </div>
          )}

          {/* Scenario counter */}
          <div className="space-y-2">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-semibold">
              {isResuming ? 'Resuming Scenario' : 'Ready to Begin'}
            </p>
            <h2 className="text-4xl font-black tracking-tight text-foreground">
              Scenario <span className="text-primary">{month}</span>
              <span className="text-muted-foreground/40 text-2xl font-normal">
                {' '}
                / {total}
              </span>
            </h2>
          </div>

          {/* Context message */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isResuming
              ? `Welcome back, ${teamName}. Your progress has been restored. The timer will start when you're ready.`
              : `The timer starts the moment you begin. Make sure your team is aligned before proceeding.`}
          </p>

          {/* CTA */}
          <Button
            size="lg"
            onClick={onStart}
            className="w-full gap-2 font-semibold tracking-widest uppercase text-sm font-game">
            <Play className="w-4 h-4" />
            {isResuming ? 'Resume' : 'Begin'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
