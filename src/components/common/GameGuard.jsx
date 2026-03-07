// src/components/common/GameGuard.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@stores/useGameStore';

/**
 * Protects game routes by checking the current game status.
 *
 * Props:
 *   requiredStatus  — string or string[] of statuses allowed to view this route
 *   redirectTo      — fallback redirect path if no redirectMap match (default: '/')
 *   redirectMap     — object mapping specific statuses to redirect paths, e.g:
 *                     { playing: '/play', ended: '/results' }
 *                     Checked before redirectTo.
 *
 * Examples:
 *   // Only idle users can see Home; resume to the right screen otherwise
 *   <GameGuard requiredStatus="idle" redirectMap={{ playing: '/play', ended: '/results' }}>
 *
 *   // Only playing users can see Play; send ended users straight to results
 *   <GameGuard requiredStatus="playing" redirectMap={{ ended: '/results' }}>
 */
export default function GameGuard({
  children,
  requiredStatus,
  redirectTo = '/',
  redirectMap = {},
}) {
  const navigate = useNavigate();
  const gameStatus = useGameStore((s) => s.gameStatus);

  const allowed = Array.isArray(requiredStatus)
    ? requiredStatus
    : [requiredStatus];
  const isAllowed = allowed.includes(gameStatus);

  // Per-status redirect takes priority over the generic fallback
  const destination = redirectMap[gameStatus] ?? redirectTo;

  useEffect(() => {
    if (!isAllowed) {
      navigate(destination, { replace: true });
    }
  }, [isAllowed, destination, navigate]);

  if (!isAllowed) return null;

  return <>{children}</>;
}
