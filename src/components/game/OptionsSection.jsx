// src/components/game/OptionsSection.jsx

import { cn } from '@/lib/utils';

/**
 * Decision options panel shown during Phase 3.
 * Renders selectable radio-style buttons for each scenario option.
 *
 * Props:
 *   options        — array of { text, meta } objects from the scenario
 *   selectedOption — index of the currently selected option (null if none)
 *   onSelect       — callback(index) called when a player picks an option
 */
export default function OptionsSection({ options, selectedOption, onSelect }) {
  return (
    <div className="space-y-4 font-game">
      {/* Header */}
      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
        Select Your Decision
      </p>

      {/* Option buttons */}
      <div className="space-y-2.5">
        {options.map((opt, i) => {
          const isSelected = selectedOption === i;

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={cn(
                'w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 font-game',
                'flex items-start gap-3 group active:scale-[0.99]',
                isSelected
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : 'bg-card border-border/50 text-foreground hover:bg-accent hover:border-border',
              )}>
              {/* Radio indicator */}
              <div
                className={cn(
                  'mt-0.5 shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200',
                  isSelected
                    ? 'border-primary-foreground'
                    : 'border-muted-foreground/40 group-hover:border-foreground/60',
                )}>
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                )}
              </div>

              {/* Option text */}
              <span className="text-sm leading-relaxed">{opt.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
