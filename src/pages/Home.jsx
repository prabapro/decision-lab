// src/pages/Home.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@stores/useGameStore';
import { INTRO_LINES } from '@config/constants';
import GameGuard from '@components/common/GameGuard';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    // Only idle users should see the welcome screen.
    // playing → resume at /play | ended → go to /results
    <GameGuard
      requiredStatus="idle"
      redirectMap={{ playing: '/play', ended: '/results' }}>
      <HomeContent />
    </GameGuard>
  );
}

function HomeContent() {
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();
  const startGame = useGameStore((s) => s.startGame);

  const handleStart = () => {
    if (!teamName.trim()) return;
    // Mark this as an active browser session BEFORE navigating, so Play.jsx
    // knows this is a fresh start — not a browser-reopen of a persisted game.
    try {
      sessionStorage.setItem('decision-lab-session', '1');
    } catch {
      /* ignore */
    }
    startGame(teamName);
    navigate('/play');
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-6 font-game">
      <Card className="w-full max-w-2xl shadow-2xl border-border/50">
        <CardContent className="px-8 py-12 sm:px-14 sm:py-16 text-center space-y-8">
          {/* Eyebrow label */}
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground">
            Leadership Simulation
          </p>

          {/* Title block */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
              The Decision Lab
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base tracking-wide">
              Where futures are shaped by choices.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/50 max-w-xs mx-auto" />

          {/* Intro lines */}
          <div className="space-y-3 text-left max-w-lg mx-auto">
            {INTRO_LINES.map((line, i) => (
              <p key={i} className="text-sm leading-relaxed text-foreground/70">
                {line}
              </p>
            ))}
            <p className="italic text-muted-foreground/50 text-xs pt-2 text-center">
              Every decision leaves a fingerprint on history.
            </p>
          </div>

          {/* Input + CTA */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto w-full pt-2">
            <Input
              type="text"
              placeholder="Enter your team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              maxLength={40}
              className="text-center font-game h-10"
              autoFocus
            />
            <Button
              onClick={handleStart}
              disabled={!teamName.trim()}
              className="gap-2 font-semibold tracking-widest uppercase text-xs font-game h-10 shrink-0 sm:px-6">
              Begin
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
