// src/pages/Reveal.jsx

import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@stores/useGameStore';
import { scenarios } from '@config/constants';
import GameGuard from '@components/common/GameGuard';

// ---------------------------------------------------------------------------
// Config — maps reveal keys to display titles and animation timing
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
// Sub-components
// ---------------------------------------------------------------------------

function ScoreHeader({ points }) {
  const isBrilliant = points === 10;
  const isBad = points === 0;
  const color = isBrilliant ? '#ffd36b' : isBad ? '#ef4444' : '#818cf8';
  const feedback = isBrilliant
    ? 'Strategically brilliant.'
    : points > 0
      ? 'You improved, but there was a better path.'
      : 'Warning: this decision is alarming.';

  return (
    <div className="text-center mb-8">
      <div
        className="text-5xl font-black tracking-widest mb-3"
        style={{ color, textShadow: `0 0 30px ${color}60` }}>
        +{points}
      </div>
      <p className="text-xs tracking-widest uppercase opacity-70">{feedback}</p>
    </div>
  );
}

function RevealSection({ title, content, highlight, animationDelay }) {
  return (
    <div
      className="rounded-2xl px-6 py-5 mb-4"
      style={{
        background: 'rgba(255,255,255,0.05)',
        boxShadow: 'inset 0 0 14px rgba(255,255,255,0.04)',
        animation: 'revealSection 0.7s ease both',
        animationDelay,
      }}>
      <h3
        className="text-xs font-semibold tracking-widest uppercase mb-3"
        style={{ color: '#ffd36b' }}>
        {title}
      </h3>
      <p
        className="text-sm leading-[1.75] whitespace-pre-line"
        style={
          highlight
            ? {
                color: '#ffd166',
                fontWeight: 600,
                textShadow: '0 0 12px rgba(255,209,102,0.35)',
              }
            : { color: '#d6daff' }
        }>
        {content}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page (wrapped in GameGuard)
// ---------------------------------------------------------------------------

export default function Reveal() {
  // Allow 'ended' too — advanceMonth sets it before navigate('/results') fires,
  // so without this the GameGuard would redirect back to '/' and lose the results.
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
    // advanceMonth returns new status synchronously (Zustand is sync)
    const newStatus = advanceMonth(scenarios.length);
    navigate(newStatus === 'ended' ? '/results' : '/play');
  };

  if (!scenario) return null;

  return (
    <>
      <style>{`
        @keyframes revealSection {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="min-h-screen py-10 px-4">
        <div
          className="max-w-3xl mx-auto rounded-[38px] px-8 py-10"
          style={{
            backdropFilter: 'blur(22px)',
            background:
              'linear-gradient(135deg, rgba(90,100,255,0.22), rgba(150,90,255,0.16))',
            boxShadow: '0 0 50px rgba(160,120,255,0.25)',
          }}>
          <ScoreHeader points={points} />

          {REVEAL_SECTIONS.map(({ key, title, delay, highlight }) => (
            <RevealSection
              key={key}
              title={title}
              content={scenario.reveal[key]}
              highlight={highlight}
              animationDelay={delay}
            />
          ))}

          {/* Next button */}
          <div
            className="text-center mt-8"
            style={{
              animation: 'revealSection 0.7s ease both',
              animationDelay: '2.1s',
            }}>
            <button
              onClick={handleNext}
              className="px-10 py-3 rounded-full font-semibold tracking-wide text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #6f78ff, #c08bff)',
                boxShadow: '0 0 14px rgba(160,160,255,0.35)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 0 22px rgba(190,190,255,0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow =
                  '0 0 14px rgba(160,160,255,0.35)';
              }}>
              {isLastMonth ? 'See Final Results' : 'Proceed to Next Scenario'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
