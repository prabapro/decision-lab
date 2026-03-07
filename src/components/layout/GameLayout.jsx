// src/components/layout/GameLayout.jsx

import { Outlet } from 'react-router-dom';

/**
 * Full-screen immersive dark layout for all game screens.
 * Applied to /, /play, /reveal, /results routes via nested routing.
 * Intentionally has no header or footer.
 *
 * Uses <Outlet /> so it works as a React Router layout route:
 *   <Route element={<GameLayout />}>
 *     <Route index element={<Home />} />
 *     <Route path="play" element={<Play />} />
 *     ...
 *   </Route>
 */
export default function GameLayout() {
  return (
    <div
      className="min-h-screen text-[#e8ebff] overflow-x-hidden"
      style={{
        background: 'radial-gradient(circle at top, #1a1f4a, #050713)',
        fontFamily: "'Product Sans', system-ui, sans-serif",
      }}>
      <Outlet />
    </div>
  );
}
