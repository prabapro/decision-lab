// src/components/scenario-builder/RevealEditor.jsx

/**
 * Edits the six reveal text blocks shown after a player submits their decision.
 *
 * Props:
 *   reveal     — { outcome, realStory, comparison, scoring, context, lesson }
 *   onChange   — (updatedReveal) => void
 */

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Section metadata — order matches Reveal.jsx REVEAL_SECTIONS
// ---------------------------------------------------------------------------

const REVEAL_FIELDS = [
  {
    key: 'outcome',
    label: 'Outcome of Your Decision',
    hint: 'What happens when the player picks the best option.',
    rows: 6,
  },
  {
    key: 'realStory',
    label: 'What Really Happened',
    hint: 'The historical or real-world case this scenario is based on.',
    rows: 7,
    highlight: true,
  },
  {
    key: 'comparison',
    label: 'Your Decision vs Reality',
    hint: 'Contrast the optimal decision with what actually happened.',
    rows: 6,
  },
  {
    key: 'scoring',
    label: 'Why This Was Scored This Way',
    hint: 'Explain the scoring rationale for the highest-point option.',
    rows: 5,
  },
  {
    key: 'context',
    label: 'Historical Context',
    hint: 'Broader pattern or systemic insight from this crisis.',
    rows: 4,
  },
  {
    key: 'lesson',
    label: 'Leadership Lesson',
    hint: 'One-line takeaway framed as a leadership principle.',
    rows: 3,
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const textareaBase =
  'w-full bg-muted/40 border border-border/50 rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors resize-y leading-relaxed font-mono';

export default function RevealEditor({ reveal, onChange }) {
  const update = (key, value) => {
    onChange({ ...reveal, [key]: value });
  };

  return (
    <div className="space-y-5">
      {REVEAL_FIELDS.map(({ key, label, hint, rows, highlight }) => (
        <div key={key} className="space-y-1.5">
          <div className="flex items-center gap-2">
            <label
              className={cn(
                'text-xs font-semibold tracking-widest uppercase',
                highlight ? 'text-game-accent' : 'text-muted-foreground/70',
              )}>
              {label}
            </label>
            {highlight && (
              <span className="text-[10px] border border-game-accent/30 text-game-accent rounded px-1.5 py-0.5 tracking-wide">
                highlighted
              </span>
            )}
          </div>

          {hint && (
            <p className="text-[11px] text-muted-foreground/50 leading-snug">
              {hint}
            </p>
          )}

          <textarea
            rows={rows}
            value={reveal?.[key] ?? ''}
            onChange={(e) => update(key, e.target.value)}
            placeholder={`Enter ${label.toLowerCase()}…`}
            className={cn(
              textareaBase,
              highlight &&
                'border-game-accent/20 focus:border-game-accent/40 focus:ring-game-accent/30',
            )}
          />
        </div>
      ))}
    </div>
  );
}
