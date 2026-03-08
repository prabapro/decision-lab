// src/components/scenario-builder/ScenarioEditor.jsx

/**
 * Right-panel editor for a single scenario.
 * Renders all editable sections in a scrollable column:
 *   1. Title + Month
 *   2. Narrative
 *   3. Intel  (→ IntelEditor)
 *   4. Options (→ OptionEditor)
 *   5. Reveal  (→ RevealEditor)
 *
 * Reads the selected scenario from useScenarioBuilderStore and dispatches
 * updates back to it — no prop-drilling needed from the parent page.
 */

import { useScenarioBuilderStore } from '@stores/useScenarioBuilderStore';
import { Card, CardContent } from '@components/ui/card';
import IntelEditor from './IntelEditor';
import OptionEditor from './OptionEditor';
import RevealEditor from './RevealEditor';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

const inputBase =
  'w-full bg-muted/40 border border-border/50 rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors';

const textareaBase =
  'w-full bg-muted/40 border border-border/50 rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors resize-y leading-relaxed font-mono';

/** Labelled section divider used between editor blocks */
function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-border/40" />
      <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-muted-foreground/50">
        {label}
      </span>
      <div className="h-px flex-1 bg-border/40" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ScenarioEditor() {
  const { scenarios, selectedIndex, updateScenario, reassignMonth } =
    useScenarioBuilderStore();

  const scenario = scenarios[selectedIndex];
  const totalMonths = scenarios.length;

  if (!scenario) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground/40 text-sm">
        Select a scenario to edit
      </div>
    );
  }

  // Convenience updater — merges a top-level patch
  const patch = (fields) => updateScenario(selectedIndex, fields);

  // Month numbers 1..totalMonths for the dropdown
  const monthOptions = Array.from({ length: totalMonths }, (_, i) => i + 1);

  return (
    <div className="space-y-6 pb-12">
      {/* ── 1. Identity ────────────────────────────────────────────────── */}
      <Card className="border-border/40 shadow-sm">
        <CardContent className="p-5 space-y-4">
          <p className="text-[10px] tracking-widest uppercase font-semibold text-muted-foreground/50">
            Identity
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px] gap-3 items-end">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground/70">
                Title
              </label>
              <input
                type="text"
                value={scenario.title}
                onChange={(e) => patch({ title: e.target.value })}
                placeholder="Month N — Scenario Title"
                className={cn(inputBase, 'font-semibold')}
              />
            </div>

            {/* Month */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground/70">
                Month
              </label>
              <select
                value={scenario.month}
                onChange={(e) =>
                  reassignMonth(selectedIndex, Number(e.target.value))
                }
                className={cn(
                  inputBase,
                  'appearance-none cursor-pointer text-center font-semibold',
                )}>
                {monthOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 2. Narrative ───────────────────────────────────────────────── */}
      <Card className="border-border/40 shadow-sm">
        <CardContent className="p-5 space-y-3">
          <SectionDivider label="Narrative" />
          <p className="text-[11px] text-muted-foreground/50">
            The briefing text shown to players during Phase 1. Use bullet points
            with <code className="text-xs">•</code> for lists. Leading blank
            lines create visual breathing room in the game.
          </p>
          <textarea
            rows={14}
            value={scenario.narrative}
            onChange={(e) => patch({ narrative: e.target.value })}
            placeholder="Enter the scenario narrative…"
            className={textareaBase}
          />
        </CardContent>
      </Card>

      {/* ── 3. Intel ────────────────────────────────────────────────────── */}
      <Card className="border-border/40 shadow-sm">
        <CardContent className="p-5 space-y-3">
          <SectionDivider label="Intel — 5 Items" />
          <p className="text-[11px] text-muted-foreground/50">
            Players can reveal up to 3 of these during Phase 2. Keep headlines
            short; body text should be a single, impactful sentence.
          </p>
          <IntelEditor
            intel={scenario.intel}
            onChange={(intel) => patch({ intel })}
          />
        </CardContent>
      </Card>

      {/* ── 4. Options ──────────────────────────────────────────────────── */}
      <Card className="border-border/40 shadow-sm">
        <CardContent className="p-5 space-y-3">
          <SectionDivider label="Options — 4 Decisions" />
          <p className="text-[11px] text-muted-foreground/50">
            Exactly 4 options required. The highest-scoring option is shown as
            the &quot;best path&quot; during the reveal. Points must be 0–10.
          </p>
          <OptionEditor
            options={scenario.options}
            onChange={(options) => patch({ options })}
          />
        </CardContent>
      </Card>

      {/* ── 5. Reveal ───────────────────────────────────────────────────── */}
      <Card className="border-border/40 shadow-sm">
        <CardContent className="p-5 space-y-3">
          <SectionDivider label="Reveal — 6 Sections" />
          <p className="text-[11px] text-muted-foreground/50">
            Shown after the player locks in their decision. Leading/trailing
            blank lines create visual space in the game (use{' '}
            <code className="text-xs">\n</code> at start/end). The{' '}
            <em>What Really Happened</em> block is highlighted gold in the UI.
          </p>
          <RevealEditor
            reveal={scenario.reveal}
            onChange={(reveal) => patch({ reveal })}
          />
        </CardContent>
      </Card>
    </div>
  );
}
