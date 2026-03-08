// src/components/layout/GameLayout.jsx

import { Outlet } from 'react-router-dom';
import GameHeader from '@components/game/GameHeader';

/**
 * Full-screen immersive layout for all game screens.
 * Applied to /, /play, /reveal, /results routes via nested routing.
 *
 * Changes from original:
 * — Removed hardcoded dark radial-gradient background and font-family inline styles.
 * — Background now uses the `game-bg` utility (defined in index.css) which adapts
 *   to both light and dark themes using CSS color-mix with the active --primary token.
 * — Added sticky <GameHeader> above the <Outlet> so all game pages share it.
 * — Renders <Outlet /> so it works as a React Router layout route.
 */
export default function GameLayout() {
  return (
    <div className="min-h-screen game-bg font-game flex flex-col">
      <GameHeader />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
