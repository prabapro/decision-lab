// src/stores/useScenarioBuilderStore.js

/**
 * Ephemeral (non-persisted) store for the Scenario Builder page.
 * Loads a deep clone of the compiled scenarios on first access so edits
 * never mutate the imported constant used by the live game.
 */

import { create } from 'zustand';
import { scenarios as SOURCE_SCENARIOS } from '@config/constants';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

/** Default shape used when the user adds a brand-new scenario */
const makeEmptyScenario = (month) => ({
  month,
  title: `Month ${month} — New Scenario`,
  narrative: '\nDescribe the crisis here.\n',
  intel: [
    { headline: 'Intel 1', body: 'Relevant intelligence detail.' },
    { headline: 'Intel 2', body: 'Relevant intelligence detail.' },
    { headline: 'Intel 3', body: 'Relevant intelligence detail.' },
    { headline: 'Intel 4', body: 'Relevant intelligence detail.' },
    { headline: 'Intel 5', body: 'Relevant intelligence detail.' },
  ],
  options: [
    {
      text: 'Option A — describe the decision',
      meta: {
        points: 10,
        risk: 'moderate',
        ethics: 'high',
        time: 'early',
        reality: 'pragmatic',
      },
    },
    {
      text: 'Option B — describe the decision',
      meta: {
        points: 6,
        risk: 'cautious',
        ethics: 'high',
        time: 'early',
        reality: 'pragmatic',
      },
    },
    {
      text: 'Option C — describe the decision',
      meta: {
        points: 3,
        risk: 'bold',
        ethics: 'low',
        time: 'delay',
        reality: 'ideological',
      },
    },
    {
      text: 'Option D — describe the decision',
      meta: {
        points: 0,
        risk: 'bold',
        ethics: 'low',
        time: 'delay',
        reality: 'ideological',
      },
    },
  ],
  reveal: {
    outcome: 'Outcome of the best decision.',
    realStory: 'What really happened in history.',
    comparison: 'Your decision vs reality.',
    scoring: 'Why this was scored this way.',
    context: 'Historical context.',
    lesson: 'Describe it here.',
  },
});

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useScenarioBuilderStore = create((set) => ({
  /** Working copy — never mutates the imported constant */
  scenarios: deepClone(SOURCE_SCENARIOS),

  /** Index into the `scenarios` array (not month number) */
  selectedIndex: 0,

  // ── Selection ────────────────────────────────────────────────────────────

  selectScenario: (index) => set({ selectedIndex: index }),

  // ── Field updates ────────────────────────────────────────────────────────

  /**
   * Patch a single field on the scenario at `index`.
   * Accepts a plain patch object or an updater function `(scenario) => scenario`.
   */
  updateScenario: (index, patchOrFn) =>
    set((state) => {
      const scenarios = deepClone(state.scenarios);
      scenarios[index] =
        typeof patchOrFn === 'function'
          ? patchOrFn(scenarios[index])
          : { ...scenarios[index], ...patchOrFn };
      return { scenarios };
    }),

  // ── Month reordering ─────────────────────────────────────────────────────

  /**
   * Change the `month` of the scenario at `fromIndex` to `targetMonth`.
   * If another scenario already owns `targetMonth`, swap months between them.
   */
  reassignMonth: (fromIndex, targetMonth) =>
    set((state) => {
      const scenarios = deepClone(state.scenarios);
      const toIndex = scenarios.findIndex((s) => s.month === targetMonth);

      if (toIndex !== -1 && toIndex !== fromIndex) {
        const temp = scenarios[fromIndex].month;
        scenarios[fromIndex].month = scenarios[toIndex].month;
        scenarios[toIndex].month = temp;
      } else {
        scenarios[fromIndex].month = targetMonth;
      }

      return { scenarios };
    }),

  // ── CRUD ─────────────────────────────────────────────────────────────────

  addScenario: () =>
    set((state) => {
      const maxMonth = Math.max(...state.scenarios.map((s) => s.month), 0);
      const newScenario = makeEmptyScenario(maxMonth + 1);
      const scenarios = [...state.scenarios, newScenario];
      return { scenarios, selectedIndex: scenarios.length - 1 };
    }),

  deleteScenario: (index) =>
    set((state) => {
      if (state.scenarios.length <= 1) return state;
      const scenarios = state.scenarios.filter((_, i) => i !== index);
      const selectedIndex = Math.min(state.selectedIndex, scenarios.length - 1);
      return { scenarios, selectedIndex };
    }),

  // ── Import ───────────────────────────────────────────────────────────────

  /**
   * Replace all scenarios with an externally parsed array (e.g. from a JS file
   * upload). Resets selection to the first item.
   *
   * @param {Array} incoming — already-validated scenarios array
   */
  loadScenarios: (incoming) =>
    set({ scenarios: deepClone(incoming), selectedIndex: 0 }),

  // ── Reset ────────────────────────────────────────────────────────────────

  /** Discard all edits and reload from the original compiled YAML */
  resetToOriginal: () =>
    set({ scenarios: deepClone(SOURCE_SCENARIOS), selectedIndex: 0 }),
}));
