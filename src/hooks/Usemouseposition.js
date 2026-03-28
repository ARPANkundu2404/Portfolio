import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useMousePosition
 *
 * Tracks the global mouse position (window-relative) and,
 * optionally, the position relative to a target element.
 *
 * @param {object} [options]
 * @param {boolean} [options.relative=false]   - If true, also tracks position
 *                                               relative to the ref element.
 * @param {boolean} [options.normalized=false]  - If true, exposes [0,1] normalized
 *                                               coords relative to the ref element.
 * @param {number}  [options.lerp=1]            - Lerp factor for smooth following
 *                                               (1 = instant, 0.1 = very smooth).
 *
 * @returns {{
 *   x: number, y: number,           // raw window coords
 *   relX: number, relY: number,     // relative to ref element (px)
 *   normX: number, normY: number,   // [0,1] normalized relative
 *   ref: React.RefObject            // attach to element for relative tracking
 * }}
 */
export function useMousePosition({ relative = false, normalized = false, lerp = 1 } = {}) {
  const ref = useRef(null);
  const rawPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  const [position, setPosition] = useState({
    x: 0, y: 0,
    relX: 0, relY: 0,
    normX: 0, normY: 0,
  });

  const lerped = useRef({ x: 0, y: 0 });

  const computeRelative = useCallback(() => {
    if (!ref.current) return { relX: 0, relY: 0, normX: 0, normY: 0 };
    const rect = ref.current.getBoundingClientRect();
    const relX = rawPos.current.x - rect.left;
    const relY = rawPos.current.y - rect.top;
    const normX = Math.max(0, Math.min(1, relX / rect.width));
    const normY = Math.max(0, Math.min(1, relY / rect.height));
    return { relX, relY, normX, normY };
  }, []);

  // Animate loop for smooth lerping
  useEffect(() => {
    if (lerp >= 1) return; // no lerp needed

    const animate = () => {
      lerped.current.x += (rawPos.current.x - lerped.current.x) * lerp;
      lerped.current.y += (rawPos.current.y - lerped.current.y) * lerp;

      const rel = computeRelative();
      setPosition({
        x: lerped.current.x,
        y: lerped.current.y,
        ...rel,
      });

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [lerp, computeRelative]);

  useEffect(() => {
    const handleMove = (e) => {
      rawPos.current = { x: e.clientX, y: e.clientY };

      if (lerp >= 1) {
        // Instant update
        const rel = computeRelative();
        setPosition({
          x: e.clientX,
          y: e.clientY,
          ...rel,
        });
      }
      // If lerp < 1, the animation loop handles it
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [lerp, computeRelative]);

  return { ...position, ref };
}

/**
 * useRelativeMousePosition
 *
 * Simplified hook for tracking mouse position *only* relative to
 * a specific element. Returns normalized [-0.5, 0.5] coordinates
 * perfect for 3D tilt calculations.
 *
 * @returns {{
 *   tiltX: number, tiltY: number,   // [-0.5, 0.5] for tilt math
 *   isInside: boolean,
 *   ref: React.RefObject
 * }}
 */
export function useRelativeMousePosition() {
  const ref = useRef(null);
  const [state, setState] = useState({ tiltX: 0, tiltY: 0, isInside: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      setState({ tiltX: x, tiltY: y, isInside: true });
    };

    const handleLeave = () => setState(s => ({ ...s, tiltX: 0, tiltY: 0, isInside: false }));

    el.addEventListener('mousemove', handleMove, { passive: true });
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return { ...state, ref };
}

export default useMousePosition;