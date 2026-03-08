// src/pages/Home.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@stores/useGameStore';
import { INTRO_LINES } from '@config/constants';
import GameGuard from '@components/common/GameGuard';
import AnimatedBorderCard from '@components/common/AnimatedBorderCard';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { ArrowRight, ShieldAlert } from 'lucide-react';

// ---------------------------------------------------------------------------
// Classified briefing block — wraps INTRO_LINES in a dossier-style container
// ---------------------------------------------------------------------------

function ClassifiedBriefing() {
  return (
    <div className="border border-accent-foreground/25 rounded-lg bg-accent-foreground/5 overflow-hidden">
      {/* Header bar — game-label token */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-accent-foreground/20 bg-accent-foreground/8">
        <ShieldAlert className="w-3.5 h-3.5 text-accent-foreground shrink-0" />
        <span className="game-label font-black text-accent-foreground select-none">
          Classified Briefing
        </span>
      </div>

      {/* Lines — game-body token (text-base leading-relaxed) */}
      <div className="px-4 py-4 space-y-3">
        {INTRO_LINES.map((line, i) => (
          <p key={i} className="game-body text-foreground/70 flex gap-2.5">
            <span className="text-accent-foreground/60 mt-0.5 shrink-0 font-bold select-none text-sm">
              {String(i + 1).padStart(2, '0')}
            </span>
            {line}
          </p>
        ))}

        {/* Redacted footer line */}
        <p className="italic text-muted-foreground/40 text-sm pt-1 border-t border-accent-foreground/10 mt-2">
          Every decision leaves a fingerprint on history.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  return (
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
    try {
      sessionStorage.setItem('decision-lab-session', '1');
    } catch {
      /* ignore */
    }
    startGame(teamName.toUpperCase());
    navigate('/play');
  };

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value.toUpperCase());
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 font-game">
      <AnimatedBorderCard
        className="w-full max-w-6xl shadow-2xl"
        innerClassName="px-8 py-12 sm:px-14 sm:py-16">
        {/* ── Spinning logo mark ──────────────────────────────────────── */}
        <div className="flex justify-center mb-8">
          <img
            src="/images/decision-lab.svg"
            alt="The Decision Lab"
            className="h-16 w-16 animate-logo-spin-slow opacity-90"
          />
        </div>

        {/* ── Eyebrow label — game-label token ───────────────────────── */}
        <p className="text-center game-label text-accent-foreground mb-6">
          Leadership Simulation
        </p>

        {/* ── Title block ─────────────────────────────────────────────── */}
        <div className="text-center space-y-3 mb-6">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
            The Decision Lab
          </h1>
          {/* game-body token for subtitle */}
          <p className="game-body text-muted-foreground tracking-wide">
            Where futures are shaped by choices.
          </p>
        </div>

        {/* ── Divider ─────────────────────────────────────────────────── */}
        <div className="h-px bg-border/50 max-w-xs mx-auto mb-6" />

        {/* ── Classified briefing ─────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto mb-10">
          <ClassifiedBriefing />
        </div>

        {/* ── Input + CTA ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto w-full">
          <Input
            type="text"
            placeholder="ENTER YOUR TEAM NAME"
            value={teamName}
            onChange={handleTeamNameChange}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            maxLength={40}
            className="text-center font-game h-10 uppercase placeholder:normal-case placeholder:tracking-widest placeholder:text-xs"
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
      </AnimatedBorderCard>
    </div>
  );
}
