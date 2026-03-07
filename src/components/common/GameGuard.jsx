// src/components/common/GameGuard.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@stores/useGameStore';

/**
 * Protects game routes by checking the current game status.
 *
 * Usage:
 *   <GameGuard requiredStatus="playing">
 *     <PlayContent />
 *   </GameGuard>
 *
 * If gameStatus !== requiredStatus, redirects to `redirectTo` (default: '/').
 */
export default function GameGuard({
  children,
  requiredStatus,
  redirectTo = '/',
}) {
  const navigate = useNavigate();
  const gameStatus = useGameStore((s) => s.gameStatus);

  useEffect(() => {
    if (gameStatus !== requiredStatus) {
      navigate(redirectTo, { replace: true });
    }
  }, [gameStatus, requiredStatus, redirectTo, navigate]);

  // Render nothing while redirecting to avoid flash of wrong content
  if (gameStatus !== requiredStatus) return null;

  return <>{children}</>;
}
