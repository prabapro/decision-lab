// src/pages/Home.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@stores/useGameStore';

const INTRO_LINES = [
  'You are about to enter a high-stakes decision laboratory.',
  'Over 18 months, your team will face real leadership crises drawn from history.',
  'You will not be given hindsight. You will not be given perfect information.',
  'Only after each decision will you discover what really happened.',
];

export default function Home() {
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();
  const startGame = useGameStore((s) => s.startGame);

  const handleStart = () => {
    if (!teamName.trim()) return;
    startGame(teamName);
    navigate('/play');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleStart();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div
        className="text-center w-full max-w-3xl mx-auto px-10 py-14 rounded-[28px]"
        style={{
          backdropFilter: 'blur(18px)',
          background:
            'linear-gradient(135deg, rgba(80,90,255,0.22), rgba(120,80,255,0.14))',
          boxShadow: '0 0 60px rgba(120,120,255,0.25)',
        }}>
        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl font-black mb-3"
          style={{ letterSpacing: '0.15em' }}>
          THE DECISION LAB
        </h1>
        <p className="text-[#c9ccff] mb-10 tracking-wider opacity-90">
          Where futures are shaped by choices.
        </p>

        {/* Intro text */}
        <div className="space-y-3 max-w-xl mx-auto text-left mb-10">
          {INTRO_LINES.map((line, i) => (
            <p
              key={i}
              className="leading-relaxed text-[#e8ebff]/80 text-sm sm:text-base">
              {line}
            </p>
          ))}
          <p className="italic opacity-50 text-sm mt-4">
            Every decision leaves a fingerprint on history.
          </p>
        </div>

        {/* Input + Button */}
        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Enter your team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={40}
            className="w-full max-w-sm px-5 py-3 rounded-2xl text-white text-center placeholder-white/35 outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.18)',
              boxShadow: 'inset 0 0 8px rgba(255,255,255,0.08)',
            }}
          />
          <button
            onClick={handleStart}
            disabled={!teamName.trim()}
            className="px-12 py-3 rounded-full font-semibold tracking-widest text-white transition-all duration-300 uppercase text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #6f78ff, #c08bff)',
              boxShadow: '0 0 14px rgba(160,160,255,0.35)',
            }}
            onMouseEnter={(e) => {
              if (!teamName.trim()) return;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 0 22px rgba(190,190,255,0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow =
                '0 0 14px rgba(160,160,255,0.35)';
            }}>
            Begin
          </button>
        </div>
      </div>
    </div>
  );
}
