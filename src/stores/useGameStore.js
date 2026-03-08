// src/stores/useGameStore.js

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { HIGH_IMPACT_MONTHS, INITIAL_GAME_STATE } from '@config/constants';

const appName = import.meta.env.VITE_APP_NAME || 'Vite React App';

export const useGameStore = create()(
  devtools(
    persist(
      (set, get) => ({
        ...INITIAL_GAME_STATE,

        /**
         * Starts a fresh game session, wiping any prior state.
         */
        startGame: (teamName) =>
          set({
            ...INITIAL_GAME_STATE,
            teamName: teamName.trim() || 'Team',
            gameStatus: 'playing',
          }),

        /**
         * Records the outcome of the player's decision for the current month.
         * Applies stress penalties based on decision quality and month weight.
         */
        recordDecision: (month, optionIndex, meta) => {
          const {
            totalScore,
            decisionLog,
            systemStress,
            regretCount,
            redemptionCount,
          } = get();
          const isHighImpact = HIGH_IMPACT_MONTHS.includes(month);

          let stressDelta = 0;
          if (meta.time === 'delay') stressDelta += isHighImpact ? 3 : 1;
          if (meta.reality === 'ideological')
            stressDelta += isHighImpact ? 4 : 2;
          if (meta.ethics === 'low') stressDelta += 1;

          set({
            totalScore: totalScore + meta.points,
            decisionLog: [
              ...decisionLog,
              { month, option: optionIndex, ...meta },
            ],
            systemStress: systemStress + stressDelta,
            regretCount: meta.points === 0 ? regretCount + 1 : regretCount,
            redemptionCount:
              meta.points >= 7 ? redemptionCount + 1 : redemptionCount,
            pendingReveal: true,
          });
        },

        /**
         * Advances to the next month or ends the game.
         * Returns the new gameStatus so callers can navigate without waiting for re-render.
         */
        advanceMonth: (totalScenarios) => {
          const { currentMonth } = get();
          const next = currentMonth + 1;

          if (next > totalScenarios) {
            set({ gameStatus: 'ended', pendingReveal: false });
            return 'ended';
          }

          set({ currentMonth: next, pendingReveal: false });
          return 'playing';
        },

        /**
         * Resets all game state back to initial. Used for "Play Again".
         */
        resetGame: () => set({ ...INITIAL_GAME_STATE }),
      }),
      {
        name: appName + '-game',
        version: 1,
      },
    ),
    { name: 'game-store' },
  ),
);
