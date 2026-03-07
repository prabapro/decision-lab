// src/components/common/GameGuard.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@stores/useGameStore';

/**
 * Protects game routes by checking the current game status.
 *
 * Usage:
 *   <GameGuard requiredStatus="playing">          // single status
 *   <GameGuard requiredStatus={['playing', 'ended']}> // multiple valid statuses
 *
 * If gameStatus is not in the allowed set, redirects to `redirectTo` (default: '/').
 */
export default function GameGuard({
  children,
  requiredStatus,
  redirectTo = '/',
}) {
  const navigate = useNavigate();
  const gameStatus = useGameStore((s) => s.gameStatus);

  const allowed = Array.isArray(requiredStatus)
    ? requiredStatus
    : [requiredStatus];
  const isAllowed = allowed.includes(gameStatus);

  useEffect(() => {
    if (!isAllowed) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAllowed, redirectTo, navigate]);

  if (!isAllowed) return null;

  return <>{children}</>;
}
