// src/components/scenario-builder/ScenarioList.jsx

/**
 * Left-panel list of all scenarios, sorted by month.
 * Clicking a row selects it for editing in ScenarioEditor.
 * Includes an "Add" button to create a new empty scenario
 * and a "Delete" button on the active row.
 *
 * Reads directly from useScenarioBuilderStore — no props needed.
 */

import { useScenarioBuilderStore } from '@stores/useScenarioBuilderStore';
import { Button } from '@components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ScenarioList() {
  const {
    scenarios,
    selectedIndex,
    selectScenario,
    addScenario,
    deleteScenario,
  } = useScenarioBuilderStore();

  // Display sorted by month but preserve store indices for selection/deletion
  const sortedWithIndex = scenarios
    .map((s, i) => ({ scenario: s, storeIndex: i }))
    .sort((a, b) => a.scenario.month - b.scenario.month);

  const handleDelete = (e, storeIndex) => {
    e.stopPropagation();
    if (scenarios.length <= 1) return;
    const confirmed = window.confirm(
      'Delete this scenario? This cannot be undone.',
    );
    if (confirmed) deleteScenario(storeIndex);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-border/30">
        <span className="text-[10px] tracking-widest uppercase font-semibold text-muted-foreground/60">
          Scenarios ({scenarios.length})
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={addScenario}
          className="h-7 px-2 gap-1 text-xs text-muted-foreground hover:text-foreground">
          <Plus className="w-3.5 h-3.5" />
          Add
        </Button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {sortedWithIndex.map(({ scenario, storeIndex }) => {
          const isSelected = storeIndex === selectedIndex;

          return (
            <button
              key={storeIndex}
              onClick={() => selectScenario(storeIndex)}
              className={cn(
                'w-full text-left px-3 py-3 border-b border-border/20 group',
                'flex items-start gap-2.5 transition-colors duration-150',
                isSelected
                  ? 'bg-primary/8 border-l-2 border-l-primary'
                  : 'hover:bg-muted/40 border-l-2 border-l-transparent',
              )}>
              {/* Month badge */}
              <span
                className={cn(
                  'shrink-0 text-[10px] font-bold tabular-nums mt-0.5',
                  'w-6 h-6 rounded flex items-center justify-center',
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground',
                )}>
                {scenario.month}
              </span>

              {/* Title */}
              <span
                className={cn(
                  'flex-1 text-xs leading-snug line-clamp-2',
                  isSelected
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground',
                )}>
                {scenario.title}
              </span>

              {/* Delete — only visible on selected row */}
              {isSelected && scenarios.length > 1 && (
                <button
                  onClick={(e) => handleDelete(e, storeIndex)}
                  className="shrink-0 mt-0.5 opacity-40 hover:opacity-100 hover:text-destructive transition-all duration-150"
                  title="Delete scenario">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
