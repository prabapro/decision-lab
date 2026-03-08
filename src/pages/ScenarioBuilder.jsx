// src/pages/ScenarioBuilder.jsx

/**
 * /scenario-builder — Developer tool for editing scenario content.
 *
 * Layout:
 *   ┌─────────────────────────────────────────────────────┐
 *   │  Page header  (title + Upload + Download + Reset)   │
 *   ├──────────────┬──────────────────────────────────────┤
 *   │              │                                      │
 *   │ ScenarioList │       ScenarioEditor                 │
 *   │  (left, 260) │     (right, scrollable)              │
 *   │              │                                      │
 *   └──────────────┴──────────────────────────────────────┘
 *
 * Not linked from navigation — accessible via direct URL only.
 */

import { useState, useRef } from 'react';
import { useScenarioBuilderStore } from '@stores/useScenarioBuilderStore';
import { downloadScenariosYaml } from '@utils/yamlUtils';
import { parseJSScenariosFile } from '@utils/jsImportUtils';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import ScenarioList from '@components/scenario-builder/ScenarioList';
import ScenarioEditor from '@components/scenario-builder/ScenarioEditor';
import {
  Download,
  RotateCcw,
  Hammer,
  Upload,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

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
// Import status toast — inline, auto-clears
// ---------------------------------------------------------------------------

function ImportStatus({ status }) {
  if (!status) return null;

  const isError = status.type === 'error';

  return (
    <div
      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border ${
        isError
          ? 'bg-destructive/10 border-destructive/30 text-destructive'
          : 'bg-score-perfect/10 border-score-perfect/30 text-score-perfect'
      }`}>
      {isError ? (
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      ) : (
        <CheckCircle className="w-3.5 h-3.5 shrink-0" />
      )}
      <span>{status.message}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ScenarioBuilder() {
  const { scenarios, resetToOriginal, loadScenarios } =
    useScenarioBuilderStore();
  const [confirmReset, setConfirmReset] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importStatus, setImportStatus] = useState(null); // { type: 'success'|'error', message }
  const fileInputRef = useRef(null);

  // Clear status after 4 seconds
  const showStatus = (type, message) => {
    setImportStatus({ type, message });
    setTimeout(() => setImportStatus(null), 4000);
  };

  const handleDownload = () => {
    downloadScenariosYaml(scenarios);
  };

  const handleReset = () => {
    resetToOriginal();
    setConfirmReset(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset the input so the same file can be re-uploaded if needed
    e.target.value = '';

    setImporting(true);
    setImportStatus(null);

    try {
      const parsed = await parseJSScenariosFile(file);
      loadScenarios(parsed);
      showStatus(
        'success',
        `Imported ${parsed.length} scenario${parsed.length !== 1 ? 's' : ''} from ${file.name}`,
      );
    } catch (err) {
      showStatus('error', err.message);
    } finally {
      setImporting(false);
    }
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
        <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap justify-end">
          {/* Import status */}
          <ImportStatus status={importStatus} />

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".js"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Upload JS button */}
          <Button
            size="sm"
            variant="outline"
            onClick={handleUploadClick}
            disabled={importing}
            className="h-8 gap-1.5 text-xs font-semibold border-primary/30 text-primary hover:bg-primary/5">
            <Upload className="w-3.5 h-3.5" />
            {importing ? 'Importing…' : 'Import JS'}
          </Button>

          {/* Reset */}
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

          {/* Download YAML */}
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
