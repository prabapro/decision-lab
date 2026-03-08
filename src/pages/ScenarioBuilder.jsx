// src/pages/ScenarioBuilder.jsx

/**
 * /scenario-builder — Developer tool for editing scenario content.
 *
 * Layout:
 *   ┌─────────────────────────────────────────────────────┐
 *   │  Page header  (title + Download + Reset buttons)    │
 *   ├──────────────┬──────────────────────────────────────┤
 *   │              │                                      │
 *   │ ScenarioList │       ScenarioEditor                 │
 *   │  (left, 260) │     (right, scrollable)              │
 *   │              │                                      │
 *   └──────────────┴──────────────────────────────────────┘
 *
 * Not linked from navigation — accessible via direct URL only.
 */

import { useState } from 'react';
import { useScenarioBuilderStore } from '@stores/useScenarioBuilderStore';
import { downloadScenariosYaml } from '@utils/yamlUtils';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import ScenarioList from '@components/scenario-builder/ScenarioList';
import ScenarioEditor from '@components/scenario-builder/ScenarioEditor';
import { Download, RotateCcw, Hammer } from 'lucide-react';

// ---------------------------------------------------------------------------
// Reset confirmation inline widget
// ---------------------------------------------------------------------------

function ResetConfirm({ onConfirm, onCancel }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Discard all edits?</span>
      <Button
        size="sm"
        variant="destructive"
        onClick={onConfirm}
        className="h-7 px-3 text-xs">
        Yes, Reset
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={onCancel}
        className="h-7 px-3 text-xs">
        Cancel
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ScenarioBuilder() {
  const { scenarios, resetToOriginal } = useScenarioBuilderStore();
  const [confirmReset, setConfirmReset] = useState(false);

  const handleDownload = () => {
    downloadScenariosYaml(scenarios);
  };

  const handleReset = () => {
    resetToOriginal();
    setConfirmReset(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height,64px))] overflow-hidden">
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-border/40 bg-background">
        {/* Left: title + badge */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Hammer className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground leading-tight">
              Scenario Builder
            </h1>
            <p className="text-xs text-muted-foreground/60">
              Edit scenarios and download the updated YAML file
            </p>
          </div>
          <Badge
            variant="outline"
            className="hidden sm:inline-flex text-[10px] tracking-widest uppercase font-semibold border-primary/30 text-primary">
            {scenarios.length} scenarios
          </Badge>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {confirmReset ? (
            <ResetConfirm
              onConfirm={handleReset}
              onCancel={() => setConfirmReset(false)}
            />
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setConfirmReset(true)}
              className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </Button>
          )}

          <Button
            size="sm"
            onClick={handleDownload}
            className="h-8 gap-1.5 text-xs font-semibold">
            <Download className="w-3.5 h-3.5" />
            Download YAML
          </Button>
        </div>
      </div>

      {/* ── Two-panel body ───────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: scenario list (fixed width, scrolls internally) */}
        <aside className="w-55 sm:w-65 shrink-0 border-r border-border/30 bg-muted/10 overflow-hidden flex flex-col">
          <ScenarioList />
        </aside>

        {/* Right: editor (fills remaining width, scrolls independently) */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-5">
          <ScenarioEditor />
        </main>
      </div>
    </div>
  );
}
