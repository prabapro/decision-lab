// src/components/scenario-builder/IntelEditor.jsx

/**
 * Edits the five intel items for a scenario.
 * Each item has a short `headline` (text input) and a `body` (textarea).
 *
 * Props:
 *   intel      — array of { headline, body }
 *   onChange   — (updatedIntel) => void
 */

import { cn } from '@/lib/utils';

const inputBase =
  'w-full bg-muted/40 border border-border/50 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors';

export default function IntelEditor({ intel, onChange }) {
  const update = (index, field, value) => {
    const updated = intel.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {intel.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2 items-start p-3 rounded-lg border border-border/30 bg-muted/20">
          {/* Headline */}
          <div className="space-y-1">
            <label className="text-[10px] tracking-widest uppercase font-semibold text-muted-foreground/60">
              Headline
            </label>
            <input
              type="text"
              value={item.headline}
              onChange={(e) => update(i, 'headline', e.target.value)}
              placeholder="Short label"
              className={cn(inputBase, 'font-medium')}
            />
          </div>

          {/* Body */}
          <div className="space-y-1">
            <label className="text-[10px] tracking-widest uppercase font-semibold text-muted-foreground/60">
              Body — Intel {i + 1}
            </label>
            <input
              type="text"
              value={item.body}
              onChange={(e) => update(i, 'body', e.target.value)}
              placeholder="One-sentence intelligence detail shown to the player"
              className={inputBase}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
