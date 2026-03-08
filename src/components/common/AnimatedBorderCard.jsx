// src/components/common/AnimatedBorderCard.jsx

import { cn } from '@/lib/utils';

/**
 * A card wrapper that renders a continuously traveling border effect.
 * Uses a spinning conic-gradient in a clipped overflow container so
 * only a 1.5 px rim is ever visible — the rest is masked by the inner
 * card background.
 *
 * Props:
 *   children         — card content
 *   className        — extra classes applied to the outer wrapper
 *   innerClassName   — extra classes applied to the inner content div
 *   borderOpacity    — opacity utility class for the gradient (default 'opacity-60')
 *   speed            — animation duration string, e.g. '6s' (default)
 */
export default function AnimatedBorderCard({
  children,
  className = '',
  innerClassName = '',
  borderOpacity = 'opacity-60',
  speed = '6s',
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl p-[1.5px]',
        className,
      )}>
      {/* ── Traveling border ──────────────────────────────────────────── */}
      {/* 200 % × 200 % square centered on the card; rotates continuously.
          The conic-gradient sweeps a warm accent arc around the perimeter.  */}
      <div
        className={cn(
          'absolute animate-border-spin pointer-events-none',
          borderOpacity,
        )}
        style={{
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          animationDuration: speed,
          background:
            'conic-gradient(from 0deg, transparent 0%, var(--accent-foreground) 18%, transparent 36%)',
        }}
      />

      {/* ── Card surface ──────────────────────────────────────────────── */}
      {/* Sits on top and masks the gradient — only the 1.5 px rim shows. */}
      <div
        className={cn(
          'relative z-10 rounded-[calc(0.75rem-1.5px)] bg-card',
          innerClassName,
        )}>
        {children}
      </div>
    </div>
  );
}
