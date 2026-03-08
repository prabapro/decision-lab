// src/stores/useGameUIStore.js

import { create } from 'zustand';

/**
 * Lightweight UI-only store for game display state.
 * Intentionally NOT persisted — this is ephemeral render state.
 *
 * Purpose: allows Play.jsx to broadcast active timer info to GameHeader
 * without prop-drilling through GameLayout's <Outlet />.
 *
 * Shape of activeTimer:
 *   { phase: number, timeLeft: number, progress: number }
 */
export const useGameUIStore = create((set) => ({
  activeTimer: null,

  /** Called by Play.jsx on every timer tick while the timer is running. */
  setActiveTimer: (timer) => set({ activeTimer: timer }),

  /** Called by Play.jsx on unmount (navigating away) to hide the header timer. */
  clearActiveTimer: () => set({ activeTimer: null }),
}));
