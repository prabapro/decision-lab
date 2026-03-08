// src/components/scenario-builder/OptionEditor.jsx

/**
 * Edits the four decision options for a scenario.
 * Each option has a `text` field and a `meta` object with five enum values.
 *
 * Props:
 *   options    — array of { text, meta: { points, risk, ethics, time, reality } }
 *   onChange   — (updatedOptions) => void
 */

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Field definitions for meta selects
// ---------------------------------------------------------------------------

const META_FIELDS = [
  {
    key: 'risk',
    label: 'Risk',
    options: ['cautious', 'moderate', 'bold'],
  },
  {
    key: 'ethics',
    label: 'Ethics',
    options: ['high', 'low'],
  },
  {
    key: 'time',
    label: 'Time',
    options: ['early', 'delay'],
  },
  {
    key: 'reality',
    label: 'Reality',
    options: ['pragmatic', 'ideological'],
  },
];

// ---------------------------------------------------------------------------
// Shared style tokens
// ---------------------------------------------------------------------------

const inputBase =
  'w-full bg-muted/40 border border-border/50 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors';

const selectBase =
  'bg-muted/40 border border-border/50 rounded-md px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors appearance-none cursor-pointer';

// Point score badge colour
const pointsBadgeColor = (pts) => {
  if (pts === 10)
    return 'bg-score-perfect/10 text-score-perfect border-score-perfect/30';
  if (pts === 0)
    return 'bg-destructive/10 text-destructive border-destructive/30';
  return 'bg-score-partial/10 text-score-partial border-score-partial/30';
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function OptionEditor({ options, onChange }) {
  const updateText = (index, value) => {
    const updated = options.map((opt, i) =>
      i === index ? { ...opt, text: value } : opt,
    );
    onChange(updated);
  };

  const updateMeta = (index, field, value) => {
    const updated = options.map((opt, i) =>
      i === index
        ? {
            ...opt,
            meta: {
              ...opt.meta,
              [field]: field === 'points' ? Number(value) : value,
            },
          }
        : opt,
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {options.map((opt, i) => (
        <div
          key={i}
          className="space-y-3 p-4 rounded-lg border border-border/30 bg-muted/20">
          {/* Option label row */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-muted-foreground/50">
              Option {String.fromCharCode(65 + i)}
            </span>
            <span
              className={cn(
                'text-[10px] font-bold border rounded px-1.5 py-0.5 tabular-nums',
                pointsBadgeColor(opt.meta.points),
              )}>
              {opt.meta.points} pts
            </span>
          </div>

          {/* Option text */}
          <textarea
            rows={2}
            value={opt.text}
            onChange={(e) => updateText(i, e.target.value)}
            placeholder="Describe this decision option…"
            className={cn(inputBase, 'resize-none leading-relaxed')}
          />

          {/* Meta fields */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {/* Points — number input */}
            <div className="space-y-1">
              <label className="text-[10px] tracking-widest uppercase font-semibold text-muted-foreground/50">
                Points
              </label>
              <input
                type="number"
                min={0}
                max={10}
                value={opt.meta.points}
                onChange={(e) => updateMeta(i, 'points', e.target.value)}
                className={cn(inputBase, 'text-center tabular-nums')}
              />
            </div>

            {/* Enum selects */}
            {META_FIELDS.map(({ key, label, options: choices }) => (
              <div key={key} className="space-y-1">
                <label className="text-[10px] tracking-widest uppercase font-semibold text-muted-foreground/50">
                  {label}
                </label>
                <select
                  value={opt.meta[key]}
                  onChange={(e) => updateMeta(i, key, e.target.value)}
                  className={cn(selectBase, 'w-full')}>
                  {choices.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
